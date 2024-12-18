import React from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        padding: '40px 0',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Us Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2, lineHeight: 1.8 }}>
              Solutions Center is dedicated to fostering collaboration and innovation worldwide.
              Join our platform to be a part of the change.
            </Typography>
            <Typography variant="body2" sx={{ color: '#b3b3b3', marginTop: 1 }}>
              Copyright © {currentYear} Solutions Center
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                Home
              </Link>
              <Link href="/about" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                About
              </Link>
              <Link href="/services" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                Services
              </Link>
              <Link href="/contact" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Contact Info Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Contact Info
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
              Email:{' '}
              <Link href="mailto:info@solutionscenterke.com" color="inherit" underline="hover">
                info@solutionscenterke.com
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
              Phone: 254 (00) 832 2342
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
              Address: Koinange Street
              <br />
              Mercantile House, Room 217
            </Typography>
            {/* Social Media Links */}
            <Box sx={{ marginTop: 2, display: 'flex', gap: 1 }}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
                sx={{
                  color: '#ffffff',
                  '&:hover': { color: '#1877F2' },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                aria-label="Twitter"
                sx={{
                  color: '#ffffff',
                  '&:hover': { color: '#1DA1F2' },
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
                sx={{
                  color: '#ffffff',
                  '&:hover': { color: '#0077B5' },
                }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {/* Footer Bottom Bar */}
      <Box
        sx={{
          backgroundColor: '#0f0f0f',
          textAlign: 'center',
          padding: '10px 0',
          marginTop: '20px',
        }}
      >
        <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
          <Link href="/terms" color="inherit" underline="hover">
            Terms of Service
          </Link>{' '}
          |{' '}
          <Link href="/privacy" color="inherit" underline="hover">
            Privacy Policy
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
