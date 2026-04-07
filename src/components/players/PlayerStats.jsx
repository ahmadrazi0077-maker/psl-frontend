import React from 'react';

const PlayerStats = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Career Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-gray-600">Matches</p>
          <p className="text-2xl font-bold">{stats?.matches || 0}</p>
        </div>
        <div>
          <p className="text-gray-600">Runs</p>
          <p className="text-2xl font-bold">{stats?.runs || 0}</p>
        </div>
        <div>
          <p className="text-gray-600">Average</p>
          <p className="text-2xl font-bold">{stats?.average || 0}</p>
        </div>
        <div>
          <p className="text-gray-600">Strike Rate</p>
          <p className="text-2xl font-bold">{stats?.strikeRate || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;