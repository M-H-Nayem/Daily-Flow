import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const AddEditClassModal = ({
  onClose,
  handleAddClass,
  handleEditClass,
  initialData,
}) => {

  let {user} = useAuth()
  let email = "mahmudulhasannayemssnic@gmail.com";

  if (user) {
    email= user.email
  }

  const [formData, setFormData] = useState({
    subject: initialData.subject || "",
    teacher: initialData.teacher || "",
    day: initialData.day || "Sunday",
    time: initialData.time || "",
    color: initialData.color || "#000000",
  });

  useEffect(() => {
    if (initialData) {
      // console.log("initial data", initialData);
      // console.log("before", formData);
      setFormData(initialData);
      // console.log("after", formData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      user_email: email,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData._id) {
      handleEditClass(formData);
      Swal.fire({
        icon: "success",
        title: "Class Updated!",
        text: "The class has been successfully updated.",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      handleAddClass(formData);
      Swal.fire({
        icon: "success",
        title: "Class Added!",
        text: "The new class has been added to your schedule.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {initialData._id ? "Edit Class" : "Add New Class"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Subject</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Instructor Name </span>
            </label>
            <input
              type="text"
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              placeholder="Enter instructor name"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Day</span>
            </label>
            <input
              type="text"
              name="day"
              value={formData.day}
              onChange={handleChange}
              placeholder="Enter instructor name"
              className="input input-bordered w-full"
              readOnly
            />
           
          </div>
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Time</span>
            </label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="Enter instructor name"
              className="input input-bordered w-full"
              readOnly
            />
           
          </div>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Color</span>
            </label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-12 h-12 rounded-lg"
              required
            />
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialData._id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditClassModal;
