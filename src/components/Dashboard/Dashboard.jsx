import React, { useState } from "react";
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import CityMap from "../Map/CityMap";
import DataPanel from "../DataPanel/DataPanel";
import { motion } from "framer-motion";
import TopBar from "../Navigation/TopBar";
import QuickStats from "../Stats/QuickStats";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Analytics from "../Analytics/Analytics";
import SensorManagement from "../SensorManagement/SensorManagement";
import ReportGenerator from "../Reports/ReportGenerator";

const GlassPanel = styled(Paper)(({ theme, darkMode }) => ({
  background: darkMode ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  border: `1px solid ${
    darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)"
  }`,
  padding: theme.spacing(2),
  boxShadow: darkMode
    ? "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
    : "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  color: "#fff",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: darkMode
      ? "0 8px 32px 0 rgba(0, 0, 0, 0.6)"
      : "0 8px 32px 0 rgba(31, 38, 135, 0.6)",
    transform: "translateY(-5px)",
  },
}));

const DashboardContainer = styled(Box)(({ theme, darkMode }) => ({
  background: darkMode
    ? "linear-gradient(45deg, #0a1929 0%, #1a237e 100%)"
    : "linear-gradient(45deg, #1a237e 0%, #0d47a1 100%)",
  minHeight: "100vh",
  padding: "20px",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0) 50%)",
    animation: "pulse 15s infinite",
  },
}));

const AnimatedTitle = styled(motion.div)({
  marginBottom: "2rem",
  textAlign: "center",
  "& h4": {
    color: "#fff",
    fontSize: "2.5rem",
    fontWeight: 600,
    letterSpacing: "2px",
    textShadow: "0 0 10px rgba(255,255,255,0.5)",
  },
});

function Dashboard() {
  const [sensorData, setSensorData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      background: {
        default: isDarkMode ? "#0a1929" : "#1a237e",
      },
    },
  });

  const handleSensorUpdate = (data) => {
    setSensorData(data);
    // You can add additional logic here if needed
    console.log("Sensor data updated:", data);
  };

  const handleThemeChange = (darkMode) => {
    setIsDarkMode(darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <DashboardContainer darkMode={isDarkMode}>
        <TopBar onThemeChange={handleThemeChange} />
        <Box sx={{ p: 3 }}>
          <AnimatedTitle
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h4" gutterBottom>
              Smart City Management System - Mert Duyar
            </Typography>
          </AnimatedTitle>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <QuickStats sensorData={sensorData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <GlassPanel elevation={0} darkMode={isDarkMode}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: "#fff",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontSize: "1.2rem",
                      borderBottom: "2px solid rgba(255,255,255,0.2)",
                      paddingBottom: "10px",
                    }}
                  >
                    Real-Time City Monitoring
                  </Typography>
                  <CityMap onSensorUpdate={handleSensorUpdate} />
                </GlassPanel>
              </Grid>
              <Grid item xs={12} md={4}>
                <GlassPanel elevation={0} darkMode={isDarkMode}>
                  <DataPanel sensorData={sensorData} isDarkMode={isDarkMode} />
                </GlassPanel>
              </Grid>
              <Grid item xs={12}>
                <GlassPanel elevation={0} darkMode={isDarkMode}>
                  <Analytics sensorData={sensorData} />
                </GlassPanel>
              </Grid>

              <Grid item xs={12}>
                <GlassPanel elevation={0} darkMode={isDarkMode}>
                  <SensorManagement sensorData={sensorData} />
                </GlassPanel>
              </Grid>

              <Grid item xs={12}>
                <GlassPanel elevation={0} darkMode={isDarkMode}>
                  <ReportGenerator sensorData={sensorData} />
                </GlassPanel>
              </Grid>
            </Grid>
          </motion.div>
        </Box>
      </DashboardContainer>
    </ThemeProvider>
  );
}

export default Dashboard;
