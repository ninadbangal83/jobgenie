require('dotenv').config(); // Load env variables at the top
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const uploadRoute = require('./routes/upload');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Routes
app.get('/', (req, res) => {
  res.send('JobGenie backend is running 🚀');
});
app.use('/api/upload', uploadRoute);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`🔧 Server running on http://localhost:${PORT}`);
});
