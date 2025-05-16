import { useState, useEffect } from 'react';

export default function Laws() {
  const [visible, setVisible] = useState([]);
  
  const legalTopics = [
    { id: 1, title: "Tax Laws", path: "/tax-laws" },
    { id: 2, title: "Special Acts", path: "/special-acts" },
    { id: 3, title: "Personal Law", path: "/personal-law" },
    { id: 4, title: "IPC", path: "/ipc" },
    { id: 5, title: "Bhartiya Nayy Sanhita", path: "/bhartiya-nayy-sanhita" },
    { id: 6, title: "Bhartiya Nagrink Suraksa Sanhita", path: "/bhartiya-nagrink-suraksa-sanhita" },
    { id: 7, title: "Bhartiya Nagrink Adhiniyam", path: "/bhartiya-nagrink-adhiniyam" },
    { id: 8, title: "Articles", path: "/articles" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const cards = document.querySelectorAll('.card-container');
      
      cards.forEach((card, index) => {
        const cardPosition = card.offsetTop;
        
        if (scrollPosition > cardPosition + 100 && !visible.includes(index)) {
          setVisible(prev => [...prev, index]);
        }
      });
    };

    // Set initial cards that are in view
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Legal Topics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {legalTopics.map((topic, index) => (
          <div 
            key={topic.id} 
            className="card-container transition-opacity duration-1000" 
            style={{ opacity: visible.includes(index) ? 1 : 0 }}
          >
            <a href={topic.path} className="block">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition-all duration-300 h-48 flex items-center justify-center">
                <h2 className="text-xl font-semibold text-center text-gray-800">{topic.title}</h2>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}