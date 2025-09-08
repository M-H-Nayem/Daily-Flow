import React, { useState, } from "react";
import { FiUploadCloud, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import useAuth from "../Hooks/useAuth";
// import useAxiosSecure from "../Hooks/useAxiosSecure";
import SocialLogin from "./SocialLogin";
import useAuth from "../Hooks/useAuth";
import { AuthContext } from "../../../AuthContext";

const Register = () => {
  let { createUser, user,} = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate()

  // console.log(user);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let form = e.target;
    let name = form.name.value;
    let email = form.email.value;
    let password = form.password.value;
    let formData = { name, email, password };

    // console.log(formData);

    createUser(email, password)
  .then(async () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "User created successfully!",
      showConfirmButton: false,
      timer: 1500, 
    });
    
    setTimeout(() => {
      navigate('/');
    }, 1500);
  })
  .catch((error) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message || "Something went wrong! Please try again.",
    });
  });
  };

  return (
    <div className="w-full flex justify-center items-center h-[90vh] bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100  p-4">
      <div className="w-lg mx-auto  p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800 text-center">
          Register
        </h2>
        <title>Register</title>
        <div className="bg-gray-100 rounded-lg shadow-inner p-5">

          <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <label className="block mb-2 font-medium" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`input input-bordered w-full mb-2 `}
          />

          {/* Email */}
          <label className="block mb-2 font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`input input-bordered w-full mb-2 `}
          />

          {/* Password */}
          <label className="block mb-2 font-medium" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className={`input input-bordered w-full pr-10 `}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-500 z-100 "
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary w-full mt-4">
            Register
          </button>
        </form>
        </div>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <button className="text-primary font-semibold hover:underline">
            <Link to={"/login"}>Login</Link>
          </button>
        </p>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
