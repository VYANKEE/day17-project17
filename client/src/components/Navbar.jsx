import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  // AGAR DASHBOARD PAR HAIN, TOH NAVBAR MAT DIKHAO
  if (location.pathname === '/dashboard') {
    return null;
  }

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1.5rem 4rem',
    alignItems: 'center',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 100,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)'
  };

  const logoStyle = {
    color: '#e50914',
    fontSize: '2rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    letterSpacing: '1px',
    textShadow: '0 0 20px rgba(229, 9, 20, 0.5)'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>PROJECT 17</Link>
      <div>
        <Link to="/login" className="btn-primary" style={{
          marginRight: '1rem', 
          background: 'transparent', 
          border: '1px solid white',
          padding: '0.8rem 1.5rem'
        }}>
          LOGIN
        </Link>
        <Link to="/register" className="btn-primary" style={{ padding: '0.8rem 1.5rem' }}>
          GET STARTED
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;