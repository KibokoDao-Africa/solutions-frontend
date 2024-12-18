import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import PaginationComponent from './Pagination';

// Animation Variant
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const SolutionsList = ({ solutions, itemsPerPage, currentPage, handlePageChange }) => {
  // Pagination logic
  const indexOfLastSolution = currentPage * itemsPerPage;
  const indexOfFirstSolution = indexOfLastSolution - itemsPerPage;
  const currentSolutions = solutions.slice(indexOfFirstSolution, indexOfLastSolution);

  return (
    <Box sx={{ my: 6 }} id="browse-solutions">
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
            color: 'text.secondary',
            textAlign: 'center',
          }}
        >
          No solutions available at the moment.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {currentSolutions.map((solution) => (
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
                      sx={{ mt: 1 }}
                    >
                      <strong>Description:</strong> {solution.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1 }}
                    >
                      <strong>Terms:</strong> {solution.terms}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1 }}
                    >
                      <strong>Amount to Charge:</strong> {solution.amount_to_charge || 'N/A'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1 }}
                    >
                      <strong>Amount Willing to Pay:</strong> {solution.amount_willing_to_pay || 'N/A'}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <PaginationComponent
          count={Math.ceil(solutions.length / itemsPerPage)}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default SolutionsList;
