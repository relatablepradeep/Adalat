import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaLinkedin, FaGithub, FaTwitter, FaChevronDown, FaBars, FaTimes, FaHome, FaGavel, FaRobot, FaBookOpen, FaHandsHelping, FaNewspaper, FaVideo, FaUsers } from 'react-icons/fa';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  const navItems = [
    { title: "Home", path: "/", hasDropdown: false, icon: <FaHome /> },
    { title: "Know Rights", path: "/rights", hasDropdown: false, icon: <FaGavel /> },
    { title: "Ask AI", path: "/askai", hasDropdown: false, icon: <FaRobot /> },
    {
      title: "Learn Law",
      path: "/learn",
      hasDropdown: true,
      icon: <FaBookOpen />,
      dropdownItems: [
        { title: "Quizzes", path: "/learn/quizzes" },
        { title: "Scenarios", path: "/learn/scenarios" },
        { title: "Gamified Learning", path: "/learn/games" }
      ]
    },
    {
      title: "Legal Help",
      path: "/help",
      hasDropdown: true,
      icon: <FaHandsHelping />,
      dropdownItems: [
        { title: "Find Lawyers", path: "/help/lawyers" },
        { title: "Courts Near You", path: "/help/courts" },
        { title: "Legal Aid & NGOs", path: "/help/aid" }
      ]
    },
    {
      title: "Legal News",
      path: "/news",
      hasDropdown: true,
      icon: <FaNewspaper />,
      dropdownItems: [
        { title: "Latest Laws", path: "/news/laws" },
        { title: "Court Rulings", path: "/news/rulings" },
        { title: "Govt Schemes", path: "/news/schemes" }
      ]
    },
    { title: "Videos", path: "/videos", hasDropdown: false, icon: <FaVideo /> },
    {
      title: "Community",
      path: "/community",
      hasDropdown: true,
      icon: <FaUsers />,
      dropdownItems: [
        { title: "Blog Posts", path: "/community/blogs" },
        { title: "Anonymous Queries", path: "/community/queries" },
        { title: "Discussions", path: "/community/discussions" }
      ]
    }
  ];

  return (
    <>
      {/* Fixed Top Navbar */}
      <div 
        className={`w-full fixed top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-1" : "py-2"
        }`}
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #4c1d95 50%, #581c87 100%)",
          boxShadow: scrolled ? "0 5px 20px rgba(123, 31, 162, 0.5)" : "none"
        }}
      >
        {/* Main content container */}
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Button - Left */}
            <div className="lg:hidden order-1">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
            
            {/* Empty div for spacing on mobile */}
            <div className="lg:hidden order-3 w-10"></div>
            
            {/* Logo and Name - Centered */}
            <div className="flex flex-col items-center justify-center order-2 mx-auto relative">
              {/* Twinkle stars effect */}
              <div className="absolute -inset-4 overflow-hidden">
                <div className="absolute h-1 w-1 bg-amber-400 rounded-full animate-ping opacity-70" style={{ left: '10%', top: '20%', animationDelay: '0.5s', animationDuration: '2s' }}></div>
                <div className="absolute h-1 w-1 bg-amber-400 rounded-full animate-ping opacity-70" style={{ left: '80%', top: '10%', animationDelay: '1.2s', animationDuration: '1.7s' }}></div>
                <div className="absolute h-1 w-1 bg-amber-400 rounded-full animate-ping opacity-70" style={{ left: '30%', top: '90%', animationDelay: '1.8s', animationDuration: '2.2s' }}></div>
                <div className="absolute h-1 w-1 bg-amber-400 rounded-full animate-ping opacity-70" style={{ left: '85%', top: '80%', animationDelay: '0.7s', animationDuration: '1.5s' }}></div>
                <div className="absolute h-1 w-1 bg-amber-400 rounded-full animate-ping opacity-70" style={{ left: '60%', top: '20%', animationDelay: '1.5s', animationDuration: '2.5s' }}></div>
                <div className="absolute h-1 w-1 bg-amber-400 rounded-full animate-ping opacity-70" style={{ left: '20%', top: '50%', animationDelay: '0.2s', animationDuration: '1.8s' }}></div>
              </div>
              
              {/* Main logo with glow effect */}
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-amber-400 opacity-75 blur-md animate-pulse"></div>
                <div className="relative h-14 w-14 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-amber-400">
                  <img src="/api/placeholder/48/48" alt="Adalat logo" className="h-10 w-10" />
                </div>
              </div>
              
              <div className="text-center mt-1">
                <Link to="/" className="text-2xl font-bold text-white tracking-wider font-serif flex items-center justify-center">
                  आदालत
                  <span className="text-sm ml-2 text-amber-300 font-sans">ADALAT</span>
                </Link>
                <p className="text-xs text-gray-300">Justice At Your Fingertips</p>
              </div>
            </div>
            
            {/* Social Media Icons - Right Side on Desktop (hidden on mobile) */}
            <div className="hidden lg:flex items-center gap-4 order-3">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-amber-300 transition-all duration-300 transform hover:scale-110">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="text-white hover:text-amber-300 transition-all duration-300 transform hover:scale-110">
                <FaGithub className="text-xl" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer"
                className="text-white hover:text-amber-300 transition-all duration-300 transform hover:scale-110">
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Nav Links Section - Smaller Text */}
        <div className="hidden lg:flex justify-center px-6 py-2 mt-2">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <div className="flex items-center">
                <Link 
                  to={item.path}
                  className="px-7 py-1 text-gray-100 hover:text-amber-300 relative text-xl font-medium transition-all duration-300 flex items-center"
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.title}
                  {item.hasDropdown && (
                    <FaChevronDown 
                      className="inline-block ml-1 text-xs" 
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown(index);
                      }}
                    />
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
              
              {/* Dropdown Menu with Glow Effect */}
              {item.hasDropdown && (
                <div className="absolute left-0 mt-1 w-48 rounded-lg overflow-hidden transform origin-top scale-0 group-hover:scale-100 transition-transform duration-300">
                  {/* Glow effect for dropdown */}
                  <div className="absolute inset-0 bg-purple-600 opacity-20 blur-sm"></div>
                  <div className="relative bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="py-1">
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          to={dropdownItem.path}
                          className="block px-4 py-2 text-xs text-gray-800 hover:bg-indigo-50 hover:text-indigo-900  transition-colors duration-150"
                        >
                          {dropdownItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Nav Menu */}
        <div 
          className={`lg:hidden absolute w-full shadow-xl transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-screen" : "max-h-0"
          }`}
          style={{ background: "linear-gradient(180deg, #1e3a8a 0%, #3730a3 100%)" }}
        >
          <div className="px-4 py-2">
            {navItems.map((item, index) => (
              <div key={index} className="border-b border-indigo-800/50 last:border-0">
                <div className="flex justify-between items-center">
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 py-3 text-white hover:text-amber-300 transition-colors duration-200"
                    onClick={() => !item.hasDropdown && setIsOpen(false)}
                  >
                    <span>{item.icon}</span>
                    {item.title}
                  </Link>
                  {item.hasDropdown && (
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="p-2 text-white focus:outline-none"
                    >
                      <FaChevronDown
                        className={`transition-transform duration-300 ${
                          activeDropdown === index ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                
                {/* Mobile Dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeDropdown === index ? "max-h-60" : "max-h-0"
                  }`}
                >
                  {item.hasDropdown && item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                    <Link
                      key={dropdownIndex}
                      to={dropdownItem.path}
                      className="block pl-8 py-2 text-sm text-gray-300 hover:text-amber-300 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      • {dropdownItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Mobile Social Media Links */}
            <div className="flex gap-6 py-4 justify-center">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-amber-300 transition-all duration-300 transform hover:scale-110">
                <FaLinkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-amber-300 transition-all duration-300 transform hover:scale-110">
                <FaGithub size={20} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer"
                className="text-white hover:text-amber-300 transition-all duration-300 transform hover:scale-110">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add margin to offset the height of fixed navbar */}
      <div className="h-36 lg:h-40" />
    </>
  );
}