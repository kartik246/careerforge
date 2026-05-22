const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.get('/progress', authMiddleware, userController.getProgress);
router.post('/progress', authMiddleware, userController.updateProgress);
router.get('/quiz-scores', authMiddleware, userController.getQuizScores);
router.post('/quiz-scores', authMiddleware, userController.updateQuizScore);

module.exports = router;
