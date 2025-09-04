// src/data/budgetData.js

const budgetData = [
  { _id: '1', type: 'income', category: 'Allowance', amount: 10000, date: '2025-08-01', description: 'Monthly allowance' },
  { _id: '2', type: 'expense', category: 'Food', amount: 2500, date: '2025-08-05', description: 'Groceries and dining out' },
  { _id: '3', type: 'expense', category: 'Transport', amount: 500, date: '2025-08-06', description: 'Bus fare' },
  { _id: '4', type: 'income', category: 'Part-time Job', amount: 6000, date: '2025-08-10', description: 'August part-time salary' },
  { _id: '5', type: 'expense', category: 'Books', amount: 1500, date: '2025-08-12', description: 'New textbook' },
  { _id: '6', type: 'expense', category: 'Entertainment', amount: 800, date: '2025-08-15', description: 'Movie ticket and snacks' },
];

export const fetchBudgetData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(budgetData);
    }, 1000); // 1-second delay to simulate an API call
  });
};