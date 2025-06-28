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
    const hardcodedNews = [
      {
        title: "NASA Astronauts to Answer Questions from Alabama Students",
        description: "NASA astronaut Nichole Ayers conducts research operations inside the Destiny laboratory module’s Microgravity Science Glovebox aboard the International Space Station.",
        url: "https://www.nasa.gov/news-release/nasa-astronauts-to-answer-questions-from-alabama-students/",
        image_url: "https://www.nasa.gov/wp-content/uploads/2025/06/nasa-astronaut-nicole-ayers-on-iss-june-25-advisory.jpg"
      },
      {
        title: "NASA to Welcome Fourth Private Astronaut Mission to Space Station",
        description: "The SpaceX Dragon spacecraft carrying the Axiom Mission 4 crew launches atop the Falcon 9 rocket from NASA’s Kennedy Space Center to the International Space Station.",
        url: "https://www.nasa.gov/news-release/nasa-to-welcome-fourth-private-astronaut-mission-to-space-station/",
        image_url: "https://www.nasa.gov/wp-content/uploads/2025/06/blog-ax4-launch-062525.jpg"
      },
      {
        title: "NASA Sets Coverage for Axiom Mission 4 Launch, Arrival at Station",
        description: "The SpaceX Dragon spacecraft carrying the Axiom Mission 3 crew is pictured approaching the International Space Station on Jan. 20, 2024.",
        url: "https://www.nasa.gov/news-release/nasa-sets-coverage-for-axiom-mission-4-launch-arrival-at-station-2/",
        image_url: "https://www.nasa.gov/wp-content/uploads/2025/06/53479985837-e929862b5b-k.jpg"
      },
      {
        title: "NASA Astronauts to Answer Questions from Students in New York, Utah",
        description: "NASA astronauts (left to right) Anne McClain and Nichole Ayers pose for a portrait together aboard the International Space Station. Moments earlier, Ayers finished trimming McClain’s hair using an electric razor with a suction hose attached that collects the loose hair to protect the station’s atmosphere.",
        url: "https://www.nasa.gov/news-release/nasa-astronauts-to-answer-questions-from-students-in-new-york-utah/",
        image_url: "https://www.nasa.gov/wp-content/uploads/2025/06/mcclain-and-ayers-on-iss-june-downlinks.jpg"
      },
      {
        title: "NASA Welcomes Community, Astronauts to Marshall’s 65th Anniversary Celebration July 19",
        description: "The official portrait of the International Space Station’s Expedition 72 crew. At the top (from left) are Roscosmos cosmonaut and Flight Engineer Alexey Ovchinin, NASA astronaut and space station Commander Suni Williams, and NASA astronaut and Flight Engineer Butch Wilmore. In the middle row are Roscosmos cosmonaut and Flight Engineer Ivan Vagner and NASA astronaut and Flight Engineer Don Pettit",
        url: "https://www.nasa.gov/news-release/nasa-welcomes-community-astronauts-to-marshalls-65th-anniversary-celebration-july-19/",
        image_url: "https://www.nasa.gov/wp-content/uploads/2025/06/iss072-s-002large.jpg"
      },
      {
        title: "NASA, German Aerospace Center to Expand Artemis Campaign Cooperation",
        description: "Acting NASA Administrator Janet Petro and Anke Kaysser-Pyzalla, chair, Executive Board, DLR (German Aerospace Center, or Deutsches Zentrum für Luft- und Raumfahrt), signed an agreement June 16, 2025, to continue a partnership on space medicine research. With this agreement, DLR will provide new radiation sensors aboard the Orion spacecraft during NASA’s Artemis II mission. Scheduled for launch no later than April 2026, Artemis II will mark the first test flight with crew under Artemis.",
        url: "https://www.nasa.gov/news-release/nasa-german-aerospace-center-to-expand-artemis-campaign-cooperation/",
        image_url: "https://www.nasa.gov/wp-content/uploads/2025/06/dlr-signing-for-release.jpg"
      }
    ];

    res.json(hardcodedNews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
