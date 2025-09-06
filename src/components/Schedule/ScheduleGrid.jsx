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

const ScheduleGrid = ({ classesByDay, onEdit, onDelete, }) => {
  return (
    <>
      {/* 💻 Desktop View: Table Layout */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className='text-center'>Time</th>
              {daysOfWeek.map(day => (
                <th key={day} className='text-center'>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(time => (
              <tr key={time}>
                <td>{time}</td>
                {daysOfWeek.map(day => {
                  const classForSlot = classesByDay[day]?.find(slot => slot.time === time);
                  return (
                    <td key={`${day}-${time}`} className="relative p-2 h-24">
                      {classForSlot && Object.keys(classForSlot.class).length > 0 ? (
                        <div className="p-2 bg-base-200 rounded-lg shadow-sm h-full" style={{ borderLeft: `3px solid ${classForSlot.class.color}`, }} >
                          <h4 className="font-semibold text-[16px]">{classForSlot.class.subject}</h4>
                          <p className="text-sm text-gray-800 mb-2">- {classForSlot.class.teacher}</p>
                          <div className="flex justify-end gap-1 mt-auto">
                            <button className="btn btn-xs btn-info" onClick={() => onEdit(classForSlot.class, classForSlot.time, day)}>Edit</button>
                            <button className="btn btn-xs btn-error" onClick={() => onDelete(classForSlot.class._id, day)}>Delete</button>
                          </div>
                        </div>
                      ) : (
                        <button
                          className="btn btn-ghost btn-sm btn-block h-full text-xs text-primary "
                          onClick={() => onEdit(null, time, day)}
                        >
                          + Add New Class
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
      {/* 📱 Mobile View: Card Layout */}
      <div className="block lg:hidden">
        {daysOfWeek.map(day => {
          const classesForDay = classesByDay[day] || [];
          return (
            <div key={day} className="card w-full bg-base-100 shadow-xl mb-6 ">
              <div className="card-body p-3 ">
                <h3 className="card-title text-2xl font-bold mb-4">{day}</h3>
                {classesForDay.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {classesForDay.map(slot => (
                      <div key={slot.time}>
                        {Object.keys(slot.class).length > 0 ? (
                          <div className="p-4 bg-base-200 rounded-lg border-l-4 border-r-4" style={{ borderColor: slot.class.color }}>
                            <h4 className="font-semibold text-[18px]">{slot.class.subject}</h4>
                            <p className="text-[16px] text-gray-600">-{slot.class.teacher}</p>
                            <p className="text-sm text-gray-500 mb-2">{slot.time}</p>
                            <div className="flex justify-end gap-2">
                              <button className="btn btn-sm btn-info" onClick={() => onEdit(slot.class, slot.time, day)}>Edit</button>
                              <button className="btn btn-sm btn-error" onClick={() => onDelete(slot.class._id, day)}>Delete</button>
                            </div>
                          </div>
                        ) : (
                          <button
                            className="btn btn-ghost btn-sm btn-block h-20 text-primary border border-dashed"
                            onClick={() => onEdit(null, slot.time, day)}
                          >
                            {slot.time} <br />
                            + Add New Class
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <p>No Class Today</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ScheduleGrid;