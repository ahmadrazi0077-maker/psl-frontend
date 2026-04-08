import React from 'react';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f0fdf4',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ color: '#166534', fontSize: '48px', marginBottom: '20px' }}>
          🏏 PSL Updates Live
        </h1>
        <p style={{ fontSize: '20px', color: '#374151', marginBottom: '30px' }}>
          Pakistan Super League 2026
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <a href="/teams" style={{ 
            backgroundColor: '#166534', 
            color: 'white', 
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '8px'
          }}>Teams</a>
          <a href="/players" style={{ 
            backgroundColor: '#166534', 
            color: 'white', 
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '8px'
          }}>Players</a>
          <a href="/matches" style={{ 
            backgroundColor: '#166534', 
            color: 'white', 
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '8px'
          }}>Matches</a>
        </div>
        <p style={{ marginTop: '40px', color: '#6b7280', fontSize: '14px' }}>
          Coming Soon: Live Scores, Points Table, and Latest News
        </p>
      </div>
    </div>
  );
}

export default App;
