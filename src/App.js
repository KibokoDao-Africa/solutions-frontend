import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material'; // Import ThemeProvider and CssBaseline
import theme from './theme'; // Import the custom theme
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <ThemeProvider theme={theme}> {/* Wrap the app with ThemeProvider */}
      <CssBaseline /> {/* Reset CSS for consistent styling */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
