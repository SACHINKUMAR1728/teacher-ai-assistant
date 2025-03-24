// src/pages/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import FileUpload from '../components/FileUpload';
import { submitAssignment, getAssignments, getFeedback } from '../services/api';

const StudentDashboard = () => {
  const [file, setFile] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [assignmentId, setAssignmentId] = useState('');
  const [message, setMessage] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);
  useEffect(() => {
    if (studentId) {
      fetchFeedback();
    }
  }, [studentId]);

  const fetchAssignments = async () => {
    try {
      const response = await getAssignments();
      setAssignments(response.data);
    } catch (err) {
      console.error('Failed to fetch assignments:', err);
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await getFeedback(studentId);
      setFeedback(response.data);
    } catch (err) {
      console.error('Failed to fetch feedback:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitAssignment(file, studentId, assignmentId);
      setMessage('Assignment submitted successfully!');
      fetchFeedback(); // Refresh feedback after submission
    } catch (err) {
      setMessage('Failed to submit assignment.');
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Student Dashboard
      </Typography>
      <Box component="form" onSubmit={handleSubmit} mt={3}>
        <TextField
          fullWidth
          label="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Assignment ID"
          value={assignmentId}
          onChange={(e) => setAssignmentId(e.target.value)}
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
        Available Assignments
      </Typography>
      <List>
        {assignments.map((assignment) => (
          <ListItem key={assignment.id}>
            <ListItemText
              primary={assignment.title}
              secondary={`Assignment ID: ${assignment.id}`}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" mt={4}>
        Feedback
      </Typography>
      <List>
        {feedback.map((fb) => (
          <ListItem key={fb.id}>
            <ListItemText
              primary={`Assignment ID: ${fb.Submission.assignmentId}`} // Access via Submission
              secondary={`Feedback: ${fb.feedbackText} | Grade: ${fb.grade}`}
            />
          </ListItem>
        ))}
      </List>

    </Container>
  );
};

export default StudentDashboard;