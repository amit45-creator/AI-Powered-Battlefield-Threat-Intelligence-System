const Threat = require('../models/Threat');
const aiService = require('../services/aiService');

// @desc    Get all threats
// @route   GET /api/threats
// @access  Private
const getThreats = async (req, res) => {
  try {
    const { threatType, status, priority, sector, page = 1, limit = 20 } = req.query;

    // Build filter
    const filter = {};
    if (threatType) filter.threatType = threatType;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (sector) filter['location.sector'] = sector;

    const threats = await Threat.find(filter)
      .populate('reportedBy', 'name rank role')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Threat.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: threats.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: threats
    });
  } catch (error) {
    console.error('Get threats error:', error);
    res.status(500).json({ success: false, error: 'Server error fetching threats.' });
  }
};

// @desc    Get single threat by ID
// @route   GET /api/threats/:id
// @access  Private
const getThreatById = async (req, res) => {
  try {
    const threat = await Threat.findById(req.params.id)
      .populate('reportedBy', 'name rank role sector')
      .populate('assignedTo', 'name rank role');

    if (!threat) {
      return res.status(404).json({ success: false, error: 'Threat report not found.' });
    }

    res.status(200).json({ success: true, data: threat });
  } catch (error) {
    console.error('Get threat error:', error);
    res.status(500).json({ success: false, error: 'Server error fetching threat.' });
  }
};

// @desc    Create new threat report
// @route   POST /api/threats
// @access  Private
const createThreat = async (req, res) => {
  try {
    const { title, description, threatType, location, tags } = req.body;

    const threat = await Threat.create({
      title,
      description,
      threatType,
      location,
      tags: tags || [],
      reportedBy: req.user._id,
      status: 'Analyzing'
    });

    // Process threat through AI asynchronously to not block the initial response
    // Or we can await it if we want immediate result. Since it's critical intel, we await.
    const aiAnalysis = await aiService.analyzeThreat(threat);
    
    // Update threat with AI findings
    threat.threatScore = aiAnalysis.threatScore;
    threat.priority = aiAnalysis.priority;
    threat.aiAnalysis = {
      summary: aiAnalysis.summary,
      recommendations: aiAnalysis.recommendations,
      confidence: aiAnalysis.confidence,
      analyzedAt: aiAnalysis.analyzedAt
    };
    threat.status = 'Analyzed';
    await threat.save();

    const populatedThreat = await Threat.findById(threat._id)
      .populate('reportedBy', 'name rank role');

    res.status(201).json({
      success: true,
      message: 'Threat report submitted successfully.',
      data: populatedThreat
    });
  } catch (error) {
    console.error('Create threat error:', error);
    res.status(500).json({ success: false, error: 'Server error creating threat report.' });
  }
};

// @desc    Update threat report
// @route   PUT /api/threats/:id
// @access  Private
const updateThreat = async (req, res) => {
  try {
    let threat = await Threat.findById(req.params.id);

    if (!threat) {
      return res.status(404).json({ success: false, error: 'Threat report not found.' });
    }

    threat = await Threat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('reportedBy', 'name rank role');

    res.status(200).json({
      success: true,
      message: 'Threat report updated.',
      data: threat
    });
  } catch (error) {
    console.error('Update threat error:', error);
    res.status(500).json({ success: false, error: 'Server error updating threat.' });
  }
};

// @desc    Delete threat report
// @route   DELETE /api/threats/:id
// @access  Private (Commander only)
const deleteThreat = async (req, res) => {
  try {
    const threat = await Threat.findById(req.params.id);

    if (!threat) {
      return res.status(404).json({ success: false, error: 'Threat report not found.' });
    }

    await Threat.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Threat report deleted.'
    });
  } catch (error) {
    console.error('Delete threat error:', error);
    res.status(500).json({ success: false, error: 'Server error deleting threat.' });
  }
};

module.exports = { getThreats, getThreatById, createThreat, updateThreat, deleteThreat };
