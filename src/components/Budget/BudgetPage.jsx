import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { FaPlus, FaTrashAlt, FaEdit } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

// Recharts is assumed to be available. Add it to your project with `npm install recharts`

const BudgetPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let { user, Loading } = useAuth();

  const API_BASE_URL = "https://daily-flow-server-six.vercel.app/transactions";

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

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}?email=${email}`);
      if (!response.ok) {
        throw new Error("Failed to fetch transactions.");
      }
      const data = await response.json();
      // console.log(data);
      setTransactions(data);
    } catch (err) {
      setError(
        "Could not fetch data. Make sure the backend server is running."
      );
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Could not fetch data. Make sure the backend server is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchTransactions();
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) {
      setError("Please fill in all fields.");
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all fields.",
      });
      return;
    }
    const newTransaction = {
      title,
      amount: parseFloat(amount),
      type,
      user_email: email,
    };
    setError("");

    try {
      let response;
      if (editingId) {
        response = await fetch(`${API_BASE_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTransaction),
        });
        if (!response.ok) throw new Error("Failed to update transaction.");
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Transaction has been updated.",
        });
        setEditingId(null);
      } else {
        response = await fetch(API_BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTransaction),
        });
        if (!response.ok) throw new Error("Failed to add transaction.");
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Transaction has been added.",
        });
      }

      setTitle("");
      setAmount("");
      setType("income");
      fetchTransactions();
    } catch (err) {
      setError(err.message);
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction._id);
    setTitle(transaction.title);
    setAmount(transaction.amount);
    setType(transaction.type);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setAmount("");
    setType("income");
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) throw new Error("Failed to delete transaction.");
          Swal.fire({
            title: "Deleted!",
            text: "Your transaction has been deleted.",
            icon: "success",
          });
          fetchTransactions();
        } catch (err) {
          setError(err.message);
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.message,
          });
        }
      }
    });
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const remaining = totalIncome - totalExpense;

  const COLORS = {
    income: "#82ca9d",
    expense: "#ff7300",
    savings: "#007bff",
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-[93vh] p-3 ">
      <title>Daily Flow || Budget Tracker</title>

      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg lg:p-6 p-3 mt-3 ">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-800">
          Budget Tracker
        </h1>

        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Summary and Chart Section */}
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="grid grid-cols-3 gap-4 w-full text-center mb-6">
              <div className="p-3 bg-green-100 rounded-lg shadow">
                <p className="text-sm text-gray-600">Total Income</p>
                <p className="text-sm font-bold text-green-700 mt-1">
                  ${totalIncome.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg shadow">
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-sm font-bold text-red-700 mt-1">
                  ${totalExpense.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg shadow">
                <p className="text-sm text-gray-600">Remain</p>
                <p
                  className={`text-sm font-bold mt-1 ${
                    remaining >= 0 ? "text-blue-700" : "text-red-700"
                  }`}
                >
                  ${remaining.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="w-full h-90">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={transactions}
                    dataKey="amount"
                    nameKey="title"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {transactions.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.type] || "#8884d8"}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Form and Transaction List */}
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Add/Edit Transaction</h2>
            <form
              onSubmit={handleSubmit}
              className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner"
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="e.g., Groceries, Salary"
                />
              </div>
              <div className="flex md:gap-3 flex-col md:flex-row">


              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Amount ($)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-[9px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="e.g., 50.00"
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {editingId ? "Update Transaction" : "Add Transaction"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="w-full cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
            <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
            {loading ? (
              <div className="flex justify-center items-center mt-6">
                <span className="loading loading-dots  "> </span>
              </div>
            ) : (
              <div className="overflow-y-auto max-h-60 pr-4">
                {transactions.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No transactions added yet.
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {transactions.map((transaction) => (
                      <li
                        key={transaction._id}
                        className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-inner "
                        style={{
                          borderColor:
                            transaction.type === "income"
                              ? "#82ca9d"
                              : "#ff7300",
                        }}
                      >
                        <div>
                          <p className="text-lg font-semibold">
                            {transaction.title}
                          </p>
                          <p
                            className={`font-bold ${
                              transaction.type === "income"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type === "income" ? "+" : "-"} $
                            {transaction.amount.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(transaction)}
                            aria-label="Edit transaction"
                            className="p-2 cursor-pointer rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(transaction._id)}
                            aria-label="Delete transaction"
                            className="p-2 cursor-pointer rounded-full text-red-600 hover:bg-red-100 transition-colors"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
