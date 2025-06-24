// src/components/CalendarApp.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { STATIC_DATA } from '../utils/staticData';
import Header from './Header';
import CalendarControls from './CalendarControls';
import MonthView from './views/MonthView';
import WeekView from './views/WeekView';
import DayView from './views/DayView';
import CreateEventModal from './CreateEventModal';
import LoginModal from './LoginModal';

const CalendarApp = () => {
  const { isLoggedIn, login } = useContext(AuthContext);
  const [view, setView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEvents, setShowEvents] = useState(true);
  const [showBirthdays, setShowBirthdays] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [events, setEvents] = useState(STATIC_DATA.events);
  const [birthdays, setBirthdays] = useState(STATIC_DATA.birthdays);

  const handleCreateClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setShowCreateModal(true);
    }
  };

  const handleLogin = () => {
    login();
    setShowLoginModal(false);
    setShowCreateModal(true);
  };

  const handleSaveEvent = (newItem) => {
    if (newItem.type === 'birthday') {
      setBirthdays([...birthdays, newItem]);
    } else {
      setEvents([...events, newItem]);
    }
  };

  const renderCalendarView = () => {
    switch (view) {
      case 'week':
        return (
          <WeekView
            currentDate={currentDate}
            events={events}
            birthdays={birthdays}
            showEvents={showEvents}
            showBirthdays={showBirthdays}
          />
        );
      case 'day':
        return (
          <DayView
            currentDate={currentDate}
            events={events}
            birthdays={birthdays}
            showEvents={showEvents}
            showBirthdays={showBirthdays}
          />
        );
      default:
        return (
          <MonthView
            currentDate={currentDate}
            events={events}
            birthdays={birthdays}
            showEvents={showEvents}
            showBirthdays={showBirthdays}
          />
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200 hidden lg:flex flex-col">
          <div className="p-6">
            <button
              onClick={handleCreateClick}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="font-medium">Create</span>
            </button>
          </div>

          <div className="px-6 pb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">View Options</h3>
            <div className="space-y-2">
              {[
                { key: 'day', label: 'Day', icon: '📅' },
                { key: 'week', label: 'Week', icon: '🗓️' },
                { key: 'month', label: 'Month', icon: '📆' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setView(item.key)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                    view === item.key
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 pb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Filter Options</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showEvents}
                  onChange={(e) => setShowEvents(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <div className="flex items-center space-x-2">
                  
                  <span className="text-sm text-gray-700">📅 Events</span>
                </div>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showBirthdays}
                  onChange={(e) => setShowBirthdays(e.target.checked)}
                  className="h-4 w-4 text-pink-600 border-gray-300 rounded"
                />
                <div className="flex items-center space-x-2">
                  
                  <span className="text-sm text-gray-700">🎂 Birthdays</span>
                </div>
              </label>
            </div>
          </div>

          <div className="mt-auto p-6 border-t border-gray-200 bg-white">
            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 15V9a2 2 0 012-2h4a2 2 0 012 2v6" />
              </svg>
              <span>Home</span>
            </button>
          </div>
        </div>

        {/* Calendar View */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <CalendarControls
            view={view}
            setView={setView}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            onCreateClick={handleCreateClick}
          />

          <div className="flex-1 overflow-y-auto min-h-0">
            {renderCalendarView()}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveEvent}
      />
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default CalendarApp;
