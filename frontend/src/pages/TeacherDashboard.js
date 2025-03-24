// src/pages/TeacherDashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import FileUpload from '../components/FileUpload';
import { uploadAssignment, getAssignments } from '../services/api';

const TeacherDashboard = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [instructions, setInstructions] = useState('');
  const [message, setMessage] = useState('');
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await getAssignments();
      setAssignments(response.data);
    } catch (err) {
      console.error('Failed to fetch assignments:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await uploadAssignment(file, title, deadline, instructions);
      setMessage('Assignment uploaded successfully!');
      fetchAssignments(); // Refresh the list of assignments
    } catch (err) {
      setMessage('Failed to upload assignment.');
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Teacher Dashboard
      </Typography>
      <Box component="form" onSubmit={handleSubmit} mt={3}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Deadline"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Instructions"
          multiline
          rows={4}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          margin="normal"
          required
        />
        <FileUpload onFileChange={setFile} />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit Assignment
        </Button>
      </Box>
      {message && (
        <Typography variant="body1" color="textSecondary" mt={2}>
          {message}
        </Typography>
      )}

      <Typography variant="h5" mt={4}>
        Uploaded Assignments
      </Typography>
      <List>
        {assignments.map((assignment) => (
          <ListItem key={assignment.id}>
            <ListItemText
              primary={assignment.title}
              secondary={`Deadline: ${assignment.deadline}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TeacherDashboard;