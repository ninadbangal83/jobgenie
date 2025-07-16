const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const response = await authService.registerUser(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const response = await authService.loginUser(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
