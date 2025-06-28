const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
require('dotenv').config();
app.use(express.json());


const PORT = 5000;
const apiKey = 'eoty6upk8Ys7Jc3SfD9tswg8bD9dqy4r0lPmLhQF';

app.get('/api/apod', async (req, res) => {
  try {
    apiKey;
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'NASA API failed' });
  }
});

app.get('/api/asteroids', async (req, res) => {
  try {
    apiKey;
    const today = new Date().toISOString().split('T')[0];

    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${apiKey}`;
    const response = await axios.get(url);

    // Return asteroids for today's date
    const asteroids = response.data.near_earth_objects[today];
    res.json(asteroids);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch asteroid data' });
  }
});

app.get('/api/earth', async (req, res) => {
  try {
    apiKey;
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const dateParts = today.split('-');
    const formattedDate = `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;

    // Get EPIC metadata
    const metaUrl = `https://api.nasa.gov/EPIC/api/natural/date/${today}?api_key=${apiKey}`;
    const response = await axios.get(metaUrl);

    if (response.data.length === 0) {
      return res.status(404).json({ error: 'No EPIC images for today' });
    }

    // Construct the image URL
    const imageName = response.data[0].image;
    const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${formattedDate}/jpg/${imageName}.jpg`;

    res.json({ imageUrl });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch EPIC image' });
  }
});

app.get('/api/asteroids', async (req, res) => {
  try {
    const date = req.query.date || new Date().toISOString().split('T')[0];
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${apiKey}`;
    const response = await axios.get(url, { timeout: 7000 });

    const asteroids = response.data.near_earth_objects[date];

    if (!Array.isArray(asteroids)) {
      return res.status(404).json([]);
    }

    res.json(asteroids);
  } catch (err) {
    console.error('Asteroid API error:', err.message);
    res.status(500).json([]);
  }
});


app.post('/api/chat', async (req, res) => {
  const { question } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-small-3.2-24b-instruct',
        messages: [
          { role: 'system', content: 'You are a helpful space expert chatbot.' },
          { role: 'user', content: question },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const answer = response.data.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    console.error('OpenRouter error:', err.response?.data || err.message);
    res.status(500).json({ error: 'ChatBot failed to respond.' });
  }
});

app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'space',
        language: 'en',
        pageSize: 6,
        sortBy: 'publishedAt',
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    res.json(response.data.articles);
  } catch (err) {
    console.error('News API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
