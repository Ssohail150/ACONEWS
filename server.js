const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();  // To load environment variables from a .env file

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS to allow cross-origin requests
app.use(cors());

// API route to get news from the GNews API
app.get('/api/news', async (req, res) => {
  const query = req.query.q || 'technology';  // Default to 'technology' if no query is provided
  const page = req.query.page || 1;           // Default to page 1 if no page is provided
  const API_KEY = process.env.GNEWS_API_KEY;  // Get API key from environment variables

  if (!API_KEY) {
    return res.status(500).json({ message: 'API key is missing from server environment.' });
  }

  try {
    const response = await axios.get(
      `https://gnews.io/api/v4/search?q=${query}&lang=en&token=${API_KEY}&page=${page}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ message: 'Error fetching news' });
  }
});

// Serve static files from the React frontend (client/build) in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
