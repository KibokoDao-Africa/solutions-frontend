import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // Import the UserContext hook
import logo from '../assets/images/solutionslogobg.png';

const Navbar = () => {
  const { user, setUser } = useUser(); // Access global user context
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

  // Check if user is already logged in on initial render
  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    const storedUsername = localStorage.getItem('username');

    if (storedUserId && storedUsername) {
      setUser({ userId: storedUserId, username: storedUsername });
    }
  }, [setUser]);

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
            {user?.username ? (
              // Show username and logout button if the user is logged in
              <Box display="flex" alignItems="center">
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  Welcome, {user.username}
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
