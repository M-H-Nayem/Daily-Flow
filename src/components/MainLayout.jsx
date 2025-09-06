import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { FaBars, FaHome, FaBook, FaMoneyBillWave, FaQuestion, FaStudiovinari, FaReadme, FaChartLine } from 'react-icons/fa';
import Navbar from './Navbar';

const MainLayout = () => {
  // navOpen state এখানে প্রয়োজন নেই, তাই এটি বাদ দেওয়া হয়েছে।

  const handleLinkClick = () => {
    // ছোট ডিভাইসে ড্রয়ারটি বন্ধ করার জন্য এই ফাংশনটি ব্যবহার করা হয়েছে।
    const checkbox = document.getElementById('my-drawer-2');
    if (checkbox) {
      checkbox.checked = false;
    }
  };

  let normalEffect =
    "px-4 py-2 rounded-md hover:bg-gray-500 hover:text-primary-content transition-colors bg-gray-200 ";
  let activeEffect = "bg-gray-500 text-gray-100 font-semibold shadow-lg";

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start justify-start  bg-gray-100 min-h-screen">
        {/* Mobile Navbar */}
        {/* <label htmlFor="my-drawer-2" className="btn btn-primary lg:hidden mb-4">
          <FaBars />
        </label> */}
        
        {/* Main Content Area */}
        <div className="w-full">
          <Navbar></Navbar>
          <div className="w-full mx-auto">


          <Outlet />
          </div>
        </div>
      </div> 

      {/* Sidebar */}
      <div className="drawer-side z-100 ">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content  ">
          <h2 className="text-3xl font-bold mb-6">Daily Flow</h2>
          {/* Sidebar content here */}
          <li>
            <NavLink to="/" className={({ isActive }) =>
                      `${normalEffect} ${isActive ? `${activeEffect}` : ""} mb-3 `
                    } onClick={handleLinkClick}>
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/schedule" className={({ isActive }) =>
                      `${normalEffect} ${isActive ? `${activeEffect}` : ""} mb-3`
                    } onClick={handleLinkClick}>
              <FaBook /> Class Schedule
            </NavLink>
          </li>
          <li>
            <NavLink to="/budget" className={({ isActive }) =>
                      `${normalEffect} ${isActive ? `${activeEffect}` : ""} mb-3`
                    } onClick={handleLinkClick}>
              <FaMoneyBillWave /> Budget Tracker
            </NavLink>
          </li>
          <li>
            <NavLink to="/qna" className={({ isActive }) =>
                      `${normalEffect} ${isActive ? `${activeEffect}` : ""} mb-3`
                    } onClick={handleLinkClick}>
              <FaQuestion /> Exam Q&A
            </NavLink>
          </li>
          <li>
            <NavLink to="/study-plan" className={({ isActive }) =>
                      `${normalEffect} ${isActive ? `${activeEffect}` : ""} mb-3`
                    } onClick={handleLinkClick}>
              <FaReadme /> Study Planner
            </NavLink>
          </li>
          <li>
            <NavLink to="/progress" className={({ isActive }) =>
                      `${normalEffect} ${isActive ? `${activeEffect}` : ""} mb-3`
                    } onClick={handleLinkClick}>
              <FaChartLine /> Progress
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainLayout;