// src/components/StudyPlanner.jsx
import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaTimes,
  FaPause,
  FaPlay,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import Stopwatch from "./Stopwatch";

const StudyPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  let { user, Loading } = useAuth();
  const [email, setEmail] = useState("");

  const API_URL = "https://daily-flow-server-six.vercel.app/tasks";

  // ✅ get user email
  useEffect(() => {
    if (!Loading) {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail("mahmudulhasannayemssnic@gmail.com");
      }
    }
  }, [user, Loading]);

  // ✅ fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}?email=${email}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      Swal.fire("Error", "Failed to fetch plans.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchTasks();
    }
  }, [email]);

  // ✅ countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          const deadlineDate = new Date(task.deadline);
          const now = new Date();
          const distance = deadlineDate - now;

          if (distance < 0) {
            return { ...task, countdown: "Deadline Passed" };
          }

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          return {
            ...task,
            countdown: `${days}d ${hours}h ${minutes}m ${seconds}s`,
          };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ✅ add / update task
  const handleAddOrUpdateTask = async (e) => {
    e.preventDefault();
    if (!title || !subject || !deadline) {
      Swal.fire("Warning", "Please fill in all fields.", "warning");
      return;
    }
    const newTask = { title, subject, priority, deadline, user_email: email };

    try {
      if (editingTask) {
        // Update
        const response = await fetch(`${API_URL}/${editingTask._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        });
        if (!response.ok) throw new Error("Failed to update task.");
        Swal.fire("Success", "Task updated successfully!", "success");
        setEditingTask(null);
      } else {
        // Add new
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        });
        if (!response.ok) throw new Error("Failed to add task.");
        Swal.fire("Success", "Plan added successfully!", "success");
      }

      setTitle("");
      setSubject("");
      setPriority("low");
      setDeadline("");
      fetchTasks();
    } catch (error) {
      console.error("Error saving task:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  // ✅ delete task
  const handleDeleteTask = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) throw new Error("Failed to delete task.");
          Swal.fire("Deleted!", "Your Plan has been deleted.", "success");
          fetchTasks();
        } catch (error) {
          console.error("Error deleting task:", error);
          Swal.fire("Error", "Failed to delete Plan.", "error");
        }
      }
    });
  };

  // ✅ edit mode
  const handleEditTask = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setSubject(task.subject);
    setPriority(task.priority);
    setDeadline(task.deadline);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setTitle("");
    setSubject("");
    setPriority("low");
    setDeadline("");
  };

  // ✅ priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100";
      case "medium":
        return "bg-yellow-100";
      case "low":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <section className="px-3 py-3 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-[93vh]">
      <div className="max-w-7xl mx-auto bg-white lg:p-5 p-3 mt-3 rounded-2xl">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center  mb-8"
        >
          Study Planner
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full rounded-lg shadow-inner bg-gray-100 ">
            {" "}
            <h1 className="text-center text-xl font-semibold mb-8 mt-3">
              Plan's Overview
            </h1>
            {/* <Stopwatch></Stopwatch> */}
          </div>

          <div className="w-full">
            {/* Form */}
            <div className="bg-gray-100 rounded-lg shadow-inner   p-3 mb-5">
              <form onSubmit={handleAddOrUpdateTask} className="">
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Task Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-[9px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Subject / Topic"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-[9px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-[9px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Deadline
                    </label>
                    <input
                      type="date"
                      value={deadline}
                      placeholder="Select deadline"
                      onChange={(e) => setDeadline(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-[9px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-3">
                  <button
                    type="submit"
                    className="w-full cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {editingTask ? (
                      <div className="flex justify-center items-center gap-2">
                        <FaEdit /> Update
                      </div>
                    ) : (
                      <div className="flex justify-center items-center gap-2">
                        <FaPlus /> Add a Plan
                      </div>
                    )}
                  </button>
                  {editingTask && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="w-full cursor-pointer flex justify-center items-center gap-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      <FaTimes /> Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="">
              <h1 className="text-start text-xl font-semibold mb-5">
                Added Plan List
              </h1>
              {/* Task List */}

              {loading ? (
                <div className="flex justify-center">
                  <span className="loading loading-dots "></span>
                </div>
              ) : tasks.length === 0 ? (
                <p className="text-center text-gray-500 italic">
                  No tasks yet. Add your first study task! 🎯
                </p>
              ) : (
                <div className="">
                  <div className="grid gap-3 grid-cols-1 overflow-y-auto max-h-80">
                    {tasks.map((task) => (
                      <motion.div
                        key={task._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={` ${getPriorityColor(
                          task.priority
                        )}   rounded-lg shadow-inner  p-3 relative flex flex-col `}
                      >
                        <div className="flex justify-between items-center">
                          <div className="">
                            <h3 className="text-xl font-bold text-gray-700">
                              {task.title}
                            </h3>
                          </div>

                          <div className="">
                            {/* <div className="flex gap-1">
                              <button className="p-2 cursor-pointer  rounded-full text-blue-600 hover:bg-blue-100 transition-colors">
                                <FaPlay />
                              </button>
                              <button className="p-2 cursor-pointer  rounded-full text-green-600 hover:bg-green-100 transition-colors">
                                {" "}
                                <FaPause />
                              </button>
                            </div> */}
                            <div className="flex justify-end items-center  ">
                              <button className="p-2 cursor-pointer  rounded-full text-green-600 hover:bg-green-100 transition-colors">
                                <FaPlay />
                              </button>
                              <button
                                onClick={() => handleEditTask(task)}
                                className="p-2 cursor-pointer  rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                              >
                                <FaEdit size={22} />
                              </button>
                              <button
                                onClick={() => handleDeleteTask(task._id)}
                                className="p-2 cursor-pointer rounded-full text-red-600 hover:bg-red-100 transition-colors"
                              >
                                <FaTrashAlt size={22} />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <div className="flex sm:flex-row flex-col gap-1">
                            <p className="mt-1 text-gray-700">
                              <span className="font-semibold">Subject:</span>{" "}
                              {task.subject} ,
                            </p>
                            <p className="mt-1 text-gray-700">
                              <span className="font-semibold"> Priority:</span>{" "}
                              <span className="capitalize">
                                {task.priority}
                              </span>
                            </p>
                          </div>
                          <div className="flex sm:flex-row flex-col gap-1">
                            <p className=" text-gray-700">
                              <span className="font-semibold">Deadline:</span>{" "}
                              {task.deadline}
                            </p>
                            <p className=" text-red-600 font-semibold">
                              ({task.countdown})
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyPlanner;
