import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, X, Phone, User, Sparkles } from "lucide-react";

export default function Story() {
  const [activePage, setActivePage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStory, setActiveStory] = useState(null);

  // Simulated story data with lawyer contacts
  const allStories = [
    {
      id: 1,
      title: "Understanding Basic Rights ⚖️",
      description: "Learn about your fundamental rights guaranteed by the Indian Constitution. This comprehensive guide explains how the judiciary system protects these rights and what avenues you have for seeking justice.",
      videoUrl: "https://youtu.be/fnLn8u9BXBs",
      lawyer: { name: "Adv. Priya Sharma", phone: "+91-98765-43210", speciality: "Constitutional Law" },
      category: "rights"
    },
    {
      id: 2,
      title: "How to File an FIR 🚨",
      description: "A step-by-step guide to filing a First Information Report. Learn about the process, your rights during filing, and what to expect afterward.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      lawyer: { name: "Adv. Rahul Verma", phone: "+91-98765-43211", speciality: "Criminal Law" },
      category: "criminal"
    },
    {
      id: 3,
      title: "Public Interest Litigation 🌟",
      description: "Understand how PIL works in India and how it has been instrumental in driving social change. This guide explains who can file a PIL and under what circumstances.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      lawyer: { name: "Adv. Meera Gupta", phone: "+91-98765-43212", speciality: "Public Interest" },
      category: "public"
    },
    {
      id: 4,
      title: "Consumer Rights Protection 🛡️",
      description: "Learn about your rights as a consumer under the Consumer Protection Act. This module covers grievance redressal mechanisms, consumer courts, and how to file effective complaints.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      lawyer: { name: "Adv. Karan Singh", phone: "+91-98765-43213", speciality: "Consumer Law" },
      category: "consumer"
    },
    {
      id: 5,
      title: "Accessing Legal Aid 💫",
      description: "Discover how to access free legal services in India. This guide explains eligibility criteria, application processes, and what support you can expect from legal aid societies.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      lawyer: { name: "Adv. Anjali Patel", phone: "+91-98765-43214", speciality: "Legal Aid" },
      category: "aid"
    },
    {
      id: 6,
      title: "Right to Information 📄",
      description: "Learn how to exercise your right to information and hold public authorities accountable through the RTI Act. This module explains the application process and appeals.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      lawyer: { name: "Adv. Suresh Kumar", phone: "+91-98765-43215", speciality: "RTI & Transparency" },
      category: "information"
    },
    {
      id: 7,
      title: "Women's Legal Rights 👩‍⚖️",
      description: "A comprehensive overview of laws protecting women's rights in India, including domestic violence prevention, workplace harassment, and property rights.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      lawyer: { name: "Adv. Sunita Rani", phone: "+91-98765-43216", speciality: "Women's Rights" },
      category: "women"
    },
    {
      id: 8,
      title: "Environmental Laws 🌱",
      description: "Understanding how to protect the environment through legal mechanisms. Learn about pollution control regulations and how to report violations.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      lawyer: { name: "Adv. Vikram Joshi", phone: "+91-98765-43217", speciality: "Environmental Law" },
      category: "environment"
    },
    {
      id: 9,
      title: "Digital Rights & Cyberlaws 💻",
      description: "Navigate the legal landscape of digital rights, data protection, and remedies against cybercrimes in the modern digital age.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      lawyer: { name: "Adv. Neha Agarwal", phone: "+91-98765-43218", speciality: "Cyber Law" },
      category: "digital"
    },
    {
      id: 10,
      title: "Labor Rights 👷‍♂️",
      description: "Know your rights in the workplace. This guide covers minimum wages, working conditions, and mechanisms to address workplace grievances.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      lawyer: { name: "Adv. Ravi Malhotra", phone: "+91-98765-43219", speciality: "Labor Law" },
      category: "labor"
    }
  ];

  // Calculate total pages
  const storiesPerPage = 5;
  const totalPages = Math.ceil(allStories.length / storiesPerPage);

  // Get current page stories
  const getCurrentPageStories = () => {
    const startIndex = activePage * storiesPerPage;
    return allStories.slice(startIndex, startIndex + storiesPerPage);
  };

  // Handle page change
  const changePage = (direction) => {
    if (direction === "next" && activePage < totalPages - 1) {
      setActivePage(activePage + 1);
    } else if (direction === "prev" && activePage > 0) {
      setActivePage(activePage - 1);
    }
  };

  // Function to extract YouTube video ID from URL
  const getYoutubeVideoId = (url) => {
    if (url.includes('youtu.be')) {
      return url.split('/').pop().split('?')[0];
    }
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Get category-specific gradient
  const getCategoryGradient = (category) => {
    const gradients = {
      rights: "from-pink-500 via-purple-500 to-indigo-500",
      criminal: "from-red-500 via-pink-500 to-purple-500",
      public: "from-blue-500 via-cyan-500 to-teal-500",
      consumer: "from-green-500 via-emerald-500 to-cyan-500",
      aid: "from-yellow-500 via-orange-500 to-red-500",
      information: "from-indigo-500 via-purple-500 to-pink-500",
      women: "from-pink-500 via-rose-500 to-purple-500",
      environment: "from-green-500 via-teal-500 to-blue-500",
      digital: "from-cyan-500 via-blue-500 to-indigo-500",
      labor: "from-orange-500 via-red-500 to-pink-500"
    };
    return gradients[category] || "from-purple-500 to-pink-500";
  };

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      const storyElements = document.querySelectorAll('.story-card');
      storyElements.forEach((elem, index) => {
        const rect = elem.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom >= 0;
        
        if (isVisible) {
          setTimeout(() => {
            elem.classList.add('opacity-100', 'translate-y-0');
            elem.classList.remove('opacity-0', 'translate-y-10');
          }, index * 150);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activePage]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-xl opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-25 animate-ping"></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-lg opacity-20 animate-bounce"></div>
        <div className="absolute bottom-40 right-1/3 w-36 h-36 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-15 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className={`pt-16 pb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
              <Sparkles className="text-pink-400" size={20} />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 font-semibold">
                Haq Ki Kahaniyan – Stories That Inspire Justice
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 animate-pulse">
              हक़ के खानिया
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-4 font-medium">
              Your guide to judiciary literacy in India ⚖️
            </p>
            
            <p className="text-lg text-cyan-300 italic">
              Every right reclaimed is a story worth telling ✨
            </p>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">        
          <div className="flex flex-col gap-8">
            {getCurrentPageStories().map((story, index) => (
              <div 
                key={story.id}
                className={`story-card group relative bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl opacity-0 translate-y-10 transition-all duration-700 ease-out hover:scale-105 hover:shadow-pink-500/25 hover:shadow-2xl border border-white/20 ${isLoaded ? 'hover:bg-white/15' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Video Preview */}
                  <div className="lg:w-1/2 relative aspect-video cursor-pointer" onClick={() => setActiveStory(story)}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(story.category)} opacity-20 z-10`}></div>
                    <img 
                      src={`https://img.youtube.com/vi/${getYoutubeVideoId(story.videoUrl)}/maxresdefault.jpg`} 
                      alt={`Preview for ${story.title}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to medium quality thumbnail if maxres fails
                        e.target.src = `https://img.youtube.com/vi/${getYoutubeVideoId(story.videoUrl)}/mqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center group-hover:from-black/60 transition-all duration-300 z-20">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300 border border-white/30">
                        <Play size={40} className="text-white ml-1" />
                      </div>
                    </div>
                    
                    {/* Story Number Badge */}
                    <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${getCategoryGradient(story.category)} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-30`}>
                      {story.id}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
                        {story.title}
                      </h3>
                      <p className="text-white/80 leading-relaxed mb-6">{story.description}</p>
                    </div>
                    
                    {/* Lawyer Info & Actions */}
                    <div className="space-y-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 bg-gradient-to-r ${getCategoryGradient(story.category)} rounded-full flex items-center justify-center`}>
                            <User size={20} className="text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">{story.lawyer.name}</p>
                            <p className="text-cyan-300 text-sm">{story.lawyer.speciality}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setActiveStory(story)}
                          className={`flex-1 bg-gradient-to-r ${getCategoryGradient(story.category)} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2`}
                        >
                          <Play size={18} />
                          Watch Story
                        </button>
                        <a 
                          href={`tel:${story.lawyer.phone}`}
                          className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Phone size={18} />
                          Call Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Glassmorphism Pagination */}
          <div className="mt-12 flex justify-between items-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <button 
              onClick={() => changePage("prev")}
              disabled={activePage === 0}
              className={`flex items-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activePage === 0 
                ? 'text-white/40 cursor-not-allowed' 
                : 'text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-lg'
              }`}
            >
              <ChevronLeft size={20} className="mr-2" />
              Previous
            </button>
            
            <div className="flex items-center space-x-3">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePage(i)}
                  className={`w-12 h-12 rounded-full font-bold transition-all duration-300 ${
                    activePage === i 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white scale-110 shadow-lg' 
                    : 'bg-white/20 text-white/80 hover:bg-white/30 hover:scale-105'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => changePage("next")}
              disabled={activePage === totalPages - 1}
              className={`flex items-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activePage === totalPages - 1 
                ? 'text-white/40 cursor-not-allowed' 
                : 'text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 hover:shadow-lg'
              }`}
            >
              Next
              <ChevronRight size={20} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Full Screen Video Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
          <button 
            onClick={() => setActiveStory(null)}
            className="absolute top-6 right-6 z-10 text-white p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30"
          >
            <X size={24} />
          </button>
          
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe 
                src={`https://www.youtube.com/embed/${getYoutubeVideoId(activeStory.videoUrl)}?autoplay=1`}
                className="w-full h-full"
                title={activeStory.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}