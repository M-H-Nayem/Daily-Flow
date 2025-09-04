// src/components/TaskFormModal.js

import React, { useState } from 'react';

const TaskFormModal = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      taskTitle: '',
      subject: '',
      priority: 'মাঝারি',
      dueDate: new Date().toISOString().split('T')[0],
      timeAllocated: 30,
      status: 'শুরু হয়নি',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{initialData ? 'কাজ এডিট করুন' : 'নতুন কাজ যোগ করুন'}</h3>
        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <input
            type="text"
            name="taskTitle"
            placeholder="কাজের শিরোনাম"
            value={formData.taskTitle}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="বিষয়"
            value={formData.subject}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="অতি উচ্চ">অতি উচ্চ</option>
            <option value="উচ্চ">উচ্চ</option>
            <option value="মাঝারি">মাঝারি</option>
            <option value="নিম্ন">নিম্ন</option>
          </select>
          <div className="flex gap-4 items-center">
            <label>সময় (মিনিট):</label>
            <input
              type="number"
              name="timeAllocated"
              value={formData.timeAllocated}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex gap-4 items-center">
            <label>শেষ সময়সীমা:</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>বাতিল</button>
            <button type="submit" className="btn btn-primary">
              {initialData ? 'আপডেট করুন' : 'যোগ করুন'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;