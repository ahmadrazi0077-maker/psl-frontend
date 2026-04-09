import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Players from './pages/Players';
import Matches from './pages/Matches';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f0fdf4' }}>
        {/* Navigation */}
        <nav style={{ backgroundColor: '#166534', color: 'white', padding: '15px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>
              🏏 PSL Updates Live
            </Link>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: '8px' }}>Home</Link>
              <Link to="/teams" style={{ color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: '8px' }}>Teams</Link>
              <Link to="/players" style={{ color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: '8px' }}>Players</Link>
              <Link to="/matches" style={{ color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: '8px' }}>Matches</Link>
            </div>
          </div>
        </nav>

        {/* Routes - This is the critical part */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/players" element={<Players />} />
          <Route path="/matches" element={<Matches />} />
        </Routes>

        {/* Footer */}
        <footer style={{ backgroundColor: '#1f2937', color: 'white', textAlign: 'center', padding: '20px', marginTop: '40px' }}>
          <p>&copy; 2026 PSL Updates Live. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
