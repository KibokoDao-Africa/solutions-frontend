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

  // Error handler
  const handleError = (error) => {
    const errorMessage = error.response?.data?.detail || error.message || 'An unknown error occurred.';
    console.error('Error:', errorMessage);
    alert(`Authentication failed: ${errorMessage}`);
  };

  // Function for handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isResetPassword) {
        await handlePasswordReset();
      } else if (isNewUser) {
        await handleRegister();
      } else {
        await handleLogin();
      }
    } catch (error) {
      handleError(error);
    }
  };

  // Password reset handler
  const handlePasswordReset = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    await axios.post('https://solutionscenter-backend-production.up.railway.app/api/password_reset/', { email });
    alert('Password reset link sent to your email.');
    setIsResetPassword(false);
  };

  // Register new user handler
  const handleRegister = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    await axios.post('https://solutions-center-production.up.railway.app/api/register/', { 
      username, 
      password, 
      email, 
      phone, 
      first_name: firstName, 
      last_name: lastName 
    });
    alert('Account created! Redirecting to login...');
    navigate('/login'); // Redirect to login page
  };

  // Login handler
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://solutions-center-production.up.railway.app/api/login/', {email, password });

      // Ensure the response contains access_token and refresh_token
      const data = await response.data;



      // if (!access_token || !refresh_token || !user) {
      //   throw new Error('Invalid login response from the server');
      // }
      // console.log(data);
      if(data.status=true){

        const access_token = data.access_token;
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem("user_id", data.user_id);
        alert('Login successful! Redirecting to home...');
        navigate('/');
      }else{
        alert('Login failed! Please try again...');
      }
      
      // console.log(access_token);
      // Store tokens and user data in localStorage
      // localStorage.setItem('accessToken', access_token);
      // localStorage.setItem('refreshToken', refresh_token);
      // localStorage.setItem('user_id', user.id);
      // localStorage.setItem('username', user.username);
      // localStorage.setItem('email', user.email);

       // Redirect to home page
    } catch (error) {
      handleError(error);
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
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  {/* <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    margin="normal"
                    type="email"
                  /> */}
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

                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    margin="normal"
                    type="username"
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
