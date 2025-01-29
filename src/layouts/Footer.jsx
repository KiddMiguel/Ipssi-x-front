import '../assets/styles/layouts/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>À propos</h4>
          <p>X-Social, votre plateforme de partage sociale</p>
        </div>
        <div className="footer-section">
          <h4>Liens rapides</h4>
          <ul>
            <li><a href="#">Conditions</a></li>
            <li><a href="#">Confidentialité</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Suivez-nous</h4>
          <div className="social-links">
            <a href="#">Twitter</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 X-Social. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
