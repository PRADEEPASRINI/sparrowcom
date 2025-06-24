import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarControls = ({ currentDate, setCurrentDate }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = Array.from({ length: 51 }, (_, i) => 2000 + i);

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  return (
    <div className="glass-card mx-6 my-2 p-4">
      {/* Navigation Row Only (no full date) */}
      <div className="flex items-center justify-center space-x-4 flex-wrap">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 bg-white/70 hover:bg-white/90 text-gray-700 rounded-lg border border-white/30 hover:scale-110 transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <select
          value={currentDate.getMonth()}
          onChange={(e) => {
            const newDate = new Date(currentDate);
            newDate.setMonth(parseInt(e.target.value));
            setCurrentDate(newDate);
          }}
          className="input-modern text-center font-semibold"
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
          className="input-modern text-center font-semibold"
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <button
          onClick={() => navigateMonth(1)}
          className="p-2 bg-white/70 hover:bg-white/90 text-gray-700 rounded-lg border border-white/30 hover:scale-110 transition-all"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CalendarControls;
