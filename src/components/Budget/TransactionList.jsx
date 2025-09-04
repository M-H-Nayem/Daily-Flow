// src/components/TransactionList.js

import React from 'react';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  return (
    <>
      {/* 💻 বড় ডিভাইসের জন্য টেবিল ভিউ */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>তারিখ</th>
              <th>বিভাগ</th>
              <th>পরিমাণ</th>
              <th>বিস্তারিত</th>
              <th>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).map(t => (
              <tr key={t._id}>
                <td>{t.date}</td>
                <td>{t.category}</td>
                <td className={t.type === 'income' ? 'text-green-500' : 'text-red-500'}>৳{t.amount}</td>
                <td>{t.description}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-xs btn-info" onClick={() => onEdit(t)}>এডিট</button>
                    <button className="btn btn-xs btn-error" onClick={() => onDelete(t._id)}>ডিলিট</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 ছোট ডিভাইসের জন্য কার্ড ভিউ */}
      <div className="block lg:hidden">
        <div className="flex flex-col gap-4">
          {transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).map(t => (
            <div key={t._id} className="card bg-base-100 shadow-lg p-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-sm">{t.date}</p>
                <p className={`font-bold ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  ৳{t.amount}
                </p>
              </div>
              <p className="text-lg font-bold mb-1">{t.category}</p>
              <p className="text-gray-600 text-sm mb-2">{t.description}</p>
              <div className="flex justify-end gap-2 mt-auto">
                <button className="btn btn-sm btn-info" onClick={() => onEdit(t)}>এডিট</button>
                <button className="btn btn-sm btn-error" onClick={() => onDelete(t._id)}>ডিলিট</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TransactionList;