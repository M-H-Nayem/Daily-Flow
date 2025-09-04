import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
import useAuth from "../Hooks/useAuth";

const Login = () => {
  let { logIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
let navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    logIn(data.email, data.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome back!`,
          timer: 2000,
          showConfirmButton: false,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message || "Invalid credentials",
        });
      });
    // You'll handle Firebase or API logic here
  };

  return (
    <div className="w-full flex justify-center items-center  h-[90vh] lg:p-0">
      <div className="w-lg p-6 bg-gray-300 rounded-lg shadow-2xl ">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-800 text-center">
          Login
        </h2>
        <title>Login</title>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <label className="block mb-2 font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`input input-bordered w-full mb-2 ${
              errors.email ? "input-error" : ""
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-error text-sm mb-2">{errors.email.message}</p>
          )}

          {/* Password */}
          <label className="block mb-2 font-medium" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`input input-bordered w-full pr-10 ${
                errors.password ? "input-error" : ""
              }`}
              {...register("password", {
                required: "Password is required",
              })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-error text-sm mb-2">{errors.password.message}</p>
          )}

          <button type="submit" className="btn btn-primary w-full mt-4">
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <button className="text-primary font-semibold hover:underline">
            <Link to={"/register"}>Register here</Link>
          </button>
        </p>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
