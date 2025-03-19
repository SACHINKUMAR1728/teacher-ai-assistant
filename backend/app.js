const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Unable to connect to the database:', err));

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));