import React from 'react';

const Players = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '32px', color: '#1f2937' }}>PSL Players 2026</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Babar Azam</h3>
          <p>Team: Karachi Kings</p>
          <p>Role: Batsman</p>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Shaheen Afridi</h3>
          <p>Team: Lahore Qalandars</p>
          <p>Role: Bowler</p>
        </div>
      </div>
    </div>
  );
};

export default Players;
