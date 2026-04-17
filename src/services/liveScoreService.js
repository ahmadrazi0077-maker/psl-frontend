// Using the free Cricbuzz Live API
const API_BASE_URL = 'https://cricbuzz-live.vercel.app';

export const liveScoreService = {
  // Get all live matches
  getLiveMatches: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/matches/live`);
      const data = await response.json();
      return data.data?.matches || [];
    } catch (error) {
      console.error('Error fetching live matches:', error);
      return [];
    }
  },

  // Get specific match score
  getMatchScore: async (matchId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/score/${matchId}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching match score:', error);
      return null;
    }
  },

  // Get PSL specific matches (filter by title)
  getPSLMatches: async () => {
    try {
      const [liveMatches, upcomingMatches, recentMatches] = await Promise.all([
        fetch(`${API_BASE_URL}/v1/matches/live`).then(res => res.json()),
        fetch(`${API_BASE_URL}/v1/matches/upcoming`).then(res => res.json()),
        fetch(`${API_BASE_URL}/v1/matches/recent`).then(res => res.json())
      ]);
      
      // Filter only PSL matches
      const allMatches = [
        ...(liveMatches.data?.matches || []),
        ...(upcomingMatches.data?.matches || []),
        ...(recentMatches.data?.matches || [])
      ];
      
      // Filter matches that contain "PSL" or "Pakistan Super League" in title
      const pslMatches = allMatches.filter(match => 
        match.title?.toLowerCase().includes('psl') || 
        match.title?.toLowerCase().includes('pakistan super league') ||
        match.teams?.some(team => 
          team.team?.includes('Qalandars') || 
          team.team?.includes('Kings') ||
          team.team?.includes('United') ||
          team.team?.includes('Zalmi') ||
          team.team?.includes('Gladiators') ||
          team.team?.includes('Sultans')
        )
      );
      
      return pslMatches;
    } catch (error) {
      console.error('Error fetching PSL matches:', error);
      return [];
    }
  }
};
