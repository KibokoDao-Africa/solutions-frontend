import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, Paper, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import SolutionsList from '../components/SolutionsList';
import ServicesSection from '../components/ServicesSection';

// Animation Variants
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
  const [itemsPerPage] = useState(6);
  const muiTheme = useTheme();

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/solutions/')
      .then((response) => {
        setSolutions(response.data);
      })
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
            Preview
          </Typography>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
            }}
          >
            This is where people work out solutions...
          </Typography>
        </Paper>
      </motion.div>

        
      {/* Services Section */}
      <ServicesSection />

       {/* Divider */}
      <Divider sx={{ my: 6, borderWidth: 2, borderColor: muiTheme.palette.divider }} />

      {/* Solutions List */}
      <SolutionsList
        solutions={solutions}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        handlePageChange={(event, value) => setCurrentPage(value)}
      />
    </Box>
  );
};

export default Home;
