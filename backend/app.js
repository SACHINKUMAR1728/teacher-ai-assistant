// backend/app.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Import sequelize from config
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Sync models with the database
const Assignment = require('./models/Assignment');
const Submission = require('./models/Submission');
const Feedback = require('./models/Feedback');

sequelize.sync()
  .then(() => console.log('Models synced with database'))
  .catch(err => console.error('Error syncing models:', err));

// Routes
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/evaluation', evaluationRoutes);
// backend/app.js
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));