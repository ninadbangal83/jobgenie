const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;

exports.registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw { status: 400, message: 'User already exists' };

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed });
  return { message: 'User registered successfully' };
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1d' });
  return {
    token,
    user: { id: user._id, name: user.name, isAdmin: user.isAdmin },
  };
};
