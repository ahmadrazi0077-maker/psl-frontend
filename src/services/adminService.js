import api from './api';

export const getDashboardStats = async () => {
  try {
    const response = await api.get('/admin/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalMatches: 0,
      totalTeams: 6,
      totalPlayers: 0,
      totalUsers: 0,
      liveMatches: 0,
      upcomingMatches: 0
    };
  }
};