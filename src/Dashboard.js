// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { database } from './firebase';
import { ref, set, onValue } from 'firebase/database';
import './App.css';

function Dashboard() {
  const [moisture, setMoisture] = useState('Loading...');
  const [fanState, setFanState] = useState('OFF');
  const [lightState, setLightState] = useState('OFF');
  const [fanMode, setFanMode] = useState('MANUAL');
  const [lightMode, setLightMode] = useState('MANUAL');

  const [lightSensorRaw, setLightSensorRaw] = useState('Loading...');
  const [temperatureRaw, setTemperatureRaw] = useState('Loading...');
  const [humidityRaw, setHumidityRaw] = useState('Loading...');
  const [waterLevel, setWaterLevel] = useState('Loading...');

  const [fanIntervalId, setFanIntervalId] = useState(null);
  const [lightIntervalId, setLightIntervalId] = useState(null);

  useEffect(() => {
    const moistureRef = ref(database, 'ecoBreath/moisture');
    const fanRef = ref(database, 'ecoBreath/fan');
    const lightRef = ref(database, 'ecoBreath/light');
    const tempRef = ref(database, 'ecoBreath/temperatureRaw');
    const lightIntensityRef = ref(database, 'ecoBreath/lightSensorRaw');
    const humidityRef = ref(database, 'ecoBreath/humidityRaw');
    const waterRef = ref(database, 'ecoBreath/waterLevel');

    onValue(moistureRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) setMoisture(data);
    });

    onValue(fanRef, (snapshot) => {
      const state = snapshot.val();
      if (state) setFanState(state);
    });

    onValue(lightRef, (snapshot) => {
      const state = snapshot.val();
      if (state) setLightState(state);
    });

    onValue(tempRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) setTemperatureRaw(data);
    });

    onValue(lightIntensityRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) setLightSensorRaw(data);
    });

    onValue(humidityRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) setHumidityRaw(data);
    });

    onValue(waterRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) setWaterLevel(data);
    });
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
    set(ref(database, 'ecoBreath/fanMode'), newMode)
      .then(() => console.log('fanMode updated to', newMode))
      .catch((err) => console.error('Error updating fanMode:', err));

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
    set(ref(database, 'ecoBreath/lightMode'), newMode)
      .then(() => console.log('lightMode updated to', newMode))
      .catch((err) => console.error('Error updating lightMode:', err));

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
    <div className="dashboard">
      <h1>EcoBreath Dashboard 🌱</h1>

      <div className="card-grid">
        <div className="info-card">
          <h2>Soil Moisture</h2>
          <p className="value-display">{moisture}V/V</p>
        </div>
        <div className="info-card">
          <h2>Light Intensity</h2>
          <p className="value-display">{lightSensorRaw} lux</p>
        </div>
        <div className="info-card">
          <h2>Water Level</h2>
          <p className="value-display">{waterLevel} %</p>
        </div>
        <div className="info-card">
          <h2>Temperature</h2>
          <p className="value-display">{temperatureRaw}°C</p>
          <small className="sub-value">Humidity: {humidityRaw} %</small>
        </div>
      </div>

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
  );
}

export default Dashboard;

