import React, { useState } from 'react';

const CreateEventModal = ({ isOpen, onClose, onSave }) => {
  const [eventType, setEventType] = useState('event');
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    color: '#3b82f6',
    isFullDay: false,
    repeat: 'none'
  });

  const handleSave = () => {
    const newItem = {
      ...formData,
      id: Date.now(),
      type: eventType
    };
    onSave(newItem);
    onClose();
    setFormData({
      title: '',
      name: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00',
      color: '#3b82f6',
      isFullDay: false,
      repeat: 'none'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">Create New {eventType === 'event' ? 'Event' : 'Birthday'}</h2>
        
        <div className="mb-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setEventType('event')}
              className={`px-4 py-2 rounded ${eventType === 'event' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              📅 Event
            </button>
            <button
              onClick={() => setEventType('birthday')}
              className={`px-4 py-2 rounded ${eventType === 'birthday' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              🎂 Birthday
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {eventType === 'event' ? (
            <>
              <input
                type="text"
                placeholder="Event title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="flex space-x-2">
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <select
                value={formData.repeat}
                onChange={(e) => setFormData({...formData, repeat: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="none">No repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Person's name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </>
          )}
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;