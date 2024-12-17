import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // Import the UserContext hook
import logo from '../assets/images/solutionslogobg.png';

const Navbar = () => {
  const { username, setUser } = useUser(); // Access global user context
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    
    // Update the context state to logout user
    setUser({ userId: null, username: null }); 
    
    // Redirect to the login page
    navigate('/login'); 
  };

  // Handle login (assuming user data is available after login)
  const handleLogin = (userData) => {
    const { userId, username } = userData;

    // Update the context state with the logged-in user data
    setUser({ userId, username });

    // Save user data to localStorage
    localStorage.setItem('user_id', userId);
    localStorage.setItem('username', username);
    
    // Navigate to the home page after login
    navigate('/');
  };

  // Handle logo click to reload the home page
  const handleLogoClick = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {/* Logo with border and clickable to reload home page */}
            <Box
              component="img"
              src={logo}
              alt="Solutions Logo"
              sx={{
                height: 40,
                width: 'auto',
                borderRadius: 1,
                marginRight: 2,
                cursor: 'pointer',
              }}
              onClick={handleLogoClick} // Click handler to reload home page
            />
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
              <Button color="inherit" component={Link} to="/login" onClick={() => handleLogin({ userId: '123', username: 'JohnDoe' })}>
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
