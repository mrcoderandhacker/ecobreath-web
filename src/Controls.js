// src/Controls.js
import React, { useEffect, useState } from 'react';
import { database } from './firebase';
import { ref, set, onValue } from 'firebase/database';
import './Controls.css';
import './App.css'; // Ensure content-container styles are included

const Controls = () => {
  const [fanState, setFanState] = useState('OFF');
  const [lightState, setLightState] = useState('OFF');
  const [fanMode, setFanMode] = useState('MANUAL');
  const [lightMode, setLightMode] = useState('MANUAL');
  const [fanIntervalId, setFanIntervalId] = useState(null);
  const [lightIntervalId, setLightIntervalId] = useState(null);

  useEffect(() => {
    const fanRef = ref(database, 'ecoBreath/fan');
    const lightRef = ref(database, 'ecoBreath/light');
    const fanModeRef = ref(database, 'ecoBreath/fanMode');
    const lightModeRef = ref(database, 'ecoBreath/lightMode');

    onValue(fanRef, (snapshot) => {
      const state = snapshot.val();
      if (state) setFanState(state);
    });

    onValue(lightRef, (snapshot) => {
      const state = snapshot.val();
      if (state) setLightState(state);
    });

    onValue(fanModeRef, (snapshot) => {
      const mode = snapshot.val();
      if (mode) setFanMode(mode);
    });

    onValue(lightModeRef, (snapshot) => {
      const mode = snapshot.val();
      if (mode) setLightMode(mode);
    });

    return () => {
      clearInterval(fanIntervalId);
      clearInterval(lightIntervalId);
    };
  }, []);

  const toggleDevice = (device, state) => {
    const refPath = ref(database, `ecoBreath/${device}`);
    set(refPath, state)
      .then(() => console.log(`${device} set to ${state}`))
      .catch((error) => console.error(`Error setting ${device}:`, error));
  };

  const handleFanModeChange = () => {
    const newMode = fanMode === 'MANUAL' ? 'AUTO' : 'MANUAL';
    setFanMode(newMode);
    set(ref(database, 'ecoBreath/fanMode'), newMode);

    if (newMode === 'AUTO') {
      const intervalId = setInterval(() => {
        setFanState((prev) => {
          const newState = prev === 'ON' ? 'OFF' : 'ON';
          toggleDevice('fan', newState);
          return newState;
        });
      }, 10000);
      setFanIntervalId(intervalId);
    } else {
      clearInterval(fanIntervalId);
      setFanIntervalId(null);
    }
  };

  const handleLightModeChange = () => {
    const newMode = lightMode === 'MANUAL' ? 'AUTO' : 'MANUAL';
    setLightMode(newMode);
    set(ref(database, 'ecoBreath/lightMode'), newMode);

    if (newMode === 'AUTO') {
      const intervalId = setInterval(() => {
        setLightState((prev) => {
          const newState = prev === 'ON' ? 'OFF' : 'ON';
          toggleDevice('light', newState);
          return newState;
        });
      }, 10000);
      setLightIntervalId(intervalId);
    } else {
      clearInterval(lightIntervalId);
      setLightIntervalId(null);
    }
  };

  return (
    <div className="content-container">
      <div className="controls-page">
        <h1>Device Controls ⚙️</h1>

        <div className="controls">
          <div className="control-block">
            <h3>Fan Control</h3>
            <button className="mode-btn" onClick={handleFanModeChange}>
              Switch to {fanMode === 'MANUAL' ? 'AUTO' : 'MANUAL'} Mode
            </button>
            {fanMode === 'MANUAL' && (
              <>
                <button onClick={() => toggleDevice('fan', 'ON')}>ON</button>
                <button onClick={() => toggleDevice('fan', 'OFF')}>OFF</button>
              </>
            )}
            <p>Current State: {fanState} ({fanMode} Mode)</p>
          </div>

          <div className="control-block">
            <h3>Light Control</h3>
            <button className="mode-btn" onClick={handleLightModeChange}>
              Switch to {lightMode === 'MANUAL' ? 'AUTO' : 'MANUAL'} Mode
            </button>
            {lightMode === 'MANUAL' && (
              <>
                <button onClick={() => toggleDevice('light', 'ON')}>ON</button>
                <button onClick={() => toggleDevice('light', 'OFF')}>OFF</button>
              </>
            )}
            <p>Current State: {lightState} ({lightMode} Mode)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
