import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
  const [newsapiArticles, setNewsapiArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const NEWSAPI_KEY = '14e6d31b9f0d4213a233485dd6dc8d5a'; // Replace with your NewsAPI key

  const fetchNewsAPI = async () => {
    try {
      let response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${NEWSAPI_KEY}`
      );
      if (response.data.articles.length === 0) {
        console.warn("⚠️ No results from country=in. Retrying with language=en...");
        response = await axios.get(
          `https://newsapi.org/v2/top-headlines?language=en&pageSize=10&apiKey=${NEWSAPI_KEY}`
        );
      }
      setNewsapiArticles(response.data.articles || []);
    } catch (error) {
      console.error('❌ Error fetching NewsAPI:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsAPI();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🗞️ Latest Headlines from NewsAPI</h1>

      {loading ? (
        <p className="text-gray-600">Loading news...</p>
      ) : newsapiArticles.length === 0 ? (
        <p className="text-red-500">⚠️ No news available. Check your API key or try again later.</p>
      ) : (
        <div className="space-y-6">
          {newsapiArticles.map((article, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-blue-700">{article.title}</h2>
              <p className="text-gray-700 mt-2">{article.description || 'No description available.'}</p>
              <div className="text-sm text-gray-500 mt-2">
                {article.source?.name && <span>📡 {article.source.name}</span>} {' • '}
                {article.author && <span>✍️ {article.author}</span>} {' • '}
                🕒 {new Date(article.publishedAt).toLocaleString()}
              </div>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-blue-600 hover:underline font-medium"
              >
                🔗 Read full article
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
