const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { nanoid } = require('nanoid');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  referralCode: { type: String, unique: true },
  referredBy: { type: String, default: null },
  tokenExpiration: { type: Number, default: 0 },
});
const User = mongoose.model('User', userSchema);

// Referral Schema
const referralSchema = new mongoose.Schema({
  referrerId: { type: String, required: true },
  referredId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Referral = mongoose.model('Referral', referralSchema);

// Generate Referral Code
app.post('/api/referral/generate', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    let user = await User.findOne({ userId });
    if (!user) {
      const referralCode = nanoid(8);
      user = new User({ userId, referralCode, tokenExpiration: Date.now() + 24 * 60 * 60 * 1000 });
      await user.save();
      return res.status(200).json({ referralCode });
    }
    res.status(200).json({ referralCode: user.referralCode });
  } catch (error) {
    console.error('Error generating referral code:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Handle Referral
app.post('/api/referral/apply', async (req, res) => {
  try {
    const { userId, referralCode } = req.body;
    if (!userId || !referralCode) return res.status(400).json({ error: 'User ID and referral code are required' });

    const referrer = await User.findOne({ referralCode });
    if (!referrer) return res.status(400).json({ error: 'Invalid referral code' });
    if (referrer.userId === userId) return res.status(400).json({ error: 'Cannot refer yourself' });

    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({ userId, referredBy: referralCode, tokenExpiration: Date.now() + 24 * 60 * 60 * 1000 });
      await user.save();
    } else if (user.referredBy) {
      return res.status(400).json({ error: 'User already referred' });
    } else {
      user.referredBy = referralCode;
      await user.save();
    }

    // Record referral and extend referrer's token validity by 2 days
    const referral = new Referral({ referrerId: referrer.userId, referredId: userId });
    await referral.save();

    referrer.tokenExpiration += 2 * 24 * 60 * 60 * 1000; // Add 2 days
    await referrer.save();

    res.status(200).json({ message: 'Referral applied', tokenExpiration: referrer.tokenExpiration });
  } catch (error) {
    console.error('Error applying referral:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get User Referral Info
app.get('/api/referral/info/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const referrals = await Referral.find({ referrerId: user.userId });
    res.status(200).json({
      referralCode: user.referralCode,
      tokenExpiration: user.tokenExpiration,
      referralCount: referrals.length,
    });
  } catch (error) {
    console.error('Error fetching referral info:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
