const express = require('express');
const router = express.Router();
const axios = require('axios');

class PaymentGateway {
  constructor() {
    this.gateways = {
      stripe: { fee: 0.029, maxAmount: 50000 },
      paypal: { fee: 0.022, maxAmount: 100000 },
      wise: { fee: 0.012, maxAmount: 250000 },
      crypto: { fee: 0.015, maxAmount: 999999 },
      bank: { fee: 0, maxAmount: 500000 },
      iranian: { fee: 0.025, maxAmount: 500000 }
    };
  }

  async processWithdrawal(userId, amount, gateway, targetAccount) {
    const fee = amount * this.gateways[gateway].fee;
    const netAmount = amount - fee;

    return {
      status: 'processing',
      amount,
      fee,
      netAmount,
      gateway,
      transactionId: `PAY_${Date.now()}`,
      estimatedTime: gateway === 'crypto' ? '15 دقيقه' : '2-5 روز کاری'
    };
  }
}

const paymentGateway = new PaymentGateway();

router.post('/withdraw', async (req, res) => {
  try {
    const result = await paymentGateway.processWithdrawal(
      req.body.userId,
      req.body.amount,
      req.body.gateway,
      req.body.targetAccount
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
