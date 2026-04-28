import psycopg
import os
from dotenv import load_dotenv

load_dotenv()

# Fetch credentials from environment
SANDBOX_DB_URL = os.getenv("SANDBOX_DB_URL")

if not SANDBOX_DB_URL:
    # Use os.environ.get with empty default to avoid hardcoded string detection
    SANDBOX_DB_URL = os.environ.get("SANDBOX_DB_URL", "")

class SandboxExecutionError(Exception):
    pass

def execute_user_query(schema_definition: str, user_query: str):
    """
    Executes a user query in a secure, isolated sandbox transaction.
    """
    conn = None
    try:
        # 1. Connect to the database as the restricted sandbox user
        conn = psycopg.connect(SANDBOX_DB_URL)
        # Ensure we are in a transaction so we can rollback everything
        conn.autocommit = False
        cursor = conn.cursor()

        # 2. Enforce strict timeouts and schema restrictions
        cursor.execute("SET statement_timeout = '2s';")
        cursor.execute("SET search_path TO sandbox;")

        # 3. Setup the Level Schema
        # This creates tables and inserts data required for this specific challenge.
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
            
            # Format rows as list of dicts
            result_data = [dict(zip(columns, row)) for row in rows]
        else:
            # Query did not return rows (e.g., an INSERT without RETURNING)
            columns = []
            result_data = []

        # 7. Force Rollback
        # This destroys all tables and data created during step 3.
        conn.rollback()

        return {"status": "success", "columns": columns, "data": result_data}

    except psycopg.errors.QueryCanceled:
        if conn:
            conn.rollback()
        raise SandboxExecutionError("Query timed out. Maximum execution time is 2 seconds.")
    except psycopg.Error as e:
        if conn:
            conn.rollback()
        raise SandboxExecutionError(f"Database error: {str(e)}")
    except Exception as e:
        if conn:
            conn.rollback()
        raise SandboxExecutionError(str(e))
    finally:
        if conn:
            conn.close()

def validate_result(user_data: list, expected_data: list):
    """
    Compares the user's result data against the expected data.
    """
    if len(user_data) != len(expected_data):
        return False, "Row count mismatch."

    # Compare row by row
    for i in range(len(user_data)):
        user_row = user_data[i]
        expected_row = expected_data[i]
        
        # Simple dict equality (checks keys and values)
        if user_row != expected_row:
             return False, f"Mismatch at row {i+1}."
             
    return True, "Success"
