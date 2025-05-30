// seedAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust path as per your project

// (1) Database Connection
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/umt_lost_found', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  }
}

// (2) Create Admin Function
async function createAdmin() {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@umt.edu.pk" });
    if (adminExists) {
      console.log("⚠️ Admin already exists in DB!");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 12); // Salt rounds: 12

    // Create admin
    await User.create({
      email: "admin@umt.edu.pk",  // Admin email (no username)
      password: hashedPassword,
      role: "ADMIN",
      name: "Super Admin",        // Optional fields
      phone: "03001234567",       // Optional
    });

    console.log("🎉 Admin created successfully!");
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
  } finally {
    mongoose.disconnect();
  }
}

// (3) Run Script
connectDB().then(() => createAdmin());