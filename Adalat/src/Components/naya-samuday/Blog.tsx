import React, { useState, useEffect } from "react";
import { Edit3, Globe, Send, BookOpen, Sparkles, Languages } from "lucide-react";

// Language mapping (unchanged logic)
const keyValues = {
  en: "English",
  hi: "Hindi",
  bn: "Bengali",
  ta: "Tamil",
  te: "Telugu",
  gu: "Gujarati",
  kn: "Kannada",
  ml: "Malayalam",
  mr: "Marathi",
  pa: "Punjabi",
  ur: "Urdu",
  as: "Assamese",
  or: "Oriya",
  sa: "Sanskrit",
};

export default function BlogWithTranslation() {
  // All original state logic unchanged
  const [languagesData, setLanguagesData] = useState([]);
  const [sourceLang, setSourceLang] = useState("hi");
  const [targetLang, setTargetLang] = useState("en");
  const [blogInput, setBlogInput] = useState("");
  const [postedBlog, setPostedBlog] = useState(null);
  const [translatedText, setTranslatedText] = useState("");
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Original fetch logic unchanged
  useEffect(() => {
    async function fetchLanguages() {
      const res = await fetch(
        "https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline",
        {
          headers: {
            userID: "9f55ae82e8204e4c86625573098e7707",
            ulcaApiKey: "52d075f861-561b-42fe-8b00-8a034acb4deb",
          },
          method: "POST",
          body: JSON.stringify({
            pipelineTasks: [{ taskType: "translation" }],
            pipelineRequestConfig: {
              pipelineId: "64392f96daac500b55c543cd",
            },
          }),
        }
      );
      const data = await res.json();
      setLanguagesData(data.languages || []);
    }

    fetchLanguages();
  }, []);

  // Original auto-set logic unchanged
  useEffect(() => {
    const match = languagesData.find((l) => l.sourceLanguage === sourceLang);
    if (match?.targetLanguageList.length) {
      setTargetLang(match.targetLanguageList[0]);
    }
  }, [languagesData, sourceLang]);

  // Original functions unchanged
  const handlePost = () => {
    if (!blogInput.trim()) {
      alert("Please write a blog post!");
      return;
    }
    setPostedBlog(blogInput);
    setTranslatedText("");
    setBlogInput("");
  };

  const handleTranslate = async () => {
    if (!postedBlog) return;
    setLoading(true);
    setTranslatedText("");
    setShowTargetModal(false);

    try {
      const res = await fetch("scaler/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_language: sourceLang,
          content: postedBlog,
          target_language: targetLang,
        }),
      });

      const data = await res.json();
      setTranslatedText(data.translated_content || "Translation failed.");
    } catch (err) {
      console.error(err);
      alert("Translation error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Animated Background with Floating Orbs */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-lg opacity-60 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-xl opacity-40 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-md opacity-60 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-6 pb-32">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header with Gradient Text */}
          <div className="text-center mb-16">
            <div className="relative">
              <h1 className="text-7xl font-extrabold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-8 animate-pulse tracking-tight">
                <Edit3 className="inline-block mr-4 text-amber-400 drop-shadow-2xl" size={60} />
                Nyay Samuday
              </h1>
              <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-r from-amber-500/20 to-red-500/20 blur-3xl -z-10 animate-pulse"></div>
            </div>
            
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-800/50 via-gray-800/40 to-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-amber-500/20 shadow-2xl shadow-amber-500/10">
              <p className="text-gray-100 text-2xl leading-relaxed font-medium">
                Introducing{' '}
                <span className="font-black text-3xl bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent animate-pulse">
                  Nyay Samuday
                </span>
                {' '}— a dedicated space where you can ask questions, share concerns, and find solutions related to your{' '}
                <span className="font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  legal rights and justice
                </span>
                . Powered by{' '}
                <span className="font-bold text-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                  Bhasni
                </span>
                , it supports India's diverse native languages — so no matter which language you speak,{' '}
                <span className="font-semibold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  we're here to understand and help you
                </span>
                .
              </p>
              
              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Input Card */}
          <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-lg rounded-2xl p-8 border border-indigo-500/30 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
            <div className="relative">
              <textarea
                rows={8}
                value={blogInput}
                onChange={(e) => setBlogInput(e.target.value)}
                placeholder="Write your amazing blog post here... ✨"
                className="w-full bg-black/20 backdrop-blur-sm text-white placeholder-gray-400 p-6 text-lg rounded-xl border border-purple-500/30 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30 resize-none transition-all duration-300"
              />
              <div className="absolute bottom-4 right-4">
                <Sparkles className="text-purple-400 opacity-50" size={24} />
              </div>
            </div>

            {/* Language Selection */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center space-x-4">
                <Languages className="text-cyan-400" size={24} />
                <label className="text-white font-semibold text-lg">Your Language:</label>
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="bg-gradient-to-r from-blue-600/50 to-purple-600/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-blue-500/30 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
                >
                  {Object.keys(keyValues).map((lang) => (
                    <option key={lang} value={lang} className="bg-gray-800 text-white">
                      {keyValues[lang]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Post Button */}
              <button
                onClick={handlePost}
                className="group relative bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Send className="inline-block mr-2" size={20} />
                Post Blog
              </button>
            </div>
          </div>

          {/* Posted Blog Display */}
          {postedBlog && (
            <div className="bg-gradient-to-br from-teal-900/40 to-emerald-900/40 backdrop-blur-lg rounded-2xl p-8 border border-teal-500/30 shadow-2xl">
              <div className="flex items-center mb-6">
                <BookOpen className="text-teal-400 mr-3" size={28} />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">
                  Blog in {keyValues[sourceLang]}
                </h2>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-teal-500/20 mb-6">
                <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap">
                  {postedBlog}
                </p>
              </div>

              <button
                onClick={() => setShowTargetModal(true)}
                className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Globe className="inline-block mr-2" size={20} />
                Translate this post
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 backdrop-blur-lg rounded-2xl p-8 border border-amber-500/30 shadow-2xl">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-8 h-8 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>
                <span className="text-amber-300 text-xl font-semibold">Translating your masterpiece...</span>
              </div>
            </div>
          )}

          {/* Translated Text Display */}
          {translatedText && (
            <div className="bg-gradient-to-br from-violet-900/40 to-purple-900/40 backdrop-blur-lg rounded-2xl p-8 border border-violet-500/30 shadow-2xl">
              <div className="flex items-center mb-6">
                <Globe className="text-violet-400 mr-3" size={28} />
                <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
                  Translation in {keyValues[targetLang]}
                </h3>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-violet-500/20">
                <p className="text-gray-200 text-lg leading-relaxed">
                  {translatedText}
                </p>
              </div>
            </div>
          )}

          {/* Translation Modal */}
          {showTargetModal && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30 shadow-2xl max-w-md w-full transform animate-pulse">
                <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Select Translation Language
                </h3>
                
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full bg-black/30 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-purple-500/30 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 mb-6"
                >
                  {languagesData
                    .find((l) => l.sourceLanguage === sourceLang)
                    ?.targetLanguageList.map((lang) => (
                      <option key={lang} value={lang} className="bg-gray-800 text-white">
                        {keyValues[lang] || lang}
                      </option>
                    ))}
                </select>

                <div className="flex space-x-4">
                  <button
                    onClick={handleTranslate}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300"
                  >
                    Translate
                  </button>
                  <button
                    onClick={() => setShowTargetModal(false)}
                    className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}