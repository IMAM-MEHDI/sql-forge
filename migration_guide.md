# SQLForge: Migration Guide

Follow these steps to move this project to your new computer.

## 1. Prepare the Project Files
On your **current** computer, copy the project folder to a USB drive or cloud storage. 

> [!IMPORTANT]
> **Do NOT copy these folders** (they are huge and can be recreated):
> - `frontend/node_modules/`
> - `backend/venv/` (or your Python virtual environment folder)
> - `backend/__pycache__/`

## 2. Database Setup (New Computer)
Open your PostgreSQL terminal (psql) or pgAdmin and run these commands to create the database:

```sql
-- Create the database
CREATE DATABASE sql_game;

-- Create a user (replace 'your_password' with a strong password)
CREATE USER sql_user WITH PASSWORD 'your_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE sql_game TO sql_user;
```

## 3. Backend Setup
Navigate to the `backend/` directory on your new computer:

1. **Create a Virtual Environment**:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   # source venv/bin/activate
   ```
2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Configure Environment Variables**:
   Create a `.env` file in the `backend/` folder (ensure you update the password):
   ```env
   DATABASE_URL=postgresql://sql_user:your_password@localhost:5432/sql_game
   SECRET_KEY=generate_a_random_string_here
   ```
4. **Seed the Database**:
   Run the seed script to populate levels and initial data:
   ```bash
   python seed.py
   ```

## 4. Frontend Setup
Navigate to the `frontend/` directory on your new computer:

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

## 5. Summary of URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
