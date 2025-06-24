import React from 'react';
import { Plus } from 'lucide-react';

const CalendarControls = ({ view, setView, currentDate, setCurrentDate, showEvents, setShowEvents, showBirthdays, setShowBirthdays, onCreateClick }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const years = Array.from({ length: 51 }, (_, i) => 2000 + i);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {['Month', 'Week', 'Day'].map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType.toLowerCase())}
                className={`px-4 py-2 rounded ${
                  view === viewType.toLowerCase()
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {viewType}
              </button>
            ))}
          </div>
          
          <button
            onClick={onCreateClick}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <Plus className="h-4 w-4" />
            <span>Create</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showEvents}
                onChange={(e) => setShowEvents(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Show Events</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showBirthdays}
                onChange={(e) => setShowBirthdays(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Show Birthdays</span>
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={currentDate.getMonth()}
              onChange={(e) => {
                const newDate = new Date(currentDate);
                newDate.setMonth(parseInt(e.target.value));
                setCurrentDate(newDate);
              }}
              className="px-3 py-2 border border-gray-300 rounded"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>{month}</option>
              ))}
            </select>
            
            <select
              value={currentDate.getFullYear()}
              onChange={(e) => {
                const newDate = new Date(currentDate);
                newDate.setFullYear(parseInt(e.target.value));
                setCurrentDate(newDate);
              }}
              className="px-3 py-2 border border-gray-300 rounded"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarControls;