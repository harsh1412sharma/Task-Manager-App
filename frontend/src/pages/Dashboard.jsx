import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [message, setMessage] = useState('');

  const { title, description } = formData;
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await api.get('/tasks', {
        headers: { 'x-auth-token': token },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Failed to fetch tasks.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post('/tasks', formData, {
        headers: { 'x-auth-token': token },
      });
      setMessage('Task added successfully!');
      setFormData({ title: '', description: '' });
      fetchTasks();
    } catch (err) {
      console.error(err.response.data);
      setMessage('Failed to add task.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/tasks/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setMessage('Task deleted successfully!');
      fetchTasks();
    } catch (err) {
      console.error(err.response.data);
      setMessage('Failed to delete task.');
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await api.put(
        `/tasks/${id}`,
        { status },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      setMessage('Task updated successfully!');
      fetchTasks();
    } catch (err) {
      console.error(err.response.data);
      setMessage('Failed to update task.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/'); // Redirect to the Home page after logout
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Task Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      <form onSubmit={onSubmit} className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          name="title"
          value={title}
          onChange={onChange}
          required
        />
        <textarea
          placeholder="Task Description"
          name="description"
          value={description}
          onChange={onChange}
        />
        <button type="submit">Add Task</button>
      </form>
      {message && <p className="form-message">{message}</p>}
      <hr className="divider" />
      <h2>My Tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <div>
              <p className="task-title">
                {task.title}: {task.description}
              </p>
              <span className="task-status">Status: {task.status}</span>
            </div>
            <div className="task-buttons">
              <button onClick={() => handleDelete(task._id)} className="btn-delete">
                Delete
              </button>
              {task.status === 'pending' && (
                <button
                  onClick={() => handleUpdate(task._id, 'completed')}
                  className="btn-update"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;