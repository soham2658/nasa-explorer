import React, { useEffect, useState } from 'react';

const NEWS_API_KEY = 'ce473b987519404b9a7e5afe0f0a610c';
const ARTICLES_PER_PAGE = 6;

function SpaceNews() {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(
          `fetch('https://nasa-explorer-794i.onrender.com/api/news')
`
        );
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
    }

    fetchNews();
  }, []);

  return (
    <div className="container mt-4">
      <h2>📰 Latest Space News</h2>
      <div className="row">
        {articles.slice(0, visibleCount).map((item, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={item.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}
                className="card-img-top"
                alt={item.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <a
                  href={item.url}
                  className="btn btn-primary mt-auto"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show more button */}
      {visibleCount < articles.length && (
        <div className="text-center mb-4">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setVisibleCount(visibleCount + ARTICLES_PER_PAGE)}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}

export default SpaceNews;
