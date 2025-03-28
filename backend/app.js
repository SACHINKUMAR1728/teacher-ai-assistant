const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Connection error:', err));

// Sync ONLY Assignment and Submission models
sequelize.sync({
  models: [require('./models/Assignment'), require('./models/Submission')]
})
  .then(() => console.log('Models synced'))
  .catch(err => console.error('Sync error:', err));

// Routes
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/evaluation', evaluationRoutes);
app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));