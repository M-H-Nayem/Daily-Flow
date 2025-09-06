// src/components/StudyPlanner.js
import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';

const StudyPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('low');
  const [deadline, setDeadline] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  let {user,Loading}= useAuth()

const [email, setEmail] = useState("");

useEffect(() => {
  if (!Loading) {
    if (user) {
      setEmail(user.email);
    } else {
      setEmail("mahmudulhasannayemssnic@gmail.com");
    }
  }
}, [user, Loading]);

  const API_URL = 'https://daily-flow-server-six.vercel.app/tasks';


  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}?email=${email}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Swal.fire('Error', 'Failed to fetch tasks.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   if (email) {
     fetchTasks();
   }
  }, [email]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTasks(prevTasks =>
        prevTasks.map(task => {
          const deadlineDate = new Date(task.deadline);
          const now = new Date();
          const distance = deadlineDate - now;

          if (distance < 0) {
            return { ...task, countdown: 'Deadline Passed' };
          }

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          return {
            ...task,
            countdown: `${days}d ${hours}h ${minutes}m ${seconds}s`
          };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  

   const handleAddOrUpdateTask = async (e) => {
    e.preventDefault();
    if (!title || !subject || !deadline) {
      Swal.fire('Warning', 'Please fill in all fields.', 'warning');
      return;
    }
    const newTask = { title, subject, priority, deadline ,user_email:email };
    
    try {
      if (editingTask) {
        // Update an existing task
        const response = await fetch(`${API_URL}/${editingTask._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTask),
        });
        if (!response.ok) throw new Error('Failed to update task.');
        Swal.fire('Success', 'Task updated successfully!', 'success');
        setEditingTask(null);
      } else {
        // Add a new task
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTask),
        });
        if (!response.ok) throw new Error('Failed to add task.');
        Swal.fire('Success', 'Task added successfully!', 'success');
      }
      
      setTitle('');
      setSubject('');
      setPriority('low');
      setDeadline('');
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
      Swal.fire('Error', error.message, 'error');
    }
  };

 const handleDeleteTask = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
          if (!response.ok) throw new Error('Failed to delete task.');
          Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
          fetchTasks();
        } catch (error) {
          console.error('Error deleting task:', error);
          Swal.fire('Error', 'Failed to delete task.', 'error');
        }
      }
    });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setSubject(task.subject);
    setPriority(task.priority);
    setDeadline(task.deadline);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setTitle('');
    setSubject('');
    setPriority('low');
    setDeadline('');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-orange-500';
      case 'low': return 'border-green-500';
      default: return 'border-gray-300';
    }
  };

  return (
    <div className="bg-gray-100 min-h-[90vh] p-4 sm:p-8">
      <title>Daily Flow || Study Planner</title>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Task Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
            {editingTask ? 'Edit Study Task' : 'Add New Study Task'}
          </h2>
          <form onSubmit={handleAddOrUpdateTask} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Task Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Read Chapter 5"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Mathematics"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                <FaPlus />
                <span>{editingTask ? 'Update Task' : 'Add Task'}</span>
              </button>
              {editingTask && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  <span>Cancel</span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Task List */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">My Study Tasks</h2>
          {loading ? (
            <div className="text-center text-gray-500">Loading tasks...</div>
          ) : (
            <div className="space-y-4 max-h-90 overflow-y-auto pr-2">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div
                    key={task._id}
                    className={`flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm border-l-4 ${getPriorityColor(task.priority)}`}
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <p className="text-sm text-gray-600">Subject: {task.subject}</p>
                      <p className="text-sm text-gray-600">Priority: {task.priority}</p>

                      <p className="text-sm font-bold mt-1">
                        {task.countdown === 'Deadline Passed' ? (
                          <span className="text-red-500">{task.countdown}</span>
                        ) : (
                          <span className="text-blue-600">Time Left: {task.countdown}</span>
                        )}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">No tasks added yet.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;