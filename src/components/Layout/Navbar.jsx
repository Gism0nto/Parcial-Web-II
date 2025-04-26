import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';
import { useState } from 'react';

function Navbar() {
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();
  const storedUser = localStorage.getItem('username');
  const [username, setUsername] = useState(storedUser);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(prev => !prev);
  };

  const onLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('searchTerm');
    localStorage.removeItem('selectedSpecies');
    setUsername(null);
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/characters">
            <span className="logo-text">FUTURAMA</span>
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/characters" className={location.pathname === '/characters' ? 'active' : ''}>Personajes</Link>
          <Link to="/form" className={location.pathname === '/form' ? 'active' : ''}>Formulario</Link>
          <Link to="/about"     className={location.pathname === '/about' ? 'active'     : ''}>About</Link>
          {username && (
            <div className="user-menu-container">
              <span className="user-name" onClick={toggleMenu}>
                {username} ⌄
              </span>
              {showMenu && (
                <div className="dropdown-menu">
                  <button onClick={onLogout}>Cerrar sesión</button>
                </div>
              )}
            </div>
          )}
          <button onClick={toggleTheme} className="theme-toggle">
            {darkMode ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
