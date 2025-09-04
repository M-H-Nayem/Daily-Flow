// src/components/AddEditTransactionModal.js

import React, { useState } from 'react';

const AddEditTransactionModal = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    type: initialData?.type || 'expense',
    category: initialData?.category || '',
    amount: initialData?.amount || '',
    description: initialData?.description || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{initialData ? 'লেনদেন এডিট করুন' : 'নতুন লেনদেন যোগ করুন'}</h3>
        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <select name="type" value={formData.type} onChange={handleChange} className="select select-bordered w-full">
            <option value="expense">খরচ</option>
            <option value="income">আয়</option>
          </select>
          <input type="text" name="category" placeholder="ধরন (যেমন: খাদ্য, বই)" value={formData.category} onChange={handleChange} className="input input-bordered w-full" required />
          <input type="number" name="amount" placeholder="পরিমাণ" value={formData.amount} onChange={handleChange} className="input input-bordered w-full" required />
          <textarea name="description" placeholder="বিস্তারিত" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full"></textarea>
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="input input-bordered w-full" required />
          
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

export default AddEditTransactionModal;