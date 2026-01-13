import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [premiumContent, setPremiumContent] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!storedUser || !token) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // 1. Secret Data Access Logic
  const accessPremium = async () => {
    setLoading(true);
    setErrorMsg('');
    setPremiumContent('');
    
    const token = localStorage.getItem('token');
    
    try {
      setTimeout(async () => {
        try {
          // UPDATED URL HERE
          const res = await axios.get('https://day17-project17.onrender.com/api/user/premium-content', {
            headers: { 'auth-token': token }
          });
          setPremiumContent(res.data.message);
        } catch (backendErr) {
          setErrorMsg("ACCESS DENIED: LEVEL 2 CLEARANCE REQUIRED.");
        }
        setLoading(false);
      }, 1500); 
    } catch (err) {
      setLoading(false);
    }
  };

  // 2. Upgrade to Premium Logic
  const handleUpgrade = async () => {
    const token = localStorage.getItem('token');
    if(window.confirm("Confirm transaction of $99/mo for Premium Clearance?")) {
      try {
        // UPDATED URL HERE
        const res = await axios.post('https://day17-project17.onrender.com/api/user/upgrade', {}, {
          headers: { 'auth-token': token }
        });
        
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        window.location.reload(); 
      } catch (err) {
        alert("Transaction Failed");
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <div className="cyber-grid"></div>

      {/* DASHBOARD SPECIFIC TOP BAR (High Z-Index to stay on top) */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '1rem 2rem', 
        borderBottom: '1px solid rgba(255,255,255,0.1)', 
        background: 'rgba(0,0,0,0.9)', 
        backdropFilter: 'blur(10px)', 
        position: 'fixed', 
        width: '100%', 
        zIndex: 9999, /* Sabse upar */
        top: 0,
        left: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'monospace', color: '#00ff88', fontSize: '1.2rem' }}>
          <div className="status-dot"></div> PROJECT 17: SYSTEM ONLINE
        </div>
        <button onClick={handleLogout} style={{ 
          background: 'rgba(255, 95, 86, 0.1)', 
          border: '1px solid #ff5f56', 
          color: '#ff5f56', 
          padding: '0.5rem 1.5rem', 
          cursor: 'pointer', 
          borderRadius: '4px',
          fontWeight: 'bold',
          transition: '0.3s'
        }}>
          TERMINATE SESSION
        </button>
      </div>

      <div style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div className="animate-slide-up" style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800' }}>
            OPERATOR: <span className="text-gradient">{user.name.toUpperCase()}</span>
          </h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: '#888', marginTop: '10px' }}>
            <span>ACCESS LEVEL: <span style={{ color: user.plan === 'premium' ? '#e50914' : '#aaa', fontWeight: 'bold' }}>{user.plan.toUpperCase()}</span></span>
            
            {user.plan === 'free' && (
              <button onClick={handleUpgrade} style={{
                background: '#e50914', border: 'none', color: 'white', padding: '0.5rem 1rem',
                borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem',
                boxShadow: '0 0 15px rgba(229, 9, 20, 0.5)'
              }}>
                ⚡ UPGRADE CLEARANCE
              </button>
            )}
          </div>
        </div>

        {/* METRICS & VAULT */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Metrics Card */}
          <div className="glass-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1rem', color: '#aaa' }}>USER METRICS</h3>
            <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Role</span> <span style={{ color: '#00ff88' }}>{user.role === 'admin' ? 'ADMIN' : 'USER'}</span>
            </p>
            <p style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Status</span> <span style={{ color: '#00ff88' }}>ACTIVE</span>
            </p>
            <div style={{ marginTop: '1rem', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#666' }}>SESSION ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>

          {/* Vault Card */}
          <div className="glass-card animate-slide-up" style={{ animationDelay: '0.2s', border: user.plan === 'premium' ? '1px solid #00ff88' : '1px solid #e50914' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1rem', color: user.plan === 'premium' ? '#00ff88' : '#e50914' }}>
              CLASSIFIED VAULT
            </h3>
            
            {!premiumContent && !errorMsg && (
              <button onClick={accessPremium} className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'DECRYPTING...' : 'ACCESS SECRET DATA'}
              </button>
            )}

            {errorMsg && (
              <div style={{ background: 'rgba(229, 9, 20, 0.2)', border: '1px solid #e50914', padding: '1rem', color: '#ff5f56', textAlign: 'center', borderRadius: '4px' }}>
                <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>⚠️ ACCESS DENIED</p>
                <p style={{ fontSize: '0.9rem' }}>Clearance Level Low.</p>
              </div>
            )}

            {premiumContent && (
              <div style={{ background: 'rgba(0, 255, 136, 0.1)', border: '1px solid #00ff88', padding: '1rem', borderRadius: '4px' }}>
                <p style={{ color: '#00ff88', fontFamily: 'monospace' }}>
                  // DECRYPTION SUCCESSFUL <br/>
                  Payload: "{premiumContent}"
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;