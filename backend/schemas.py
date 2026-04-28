from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
import uuid
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: uuid.UUID
    email: str
    is_admin: bool
    
    class Config:
        from_attributes = True

class UserStats(UserResponse):
    solved_count: int
    rank: Optional[int] = None

class LeaderboardUser(BaseModel):
    email: str
    solved_count: int

class Token(BaseModel):
    access_token: str
    token_type: str

class LevelResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: str
    difficulty: str
    topic: str
    is_completed: Optional[bool] = None
    
    class Config:
        from_attributes = True

class LevelDetailResponse(LevelResponse):
    schema_definition: str
    expected_output: Any

class LevelCreate(BaseModel):
    title: str
    description: str
    difficulty: str
    topic: str
    schema_definition: str
    expected_output: Any

class LevelUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    difficulty: Optional[str] = None
    topic: Optional[str] = None
    schema_definition: Optional[str] = None
    expected_output: Optional[Any] = None

class QuerySubmit(BaseModel):
    query: str

class QueryResultResponse(BaseModel):
    status: str
    message: str
    data: Optional[List[Dict[str, Any]]] = None
    columns: Optional[List[str]] = None
    expected_data: Optional[List[Dict[str, Any]]] = None
