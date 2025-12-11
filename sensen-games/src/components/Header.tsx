import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext'; // Import useSettings

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings, loading, error } = useSettings(); // Use settings context

  if (loading) return null; // Or a loading spinner
  if (error) return null; // Or an error message
  if (!settings) return null; // Should not happen if backend creates default

  return (
    <header
      className="fixed top-0 left-0 right-0 z-10"
      style={{
        backgroundColor: `var(--header-background-color)`,
        color: `var(--general-text-color)`,
      }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="text-2xl font-bold flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img src={'http://localhost:3001' + settings.logoUrl} alt={settings.siteName} className="h-10 w-10 rounded-full" />
            <span>{settings.siteName}</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="hover:text-gray-400">
                INÍCIO
              </Link>
            </li>
            <li>
              <Link to="/catalog" className="hover:text-gray-400">
                JOGOS
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-400">
                SOBRE
              </Link>
            </li>
          </ul>
          <button className="hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/55 -mt-2">
          <ul className="flex flex-col items-center space-y-4 p-2">
            <li>
              <Link to="/" className="hover:text-gray-400" onClick={() => setIsMenuOpen(false)}>
                INÍCIO
              </Link>
            </li>
            <li>
              <Link to="/catalog" className="hover:text-gray-400" onClick={() => setIsMenuOpen(false)}>
                JOGOS
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-400" onClick={() => setIsMenuOpen(false)}>
                SOBRE
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
