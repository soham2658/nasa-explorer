import React, { useEffect, useState } from 'react';
import './App.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function App() {
  const [apod, setApod] = useState(null);
  const [asteroids, setAsteroids] = useState([]);
  const [earthImage, setEarthImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dateStr = selectedDate.toISOString().split('T')[0];

  // Chart data
  const asteroidNames = Array.isArray(asteroids)
    ? asteroids.map((a) => a.name)
    : [];

  const asteroidDistances = Array.isArray(asteroids)
    ? asteroids.map((a) =>
        parseFloat(a.close_approach_data[0].miss_distance.kilometers)
      )
    : [];

  const chartData = {
    labels: asteroidNames,
    datasets: [
      {
        label: 'Distance from Earth (km)',
        data: asteroidDistances,
        backgroundColor: '#66fcf1',
      },
    ],
  };

  const chartOptions = {
    plugins: { legend: { display: true } },
    responsive: true,
    scales: { y: { beginAtZero: true } },
  };

  useEffect(() => {
    // Fetch APOD
    fetch(`http://localhost:5000/api/apod?date=${dateStr}`)
      .then((res) => res.json())
      .then(setApod)
      .catch(console.error);

    // Fetch asteroid data for the same date
    fetch(`http://localhost:5000/api/asteroids?date=${dateStr}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAsteroids(data);
        } else {
          setAsteroids([]);
        }
      })
      .catch(() => setAsteroids([]));

    // Fetch Earth image (EPIC only works for today)
    fetch('http://localhost:5000/api/earth')
      .then((res) => res.json())
      .then((data) => setEarthImage(data.imageUrl))
      .catch(() => setEarthImage(null));
  }, [selectedDate]);

  return (
    <div className="App">
      <h1>🚀 NASA Space Today</h1>

      {/* APOD Section */}
      <h2>📸 Astronomy Picture of the Day</h2>
      {apod ? (
        <div>
          <h3>{apod.title}</h3>
          <img src={apod.url} alt={apod.title} width="500" />
          <p>{apod.explanation}</p>
        </div>
      ) : (
        <p>Loading APOD...</p>
      )}

      {/* Date Picker */}
      <h3>Pick a Date:</h3>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        maxDate={new Date()}
      />
      <button
        onClick={() => {
          const randomDate = new Date(
            1995 + Math.floor(Math.random() * 29), // NASA APOD starts in 1995
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28) + 1
          );
          setSelectedDate(randomDate);
        }}
      >
        🎲 Surprise Me!
      </button>

      {/* Asteroid Data */}
      <h2>🪨 Near-Earth Asteroids on {dateStr}</h2>
      {asteroids.length > 0 ? (
        <>
          <ul>
            {asteroids.map((a, index) => (
              <li key={index}>
                <strong>{a.name}</strong> –{' '}
                {a.close_approach_data[0].miss_distance.kilometers.slice(0, 6)}{' '}
                km away – Speed:{' '}
                {a.close_approach_data[0].relative_velocity.kilometers_per_hour.slice(0, 5)}{' '}
                km/h
              </li>
            ))}
          </ul>
          <h3>📊 Asteroid Distance Chart</h3>
          <Bar data={chartData} options={chartOptions} />
        </>
      ) : (
        <p>No asteroid data available for this date.</p>
      )}

      {/* Earth Image */}
      <h2>🌍 Earth from Space (EPIC)</h2>
      {earthImage ? (
        <img
          src={earthImage}
          alt="Earth from EPIC"
          style={{ width: '500px', borderRadius: '10px' }}
        />
      ) : (
        <p>No Earth image available today.</p>
      )}
    </div>
  );
}

export default App;
