import { Link, NavLink } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaTwitter, FaBars, FaTimes, FaCaretDown } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import Logo from './Logo-removebg-preview.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoverDropdown, setHoverDropdown] = useState(null);
  const dropdownRefs = useRef({});
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (openDropdown && 
          dropdownRefs.current[openDropdown] && 
          !dropdownRefs.current[openDropdown].contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (dropdown) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
    }
  };

  const handleMouseEnter = (dropdown) => {
    setHoverDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setHoverDropdown(null);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg relative z-50">
      {/* Top bar with Logo and Brand Name */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button (Left) */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-white focus:outline-none hover:scale-110 transition-transform duration-300 ease-in-out"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} className="animate-spin" /> : <FaBars size={24} className="hover:rotate-180 transition-transform duration-500" />}
            </button>
          </div>

          {/* Logo and Name (Center) */}
          <div className="flex-1 flex justify-center transform hover:scale-105 transition-transform duration-300">
            <NavLink to="/" className="flex items-center">
              <img 
                className="h-36 w-48 mr-3 drop-shadow-lg hover:drop-shadow-xl transition-all duration-300" 
                src={Logo} 
                alt="Adalat-logo" 
              />
              <div className="group">
                <h1 className="text-3xl font-bold text-white font-sans tracking-wider group-hover:tracking-widest transition-all duration-300">
                  Adalat
                </h1>
                <p className="text-md text-cyan-200 font-medium transform translate-y-0 group-hover:translate-y-1 transition-all duration-300">Empowering Legal Literacy</p>
              </div>
            </NavLink>
          </div>

          {/* Social Media Icons (Right) */}
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"
              className="text-cyan-300 hover:text-white transition-all duration-300 transform hover:scale-125 hover:rotate-6">
              <FaLinkedin className="text-xl" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="text-cyan-300 hover:text-white transition-all duration-300 transform hover:scale-125 hover:rotate-6">
              <FaGithub className="text-xl" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer"
              className="text-cyan-300 hover:text-white transition-all duration-300 transform hover:scale-125 hover:rotate-6">
              <FaTwitter className="text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-gray-900 bg-opacity-90 shadow-md backdrop-blur-sm">
        <div className="container mx-auto px-4">
          {/* Desktop Menu */}
          <div className="hidden md:flex justify-center py-2">
            <NavLink to="/laws" className={({ isActive }) =>
              `flex items-center text-lg font-medium transition-all duration-300 px-3 py-2 mx-1 rounded-lg ${isActive ? "bg-pink-600 text-white shadow-lg shadow-pink-500/50" : "text-gray-200 hover:bg-purple-600 hover:text-white hover:shadow-md hover:shadow-purple-500/50 hover:-translate-y-1"}`
            }>
              <span className="mr-1">⚖️</span> Aapke Adhikar
            </NavLink>
            <NavLink to="/Translate" className={({ isActive }) =>
              `flex items-center text-lg font-medium transition-all duration-300 px-3 py-2 mx-1 rounded-lg ${isActive ? "bg-pink-600 text-white shadow-lg shadow-pink-500/50" : "text-gray-200 hover:bg-purple-600 hover:text-white hover:shadow-md hover:shadow-purple-500/50 hover:-translate-y-1"}`
            }>
              <span className="mr-1">🤖</span> Nyay Bot
            </NavLink>
            
            {/* Dropdown for Kanun Seekho */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('learn')}
              onMouseLeave={handleMouseLeave}
              ref={el => dropdownRefs.current['learn'] = el}
            >
              <button 
                onClick={() => toggleDropdown('learn')}
                className={`flex items-center text-lg font-medium transition-all duration-300 px-3 py-2 mx-1 rounded-lg ${openDropdown === 'learn' || hoverDropdown === 'learn' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/50' : 'text-gray-200 hover:bg-purple-600 hover:text-white hover:shadow-md hover:shadow-purple-500/50 hover:-translate-y-1'}`}
              >
                <span className="mr-1">📘</span> Kanun Seekho 
                <FaCaretDown className={`ml-1 transition-transform duration-300 ${openDropdown === 'learn' || hoverDropdown === 'learn' ? 'rotate-180' : ''}`} />
              </button>
              {(hoverDropdown === 'learn' || openDropdown === 'learn') && (
                <div className="absolute left-0 mt-1 w-64 bg-gray-900 bg-opacity-95 rounded-lg shadow-lg z-100 border border-purple-500 backdrop-blur-sm animate-fadeIn transform origin-top">
                  <NavLink to="/kanun-seekho/sawal-jawab" className={({ isActive }) =>
                    `flex items-center text-base font-medium transition-all duration-300 px-4 py-3 hover:bg-indigo-600 text-gray-200 hover:text-white hover:pl-6 ${isActive ? "bg-indigo-700" : ""} rounded-t-lg`
                  }>
                    <span className="mr-2">🧠</span> Sawal-Jawab
                  </NavLink>
                  <NavLink to="/kanun-seekho/scenarios" className={({ isActive }) =>
                    `flex items-center text-base font-medium transition-all duration-300 px-4 py-3 hover:bg-indigo-600 text-gray-200 hover:text-white hover:pl-6 ${isActive ? "bg-indigo-700" : ""}`
                  }>
                    <span className="mr-2">🏛️</span> Haq Ki Kahaniyaan
                  </NavLink>
                
                </div>
              )}
            </div>
            
            {/* Dropdown for Kanooni Madad */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('help')}
              onMouseLeave={handleMouseLeave}
              ref={el => dropdownRefs.current['help'] = el}
            >
              <button 
                onClick={() => toggleDropdown('help')}
                className={`flex items-center text-lg font-medium transition-all duration-300 px-3 py-2 mx-1 rounded-lg ${openDropdown === 'help' || hoverDropdown === 'help' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/50' : 'text-gray-200 hover:bg-purple-600 hover:text-white hover:shadow-md hover:shadow-purple-500/50 hover:-translate-y-1'}`}
              >
                <span className="mr-1">🆘</span> Kanooni Madad 
                <FaCaretDown className={`ml-1 transition-transform duration-300 ${openDropdown === 'help' || hoverDropdown === 'help' ? 'rotate-180' : ''}`} />
              </button>
              {(hoverDropdown === 'help' || openDropdown === 'help') && (
                <div className="absolute left-0 mt-1 w-64 bg-gray-900 bg-opacity-95 rounded-lg shadow-lg z-10 border border-purple-500 backdrop-blur-sm animate-fadeIn transform origin-top">
                  <NavLink to="/kanooni-madad/lawyers" className={({ isActive }) =>
                    `flex items-center text-base font-medium transition-all duration-300 px-4 py-3 hover:bg-indigo-600 text-gray-200 hover:text-white hover:pl-6 ${isActive ? "bg-indigo-700" : ""} rounded-t-lg`
                  }>
                    <span className="mr-2">👨‍⚖️</span> Vakil Khojo
                  </NavLink>
                
                  <NavLink to="/kanooni-madad/aid" className={({ isActive }) =>
                    `flex items-center text-base font-medium transition-all duration-300 px-4 py-3 hover:bg-indigo-600 text-gray-200 hover:text-white hover:pl-6 ${isActive ? "bg-indigo-700" : ""} rounded-b-lg`
                  }>
                    <span className="mr-2">🧾</span> Muft Madad / NGO Help
                  </NavLink>
                </div>
              )}
            </div>
            
            {/* Dropdown for Kanooni Khabrein */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('news')}
              onMouseLeave={handleMouseLeave}
              ref={el => dropdownRefs.current['news'] = el}
            >
              <button 
                onClick={() => toggleDropdown('news')}
                className={`flex items-center text-lg font-medium transition-all duration-300 px-3 py-2 mx-1 rounded-lg ${openDropdown === 'news' || hoverDropdown === 'news' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/50' : 'text-gray-200 hover:bg-purple-600 hover:text-white hover:shadow-md hover:shadow-purple-500/50 hover:-translate-y-1'}`}
              >
                <span className="mr-1">📰</span> Kanooni Khabrein 
                <FaCaretDown className={`ml-1 transition-transform duration-300 ${openDropdown === 'news' || hoverDropdown === 'news' ? 'rotate-180' : ''}`} />
              </button>
              {(hoverDropdown === 'news' || openDropdown === 'news') && (
                <div className="absolute left-0 mt-1 w-64 bg-gray-900 bg-opacity-95 rounded-lg shadow-lg z-10 border border-purple-500 backdrop-blur-sm animate-fadeIn transform origin-top">
                  <NavLink to="/kanooni-khabrein/laws" className={({ isActive }) =>
                    `flex items-center text-base font-medium transition-all duration-300 px-4 py-3 hover:bg-indigo-600 text-gray-200 hover:text-white hover:pl-6 ${isActive ? "bg-indigo-700" : ""} rounded-t-lg`
                  }>
                    <span className="mr-2">📜</span> Naye Kanoon
                  </NavLink>
                  <NavLink to="/kanooni-khabrein/rulings" className={({ isActive }) =>
                    `flex items-center text-base font-medium transition-all duration-300 px-4 py-3 hover:bg-indigo-600 text-gray-200 hover:text-white hover:pl-6 ${isActive ? "bg-indigo-700" : ""}`
                  }>
                    <span className="mr-2">🧾</span> Court Ke Faisle
                  </NavLink>
                  <NavLink to="/kanooni-khabrein/schemes" className={({ isActive }) =>
                    `flex items-center text-base font-medium transition-all duration-300 px-4 py-3 hover:bg-indigo-600 text-gray-200 hover:text-white hover:pl-6 ${isActive ? "bg-indigo-700" : ""} rounded-b-lg`
                  }>
                    <span className="mr-2">🏛️</span> Sarkari Yojnaayein
                  </NavLink>
                </div>
              )}
            </div>
            
            <NavLink to="/videos" className={({ isActive }) =>
              `flex items-center text-lg font-medium transition-all duration-300 px-3 py-2 mx-1 rounded-lg ${isActive ? "bg-pink-600 text-white shadow-lg shadow-pink-500/50" : "text-gray-200 hover:bg-purple-600 hover:text-white hover:shadow-md hover:shadow-purple-500/50 hover:-translate-y-1"}`
            }>
              <span className="mr-1">🎥</span> Videos Dekho
            </NavLink>
            <NavLink to="/community" className={({ isActive }) =>
              `flex items-center text-lg font-medium transition-all duration-300 px-3 py-2 mx-1 rounded-lg ${isActive ? "bg-pink-600 text-white shadow-lg shadow-pink-500/50" : "text-gray-200 hover:bg-purple-600 hover:text-white hover:shadow-md hover:shadow-purple-500/50 hover:-translate-y-1"}`
            }>
              <span className="mr-1">🧑‍🤝‍🧑</span> Nyay Samuday
            </NavLink>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden py-4 overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <div className="flex flex-col">
              <NavLink to="/" className={({ isActive }) =>
                `flex items-center text-lg font-medium py-2 px-4 my-1 rounded transition-all duration-300 ${isActive ? "bg-pink-600 text-white shadow-md shadow-pink-500/30" : "text-gray-200 hover:bg-purple-600 hover:pl-6"}`
              } onClick={toggleMenu}>
                <span className="mr-2">🏠</span> Home
              </NavLink>
              <NavLink to="/aapke-adhikar" className={({ isActive }) =>
                `flex items-center text-lg font-medium py-2 px-4 my-1 rounded transition-all duration-300 ${isActive ? "bg-pink-600 text-white shadow-md shadow-pink-500/30" : "text-gray-200 hover:bg-purple-600 hover:pl-6"}`
              } onClick={toggleMenu}>
                <span className="mr-2">⚖️</span> Aapke Adhikar
              </NavLink>
              <NavLink to="/nyay-bot" className={({ isActive }) =>
                `flex items-center text-lg font-medium py-2 px-4 my-1 rounded transition-all duration-300 ${isActive ? "bg-pink-600 text-white shadow-md shadow-pink-500/30" : "text-gray-200 hover:bg-purple-600 hover:pl-6"}`
              } onClick={toggleMenu}>
                <span className="mr-2">🤖</span> Nyay Bot
              </NavLink>
              
              {/* Kanun Seekho Section */}
              <button 
                onClick={() => toggleDropdown('learn')}
                className={`flex items-center justify-between text-lg font-medium py-2 px-4 my-1 text-gray-200 hover:bg-purple-600 rounded transition-all duration-300 ${openDropdown === 'learn' ? 'bg-purple-700' : ''}`}
              >
                <div className="flex items-center">
                  <span className="mr-2">📘</span> Kanun Seekho
                </div>
                <FaCaretDown className={`transition-transform duration-300 ${openDropdown === 'learn' ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`bg-gray-800 pl-8 overflow-hidden transition-max-height duration-500 ease-in-out ${openDropdown === 'learn' ? 'max-h-screen' : 'max-h-0'}`}>
                <NavLink to="/kanun-seekho/sawal-jawab" className={({ isActive }) =>
                  `flex items-center text-base font-medium py-2 px-4 my-1 rounded transition-all duration-300 ${isActive ? "bg-indigo-700 text-white" : "text-gray-200 hover:bg-indigo-600 hover:pl-6"}`
                } onClick={toggleMenu}>
                  <span className="mr-2">🧠</span> Sawal-Jawab
                </NavLink>
                <NavLink to="/kanun-seekho/scenarios" className={({ isActive }) =>
                  `flex items-center text-base font-medium py-2 px-4 my-1 rounded transition-all duration-300 ${isActive ? "bg-indigo-700 text-white" : "text-gray-200 hover:bg-indigo-600 hover:pl-6"}`
                } onClick={toggleMenu}>
                  <span className="mr-2">🏛️</span> Haq Ki Kahaniyaan
                </NavLink>
                <NavLink to="/kanun-seekho/gamified" className={({ isActive }) =>
                  `flex items-center text-base font-medium py-2 px-4 my-1 rounded transition-all duration-300 ${isActive ? "bg-indigo-700 text-white" : "text-gray-200 hover:bg-indigo-600 hover:pl-6"}`
                } onClick={toggleMenu}>
                  <span className="mr-2">🎮</span> Khel Ke Saath Seekho
                </NavLink>
              </div>
              
              {/* Kanooni Madad Section */}
              <button 
                onClick={() => toggleDropdown('help')}
                className={`flex items-center justify-between text-lg font-medium py-2 px-4 my-1 text-gray-200 hover:bg-purple-600 rounded transition-all duration-300 ${openDropdown === 'help' ? 'bg-purple-700' : ''}`}
              >
                <div className="flex items-center">
                  <span className="mr-2">🆘</span> Kanooni Madad
                </div>
                <FaCaretDown className={`transition-transform duration-300 ${openDropdown === 'help' ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`bg-gray-800 pl-8 overflow-hidden transition-max-height duration-500 ease-in-out ${openDropdown === 'help' ? 'max-h-screen' : 'max-h-0'}`}>
                <NavLink to="/kanooni-madad/lawyers" className={({ isActive }) =>
                  `flex items-center text-base font-medium py-2 px-4 my-1 rounded transition-all duration-300 ${isActive ? "bg-indigo-700 text-white" : "text-gray-200 hover:bg-indigo-600 hover:pl-6"}`
                } onClick={toggleMenu}>
                  <span className="mr-2">👨‍⚖️</span> Vakil Khojo
                </NavLink>
                <NavLink to="/kanooni-madad/courts" className={({ isActive }) =>
                  `flex items-center text-base font-medium py-2 px-4 my-1 rounded transition-all duration-300 ${isActive ? "bg-indigo-700 text-white" : "text-gray-200 hover:bg-indigo-600 hover:pl-6"}`
                } onClick={toggleMenu}>
                  <span className="mr-2">🏢</span> Najdeeki Court
                </NavLink>
                <NavLink to="/kanooni-madad/aid" className={({ isActive }) =>
                  `flex items-center text-base font-medium py-2 px-4 my-1 rounded transition-all duration-300 ${isActive ? "bg-indigo-700 text-white" : "text-gray-200 hover:bg-indigo-600 hover:pl-6"}`
                } onClick={toggleMenu}>
                  <span className="mr-2">🧾</span> Muft Madad / NGO Help
                </NavLink>
              </div>
              
              {/* Kanooni Khabrein Section */}
              <button 
                onClick={() => toggleDropdown('news')}
                className={`flex items-center justify-between text-lg font-medium py-2 px-4 my-1 text-gray-200 hover:bg-purple-600 rounded transition-all duration-300 ${openDropdown === 'news' ? 'bg-purple-700' : ''}`}
              >
                <div className="flex items-center">
                  <span className="mr-2">📰</span> Kanooni Khabrein
                </div>
                <FaCaretDown className={`transition-transform duration-300 ${openDropdown === 'news' ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`bg-gray-800 pl-8 overflow-hidden transition-max-height duration-500 ease-in-out ${openDropdown === 'news' ? 'max-h-screen' : 'max-h-0'}`}>
                <NavLink to="/kanooni-khabrein/laws" className={({ isActive }) =>
                  `flex items-center text-base font-medium py-2 px-4 my-1 rounded transition-all duration-300 ${isActive ? "bg-indigo-700 text-white" : "text-gray-200 hover:bg-indigo-600 hover:pl-6"}`
                } onClick={toggleMenu}>
                  <span className="mr-2">📜</span> Naye Kanoon
                </NavLink>
                <NavLink to="/kanooni-khabrein/rulings" className={({ isActive }) =>
                  `flex items-center text-base font-medium py-2 px-4 my-1 rounded transition-all duration-300 ${isActive ? "bg-indigo-700 text-white" : "text-gray-200 hover:bg-indigo-600 hover:pl-6"}`
                } onClick={toggleMenu}>
                  <span className="mr-2">🧾</span> Court Ke Faisle
                </NavLink>
                <NavLink to="/kanooni-khabrein/schemes" className={({ isActive }) =>
                  `flex items-center text-base font-medium py-2 px-4 my-1 rounded transition-all duration-300 ${isActive ? "bg-indigo-700 text-white" : "text-gray-200 hover:bg-indigo-600 hover:pl-6"}`
                } onClick={toggleMenu}>
                  <span className="mr-2">🏛️</span> Sarkari Yojnaayein
                </NavLink>
              </div>
              
              <NavLink to="/videos" className={({ isActive }) =>
                `flex items-center text-lg font-medium py-2 px-4 my-1 rounded transition-all duration-300 ${isActive ? "bg-pink-600 text-white shadow-md shadow-pink-500/30" : "text-gray-200 hover:bg-purple-600 hover:pl-6"}`
              } onClick={toggleMenu}>
                <span className="mr-2">🎥</span> Videos Dekho
              </NavLink>
              <NavLink to="/community" className={({ isActive }) =>
                `flex items-center text-lg font-medium py-2 px-4 my-1 rounded transition-all duration-300 ${isActive ? "bg-pink-600 text-white shadow-md shadow-pink-500/30" : "text-gray-200 hover:bg-purple-600 hover:pl-6"}`
              } onClick={toggleMenu}>
                <span className="mr-2">🧑‍🤝‍🧑</span> Nyay Samuday
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}