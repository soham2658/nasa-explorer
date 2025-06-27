import React, { useEffect, useState } from 'react';

function CarouselHome() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch('https://images-api.nasa.gov/search?q=space&media_type=image');
        const data = await res.json();
        const items = data.collection.items;

        const randomImages = items
          .filter(item => item.links && item.links[0].href)
          .slice(0, 5)
          .map(item => ({
            src: item.links[0].href,
            title: item.data[0].title,
          }));

        setImages(randomImages);
      } catch (err) {
        console.error('Error loading images:', err);
      }
    }

    fetchImages();
  }, []);

  return (
    <>
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {images.map((img, i) => (
            <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i}>
              <img
                src={img.src}
                className="d-block w-100"
                alt={img.title}
                style={{ height: '500px', objectFit: 'cover', objectPosition: 'center' }}
                onClick={() => setSelectedImage(img)}
              />
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

      {/* Full Image Modal */}
      {selectedImage && (
        <div className="modal d-block" tabIndex="-1" onClick={() => setSelectedImage(null)}>
          <div className="modal-dialog modal-xl modal-dialog-centered" onClick={e => e.stopPropagation()}>
            <div className="modal-content bg-black text-white">
              <div className="modal-header border-0">
                <h5 className="modal-title">{selectedImage.title}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedImage(null)}></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="img-fluid rounded"
                  style={{ maxHeight: '80vh' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CarouselHome;
