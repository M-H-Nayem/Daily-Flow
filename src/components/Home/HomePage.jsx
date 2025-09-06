// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee'; // Import Marquee
import { FaGraduationCap, FaDollarSign, FaQuestion, FaStar, FaLightbulb } from 'react-icons/fa'; // Import icons

const HomePage = () => {

  return (
    <div className=" bg-gray-50 text-gray-800">
      {/* Marquee Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-2 text-white shadow-md">
        <Marquee gradient={false} speed={50} pauseOnHover={true}>
          <p className="text-lg font-medium mx-10">
            🚀 Exciting New Features Coming Soon! Stay Tuned! 🎓 Manage your studies smarter with us! 🌟
          </p>
        </Marquee>
      </div>

      {/* Hero Section */}
      <div className="relative flex items-center justify-center min-h-[88vh] px-4 py-16 bg-cover bg-center"
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay */}
        <div className="relative z-1 text-white text-center p-6 md:p-10 lg:p-12 max-w-5xl mx-auto  bg-opacity-10 rounded-xl shadow-2xl backdrop-blur-sm">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in-down">
            Welcome to <span className="text-blue-300">Daily Flow</span>!
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-8 animate-fade-in-up">
            Simplify your daily student life with our comprehensive tools.
          </p>
          <div className="space-y-4 md:space-y-0 md:flex md:justify-center md:space-x-6">
            <Link to="/schedule" className="btn bg-gray-200 hover:bg-gray-100 text-blue-900 border-none text-lg px-8 py-3 rounded-full shadow-lg transform transition-transform hover:scale-105">
              Get Started Now!
            </Link>
           
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default HomePage;