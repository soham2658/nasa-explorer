import React from 'react';
import CarouselHome from '../components/CarouselHome'
import SpaceNews from '../components/NewsSection'

function Home() {
  return (
    <div className="container">
      <h2>Welcome to Space Today</h2>
      <CarouselHome />
      <SpaceNews />
    </div>
  );
}

export default Home;
