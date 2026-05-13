const express = require('express');
const { getDashboardStats, getSectorWiseData, getThreatTypeDistribution, getThreatTrends, getAISummary } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All dashboard routes require authentication
router.use(protect);

// @route   GET /api/dashboard/stats
router.get('/stats', getDashboardStats);

// @route   GET /api/dashboard/sector-wise
router.get('/sector-wise', getSectorWiseData);

// @route   GET /api/dashboard/threat-types
router.get('/threat-types', getThreatTypeDistribution);

// @route   GET /api/dashboard/trends
router.get('/trends', getThreatTrends);
router.get('/summary', getAISummary);

module.exports = router;
