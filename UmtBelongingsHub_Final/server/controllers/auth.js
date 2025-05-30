const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/user'); // Assuming Admin is a User model with role

// Admin Login Controller
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists and is admin
    const admin = await Admin.findOne({ email, role: 'admin' });
    if (!admin) {
      return res.status(401).json({ error: "Not an admin. Please sign in as a student." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};