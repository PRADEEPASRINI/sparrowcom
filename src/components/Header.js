import React, { useState, useEffect, useContext } from 'react';
import { Calendar, Bell, Settings, User, Sun, Moon } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { STATIC_DATA } from '../utils/staticData';
import { formatDate } from '../utils/dateUtils';

const Header = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const today = new Date();

  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];
      const newNotifications = [];

      STATIC_DATA.birthdays.forEach(birthday => {
        if (birthday.date === todayStr) {
          newNotifications.push({
            id: `birthday-${birthday.id}`,
            message: `🎂 Today is ${birthday.name}'s Birthday!`,
            type: 'birthday',
            time: 'Today',
          });
        }
      });

      STATIC_DATA.events.forEach(event => {
        if (event.date === todayStr) {
          const eventTime = new Date(`${todayStr}T${event.startTime}:00`);
          const timeDiff = eventTime.getTime() - now.getTime();
          const minutesDiff = Math.floor(timeDiff / (1000 * 60));

          if (minutesDiff >= 0 && minutesDiff <= 10) {
            newNotifications.push({
              id: `event-${event.id}`,
              message: `🎯 Upcoming Event: "${event.title}"`,
              type: 'event',
              time: `in ${minutesDiff} min`,
            });
          }
        }
      });

      setNotifications(newNotifications);
    };

    checkNotifications();
    const interval = setInterval(checkNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <div className="relative bg-white/10 rounded-full p-2">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Calendar
              </h1>
              <p className="text-sm text-white/80 font-medium">{formatDate(today)}</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-3 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-all duration-300 group"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              ) : (
                <Moon className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-3 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-all duration-300 group"
              >
                <Bell className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-xs bg-red-500 rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-96 bg-white text-black rounded-lg shadow-lg overflow-hidden animate-slide-in-right">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-bold text-lg">Notifications</h3>
                    <p className="text-sm text-gray-600">Stay updated with your schedule</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center">
                        <Bell className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500 font-medium">No new notifications</p>
                        <p className="text-sm text-gray-400">You're all caught up!</p>
                      </div>
                    ) : (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm font-medium mb-1">{notification.message}</p>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  notification.type === 'birthday'
                                    ? 'bg-pink-100 text-pink-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {notification.type === 'birthday' ? '🎂 Birthday' : '📅 Event'}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">{notification.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-3 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-all duration-300 group">
              <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-all duration-300 group"
              >
                <div className="relative bg-white/10 rounded-full p-2">
                  <User className="h-5 w-5 text-white" />
                </div>
                {isLoggedIn && (
                  <div className="hidden sm:block">
                    <span className="text-sm font-semibold">{user?.name}</span>
                    <p className="text-xs text-white/70">{user?.email}</p>
                  </div>
                )}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white text-black rounded-lg shadow-lg animate-slide-in-right">
                  <div className="p-4">
                    {isLoggedIn ? (
                      <>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="relative bg-gradient-to-r from-pink-500 to-violet-500 rounded-full p-2">
                            <User className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{user?.name}</h4>
                            <p className="text-sm text-gray-600">{user?.email}</p>
                          </div>
                        </div>
                        <button
                          onClick={logout}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <div className="text-center">
                        <User className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-4">Sign in to access all features</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                          Sign In
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
