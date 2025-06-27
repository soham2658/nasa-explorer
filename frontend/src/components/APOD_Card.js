import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ApodCard() {
    const [apod, setApod] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dateStr = selectedDate.toISOString().split('T')[0];
    useEffect(() => {
    // APOD
    fetch(`http://localhost:5000/api/apod?date=${dateStr}`)
      .then(res => res.json())
      .then(setApod)
      .catch(console.error);

    // // Asteroids
    // fetch(`http://localhost:5000/api/asteroids?date=${dateStr}`)
    //   .then(res => res.json())
    //   .then(data => setAsteroids(Array.isArray(data) ? data : []))
    //   .catch(() => setAsteroids([]));

    // // EPIC Earth Image (only today)
    // fetch('http://localhost:5000/api/earth')
    //   .then(res => res.json())
    //   .then(data => setEarthImage(data.imageUrl))
    //   .catch(() => setEarthImage(null));
  }, []);
  return (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">📸 Astronomy Picture of the Day</h2>
            {apod ? (
              <>
                <h5>{apod.title}</h5>
                <img src={apod.url} alt={apod.title} className="img-fluid rounded mb-3" />
                <p>{apod.explanation}</p>
              </>
            ) : (
              <p>Loading APOD...</p>
            )}
          </div>
        </div>
  );
}

export default ApodCard;
