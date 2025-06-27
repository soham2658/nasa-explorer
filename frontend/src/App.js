import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import APOD from './pages/APOD';
import Asteroid from './pages/Asteroid';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apod" element={<APOD />}/>
        <Route path="/asteroids" element={<Asteroid />} />
      </Routes>
      <ChatBot />
      <Footer />
    </Router>
  );
}

export default App;
