import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Solutions Portal
            </Typography>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
