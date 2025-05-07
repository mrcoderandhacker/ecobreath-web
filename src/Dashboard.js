// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { database } from './firebase';
import { ref, set, onValue } from 'firebase/database';
import './App.css';



function Dashboard() {
  const [moisture, setMoisture] = useState('Loading...');
  const [fanState, setFanState] = useState('OFF');
  const [lightState, setLightState] = useState('OFF');

  // Fetch real-time updates from Firebase
  useEffect(() => {
    const moistureRef = ref(database, 'ecoBreath/moisture');
    const fanRef = ref(database, 'ecoBreath/fan');
    const lightRef = ref(database, 'ecoBreath/light');

    // Real-time listener for moisture
    onValue(moistureRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) setMoisture(data);
    });

    // Fan listener
    onValue(fanRef, (snapshot) => {
      const state = snapshot.val();
      if (state) setFanState(state);
    });

    // Light listener
    onValue(lightRef, (snapshot) => {
      const state = snapshot.val();
      if (state) setLightState(state);
    });
  }, []);

  // Function to update device state in Firebase
  const toggleDevice = (device, state) => {
    const refPath = ref(database, `ecoBreath/${device}`);
    set(refPath, state)
      .then(() => console.log(`${device} set to ${state}`))
      .catch((error) => console.error(`Error setting ${device}:`, error));
  };

  return (
    <div className="dashboard">
      <h1>EcoBreath Dashboard 🌱</h1>

      <div className="moisture-card">
        <h2>Soil Moisture</h2>
        <p className="moisture-value">{moisture}</p>
      </div>

      <div className="controls">
        <div className="control-block">
          <h3>Fan Control</h3>
          <button onClick={() => toggleDevice('fan', 'ON')}>ON</button>
          <button onClick={() => toggleDevice('fan', 'OFF')}>OFF</button>
          <p>Current State: {fanState}</p>
        </div>

        <div className="control-block">
          <h3>Light Control</h3>
          <button onClick={() => toggleDevice('light', 'ON')}>ON</button>
          <button onClick={() => toggleDevice('light', 'OFF')}>OFF</button>
          <p>Current State: {lightState}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
