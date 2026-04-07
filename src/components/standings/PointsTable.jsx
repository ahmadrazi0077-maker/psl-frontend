import React, { useState, useEffect } from 'react';
import { fetchPointsTable } from '../../services/matchService';
import Loader from '../common/Loader';

const PointsTable = ({ preview = false }) => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStandings();
  }, []);

  const loadStandings = async () => {
    try {
      const data = await fetchPointsTable();
      setStandings(preview ? data.slice(0, 4) : data);
    } catch (error) {
      console.error('Error loading standings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Team</th>
            <th className="p-3">M</th>
            <th className="p-3">W</th>
            <th className="p-3">L</th>
            <th className="p-3">NR</th>
            <th className="p-3">Pts</th>
            <th className="p-3">NRR</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, idx) => (
            <tr key={team.id} className="border-b hover:bg-gray-50">
              <td className="p-3 text-center font-bold">{idx + 1}</td>
              <td className="p-3 flex items-center gap-2">
                {team.logo && <img src={team.logo} alt={team.name} className="w-8 h-8" />}
                <span className="font-semibold">{team.name}</span>
              </td>
              <td className="p-3 text-center">{team.played || team.matches_played}</td>
              <td className="p-3 text-center text-green-600">{team.won}</td>
              <td className="p-3 text-center text-red-600">{team.lost}</td>
              <td className="p-3 text-center">{team.nr || team.tied || 0}</td>
              <td className="p-3 text-center font-bold">{team.points}</td>
              <td className="p-3 text-center">{team.nrr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PointsTable;