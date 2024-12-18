import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Navbar />
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 2, // Add padding if necessary
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
