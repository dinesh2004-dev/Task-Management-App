from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi_jwt_auth import AuthJWT
from database import get_db,Task,User
import schemas

router = APIRouter(prefix = "/tasks",tags = ["Tasks"])

def get_current_user(Authorize: AuthJWT = Depends()):
    try:
        Authorize.jwt_required()
        return Authorize.get_jwt_subject()  # Returns username from JWT
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

#create task
@router.post("/", response_model=schemas.Task)
def create_task(task_data: schemas.TaskCreate, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user_email = Authorize.get_jwt_subject()
    
    user = db.query(User).filter(User.Email == current_user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    task_dict = task_data.dict()
    task_dict["user_id"] = user.id
    
    task = Task(**task_dict)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

#get tasks
@router.get("/",response_model = list[schemas.Task])
def get_tasks(db:Session = Depends(get_db),Authorize : AuthJWT = Depends()):
    Authorize.jwt_required()

    current_user = Authorize.get_jwt_subject()

    user = db.query(User).filter(User.Email == current_user).first()

    if not user:
        raise HTTPException(status_code=404,detail="user not found")
    
    return db.query(Task).filter(Task.user_id == user.id).all()
    

# Update a Task
@router.put("/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, task_data: schemas.TaskUpdate, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user_email = Authorize.get_jwt_subject()
    
    user = db.query(User).filter(User.Email == current_user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    for key, value in task_data.dict(exclude_unset=True).items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)
    return task

#deleting Task
@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user_email = Authorize.get_jwt_subject()
    
    user = db.query(User).filter(User.Email == current_user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}