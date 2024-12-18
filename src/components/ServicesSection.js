import React, { useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { FaHandsHelping, FaLightbulb, FaCoins } from "react-icons/fa";
import { motion } from "framer-motion";
import SolutionsForm from "./SolutionsForm";

const ServicesSection = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [currentSolutionType, setCurrentSolutionType] = useState("");

  const handleOpenForm = (type) => {
    setCurrentSolutionType(type);
    setFormOpen(true);
  };

  const handleCloseForm = () => setFormOpen(false);

  const handleSubmitSolution = (data) => {
    console.log("Submitted Data:", data); // Replace with API call in the form component
  };

  const services = [
    {
      icon: <FaHandsHelping size={50} color="#9b51e0" />,
      title: "Volunteer a Solution",
      description: "Offer your expertise and contribute to the community.",
      buttonText: "Volunteer Now",
      type: "volunteer",
    },
    {
      icon: <FaLightbulb size={50} color="#9b51e0" />,
      title: "Request a Solution",
      description: "Find solutions to your toughest challenges.",
      buttonText: "Request Help",
      type: "request",
    },
    {
      icon: <FaCoins size={50} color="#9b51e0" />,
      title: "Sell a Solution",
      description: "Monetize your innovative ideas and solutions.",
      buttonText: "Start Selling",
      type: "sell",
    },
  ];

  return (
    <Box sx={{ mt: 8 }}>
      <Typography
        variant="h4"
        sx={{
          color: "#9b51e0",
          fontWeight: 700,
          textAlign: "center",
          mb: 4,
        }}
      >
        Our Services
      </Typography>
      <Grid container spacing={6}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 6,
                  textAlign: "center",
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
                      color: "#9b51e0",
                      mb: 2,
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#6d6d6d", mb: 2 }}>
                    {service.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 3,
                      borderRadius: 2,
                      px: 4,
                      fontWeight: 600,
                      backgroundColor: "#ff6900",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#e85e00",
                      },
                    }}
                    onClick={() => handleOpenForm(service.type)}
                  >
                    {service.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <SolutionsForm
        open={formOpen}
        handleClose={handleCloseForm}
        solutionType={currentSolutionType}
        handleSubmit={handleSubmitSolution}
      />
    </Box>
  );
};

export default ServicesSection;
