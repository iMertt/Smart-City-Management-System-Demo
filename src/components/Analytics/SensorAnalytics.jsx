import React, { useState, useEffect } from 'react';
import { Box, Alert, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SensorAnalytics({ sensorData }) {
  const [alerts, setAlerts] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    if (!sensorData) return;

    // Update chart data
    const labels = Array.from({ length: 10 }, (_, i) => 
      new Date(Date.now() - i * 2000).toLocaleTimeString()
    ).reverse();

    const newChartData = {
      labels,
      datasets: [
        {
          label: 'Air Quality',
          data: sensorData.air?.map(s => parseInt(s.value.split(':')[1])) || [],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Noise Level',
          data: sensorData.noise?.map(s => parseInt(s.value)) || [],
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }
      ]
    };
    setChartData(newChartData);

    // Check for alerts
    const newAlerts = [];
    sensorData.air?.forEach(sensor => {
      const aqi = parseInt(sensor.value.split(':')[1]);
      if (aqi > 70) {
        newAlerts.push(`High Air Pollution (AQI: ${aqi}) at Sensor #${sensor.id}`);
      }
    });

    sensorData.noise?.forEach(sensor => {
      const db = parseInt(sensor.value);
      if (db > 70) {
        newAlerts.push(`High Noise Level (${db} dB) at Sensor #${sensor.id}`);
      }
    });

    sensorData.traffic?.forEach(sensor => {
      if (sensor.value === 'Yoğun Trafik') {
        newAlerts.push(`Heavy Traffic at Sensor #${sensor.id}`);
      }
    });

    setAlerts(newAlerts);
  }, [sensorData]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Real-time Analytics
      </Typography>
      
      {alerts.length > 0 && (
        <Box mb={2}>
          {alerts.map((alert, index) => (
            <Alert severity="warning" key={index} sx={{ mb: 1 }}>
              {alert}
            </Alert>
          ))}
        </Box>
      )}

      <Box sx={{ height: 300 }}>
        <Line 
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }}
        />
      </Box>
    </Box>
  );
}

export default SensorAnalytics;