// backend/routes/teacherRoutes.js
const express = require('express');
const { uploadAssignment, getAllAssignments } = require('../controllers/teacherController');
const upload = require('../utils/fileUpload');
//const teacherController = require('../controllers/teacherController');


const router = express.Router();

router.post('/upload', upload.single('file'), uploadAssignment);
router.get('/assignments', getAllAssignments); // Add this line
module.exports = router;