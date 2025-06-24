
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import CalendarApp from './components/CalendarApp';

const App = () => {
  return (
    <AuthProvider>
      <CalendarApp />
    </AuthProvider>
  );
};

export default App;