// server/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

const app = express();
app.use(cors());  // Enable CORS for all routes

// API route to fetch news
app.get('/api/news', async (req, res) => {
  try {
    const query = req.query.q || 'latest';  // Default query if none provided
    const page = req.query.page || 1;       // Default page 1 if none provided
    const apiKey = process.env.GNEWS_API_KEY;  // Get API key from .env file

    // Check if API key is present
    if (!apiKey) {
      console.error('API key is missing');
      return res.status(500).json({ message: 'GNews API key is not set in the environment variables.' });
    }

    // Construct GNews API URL
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&page=${page}&token=${apiKey}`;

    console.log(`Fetching news from URL: ${url}`);  // Log the request URL for debugging

    // Make a request to the GNews API
    const response = await axios.get(url);

    // Send the API response data back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Start the backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
