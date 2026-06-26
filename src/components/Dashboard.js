import React, { useState } from 'react';
import './Dashboard.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const discoverNav = [
    { to: '/home',   icon: 'fas fa-house', label: 'Home' },
    { to: '/movies', icon: 'fas fa-film', label: 'Movies' },
    { to: '/trend',  icon: 'fas fa-fire', label: 'Trending' },
    { to: '/news',   icon: 'fas fa-newspaper', label: 'News' },
  ];

  const creatorNav = [
    { to: '/upload', icon: 'fas fa-cloud-arrow-up', label: 'Upload Video' },
  ];

  const supportNav = [
    { to: '/help',     icon: 'fas fa-circle-question', label: 'Help' },
    { to: '/feedback', icon: 'fas fa-comment-dots', label: 'Feedback' },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    toast.success('Logout successful');
    navigate('/');
  };

  const NavItem = ({ to, icon, label }) => (
    <Link to={to} className={`sidebar-nav-link ${isActive(to) ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
      <span className="sidebar-nav-icon-container">
        <i className={icon}></i>
      </span>
      <span className="sidebar-nav-label">{label}</span>
      <span className="sidebar-nav-dot"></span>
    </Link>
  );

  return (
    <div className="dashboard">
      {/* Mobile Toggle Button */}
      <button 
        className={`mobile-toggle-btn ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)} 
        aria-label="Toggle Sidebar"
      >
        <i className={`fas ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>

      {/* Backdrop overlay for closing on click outside (mobile) */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}

      <aside className={`side-bar ${isOpen ? 'mobile-open' : ''}`}>

        {/* Brand logo section */}
        <div className="sidebar-brand">
          <div className="brand-logo">
            <i className="fab fa-youtube"></i>
          </div>
          <div className="brand-text">
            <span className="brand-name">StreamHub</span>
            <span className="brand-sub">Media Platform</span>
          </div>
        </div>

        {/* Navigation Categories */}
        <div className="sidebar-scroll-container">
          <p className="sidebar-nav-category">Discover</p>
          <nav className="sidebar-nav-links">
            {discoverNav.map(item => <NavItem key={item.to} {...item} />)}
          </nav>

          <div className="sidebar-nav-divider"></div>

          <p className="sidebar-nav-category">Creator</p>
          <nav className="sidebar-nav-links">
            {creatorNav.map(item => <NavItem key={item.to} {...item} />)}
          </nav>

          <div className="sidebar-nav-divider"></div>

          <p className="sidebar-nav-category">Support</p>
          <nav className="sidebar-nav-links">
            {supportNav.map(item => <NavItem key={item.to} {...item} />)}
          </nav>
        </div>

        <div className="sidebar-spacer"></div>

        {/* User profile dock */}
        <div className="sidebar-user-card">
          <div className="user-avatar">
            <i className="fas fa-user"></i>
            <span className="user-online-dot"></span>
          </div>
          <div className="user-info">
            <span className="user-name">My Account</span>
            <span className="user-status">Online</span>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <i className="fas fa-arrow-right-from-bracket"></i>
          </button>
        </div>

      </aside>

      <div className="main-content">{children}</div>
    </div>
  );
};

export default Dashboard;

