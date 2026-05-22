require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/user', userRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'CareerForge API is running...' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
