import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import DatePicker from 'react-datepicker';

function AsteroidChart() {
    ChartJS.register(
        BarElement,
        CategoryScale,
        LinearScale,
        Tooltip,
        Legend
    );
    const [apod, setApod] = useState(null);
     const [asteroids, setAsteroids] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dateStr = selectedDate.toISOString().split('T')[0];
    const asteroidNames = asteroids.map(a => a.name);
    const asteroidDistances = asteroids.map(a =>
        parseFloat(a.close_approach_data[0].miss_distance.kilometers)
    );

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
    // Asteroids
    fetch(`https://nasa-explorer-794i.onrender.com/api/asteroids?date=${dateStr}`)
      .then(res => res.json())
      .then(data => setAsteroids(Array.isArray(data) ? data : []))
      .catch(() => setAsteroids([]));

  }, [selectedDate]);
  return (
    <div className="container">
        <div className="mb-4">
          <h4>Pick a Date:</h4>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            maxDate={new Date()}
            className="form-control d-inline-block w-auto me-2"
          />
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              const randomDate = new Date(
                1995 + Math.floor(Math.random() * 29),
                Math.floor(Math.random() * 12),
                Math.floor(Math.random() * 28) + 1
              );
              setSelectedDate(randomDate);
            }}
          >
            🎲 Surprise Me!
          </button>
        </div>

        {/* Asteroids Section */}
        <div className="mb-5">
          <h2>🪨 Near-Earth Asteroids on {dateStr}</h2>
          {asteroids.length > 0 ? (
            <>
              <ul className="list-group mb-3">
                {asteroids.map((a, i) => (
                  <li key={i} className="list-group-item">
                    <strong>{a.name}</strong> – {a.close_approach_data[0].miss_distance.kilometers.slice(0, 6)} km away – Speed: {a.close_approach_data[0].relative_velocity.kilometers_per_hour.slice(0, 5)} km/h
                  </li>
                ))}
              </ul>
              <Bar key={dateStr} data={chartData} options={chartOptions} />
            </>
          ) : (
            <p>No asteroid data available for this date.</p>
          )}
        </div>
    </div>
  );
}

export default AsteroidChart;
