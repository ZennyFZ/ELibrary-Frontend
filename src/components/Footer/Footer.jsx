import * as React from 'react';
import { Box, Grid, Typography, Container, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import {Link} from 'react-router-dom';

// Replace these with your own social media URLs
const socialMediaLinks = {
  facebook: '#',
  twitter: '#',
  instagram: '#',
};

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        color: 'text.secondary',
        py: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" style={{fontWeight: "bold"}} gutterBottom>
              ELibrary
            </Typography>
            {/* //image here */}
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" color="text.primary" style={{fontWeight: "bold"}} gutterBottom>
              Quick Links
            </Typography>
            <div style={{display: "flex", flexDirection: "column"}}>
            <Link to="/" >Home</Link>
            <Link to="/" >Books</Link>
            <Link to="/" >Contact</Link>
            <Link to="/" >About</Link>
            </div>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" color="text.primary" style={{fontWeight: "bold"}} gutterBottom>
              SOCIAL MEDIA
            </Typography>
            <IconButton aria-label="Facebook" color="inherit" component="a" href={socialMediaLinks.facebook}>
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Twitter" color="inherit" component="a" href={socialMediaLinks.twitter}>
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="Instagram" color="inherit" component="a" href={socialMediaLinks.instagram}>
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.primary" align="center" sx={{ pt: 4 }}>
          © 2024 ELibrary. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;