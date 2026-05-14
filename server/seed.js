const mongoose = require('mongoose');
const User = require('./models/User');
const Threat = require('./models/Threat');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb://localhost:27017/battlefield-intel';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Threat.deleteMany({});

    // Create Officer
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('command123', salt);
    
    const officer = await User.create({
      name: 'John Miller',
      email: 'commander@defense.mil',
      password: hashedPassword,
      role: 'commander',
      rank: 'Captain',
      sector: 'Alpha'
    });

    console.log('Created Officer:', officer.email);

    // Create some threats
    const threats = [
      {
        title: 'Unidentified Drone Sighting',
        description: 'Small commercial quadcopter spotted near sector perimeter.',
        threatType: 'Drone',
        location: { sector: 'Alpha', coordinates: { lat: 33.45, lng: 74.32 } },
        threatScore: 85,
        priority: 'Critical',
        aiAnalysis: {
          summary: 'High probability of reconnaissance drone mapping sector vulnerabilities.',
          recommendations: ['Deploy counter-drone measures', 'Increase visual patrols'],
          confidence: 92,
          analyzedAt: new Date()
        },
        status: 'Analyzed',
        reportedBy: officer._id,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        title: 'Suspicious Vehicle Activity',
        description: 'Unmarked truck idling near checkpoint Charlie.',
        threatType: 'Vehicle',
        location: { sector: 'Charlie', coordinates: { lat: 33.32, lng: 74.20 } },
        threatScore: 45,
        priority: 'Medium',
        aiAnalysis: {
          summary: 'Vehicle presence deviates from standard logistics patterns.',
          recommendations: ['Dispatch intercept unit', 'Log license plate'],
          confidence: 88,
          analyzedAt: new Date()
        },
        status: 'Analyzed',
        reportedBy: officer._id,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
      },
      {
        title: 'Radio Interference',
        description: 'Jamming signal detected on primary comms frequency.',
        threatType: 'Communication',
        location: { sector: 'Bravo', coordinates: { lat: 33.55, lng: 74.12 } },
        threatScore: 25,
        priority: 'Low',
        aiAnalysis: {
          summary: 'Likely environmental interference or localized equipment failure.',
          recommendations: ['Switch to secondary frequency', 'Run diagnostic on transceiver'],
          confidence: 75,
          analyzedAt: new Date()
        },
        status: 'Analyzed',
        reportedBy: officer._id,
        createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000)
      }
    ];

    await Threat.insertMany(threats);
    console.log('Created threats data.');

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
