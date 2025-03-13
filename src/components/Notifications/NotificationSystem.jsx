import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Badge,
  Box,
} from "@mui/material";
import { Warning, Error, Info, CheckCircle } from "@mui/icons-material";
import { sendEmail } from "../../services/NotificationService";

const NotificationSystem = ({ contactInfo }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "warning",
      message: "High traffic detected in Zone A",
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: 2,
      type: "error",
      message: "Air quality critical in Industrial Area",
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: 3,
      type: "info",
      message: "System maintenance scheduled",
      timestamp: new Date().toISOString(),
      read: true,
    },
  ]);

  const getIcon = (type) => {
    switch (type) {
      case "warning":
        return <Warning sx={{ color: "#ff9800" }} />;
      case "error":
        return <Error sx={{ color: "#f44336" }} />;
      case "success":
        return <CheckCircle sx={{ color: "#4caf50" }} />;
      default:
        return <Info sx={{ color: "#2196f3" }} />;
    }
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleCriticalNotification = async (notification) => {
    if (notification.type === "error" || notification.type === "warning") {
      if (contactInfo?.email) {
        try {
          await sendEmail(
            contactInfo.email,
            "Critical Alert - SCMS",
            notification.message
          );
        } catch (error) {
          console.error("Failed to send email notification:", error);
        }
      }
    }
  };

  const addNotification = (newNotification) => {
    setNotifications((prev) => [
      {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
        ...newNotification,
      },
      ...prev,
    ]);
    handleCriticalNotification(newNotification);
  };

  return (
    <Box>
      <List sx={{ width: "100%", maxHeight: 300, overflow: "auto" }}>
        {notifications.map((notification) => (
          <ListItem
            key={notification.id}
            sx={{
              bgcolor: notification.read
                ? "transparent"
                : "rgba(255, 255, 255, 0.05)",
              mb: 1,
              borderRadius: 1,
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
              },
            }}
            onClick={() => markAsRead(notification.id)}
          >
            <ListItemIcon>{getIcon(notification.type)}</ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2" sx={{ color: "#fff" }}>
                  {notification.message}
                </Typography>
              }
              secondary={
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255, 0.7)" }}
                >
                  {new Date(notification.timestamp).toLocaleString()}
                </Typography>
              }
            />
            {!notification.read && <Badge color="primary" variant="dot" />}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NotificationSystem;
