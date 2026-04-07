import api from './api';

export const fetchTeams = async () => {
  try {
    const response = await api.get('/teams');
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const fetchTeamDetails = async (teamId) => {
  try {
    const response = await api.get(`/teams/${teamId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team details:', error);
    throw error;
  }
};

export const fetchTeamPlayers = async (teamId) => {
  try {
    const response = await api.get(`/teams/${teamId}/players`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team players:', error);
    throw error;
  }
};

export const addTeam = async (teamData) => {
  try {
    const response = await api.post('/admin/teams', teamData);
    return response.data;
  } catch (error) {
    console.error('Error adding team:', error);
    throw error;
  }
};

export const updateTeam = async (teamId, teamData) => {
  try {
    const response = await api.put(`/admin/teams/${teamId}`, teamData);
    return response.data;
  } catch (error) {
    console.error('Error updating team:', error);
    throw error;
  }
};

export const deleteTeam = async (teamId) => {
  try {
    const response = await api.delete(`/admin/teams/${teamId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting team:', error);
    throw error;
  }
};