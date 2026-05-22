const express = require('express');
const router = express.Router();
const multer = require('multer');
const resumeController = require('../controllers/resumeController');
const authMiddleware = require('../middleware/auth');

const upload = multer({ dest: 'uploads/' });

router.post('/analyze', authMiddleware, upload.single('resume'), resumeController.analyzeResume);

module.exports = router;
