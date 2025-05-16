import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, MessageSquare, Send, Award, Clock, Image, Video, Bookmark, Share2, TrendingUp, Flag, Flame } from 'lucide-react';

const Ques = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [answerInputs, setAnswerInputs] = useState({});
  const [sortBy, setSortBy] = useState('new');
  const [showAddAnimation, setShowAddAnimation] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Theme colors - judiciary-focused with purple/gold
  const themeColors = {
    primary: '#5e35b1', // Deep purple for judiciary theme
    secondary: '#dbb456', // Gold accent for legal symbolism
    accent: '#9162e4', // Lighter purple
    success: '#2e7d32',
    light: '#f9f9fc',
    text: '#2d2d42',
    textSecondary: '#5f5f7b',
    background: '#f5f5fa',
    cardBg: '#ffffff',
    border: '#e8e8f0',
  };

  // Format time with hours and days
  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 30) return 'just now';
    if (diffMins < 1) return `${diffSecs}s`;
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    
    // For older posts show the date
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: now.getFullYear() !== date.getFullYear() ? 'numeric' : undefined
    });
  };

  const generateUsername = () => {
    const prefixes = ['Legal', 'Justice', 'Law', 'Rights', 'Court', 'Judge'];
    const suffixes = ['Seeker', 'Advocate', 'Voice', 'Mind', 'Champion', 'Guru'];
    const numbers = Math.floor(Math.random() * 999) + 1;
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    return `${prefix}${suffix}${numbers}`;
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (isImage || isVideo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaPreview({
          type: isImage ? 'image' : 'video',
          url: e.target.result,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addQuestion = () => {
    if (!newQuestionTitle.trim()) return;

    const newQ = {
      id: Date.now(),
      title: newQuestionTitle,
      text: newQuestion.trim(),
      answers: [],
      upvotes: 0,
      createdAt: new Date(),
      author: generateUsername(),
      avatarColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
      media: mediaPreview,
      saved: false,
      tags: ['Legal Question', 'Advice']
    };

    setQuestions([newQ, ...questions]);
    setNewQuestionTitle('');
    setNewQuestion('');
    setMediaPreview(null);
    setShowAddAnimation(newQ.id);
    setExpandedQuestion(newQ.id);
  };

  const addAnswer = (questionId) => {
    const answerText = answerInputs[questionId];
    if (!answerText || !answerText.trim()) return;

    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { 
        ...q, 
        answers: [...q.answers, {
          id: Date.now(),
          text: answerText,
          upvotes: 0,
          createdAt: new Date(),
          author: generateUsername(),
          avatarColor: `hsl(${Math.random() * 360}, 70%, 50%)`
        }] 
      } : q
    );

    setQuestions(updatedQuestions);
    setAnswerInputs({ ...answerInputs, [questionId]: '' });
  };

  const handleUpvote = (questionId) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, upvotes: q.upvotes + 1 } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleAnswerUpvote = (questionId, answerId) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? {
        ...q,
        answers: q.answers.map(a => 
          a.id === answerId ? { ...a, upvotes: a.upvotes + 1 } : a
        )
      } : q
    );
    setQuestions(updatedQuestions);
  };

  const toggleSaveQuestion = (questionId) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, saved: !q.saved } : q
    );
    setQuestions(updatedQuestions);
  };

  // Clear animation after it plays
  useEffect(() => {
    if (showAddAnimation) {
      const timer = setTimeout(() => {
        setShowAddAnimation(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showAddAnimation]);

  const sortedQuestions = [...questions].sort((a, b) => {
    if (sortBy === 'new') {
      return b.createdAt - a.createdAt;
    } else if (sortBy === 'top') {
      return b.upvotes - a.upvotes;
    } else if (sortBy === 'trending') {
      // Trending algorithm: upvotes ÷ age in hours (with minimum)
      const aAge = Math.max(1, (new Date() - a.createdAt) / 3600000);
      const bAge = Math.max(1, (new Date() - b.createdAt) / 3600000);
      return (b.upvotes / bAge) - (a.upvotes / aAge);
    }
    return 0;
  });

  const toggleExpandQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <div 
      className="min-h-screen font-sans"
      style={{ backgroundColor: themeColors.background, color: themeColors.text }}
    >
      {/* Main content centered on small screens, full width on large screens */}
      <div className="w-full mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div 
          className="p-6 rounded-xl shadow-lg mb-6 relative overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.accent} 100%)`,
            color: '#ffffff'
          }}
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <div className="max-w-screen-xl mx-auto">
              <h1 className="text-3xl font-extrabold flex items-center">
                <Flag className="mr-2 h-8 w-8" />
                LawForum
              </h1>
              <p className="mt-2 opacity-90 text-lg">
                Demystifying the judiciary system one question at a time
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* Sidebar for larger screens */}
          <div className="lg:w-1/4 order-2 lg:order-1">
            <div 
              className="sticky top-4 p-5 rounded-xl mb-6"
              style={{ 
                backgroundColor: themeColors.cardBg,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: `1px solid ${themeColors.border}`
              }}
            >
              <h3 className="font-bold mb-4 text-lg" style={{ color: themeColors.primary }}>About LawForum</h3>
              <p className="text-sm mb-4" style={{ color: themeColors.textSecondary }}>
                A community-driven platform to ask legal questions and get helpful answers from the community.
              </p>
              
              <h4 className="font-semibold mb-2 text-sm" style={{ color: themeColors.primary }}>Popular Topics</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${themeColors.primary}15`, color: themeColors.primary }}>
                  Property Law
                </span>
                <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${themeColors.primary}15`, color: themeColors.primary }}>
                  Family Law
                </span>
                <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${themeColors.primary}15`, color: themeColors.primary }}>
                  Consumer Rights
                </span>
                <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${themeColors.primary}15`, color: themeColors.primary }}>
                  Labor Law
                </span>
              </div>
              
              <div className="text-sm" style={{ color: themeColors.textSecondary }}>
                <p className="mb-2">⚖️ Remember: Advice here doesn't replace professional legal counsel.</p>
              </div>
            </div>
          </div>
          
          {/* Main column */}
          <div className="lg:w-3/4 order-1 lg:order-2">
            {/* Post Question Form */}
            <div 
              className="p-6 rounded-xl mb-6 transform transition-all hover:shadow-xl"
              style={{ 
                backgroundColor: themeColors.cardBg,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
              }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: themeColors.primary }}>
                <span className="p-2 rounded-full mr-2" style={{ backgroundColor: `${themeColors.primary}20` }}>
                  <MessageSquare className="w-5 h-5" style={{ color: themeColors.primary }} />
                </span>
                Ask Your Legal Question
              </h2>
              <input
                type="text"
                placeholder="What's your legal question?"
                className="w-full p-3 rounded-lg mb-3 transition-all text-lg font-medium"
                style={{ 
                  backgroundColor: '#f7f7fc',
                  color: themeColors.text,
                  border: `1px solid ${themeColors.border}`
                }}
                value={newQuestionTitle}
                onChange={(e) => setNewQuestionTitle(e.target.value)}
              />
              <textarea
                placeholder="Provide more details about your legal situation..."
                className="w-full p-3 rounded-lg mb-3 min-h-24 transition-all"
                style={{ 
                  backgroundColor: '#f7f7fc',
                  color: themeColors.text,
                  border: `1px solid ${themeColors.border}`
                }}
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              
              {/* Media preview */}
              {mediaPreview && (
                <div className="mb-3 p-2 rounded-lg relative" style={{ backgroundColor: '#f7f7fc' }}>
                  <button 
                    className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70 transition-all"
                    onClick={() => setMediaPreview(null)}
                  >
                    ✕
                  </button>
                  {mediaPreview.type === 'image' ? (
                    <img 
                      src={mediaPreview.url} 
                      alt="Preview" 
                      className="max-h-64 rounded"
                      style={{ maxWidth: '100%' }}
                    />
                  ) : (
                    <video 
                      src={mediaPreview.url} 
                      controls 
                      className="max-h-64 rounded"
                      style={{ maxWidth: '100%' }}
                    />
                  )}
                  <p className="text-sm mt-1 truncate" style={{ color: themeColors.textSecondary }}>
                    {mediaPreview.name}
                  </p>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*,video/*"
                    style={{ display: 'none' }}
                  />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="mr-2 px-3 py-2 rounded-lg transition-all flex items-center"
                    style={{ 
                      backgroundColor: `${themeColors.secondary}15`,
                      color: themeColors.secondary
                    }}
                  >
                    <Image className="w-4 h-4 mr-1" />
                    Add Media
                  </button>
                </div>
                <button
                  onClick={addQuestion}
                  className="px-6 py-2 rounded-lg transition-all transform hover:-translate-y-1 font-medium shadow-lg flex items-center"
                  style={{ 
                    backgroundColor: themeColors.primary, 
                    color: '#ffffff'
                  }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </button>
              </div>
            </div>

            {/* Sort Options */}
            <div 
              className="flex mb-4 p-3 rounded-xl overflow-x-auto hide-scrollbar"
              style={{ 
                backgroundColor: themeColors.cardBg,
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                borderBottom: `2px solid ${themeColors.border}`
              }}
            >
              <button 
                className={`px-4 py-2 rounded-full transition-all mr-2 flex items-center whitespace-nowrap`}
                style={{ 
                  backgroundColor: sortBy === 'new' ? themeColors.primary : 'transparent',
                  color: sortBy === 'new' ? '#ffffff' : themeColors.textSecondary
                }}
                onClick={() => setSortBy('new')}
              >
                <Clock className="w-4 h-4 mr-1" />
                Latest
              </button>
              <button 
                className={`px-4 py-2 rounded-full transition-all mr-2 flex items-center whitespace-nowrap`}
                style={{ 
                  backgroundColor: sortBy === 'top' ? themeColors.primary : 'transparent',
                  color: sortBy === 'top' ? '#ffffff' : themeColors.textSecondary
                }}
                onClick={() => setSortBy('top')}
              >
                <Award className="w-4 h-4 mr-1" />
                Top
              </button>
              <button 
                className={`px-4 py-2 rounded-full transition-all mr-2 flex items-center whitespace-nowrap`}
                style={{ 
                  backgroundColor: sortBy === 'trending' ? themeColors.primary : 'transparent',
                  color: sortBy === 'trending' ? '#ffffff' : themeColors.textSecondary
                }}
                onClick={() => setSortBy('trending')}
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Trending
              </button>
            </div>

            {/* List of Questions */}
            {sortedQuestions.length === 0 ? (
              <div 
                className="p-10 rounded-xl text-center"
                style={{ 
                  backgroundColor: themeColors.cardBg,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}
              >
                <div className="mb-4" style={{ color: themeColors.textSecondary }}>
                  <MessageSquare className="w-16 h-16 mx-auto" />
                </div>
                <p className="text-lg" style={{ color: themeColors.textSecondary }}>No questions yet. Be the first to ask!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {sortedQuestions.map((question) => (
                  <div
                    key={question.id}
                    className={`rounded-xl overflow-hidden transform transition-all duration-300 ${
                      showAddAnimation === question.id ? 'animate-pulse scale-102' : ''
                    }`}
                    style={{ 
                      backgroundColor: themeColors.cardBg,
                      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                      border: `1px solid ${themeColors.border}`
                    }}
                  >
                    {/* Vote sidebar and content */}
                    <div className="flex">
                      {/* Vote sidebar */}
                      <div 
                        className="p-3 flex flex-col items-center"
                        style={{ backgroundColor: '#f9f9fc' }}
                      >
                        <button
                          onClick={() => handleUpvote(question.id)}
                          className="p-1 rounded-full transition-all transform hover:scale-110"
                          style={{ backgroundColor: question.upvotes > 0 ? `${themeColors.secondary}20` : 'transparent' }}
                          aria-label="Upvote"
                        >
                          <ArrowUp 
                            className="w-6 h-6" 
                            style={{ color: question.upvotes > 0 ? themeColors.secondary : themeColors.textSecondary }} 
                          />
                        </button>
                        <span 
                          className="font-medium my-1"
                          style={{ color: question.upvotes > 0 ? themeColors.secondary : themeColors.textSecondary }}
                        >
                          {question.upvotes}
                        </span>
                      </div>

                      {/* Question content */}
                      <div className="p-4 flex-1">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-2">
                          {question.tags?.map((tag, index) => (
                            <span 
                              key={index}
                              className="text-xs px-2 py-1 rounded-full"
                              style={{ 
                                backgroundColor: `${themeColors.primary}15`, 
                                color: themeColors.primary 
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Author info */}
                        <div className="flex items-center mb-2">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-2"
                            style={{ backgroundColor: question.avatarColor }}
                          >
                            {question.author.charAt(0)}
                          </div>
                          <div className="text-sm" style={{ color: themeColors.textSecondary }}>
                            <span className="font-medium">{question.author}</span>
                            <span className="mx-1">•</span>
                            <span>{formatRelativeTime(question.createdAt)}</span>
                          </div>
                        </div>
                        
                        <h3 
                          className="text-xl font-bold cursor-pointer hover:underline transition-colors"
                          style={{ color: themeColors.text }}
                          onClick={() => toggleExpandQuestion(question.id)}
                        >
                          {question.title}
                        </h3>
                        
                        <div className={`overflow-hidden transition-all duration-500 ${
                          expandedQuestion === question.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          {question.text && (
                            <p className="mt-2" style={{ color: themeColors.textSecondary }}>{question.text}</p>
                          )}
                          
                          {/* Media content */}
                          {question.media && (
                            <div className="mt-3 rounded-lg overflow-hidden">
                              {question.media.type === 'image' ? (
                                <img 
                                  src={question.media.url} 
                                  alt="Question media" 
                                  className="max-h-96 rounded"
                                  style={{ maxWidth: '100%' }}
                                />
                              ) : (
                                <video 
                                  src={question.media.url} 
                                  controls 
                                  className="max-h-96 rounded"
                                  style={{ maxWidth: '100%' }}
                                />
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm mt-3">
                          <div 
                            className="flex items-center cursor-pointer transition-colors"
                            style={{ color: themeColors.textSecondary }}
                            onClick={() => toggleExpandQuestion(question.id)}
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            <span>
                              {question.answers.length} {question.answers.length === 1 ? 'reply' : 'replies'}
                            </span>
                          </div>
                          <div 
                            className="flex items-center cursor-pointer transition-colors"
                            style={{ color: themeColors.textSecondary }}
                            onClick={() => toggleSaveQuestion(question.id)}
                          >
                            <Bookmark 
                              className="w-4 h-4 mr-1" 
                              fill={question.saved ? themeColors.secondary : 'none'} 
                              style={{ color: question.saved ? themeColors.secondary : themeColors.textSecondary }}
                            />
                            <span>Save</span>
                          </div>
                          <div 
                            className="flex items-center cursor-pointer transition-colors"
                            style={{ color: themeColors.textSecondary }}
                          >
                            <Share2 className="w-4 h-4 mr-1" />
                            <span>Share</span>
                          </div>
                        </div>

                        {/* Answer Form - Only shown when expanded */}
                        {expandedQuestion === question.id && (
                          <div 
                            className="mt-4 pt-4"
                            style={{ borderTop: `1px solid ${themeColors.border}` }}
                          >
                            <div className="flex">
                              <input
                                type="text"
                                placeholder="Write your legal advice..."
                                className="flex-1 p-2 rounded-l-lg transition-all"
                                style={{ 
                                  backgroundColor: '#f7f7fc',
                                  color: themeColors.text,
                                  border: `1px solid ${themeColors.border}`
                                }}
                                value={answerInputs[question.id] || ''}
                                onChange={(e) =>
                                  setAnswerInputs({
                                    ...answerInputs,
                                    [question.id]: e.target.value,
                                  })
                                }
                              />
                              <button
                                onClick={() => addAnswer(question.id)}
                                className="px-3 rounded-r-lg flex items-center transition-all"
                                style={{ backgroundColor: themeColors.primary, color: '#ffffff' }}
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Answers - Only shown when expanded */}
                        {expandedQuestion === question.id && question.answers.length > 0 && (
                          <div 
                            className="mt-4 pl-6 relative"
                            style={{ borderLeft: `2px solid ${themeColors.border}` }}
                          >
                            {/* Vertical line */}
                            <div 
                              className="absolute left-0 top-0 bottom-0 w-0.5"
                              style={{ backgroundColor: themeColors.primary }}
                            ></div>
                            
                            {question.answers.map((answer, index) => (
                              <div 
                                key={answer.id} 
                                className={`relative mt-3 pb-3 animate-fadeIn ${
                                  index < question.answers.length - 1 ? '' : ''
                                }`}
                                style={{ 
                                  borderBottom: index < question.answers.length - 1 ? 
                                    `1px solid ${themeColors.border}` : 'none',
                                  animation: `fadeIn 0.3s ease-in-out ${index * 0.1}s forwards`,
                                  opacity: 0
                                }}
                              >
                                {/* Horizontal connecting line to vertical line */}
                                <div 
                                  className="absolute left-0 top-4 w-3 h-0.5"
                                  style={{ 
                                    backgroundColor: themeColors.primary,
                                    transform: 'translateX(-12px)'
                                  }}
                                ></div>
                                
                                {/* Answer content */}
                                <div className="flex">
                                  <div className="mr-3 flex flex-col items-center">
                                    <button
                                      onClick={() => handleAnswerUpvote(question.id, answer.id)}
                                      className="p-1 rounded-full transition-all transform hover:scale-110"
                                      style={{ 
                                        backgroundColor: answer.upvotes > 0 ? 
                                          `${themeColors.secondary}20` : 'transparent'
                                      }}
                                    >
                                      <ArrowUp 
                                        className="w-4 h-4"
                                        style={{ 
                                          color: answer.upvotes > 0 ? 
                                            themeColors.secondary : themeColors.textSecondary
                                        }}
                                      />
                                    </button>
                                    <span 
                                      className="text-xs font-medium"
                                      style={{ 
                                        color: answer.upvotes > 0 ? 
                                          themeColors.secondary : themeColors.textSecondary
                                      }}
                                    >
                                      {answer.upvotes}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center mb-1">
                                      <div 
                                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2"
                                        style={{ backgroundColor: answer.avatarColor }}
                                      >
                                        {answer.author.charAt(0)}
                                      </div>
                                      <div className="text-xs" style={{ color: themeColors.textSecondary }}>
                                        <span className="font-medium">{answer.author}</span>
                                        <span className="mx-1">•</span>
                                        <span>{formatRelativeTime(answer.createdAt)}</span>
                                      </div>
                                    </div>
                                    <p style={{ color: themeColors.text }}>{answer.text}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .scale-102 {
            transform: scale(1.02);
          }
          
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          /* Responsive handling */
          @media (min-width: 1280px) {
            .max-w-screen-xl {
              max-width: 100%;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Ques;