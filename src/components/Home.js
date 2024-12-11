import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, useTheme, Paper, Pagination } from '@mui/material';
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
  const [currentPage, setCurrentPage] = useState(1);
  const muiTheme = useTheme();

  const itemsPerPage = 4;

  useEffect(() => {
    axios
      .get('https://solutionscenter-backend-production.up.railway.app/api/solutions/')
      .then((response) => setSolutions(response.data))
      .catch((error) => console.error('Error fetching solutions:', error));
  }, []);

  // Paginate Solutions
  const paginatedSolutions = solutions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          <>
            <Grid container spacing={4}>
              {paginatedSolutions.map((solution) => (
                <Grid item xs={12} sm={6} md={6} key={solution.id}>
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

            {/* Pagination */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={Math.ceil(solutions.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>

            {/* Scrollable Widgets */}
            <Box sx={{ mt: 6, overflowX: 'scroll', display: 'flex', gap: 2 }}>
              {solutions.map((solution) => (
                <motion.div
                  key={solution.id}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  style={{ minWidth: 300 }}
                >
                  <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: '#9b51e0',
                        }}
                      >
                        {solution.solution_type.toUpperCase()} Solution
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: muiTheme.palette.text.secondary }}
                      >
                        {solution.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
