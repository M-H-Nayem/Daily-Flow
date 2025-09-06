// src/components/StudentSuccessCenter.js
import React from 'react';
import { FaGraduationCap, FaMedal, FaLightbulb, FaBook, FaBullseye } from 'react-icons/fa';

// Static data that you can hardcode here
const successModules = [
  {
    id: 1,
    title: "Effective Study Techniques",
    icon: <FaGraduationCap />,
    ringColor: "ring-blue-500",
    tips: [
      { name: "Pomodoro Technique", details: "Study in 25-minute intervals with short breaks to boost focus." },
      { name: "Spaced Repetition", details: "Review material at increasing intervals to improve long-term memory." },
      { name: "Active Recall", details: "Actively retrieve information from memory without looking at your notes." }
    ]
  },
  {
    id: 2,
    title: "Productivity & Time Management",
    icon: <FaMedal />,
    ringColor: "ring-green-500",
    tips: [
      { name: "Prioritize Tasks", details: "Focus on high-priority items first to ensure you meet deadlines." },
      { name: "Time Blocking", details: "Allocate specific time slots for each task on your schedule." },
      { name: "Avoid Distractions", details: "Keep your phone away and close unnecessary tabs while studying." }
    ]
  },
  {
    id: 3,
    title: "Mental Wellness",
    icon: <FaLightbulb />,
    ringColor: "ring-yellow-500",
    tips: [
      { name: "Proper Sleep", details: "Aim for a consistent sleep schedule to improve concentration." },
      { name: "Stress Management", details: "Take regular breaks and make time for hobbies you enjoy." },
      { name: "Avoid Burnout", details: "Don't overload your schedule. Learn to say no and take time off." }
    ]
  },
  {
    id: 4,
    title: "Essential Online Resources",
    icon: <FaBook />,
    ringColor: "ring-rose-500",
    tips: [
      { name: "Course Platforms", details: "Use sites like Coursera or Khan Academy for free online courses." },
      { name: "Research Tools", details: "Explore Google Scholar for academic articles and publications." },
      { name: "Citation Generators", details: "Use tools like Zotero to quickly create and manage citations." }
    ]
  }
];

const StudentSuccessCenter = () => {
  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-[90vh]">
      <title>Daily Flow || Progress</title>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-4 leading-tight">
          Student Success Center
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-12">
          Here are some valuable tips and resources for your academic journey, productivity, and mental well-being.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {successModules.map(module => (
            <div
              key={module.id}
              className={`
                bg-white p-6 rounded-2xl shadow-xl transform transition-all duration-500
                 hover:shadow-2xl 
              `}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-white text-3xl text-gray-700">
                  {module.icon}
                </div>
                <h3 className="text-xl font-bold ml-4 text-gray-800">
                  {module.title}
                </h3>
              </div>
              <ul className="space-y-4 text-gray-600">
                {module.tips.map((tip, index) => (
                  <li key={index}>
                    <div className="flex items-start">
                      <FaBullseye className="text-lg mr-2 flex-shrink-0 mt-1" />
                      <div>
                        <span className="font-semibold">{tip.name}:</span>
                        <p className="text-sm">{tip.details}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentSuccessCenter;