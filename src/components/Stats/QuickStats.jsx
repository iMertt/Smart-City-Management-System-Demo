import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TrafficIcon from '@mui/icons-material/Traffic';
import AirIcon from '@mui/icons-material/Air';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import WarningIcon from '@mui/icons-material/Warning';

const StatCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '15px',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-2px)',
  }
}));

const QuickStats = ({ sensorData }) => {
  const stats = [
    {
      title: 'Traffic Sensors',
      value: sensorData?.traffic?.length || 0,
      icon: <TrafficIcon sx={{ fontSize: 40, color: '#64b5f6' }} />
    },
    {
      title: 'Air Quality',
      value: sensorData?.air?.length || 0,
      icon: <AirIcon sx={{ fontSize: 40, color: '#81c784' }} />
    },
    {
      title: 'Noise Sensors',
      value: sensorData?.noise?.length || 0,
      icon: <VolumeUpIcon sx={{ fontSize: 40, color: '#ffb74d' }} />
    },
    {
      title: 'Active Alerts',
      value: '3',
      icon: <WarningIcon sx={{ fontSize: 40, color: '#e57373' }} />
    }
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StatCard>
            {stat.icon}
            <Box>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                {stat.title}
              </Typography>
              <Typography variant="h4" sx={{ color: '#fff' }}>
                {stat.value}
              </Typography>
            </Box>
          </StatCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuickStats;