// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const uploadAssignment = async (file, title, deadline, instructions) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('deadline', deadline);
  formData.append('instructions', instructions);

  const response = await axios.post(`${API_BASE_URL}/teacher/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getAssignments = async () => {
  const response = await axios.get(`${API_BASE_URL}/teacher/assignments`);
  return response.data;
};

export const submitAssignment = async (file, studentId, assignmentId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('studentId', studentId);
  formData.append('assignmentId', assignmentId);

  const response = await axios.post(`${API_BASE_URL}/student/submit`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getFeedback = async (studentId) => {
  const response = await axios.get(`${API_BASE_URL}/student/feedback/${studentId}`);
  return response.data;
};