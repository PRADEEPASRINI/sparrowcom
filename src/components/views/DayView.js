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
    <div className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-0">
      <div className="glass-card h-full overflow-hidden flex flex-col">
        {/* Day Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 border-b border-white/20">
          <h2 className="text-2xl font-bold mb-2">
            {currentDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h2>
          
          {/* Birthday Notifications */}
          {dayBirthdays.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {dayBirthdays.map(birthday => (
                <div 
                  key={birthday.id} 
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                >
                  <span>🎂</span>
                  <span>{birthday.name}'s Birthday</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Time Grid */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="grid grid-cols-12 min-h-full">
            {hours.map(hour => {
              const hourEvents = getEventsForHour(hour);
              const isCurrentHour = new Date().getHours() === hour && 
                                  currentDate.toDateString() === new Date().toDateString();
              
              return (
                <React.Fragment key={hour}>
                  {/* Time Label */}
                  <div className={`
                    col-span-2 p-4 text-right text-sm font-semibold border-r border-b border-gray-200
                    ${isCurrentHour ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-600'}
                  `}>
                    {formatTime(`${hour.toString().padStart(2, '0')}:00`)}
                  </div>
                  
                  {/* Event Area */}
                  <div className={`
                    col-span-10 p-3 border-b border-gray-200 min-h-[80px] relative
                    ${isCurrentHour ? 'bg-blue-50/50' : 'bg-white'}
                    hover:bg-blue-50/30 transition-colors duration-200
                  `}>
                    {/* Current Time Indicator */}
                    {isCurrentHour && (
                      <div className="absolute left-0 top-1/2 w-full h-0.5 bg-red-500 z-10">
                        <div className="absolute left-0 top-0 w-3 h-3 bg-red-500 rounded-full -translate-y-1/2"></div>
                      </div>
                    )}
                    
                    {/* Events */}
                    <div className="space-y-2">
                      {hourEvents.map((event, index) => (
                        <div
                          key={index}
                          className="event-card p-3 rounded-xl text-white shadow-lg relative overflow-hidden"
                          style={{ 
                            background: `linear-gradient(135deg, ${event.color} 0%, ${event.color}dd 100%)` 
                          }}
                        >
                          <div className="relative z-10">
                            <div className="font-bold text-base mb-1">{event.title}</div>
                            <div className="text-sm opacity-90 flex items-center space-x-2">
                              <span>🕐</span>
                              <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                            </div>
                            {event.description && (
                              <div className="text-sm mt-2 opacity-80">
                                {event.description}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Hour Divider Lines */}
                    <div className="absolute bottom-0 left-0 w-full border-b border-dotted border-gray-300"></div>
                    <div className="absolute bottom-4 left-0 w-full border-b border-dotted border-gray-200"></div>
                    <div className="absolute bottom-8 left-0 w-full border-b border-dotted border-gray-200"></div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;