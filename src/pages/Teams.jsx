import React from 'react';

const Teams = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '32px', color: '#1f2937' }}>PSL Teams 2026</h1>
      <p>This is the TEAMS page content. It should show all PSL teams.</p>
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
        <h3>Karachi Kings</h3>
        <h3>Lahore Qalandars</h3>
        <h3>Islamabad United</h3>
        <h3>Peshawar Zalmi</h3>
        <h3>Quetta Gladiators</h3>
        <h3>Multan Sultans</h3>
      </div>
    </div>
  );
};

export default Teams;
