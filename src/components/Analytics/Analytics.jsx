import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = ({ sensorData }) => {
  const timeLabels = Array.from({length: 24}, (_, i) => `${i}:00`);

  const trafficData = {
    labels: timeLabels,
    datasets: [{
      label: 'Traffic Density',
      data: Array.from({length: 24}, () => Math.floor(Math.random() * 100)),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const airQualityData = {
    labels: timeLabels,
    datasets: [{
      label: 'Air Quality Index',
      data: Array.from({length: 24}, () => Math.floor(Math.random() * 150)),
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }]
  };

  const noiseData = {
    labels: ['0-30 dB', '31-50 dB', '51-70 dB', '71-90 dB', '90+ dB'],
    datasets: [{
      label: 'Noise Level Distribution',
      data: [10, 25, 35, 20, 10],
      backgroundColor: [
        'rgba(75, 192, 192, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(255, 99, 132, 0.5)',
      ],
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff'
        }
      }
    },
    scales: {
      y: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ color: '#fff', mb: 4 }}>
        Real-Time Analytics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ bgcolor: 'rgba(0,0,0,0.2)', p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              Traffic Trends
            </Typography>
            <Line data={trafficData} options={chartOptions} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ bgcolor: 'rgba(0,0,0,0.2)', p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              Air Quality Trends
            </Typography>
            <Line data={airQualityData} options={chartOptions} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ bgcolor: 'rgba(0,0,0,0.2)', p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              Noise Level Distribution
            </Typography>
            <Bar data={noiseData} options={chartOptions} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;