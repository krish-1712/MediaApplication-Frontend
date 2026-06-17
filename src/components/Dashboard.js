import './Dashboard.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const mainNav = [
    { to: '/home',   emoji: '🏠', label: 'Home'     },
    { to: '/movies', emoji: '🎬', label: 'Movies'   },
    { to: '/trend',  emoji: '🔥', label: 'Trending' },
    { to: '/news',   emoji: '📰', label: 'News'     },
  ];

  const supportNav = [
    { to: '/help',     emoji: '❓', label: 'Help'     },
    { to: '/feedback', emoji: '💬', label: 'Feedback' },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    toast.success('Logout successful');
    navigate('/');
  };

  const NavItem = ({ to, emoji, label }) => (
    <Link to={to} className={`nav-link ${isActive(to) ? 'active' : ''}`}>
      <span className="nav-emoji">{emoji}</span>
      <span className="nav-label">{label}</span>
      <span className="nav-dot"></span>
    </Link>
  );

  return (
    <div className="dashboard">
      <aside className="side-bar">

        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-logo">
            <i className="fab fa-youtube"></i>
          </div>
          <div className="brand-text">
            <span className="brand-name">StreamHub</span>
            <span className="brand-sub">Media Platform</span>
          </div>
        </div>

        {/* Main nav */}
        <p className="nav-category">Discover</p>
        <nav className="nav-links">
          {mainNav.map(item => <NavItem key={item.to} {...item} />)}
        </nav>

        {/* Divider */}
        <div className="nav-divider"></div>

        {/* Support nav */}
        <p className="nav-category">Support</p>
        <nav className="nav-links">
          {supportNav.map(item => <NavItem key={item.to} {...item} />)}
        </nav>

        <div className="sidebar-spacer"></div>

        {/* User dock */}
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
