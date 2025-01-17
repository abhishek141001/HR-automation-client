// src/components/SideNav.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Avatar, Divider } from '@mui/material';
import { Home, AccountCircle, Settings, Logout } from '@mui/icons-material';

const SideNav = ({name,email}) => {
 

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#2c3e50',
          color: 'white',
          paddingTop: '20px',
        },
      }}
    >
      {/* User Info Section */}
      <div className="flex items-center px-6 mb-8">
        {/* <Avatar src={user.avatar} alt={name} sx={{ width: 56, height: 56 }} /> */}
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-400">{email}</p>
        </div>
      </div>
      <Divider sx={{ backgroundColor: '#34495e' }} />

      {/* Navigation Links */}
      <List>
        <ListItem button>
          <Home sx={{ color: 'white' }} />
          <ListItemText primary="Home" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button>
          <AccountCircle sx={{ color: 'white' }} />
          <ListItemText primary="Profile" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button>
          <Settings sx={{ color: 'white' }} />
          <ListItemText primary="Settings" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button>
          <Logout sx={{ color: 'white' }} />
          <ListItemText primary="Logout" sx={{ color: 'white' }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNav;
