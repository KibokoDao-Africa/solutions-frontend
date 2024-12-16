import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, Link } from '@mui/material';

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isResetPassword) {
        if (!/\S+@\S+\.\S+/.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }

        // Password reset request
        await axios.post('http://localhost:8000/api/password_reset/', { email });
        alert('Password reset link sent to your email.');
        setIsResetPassword(false);
      } else {
        if (isNewUser) {
          // Validate email and phone number
          if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email address.');
            return;
          }

          if (!/^\d{10}$/.test(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
          }

          // Register new user
          await axios.post('http://localhost:8000/api/register/', { 
            username, 
            password, 
            email, 
            phone, 
            first_name: firstName, 
            last_name: lastName 
          });
          alert('Account created! Redirecting to login...');
          navigate('/login'); // Redirect to login page
        } else {
          // Log in existing user
          const response = await axios.post('http://localhost:8000/api/token/', { username, password });
          localStorage.setItem('accessToken', response.data.access);
          localStorage.setItem('refreshToken', response.data.refresh);
          localStorage.setItem('username', username);
          alert('Login successful! Redirecting to home...');
          navigate('/'); // Redirect to home page
        }
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Authentication failed.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
          padding: 2,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          {isResetPassword ? 'Reset Password' : isNewUser ? 'Register' : 'Login'}
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {!isResetPassword && (
            <>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                margin="normal"
              />
              {isNewUser && (
                <>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    margin="normal"
                    type="email"
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    margin="normal"
                    type="tel"
                    helperText="Enter a 10-digit phone number"
                  />
                </>
              )}
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                margin="normal"
              />
            </>
          )}
          {isResetPassword && (
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
              type="email"
            />
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: 2 }}
          >
            {isResetPassword ? 'Send Reset Link' : isNewUser ? 'Register' : 'Login'}
          </Button>
        </form>

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" align="center">
            {isResetPassword ? (
              <Link
                component="button"
                variant="body2"
                onClick={() => setIsResetPassword(false)}
              >
                Back to Login
              </Link>
            ) : isNewUser ? (
              <Link
                component="button"
                variant="body2"
                onClick={() => setIsNewUser(false)}
              >
                Already have an account? Log in.
              </Link>
            ) : (
              <>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setIsNewUser(true)}
                >
                  New user? Register here.
                </Link>
                <br />
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setIsResetPassword(true)}
                >
                  Forgot password?
                </Link>
              </>
            )}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
