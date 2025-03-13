import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  LinearProgress,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Battery90,
  Battery50,
  Battery20,
  BuildCircle,
  Settings,
  Timeline
} from '@mui/icons-material';

const SensorManagement = ({ sensorData }) => {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getBatteryIcon = (level) => {
    if (level > 70) return <Battery90 color="success" />;
    if (level > 30) return <Battery50 color="warning" />;
    return <Battery20 color="error" />;
  };

  const getMaintenanceStatus = (lastMaintenance) => {
    const daysSinceLastMaintenance = Math.floor(
      (new Date() - new Date(lastMaintenance)) / (1000 * 60 * 60 * 24)
    );
    return {
      status: daysSinceLastMaintenance > 30 ? 'warning' : 'success',
      days: daysSinceLastMaintenance
    };
  };

  const mockSensorDetails = {
    calibrationHistory: [
      { date: '2024-01-15', type: 'Regular', technician: 'John Doe' },
      { date: '2023-12-01', type: 'Emergency', technician: 'Jane Smith' },
      { date: '2023-11-15', type: 'Regular', technician: 'John Doe' }
    ]
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#fff', mb: 3 }}>
        Sensor Management
      </Typography>
      
      <Grid container spacing={3}>
        {Object.entries(sensorData || {}).map(([type, sensors]) =>
          sensors.map((sensor) => (
            <Grid item xs={12} sm={6} md={4} key={`${type}-${sensor.id}`}>
              <Card
                sx={{
                  p: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1">
                    {type.charAt(0).toUpperCase() + type.slice(1)} Sensor #{sensor.id}
                  </Typography>
                  {getBatteryIcon(sensor.batteryLevel)}
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption">Battery Level</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={sensor.batteryLevel}
                    sx={{ mt: 1 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    icon={<BuildCircle />}
                    label={`Last maintenance: ${getMaintenanceStatus(sensor.lastMaintenance).days} days ago`}
                    color={getMaintenanceStatus(sensor.lastMaintenance).status}
                    size="small"
                  />
                  <IconButton 
                    size="small" 
                    sx={{ color: '#fff' }}
                    onClick={() => {
                      setSelectedSensor({ ...sensor, type });
                      setDialogOpen(true);
                    }}
                  >
                    <Settings />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        PaperProps={{
          sx: {
            bgcolor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            color: '#fff'
          }
        }}
      >
        {selectedSensor && (
          <>
            <DialogTitle>
              {selectedSensor.type.charAt(0).toUpperCase() + selectedSensor.type.slice(1)} 
              Sensor #{selectedSensor.id} Details
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Calibration History
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#fff' }}>Date</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Type</TableCell>
                      <TableCell sx={{ color: '#fff' }}>Technician</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockSensorDetails.calibrationHistory.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: '#fff' }}>{record.date}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{record.type}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{record.technician}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default SensorManagement;