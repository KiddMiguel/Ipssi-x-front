import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice/authSlice';
import '../assets/styles/layouts/Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <svg viewBox="0 0 24 24" className="twitter-icon">
            <path fill="currentColor" d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
          </svg>
        </Link>
        <nav className="nav-menu">
          {isAuthenticated ? (
            <ul className="nav-links">
              <li>
                <Link to="/" className="nav-link">
                  <i className="fas fa-home"></i>
                  <span>Accueil</span>
                </Link>
              </li>
              <li>
                <Link to="/posts" className="nav-link">
                  <i className="fas fa-hashtag"></i>
                  <span>Explorer</span>
                </Link>
              </li>
              <li>
                <Link to="/messages" className="nav-link">
                  <i className="fas fa-envelope"></i>
                  <span>Messages</span>
                </Link>
              </li>
            </ul>
          ) : null}
        </nav>
        <div className="header-right">
          {isAuthenticated ? (
            <div className="user-menu">
              <div className="user-info">
                <div className="user-avatar">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span className="username">@{user?.username}</span>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Déconnexion</span>
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Connexion</Link>
              <Link to="/register" className="register-btn">S'inscrire</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
