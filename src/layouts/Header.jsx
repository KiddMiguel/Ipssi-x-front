import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice/authSlice";
import "../assets/styles/layouts/Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(isAuthenticated);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>X-Social</h1>
        </Link>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/profile">Profil</Link>
            </li>
            <li>
              <Link to="/messages">Messages</Link>
            </li>
            {isAuthenticated ? (
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Déconnexion
                </button>
              </li>
            ) : (
              <li>
                <button className="login-btn">
                  <Link to="/login">Connexion</Link>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
