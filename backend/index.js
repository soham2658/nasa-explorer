const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = 5000;

app.get('/api/apod', async (req, res) => {
  try {
    const apiKey = 'DEMO_KEY'; // Get your own at https://api.nasa.gov
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'NASA API failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
