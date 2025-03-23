from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from fastapi_jwt_auth import AuthJWT
from passlib.context import CryptContext
from datetime import timedelta
from database import SessionLocal,User
from pydantic import BaseSettings

import schemas

router = APIRouter(prefix="/auth",tags = ["Authentication"])

pwd_context = CryptContext(schemes=["bcrypt"],deprecated = "auto")

def get_db():

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
class Settings(BaseSettings):
    authjwt_secret_key: str = "your_secret_key"
settings = Settings()

@AuthJWT.load_config
def get_config():
    
    return settings

def get_current_user(Authorize: AuthJWT = Depends()):
    try:
        Authorize.jwt_required()
        return Authorize.get_jwt_subject()  # Returns username from JWT
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

def hash_password(password: str)-> str:
    
    return pwd_context.hash(password)

def verify_password(plain_password,hashed_password):

    return pwd_context.verify(plain_password,hashed_password)

@router.post("/signup",response_model = schemas.UserResponse)
def signup(user_data: schemas.UserCreate,db: Session = Depends(get_db)):
    
    existing_user = db.query(User).filter(User.Email == user_data.Email).first()

    if existing_user:
        raise HTTPException(status_code=400,detail="user already taken")
    
    new_user = User(name = user_data.name,Email = user_data.Email,password = hash_password(user_data.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"id": new_user.id, "Email": new_user.Email} 

@router.post("/login", response_model=schemas.TokenData)
def login(user_data: schemas.UserLogin, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    user = db.query(User).filter(User.Email == user_data.Email).first()
    
    if not user or not verify_password(user_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Generate JWT token
    access_token = Authorize.create_access_token(subject=user.Email, expires_time=timedelta(days=1))
    
    return {"access_token": access_token, "token_type": "bearer"}
