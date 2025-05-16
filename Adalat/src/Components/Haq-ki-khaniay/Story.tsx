import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

export default function Story() {
  const [activePage, setActivePage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStory, setActiveStory] = useState(null);

  // Simulated story data
  const allStories = [
    {
      id: 1,
      title: "Understanding Basic Rights",
      description: "Learn about your fundamental rights guaranteed by the Indian Constitution. This comprehensive guide explains how the judiciary system protects these rights and what avenues you have for seeking justice.",
      videoUrl: "https://youtu.be/fnLn8u9BXBs"
    },
    {
      id: 2,
      title: "How to File an FIR",
      description: "A step-by-step guide to filing a First Information Report. Learn about the process, your rights during filing, and what to expect afterward.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ"
    },
    {
      id: 3,
      title: "Public Interest Litigation",
      description: "Understand how PIL works in India and how it has been instrumental in driving social change. This guide explains who can file a PIL and under what circumstances.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ"
    },
    {
      id: 4,
      title: "Consumer Rights Protection",
      description: "Learn about your rights as a consumer under the Consumer Protection Act. This module covers grievance redressal mechanisms, consumer courts, and how to file effective complaints.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ"
    },
    {
      id: 5,
      title: "Accessing Legal Aid",
      description: "Discover how to access free legal services in India. This guide explains eligibility criteria, application processes, and what support you can expect from legal aid societies.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ"
    },
    {
      id: 6,
      title: "Right to Information",
      description: "Learn how to exercise your right to information and hold public authorities accountable through the RTI Act. This module explains the application process and appeals.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ"
    },
    {
      id: 7,
      title: "Women's Legal Rights",
      description: "A comprehensive overview of laws protecting women's rights in India, including domestic violence prevention, workplace harassment, and property rights.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ"
    },
    {
      id: 8,
      title: "Environmental Laws",
      description: "Understanding how to protect the environment through legal mechanisms. Learn about pollution control regulations and how to report violations.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ"
    },
    {
      id: 9,
      title: "Digital Rights & Cyberlaws",
      description: "Navigate the legal landscape of digital rights, data protection, and remedies against cybercrimes in the modern digital age.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ"
    },
    {
      id: 10,
      title: "Labor Rights",
      description: "Know your rights in the workplace. This guide covers minimum wages, working conditions, and mechanisms to address workplace grievances.",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ"
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
    // Handle youtu.be format
    if (url.includes('youtu.be')) {
      return url.split('/').pop().split('?')[0];
    }
    
    // Handle youtube.com format
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    setIsLoaded(true);
    
    // Add scroll listener for animations
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main Heading */}
      <div className={`pt-16 pb-8 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            हक़ के खानिया
          </h1>
          <p className="mt-4 text-lg text-center text-gray-300 max-w-3xl mx-auto">
            Your guide to judiciary literacy in India
          </p>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">        
        {/* Story Cards - Changed to full width (removed grid columns) */}
        <div className="flex flex-col gap-6">
          {getCurrentPageStories().map((story, index) => (
            <div 
              key={story.id}
              className="story-card relative bg-gray-800 rounded-xl overflow-hidden shadow-lg opacity-0 translate-y-10 transition-all duration-700 ease-out cursor-pointer hover:shadow-2xl hover:scale-105 hover:shadow-blue-900/20 w-full"
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setActiveStory(story)}
            >
              <div className="relative aspect-video">
                <img 
                  src={`/api/placeholder/1280/720`} 
                  alt={`Preview for ${story.title}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                  <Play size={50} className="text-white opacity-80" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{story.title}</h3>
                <p className="text-gray-400">{story.description}</p>
              </div>
              
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-lg font-medium">
                {story.id}
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-10 flex justify-between items-center">
          <button 
            onClick={() => changePage("prev")}
            disabled={activePage === 0}
            className={`flex items-center py-2 px-4 rounded-lg transition-colors duration-300 ${
              activePage === 0 
              ? 'text-gray-600 cursor-not-allowed' 
              : 'text-blue-400 hover:bg-blue-900/20'
            }`}
          >
            <ChevronLeft size={20} className="mr-1" />
            Previous
          </button>
          
          <div className="flex items-center space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePage(i)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activePage === i 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => changePage("next")}
            disabled={activePage === totalPages - 1}
            className={`flex items-center py-2 px-4 rounded-lg transition-colors duration-300 ${
              activePage === totalPages - 1 
              ? 'text-gray-600 cursor-not-allowed' 
              : 'text-blue-400 hover:bg-blue-900/20'
            }`}
          >
            Next
            <ChevronRight size={20} className="ml-1" />
          </button>
        </div>
      </div>
      
      {/* Full Screen Video Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black">
          <button 
            onClick={() => setActiveStory(null)}
            className="absolute top-4 right-4 z-10 text-white p-2 bg-black/50 rounded-full hover:bg-white/20"
          >
            <X size={24} />
          </button>
          
          <iframe 
            src={`https://www.youtube.com/embed/${getYoutubeVideoId(activeStory.videoUrl)}?autoplay=1`}
            className="w-full h-full"
            title={activeStory.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}