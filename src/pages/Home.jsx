import React from 'react';

const Home = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #166534 0%, #15803d 100%)', 
        borderRadius: '16px', 
        padding: '60px 40px', 
        textAlign: 'center',
        color: 'white',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>Pakistan Super League 2026</h1>
        <p style={{ fontSize: '20px', marginBottom: '24px' }}>Welcome to PSL Updates Live</p>
      </div>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>Welcome to PSL Updates Live</h2>
      <p>This is the HOME page content.</p>
    </div>
  );
};

export default Home;
