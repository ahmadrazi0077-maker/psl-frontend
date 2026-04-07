import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Loader from '../../components/common/Loader';
import { fetchAllMatches, updateMatchScore } from '../../services/matchService';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';

const ManageMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMatch, setEditingMatch] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    const data = await fetchAllMatches();
    setMatches(data);
    setLoading(false);
  };

  const handleEdit = (match) => {
    setEditingMatch(match.id);
    setFormData({
      team1_runs: match.team1_score?.runs || '',
      team1_wickets: match.team1_score?.wickets || '',
      team1_overs: match.team1_score?.overs || '',
      team2_runs: match.team2_score?.runs || '',
      team2_wickets: match.team2_score?.wickets || '',
      team2_overs: match.team2_score?.overs || '',
      status: match.status,
      result: match.result || ''
    });
  };

  const handleSave = async (matchId) => {
    await updateMatchScore(matchId, formData);
    setEditingMatch(null);
    loadMatches();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Manage Matches</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">Match</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Score</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {matches.map(match => (
                <tr key={match.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    {match.team1.name} vs {match.team2.name}
                  </td>
                  <td className="p-3">{match.date}</td>
                  <td className="p-3">
                    <select
                      name="status"
                      value={editingMatch === match.id ? formData.status : match.status}
                      onChange={handleChange}
                      disabled={editingMatch !== match.id}
                      className="px-2 py-1 border rounded"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="live">Live</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="p-3">
                    {editingMatch === match.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          name="team1_runs"
                          placeholder="Team 1 Runs"
                          value={formData.team1_runs}
                          onChange={handleChange}
                          className="w-24 px-2 py-1 border rounded text-sm"
                        />
                        <input
                          type="text"
                          name="team2_runs"
                          placeholder="Team 2 Runs"
                          value={formData.team2_runs}
                          onChange={handleChange}
                          className="w-24 px-2 py-1 border rounded text-sm ml-2"
                        />
                      </div>
                    ) : (
                      <span>
                        {match.team1_score?.runs}/{match.team1_score?.wickets} vs{' '}
                        {match.team2_score?.runs}/{match.team2_score?.wickets}
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    {editingMatch === match.id ? (
                      <button
                        onClick={() => handleSave(match.id)}
                        className="text-green-600 hover:text-green-700 mr-2"
                      >
                        <FaSave />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(match)}
                        className="text-blue-600 hover:text-blue-700 mr-2"
                      >
                        <FaEdit />
                      </button>
                    )}
                    <button className="text-red-600 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageMatches;