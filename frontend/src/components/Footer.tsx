import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="container">
        
        {/* AdSense Placeholder */}
        <div className="adsense-banner">
          Google AdSense Banner Placeholder
        </div>

        {/* Top Feature Bar */}
        <div className="feature-bar">
          <Link to="/" className="feature-link">SQL+ PLUS</Link>
          <Link to="/" className="feature-link">SPACES</Link>
          <Link to="/" className="feature-link">GET CERTIFIED</Link>
          <Link to="/" className="feature-link">FOR SCHOOLS</Link>
          <Link to="/tutorials" className="feature-link">BOOTCAMPS</Link>
          <Link to="/contact" className="feature-link">CONTACT US</Link>
        </div>

        {/* Links Grid */}
        <div className="links-grid">
          
          <div className="link-group">
            <h4>Top Challenges</h4>
            <ul className="link-list">
              <li><Link to="/" className="footer-link">Basic Selects</Link></li>
              <li><Link to="/" className="footer-link">Advanced Joins</Link></li>
              <li><Link to="/" className="footer-link">Aggregation Tasks</Link></li>
              <li><Link to="/" className="footer-link">Subquery Mastery</Link></li>
              <li><Link to="/" className="footer-link">Window Functions</Link></li>
              <li><Link to="/" className="footer-link">CTE Challenges</Link></li>
              <li><Link to="/" className="footer-link">DB Design Levels</Link></li>
            </ul>
          </div>

          <div className="link-group">
            <h4>SQL References</h4>
            <ul className="link-list">
              <li><Link to="/tutorials" className="footer-link">Syntax Reference</Link></li>
              <li><Link to="/tutorials" className="footer-link">Data Types</Link></li>
              <li><Link to="/tutorials" className="footer-link">PostgreSQL Functions</Link></li>
              <li><Link to="/tutorials" className="footer-link">Join Types Explained</Link></li>
              <li><Link to="/tutorials" className="footer-link">Constraint Guide</Link></li>
              <li><Link to="/tutorials" className="footer-link">Indexing Basics</Link></li>
              <li><Link to="/tutorials" className="footer-link">Query Optimization</Link></li>
            </ul>
          </div>

          <div className="link-group">
            <h4>Learning Paths</h4>
            <ul className="link-list">
              <li><Link to="/tutorials" className="footer-link">SQL for Data Science</Link></li>
              <li><Link to="/tutorials" className="footer-link">Backend Engineering</Link></li>
              <li><Link to="/tutorials" className="footer-link">Analyst Bootcamp</Link></li>
              <li><Link to="/tutorials" className="footer-link">DBA Fundamentals</Link></li>
              <li><Link to="/tutorials" className="footer-link">Python & SQL</Link></li>
              <li><Link to="/tutorials" className="footer-link">Excel to SQL</Link></li>
            </ul>
          </div>

          <div className="link-group">
            <h4>Get Certified</h4>
            <ul className="link-list">
              <li><Link to="/" className="footer-link">SQL Associate Cert</Link></li>
              <li><Link to="/" className="footer-link">Data Engineer Cert</Link></li>
              <li><Link to="/" className="footer-link">Analytics Professional</Link></li>
              <li><Link to="/" className="footer-link">Backend Specialist</Link></li>
              <li><Link to="/" className="footer-link">Database Security Cert</Link></li>
            </ul>
          </div>

        </div>

        {/* Refined Modern Bottom Navigation */}
        <div className="bottom-nav">
          {[
            { label: 'BLOG', to: '/blog' },
            { label: 'ABOUT', to: '/about' },
            { label: 'ACADEMY', to: '/tutorials' },
            { label: 'PRIVACY', to: '/privacy' },
            { label: 'TERMS', to: '/terms' },
            { label: 'CONTACT US', to: '/contact' }
          ].map((link) => (
            <Link 
              key={link.label}
              to={link.to} 
              className="bottom-link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Legal Text */}
        <div className="legal-section">
          <p>
            SQLForge is optimized for hands-on learning and practical database training. <Link to="/levels-guide" className="highlight-link">Learn how our challenges work</Link>.
          </p>
          <p>
            Tutorials and challenges are constantly reviewed for accuracy, but we cannot warrant full correctness of all code execution environments. 
            By using SQLForge, you agree to our terms of use, cookie policy, and privacy settings.
          </p>
          <p className="copyright">
            Copyright 1999-{currentYear} by SQLForge Data. All Rights Reserved. Powered by SQLForge UI.
          </p>
        </div>

      </div>
    </footer>
  );
}

