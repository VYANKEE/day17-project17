const jwt = require('jsonwebtoken');

// Guard 1: Are you logged in?
const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the user info to the request
    next(); // Pass to the next step
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

// Guard 2: Are you an Admin? (RBAC - Role Based Access Control)
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = { verifyToken, verifyAdmin };