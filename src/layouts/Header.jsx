import { Link } from 'react-router-dom';
import '../assets/styles/layouts/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>X-Social</h1>
        </Link>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/profile">Profil</Link></li>
            <li><Link to="/messages">Messages</Link></li>
            <li><button className="login-btn"><Link to="/login">Connexion</Link></button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
