// backend/routes/teacherRoutes.js
const express = require('express');
const { uploadAssignment } = require('../controllers/teacherController');
const upload = require('../utils/fileUpload');
//const teacherController = require('../controllers/teacherController');


const router = express.Router();

router.post('/upload', upload.single('file'), uploadAssignment);
module.exports = router;