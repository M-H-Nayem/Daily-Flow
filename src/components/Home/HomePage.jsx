// src/components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import {
  FaGraduationCap,
  FaDollarSign,
  FaCalendarAlt,
  FaBook,
  FaRegClock,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import Faq from "./Faq";

const HomePage = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* 🔵 Marquee Section */}
      <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-2 text-black shadow-md">
        <Marquee gradient={false} speed={50} pauseOnHover={true}>
          <p className="text-lg font-medium mx-10">
            🚀 New Features Coming Soon! | 📚 Study Planner | 📅 Smart Schedule
            | 💰 Budget Manager | 🎓 Exam Routine | 🌟 Stay Organized Every Day
            with Daily Flow!
          </p>
        </Marquee>
      </div>

      {/* 🟣 Hero Section */}
      <div
        className="relative flex items-center justify-center min-h-[90vh] px-4 py-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2942&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-1 text-white text-center max-w-4xl p-6">
           <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
   <Typewriter
    words={['Welcome to Daily Flow','Easy Your Daily Life']}
    loop={0}
    cursor
    cursorStyle='|'
    typeSpeed={50}
    deleteSpeed={40}
    delaySpeed={1000}
   />
  </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium mb-10 opacity-90">
            Simplify your daily student life with{" "}
            <span className="font-bold text-indigo-300">all-in-one tools</span>.
          </p>
          <Link
            to="/schedule"
            className="btn border-none bg-indigo-500 hover:bg-indigo-600 text-white text-lg px-8 py-3 rounded-full shadow-lg transform transition-transform"
          >
            🚀 Get Started
          </Link>
        </div>
      </div>

      {/* 🟡 Features Section */}
      <section className="py-16  md:px-6 px-3 bg-gradient-to-b from-gray-50 to-indigo-50">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">
          Why Choose Daily Flow?
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
            <FaCalendarAlt className="text-indigo-500 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Class Schedule</h3>
            <p className="text-gray-600">
              Organize your daily classes with a clean timetable view.
            </p>
          </div>
          {/* Card 2 */}
          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
            <FaBook className="text-green-500 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Study Planner</h3>
            <p className="text-gray-600">
              Break down study goals into small, trackable tasks.
            </p>
          </div>
          {/* Card 3 */}
          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
            <FaDollarSign className="text-yellow-500 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Budget Manager</h3>
            <p className="text-gray-600">
              Track your expenses and manage finances smarter.
            </p>
          </div>
          {/* Card 4 */}
          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
            <FaGraduationCap className="text-purple-500 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Exam Routine</h3>
            <p className="text-gray-600">
              Stay ahead by keeping your exam routine organized.
            </p>
          </div>
        </div>
      </section>

      {/* 🟢 Motivation Section */}
      <section className="py-16 md:px-6 px-3 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-700 text-center">
        <div className="max-w-3xl mx-auto">
          <FaRegClock className="text-5xl mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Plan Smart. Study Smart.
          </h2>
          <p className="text-lg opacity-90 mb-6">
            Time is your greatest resource — use it wisely with Daily Flow.
          </p>
          <Link
            to="/study-plan"
            className="btn bg-white text-indigo-700 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-200"
          >
            Start Planning 📅
          </Link>
        </div>
      </section>
      <Faq></Faq>

      {/* 🔴 Footer CTA */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4 sm:px-6 lg:px-8">
   <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
    <div className="mb-4 md:mb-0 text-center md:text-left">
     <h1 className="text-2xl font-bold text-white mb-1">Daily Flow</h1>
     <p className="text-sm">Built for Students 🚀</p>
    </div>
    <div className="flex items-center space-x-6 text-2xl mb-4 md:mb-0">
      <a href="https://www.facebook.com/mahmudulhasannayem698" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
    <FaFacebook />
   </a>
   <a href="https://x.com/m_h__nayem" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
    <FaTwitter />
   </a>
   <a href="https://www.linkedin.com/in/md--mahmudul-hasan-nayem/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
    <FaLinkedin />
   </a>
   <a href="https://github.com/M-H-Nayem" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
    <FaGithub />
   </a>
    </div>
    <div className="text-center md:text-right">
     <p className="text-sm">
      &copy; {new Date().getFullYear()} Daily Flow. All rights reserved.
     </p>
    </div>
   </div>
  </footer>
    </div>
  );
};

export default HomePage;
