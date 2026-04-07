import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Loader from '../../components/common/Loader';
import { fetchPlayers, addPlayer, updatePlayer, deletePlayer } from '../../services/playerService';
import { fetchTeams } from '../../services/teamService';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from 'react-icons/fa';

const ManagePlayers = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    team: '',
    role: '',
    battingStyle: '',
    bowlingStyle: '',
    matches: 0,
    runs: 0,
    wickets: 0,
    image: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [playersData, teamsData] = await Promise.all([
      fetchPlayers(),
      fetchTeams()
    ]);
    setPlayers(playersData);
    setTeams(teamsData);
    setLoading(false);
  };

  const handleOpenModal = (player = null) => {
    if (player) {
      setEditingPlayer(player);
      setFormData(player);
    } else {
      setEditingPlayer(null);
      setFormData({
        name: '',
        team: '',
        role: '',
        battingStyle: '',
        bowlingStyle: '',
        matches: 0,
        runs: 0,
        wickets: 0,
        image: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPlayer(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPlayer) {
      await updatePlayer(editingPlayer.id, formData);
    } else {
      await addPlayer(formData);
    }
    handleCloseModal();
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      await deletePlayer(id);
      loadData();
    }
  };

  const roles = ['Batsman', 'Bowler', 'All-rounder', 'Wicket Keeper'];

  if (loading) return <Loader />;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Players</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <FaPlus /> Add Player
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">Player</th>
                <th className="p-3 text-left">Team</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Matches</th>
                <th className="p-3 text-left">Runs</th>
                <th className="p-3 text-left">Wickets</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map(player => (
                <tr key={player.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full object-cover" />
                      <span className="font-semibold">{player.name}</span>
                    </div>
                  </td>
                  <td className="p-3">{player.team}</td>
                  <td className="p-3">{player.role}</td>
                  <td className="p-3">{player.matches}</td>
                  <td className="p-3">{player.runs}</td>
                  <td className="p-3">{player.wickets}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleOpenModal(player)}
                      className="text-blue-600 hover:text-blue-700 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(player.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full my-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  {editingPlayer ? 'Edit Player' : 'Add New Player'}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Player Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="px-3 py-2 border rounded-lg"
                  />
                  
                  <select
                    name="team"
                    value={formData.team}
                    onChange={handleChange}
                    required
                    className="px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select Team</option>
                    {teams.map(team => (
                      <option key={team.id} value={team.name}>{team.name}</option>
                    ))}
                  </select>
                  
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select Role</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  
                  <input
                    type="text"
                    name="battingStyle"
                    placeholder="Batting Style"
                    value={formData.battingStyle}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg"
                  />
                  
                  <input
                    type="text"
                    name="bowlingStyle"
                    placeholder="Bowling Style"
                    value={formData.bowlingStyle}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg"
                  />
                  
                  <input
                    type="number"
                    name="matches"
                    placeholder="Matches"
                    value={formData.matches}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg"
                  />
                  
                  <input
                    type="number"
                    name="runs"
                    placeholder="Runs"
                    value={formData.runs}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg"
                  />
                  
                  <input
                    type="number"
                    name="wickets"
                    placeholder="Wickets"
                    value={formData.wickets}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg"
                  />
                  
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    className="col-span-2 px-3 py-2 border rounded-lg"
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    <FaSave className="inline mr-2" /> Save Player
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePlayers;