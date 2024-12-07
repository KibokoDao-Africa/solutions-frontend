import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, useTheme } from '@mui/material';
import SolutionsList from './SolutionsList';
import { heartbeat, typewriter, cursor } from './animations';
import axios from 'axios';

const Home = () => {
  const [solutions, setSolutions] = useState([]);
  const theme = useTheme();  // Use theme if necessary (e.g., colors or spacing)

  // Fetch solutions data
  useEffect(() => {
o    axios.get('https://solutionscenter-backend-production.up.railway.app/api/solutions/')
      .then((response) => setSolutions(response.data))
      .catch((error) => console.error('Error fetching solutions:', error));
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#8d9da1',
        textAlign: 'center',
        py: 6,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 'bold',
          color: '#752c34',
          animation: `${heartbeat} 1.5s infinite`,
        }}
      >
        SOLUTIONS CENTER
      </Typography>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          color: '#552c88',
          mt: 2,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          display: 'inline-block',
          animation: `${typewriter} 6s steps(30, end) infinite, ${cursor} 3s step-end infinite`,
        }}
      >
        Your Problems Solved......
      </Typography>

      {/* Section 2: Preview */}
      <Box
        sx={{
          px: 3,
          py: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            maxWidth: '80%',
            backgroundColor: '#f7f7f7',
            padding: 4,
            borderRadius: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            margin: 'auto',
          }}
        >
          <CardContent>
            <Typography
              variant="h2"
              sx={{
                color: '#552c88',
                fontSize: '2rem',
                fontWeight: 700,
                textAlign: 'center',
                marginBottom: 2,
              }}
            >
              Preview
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#333',
                fontSize: '1.1rem',
                lineHeight: 2, // Double line spacing
                textAlign: 'justify',
              }}
            >
              This is where people work out solutions. People volunteer solutions to problems for which they have worked out solutions. Those who benefit from the solution are encouraged to show appreciation for the effort by a voluntary donation to the solutions provider. People or organizations request people in the open public to work out solutions to problems they are struggling with. People or organizations ask outsiders to work out new procedures, new processes, or even design better and newer products. The outsiders will provide these solutions to those who request at an agreed fee. Today outsourcing solutions is a common practice in business. Sell a solution to a problem you have seen people or organizations struggle with. Look at various areas of human endeavor. Identify problems people or organizations are struggling with. Work out solutions to those problems.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Section 3: Services */}
      <Box sx={{ px: 3, py: 5 }}>
        <Typography variant="h4" sx={{ color: '#552c88', textAlign: 'center', mb: 4, fontWeight: 700, }}>
          Solutions Center Services
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              title: 'Volunteer a solution',
              description: 'This is where people offer solutions...',
              buttonText: 'Volunteer',
            },
            {
              title: 'Request a solution',
              description: 'This is where people request solutions...',
              buttonText: 'Request',
            },
            {
              title: 'Sell a solution',
              description: 'This is where people sell solutions...',
              buttonText: 'Sell',
            },
          ].map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: 'center', borderRadius: '12px' }}>
                <CardContent>
                  <Typography variant="h5" sx={{ color: '#fe5b2c', fontWeight: 'bold' }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
                    {card.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: '24px',
                      backgroundColor: '#1f3b83',
                      color: '#fe5b2c',
                      '&:hover': {
                        backgroundColor: '#722c35',
                        color: '#fefeff',
                      },
                    }}
                  >
                    {card.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

            {/* Display Solutions Section */}
            <Box sx={{ px: 3, py: 5 }}>
        <Typography
          variant="h4"
          sx={{
            color: '#552c88',
            textAlign: 'center',
            mb: 4,
            fontWeight: 700,
          }}
        >
          Browse Existing Solutions
        </Typography>
        {solutions.length === 0 ? (
          <Typography sx={{ color: '#555', textAlign: 'center' }}>
            No solutions available at the moment.
          </Typography>
        ) : (
          <SolutionsList solutions={solutions} />
        )}
      </Box>
 
    </Box>
  );
};

export default Home;
