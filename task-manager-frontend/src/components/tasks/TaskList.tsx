import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  due_date: string;
  user_id: number;
}

const TaskList: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'Pending' as Task['status'],
  });
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(response.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        navigate('/login');
      }
      setError('Failed to fetch tasks');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const taskData = {
        ...newTask,
        due_date: newTask.due_date ? new Date(newTask.due_date).toISOString() : null
      };
      await axios.post(`${process.env.REACT_APP_API_URL}/tasks/`, taskData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNewTask({
        title: '',
        description: '',
        due_date: '',
        status: 'Pending',
      });
      fetchTasks();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create task');
    }
  };

  const handleUpdate = async (taskId: number) => {
    if (!editTask) return;
    try {
      const taskData = {
        ...editTask,
        due_date: editTask.due_date ? new Date(editTask.due_date).toISOString() : null
      };
      await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, taskData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setIsEditing(null);
      setEditTask(null);
      fetchTasks();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update task');
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchTasks();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const startEditing = (task: Task) => {
    setIsEditing(task.id);
    setEditTask(task);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      
      {/* Add Task Form */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <input
              type="date"
              value={newTask.due_date}
              onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value as Task['status'] })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white shadow-md rounded-lg p-6">
            {isEditing === task.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editTask?.title}
                  onChange={(e) => setEditTask(prev => ({ ...prev!, title: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <textarea
                  value={editTask?.description}
                  onChange={(e) => setEditTask(prev => ({ ...prev!, description: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <input
                  type="date"
                  value={editTask?.due_date}
                  onChange={(e) => setEditTask(prev => ({ ...prev!, due_date: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <select
                  value={editTask?.status}
                  onChange={(e) => setEditTask(prev => ({ ...prev!, status: e.target.value as Task['status'] }))}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="space-x-2">
                  <button
                    onClick={() => handleUpdate(task.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(null);
                      setEditTask(null);
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-gray-600">{task.description}</p>
                    <p className="text-sm text-gray-500">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-sm ${
                        task.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : task.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => startEditing(task)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList; 