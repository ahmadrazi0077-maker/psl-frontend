import React from 'react';

const Teams = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '32px', color: '#1f2937' }}>PSL Teams 2026</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Team cards will go here */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534' }}>Karachi Kings</h2>
          <p><strong>Captain:</strong> Babar Azam</p>
          <p><strong>Coach:</strong> Phil Simmons</p>
          <p><strong>Home Ground:</strong> National Stadium, Karachi</p>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534' }}>Lahore Qalandars</h2>
          <p><strong>Captain:</strong> Shaheen Afridi</p>
          <p><strong>Coach:</strong> Aaqib Javed</p>
          <p><strong>Home Ground:</strong> Gaddafi Stadium, Lahore</p>
        </div>
        {/* Add more teams as needed */}
      </div>
    </div>
  );
};

export default Teams;
