import React from 'react';
import PointsTable from '../components/standings/PointsTable';

const Standings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">PSL Points Table</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <PointsTable />
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2">📊 How Points are Calculated</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Win: 2 points</li>
            <li>• No Result: 1 point</li>
            <li>• Loss: 0 points</li>
            <li>• Tie: Super Over determines winner</li>
          </ul>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2">🏆 Qualification Criteria</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Top 4 teams qualify for playoffs</li>
            <li>• Qualifier 1: 1st vs 2nd</li>
            <li>• Eliminator: 3rd vs 4th</li>
            <li>• Qualifier 2: Loser Q1 vs Winner Eliminator</li>
            <li>• Final: Winner Q1 vs Winner Q2</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Standings;