from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from typing import List, Optional
import schemas, models, auth, database, sandbox
import uuid

router = APIRouter(prefix="/api/levels", tags=["levels"])

@router.get("/", response_model=List[schemas.LevelResponse])
def get_levels(db: Session = Depends(database.get_db), authorization: Optional[str] = Header(None)):
    # Try to get current user but don't fail if guest
    current_user = None
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        try:
            current_user = auth.get_current_user(token, db)
        except:
            pass

    levels = db.query(models.Level).order_by(models.Level.created_at).all()
    
    if current_user:
        # Get IDs of levels this user has successfully completed
        completed_ids = {
            row[0] for row in db.query(models.Submission.level_id)
            .filter(models.Submission.user_id == current_user.id, models.Submission.status == "Success").all()
        }
        for level in levels:
            level.is_completed = level.id in completed_ids
            
    return levels

@router.get("/{level_id}", response_model=schemas.LevelDetailResponse)
def get_level(level_id: uuid.UUID, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    level = db.query(models.Level).filter(models.Level.id == level_id).first()
    if not level:
        raise HTTPException(status_code=404, detail="Level not found")
    return level

@router.post("/{level_id}/submit", response_model=schemas.QueryResultResponse)
def submit_query(level_id: uuid.UUID, query: schemas.QuerySubmit, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    level = db.query(models.Level).filter(models.Level.id == level_id).first()
    if not level:
        raise HTTPException(status_code=404, detail="Level not found")

    try:
        # 1. Execute query in sandbox
        exec_result = sandbox.execute_user_query(
            schema_definition=level.schema_definition, 
            user_query=query.query
        )
        
        # 2. Validate output against expected
        user_data = exec_result.get("data", [])
        expected_data = level.expected_output
        
        is_correct, msg = sandbox.validate_result(user_data, expected_data)
        
        final_status = "Success" if is_correct else "Failed"
        message = "Correct!" if is_correct else f"Incorrect. {msg}"

        # 3. Save Submission
        submission = models.Submission(
            user_id=current_user.id,
            level_id=level.id,
            query=query.query,
            result=user_data,
            status=final_status
        )
        db.add(submission)
        db.commit()

        return {
            "status": final_status,
            "message": message,
            "data": user_data,
            "columns": exec_result.get("columns", []),
            "expected_data": expected_data
        }

    except sandbox.SandboxExecutionError as e:
        # Log failure
        submission = models.Submission(
            user_id=current_user.id,
            level_id=level.id,
            query=query.query,
            result={"error": str(e)},
            status="Error"
        )
        db.add(submission)
        db.commit()
        
        return {
            "status": "Error",
            "message": str(e),
            "data": None,
            "columns": None,
            "expected_data": level.expected_output
        }

@router.post("/", response_model=schemas.LevelDetailResponse)
def create_level(level_data: schemas.LevelCreate, db: Session = Depends(database.get_db), admin: models.User = Depends(auth.get_admin_user)):
    new_level = models.Level(**level_data.model_dump())
    db.add(new_level)
    db.commit()
    db.refresh(new_level)
    return new_level

@router.put("/{level_id}", response_model=schemas.LevelDetailResponse)
def update_level(level_id: uuid.UUID, level_data: schemas.LevelUpdate, db: Session = Depends(database.get_db), admin: models.User = Depends(auth.get_admin_user)):
    level = db.query(models.Level).filter(models.Level.id == level_id).first()
    if not level:
        raise HTTPException(status_code=404, detail="Level not found")
    
    update_data = level_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(level, key, value)
    
    db.commit()
    db.refresh(level)
    return level

@router.delete("/{level_id}")
def delete_level(level_id: uuid.UUID, db: Session = Depends(database.get_db), admin: models.User = Depends(auth.get_admin_user)):
    level = db.query(models.Level).filter(models.Level.id == level_id).first()
    if not level:
        raise HTTPException(status_code=404, detail="Level not found")
    
    db.delete(level)
    db.commit()
    return {"message": "Level deleted successfully"}
