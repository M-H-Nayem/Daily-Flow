// src/components/FAQ.js
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const Faq = () => {
 const [openIndex, setOpenIndex] = useState(null);

 const faqData = [
  {
   question: "What is Daily Flow?",
   answer:
    "Daily Flow is a comprehensive productivity web application designed to help you manage your tasks, plan your studies, and track your progress. It's a single platform to organize your daily life efficiently.",
  },
  {
   question: "How can I get started?",
   answer:
    "Getting started is easy! Simply sign up for a free account, and you can immediately begin adding tasks to your study planner, setting deadlines, and tracking your progress.",
  },
  {
   question: "Is Daily Flow free to use?",
   answer:
    "Yes, Daily Flow offers a robust free tier with all the essential features you need to stay organized. We also have premium plans with advanced features for power users, coming soon.",
  },
  {
   question: "Can I access my tasks on multiple devices?",
   answer:
    "Absolutely! Daily Flow is a web-based application, which means you can access your account and all your data from any device with a web browser, including desktops, laptops, tablets, and smartphones.",
  },
  {
   question: "How do I contact support?",
   answer:
    "If you have any questions or run into any issues, you can reach out to our support team through the 'Contact Us' page. We are always here to help you get the most out of Daily Flow.",
  },
 ];

 const toggleAnswer = (index) => {
  setOpenIndex(openIndex === index ? null : index);
 };

 return (
  <div className="bg-gray-50 py-16 px-3 sm:px-6">
   <div className="max-w-7xl mx-auto text-center mb-12">
    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
     Frequently Asked Questions
    </h2>
    <p className="mt-4 text-lg text-gray-500">
     Quick answers to the most common questions you might have.
    </p>
   </div>
   <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg divide-y divide-gray-200">
    {faqData.map((item, index) => (
     <div key={index} className="py-6 px-6">
      <button
       className="w-full flex justify-between items-center text-left"
       onClick={() => toggleAnswer(index)}
      >
       <span className="text-lg font-medium text-gray-900">
        {item.question}
       </span>
       {openIndex === index ? (
        <FaMinus className="h-5 w-5 text-blue-500" />
       ) : (
        <FaPlus className="h-5 w-5 text-gray-400" />
       )}
      </button>
      {openIndex === index && (
       <p className="mt-4 text-gray-600">{item.answer}</p>
      )}
     </div>
    ))}
   </div>
  </div>
 );
};

export default Faq;