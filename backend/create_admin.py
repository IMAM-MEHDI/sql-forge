import sys
import os
from dotenv import load_dotenv
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

load_dotenv()

from database import SessionLocal
from models import User
from auth import get_password_hash

def create_admin():
    db = SessionLocal()
    
    email = os.getenv("ADMIN_EMAIL")
    password = os.getenv("ADMIN_PASSWORD")

    if not email or not password:
        print("Error: ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env file")
        return
    
    # Check if admin already exists
    admin = db.query(User).filter(User.email == email).first()
    if admin:
        print(f"Admin user already exists: {email}")
        # Update is_admin just in case
        admin.is_admin = True
        db.commit()
        db.close()
        return

    hashed_password = get_password_hash(password)
    new_admin = User(
        email=email,
        password_hash=hashed_password,
        is_admin=True
    )
    
    db.add(new_admin)
    db.commit()
    print("Admin user created successfully!")
    print(f"Email: {email}")
    print(f"Password: {password}")
    db.close()

if __name__ == "__main__":
    create_admin()
