import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const SolutionsList = ({ solutions }) => {
  return (
    <Grid container spacing={3} sx={{ px: 3, py: 5 }}>
      {solutions.map((solution) => (
        <Grid item xs={12} sm={6} md={4} key={solution.id}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              {/* Title Styling */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: '#fe5b2c',
                }}
              >
                {solution.solution_type === 'sell' && 'Sell'}
                {solution.solution_type === 'request' && 'Request'}
                {solution.solution_type === 'volunteer' && 'Volunteer'}
              </Typography>

              {/* Description */}
              <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                {solution.description}
              </Typography>

              {/* Cost or Amount Willing to Pay Styling */}
              {solution.solution_type === 'sell' && solution.amount_to_charge !== null && (
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 'bold', mt: 1 }}
                >
                  Cost: KES {solution.amount_to_charge}
                </Typography>
              )}
              {solution.solution_type === 'request' && solution.amount_willing_to_pay !== null && (
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 'bold', mt: 1 }}
                >
                  Amount Willing to Pay: KES {solution.amount_willing_to_pay}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SolutionsList;
