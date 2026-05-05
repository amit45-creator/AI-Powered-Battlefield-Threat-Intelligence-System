const express = require('express');
const { getThreats, getThreatById, createThreat, updateThreat, deleteThreat } = require('../controllers/threatController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/threats
router.get('/', getThreats);

// @route   GET /api/threats/:id
router.get('/:id', getThreatById);

// @route   POST /api/threats
router.post('/', createThreat);

// @route   PUT /api/threats/:id
router.put('/:id', updateThreat);

// @route   DELETE /api/threats/:id (Commander only)
router.delete('/:id', authorize('commander'), deleteThreat);

module.exports = router;
