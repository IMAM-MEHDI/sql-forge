import psycopg
import os
import logging
from dotenv import load_dotenv

load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("sandbox")

# We use the main DATABASE_URL - no more complex parsing!
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL and DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)

class SandboxExecutionError(Exception):
    pass

def execute_user_query(schema_definition: str, user_query: str):
    """
    Executes a user query in a secure, isolated sandbox transaction.
    """
    conn = None
    try:
        # 1. Connect using the main project credentials
        # We disable prepared statements for pooler compatibility
        conn = psycopg.connect(
            DATABASE_URL.replace("postgresql+psycopg://", "postgresql://"), 
            prepare_threshold=None,
            connect_timeout=10
        )
        
        conn.autocommit = False
        cursor = conn.cursor()

        # 2. DROP PERMISSIONS: "Put on the mask"
        # We switch to the restricted sandbox_user role immediately
        cursor.execute("SET ROLE sandbox_user;")
        
        # 3. Enforce restrictions
        cursor.execute("SET statement_timeout = '3s';")
        cursor.execute("SET search_path TO sandbox;")

        # 4. Setup the Level Schema
        cursor.execute(schema_definition)

        # 5. Filter malicious keywords
        upper_query = user_query.upper()
        if any(keyword in upper_query for keyword in ["DROP ", "DELETE ", "ALTER ", "TRUNCATE "]):
            raise SandboxExecutionError("Query contains restricted keywords. Only SELECT is allowed.")

        # 6. Execute the User's Query
        cursor.execute(user_query)

        # 7. Fetch Results
        if cursor.description:
            columns = [desc.name for desc in cursor.description]
            rows = cursor.fetchall()
            result_data = [dict(zip(columns, row)) for row in rows]
        else:
            columns = []
            result_data = []

        # 8. Force Rollback
        conn.rollback()

        return {"status": "success", "columns": columns, "data": result_data}

    except psycopg.Error as e:
        logger.error(f"Psycopg Database Error: {e}")
        if conn: conn.rollback()
        raise SandboxExecutionError(f"Database error: {str(e)}")
    except Exception as e:
        logger.error(f"General Sandbox Error: {e}")
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
