import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaBook,
  FaMoneyBillWave,
  FaQuestion,
  FaStudiovinari,
  FaReadme,
  FaChartLine,
} from "react-icons/fa";
import useAuth from "./Hooks/useAuth";

const Navbar = () => {
  let { user, logOut } = useAuth();
  let navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    try {
      logOut();
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  let normalEffect =
    "px-4 py-2 bg-gray-200 lg:rounded-md hover:bg-gray-500 hover:text-primary-content transition-colors ";
  let activeEffect = "bg-gray-500 text-gray-100 font-semibold shadow-lg";

  return (
    <nav className="sticky top-0 z-10 w-full bg-base-200 shadow-md">
      <div className=" mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="text-2xl font-bold block lg:hidden">
            Daily Flow
          </a>

          <div className="hidden lg:flex items-center space-x-4">
           
          </div>

          <div className="hidden lg:flex items-center">
            <ul className="mr-10 font-bold">
              {user ? (
            <li>
              <button onClick={handleLogout} className={`btn bg-gray-300`}>
                Log Out
              </button>
            </li>
          ) : (
            <li className="flex gap-5 justify-center items-center">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${normalEffect} ${
                    isActive ? `${activeEffect}` : ""
                  } bg-gray-300  flex gap-3 justify-center items-center btn-success`
                }
                onClick={handleLinkClick}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${normalEffect} ${
                    isActive ? `${activeEffect}` : ""
                  } bg-gray-300 flex gap-3 justify-center items-center btn-success`
                }
                onClick={handleLinkClick}
              >
                Register
              </NavLink>
            </li>
          )}
            </ul>
          </div>

          {/* Mobile toogle */}
          <div className="lg:hidden">
            <button onClick={handleMobileMenuToggle} className="btn btn-ghost">
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile*/}
      <div
        className={`lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "max-h-180 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col items-center py-4">
          <li className="w-full">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${normalEffect} ${
                  isActive ? `${activeEffect}` : ""
                } mb-3 flex gap-3 justify-center items-center `
              }
              onClick={handleLinkClick}
            >
              <FaHome /> Home
            </NavLink>
          </li>
          <li  className="w-full">
            <NavLink
              to="/schedule"
              className={({ isActive }) =>
                `${normalEffect} ${
                  isActive ? `${activeEffect}` : ""
                } mb-3 flex gap-3 justify-center items-center`
              }
              onClick={handleLinkClick}
            >
              <FaBook /> Class Schedule
            </NavLink>
          </li>
          <li  className="w-full">
            <NavLink
              to="/budget"
              className={({ isActive }) =>
                `${normalEffect} ${
                  isActive ? `${activeEffect}` : ""
                } mb-3 flex gap-3 justify-center items-center`
              }
              onClick={handleLinkClick}
            >
              <FaMoneyBillWave /> Budget Tracker
            </NavLink>
          </li>
          <li  className="w-full">
            <NavLink
              to="/qna"
              className={({ isActive }) =>
                `${normalEffect} ${
                  isActive ? `${activeEffect}` : ""
                } mb-3 flex gap-3 justify-center items-center`
              }
              onClick={handleLinkClick}
            >
              <FaQuestion /> Exam Q&A
            </NavLink>
          </li>
          <li  className="w-full">
            <NavLink
              to="/study-plan"
              className={({ isActive }) =>
                `${normalEffect} ${
                  isActive ? `${activeEffect}` : ""
                } mb-3 flex gap-3 justify-center items-center`
              }
              onClick={handleLinkClick}
            >
              <FaReadme /> Study Planner
            </NavLink>
          </li>
          <li  className="w-full">
            <NavLink
              to="/progress"
              className={({ isActive }) =>
                `${normalEffect} ${
                  isActive ? `${activeEffect}` : ""
                } mb-3 flex gap-3 justify-center items-center`
              }
              onClick={handleLinkClick}
            >
              <FaChartLine />
             Progress
            </NavLink>
          </li>

          {user ? (
            <li>
              <button onClick={handleLogout} className={`btn bg-gray-300`}>
                Log Out
              </button>
            </li>
          ) : (
            <li  className="w-full">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${normalEffect} ${
                    isActive ? `${activeEffect}` : ""
                  } mb-3 flex gap-3 justify-center items-center btn-success`
                }
                onClick={handleLinkClick}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${normalEffect} ${
                    isActive ? `${activeEffect}` : ""
                  } mb-3 flex gap-3 justify-center items-center btn-success`
                }
                onClick={handleLinkClick}
              >
                Register
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
