app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email); // Debug log

  const admin = await User.findOne({ email, role: "ADMIN" });
  if (!admin) {
    console.log("Admin not found in DB"); // Debug log
    return res.status(401).json({ error: "Invalid credentials!" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    console.log("Password mismatch"); // Debug log
    return res.status(401).json({ error: "Wrong password!" });
  }

  const token = jwt.sign({ userId: admin._id, role: "ADMIN" }, 'your_secret_key');
  res.json({ success: true, token });
});