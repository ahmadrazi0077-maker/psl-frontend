import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Loader from '../common/Loader';

const PointsTable = ({ preview = false }) => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStandings();
  }, []);

  const fetchStandings = async () => {
    try {
      const { data } = await supabase
        .from('points_table')
        .select('*, teams:team_id(name)')
        .order('points', { ascending: false });
      
      setStandings(preview ? (data || []).slice(0, 4) : (data || []));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3 text-left">Team</th>
            <th className="p-3">P</th>
            <th className="p-3">W</th>
            <th className="p-3">L</th>
            <th className="p-3">Pts</th>
            <th className="p-3">NRR</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, idx) => (
            <tr key={team.id} className="border-b hover:bg-gray-50">
              <td className="p-3 text-center font-bold">{idx + 1}</td>
              <td className="p-3 font-semibold">{team.team_name}</td>
              <td className="p-3 text-center">{team.played}</td>
              <td className="p-3 text-center text-green-600">{team.won}</td>
              <td className="p-3 text-center text-red-600">{team.lost}</td>
              <td className="p-3 text-center font-bold">{team.points}</td>
              <td className="p-3 text-center">{team.net_run_rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PointsTable;
