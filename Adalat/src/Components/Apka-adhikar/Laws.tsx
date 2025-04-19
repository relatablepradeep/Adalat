import { useState, useEffect, useRef } from 'react';
import constitutionData from './Articles/Articles.json'; // Keep using your existing import path

const Laws = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const [cardHeights, setCardHeights] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;
  const cardRefs = useRef({});

  // Calculate total pages
  const totalArticles = constitutionData.constitution_of_india.length;
  const totalPages = Math.ceil(totalArticles / cardsPerPage);
  
  // Get current page articles
  const indexOfLastArticle = currentPage * cardsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - cardsPerPage;
  const currentArticles = constitutionData.constitution_of_india.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const toggleFlip = (articleId) => {
    setFlippedCards(prev => {
      const newState = {
        ...prev,
        [articleId]: !prev[articleId]
      };
      
      // Update all card heights after state update
      setTimeout(() => updateAllCardHeights(newState), 50);
      return newState;
    });
  };

  const updateAllCardHeights = (flipState) => {
    const newHeights = {};
    
    Object.keys(cardRefs.current).forEach(articleId => {
      const card = cardRefs.current[articleId];
      if (card) {
        const frontHeight = card.querySelector('.card-front')?.offsetHeight || 0;
        const backHeight = card.querySelector('.card-back')?.offsetHeight || 0;
        
        // Set height to whichever side is currently showing (or larger if flipped)
        newHeights[articleId] = flipState[articleId] ? 
          Math.max(frontHeight, backHeight) : frontHeight;
      }
    });
    
    setCardHeights(newHeights);
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    setFlippedCards({});
    setCardHeights({});
    window.scrollTo(0, 0);
  };

  // Initialize card references and heights
  useEffect(() => {
    // Reset on page change and give time for rendering
    setTimeout(() => updateAllCardHeights(flippedCards), 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800">
        Constitution of India
      </h1>
      
      <div className="max-w-4xl mx-auto">
        {currentArticles.map((article, index) => (
          <div 
            key={index}
            className="mb-8 w-full"
            style={{ 
              minHeight: cardHeights[article.article_number] ? 
                `${cardHeights[article.article_number]}px` : 'auto',
              transition: 'min-height 0.5s ease-out'
            }}
          >
            <div 
              ref={el => cardRefs.current[article.article_number] = el}
              className={`card-container ${flippedCards[article.article_number] ? 'flipped' : ''}`}
              onClick={() => toggleFlip(article.article_number)}
            >
              {/* Front of card */}
              <div className="card-front">
                <div className="header bg-gradient-to-r from-indigo-600 to-purple-600">
                  <h3>Article {article.article_number}</h3>
                  <span className="action-hint">Click to view details</span>
                </div>
                <div className="content">
                  <h4>{article.article_name}</h4>
                  <p>{article.original_text.substring(0, 200)}...</p>
                </div>
              </div>
              
              {/* Back of card */}
              <div className="card-back">
                <div className="header bg-gradient-to-r from-purple-600 to-indigo-600">
                  <h3>Article {article.article_number}</h3>
                  <span className="action-hint">Click to flip back</span>
                </div>
                <div className="content">
                  <h4>{article.article_name}</h4>
                  
                  <div className="animate-fade-slide">
                    <h5>Original Text:</h5>
                    <div className="text-block original">
                      <p>{article.original_text}</p>
                    </div>
                    
                    {article.amendments.length > 0 && (
                      <div className="amendments-section">
                        <h5>Amendments:</h5>
                        {article.amendments.map((amendment, idx) => (
                          <div 
                            key={idx} 
                            className="amendment-block"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                          >
                            <div className="amendment-header">
                              <p className="amendment-title">
                                Amendment {amendment.amendment_number}
                              </p>
                              <span className="amendment-date">{amendment.date}</span>
                            </div>
                            <p className="amendment-desc">{amendment.description}</p>
                            {amendment.updated_text && (
                              <div className="updated-text">
                                <p className="label">Updated Text:</p>
                                <p>{amendment.updated_text}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Pagination */}
        <div className="pagination flex justify-center items-center gap-4 mt-8">
          <button 
            onClick={() => changePage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-indigo-500 text-white disabled:bg-gray-300 hover:bg-indigo-600 transition-colors duration-300"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => changePage(number)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                  currentPage === number
                    ? 'bg-purple-600 text-white transform scale-110 shadow-md'
                    : 'bg-gray-200 hover:bg-purple-200 text-gray-700'
                }`}
              >
                {number}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-indigo-500 text-white disabled:bg-gray-300 hover:bg-indigo-600 transition-colors duration-300"
          >
            Next
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .card-container {
          position: relative;
          perspective: 1500px;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-container.flipped {
          transform: rotateY(180deg);
        }
        
        .card-front, .card-back {
          backface-visibility: hidden;
          border-radius: 0.75rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          background: white;
          width: 100%;
        }
        
        .card-back {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          transform: rotateY(180deg);
        }
        
        .header {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
        }
        
        .header h3 {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
        }
        
        .action-hint {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 0.5rem;
          color: white;
          font-size: 0.875rem;
          animation: pulseFade 2s infinite;
        }
        
        .content {
          padding: 1.5rem;
        }
        
        .content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #4338ca;
          margin-bottom: 1rem;
        }
        
        .content h5 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #6d28d9;
          margin-bottom: 0.75rem;
        }
        
        .text-block {
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .original {
          background: #ede9fe;
          border-left: 4px solid #8b5cf6;
        }
        
        .amendments-section {
          margin-top: 1.5rem;
        }
        
        .amendment-block {
          background: #eef2ff;
          border-left: 4px solid #6366f1;
          border-radius: 0.5rem;
          padding: 1rem;
          margin-bottom: 1rem;
          animation: slideUp 0.5s ease-out forwards;
        }
        
        .amendment-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        
        .amendment-title {
          font-weight: 500;
          color: #4f46e5;
          font-size: 1.125rem;
        }
        
        .amendment-date {
          background: #c7d2fe;
          color: #4338ca;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        
        .amendment-desc {
          color: #4b5563;
          margin-bottom: 0.75rem;
        }
        
        .updated-text {
          margin-top: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid #c7d2fe;
        }
        
        .updated-text .label {
          color: #4f46e5;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        
        @keyframes pulseFade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeSlide {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-slide {
          animation: fadeSlide 0.5s ease-out;
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(15px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Laws;