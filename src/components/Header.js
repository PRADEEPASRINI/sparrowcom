import React, { useState, useEffect, useContext } from 'react';
import { Calendar, Bell, Settings, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { STATIC_DATA } from '../utils/staticData';
import { formatDate, formatTime } from '../utils/dateUtils';

const Header = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const today = new Date();

  useEffect(() => {
    // Check for notifications every minute
    const checkNotifications = () => {
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const newNotifications = [];
      
      // Check for today's birthdays
      STATIC_DATA.birthdays.forEach(birthday => {
        if (birthday.date === todayStr) {
          newNotifications.push({
            id: `birthday-${birthday.id}`,
            message: `🎂 Today is ${birthday.name}'s Birthday!`,
            type: 'birthday'
          });
        }
      });
      
      // Check for upcoming events (next 10 minutes)
      STATIC_DATA.events.forEach(event => {
        if (event.date === todayStr) {
          const eventTime = new Date(`${todayStr}T${event.startTime}:00`);
          const timeDiff = eventTime.getTime() - now.getTime();
          const minutesDiff = Math.floor(timeDiff / (1000 * 60));
          
          if (minutesDiff >= 0 && minutesDiff <= 10) {
            newNotifications.push({
              id: `event-${event.id}`,
              message: `🎯 Upcoming Event: "${event.title}" at ${formatTime(event.startTime)}`,
              type: 'event'
            });
          }
        }
      });
      
      setNotifications(newNotifications);
    };

    checkNotifications();
    const interval = setInterval(checkNotifications, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Calendar className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Calendar</h1>
            <p className="text-sm text-gray-600">Today: {formatDate(today)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
            >
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-gray-500 text-center">No notifications</p>
                  ) : (
                    notifications.map(notification => (
                      <div key={notification.id} className="p-3 border-b border-gray-100 last:border-b-0">
                        <p className="text-sm text-gray-700">{notification.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
            <Settings className="h-5 w-5" />
          </button>
          
          <div className="relative">
            <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
              <User className="h-5 w-5" />
              {isLoggedIn && <span className="text-sm">{user?.name}</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Header;