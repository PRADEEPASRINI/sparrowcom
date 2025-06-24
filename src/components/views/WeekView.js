import React from 'react';
import { formatTime, isSameDate } from '../../utils/dateUtils';

const WeekView = ({ currentDate, events, birthdays, showEvents, showBirthdays }) => {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForDateTime = (date, hour) => {
    const dateStr = date.toISOString().split('T')[0];
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    
    return events.filter(event => {
      if (!showEvents) return false;
      if (event.date !== dateStr) return false;
      
      const eventStartHour = parseInt(event.startTime.split(':')[0]);
      const eventEndHour = parseInt(event.endTime.split(':')[0]);
      
      return hour >= eventStartHour && hour < eventEndHour;
    });
  };

  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-8 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-3"></div>
        {weekDays.map((date, index) => (
          <div key={index} className="bg-gray-50 p-3 text-center">
            <div className="font-semibold">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <div className={`text-sm ${isSameDate(date, new Date()) ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>
              {date.getDate()}
            </div>
          </div>
        ))}
        
        {hours.map(hour => (
          <React.Fragment key={hour}>
            <div className="bg-gray-50 p-2 text-xs text-gray-600 text-center">
              {formatTime(`${hour.toString().padStart(2, '0')}:00`)}
            </div>
            {weekDays.map((date, dayIndex) => {
              const dayEvents = getEventsForDateTime(date, hour);
              return (
                <div key={`${hour}-${dayIndex}`} className="bg-white p-1 min-h-12 border-t border-gray-100">
                  {dayEvents.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className="text-xs p-1 rounded mb-1 text-white truncate"
                      style={{ backgroundColor: event.color }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};



export default WeekView;