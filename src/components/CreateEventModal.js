import React, { useState, useEffect } from 'react';

// Utility functions
const getDayName = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

const formatMonthDay = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
};

const getRepeatSummary = (repeat, formData) => {
  const day = getDayName(formData.date);
  switch (repeat) {
    case 'daily':
      return 'Every day';
    case 'weekly':
      return `Weekly on ${day}`;
    case 'monthly-4th':
      return `Monthly on the fourth ${day}`;
    case 'monthly-last':
      return `Monthly on the last ${day}`;
    case 'annually':
      return `Annually on ${formatMonthDay(formData.date)}`;
    case 'weekdays':
      return 'Every weekday (Monday to Friday)';
    default:
      return '';
  }
};

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const defaultFormData = {
  title: '',
  name: '',
  date: new Date().toISOString().split('T')[0],
  startTime: '09:00',
  endTime: '10:00',
  color: '#3b82f6',
  isFullDay: false,
  repeat: 'none',
  customDays: [],
};

const CreateEventModal = ({ isOpen, onClose, onSave }) => {
  const [eventType, setEventType] = useState('event');
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (!isOpen) {
      setFormData(defaultFormData);
      setEventType('event');
    }
  }, [isOpen]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleCustomDay = (day) => {
    const updatedDays = formData.customDays.includes(day)
      ? formData.customDays.filter((d) => d !== day)
      : [...formData.customDays, day];
    handleInputChange('customDays', updatedDays);
  };

  const handleSave = () => {
    const newItem = {
      ...formData,
      id: Date.now(),
      type: eventType,
      repeat: formData.repeat === 'custom' ? [...formData.customDays] : formData.repeat,
    };
    onSave(newItem);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg mx-4">
        <h2 className="text-2xl font-semibold mb-5 text-center">
          Create New {eventType === 'event' ? 'Event' : 'Birthday'}
        </h2>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setEventType('event')}
            className={`px-4 py-2 rounded transition ${
              eventType === 'event'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            📅 Event
          </button>
          <button
            type="button"
            onClick={() => setEventType('birthday')}
            className={`px-4 py-2 rounded transition ${
              eventType === 'birthday'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            🎂 Birthday
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {eventType === 'event' ? (
            <>
              <input
                type="text"
                placeholder="Event title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="flex gap-2">
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />

              {/* Repeat Dropdown */}
              <div>
                <label className="block mb-1 font-medium">Repeat</label>
                <select
                  value={formData.repeat}
                  onChange={(e) => handleInputChange('repeat', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="none">Does not repeat</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly on {getDayName(formData.date)}</option>
                  <option value="monthly-4th">Monthly on the fourth {getDayName(formData.date)}</option>
                  <option value="monthly-last">Monthly on the last {getDayName(formData.date)}</option>
                  <option value="annually">Annually on {formatMonthDay(formData.date)}</option>
                  <option value="weekdays">Every weekday (Monday to Friday)</option>
                  <option value="custom">Custom…</option>
                </select>
              </div>

              {/* Custom Day Selector */}
              {formData.repeat === 'custom' && (
                <div className="grid grid-cols-4 gap-2 mt-2 text-sm text-gray-700">
                  {daysOfWeek.map((day) => (
                    <label key={day} className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={formData.customDays.includes(day)}
                        onChange={() => toggleCustomDay(day)}
                      />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Summary */}
              {formData.repeat !== 'none' && formData.repeat !== 'custom' && (
                <div className="text-sm mt-2 text-gray-600 italic">
                  Repeats: {getRepeatSummary(formData.repeat, formData)}
                </div>
              )}
              {formData.repeat === 'custom' && formData.customDays.length > 0 && (
                <div className="text-sm mt-2 text-gray-600 italic">
                  Repeats: {formData.customDays.join(', ')}
                </div>
              )}
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Person's name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </>
          )}
        </form>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={
              (eventType === 'event' && !formData.title) ||
              (eventType === 'birthday' && !formData.name)
            }
            className={`flex-1 py-2 rounded transition ${
              (eventType === 'event' && !formData.title) ||
              (eventType === 'birthday' && !formData.name)
                ? 'bg-blue-300 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
