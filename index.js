require('dotenv').config({
    path: './config/.env'
});

const express = require('express');
const cors = require('cors');

const app = express();

const paymentRoutes = require('./routes/payment.route');

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded()); // Parse formadata

// Test API Route
app.get('/', (req, res) => {
  res.send({ message: 'Hello, Express Server is running!' });
});

// Main Routes
app.get('/api/payment', paymentRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));