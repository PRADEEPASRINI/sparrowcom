import React from 'react';
import { isSameDate } from '../../utils/dateUtils';

const MonthView = ({ currentDate, events, birthdays, showEvents, showBirthdays }) => {
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days = [];
  const currentDateStr = new Date();
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const dayEvents = [];
    
    if (showEvents) {
      events.forEach(event => {
        if (event.date === dateStr) {
          dayEvents.push(event);
        }
      });
    }
    
    if (showBirthdays) {
      birthdays.forEach(birthday => {
        if (birthday.date === dateStr) {
          dayEvents.push(birthday);
        }
      });
    }
    
    return dayEvents;
  };

  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-50 p-3 text-center font-semibold text-gray-700">
            {day}
          </div>
        ))}
        
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isToday = isSameDate(date, currentDateStr);
          const dayEvents = getEventsForDate(date);
          
          return (
            <div
              key={index}
              className={`bg-white p-2 min-h-24 ${
                isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
              } ${isToday ? 'bg-blue-50 ring-2 ring-blue-500' : ''}`}
            >
              <div className={`font-semibold ${isToday ? 'text-blue-600' : ''}`}>
                {date.getDate()}
              </div>
              <div className="mt-1 space-y-1">
                {dayEvents.slice(0, 3).map((item, idx) => (
                  <div
                    key={idx}
                    className={`text-xs p-1 rounded truncate ${
                      item.type === 'birthday' 
                        ? 'bg-pink-100 text-pink-800' 
                        : 'text-white'
                    }`}
                    style={item.type === 'event' ? { backgroundColor: item.color } : {}}
                  >
                    {item.type === 'birthday' ? `🎂 ${item.name}` : item.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500">+{dayEvents.length - 3} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;