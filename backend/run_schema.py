import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
import re

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

def run_sql_file(file_path):
    print(f"Executing {file_path}...")
    with open(file_path, 'r') as f:
        sql = f.read()
    
    # Remove comments
    sql = re.sub(r'--.*', '', sql)
    
    # Split by semicolon
    statements = sql.split(';')
    
    for statement in statements:
        stmt = statement.strip()
        if not stmt:
            continue
        
        # Start a new connection/transaction for each statement
        try:
            with engine.connect() as conn:
                print(f"Running: {stmt[:50]}...")
                conn.execute(text(stmt))
                conn.commit()
                print("Done.")
        except Exception as e:
            if "already exists" in str(e):
                print(f"Skipping: {stmt[:30]}... (Already exists)")
            else:
                print(f"Error executing statement: {e}")

if __name__ == "__main__":
    schema_path = r"C:\Users\admin\Desktop\Sql Game\database\schema.sql"
    run_sql_file(schema_path)
