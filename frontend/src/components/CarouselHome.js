import React, { useEffect, useState } from 'react';

function CarouselHome() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('https://images-api.nasa.gov/search?q=space&media_type=image');
        const data = await response.json();
        const items = data.collection.items;

        // Shuffle and pick first 5 images with valid links
        const shuffled = items.sort(() => 0.5 - Math.random());
        const selected = shuffled
          .filter(item => item.links && item.links[0].href)
          .slice(0, 5)
          .map(item => ({
            src: item.links[0].href,
            title: item.data[0].title,
          }));

        setImages(selected);
      } catch (err) {
        console.error('Error fetching space images:', err);
      }
    }

    fetchImages();
  }, []);

  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {images.map((img, i) => (
          <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i}>
            <img src={img.src} className="d-block w-100" alt={img.title} />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-2 rounded">
              <h5>{img.title}</h5>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default CarouselHome;
