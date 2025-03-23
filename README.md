# Task Manager Application

A modern and efficient Task Manager application built with React.js and FastAPI, helping you organize and track your tasks effectively.

## Features

- Create, read, update, and delete tasks
- User authentication and authorization
- Mark tasks as complete/incomplete
- Filter tasks by status
- Clean and intuitive user interface
- Responsive design

## Tools & Technologies Used

### Frontend
- **Framework**: React.js with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Build Tool**: Vite
- **Package Manager**: npm
- **Version Control**: Git


### Backend
- **Framework**: FastAPI (Python)
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: FastAPI Swagger UI

- **Environment Management**: Python Virtual Environment

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0 or higher recommended)
- [Python](https://www.python.org/downloads/) (v3.8 or higher)
- npm (comes with Node.js)
- pip (Python package manager)

## Installation

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd task-manager-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the frontend directory
   - Add the following variables:
     ```
     VITE_API_URL=your_backend_api_url
     ```

4. Start the development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd task-manager-backend
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add the following variables:
     ```
     SECRET_KEY=your_secret_key
     DATABASE_URL=sqlite:///taskdb.sqlite
     ```

5. Start the backend server:
```bash
uvicorn main:app --reload
```

## Usage

- Register a new account or login with existing credentials
- To add a new task, type your task in the input field and press Enter
- Click on a task to mark it as complete/incomplete
- Use the filter buttons to view All/Active/Completed tasks
- Click the delete button to remove a task

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Tasks
- `GET /tasks` - Get all tasks for the current user
- `POST /tasks` - Create a new task
- `GET /tasks/{task_id}` - Get a specific task
- `PUT /tasks/{task_id}` - Update a task
- `DELETE /tasks/{task_id}` - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details 