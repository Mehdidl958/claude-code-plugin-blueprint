// Family Members Dashboard Backend
const express = require('express');
const router = express.Router();

class FamilyDashboard {
  async getFamilyMembers(ownerId) {
    return [
      {
        id: 'ali-mohammadi',
        name: 'علی محمدی',
        role: 'مدیر محتوا',
        revenue: 3450,
        platforms: ['youtube', 'instagram', 'tiktok'],
        joinDate: '2024-01-15',
        status: 'active'
      },
      {
        id: 'fateme-rezaei',
        name: 'فاطمه رضایی',
        role: 'تولیدکننده',
        revenue: 2180,
        platforms: ['instagram', 'tiktok', 'facebook'],
        joinDate: '2024-02-20',
        status: 'active'
      },
      {
        id: 'hasan-karimi',
        name: 'حسن کریمی',
        role: 'تدوین ویدیو',
        revenue: 1920,
        platforms: ['youtube', 'tiktok'],
        joinDate: '2024-03-10',
        status: 'active'
      },
      {
        id: 'zahra-ahmadi',
        name: 'زهره احمدی',
        role: 'متخصص SEO',
        revenue: 1650,
        platforms: ['youtube', 'instagram'],
        joinDate: '2024-03-25',
        status: 'active'
      }
    ];
  }

  async getMemberDashboard(memberId) {
    return {
      memberId,
      stats: {
        monthlyRevenue: 3450,
        totalFollowers: 450000,
        engagementRate: 14.5,
        growth: 18
      },
      platformStats: {
        youtube: { revenue: 1800, followers: 250000 },
        instagram: { revenue: 1200, followers: 150000 },
        tiktok: { revenue: 450, followers: 50000 }
      }
    };
  }

  async processMemberWithdrawal(memberId, amount) {
    return {
      status: 'processing',
      memberId,
      amount,
      transactionId: `FAM_TXN_${Date.now()}`,
      estimatedTime: '2-3 روز کاری'
    };
  }
}

router.get('/members/:ownerId', async (req, res) => {
  const dashboard = new FamilyDashboard();
  const members = await dashboard.getFamilyMembers(req.params.ownerId);
  res.json(members);
});

router.get('/dashboard/:memberId', async (req, res) => {
  const dashboard = new FamilyDashboard();
  const memberDash = await dashboard.getMemberDashboard(req.params.memberId);
  res.json(memberDash);
});

router.post('/withdraw/:memberId', async (req, res) => {
  const dashboard = new FamilyDashboard();
  const result = await dashboard.processMemberWithdrawal(req.params.memberId, req.body.amount);
  res.json(result);
});

module.module.exports = router;
