import React from 'react';

const timeSlots = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '1:00 PM - 2:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ScheduleTable = ({ classesByDay, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>সময়</th>
            {daysOfWeek.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(time => (
            <tr key={time}>
              <td>{time}</td>
              {daysOfWeek.map(day => {
                const classForSlot = classesByDay[day]?.find(cls => cls.time === time);
                return (
                  <td key={`${day}-${time}`} className="relative p-2 h-24">
                    {classForSlot ? (
                      <div className="p-2 bg-base-200 rounded-lg shadow-sm h-full" style={{ borderLeft: `5px solid ${classForSlot.color}` }}>
                        <h4 className="font-bold text-sm">{classForSlot.subject}</h4>
                        <p className="text-xs text-gray-600 mb-2">{classForSlot.instructor}</p>
                        <div className="flex justify-end gap-1 mt-auto">
                          <button className="btn btn-xs btn-info" onClick={() => onEdit(classForSlot, day)}>এডিট</button>
                          <button className="btn btn-xs btn-error" onClick={() => onDelete(classForSlot._id, day)}>ডিলিট</button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-xs text-gray-400">
                        <p>No Class</p>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;