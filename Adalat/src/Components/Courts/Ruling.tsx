import { useState, useEffect } from "react";
import { Gavel, Newspaper, Building2, Calendar, ArrowRight, Sparkles, Scale, Users, Globe } from "lucide-react";

export default function Ruling() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('supreme');

  const supremeCourtNews = [
    {
      id: 1,
      title: "Victims Can Now Appeal in Cheque Bounce Acquittals",
      description: "The Supreme Court held that victims in cheque bounce cases can file appeals against acquittal under Section 372 CrPC, giving them more say in criminal proceedings.",
      impact: "High",
      date: "2025-06-05",
      category: "Criminal Law"
    },
    {
      id: 2,
      title: "Congress MLA Vinay Kulkarni's Bail Cancelled",
      description: "SC revoked his bail in a murder case, citing attempts to influence witnesses. He has been ordered to surrender within a month.",
      impact: "High",
      date: "2025-06-04",
      category: "Criminal Law"
    },
    {
      id: 3,
      title: "High Courts Cannot Increase Punishment Without Prosecution Appeal",
      description: "SC ruled that a High Court cannot suo motu enhance a convict's sentence — such actions must come from the prosecution.",
      impact: "Medium",
      date: "2025-06-03",
      category: "Criminal Procedure"
    },
    {
      id: 4,
      title: "Rathi Steel Gets Relief in Money Laundering Case",
      description: "SC quashed proceedings against Rathi Steel and its MD, citing procedural lapses in how cognizance was taken by the trial court.",
      impact: "Medium",
      date: "2025-06-02",
      category: "Economic Offences"
    },
    {
      id: 5,
      title: "NEET PG 2025: Exam Must Be in One Shift",
      description: "SC declared that holding NEET PG in two shifts was 'arbitrary and unfair' and mandated a uniform, single-shift format for fairness.",
      impact: "High",
      date: "2025-06-01",
      category: "Education Law"
    },
    {
      id: 6,
      title: "3 Years Practice Must for Judicial Exams",
      description: "Fresh LLB graduates can no longer directly sit for judicial service exams. SC made 3 years of legal practice mandatory.",
      impact: "High",
      date: "2025-05-31",
      category: "Legal Practice"
    }
  ];

  const highCourtNews = [
    {
      id: 1,
      title: "Right to Love: Allahabad HC Protects Interfaith Couple",
      description: "The HC upheld the right of a 24-year-old woman to live with her partner and ordered police protection, reinforcing individual liberty.",
      impact: "High",
      date: "2025-06-06",
      category: "Personal Liberty",
      court: "Allahabad HC"
    },
    {
      id: 2,
      title: "Mumbai Court Raises DV Compensation to ₹1 Crore",
      description: "Finding ₹5 lakh insufficient, the court increased compensation in a domestic violence case based on the husband's financial status.",
      impact: "High",
      date: "2025-06-05",
      category: "Family Law",
      court: "Mumbai HC"
    },
    {
      id: 3,
      title: "No NEET UG 2025 Re-Exam, Says Madras HC",
      description: "The Court dismissed pleas for a re-test, stating there was no evidence of malafide conduct in the current NEET UG round.",
      impact: "Medium",
      date: "2025-06-04",
      category: "Education Law",
      court: "Madras HC"
    }
  ];

  const otherNews = [
    {
      id: 1,
      title: "NBW Against Rahul Gandhi in 2018 Defamation Case",
      description: "A special court in Chaibasa issued a non-bailable warrant, asking him to appear on June 26 over an old defamation matter.",
      impact: "High",
      date: "2025-06-06",
      category: "Defamation"
    },
    {
      id: 2,
      title: "SC Questions Delhi HC Order on Wikipedia Takedown",
      description: "SC asked whether directing Wikipedia to remove a page in a defamation case violated freedom of expression and press.",
      impact: "Medium",
      date: "2025-06-05",
      category: "Media Law"
    },
    {
      id: 3,
      title: "Vodafone CEO's AGR Relief Remarks Trigger SC Caution",
      description: "SC raised eyebrows over the CEO's comment that AGR relief is being discussed, calling it contrary to the Court's final rulings.",
      impact: "Medium",
      date: "2025-06-04",
      category: "Telecom Law"
    }
  ];

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'High': return 'from-red-500 to-pink-500';
      case 'Medium': return 'from-yellow-500 to-orange-500';
      case 'Low': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTabGradient = (tab) => {
    switch(tab) {
      case 'supreme': return 'from-purple-500 via-pink-500 to-red-500';
      case 'high': return 'from-blue-500 via-cyan-500 to-teal-500';
      case 'other': return 'from-green-500 via-emerald-500 to-cyan-500';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  const getCurrentNews = () => {
    switch(activeTab) {
      case 'supreme': return supremeCourtNews;
      case 'high': return highCourtNews;
      case 'other': return otherNews;
      default: return supremeCourtNews;
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-16 w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-25 animate-ping"></div>
        <div className="absolute top-1/2 right-12 w-28 h-28 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-1/3 w-44 h-44 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-15 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className={`pt-16 pb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
              <Sparkles className="text-pink-400" size={20} />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 font-semibold">
                Get Latest News – Fresh From the Courts
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 animate-pulse">
              ⚖️ Kanuni Kharaba
            </h1>
            
            <div className="flex items-center justify-center gap-4 text-white/80 text-lg">
              <Calendar size={20} />
              <span>Updated: June 7, 2025</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400">Live</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('supreme')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'supreme' 
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-lg scale-105' 
                    : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <Building2 size={20} />
                  🏛️ Supreme Court
                </button>
                <button
                  onClick={() => setActiveTab('high')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'high' 
                    ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white shadow-lg scale-105' 
                    : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <Scale size={20} />
                  ⚖️ High Courts
                </button>
                <button
                  onClick={() => setActiveTab('other')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'other' 
                    ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 text-white shadow-lg scale-105' 
                    : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <Globe size={20} />
                  📰 Other News
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* News Section */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 text-center mb-2">
              {activeTab === 'supreme' && '🏛️ Supreme Court Ke Big Bombs'}
              {activeTab === 'high' && '⚖️ High Court Ka Haal'}
              {activeTab === 'other' && '📰 Courtroom Ke Bahar – Legal News Flash'}
            </h2>
          </div>

          {/* News Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {getCurrentNews().map((news, index) => (
              <div 
                key={news.id}
                className={`group bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/15 hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${getImpactColor(news.impact)} rounded-full text-white text-sm font-semibold`}>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    {news.impact} Impact
                  </div>
                  <div className="text-white/60 text-sm">
                    {new Date(news.date).toLocaleDateString('en-IN')}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 transition-all duration-300">
                  {news.title}
                </h3>
                
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  {news.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className={`px-3 py-1 bg-gradient-to-r ${getTabGradient(activeTab)} rounded-full text-white text-xs font-medium`}>
                    {news.category}
                  </div>
                  
                  {news.court && (
                    <div className="text-cyan-400 text-xs font-medium">
                      {news.court}
                    </div>
                  )}
                  
                  <ArrowRight 
                    size={16} 
                    className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" 
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 text-center mb-8">
              📊 Today's Legal Pulse
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {supremeCourtNews.length}
                </div>
                <div className="text-white/80">Supreme Court Updates</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                  {highCourtNews.length}
                </div>
                <div className="text-white/80">High Court Decisions</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
                  {otherNews.length}
                </div>
                <div className="text-white/80">Other Legal News</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}