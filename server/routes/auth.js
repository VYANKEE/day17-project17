const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/auth');

// 1. REGISTER
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// 2. LOGIN
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email is wrong');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  const token = jwt.sign(
    { _id: user._id, role: user.role, plan: user.plan }, 
    process.env.JWT_SECRET
  );
  
  res.header('auth-token', token).send({ 
    token, 
    user: { 
      name: user.name, 
      email: user.email, 
      plan: user.plan, 
      role: user.role 
    } 
  });
});

// 3. PREMIUM CONTENT ACCESS
router.get('/premium-content', verifyToken, (req, res) => {
  if (req.user.plan !== 'premium') {
    return res.status(403).json({ message: "Access Denied" });
  }
  res.json({ message: "WELCOME TO THE VIP SECTION. HERE IS YOUR SECRET DATA." });
});

// 4. UPGRADE USER TO PREMIUM
router.post('/upgrade', verifyToken, async (req, res) => {
  try {
    // Plan ko 'premium' set kar do
    const user = await User.findByIdAndUpdate(req.user._id, { plan: 'premium' }, { new: true });
    
    // Naya token banao updated plan ke saath
    const token = jwt.sign(
      { _id: user._id, role: user.role, plan: user.plan }, 
      process.env.JWT_SECRET
    );

    res.json({ success: true, token, user });
  } catch (err) {
    res.status(400).send("Upgrade Failed");
  }
});

module.exports = router;