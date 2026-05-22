const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/auth');

router.get('/', applicationController.getApplications);
router.post('/', authMiddleware, applicationController.applyToJob);
router.patch('/:id/status', applicationController.updateStatus);

module.exports = router;
