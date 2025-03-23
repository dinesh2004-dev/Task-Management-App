import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import TaskList from './components/tasks/TaskList';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/" element={<Navigate to="/tasks" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 