import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/apod')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <h1>NASA Picture of the Day</h1>
      {data ? (
        <div>
          <h2>{data.title}</h2>
          <img src={data.url} alt={data.title} width="500"/>
          <p>{data.explanation}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
