import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, Paper, Divider, Button } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import SolutionsList from '../components/SolutionsList';
import ServicesSection from '../components/ServicesSection';
import SolutionsForm from '../components/SolutionsForm';

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
  const [formOpen, setFormOpen] = useState(false);
  const [currentSolutionType, setCurrentSolutionType] = useState("volunteer");
  const [userId, setUserId] = useState(null);
  const muiTheme = useTheme();

  useEffect(() => {
    // Fetch solutions
    axios
    .get("https://solutions-center-production.up.railway.app/api/solution/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer `+localStorage.getItem("accessToken"), // Example for token authentication
      },
    })
    .then((response) => {
      console.log(response.data);
      setSolutions(response.data);
    })
    .catch((error) => console.error("Error fetching solutions:", error));
  
    // Retrieve the userId from local storage

  
    const storedUserId = localStorage.getItem("user_id");
    setUserId(storedUserId);

    console.log(userId);
  }, [userId]);

  const handleOpenForm = () => {
    setFormOpen(true);
    setCurrentSolutionType("volunteer");
    
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  const handleSubmitSolution = async (data) => {
    try {
      console.log("This is the data being sent over"+{...data})
      const response = await axios.post("https://solutions-center-production.up.railway.app/api/solution/", {
        ...data, // Include userId in the payload
      },{
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer `+localStorage.getItem("accessToken"),
        }
      });

      console.log("API Response:", response.data);
      alert("Solution submitted successfully!");
      handleCloseForm();
      
      // Refresh the solutions list
      axios
        .get('https://solutions-center-production.up.railway.app/api/solution/',{
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer `+localStorage.getItem("accessToken"),
          }
        })
        .then((response) => {
          setSolutions(response.data);
        })
        .catch((error) => console.error('Error refreshing solutions:', error));
    } catch (error) {
      console.error("Error submitting solution:", error);
      alert("Failed to submit the solution. Please try again.");
    }
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
            Your Problems Solved ....
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
           This is where people work out solutions. People volunteer solutions to problems for which they have worked out solutions. Those who benefit from the solution are encouraged to show appreciation for the effort by a voluntary donation to the solutions provider. People or organizations request people in the open public to work out solutions to problems they are struggling with. People or organizations ask outsiders to work out new procedures, new processes, or even design better and newer products. The outsiders will provide these solutions to those who request at an agreed fee. Today outsourcing solutions is a common practice in business. Sell a solution to a problem you have seen people or organizations struggle with. Look at various areas of human endeavor. Identify problems people or organizations are struggling with. Work out solutions to those problems.
          </Typography>
        </Paper>
      </motion.div>

      {/* Quick Submit Solution Button */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        {solutions.length>0 ? (
          <Button
            variant="contained"
            onClick={handleOpenForm}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              backgroundColor: "#9b51e0",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#7a3da1",
              },
              boxShadow: 3,
            }}
          >
            Add New Solution
          </Button>
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: "#ff0000",
              textAlign: "center",
              mb: 2,
            }}
          >
            Please log in to submit a solution.
          </Typography>
        )}
      </Box>
        
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

      {/* Solutions Form Dialog */}
      {userId && (
        <SolutionsForm
          open={formOpen}
          handleClose={handleCloseForm}
          solutionType={currentSolutionType}
          userId={userId}
          onSubmit={handleSubmitSolution}
        />
      )}
    </Box>
  );
};

export default Home;
