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
    const hourEvents = [];

    if (showEvents) {
      events.forEach(event => {
        if (event.date === dateStr) {
          const eventStartHour = parseInt(event.startTime.split(':')[0]);
          const eventEndHour = parseInt(event.endTime.split(':')[0]);
          if (hour >= eventStartHour && hour < eventEndHour) {
            hourEvents.push(event);
          }
        }
      });
    }

    return hourEvents;
  };

  const getBirthdaysForDate = (date) => {
    if (!showBirthdays) return [];
    const dateStr = date.toISOString().split('T')[0];
    return birthdays.filter(birthday => birthday.date === dateStr);
  };

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-0">
      <div className="glass-card h-full overflow-hidden">
        {/* Week Header */}
        <div className="grid grid-cols-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white sticky top-0 z-10">
          <div className="p-4 text-center font-bold border-r border-white/20">Time</div>
          {weekDays.map((date, index) => {
            const isToday = isSameDate(date, new Date());
            const dayBirthdays = getBirthdaysForDate(date);
            
            return (
              <div key={index} className="p-4 text-center border-r border-white/20 last:border-r-0">
                <div className={`font-bold ${isToday ? 'text-yellow-300' : ''}`}>
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-sm ${isToday ? 'text-yellow-200 font-semibold' : 'text-white/80'}`}>
                  {date.getDate()}
                </div>
                {dayBirthdays.length > 0 && (
                  <div className="text-xs mt-1">
                    🎂 {dayBirthdays.length}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Week Grid */}
        <div className="overflow-y-auto flex-1 bg-white">
          <div className="grid grid-cols-8 min-w-full">
            {hours.map(hour => (
              <React.Fragment key={hour}>
                {/* Time Column */}
                <div className="sticky left-0 bg-gray-50 p-3 text-center text-sm font-medium text-gray-600 border-r border-b border-gray-200 min-h-[60px] flex items-center justify-center">
                  {formatTime(`${hour.toString().padStart(2, '0')}:00`)}
                </div>
                
                {/* Day Columns */}
                {weekDays.map((date, dayIndex) => {
                  const hourEvents = getEventsForDateTime(date, hour);
                  const isToday = isSameDate(date, new Date());
                  
                  return (
                    <div 
                      key={`${hour}-${dayIndex}`} 
                      className={`
                        p-2 min-h-[60px] border-r border-b border-gray-200 last:border-r-0
                        ${isToday ? 'bg-blue-50/50' : 'bg-white'}
                        hover:bg-blue-50 transition-colors duration-200
                      `}
                    >
                      {hourEvents.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className="event-card text-xs p-2 rounded-lg mb-1 text-white font-medium shadow-sm"
                          style={{ 
                            background: `linear-gradient(135deg, ${event.color} 0%, ${event.color}dd 100%)` 
                          }}
                          title={`${event.title} (${formatTime(event.startTime)} - ${formatTime(event.endTime)})`}
                        >
                          <div className="font-semibold truncate">{event.title}</div>
                          <div className="text-xs opacity-90">
                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekView;