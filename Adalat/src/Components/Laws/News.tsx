import React, { useEffect, useState } from 'react';

const News = () => {
  const [newsapiArticles, setNewsapiArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const NEWSAPI_KEY = '14e6d31b9f0d4213a233485dd6dc8d5a';

  const fetchNewsAPI = async () => {
    try {
      let response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&pageSize=12&apiKey=${NEWSAPI_KEY}`
      );
      let data = await response.json();
      if (data.articles.length === 0) {
        response = await fetch(
          `https://newsapi.org/v2/top-headlines?language=en&pageSize=12&apiKey=${NEWSAPI_KEY}`
        );
        data = await response.json();
      }
      setNewsapiArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching NewsAPI:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsAPI();
  }, []);

  const categories = [
    { id: 'all', label: 'All', emoji: '🌐' },
    { id: 'tech', label: 'Tech', emoji: '💻' },
    { id: 'sports', label: 'Sports', emoji: '⚽' },
    { id: 'entertainment', label: 'Fun', emoji: '🎬' }
  ];

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now - published) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin animate-reverse mx-auto mt-2 ml-2"></div>
          </div>
          <p className="text-white text-xl font-semibold animate-pulse">Loading the tea ☕</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 animate-pulse"></div>
        <div className="relative px-6 py-8 text-center">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2 animate-fade-in">
            NewsVibe
          </h1>
          <p className="text-xl text-purple-200 font-medium">Your daily dose of what's happening ✨</p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-6 mb-8">
        <div className="flex gap-3 justify-center flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              <span className="mr-2">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="px-6 pb-12">
        {newsapiArticles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <p className="text-purple-200 text-xl">No news found! Try refreshing</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {newsapiArticles.map((article, idx) => (
              <div
                key={idx}
                className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Source Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full text-xs font-semibold text-purple-200 border border-purple-400/30">
                      {article.source?.name || 'Unknown'}
                    </span>
                    <span className="text-xs text-purple-300 font-medium">
                      {getTimeAgo(article.publishedAt)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-white mb-3 line-clamp-3 group-hover:text-purple-200 transition-colors">
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="text-purple-200 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.description || 'No description available.'}
                  </p>

                  {/* Author */}
                  {article.author && (
                    <p className="text-xs text-purple-300 mb-4 flex items-center">
                      <span className="mr-1">✍️</span>
                      {article.author}
                    </p>
                  )}

                  {/* Read More Button */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
                  >
                    <span>Read More</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-white/10">
        <p className="text-purple-300 text-sm">
          Stay updated, stay cool 😎 | Made with 💜 for Gen Z
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-reverse {
          animation-direction: reverse;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default News;