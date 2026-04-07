import api from './api';

export const fetchPlayers = async () => {
  try {
    const response = await api.get('/players');
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};

export const fetchPlayerDetails = async (playerId) => {
  try {
    const response = await api.get(`/players/${playerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player details:', error);
    throw error;
  }
};

export const fetchPlayerStats = async (playerId) => {
  try {
    const response = await api.get(`/players/${playerId}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player stats:', error);
    throw error;
  }
};

export const fetchTopPlayers = async (category, limit = 10) => {
  try {
    const response = await api.get(`/players/top/${category}?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top players:', error);
    throw error;
  }
};

export const addPlayer = async (playerData) => {
  try {
    const response = await api.post('/admin/players', playerData);
    return response.data;
  } catch (error) {
    console.error('Error adding player:', error);
    throw error;
  }
};

export const updatePlayer = async (playerId, playerData) => {
  try {
    const response = await api.put(`/admin/players/${playerId}`, playerData);
    return response.data;
  } catch (error) {
    console.error('Error updating player:', error);
    throw error;
  }
};

export const deletePlayer = async (playerId) => {
  try {
    const response = await api.delete(`/admin/players/${playerId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting player:', error);
    throw error;
  }
};