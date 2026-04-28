import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

# 1. Fetch the Database URL
DATABASE_URL = os.getenv("DATABASE_URL")

# 2. Format the URL for SQLAlchemy 2.0 + psycopg3
if DATABASE_URL and DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)

# 3. Fallback for Local Development
if not DATABASE_URL:
    if os.getenv("RENDER") or os.getenv("NETLIFY"):
         raise ValueError("CRITICAL: DATABASE_URL is missing in production environment!")
    
    DB_USER = os.getenv("DB_USER", "postgres")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "")
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_NAME = os.getenv("DB_NAME", "postgres")
    DATABASE_URL = f"postgresql+psycopg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:5432/{DB_NAME}"

# 4. Configure Connection Arguments (Critical for Supabase Pooler)
connect_args = {}
if DATABASE_URL and "pooler.supabase.com" in DATABASE_URL:
    # Disable prepared statements entirely for PgBouncer/Supabase Pooler compatibility
    # Using None is the absolute "off" switch for psycopg3
    connect_args["prepare_threshold"] = None

# 5. Create the Engine
try:
    engine = create_engine(DATABASE_URL, connect_args=connect_args)
except Exception as e:
    print(f"CRITICAL: Engine creation failed: {e}")
    # Final fallback
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
