const mongoose = require('mongoose');

const threatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Threat title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Threat description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  threatType: {
    type: String,
    required: [true, 'Threat type is required'],
    enum: ['Drone', 'Vehicle', 'Intrusion', 'Cyber', 'Communication', 'Other']
  },
  location: {
    sector: {
      type: String,
      required: [true, 'Sector is required']
    },
    coordinates: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null }
    },
    description: {
      type: String,
      default: ''
    }
  },
  // AI-generated fields
  threatScore: {
    type: Number,
    min: 0,
    max: 100,
    default: null
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'Critical', null],
    default: null
  },
  aiAnalysis: {
    summary: { type: String, default: null },
    recommendations: [{ type: String }],
    confidence: { type: Number, min: 0, max: 100, default: null },
    analyzedAt: { type: Date, default: null }
  },
  // Status tracking
  status: {
    type: String,
    enum: ['Pending', 'Analyzing', 'Analyzed', 'Resolved', 'Escalated'],
    default: 'Pending'
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  resolvedAt: {
    type: Date,
    default: null
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for efficient queries
threatSchema.index({ threatType: 1, status: 1 });
threatSchema.index({ 'location.sector': 1 });
threatSchema.index({ createdAt: -1 });
threatSchema.index({ priority: 1 });

module.exports = mongoose.model('Threat', threatSchema);
