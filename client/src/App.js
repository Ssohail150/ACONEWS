// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch news data
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news?q=technology&page=1');
        setNews(response.data.articles);
      } catch (error) {
        setError('Failed to fetch news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="App">
      <h1>ACONEWS</h1>

      {loading ? (
        <p>Loading news...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="news-container">
          {news.map((article, index) => (
            <div key={index} className="news-item">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
