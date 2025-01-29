import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice/authSlice';
import '../assets/styles/pages/auth.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login(formData));
      console.log('result:', result);
      if (result) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Connexion</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button 
            type="submit" 
            className="auth-button" 
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Connexion...' : 'Se connecter'}

          </button>
        </form>
        <p className="auth-link">
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
