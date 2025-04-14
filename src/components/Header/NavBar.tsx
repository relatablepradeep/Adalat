import { Link, NavLink } from 'react-router';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'; // Importing social media icons

export default function NavBar() {
  return (
    <div className="w-full">
      {/* Top content (other content on your page) */}
      <div className="flex-grow"></div> {/* This ensures the navbar stays at the bottom */}

      {/* Bottom Navbar - Fixed */}
      <div className="w-full fixed bottom-0 flex flex-col bg-white shadow-lg">
        {/* Navbar links */}
        <div className="w-full flex justify-center gap-6 px-6 py-4 bg-white shadow-sm">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}>
            Home
          </NavLink>

          <NavLink to="/rights" className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}>
            Know Rights
          </NavLink>

          <NavLink to="/askai" className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}>
            Ask AI
          </NavLink>

          <NavLink to="/learn" className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}>
            Learn Law
          </NavLink>

          <NavLink to="/help" className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}>
            Legal Help
          </NavLink>

          <NavLink to="/news" className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}>
            Legal News
          </NavLink>

          <NavLink to="/community" className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}>
            Community
          </NavLink>
        </div>

        {/* Bottom Logo and Name */}
        <div className="w-full flex justify-between items-center py-6 bg-gray-50 px-6">
          {/* Centered Logo and Name */}
          <div className="flex-grow flex justify-center items-center gap-3">
            <img src="/logo.png" alt="logo" className="h-12 w-12" />
            <Link to="/" className="text-3xl font-bold text-gray-800">Adalat</Link>
          </div>

          {/* Social Media Icons - Right corner */}
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-xl text-gray-700 hover:text-blue-600" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-xl text-gray-700 hover:text-black" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-xl text-gray-700 hover:text-blue-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
