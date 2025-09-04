// src/data/studyData.js

const studyTasks = [
  {
    _id: '1',
    taskTitle: 'ডিজিটাল মার্কেটিং ফাইনাল প্রজেক্ট',
    subject: 'ডিজিটাল মার্কেটিং',
    priority: 'উচ্চ',
    dueDate: '2025-09-15',
    timeAllocated: 120, // মিনিটে
    status: 'চলমান',
  },
  {
    _id: '2',
    taskTitle: 'ডেটা স্ট্রাকচার অধ্যায় ৫ পড়া',
    subject: 'কম্পিউটার বিজ্ঞান',
    priority: 'মাঝারি',
    dueDate: '2025-09-10',
    timeAllocated: 60,
    status: 'সম্পন্ন',
  },
  {
    _id: '3',
    taskTitle: 'বাংলাদেশের ইতিহাস সম্পর্কিত নোট তৈরি',
    subject: 'ইতিহাস',
    priority: 'উচ্চ',
    dueDate: '2025-09-20',
    timeAllocated: 90,
    status: 'শুরু হয়নি',
  },
];

export const fetchStudyTasks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(studyTasks);
    }, 1000);
  });
};