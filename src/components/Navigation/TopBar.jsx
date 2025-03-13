import React, { useState } from 'react';
import { 
  AppBar, Toolbar, IconButton, Typography, Badge, Box,
  Menu, MenuItem, Dialog, DialogTitle, DialogContent,
  List, ListItem, ListItemText, Switch, Divider
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';
import NotificationSystem from '../Notifications/NotificationSystem';
import { TextField } from '@mui/material';

const StyledAppBar = styled(AppBar)({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
});

const TopBar = ({ onThemeChange }) => {
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const notifications = [
    { id: 1, message: "High Air Pollution Alert in Zone A", time: "2 min ago" },
    { id: 2, message: "Heavy Traffic on Main Street", time: "5 min ago" },
    { id: 3, message: "Noise Level Warning in Zone B", time: "10 min ago" },
    { id: 4, message: "System Update Available", time: "15 min ago" }
  ];

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    onThemeChange?.(!isDarkMode);
  };

  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: ''
  });

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
          SCMS 2025
        </Typography>
        <Box>
          <IconButton 
            color="inherit" 
            onClick={() => setNotificationOpen(true)}
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleThemeToggle}>
            <DarkModeIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => setSettingsOpen(true)}>
            <SettingsIcon />
          </IconButton>
        </Box>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          PaperProps={{
            sx: {
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              maxWidth: '320px'
            }
          }}
        >
          {notifications.map((notification) => (
            <MenuItem key={notification.id} onClick={handleNotificationClose}>
              <Box>
                <Typography variant="body1">{notification.message}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* Settings Dialog */}
        <Dialog 
          open={settingsOpen} 
          onClose={() => setSettingsOpen(false)}
          PaperProps={{
            sx: {
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }
          }}
        >
          <DialogTitle>Settings</DialogTitle>
          <DialogContent>
            <List>
              <ListItem>
                <ListItemText primary="Dark Mode" />
                <Switch
                  edge="end"
                  checked={isDarkMode}
                  onChange={handleThemeToggle}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Notifications" 
                  secondary="Enable/disable notifications"
                />
                <Switch defaultChecked />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Auto Refresh" 
                  secondary="Update data every 10 seconds"
                />
                <Switch defaultChecked />
              </ListItem>
            </List>
          </DialogContent>
        </Dialog>

        <Dialog
          open={notificationOpen}
          onClose={() => setNotificationOpen(false)}
          PaperProps={{
            sx: {
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(10px)',
              minWidth: '400px'
            }
          }}
        >
          <DialogTitle sx={{ color: '#fff' }}>
            Notifications
          </DialogTitle>
          <DialogContent>
            <NotificationSystem />
          </DialogContent>
        </Dialog>
      </Toolbar>

      {/* Update Settings Dialog content */}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)}
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemText 
                primary="Email Notifications" 
                secondary="Receive critical alerts via email"
              />
              <Switch
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              />
            </ListItem>
            {emailNotifications && (
              <ListItem>
                <TextField
                  fullWidth
                  label="Email Address"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                  size="small"
                />
              </ListItem>
            )}
            <ListItem>
              <ListItemText 
                primary="SMS Notifications" 
                secondary="Receive critical alerts via SMS"
              />
              <Switch
                checked={smsNotifications}
                onChange={(e) => setSmsNotifications(e.target.checked)}
              />
            </ListItem>
            {smsNotifications && (
              <ListItem>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                  size="small"
                />
              </ListItem>
            )}
          </List>
        </DialogContent>
      </Dialog>
    </StyledAppBar>
  );
};

export default TopBar;