import React from 'react';
import SEO from '../components/SEO';

const LiveScores = () => {
  return (
    <>
      <SEO 
        title="PSL Live Scores 2026 - Real-time Match Updates"
        description="Live PSL 2026 scores and updates"
        keywords="PSL live scores"
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">🔴 Live Scores</h1>
        
        {/* Free Live Scores Widget */}
        <div className="flex justify-center">
          <iframe
            src="https://sportscore.com/embed/fixtures/cricket/competition/pakistan-super-league/"
            width="100%"
            height="600"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            style={{ border: 'none', borderRadius: '12px', maxWidth: '800px' }}
            title="PSL Live Scores"
          />
        </div>
      </div>
    </>
  );
};

export default LiveScores;
