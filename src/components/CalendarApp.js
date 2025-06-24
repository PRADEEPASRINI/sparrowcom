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
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <CalendarControls
        view={view}
        setView={setView}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        showEvents={showEvents}
        setShowEvents={setShowEvents}
        showBirthdays={showBirthdays}
        setShowBirthdays={setShowBirthdays}
        onCreateClick={handleCreateClick}
      />
      {renderCalendarView()}
      
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