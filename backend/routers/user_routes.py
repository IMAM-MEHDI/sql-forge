from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from typing import List
import schemas, models, auth, database

router = APIRouter(prefix="/api/users", tags=["users"])

@router.get("/leaderboard", response_model=List[schemas.LeaderboardUser])
def get_leaderboard(db: Session = Depends(database.get_db)):
    # Query users and count their successful unique submissions
    leaderboard = db.query(
        models.User.email,
        func.count(func.distinct(models.Submission.level_id)).label("solved_count")
    ).join(models.Submission).filter(
        models.Submission.status == "Success"
    ).group_by(
        models.User.id
    ).order_by(
        desc("solved_count")
    ).limit(10).all()
    
    return [{"email": row[0], "solved_count": row[1]} for row in leaderboard]

@router.get("/me/stats", response_model=schemas.UserStats)
def get_my_stats(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    solved_count = db.query(func.count(func.distinct(models.Submission.level_id)))\
        .filter(models.Submission.user_id == current_user.id, models.Submission.status == "Success")\
        .scalar()
    
    # Simple rank calculation
    rank_subquery = db.query(
        models.Submission.user_id,
        func.count(func.distinct(models.Submission.level_id)).label("count")
    ).filter(models.Submission.status == "Success")\
    .group_by(models.Submission.user_id).subquery()

    better_users = db.query(func.count(rank_subquery.c.user_id))\
        .filter(rank_subquery.c.count > solved_count).scalar()
    
    return {
        **current_user.__dict__,
        "solved_count": solved_count or 0,
        "rank": better_users + 1
    }
