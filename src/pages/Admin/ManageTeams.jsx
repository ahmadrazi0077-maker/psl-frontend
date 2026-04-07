import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Loader from '../../components/common/Loader';
import { fetchTeams, addTeam, updateTeam, deleteTeam } from '../../services/teamService';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from 'react-icons/fa';

const ManageTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    captain: '',
    coach: '',
    homeGround: '',
    logo: ''
  });

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    const data = await fetchTeams();
    setTeams(data);
    setLoading(false);
  };

  const handleOpenModal = (team = null) => {
    if (team) {
      setEditingTeam(team);
      setFormData(team);
    } else {
      setEditingTeam(null);
      setFormData({
        name: '',
        code: '',
        captain: '',
        coach: '',
        homeGround: '',
        logo: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTeam(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTeam) {
      await updateTeam(editingTeam.id, formData);
    } else {
      await addTeam(formData);
    }
    handleCloseModal();
    loadTeams();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      await deleteTeam(id);
      loadTeams();
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Teams</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <FaPlus /> Add Team
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <div key={team.id} className="bg-white rounded-lg shadow-md p-6">
              <img src={team.logo} alt={team.name} className="w-24 h-24 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-center mb-2">{team.name}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Captain: {team.captain}</p>
                <p>Coach: {team.coach}</p>
                <p>Home: {team.homeGround}</p>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={() => handleOpenModal(team)}
                  className="text-blue-600 hover:text-blue-700 p-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(team.id)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  {editingTeam ? 'Edit Team' : 'Add New Team'}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Team Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="code"
                  placeholder="Team Code (e.g., KK)"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="captain"
                  placeholder="Captain Name"
                  value={formData.captain}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="coach"
                  placeholder="Coach Name"
                  value={formData.coach}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="homeGround"
                  placeholder="Home Ground"
                  value={formData.homeGround}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="logo"
                  placeholder="Logo URL"
                  value={formData.logo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    <FaSave className="inline mr-2" /> Save
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

export default ManageTeams;