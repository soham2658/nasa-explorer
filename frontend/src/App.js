import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import APOD from './pages/APOD';
import Asteroid from './pages/Asteroid';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apod" element={<APOD />}/>
        <Route path="/asteroids" element={<Asteroid />} />
      </Routes>
    </Router>
  );
}

export default App;
