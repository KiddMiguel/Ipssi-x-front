import "../assets/styles/pages/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenue sur X-Social</h1>
          <p>Connectez-vous avec vos amis et partagez vos moments</p>
          <button className="cta-button">
            <Link to="/register">Commencer</Link>
          </button>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Partage</h3>
          <p>Partagez vos moments importants</p>
        </div>
        <div className="feature-card">
          <h3>Connect</h3>
          <p>Restez en contact avec vos proches</p>
        </div>
        <div className="feature-card">
          <h3>Découvrez</h3>
          <p>Explorez de nouveaux contenus</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
