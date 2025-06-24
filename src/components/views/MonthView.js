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
    <div className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-0">
      <div className="glass-card h-full overflow-hidden">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-4 text-center font-bold text-sm border-r border-white/20 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 flex-1 bg-white border-l border-gray-200">
          {days.map((date, index) => {
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            const isToday = isSameDate(date, currentDateStr);
            const dayEvents = getEventsForDate(date);

            return (
              <div
                key={index}
                className={`
                  calendar-day border-r border-b border-gray-200 p-2 min-h-[120px] relative
                  ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
                  ${isToday ? 'bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-400' : ''}
                  hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-200
                `}
              >
                {/* Date Number */}
                <div className={`
                  font-semibold text-sm mb-1
                  ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                  ${isToday ? 'text-blue-600 font-bold text-base' : ''}
                `}>
                  {date.getDate()}
                </div>

                {/* Events Container */}
                <div className="space-y-1 overflow-hidden">
                  {dayEvents.slice(0, 2).map((item, idx) => (
                    <div
                      key={idx}
                      className={`
                        event-card text-xs px-2 py-1 rounded-md font-medium truncate shadow-sm
                        ${item.type === 'birthday'
                          ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white'
                          : 'text-white shadow-md'
                        }
                      `}
                      style={item.type === 'event' ? { 
                        background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)` 
                      } : {}}
                      title={item.type === 'birthday' ? `🎂 ${item.name}'s Birthday` : item.title}
                    >
                      {item.type === 'birthday' ? `🎂 ${item.name}` : item.title}
                    </div>
                  ))}
                  
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-md">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>

                {/* Today Indicator */}
                {isToday && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthView;