const express = require('express');
const router = express.Router();
const SocialMonetizationService = require('../services/social-monetization');

const monetizationService = new SocialMonetizationService();

// Get all social accounts for user
router.get('/accounts/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch all connected social accounts
    const accounts = {
      youtube: { connected: true, followers: 125000, revenue: 5230 },
      instagram: { connected: true, followers: 89000, revenue: 3120 },
      tiktok: { connected: true, followers: 450000, revenue: 8900 },
      facebook: { connected: false, followers: 0, revenue: 0 },
      twitch: { connected: true, followers: 32000, revenue: 2100 }
    };
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get platform-specific dashboard
router.get('/platform/:platformId/:userId', async (req, res) => {
  try {
    const { platformId, userId } = req.params;
    const dashboard = {
      platform: platformId,
      stats: {
        views: Math.floor(Math.random() * 1000000),
        engagement: Math.random() * 100,
        followers: Math.floor(Math.random() * 500000),
        revenue: Math.random() * 15000
      },
      recentPosts: [
        { id: 1, title: 'Post 1', views: 50000, likes: 2500, shares: 150 },
        { id: 2, title: 'Post 2', views: 75000, likes: 4200, shares: 320 }
      ]
    };
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get revenue analytics
router.get('/revenue/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const revenue = await monetizationService.calculateTotalRevenue(userId);
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
