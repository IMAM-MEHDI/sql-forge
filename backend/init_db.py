import os
import re
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

# Main application database connection
DATABASE_URL = os.getenv("DATABASE_URL", f"postgresql+psycopg://postgres:{os.getenv('DB_PASSWORD', 'imam123')}@localhost:5432/postgres")
engine = create_engine(DATABASE_URL)

def run_sql_file(file_path):
    print(f"--- Processing: {os.path.basename(file_path)} ---")
    if not os.path.exists(file_path):
        print(f"Error: File {file_path} not found.")
        return False

    with open(file_path, 'r') as f:
        sql = f.read()
    
    # Simple SQL cleanup: remove comments and split by semicolon
    # Remove block comments /* ... */
    sql = re.sub(r'/\*.*?\*/', '', sql, flags=re.DOTALL)
    # Remove single line comments -- ...
    sql = re.sub(r'--.*', '', sql)
    
    statements = sql.split(';')
    
    success_count = 0
    fail_count = 0
    
    for statement in statements:
        stmt = statement.strip()
        if not stmt:
            continue
        
        # We use a new connection for each statement to avoid transaction aborts blocking subsequent commands
        try:
            with engine.connect() as conn:
                # print(f"Running: {stmt[:60]}...")
                conn.execute(text(stmt))
                conn.commit()
                success_count += 1
        except Exception as e:
            err_msg = str(e).lower()
            if "already exists" in err_msg:
                # print("  -> Already exists, skipping.")
                success_count += 1 # Count as success for initialization purposes
            else:
                print(f"Error in statement: {stmt[:100]}...\n  -> {e}")
                fail_count += 1

    print(f"Finished {os.path.basename(file_path)}: {success_count} statements processed, {fail_count} errors.")
    return fail_count == 0

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    database_dir = os.path.join(base_dir, "database")
    
    schema_sql = os.path.join(database_dir, "schema.sql")
    sandbox_sql = os.path.join(database_dir, "sandbox_setup.sql")
    
    print("Starting Database Initialization...")
    
    # 1. Run Schema
    run_sql_file(schema_sql)
    
    # 2. Run Sandbox Setup
    run_sql_file(sandbox_sql)
    
    print("\nDatabase initialization completed.")
