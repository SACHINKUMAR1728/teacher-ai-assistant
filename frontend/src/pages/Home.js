// src/pages/Home.js
import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <Box textAlign="center" mt={5}>
        <Typography variant="h3" gutterBottom>
          Welcome to the Teacher AI Assistant
        </Typography>
        <Typography variant="h6" gutterBottom>
          Manage assignments, submissions, and feedback with ease.
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/teacher"
            sx={{ mr: 2 }}
          >
            Teacher Dashboard
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/student"
          >
            Student Dashboard
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;