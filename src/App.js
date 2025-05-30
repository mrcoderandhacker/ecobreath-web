import React, { useState } from 'react';
import Login from './Login';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import './App.css'; // your styles
// src/App.js (or your main app component)





function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('Dashboard');

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh' }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <MainContent activePage={activePage} />
    </div>
  );

  
}

export default App;