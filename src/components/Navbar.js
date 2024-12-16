import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  // On component mount, check if the user is logged in
  useEffect(() => {
    const user = localStorage.getItem('username');
    console.log('Retrieved user from localStorage:', user); // Debug log
    if (user) {
      setUsername(user);
    }
  }, []);

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    setUsername(null); // Remove the username from state
    navigate('/login'); // Redirect to the login page
  };

  console.log('Current username:', username); // Debug log

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Solutions Portal
            </Typography>
            {username ? (
              // Show username and logout button if the user is logged in
              <Box display="flex" alignItems="center">
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  Welcome, {username}
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            ) : (
              // Show Login button if the user is not logged in
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
