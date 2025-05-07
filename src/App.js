import { useState } from 'react';
import React from 'react';

import Login from './Login'; // Capital L

import Dashboard from './Dashboard';

function App() {
  const [user, setUser] = useState(null);

  return user ? <Dashboard /> : <Login onLogin={setUser} />;
}

export default App;
