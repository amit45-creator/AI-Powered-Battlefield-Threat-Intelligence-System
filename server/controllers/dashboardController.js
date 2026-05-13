const Threat = require('../models/Threat');
const aiService = require('../services/aiService');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const totalThreats = await Threat.countDocuments();
    const criticalThreats = await Threat.countDocuments({ priority: 'Critical' });
    const pendingThreats = await Threat.countDocuments({ status: 'Pending' });
    const resolvedThreats = await Threat.countDocuments({ status: 'Resolved' });

    // Threats in last 24 hours
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentThreats = await Threat.countDocuments({ createdAt: { $gte: last24h } });

    // Average threat score
    const avgScoreResult = await Threat.aggregate([
      { $match: { threatScore: { $ne: null } } },
      { $group: { _id: null, avgScore: { $avg: '$threatScore' } } }
    ]);
    const avgThreatScore = avgScoreResult.length > 0 
      ? Math.round(avgScoreResult[0].avgScore) 
      : 0;

    res.status(200).json({
      success: true,
      data: {
        totalThreats,
        criticalThreats,
        pendingThreats,
        resolvedThreats,
        recentThreats,
        avgThreatScore
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ success: false, error: 'Server error fetching dashboard stats.' });
  }
};

// @desc    Get sector-wise threat distribution
// @route   GET /api/dashboard/sector-wise
// @access  Private
const getSectorWiseData = async (req, res) => {
  try {
    const sectorData = await Threat.aggregate([
      {
        $group: {
          _id: '$location.sector',
          count: { $sum: 1 },
          criticalCount: {
            $sum: { $cond: [{ $eq: ['$priority', 'Critical'] }, 1, 0] }
          },
          avgScore: { $avg: '$threatScore' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: sectorData
    });
  } catch (error) {
    console.error('Sector data error:', error);
    res.status(500).json({ success: false, error: 'Server error fetching sector data.' });
  }
};

// @desc    Get threat type distribution
// @route   GET /api/dashboard/threat-types
// @access  Private
const getThreatTypeDistribution = async (req, res) => {
  try {
    const typeData = await Threat.aggregate([
      {
        $group: {
          _id: '$threatType',
          count: { $sum: 1 },
          avgScore: { $avg: '$threatScore' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: typeData
    });
  } catch (error) {
    console.error('Threat type data error:', error);
    res.status(500).json({ success: false, error: 'Server error fetching threat type data.' });
  }
};

// @desc    Get threat trends (last 7 days)
// @route   GET /api/dashboard/trends
// @access  Private
const getThreatTrends = async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const trends = await Threat.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 },
          criticalCount: {
            $sum: { $cond: [{ $eq: ['$priority', 'Critical'] }, 1, 0] }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: trends
    });
  } catch (error) {
    console.error('Trends error:', error);
    res.status(500).json({ success: false, error: 'Server error fetching trends.' });
  }
};

// @desc    Get AI Intelligence Summary
// @route   GET /api/dashboard/summary
// @access  Private
const getAISummary = async (req, res) => {
  try {
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentThreats = await Threat.find({ createdAt: { $gte: last24h } })
      .select('title threatType priority location.sector createdAt')
      .sort({ createdAt: -1 })
      .limit(20); // Cap to 20 to avoid token limits

    const summaryData = await aiService.generateDailySummary(recentThreats);

    res.status(200).json({
      success: true,
      data: summaryData
    });
  } catch (error) {
    console.error('AI Summary error:', error);
    res.status(500).json({ success: false, error: 'Server error generating AI summary.' });
  }
};

module.exports = { getDashboardStats, getSectorWiseData, getThreatTypeDistribution, getThreatTrends, getAISummary };
