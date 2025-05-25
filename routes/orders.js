require('dotenv').config();

const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ... (keep all other routes the same)

router.get('/user', auth(['user']), async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('userId', 'username email phone');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Get User Orders Error:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/', auth(['admin']), async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'username email phone');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Get All Orders Error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;