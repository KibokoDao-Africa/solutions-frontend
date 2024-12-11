import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, useTheme, Paper } from '@mui/material';
import { motion } from 'framer-motion'; // For animations
import { FaLightbulb, FaHandsHelping, FaCoins } from 'react-icons/fa';
import axios from 'axios';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1 } },
};

const staggerContainer = {
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

const Home = () => {
  const [solutions, setSolutions] = useState([]);
  const muiTheme = useTheme();

  useEffect(() => {
    axios
      .get('https://solutionscenter-backend-production.up.railway.app/api/solutions/')
      .then((response) => setSolutions(response.data))
      .catch((error) => console.error('Error fetching solutions:', error));
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: muiTheme.palette.background.default,
        py: 6,
        px: 3,
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Hero Section */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={fadeIn}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(6,147,227,1) 0%, rgb(155,81,224) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            SOLUTIONS CENTRE
          </Typography>
        </motion.div>
        <motion.div variants={fadeIn}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              color: muiTheme.palette.secondary.main,
              mt: 2,
              textAlign: 'center',
            }}
          >
            Your Problems Solved...
          </Typography>
        </motion.div>
      </motion.div>

      {/* Highlight Section */}
      <motion.div variants={slideUp} initial="hidden" animate="visible" sx={{ mt: 6 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            maxWidth: 800,
            mx: 'auto',
            borderRadius: 4,
            background: 'linear-gradient(to right, #e3f2fd, #fce4ec)',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: muiTheme.palette.primary.main,
              fontWeight: 700,
              mb: 2,
              textAlign: 'center',
            }}
          >
            Empowering Communities
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: muiTheme.palette.text.secondary,
              lineHeight: 1.8,
            }}
          >
            We bring people together to solve problems, share solutions, and make an impact. Join us to volunteer, request, or sell solutions for real-world challenges.
          </Typography>
        </Paper>
      </motion.div>

      {/* Services Section */}
      <Box sx={{ mt: 8 }}>
        <Typography
          variant="h4"
          sx={{
            color: '#9b51e0',
            fontWeight: 700,
            textAlign: 'center',
            mb: 4,
          }}
        >
          Our Services
        </Typography>
        <Grid container spacing={6}>
          {[
            {
              icon: <FaHandsHelping size={50} color="#9b51e0" />,
              title: 'Volunteer a Solution',
              description: 'Offer your expertise and contribute to the community.',
              buttonText: 'Volunteer Now',
            },
            {
              icon: <FaLightbulb size={50} color="#9b51e0" />,
              title: 'Request a Solution',
              description: 'Find solutions to your toughest challenges.',
              buttonText: 'Request Help',
            },
            {
              icon: <FaCoins size={50} color="#9b51e0" />,
              title: 'Sell a Solution',
              description: 'Monetize your innovative ideas and solutions.',
              buttonText: 'Start Selling',
            },
          ].map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div variants={fadeIn}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: 6,
                    textAlign: 'center',
                    py: 4,
                    px: 2,
                  }}
                >
                  {service.icon}
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: muiTheme.palette.primary.dark,
                        mb: 2,
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: muiTheme.palette.text.secondary }}
                    >
                      {service.description}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 3,
                        borderRadius: 2,
                        px: 4,
                        fontWeight: 600,
                        color: '#ff6900',
                        '&:hover': {
                          backgroundColor: '#ff6900',
                          color: muiTheme.palette.common.white,
                        },
                      }}
                    >
                      {service.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Browse Solutions Section */}
<Box sx={{ my: 6 }}>
  <Typography
    variant="h4"
    sx={{
      color: '#9b51e0',
      fontWeight: 700,
      mb: 3,
      textAlign: 'center',
    }}
  >
    Browse Existing Solutions
  </Typography>
  {solutions.length === 0 ? (
    <Typography
      sx={{
        color: muiTheme.palette.text.secondary,
        textAlign: 'center',
      }}
    >
      No solutions available at the moment.
    </Typography>
  ) : (
    <Grid container spacing={4}>
      {solutions.map((solution) => (
        <Grid item xs={12} sm={6} md={4} key={solution.id}>
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#ff6900',
                  }}
                >
                  {solution.solution_type.toUpperCase()} Solution
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: muiTheme.palette.text.secondary, mt: 1 }}
                >
                  <strong>Description:</strong> {solution.description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: muiTheme.palette.text.secondary, mt: 1 }}
                >
                  <strong>Terms:</strong> {solution.terms}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: muiTheme.palette.text.secondary, mt: 1 }}
                >
                  <strong>Amount to Charge:</strong>{' '}
                  {solution.amount_to_charge || 'N/A'}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: muiTheme.palette.text.secondary, mt: 1 }}
                >
                  <strong>Amount Willing to Pay:</strong>{' '}
                  {solution.amount_willing_to_pay || 'N/A'}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  )}
</Box>


    </Box>
  );
};

export default Home;
