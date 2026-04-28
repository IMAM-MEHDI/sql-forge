import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from sqlalchemy import text
from database import engine

def migrate():
    with engine.connect() as conn:
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT false;"))
            conn.commit()
            print("Added is_admin column")
        except Exception as e:
            print(f"Column might already exist: {e}")
        
        try:
            # Update all existing users to be admins for testing purposes
            conn.execute(text("UPDATE users SET is_admin = true;"))
            conn.commit()
            print("Set existing users as admin")
        except Exception as e:
            print(e)

if __name__ == "__main__":
    migrate()
