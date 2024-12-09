import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, useTheme, CardMedia, Paper } from '@mui/material';
import { motion } from 'framer-motion'; // For animations
import axios from 'axios';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1 } },
};

const Home = () => {
  const [solutions, setSolutions] = useState([]);
  const muiTheme = useTheme(); // Access theme properties

  // Fetch solutions data
  useEffect(() => {
    axios.get('https://solutionscenter-backend-production.up.railway.app/api/solutions/')
      .then((response) => {
        setSolutions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching solutions:', error);
      });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: muiTheme.palette.background.default,
        textAlign: 'center',
        py: 6,
        px: 3,
        minHeight: '100vh',
      }}
    >
      {/* Header Section */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            color: muiTheme.palette.primary.main,
          }}
        >
          SOLUTIONS CENTER
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 500,
            color: muiTheme.palette.secondary.main,
            mt: 2,
          }}
        >
          Your Problems Solved...
        </Typography>
      </motion.div>

      {/* Preview Section */}
      <motion.div variants={slideUp} initial="hidden" animate="visible">
        <Paper
          elevation={4}
          sx={{
            my: 5,
            p: 4,
            maxWidth: 900,
            margin: 'auto',
            borderRadius: 3,
            textAlign: 'center',
            backgroundColor: muiTheme.palette.background.paper,
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: muiTheme.palette.text.primary, mb: 2 }}
          >
            Preview
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: muiTheme.palette.text.secondary, lineHeight: 1.8 }}
          >
             This is where people work out solutions. People volunteer solutions to problems for which they have worked out solutions. Those who benefit from the solution are encouraged to show appreciation for the effort by a voluntary donation to the solutions provider. People or organizations request people in the open public to work out solutions to problems they are struggling with. People or organizations ask outsiders to work out new procedures, new processes, or even design better and newer products. The outsiders will provide these solutions to those who request at an agreed fee. Today outsourcing solutions is a common practice in business. Sell a solution to a problem you have seen people or organizations struggle with. Look at various areas of human endeavor. Identify problems people or organizations are struggling with. Work out solutions to those problems.
          </Typography>
        </Paper>
      </motion.div>

      {/* Services Section */}
      <Box sx={{ my: 6 }}>
        <Typography
          variant="h4"
          sx={{
            color: muiTheme.palette.primary.dark,
            fontWeight: 700,
            mb: 3,
          }}
        >
          Solutions Center Services
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: 'Volunteer a Solution',
              description: 'Offer solutions to help others.',
              image: '/images/volunteer.jpg', // Sample image path
              buttonText: 'Volunteer',
            },
            {
              title: 'Request a Solution',
              description: 'Get help for your problems.',
              image: '/images/request.jpg',
              buttonText: 'Request',
            },
            {
              title: 'Sell a Solution',
              description: 'Monetize your solutions.',
              image: '/images/sell.jpg',
              buttonText: 'Sell',
            },
          ].map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div variants={slideUp} initial="hidden" animate="visible">
                <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={card.image}
                    alt={card.title}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: muiTheme.palette.primary.main,
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: muiTheme.palette.text.secondary, my: 1 }}
                    >
                      {card.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2, borderRadius: 2 }}
                    >
                      {card.buttonText}
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
            color: muiTheme.palette.primary.dark,
            fontWeight: 700,
            mb: 3,
          }}
        >
          Browse Existing Solutions
        </Typography>
        {solutions.length === 0 ? (
          <Typography sx={{ color: muiTheme.palette.text.secondary }}>
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
                          color: muiTheme.palette.primary.main,
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
