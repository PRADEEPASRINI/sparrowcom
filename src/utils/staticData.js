const STATIC_DATA = {
  events: [
    {
      id: 1,
      title: "Daily Standup",
      date: "2025-06-24",
      startTime: "09:00",
      endTime: "10:00",
      color: "#f6be23",
      repeat: "daily",
      type: "event"
    },
    {
      id: 2,
      title: "Weekly catchup",
      date: "2025-06-24",
      startTime: "16:30",
      endTime: "17:30",
      color: "#f6501e",
      repeat: "weekly",
      type: "event"
    },
    {
      id: 3,
      title: "Team Meeting",
      date: "2025-06-25",
      startTime: "14:00",
      endTime: "15:30",
      color: "#3b82f6",
      repeat: "none",
      type: "event"
    }
  ],
  birthdays: [
    {
      id: 4,
      name: "John Doe",
      date: "2025-06-24",
      type: "birthday"
    },
    {
      id: 5,
      name: "Sarah Smith",
      date: "2025-06-26",
      type: "birthday"
    }
  ]
};

export { STATIC_DATA };
