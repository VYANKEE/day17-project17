import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// --- NEW "HEAVY" LANDING PAGE ---
const LandingPage = () => {
  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      
      {/* BACKGROUND GRID (Tron Effect) */}
      <div className="cyber-grid"></div>

      {/* 1. HERO SECTION */}
      <section style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        paddingTop: '8rem', // Navbar ke liye space
        textAlign: 'center',
      }}>
        
        {/* Main Text */}
        <h1 className="text-gradient animate-slide-up" style={{ 
          fontSize: '6rem', 
          fontWeight: '900', 
          lineHeight: '1.1',
          marginBottom: '1.5rem',
          letterSpacing: '-2px'
        }}>
          PROJECT 17
        </h1>
        
        <p className="animate-slide-up" style={{ 
          fontSize: '1.5rem', 
          color: '#888', 
          maxWidth: '700px', 
          marginBottom: '3rem',
          animationDelay: '0.2s' 
        }}>
          Control your empire with the world's most advanced SaaS dashboard.
          <span style={{ color: '#fff', display: 'block', marginTop: '0.5rem' }}>Speed. Security. Scalability.</span>
        </p>

        <div className="animate-slide-up" style={{ animationDelay: '0.4s', marginBottom: '4rem' }}>
          <Link to="/register" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem' }}>
            Initialize System
          </Link>
        </div>
        
        {/* --- THE MOCK DASHBOARD (J.A.R.V.I.S Look) --- */}
        <div className="glass-card animate-float" style={{ 
          width: '90%', 
          maxWidth: '1000px', 
          height: '500px', 
          padding: '0', // Reset padding for inner layout
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(0,0,0,0.6)', // Darker for contrast
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 50px 100px -20px rgba(0,0,0,0.8)' // Deep shadow
        }}>
          
          {/* A. Browser Window Header (Mac Style) */}
          <div style={{ 
            height: '40px', 
            borderBottom: '1px solid rgba(255,255,255,0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            padding: '0 1.5rem',
            background: 'rgba(255,255,255,0.03)'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#666', fontFamily: 'monospace' }}>
              admin@project17.com ~ /dashboard
            </div>
          </div>

          {/* B. Dashboard Content */}
          <div style={{ flex: 1, display: 'flex' }}>
            
            {/* Sidebar */}
            <div style={{ 
              width: '200px', 
              borderRight: '1px solid rgba(255,255,255,0.1)', 
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div style={{ height: '10px', width: '60%', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}></div>
              <div style={{ height: '10px', width: '80%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
              <div style={{ height: '10px', width: '70%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
              <div style={{ height: '10px', width: '50%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
              
              <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(229, 9, 20, 0.1)', borderRadius: '8px', border: '1px solid rgba(229, 9, 20, 0.3)' }}>
                <p style={{ fontSize: '0.8rem', color: '#e50914', marginBottom: '0.5rem' }}>SYSTEM STATUS</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="status-dot"></div>
                  <span style={{ fontSize: '0.9rem', color: '#fff' }}>ONLINE</span>
                </div>
              </div>
            </div>

            {/* Main Area */}
            <div style={{ flex: 1, padding: '2rem' }}>
              
              {/* Stats Row */}
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                  <p style={{ color: '#888', fontSize: '0.9rem' }}>Total Users</p>
                  <h2 style={{ fontSize: '2rem' }}>14,205</h2>
                </div>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                  <p style={{ color: '#888', fontSize: '0.9rem' }}>Revenue</p>
                  <h2 style={{ fontSize: '2rem', color: '#00ff88' }}>$92,400</h2>
                </div>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                  <p style={{ color: '#888', fontSize: '0.9rem' }}>Server Load</p>
                  <h2 style={{ fontSize: '2rem', color: '#e50914' }}>12%</h2>
                </div>
              </div>

              {/* The "Heavy" Graph Section */}
              <div style={{ 
                height: '200px', 
                background: 'rgba(0,0,0,0.3)', 
                borderRadius: '12px', 
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '10px'
              }}>
                {/* Generating 20 animated bars */}
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="bar" style={{ flex: 1 }}></div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

// --- MAIN APP ---
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;