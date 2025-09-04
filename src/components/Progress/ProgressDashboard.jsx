// src/components/ProgressDashboard.js

import React, { useState, useEffect } from 'react';
import { fetchStudyTasks } from '../../data/studyData';
import { fetchBudgetData } from '../../data/budgetData';

const ProgressDashboard = () => {
  const [studyData, setStudyData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const studyTasks = await fetchStudyTasks();
        const budgetTransactions = await fetchBudgetData();
        setStudyData(studyTasks);
        setBudgetData(budgetTransactions);
      } catch (err) {
        console.error("ডেটা লোড করতে সমস্যা হয়েছে:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadAllData();
  }, []);

  // স্টাডি ডেটা বিশ্লেষণ
  const totalTasks = studyData.length;
  const completedTasks = studyData.filter(task => task.status === 'সম্পন্ন').length;
  const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(0) : 0;
  
  // বাজেট ডেটা বিশ্লেষণ
  const totalIncome = budgetData
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = budgetData
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const monthlySavings = totalIncome - totalExpenses;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-[90vh]">


    <div className="container ">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">সমন্বিত অগ্রগতি ড্যাশবোর্ড</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* টাস্ক কমপ্লিশন কার্ড */}
        <div className="card bg-base-100 shadow-xl p-6 flex flex-col items-center justify-center text-center">
          <p className="text-sm font-semibold text-gray-500 mb-2">লক্ষ্য পূরণের হার</p>
          <div className="radial-progress text-primary" style={{"--value":completionRate, "--size":"8rem", "--thickness": "0.5rem"}}>
            <span className="text-3xl font-bold">{completionRate}%</span>
          </div>
          <p className="mt-4 text-md">
            আপনি {totalTasks}টি কাজের মধ্যে {completedTasks}টি সম্পন্ন করেছেন।
          </p>
        </div>

        {/* মাসিক সঞ্চয় কার্ড */}
        <div className="card bg-base-100 shadow-xl p-6 flex flex-col items-center justify-center">
          <p className="text-sm font-semibold text-gray-500 mb-2">মাসিক সঞ্চয়</p>
          <p className="text-5xl font-bold text-green-500">৳{monthlySavings}</p>
          <p className="mt-4 text-md">
            মোট আয়: ৳{totalIncome} | মোট খরচ: ৳{totalExpenses}
          </p>
        </div>
        
        {/* উচ্চ অগ্রাধিকারের কাজ */}
        <div className="card bg-base-100 shadow-xl p-6">
          <h3 className="text-lg font-bold mb-4">আসন্ন গুরুত্বপূর্ণ কাজ</h3>
          <ul className="list-disc pl-5 space-y-2">
            {studyData.filter(t => t.priority === 'অতি উচ্চ' || t.priority === 'উচ্চ').slice(0, 3).map(task => (
              <li key={task._id} className="text-gray-700">
                <span className="font-semibold">{task.taskTitle}</span> ({task.dueDate})
              </li>
            ))}
            {studyData.filter(t => t.priority === 'অতি উচ্চ' || t.priority === 'উচ্চ').length === 0 && (
              <p className="text-gray-500 italic">কোনো উচ্চ অগ্রাধিকারের কাজ নেই।</p>
            )}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProgressDashboard;