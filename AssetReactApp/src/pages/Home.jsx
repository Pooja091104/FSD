import "../components/Styles/Home.css";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="home-container">
        <div className="hero-section">
          <h1>Asset Management System</h1>
          <p>
            Track, manage and monitor company assets efficiently with our
            centralized platform.
          </p>

         
        </div>

        <div className="features">
          <div className="feature-card">
            <h3>📦 Asset Tracking</h3>
            <p>Manage all company assets in one place.</p>
          </div>

          <div className="feature-card">
            <h3>👨‍💼 Employee Requests</h3>
            <p>Employees can request and return assets easily.</p>
          </div>

          <div className="feature-card">
            <h3>📊 Analytics</h3>
            <p>Generate reports and monitor asset usage.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;