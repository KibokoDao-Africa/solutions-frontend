// ResetPassword.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setToken(params.get('token'));
    setEmail(params.get('email'));
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await axios.post('https://solutionscenter-backend-production.up.railway.app/password_reset_confirm/', { token, email, password });
      alert('Password reset successful! Please log in.');
    } catch (error) {
      console.error(error);
      alert('Failed to reset password.');
    }
  };

  return (
    <Container maxWidth="xs">
      <TextField
        fullWidth
        label="New Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Confirm New Password"
        type="password"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        margin="normal"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Reset Password
      </Button>
    </Container>
  );
};

export default ResetPassword;
