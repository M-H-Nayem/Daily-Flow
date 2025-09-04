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
    "px-4 py-2 rounded-md hover:bg-gray-500 hover:text-primary-content transition-colors ";
  let activeEffect = "bg-gray-500 text-gray-100 font-semibold shadow-lg";

  return (
    <nav className="sticky top-0 z-10 w-full bg-base-200 shadow-md">
      <div className=" mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* বাম অংশ: লোগো বা প্রজেক্টের নাম */}
          <a href="/" className="text-xl font-bold block lg:hidden">
            Daily Flow
          </a>

          {/* মাঝের অংশ: ডেস্কটপ মেনু */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* {isLoggedIn ? (
              // লগইন করা ব্যবহারকারীর জন্য মেনু
              <>
                <a href="/dashboard" className="hover:text-primary">ড্যাশবোর্ড</a>
                <a href="/schedule" className="hover:text-primary">শিডিউল</a>
                <a href="/budget" className="hover:text-primary">বাজেট</a>
                <a href="/planner" className="hover:text-primary">প্ল্যানার</a>
                <a href="/qna" className="hover:text-primary">কুইজ</a>
              </>
            ) : (
              // লগ আউট করা ব্যবহারকারীর জন্য মেনু
              <>
                <a href="/about" className="hover:text-primary">আমাদের সম্পর্কে</a>
                <a href="/features" className="hover:text-primary">ফিচারসমূহ</a>
                <a href="/contact" className="hover:text-primary">যোগাযোগ</a>
              </>
            )} */}
          </div>

          {/* ডান অংশ: লগইন/লগ আউট বাটন */}
          <div className="hidden lg:flex items-center">
            <ul>
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

          {/* মোবাইল মেনু টগল বাটন */}
          <div className="lg:hidden">
            <button onClick={handleMobileMenuToggle} className="btn btn-ghost">
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল মেনু কন্টেন্ট */}
      <div
        className={`lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "max-h-180 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col items-center py-4 space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${normalEffect} ${
                  isActive ? `${activeEffect}` : ""
                } mb-3 flex gap-3 justify-center items-center`
              }
              onClick={handleLinkClick}
            >
              <FaHome /> হোম
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/schedule"
              className={({ isActive }) =>
                `${normalEffect} ${
                  isActive ? `${activeEffect}` : ""
                } mb-3 flex gap-3 justify-center items-center`
              }
              onClick={handleLinkClick}
            >
              <FaBook /> ক্লাস শিডিউল
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/budget"
              className={({ isActive }) =>
                `${normalEffect} ${
                  isActive ? `${activeEffect}` : ""
                } mb-3 flex gap-3 justify-center items-center`
              }
              onClick={handleLinkClick}
            >
              <FaMoneyBillWave /> বাজেট ট্র্যাকার
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/qna"
              className={({ isActive }) =>
                `${normalEffect} ${
                  isActive ? `${activeEffect}` : ""
                } mb-3 flex gap-3 justify-center items-center`
              }
              onClick={handleLinkClick}
            >
              <FaQuestion /> এক্সাম Q&A
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/study-plan"
              className={({ isActive }) =>
                `${normalEffect} ${
                  isActive ? `${activeEffect}` : ""
                } mb-3 flex gap-3 justify-center items-center`
              }
              onClick={handleLinkClick}
            >
              <FaReadme /> স্টাডি প্ল্যানার
            </NavLink>
          </li>
          <li>
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
              প্রগ্রেস
            </NavLink>
          </li>

          {user ? (
            <li>
              <button onClick={handleLogout} className={`btn bg-gray-300`}>
                Log Out
              </button>
            </li>
          ) : (
            <li>
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
