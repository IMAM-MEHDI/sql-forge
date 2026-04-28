import psycopg
import os
from dotenv import load_dotenv
from urllib.parse import urlparse, urlunparse

load_dotenv()

# 1. Fetch and Parse the main DATABASE_URL
DATABASE_URL = os.getenv("DATABASE_URL")

def derive_sandbox_url(main_url: str) -> str:
    if not main_url:
        return "postgresql://sandbox_user:sandbox_secure_password@localhost:5432/postgres"
    
    try:
        # Standardize prefix for parsing
        clean_url = main_url.replace("postgresql+psycopg://", "postgresql://")
        u = urlparse(clean_url)
        
        # Replace credentials but keep host, port, and database name
        # We use the credentials defined in database/sandbox_setup.sql
        new_netloc = f"sandbox_user:sandbox_secure_password@{u.hostname}"
        if u.port:
            new_netloc += f":{u.port}"
            
        return urlunparse(u._replace(netloc=new_netloc))
    except Exception:
        # Final fallback if parsing fails
        return main_url

SANDBOX_DB_URL = derive_sandbox_url(DATABASE_URL)

class SandboxExecutionError(Exception):
    pass

def execute_user_query(schema_definition: str, user_query: str):
    """
    Executes a user query in a secure, isolated sandbox transaction.
    """
    conn = None
    try:
        # 1. Connect to the database as the restricted sandbox user
        # CRITICAL: We must disable prepared statements for the Supabase Pooler here too!
        conn = psycopg.connect(SANDBOX_DB_URL, prepare_threshold=None)
        
        # Ensure we are in a transaction so we can rollback everything
        conn.autocommit = False
        cursor = conn.cursor()

        # 2. Enforce strict timeouts and schema restrictions
        cursor.execute("SET statement_timeout = '2s';")
        cursor.execute("SET search_path TO sandbox;")

        # 3. Setup the Level Schema
        cursor.execute(schema_definition)

        # 4. Filter malicious queries (Basic layer, DB roles handle the rest)
        upper_query = user_query.upper()
        if any(keyword in upper_query for keyword in ["DROP ", "DELETE ", "ALTER ", "TRUNCATE "]):
            raise SandboxExecutionError("Query contains restricted keywords. Only SELECT is allowed for these levels.")

        # 5. Execute the User's Query
        cursor.execute(user_query)

        # 6. Fetch Results
        if cursor.description:
            columns = [desc.name for desc in cursor.description]
            rows = cursor.fetchall()
            result_data = [dict(zip(columns, row)) for row in rows]
        else:
            columns = []
            result_data = []

        # 7. Force Rollback (Never save changes)
        conn.rollback()

        return {"status": "success", "columns": columns, "data": result_data}

    except psycopg.errors.QueryCanceled:
        if conn: conn.rollback()
        raise SandboxExecutionError("Query timed out. Maximum execution time is 2 seconds.")
    except psycopg.Error as e:
        if conn: conn.rollback()
        raise SandboxExecutionError(f"Database error: {str(e)}")
    except Exception as e:
        if conn: conn.rollback()
        raise SandboxExecutionError(str(e))
    finally:
        if conn: conn.close()

def validate_result(user_data: list, expected_data: list):
    """
    Compares the user's result data against the expected data.
    """
    if len(user_data) != len(expected_data):
        return False, "Row count mismatch."

    for i in range(len(user_data)):
        if user_data[i] != expected_data[i]:
             return False, f"Mismatch at row {i+1}."
             
    return True, "Success"
