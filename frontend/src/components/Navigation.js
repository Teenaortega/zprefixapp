import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';


const Navigation = () => {
  const location = useLocation();
  const [value, setValue] = useState(`${location.pathname}`);
  const navigate = useNavigate();

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event, newValue) => {
    navigate(`${newValue}`);
    setValue(newValue);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const LeftSections = [
    { value: '/home/', label: 'Home', callback: () => { navigate('/home/'); } },
    { value: '/users/', label: 'All Users', callback: () => { navigate('/users/'); } },
    { value: '/items/', label: 'Item List', callback: () => { navigate('/items/'); } },
    { value: '/newitem/', label: 'Add a New Item', callback: () => { navigate('/newitem/'); } },
    // { value: '/settings', label: 'Settings', callback: () => { navigate('/settings'); } }
  ];


  return (
    <Box sx={{flexGrow: 1,}} width="100%">
      <AppBar
        sx={{ bgcolor: '#1f2024' }}
        position="static"
        width="100%">
        <Toolbar variant="dense">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {LeftSections.map((tab, index) => <Tab sx={{ color: '#d2d2d2' }} value={tab.value} label={tab.label} key={`tab${index}`} />)}
          

          {/* {auth && ( */}
          <div >
              <IconButton justify="end"
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle sx={{ color: 'pink' }}  justifycontent="end"  />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                  justifycontent: "end" 
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem sx={{ color: 'pink' }} onClick={handleClose}>Profile</MenuItem>
                <MenuItem sx={{ color: 'pink' }} onClick={handleClose}>My account</MenuItem>
                <MenuItem sx={{ color: 'pink' }} onClick={handleClose}>Log Out</MenuItem>
              </Menu></div>
          {/* )} */}</Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;