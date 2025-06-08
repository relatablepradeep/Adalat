import React, { useState, useEffect } from "react";

const keyValues = {
  en: "English",
  as: "Assamese",
  bn: "Bengali",
  brx: "Bodo",
  doi: "Dogri",
  gom: "Goan Konkani",
  gu: "Gujarati",
  hi: "Hindi",
  kn: "Kannada",
  ks: "Kashmiri",
  mai: "Maithili",
  ml: "Malayalam",
  mni: "Manipuri",
  mr: "Marathi",
  ne: "Nepali",
  or: "Oriya",
  pa: "Punjabi",
  sa: "Sanskrit",
  sat: "Santali",
  sd: "Sindhi",
  ta: "Tamil",
  te: "Telugu",
  ur: "Urdu",
};

export default function LegalBlog() {
  const [languages, setLanguages] = useState([]);
  const [sourceLang, setSourceLang] = useState("en");
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch languages from ULCA API
    fetch(
      "https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline",
      {
        method: "POST",
        headers: {
          userID: "9f55ae82e8204e4c86625573098e7707",
          ulcaApiKey: "52d075f861-561b-42fe-8b00-8a034acb4deb",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pipelineTasks: [{ taskType: "translation" }],
          pipelineRequestConfig: { pipelineId: "64392f96daac500b55c543cd" },
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLanguages(data.languages);
      });
  }, []);

  // Helper: get target languages for a source language
  const getTargetLanguages = (srcLang) => {
    const found = languages.find((l) => l.sourceLanguage === srcLang);
    return found ? found.targetLanguageList : [];
  };

  // Add new post
  const addPost = () => {
    if (!postText.trim()) return;
    const newPost = {
      id: Date.now().toString(),
      text: postText.trim(),
      lang: sourceLang,
      comments: [],
      likes: 0,
      timestamp: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
    setPostText("");
  };

  // Add comment to post
  const addComment = (postId, commentText) => {
    if (!commentText.trim()) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const newComments = [
            ...post.comments,
            {
              id: Date.now().toString(),
              text: commentText.trim(),
              timestamp: new Date().toISOString(),
            },
          ];

          // Check for @adalat bot trigger
          if (commentText.includes("@adalat")) {
            newComments.push({
              id: (Date.now() + 1).toString(),
              text: "I'm here to help you with your legal query! 🏛️ Feel free to ask me anything about law.",
              botReply: true,
              timestamp: new Date().toISOString(),
            });
          }

          return { ...post, comments: newComments };
        }
        return post;
      })
    );
  };

  // Translate text using API
  const translate = async (text, source_language, target_language) => {
    setLoading(true);
    try {
      const res = await fetch("scaler/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          source_language,
          content: text,
          target_language,
        }),
      });
      const data = await res.json();
      setLoading(false);
      return data.translated_content;
    } catch (err) {
      setLoading(false);
      return "Translation error";
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffInMinutes = Math.floor((now - posted) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
        <div className="relative px-6 py-12 text-center">
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 animate-fade-in">
            LegalVibes
          </h1>
          <p className="text-xl text-purple-200 font-medium mb-2">Your space for legal discussions ⚖️</p>
          <p className="text-sm text-purple-300">Share thoughts, get insights, stay informed ✨</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-12">
        {/* Create Post Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-8 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="mr-3">✍️</span>
            What's on your legal mind?
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-purple-200 font-semibold mb-3 flex items-center">
                <span className="mr-2">🌐</span>
                Choose Your Language:
              </label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white backdrop-blur-sm focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
              >
                {languages.map((lang) => (
                  <option key={lang.sourceLanguage} value={lang.sourceLanguage} className="bg-gray-800">
                    {keyValues[lang.sourceLanguage] || lang.sourceLanguage}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-purple-200 font-semibold mb-3 flex items-center">
                <span className="mr-2">📝</span>
                Share your thoughts:
              </label>
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Share a legal insight, ask a question, or start a discussion..."
                className="w-full h-32 p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-purple-300 backdrop-blur-sm focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all resize-none"
              />
            </div>

            <button
              onClick={addPost}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <span className="mr-2">🚀</span>
              Post It
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin animate-reverse mt-2 ml-2"></div>
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <Post
              key={post.id}
              post={post}
              sourceLang={sourceLang}
              targetLanguages={getTargetLanguages(post.lang)}
              onAddComment={addComment}
              translate={translate}
              getTimeAgo={getTimeAgo}
              index={index}
            />
          ))}
          
          {posts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-purple-200 text-xl">No posts yet! Be the first to share something legal</p>
            </div>
          )}
        </div>
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
      `}</style>
    </div>
  );
}

function Post({ post, sourceLang, targetLanguages, onAddComment, translate, getTimeAgo, index }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showTranslate, setShowTranslate] = useState(false);
  const [selectedLang, setSelectedLang] = useState(targetLanguages[0] || "");
  const [translatedText, setTranslatedText] = useState(null);
  const [loadingTranslate, setLoadingTranslate] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (targetLanguages.length > 0) {
      setSelectedLang(targetLanguages[0]);
    }
  }, [targetLanguages]);

  const handleTranslate = async () => {
    if (!selectedLang) return;
    setLoadingTranslate(true);
    const translated = await translate(post.text, post.lang, selectedLang);
    setTranslatedText(translated);
    setLoadingTranslate(false);
  };

  const handleReply = () => {
    onAddComment(post.id, replyText);
    setReplyText("");
    setShowReply(false);
  };

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  return (
    <div
      className="group bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-102 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">👤</span>
          </div>
          <div>
            <p className="text-white font-semibold">Legal Explorer</p>
            <p className="text-purple-300 text-sm flex items-center">
              <span className="mr-1">🌐</span>
              {keyValues[post.lang] || post.lang} • {getTimeAgo(post.timestamp)}
            </p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-6">
        <p className="text-white text-lg leading-relaxed">{post.text}</p>
      </div>

      {/* Translation Section */}
      {translatedText && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-400/30">
          <p className="text-blue-200 font-semibold mb-2 flex items-center">
            <span className="mr-2">🔄</span>
            Translated to {keyValues[selectedLang] || selectedLang}:
          </p>
          <p className="text-white">{translatedText}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
            liked 
              ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white' 
              : 'bg-white/10 text-purple-200 hover:bg-white/20'
          }`}
        >
          <span>{liked ? '❤️' : '🤍'}</span>
          <span className="font-semibold">{likes}</span>
        </button>

        <button
          onClick={() => setShowReply(!showReply)}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-purple-200 rounded-full hover:bg-white/20 transition-all duration-300"
        >
          <span>💬</span>
          <span className="font-semibold">Comment</span>
        </button>

        <button
          onClick={() => setShowTranslate(!showTranslate)}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-purple-200 rounded-full hover:bg-white/20 transition-all duration-300"
        >
          <span>🔄</span>
          <span className="font-semibold">Translate</span>
        </button>
      </div>

      {/* Reply Section */}
      {showReply && (
        <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Type your comment or '@adalat' for legal help..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:border-purple-400 focus:outline-none"
            />
            <button
              onClick={handleReply}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Post
            </button>
          </div>
        </div>
      )}

      {/* Translate Section */}
      {showTranslate && (
        <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center space-x-3">
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:outline-none"
            >
              {targetLanguages.map((lang) => (
                <option key={lang} value={lang} className="bg-gray-800">
                  {keyValues[lang] || lang}
                </option>
              ))}
            </select>
            <button
              onClick={handleTranslate}
              disabled={loadingTranslate}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {loadingTranslate ? 'Translating...' : 'Translate'}
            </button>
          </div>
        </div>
      )}

      {/* Comments */}
      {post.comments.length > 0 && (
        <div className="space-y-3">
          {post.comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              sourceLang={post.lang}
              targetLanguages={targetLanguages}
              translate={translate}
              getTimeAgo={getTimeAgo}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Comment({ comment, sourceLang, targetLanguages, translate, getTimeAgo }) {
  const [showTranslate, setShowTranslate] = useState(false);
  const [selectedLang, setSelectedLang] = useState(targetLanguages[0] || "");
  const [translatedText, setTranslatedText] = useState(null);
  const [loadingTranslate, setLoadingTranslate] = useState(false);

  useEffect(() => {
    if (targetLanguages.length > 0) {
      setSelectedLang(targetLanguages[0]);
    }
  }, [targetLanguages]);

  const handleTranslate = async () => {
    if (!selectedLang) return;
    setLoadingTranslate(true);
    const translated = await translate(comment.text, sourceLang, selectedLang);
    setTranslatedText(translated);
    setLoadingTranslate(false);
  };

  return (
    <div className={`p-4 rounded-2xl ml-6 ${
      comment.botReply 
        ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30' 
        : 'bg-white/5 border border-white/10'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">
            {comment.botReply ? '🤖' : '👤'}
          </span>
          <span className="text-white font-semibold">
            {comment.botReply ? 'Adalat Bot' : 'User'}
          </span>
          {comment.timestamp && (
            <span className="text-purple-300 text-sm">
              • {getTimeAgo(comment.timestamp)}
            </span>
          )}
        </div>
      </div>
      
      <p className="text-white mb-3">{comment.text}</p>

      {translatedText && (
        <div className="mb-3 p-3 bg-blue-500/10 rounded-xl border border-blue-400/30">
          <p className="text-blue-200 text-sm font-semibold mb-1">
            Translated to {keyValues[selectedLang] || selectedLang}:
          </p>
          <p className="text-white">{translatedText}</p>
        </div>
      )}

      <button
        onClick={() => setShowTranslate(!showTranslate)}
        className="text-purple-300 hover:text-white text-sm font-semibold transition-colors"
      >
        🔄 Translate
      </button>

      {showTranslate && (
        <div className="mt-3 flex items-center space-x-2">
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:border-purple-400 focus:outline-none"
          >
            {targetLanguages.map((lang) => (
              <option key={lang} value={lang} className="bg-gray-800">
                {keyValues[lang] || lang}
              </option>
            ))}
          </select>
          <button
            onClick={handleTranslate}
            disabled={loadingTranslate}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {loadingTranslate ? 'Translating...' : 'Translate'}
          </button>
        </div>
      )}
    </div>
  );
}