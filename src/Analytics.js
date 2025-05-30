import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, AreaChart, Area,
} from 'recharts';
import './Analytics.css';

const generateRandomData = () => {
  const data = [];
  for (let i = 1; i <= 12; i++) {
    data.push({
      time: `T${i}`,
      value: Math.floor(Math.random() * 100) + 20,
    });
  }
  return data;
};

const generateOxygenData = () => {
  const data = [];
  let base = 50;
  for (let i = 1; i <= 12; i++) {
    base += Math.random() * 10 - 3;
    data.push({
      time: `T${i}`,
      value: Math.max(30, Math.round(base)),
    });
  }
  return data;
};

function Analytics() {
  const [moistureData, setMoistureData] = useState(generateRandomData());
  const [temperatureData, setTemperatureData] = useState(generateRandomData());
  const [humidityData, setHumidityData] = useState(generateRandomData());
  const [waterLevelData, setWaterLevelData] = useState(generateRandomData());
  const [lightIntensityData, setLightIntensityData] = useState(generateRandomData());
  const [oxygenData, setOxygenData] = useState(generateOxygenData());

  useEffect(() => {
    const interval = setInterval(() => {
      setMoistureData(generateRandomData());
      setTemperatureData(generateRandomData());
      setHumidityData(generateRandomData());
      setWaterLevelData(generateRandomData());
      setLightIntensityData(generateRandomData());
      setOxygenData(generateOxygenData());
    }, 7200000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="analytics">
      <div className="analytics-header">
        <h2>📈 Analytics Dashboard</h2>
        <p>View trends, sensor stats, and historical data here.</p>
      </div>

      <div className="analytics-content">

        {/* Moisture Chart - Sky Blue */}
        <div className="chart-card">
          <h3>🌱 Moisture Trend</h3>
          <LineChart width={280} height={200} data={moistureData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#6ec6ff" />
            <YAxis stroke="#6ec6ff" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#6ec6ff" strokeWidth={3} />
          </LineChart>
        </div>

        {/* Temperature Chart - Soft Orange */}
        <div className="chart-card">
          <h3>🌡️ Temperature Variation</h3>
          <BarChart width={280} height={200} data={temperatureData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#ffab91" />
            <YAxis stroke="#ffab91" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#ffab91" />
          </BarChart>
        </div>

        {/* Humidity Chart - Pastel Green */}
        <div className="chart-card">
          <h3>💧 Humidity History</h3>
          <AreaChart width={280} height={200} data={humidityData}>
            <defs>
              <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a5d6a7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#a5d6a7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#a5d6a7" />
            <YAxis stroke="#a5d6a7" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#a5d6a7" fillOpacity={1} fill="url(#colorHumidity)" />
          </AreaChart>
        </div>

        {/* Water Level Chart - Light Purple */}
        <div className="chart-card">
          <h3>🚰 Water Level</h3>
          <LineChart width={280} height={200} data={waterLevelData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#9575cd" />
            <YAxis stroke="#9575cd" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#9575cd" strokeWidth={3} />
          </LineChart>
        </div>

        {/* Light Intensity Chart - Soft Yellow */}
        <div className="chart-card">
          <h3>💡 Light Intensity</h3>
          <BarChart width={280} height={200} data={lightIntensityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#ffd54f" />
            <YAxis stroke="#ffd54f" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#ffd54f" />
          </BarChart>
        </div>

        {/* Oxygen Produced Chart - Teal */}
        <div className="chart-card">
          <h3>🌿 Oxygen Produced</h3>
          <AreaChart width={280} height={200} data={oxygenData}>
            <defs>
              <linearGradient id="colorOxygen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#80cbc4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#80cbc4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#80cbc4" />
            <YAxis stroke="#80cbc4" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#80cbc4" fillOpacity={1} fill="url(#colorOxygen)" />
          </AreaChart>
        </div>

      </div>
    </section>
  );
}

export default Analytics;
