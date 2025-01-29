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
          <h1>X-Social</h1>
        </Link>
        <nav>
          <ul className="nav-links">
            {isAuthenticated ? (
              <>
                <li><Link to="/posts">Posts</Link></li>
                <li><Link to="/profile">Profil</Link></li>
                <li><Link to="/messages">Messages</Link></li>
                <li><button className="logout-btn" onClick={handleLogout}>Déconnexion</button></li>
              </>
            ) : (
              <>
                <li><button className="login-btn"><Link to="/login">Connexion</Link></button></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
