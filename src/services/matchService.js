import api from './api';




// ... rest of the service functions
export const fetchLiveMatches = async () => {
  try {
    const response = await api.get('/matches/live');
    return response.data;
  } catch (error) {
    console.error('Error fetching live matches:', error);
    throw error;
  }
};

export const fetchUpcomingMatches = async () => {
  try {
    const response = await api.get('/matches/upcoming');
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    throw error;
  }
};

export const fetchPastMatches = async () => {
  try {
    const response = await api.get('/matches/past');
    return response.data;
  } catch (error) {
    console.error('Error fetching past matches:', error);
    throw error;
  }
};

export const fetchMatchDetails = async (matchId) => {
  try {
    const response = await api.get(`/matches/${matchId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching match details:', error);
    throw error;
  }
};

export const fetchPointsTable = async () => {
  try {
    const response = await api.get('/standings');
    return response.data;
  } catch (error) {
    console.error('Error fetching points table:', error);
    throw error;
  }
};

export const updateMatchScore = async (matchId, scoreData) => {
  try {
    const response = await api.put(`/admin/matches/${matchId}`, scoreData);
    return response.data;
  } catch (error) {
    console.error('Error updating match score:', error);
    throw error;
  }
};

export const fetchAllMatches = async () => {
  try {
    const response = await api.get('/admin/matches');
    return response.data;
  } catch (error) {
    console.error('Error fetching all matches:', error);
    throw error;
  }
};

export const createMatch = async (matchData) => {
  try {
    const response = await api.post('/admin/matches', matchData);
    return response.data;
  } catch (error) {
    console.error('Error creating match:', error);
    throw error;
  }
};

export const deleteMatch = async (matchId) => {
  try {
    const response = await api.delete(`/admin/matches/${matchId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting match:', error);
    throw error;
  }
};