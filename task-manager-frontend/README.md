# Task Manager Frontend

A modern React frontend for the Task Manager application, built with TypeScript, React Router, and Tailwind CSS.

## Features

- User authentication (login/signup)
- Task management (create, read, update, delete)
- Modern and responsive UI
- JWT-based authentication
- Form validation
- Error handling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on http://localhost:8000

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will start on http://localhost:3000

## Project Structure

```
src/
  ├── components/
  │   ├── auth/
  │   │   ├── Login.tsx
  │   │   └── Signup.tsx
  │   └── tasks/
  │       └── TaskList.tsx
  ├── App.tsx
  ├── index.tsx
  └── index.css
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_API_URL=http://localhost:8000
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Runs the test suite
- `npm eject`: Ejects from Create React App

## API Integration

The frontend integrates with the following backend endpoints:

- POST /auth/signup - User registration
- POST /auth/login - User login
- GET /tasks - Fetch all tasks
- POST /tasks - Create a new task
- PUT /tasks/:id - Update a task
- DELETE /tasks/:id - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 