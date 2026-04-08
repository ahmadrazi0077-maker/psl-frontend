import React, { useState, useEffect } from 'react';
import { fetchPointsTable } from '../../services/supabaseService';
import Loader from '../common/Loader';

const PointsTable = ({ preview = false }) => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStandings();
  }, []);

  const loadStandings = async () => {
    try {
      const data = await fetchPointsTable('2026');
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
        <thead className="bg-gradient-to-r from-green-800 to-green-600 text-white">
          <tr>
            <th className="p-3 text-center">#</th>
            <th className="p-3 text-left">Team</th>
            <th className="p-3 text-center">P</th>
            <th className="p-3 text-center">W</th>
            <th className="p-3 text-center">L</th>
            <th className="p-3 text-center">NR</th>
            <th className="p-3 text-center">Pts</th>
            <th className="p-3 text-center">NRR</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, idx) => (
            <tr key={team.id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="p-3 text-center font-bold">
                {idx === 0 && '🏆'}
                {idx === 1 && '🥈'}
                {idx === 2 && '🥉'}
                {idx > 2 && idx + 1}
              </td>
              <td className="p-3 flex items-center gap-2">
                {team.teams?.logo_url && (
                  <img 
                    src={team.teams.logo_url} 
                    alt={team.team_name} 
                    className="w-8 h-8 object-contain"
                  />
                )}
                <span className="font-semibold">{team.team_name}</span>
              </td>
              <td className="p-3 text-center">{team.played}</td>
              <td className="p-3 text-center text-green-600 font-semibold">{team.won}</td>
              <td className="p-3 text-center text-red-600">{team.lost}</td>
              <td className="p-3 text-center">{team.no_result || 0}</td>
              <td className="p-3 text-center font-bold text-lg">{team.points}</td>
              <td className="p-3 text-center">{team.net_run_rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PointsTable;
