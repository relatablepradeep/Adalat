import { Link, NavLink } from 'react-router';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'; // Importing social media icons

export default function NavBar() {
  return (
    <>
      {/* Fixed Top Navbar */}
      <div className="w-full fixed top-0 bg-white shadow-lg z-50">
        {/* Top Logo and Name Section */}
        <div className="flex justify-between items-center py-4 px-6 bg-gray-50">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="h-10 w-10" />
            <Link to="/" className="text-2xl font-bold text-gray-800">Adalat</Link>
          </div>

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

        {/* Nav Links Section */}
        <div className="w-full flex justify-center gap-6 px-6 py-2 bg-white shadow-sm">
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
      </div>

      {/* Add margin to offset the height of fixed navbar */}
      <div className="h-28" /> {/* Adjust height if your navbar is taller or shorter */}
    </>
  );
}
