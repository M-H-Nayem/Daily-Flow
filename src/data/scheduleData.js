// src/data/scheduleData.js

export const fetchScheduleData = () => {
  const scheduleData = {
    'Monday': [
      { time: '9:00 AM - 10:00 AM', class: { _id: '1', subject: 'Physics', instructor: 'Mr. Jones', color: '#1B9CFC' } },
      { time: '10:00 AM - 11:00 AM', class: {} },
      { time: '11:00 AM - 12:00 PM', class: { _id: '2', subject: 'English Literature', instructor: 'Ms. White', color: '#B33771' } },
      { time: '12:00 PM - 1:00 PM', class: {} },
      { time: '1:00 PM - 2:00 PM', class: {} },
      { time: '2:00 PM - 3:00 PM', class: { _id: '3', subject: 'Math', instructor: 'Mr. Zahan', color: '#FF5733' } },
      { time: '3:00 PM - 4:00 PM', class: {} },
      { time: '4:00 PM - 5:00 PM', class: {} },
    ],
    'Tuesday': [
      { time: '9:00 AM - 10:00 AM', class: {} },
      { time: '10:00 AM - 11:00 AM', class: { _id: '4', subject: 'Chemistry', instructor: 'Ms. Lily', color: '#5C44F3' } },
      { time: '11:00 AM - 12:00 PM', class: {} },
      { time: '12:00 PM - 1:00 PM', class: {} },
      { time: '1:00 PM - 2:00 PM', class: { _id: '5', subject: 'History', instructor: 'Mr. Adams', color: '#2ecc71' } },
      { time: '2:00 PM - 3:00 PM', class: {} },
      { time: '3:00 PM - 4:00 PM', class: {} },
      { time: '4:00 PM - 5:00 PM', class: {} },
    ],
    'Wednesday': [
      { time: '9:00 AM - 10:00 AM', class: { _id: '6', subject: 'Biology', instructor: 'Ms. Khan', color: '#9b59b6' } },
      { time: '10:00 AM - 11:00 AM', class: {} },
      { time: '11:00 AM - 12:00 PM', class: {} },
      { time: '12:00 PM - 1:00 PM', class: {} },
      { time: '1:00 PM - 2:00 PM', class: { _id: '22', subject: 'Math', instructor: 'Mr. Zahan', color: '#FF5733' } },
      { time: '2:00 PM - 3:00 PM', class: {} },
      { time: '3:00 PM - 4:00 PM', class: {} },
      { time: '4:00 PM - 5:00 PM', class: { _id: '7', subject: 'Physical Education', instructor: 'Mr. Sam', color: '#34495e' } },
    ],
    'Thursday': [
      { time: '9:00 AM - 10:00 AM', class: {} },
      { time: '10:00 AM - 11:00 AM', class: {} },
      { time: '11:00 AM - 12:00 PM', class: { _id: '8', subject: 'Economics', instructor: 'Ms. Johnson', color: '#e67e22' } },
      { time: '12:00 PM - 1:00 PM', class: {} },
      { time: '1:00 PM - 2:00 PM', class: {} },
      { time: '2:00 PM - 3:00 PM', class: {} },
      { time: '3:00 PM - 4:00 PM', class: {} },
      { time: '4:00 PM - 5:00 PM', class: {} },
    ],
    'Friday': [
      { time: '9:00 AM - 10:00 AM', class: { _id: '9', subject: 'Computer Science', instructor: 'Mr. Lee', color: '#f39c12' } },
      { time: '10:00 AM - 11:00 AM', class: {} },
      { time: '11:00 AM - 12:00 PM', class: {} },
      { time: '12:00 PM - 1:00 PM', class: {} },
      { time: '1:00 PM - 2:00 PM', class: { _id: '10', subject: 'French', instructor: 'Ms. Dubois', color: '#c0392b' } },
      { time: '2:00 PM - 3:00 PM', class: {} },
      { time: '3:00 PM - 4:00 PM', class: {} },
      { time: '4:00 PM - 5:00 PM', class: {} },
    ],
    'Saturday': [
      { time: '9:00 AM - 10:00 AM', class: {} },
      { time: '10:00 AM - 11:00 AM', class: {} },
      { time: '11:00 AM - 12:00 PM', class: {} },
      { time: '12:00 PM - 1:00 PM', class: {} },
      { time: '1:00 PM - 2:00 PM', class: {} },
      { time: '2:00 PM - 3:00 PM', class: {} },
      { time: '3:00 PM - 4:00 PM', class: {} },
      { time: '4:00 PM - 5:00 PM', class: {} },
    ],
    'Sunday': [
      { time: '9:00 AM - 10:00 AM', class: {} },
      { time: '10:00 AM - 11:00 AM', class: {} },
      { time: '11:00 AM - 12:00 PM', class: {} },
      { time: '12:00 PM - 1:00 PM', class: {} },
      { time: '1:00 PM - 2:00 PM', class: {} },
      { time: '2:00 PM - 3:00 PM', class: {} },
      { time: '3:00 PM - 4:00 PM', class: {} },
      { time: '4:00 PM - 5:00 PM', class: {} },
    ],
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(scheduleData);
    }, 1000);
  });
};