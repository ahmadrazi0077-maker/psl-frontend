import React from 'react';

const Matches = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '32px', color: '#1f2937' }}>PSL 2026 Schedule</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <div><strong>Lahore Qalandars</strong></div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>VS</div>
            <div><strong>Karachi Kings</strong></div>
            <div style={{ marginTop: '10px' }}>Gaddafi Stadium, Lahore | April 10, 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matches;
