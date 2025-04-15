import { useState, useEffect, useRef } from 'react';

export default function Scroll() {
  const newsItems = [
    {
      title: "Breaking News: Supreme Court Ruling on Privacy Rights",
      image: "https://via.placeholder.com/150",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero arcu, in tempus ligula mollis in."
    },
    {
      title: "High Court Issues Stay on Environmental Regulation",
      image: "https://via.placeholder.com/150",
      content: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    },
    {
      title: "Local Court's Landmark Decision on Consumer Rights",
      image: "https://via.placeholder.com/150",
      content: "Fusce porttitor metus ut massa posuere, vitae tempor libero ultricies. Sed vehicula lacus a libero luctus, et ultrices ipsum elementum."
    },
    {
      title: "Session Court Verdict on Corporate Dispute",
      image: "https://via.placeholder.com/150",
      content: "Vivamus lobortis eros vel velit tincidunt, sed tempus nulla dapibus. Quisque pretium enim vitae nisi ultricies, non convallis libero facilisis."
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Handle navigation when a news item is clicked
  const handleNavigation = (title) => {
    alert(`Navigating to ${title} news page`);
    // In a real application with routing:
    // navigate(`/${title.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-900 to-indigo-900 overflow-hidden px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-white text-center">Latest News</h1>

      {/* News container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-lg cursor-pointer transition-all overflow-hidden"
            style={{ opacity: hoveredIndex === index ? 1 : 0.9 }}
            onClick={() => handleNavigation(item.title)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onTouchStart={() => setHoveredIndex(index)}
            onTouchEnd={() => setHoveredIndex(null)}
          >
            <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{item.title}</h2>
              <p className="text-sm text-gray-700">{item.content}</p>
            </div>

            {/* Overlay when hovered */}
            {hoveredIndex === index && (
              <div className="absolute inset-0 bg-black opacity-50"></div>
            )}
          </div>
        ))}
      </div>

      <div className="text-gray-200 text-center text-sm md:text-base max-w-md">
        <p>Hover over a news item for details, click to read more</p>
      </div>
    </div>
  );
}
