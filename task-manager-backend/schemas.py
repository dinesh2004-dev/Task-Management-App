from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    Email: str
    name: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    Email: str
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class UserSigngup(BaseModel):
    name: str
    Email: EmailStr 
    password: str
    confirmPassword: str

class UserResponse(BaseModel):
    id: int
    Email: str

    class Config:
        orm_mode = True

class TokenData(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Base Task Schema
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "Pending"  # Possible values: Pending, In Progress, Completed
    due_date: Optional[datetime] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[datetime] = None

class Task(TaskBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True