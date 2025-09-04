// src/components/HomePage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
 
  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl image-full">
        <figure>
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Student study" />
        </figure>
        <div className="card-body text-white flex flex-col items-center justify-center text-center">
          <h2 className="card-title text-4xl md:text-5xl font-extrabold mb-4">স্বাগতম!</h2>
          <p className="text-xl md:text-2xl font-semibold mb-6">আপনার দৈনন্দিন ছাত্রজীবন সহজ করতে আমাদের সাথে যোগ দিন।</p>
          <div className="prose text-lg text-gray-200">
            <p className='mb-5'>এই অ্যাপটি আপনাকে সাহায্য করবে:</p>
            <ul className="list-disc list-inside space-y-2 ">
              <li>আপনার ক্লাস শিডিউল ট্র্যাক করতে।</li>
              <li>বাজেট এবং খরচ নিয়ন্ত্রণ করতে।</li>
              <li>পরীক্ষার জন্য প্রশ্ন ও উত্তর তৈরি করতে।</li>
            </ul>
          </div>
          <div className="card-actions justify-center mt-8">
            <Link to="/schedule" className="btn bg-gray-500 border-none  text-white shadow-none">শুরু করুন</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;