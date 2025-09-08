import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

// Format exam time as AM/PM
const formatTime = (timeStr) => {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(":");
  const date = new Date();
  date.setHours(hours, minutes);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Form component for adding and updating exams.
const ExamForm = ({ exam, onSubmit, onCancel }) => {
  const [examName, setExamName] = useState(exam?.examName || "");
  const [examDate, setExamDate] = useState(exam?.examDate || "");
  const [examTime, setExamTime] = useState(exam?.examTime || "");
  const [teacher, setTeacher] = useState(exam?.teacher || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!examName || !examDate || !examTime) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Exam name, date, and time are required!",
        confirmButtonColor: "#2563eb",
      });
      return;
    }
    onSubmit({
      ...exam,
      examName,
      examDate,
      examTime,
      teacher,
      _id: exam?._id,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Exam Name
        </label>
        <input
          type="text"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          className="input input-bordered w-full"
          placeholder="e.g., Biology Midterm"
        />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            value={examTime}
            onChange={(e) => setExamTime(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Teacher (Optional)
        </label>
        <input
          type="text"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          className="input input-bordered w-full"
          placeholder="e.g., Professor Davis"
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <button type="button" onClick={onCancel} className="btn btn-ghost">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {exam ? "Update Exam" : "Add Exam"}
        </button>
      </div>
    </form>
  );
};

// Modal Component (DaisyUI modal-box ব্যবহার করে সুন্দরভাবে)
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Countdown Timer Component
const Countdown = ({ date, time }) => {
  const [remainingTime, setRemainingTime] = useState({});

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const examDateTime = new Date(`${date}T${time}`);
      const difference = examDateTime - now;

      if (difference <= 0) {
        setRemainingTime({ finished: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setRemainingTime({ days, hours, minutes, seconds, finished: false });
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, [date, time]);

  if (remainingTime.finished) {
    return <span className="text-red-500 font-bold">Exam Finished</span>;
  }

  return (
    <div className="font-semibold text-gray-800">
      {remainingTime.days > 0 ? `${remainingTime.days}d ` : ""}
      {remainingTime.hours > 0 || remainingTime.days > 0
        ? `${remainingTime.hours}h `
        : ""}
      {remainingTime.minutes > 0 || remainingTime.hours > 0
        ? `${remainingTime.minutes}m `
        : ""}
      {remainingTime.seconds > 0 ||
      (remainingTime.days === 0 &&
        remainingTime.hours === 0 &&
        remainingTime.minutes === 0)
        ? `${remainingTime.seconds}s`
        : ""}
    </div>
  );
};

// Main Component
const ExamSchedule = () => {
  const [exams, setExams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user, Loading } = useAuth();
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

  const loadExam = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://daily-flow-server-six.vercel.app/exams?email=${email}`
      );

      if (!response.ok) {
        throw new Error("Failed to Load Exam Data");
      }

      const data = await response.json();
      setExams(data);
    } catch (err) {
      Swal.fire("Error!", "Could not load exam data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      loadExam();
    }
  }, [email]);

  const handleAdd = async (newExam) => {
    try {
      await axios.post("https://daily-flow-server-six.vercel.app/exams", {
        ...newExam,
        user_email: email,
      });
      loadExam();
      Swal.fire("Success!", "Exam added successfully.", "success");
    } catch (err) {
      Swal.fire("Error!", "Could not add exam.", "error");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleUpdate = async (updatedExam) => {
    try {
      await axios.put(
        `https://daily-flow-server-six.vercel.app/exams/${updatedExam._id}`,
        updatedExam
      );
      loadExam();
      Swal.fire("Updated!", "Exam updated successfully.", "success");
    } catch (err) {
      Swal.fire("Failed!", "There was an issue updating the exam.", "error");
    } finally {
      setIsModalOpen(false);
      setEditingExam(null);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This exam will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://daily-flow-server-six.vercel.app/exams/${id}`
        );
        Swal.fire("Deleted!", "Exam deleted successfully.", "success");
        loadExam();
      } catch (err) {
        Swal.fire("Failed!", "Could not delete exam.", "error");
      }
    }
  };

  const openAddModal = () => {
    setEditingExam(null);
    setIsModalOpen(true);
  };

  const openEditModal = (exam) => {
    setEditingExam(exam);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingExam(null);
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-3 md:p-6 font-sans">
      <div className="container mx-auto max-w-7xl bg-white rounded-xl shadow-lg lg:p-6 p-3 md:p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold  text-gray-800">
            Exam Schedule
          </h1>
          <button onClick={openAddModal} className="btn btn-primary">
            + Add Exam
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center mt-6">
            <span className="loading loading-dots"> </span>
          </div>
        ) : (
          <>
            {exams.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M10 12h.01"
                  />
                </svg>
                <p className="text-lg">
                  No exams scheduled. Click the "Add Exam" button to get started!
                </p>
              </div>
            ) : (
              <>
                {/* Desktop and Tablet View */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-6 gap-2 p-3 font-bold text-gray-600 border-b border-gray-200">
                    <div>Exam Name</div>
                    <div className="text-center">Date</div>
                    <div className=" text-center">Time</div>
                    <div className=" text-center">Teacher</div>
                    <div className=" text-center">Remaining Time</div>
                    <div className="text-center">Actions</div>
                  </div>
                  <div className="space-y-2 mt-4 ">
                    {exams.map((exam) => {
                      const examDateTime = new Date(exam.examDate);
                      const dayName = examDateTime.toLocaleDateString("en-US", {
                        weekday: "long",
                      });
                      return (
                        <div
                          key={exam._id}
                          className="grid grid-cols-6 gap-2 p-3 justify-center items-center  bg-gray-100 rounded-lg shadow-inner  transition-colors duration-200 border border-gray-200"
                        >
                          <div className="font-medium text-gray-900">
                            {exam.examName}
                          </div>
                          <div className="text-gray-600  text-center">
                            {exam.examDate} ({dayName})
                          </div>
                          <div className="text-gray-600 text-center">
                            {formatTime(exam.examTime)}
                          </div>
                          <div className="text-gray-600  text-center ">
                            {exam.teacher || "N/A"}
                          </div>
                          <div className="text-gray-600  text-center  ">
                            <Countdown
                              date={exam.examDate}
                              time={exam.examTime}
                            />
                          </div>
                          <div className="w-[50%] mx-auto text-center">
                            <div className="flex gap-1 justify-center items-center  ">
                              <button
                                onClick={() => openEditModal(exam)}
                                className="p-2 cursor-pointer rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                              >
                                <FaEdit/>
                              </button>
                              <button
                                onClick={() => handleDelete(exam._id)}
                                className="p-2 cursor-pointer rounded-full text-red-600 hover:bg-red-100 transition-colors"
                              >
                               <FaTrashAlt />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden space-y-4">
                  {exams.map((exam) => {
                    const examDateTime = new Date(exam.examDate);
                    const dayName = examDateTime.toLocaleDateString("en-US", {
                      weekday: "long",
                    });
                    return (
                      <div
                        key={exam._id}
                        className="bg-white rounded-lg shadow-sm p-3 border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {exam.examName}
                          </h3>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditModal(exam)}
                              className="p-2 cursor-pointer rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                              >
                                <FaEdit/>
                            </button>
                            <button
                              onClick={() => handleDelete(exam._id)}
                              className="p-2 cursor-pointer rounded-full text-red-600 hover:bg-red-100 transition-colors"
                              >
                               <FaTrashAlt />
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>
                            <strong>Date:</strong> {exam.examDate} ({dayName})
                          </p>
                          <p>
                            <strong>Time:</strong> {formatTime(exam.examTime)}
                          </p>
                          <p>
                            <strong>Teacher:</strong> {exam.teacher || "N/A"}
                          </p>
                          <div className="mt-2 font-semibold">
                            <strong>Remaining:</strong>{" "}
                            <Countdown
                              date={exam.examDate}
                              time={exam.examTime}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingExam ? "Update Exam" : "Add Exam"}
      >
        <ExamForm
          exam={editingExam}
          onSubmit={editingExam ? handleUpdate : handleAdd}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

export default ExamSchedule;
