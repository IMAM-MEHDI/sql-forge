from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import auth_routes, level_routes, user_routes

# Create database tables automatically
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="SQL Learning Game API")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(level_routes.router)
app.include_router(user_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the SQL Learning Game API"}

if __name__ == "__main__":
    import uvicorn
    import os
    # Get port from environment variable or default to 8000
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
