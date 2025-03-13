import React, { useState } from 'react';
import { Box, Typography, FormControl, Select, MenuItem, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const SensorCard = styled(Paper)(({ status }) => ({
  padding: '15px',
  marginBottom: '10px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(5px)',
  borderRadius: '10px',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateX(5px)'
  }
}));

const StatusBadge = styled('span')(({ status }) => ({
  padding: '4px 12px',
  borderRadius: '12px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  background: status === 'warning' ? 'rgba(255, 72, 66, 0.8)' : 'rgba(84, 214, 44, 0.8)',
  color: '#fff'
}));

const DataPanel = ({ sensorData }) => {
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const getAllSensors = () => {
    const allSensors = [];
    if (sensorData) {
      Object.entries(sensorData).forEach(([type, sensors]) => {
        sensors.forEach(sensor => {
          allSensors.push({ ...sensor, type });
        });
      });
    }
    return allSensors;
  };

  const filteredSensors = getAllSensors().filter(sensor => {
    const matchesType = filterType === 'all' || sensor.type === filterType;
    const matchesStatus = filterStatus === 'all' || sensor.status === filterStatus;
    return matchesType && matchesStatus;
  });

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ color: '#fff', mb: 3 }}>
        Sensor Data Panel
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          sx={{
            color: '#fff',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '.MuiSvgIcon-root': {
              color: '#fff',
            }
          }}
        >
          <MenuItem value="all">All Types</MenuItem>
          <MenuItem value="traffic">Traffic</MenuItem>
          <MenuItem value="air">Air Quality</MenuItem>
          <MenuItem value="noise">Noise</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ mt: 2 }}>
        {filteredSensors.map((sensor, index) => (
          <SensorCard key={`${sensor.type}-${sensor.id}`} status={sensor.status}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {sensor.type.charAt(0).toUpperCase() + sensor.type.slice(1)} Sensor #{sensor.id}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Value: {sensor.value}
              </Typography>
            </Box>
            <StatusBadge status={sensor.status}>
              {sensor.status}
            </StatusBadge>
          </SensorCard>
        ))}
      </Box>
    </Box>
  );
};

export default DataPanel;