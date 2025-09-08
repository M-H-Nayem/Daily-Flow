// src/components/SchedulePage.js

import React, { useState, useEffect } from "react";
import AddEditClassModal from "./AddEditClassModal";
import ScheduleGrid from "./ScheduleGrid";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const timeSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
];

const processScheduleData = (fetchedData) => {
  const classesByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = timeSlots.map((time) => ({ time, class: {} }));
    return acc;
  }, {});

  fetchedData.forEach((item) => {
    const day = item.day;
    const time = item.time;
    if (classesByDay[day]) {
      const slotIndex = classesByDay[day].findIndex(
        (slot) => slot.time === time
      );
      if (slotIndex !== -1) {
        classesByDay[day][slotIndex].class = {
          _id: item._id,
          subject: item.subject,
          teacher: item.teacher,
          color: item.color || "#FF5733", // You can add logic to assign colors here
        };
      }
    }
  });
  return classesByDay;
};

const SchedulePage = () => {
  let { user , Loading } = useAuth();
 

  const [classesByDay, setClassesByDay] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const loadData = async () => {
    try {
      const response = await fetch(
        `https://daily-flow-server-six.vercel.app/schedule?email=${email}`
      );

      if (!response.ok) {
        throw new Error("Failed to Load Data");
      }

      const data = await response.json();

      // console.log(data);

      const processedData = processScheduleData(data);
      setClassesByDay(processedData);
      setError(null);
    } catch (err) {
      // console.log(err);
      setError("Error While Loading");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
  if (email) {
    loadData();
  }
}, [email]);

  const handleAddClass = async (newClass) => {
    // console.log("from handle add", newClass);
    try {
      await axios.post("https://daily-flow-server-six.vercel.app/schedule", {
        ...newClass,
        user_email: email,
      });
      loadData();
    } catch (err) {
      // console.log(err);
      setError("There was an issue adding a new class.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleEditClass = async (updatedClass) => {
    // console.log("from handle update", updatedClass);

    try {
      await axios.put(
        `https://daily-flow-server-six.vercel.app/schedule/${updatedClass._id}`,
        updatedClass
      );

      loadData();
    } catch (err) {
      // console.log(err);
      Swal.fire("Failed!", "There was an issue updating the class.", "error");
    } finally {
      setIsModalOpen(false);
    }
  };
  const handleDeleteClass = async (idToDelete) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://daily-flow-server-six.vercel.app/schedule/${idToDelete}`);
        Swal.fire(
          "Deleted!",
          "Your class has been successfully deleted.",
          "success"
        );
        loadData();
      } catch (err) {
        // console.log(err);
        Swal.fire("Failed!", "There was an issue deleting the class.", "error");
      }
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <span className="loading loading-dots loading-lg text-primary"></span>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="alert alert-error text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex  justify-center min-h-[90vh] bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-3 pt-3 ">
      <title>Daily Flow || Schedule</title>
      <div className="container h-fit bg-gray-50 rounded-2xl lg:my-3">
        <div className="flex justify-between items-center mb-6">
          <h2 className=" text-gray-800 text-center w-full p-4 pb-0 text-3xl sm:text-4xl font-bold">
            Class Schedule
          </h2>
        </div>

        {
          isLoading?  <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>:
       

        <div className="">


        <div className="card w-full bg-none ">
          <div className="card-body p-3 ">
            <ScheduleGrid
              classesByDay={classesByDay}
              onEdit={(cls, time, day) => {
                setEditingClass({ ...cls, time, day });
                setIsModalOpen(true);
              }}
              onAdd={handleAddClass}
              onDelete={handleDeleteClass}
            />
          </div>
        </div>

        {isModalOpen && (
          <AddEditClassModal
            onClose={() => setIsModalOpen(false)}
            handleAddClass={handleAddClass}
            handleEditClass={handleEditClass}
            initialData={editingClass}
          />
        )}
        </div>
 }
      </div>
    </div>
  );
};

export default SchedulePage;
