from fastapi import FastAPI
from auth import router as auth_router
from tasks import router as task_router
from database import init_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://task-manager-your-username.vercel.app",  # Replace with your Vercel domain
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

init_db()

app.include_router(auth_router)

app.include_router(task_router)


@app.get("/")

def home():
    return {"message":"Task Management API Is Running!"}