import React from 'react';
import { formatTime } from '../../utils/dateUtils';

const DayView = ({ currentDate, events, birthdays, showEvents, showBirthdays }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const dateStr = currentDate.toISOString().split('T')[0];

  const getEventsForHour = (hour) => {
    const dayEvents = [];
    
    if (showEvents) {
      events.forEach(event => {
        if (event.date === dateStr) {
          const eventStartHour = parseInt(event.startTime.split(':')[0]);
          const eventEndHour = parseInt(event.endTime.split(':')[0]);
          
          if (hour >= eventStartHour && hour < eventEndHour) {
            dayEvents.push(event);
          }
        }
      });
    }
    
    return dayEvents;
  };

  const getBirthdaysForDay = () => {
    if (!showBirthdays) return [];
    return birthdays.filter(birthday => birthday.date === dateStr);
  };

  const dayBirthdays = getBirthdaysForDay();

  return (
    <div className="flex-1 p-6">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            {currentDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h2>
          {dayBirthdays.length > 0 && (
            <div className="mt-2">
              {dayBirthdays.map(birthday => (
                <div key={birthday.id} className="bg-pink-100 text-pink-800 px-3 py-1 rounded inline-block mr-2">
                  🎂 {birthday.name}'s Birthday
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {hours.map(hour => {
            const hourEvents = getEventsForHour(hour);
            return (
              <div key={hour} className="flex border-b border-gray-100">
                <div className="w-20 p-3 text-sm text-gray-600 bg-gray-50 border-r border-gray-200">
                  {formatTime(`${hour.toString().padStart(2, '0')}:00`)}
                </div>
                <div className="flex-1 p-3 min-h-12">
                  {hourEvents.map((event, index) => (
                    <div
                      key={index}
                      className="p-2 rounded mb-2 text-white"
                      style={{ backgroundColor: event.color }}
                    >
                      <div className="font-semibold">{event.title}</div>
                      <div className="text-sm opacity-90">
                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default DayView;