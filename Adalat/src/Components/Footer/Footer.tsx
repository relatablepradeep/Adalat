import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowUp, FaHeart } from 'react-icons/fa';
import Logo from './Logo-removebg-preview.png';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="mt-auto w-full">
      {/* Curved divider */}
      {/* <div className="relative w-full overflow-hidden leading-0">
        <svg className="relative block w-full h-12" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-gray-900"></path>
        </svg>
      </div> */}

      {/* Main Footer Content */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white pt-12 pb-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and About Section */}
            <div className="space-y-4 transform hover:scale-105 transition-transform duration-300">
              <Link to="/" className="flex items-center">
                <img 
                  className="h-16 w-24 sm:h-20 sm:w-28 md:h-24 md:w-32 mr-2 drop-shadow-lg" 
                  src={Logo} 
                  alt="Adalat-logo" 
                />
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wider">Adalat</h2>
              </Link>
              <p className="text-cyan-200 mt-2 text-sm sm:text-base">
                Empowering legal literacy for everyone. Our mission is to make legal knowledge accessible and understandable to all citizens.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"
                  className="bg-gray-900 bg-opacity-30 p-2 rounded-full text-cyan-300 hover:text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                  <FaLinkedin className="text-lg sm:text-xl" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                  className="bg-gray-900 bg-opacity-30 p-2 rounded-full text-cyan-300 hover:text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                  <FaGithub className="text-lg sm:text-xl" />
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer"
                  className="bg-gray-900 bg-opacity-30 p-2 rounded-full text-cyan-300 hover:text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                  <FaTwitter className="text-lg sm:text-xl" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-white border-b-2 border-pink-400 pb-2 inline-block">
                Turant Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/laws" className="text-cyan-200 hover:text-white hover:translate-x-2 transform transition-all duration-300 flex items-center text-sm sm:text-base">
                    <span className="mr-2">⚖️</span> Aapke Adhikar
                  </Link>
                </li>
                <li>
                  <Link to="/nyay-bot" className="text-cyan-200 hover:text-white hover:translate-x-2 transform transition-all duration-300 flex items-center text-sm sm:text-base">
                    <span className="mr-2">🤖</span> Nyay Bot
                  </Link>
                </li>
                <li>
                  <Link to="/kanun-seekho/sawal-jawab" className="text-cyan-200 hover:text-white hover:translate-x-2 transform transition-all duration-300 flex items-center text-sm sm:text-base">
                    <span className="mr-2">🧠</span> Sawal-Jawab
                  </Link>
                </li>
                <li>
                  <Link to="/videos" className="text-cyan-200 hover:text-white hover:translate-x-2 transform transition-all duration-300 flex items-center text-sm sm:text-base">
                    <span className="mr-2">🎥</span> Videos Dekho
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="text-cyan-200 hover:text-white hover:translate-x-2 transform transition-all duration-300 flex items-center text-sm sm:text-base">
                    <span className="mr-2">🧑‍🤝‍🧑</span> Nyay Samuday
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Resources */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-white border-b-2 border-pink-400 pb-2 inline-block">
                Kanooni Sansadhan
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/kanooni-madad/lawyers" className="text-cyan-200 hover:text-white hover:translate-x-2 transform transition-all duration-300 flex items-center text-sm sm:text-base">
                    <span className="mr-2">👨‍⚖️</span> Vakil Khojo
                  </Link>
                </li>
                <li>
                  <Link to="/kanooni-madad/courts" className="text-cyan-200 hover:text-white hover:translate-x-2 transform transition-all duration-300 flex items-center text-sm sm:text-base">
                    <span className="mr-2">🏢</span> Najdeeki Court
                  </Link>
                </li>
                <li>
                  <Link to="/kanooni-madad/aid" className="text-cyan-200 hover:text-white hover:translate-x-2 transform transition-all duration-300 flex items-center text-sm sm:text-base">
                    <span className="mr-2">🧾</span> Muft Madad
                  </Link>
                </li>
                <li>
                  <Link to="/kanooni-khabrein/laws" className="text-cyan-200 hover:text-white hover:translate-x-2 transform transition-all duration-300 flex items-center text-sm sm:text-base">
                    <span className="mr-2">📜</span> Naye Kanoon
                  </Link>
                </li>
                <li>
                  <Link to="/kanooni-khabrein/schemes" className="text-cyan-200 hover:text-white hover:translate-x-2 transform transition-all duration-300 flex items-center text-sm sm:text-base">
                    <span className="mr-2">🏛️</span> Sarkari Yojnaayein
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-white border-b-2 border-pink-400 pb-2 inline-block">
                Sampark Karein
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-cyan-200 group">
                  <FaMapMarkerAlt className="mr-3 text-pink-400 group-hover:scale-125 transition-transform duration-300" />
                  <p className="group-hover:text-white transition-colors duration-300 text-sm sm:text-base">
                    123 Legal Avenue, Delhi, India 110001
                  </p>
                </div>
                <div className="flex items-center text-cyan-200 group">
                  <FaPhone className="mr-3 text-pink-400 group-hover:scale-125 transition-transform duration-300" />
                  <a href="tel:+911234567890" className="group-hover:text-white transition-colors duration-300 text-sm sm:text-base">
                    +91 12345 67890
                  </a>
                </div>
                <div className="flex items-center text-cyan-200 group">
                  <FaEnvelope className="mr-3 text-pink-400 group-hover:scale-125 transition-transform duration-300" />
                  <a href="mailto:info@adalat.org" className="group-hover:text-white transition-colors duration-300 text-sm sm:text-base">
                    info@adalat.org
                  </a>
                </div>
                <div className="mt-6">
                  <Link to="/contact" className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50 inline-flex items-center text-sm sm:text-base">
                    <span>Sandesh Bhejein</span>
                    <FaEnvelope className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="mt-10 bg-gray-900 bg-opacity-30 p-4 sm:p-6 rounded-xl shadow-lg">
            <div className="text-center md:flex md:items-center md:justify-between">
              <div className="md:text-left mb-4 md:mb-0">
                <h3 className="text-lg sm:text-xl font-bold text-white">Niyamit Updates Prapt Karein</h3>
                <p className="text-cyan-200 mt-1 text-sm sm:text-base">
                  Naye kanoon aur adhikaron ke baare mein jaankaari paane ke liye subscribe karein.
                </p>
              </div>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Aapka Email"
                  className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gray-800 text-white border border-gray-700 text-sm sm:text-base"
                  required
                />
                <button
                  type="submit"
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50 text-sm sm:text-base"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Copyright & Policy Links */}
          <div className="mt-8 pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-cyan-200 mb-4 md:mb-0 text-sm sm:text-base text-center md:text-left">
              © {year} Adalat. <span className="inline-flex items-center">Made with <FaHeart className="text-pink-500 mx-1 animate-pulse" /> in India</span>
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-2 sm:gap-4 text-xs sm:text-sm">
              <Link to="/terms" className="text-cyan-200 hover:text-white transition-colors duration-300">
                Terms of Use
              </Link>
              <Link to="/privacy" className="text-cyan-200 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/disclaimer" className="text-cyan-200 hover:text-white transition-colors duration-300">
                Legal Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 p-2 sm:p-3 rounded-full bg-pink-600 text-white shadow-lg z-50 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-300 transform hover:scale-110 animate-fadeIn"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-sm sm:text-base" />
        </button>
      )}
    </footer>
  );
}