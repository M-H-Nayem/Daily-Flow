// src/components/StudyPlannerPage.js

import React, { useState, useEffect } from 'react';
import { fetchStudyTasks } from '../../data/studyData';
import TaskFormModal from './TaskFormModal';

const StudyPlannerPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStudyTasks();
        setTasks(data);
        setError(null);
      } catch (err) {
        setError("ডেটা লোড করতে সমস্যা হয়েছে।");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleUpdateStatus = (taskId, newStatus) => {
    setTasks(prev => 
      prev.map(task => 
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleAddOrUpdateTask = (taskData) => {
    if (editingTask) {
      // এডিটিং অপারেশন
      setTasks(prev => prev.map(t => (t._id === taskData._id ? taskData : t)));
    } else {
      // যোগ করার অপারেশন
      const newTask = {
        _id: Date.now().toString(),
        ...taskData,
        status: 'শুরু হয়নি'
      };
      setTasks(prev => [...prev, newTask]);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task._id !== taskId));
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="alert alert-error text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-[90vh]">
      <div className="container ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">স্টাডি প্ল্যানার</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
          >
            + নতুন প্ল্যান যোগ করুন
          </button>
        </div>

        {/* 💻 বড় ডিভাইসের জন্য টেবিল ভিউ */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>কাজ</th>
                <th>বিষয়</th>
                <th>অগ্রাধিকার</th>
                <th>সময়</th>
                <th>শেষ সময়সীমা</th>
                <th>স্ট্যাটাস</th>
                <th>অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task._id}>
                  <td>{task.taskTitle}</td>
                  <td>{task.subject}</td>
                  <td className={`font-bold ${task.priority === 'অতি উচ্চ' ? 'text-red-500' : task.priority === 'উচ্চ' ? 'text-orange-500' : 'text-blue-500'}`}>{task.priority}</td>
                  <td>{task.timeAllocated} মিনিট</td>
                  <td>{task.dueDate}</td>
                  <td>
                    <select 
                      value={task.status} 
                      onChange={(e) => handleUpdateStatus(task._id, e.target.value)}
                      className="select select-bordered select-xs"
                    >
                      <option value="শুরু হয়নি">শুরু হয়নি</option>
                      <option value="চলমান">চলমান</option>
                      <option value="সম্পন্ন">সম্পন্ন</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      className="btn btn-xs btn-info mr-2 my-1"
                      onClick={() => {
                        setEditingTask(task);
                        setIsModalOpen(true);
                      }}
                    >
                      এডিট
                    </button>
                    <button 
                      className="btn btn-xs btn-error my-1 "
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      ডিলিট
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📱 ছোট ডিভাইসের জন্য কার্ড ভিউ */}
        <div className="block lg:hidden">
          <div className="flex flex-col gap-4">
            {tasks.map(task => (
              <div key={task._id} className="card bg-base-100 shadow-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold text-lg">{task.taskTitle}</p>
                  <span className={`text-xs font-semibold px-2 py-1  ${task.status === 'সম্পন্ন' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                    <select
                      value={task.status} 
                      onChange={(e) => handleUpdateStatus(task._id, e.target.value)}
                      className="select select-bordered select-xs"
                    >
                      <option value="শুরু হয়নি">শুরু হয়নি</option>
                      <option value="চলমান">চলমান</option>
                      <option value="সম্পন্ন">সম্পন্ন</option>
                    </select>
                  </span>
                </div>
                <p className="text-gray-600">বিষয়: {task.subject}</p>
                <p className="text-gray-600">অগ্রাধিকার: <span className={`font-bold ${task.priority === 'অতি উচ্চ' ? 'text-red-500' : task.priority === 'উচ্চ' ? 'text-orange-500' : 'text-blue-500'}`}>{task.priority}</span></p>
                <p className="text-gray-600">সময়: {task.timeAllocated} মিনিট</p>
                <p className="text-gray-600">শেষ সময়সীমা: {task.dueDate}</p>
                <div className="flex justify-end gap-2 mt-4">
                  <button 
                    className="btn btn-sm btn-info"
                    onClick={() => {
                      setEditingTask(task);
                      setIsModalOpen(true);
                    }}
                  >
                    এডিট
                  </button>
                  <button 
                    className="btn btn-sm btn-error"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    ডিলিট
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isModalOpen && (
          <TaskFormModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddOrUpdateTask}
            initialData={editingTask}
          />
        )}
      </div>
    </div>
  );
};

export default StudyPlannerPage;