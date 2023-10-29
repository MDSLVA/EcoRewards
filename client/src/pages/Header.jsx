import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import Auth from '../utils/auth';  

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = Auth.loggedIn();

  const handleSignOut = () => {
    Auth.logout();
    navigate('/');  
  };

  return (
    <header>
      <nav className="header-nav">
        <span className="logo-container">
          <Link to="/" className="logo">💰 EcoRewards 🐢</Link>
        </span>
        <ul className="nav-links">
          {isLoggedIn && (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/community">Community Board</Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <li>
              <a href="#" onClick={handleSignOut}>Sign Out</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;