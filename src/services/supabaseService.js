import { supabase } from '../lib/supabase';

// Teams Services
export const fetchTeams = async () => {
  try {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
};

// Players Services
export const fetchPlayers = async (filters = {}) => {
  try {
    let query = supabase
      .from('players')
      .select(`
        *,
        teams:team_id (name, code, logo_url)
      `);
    
    if (filters.team_id) query = query.eq('team_id', filters.team_id);
    if (filters.role) query = query.eq('role', filters.role);
    if (filters.search) query = query.ilike('name', `%${filters.search}%`);
    
    const { data, error } = await query;
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};

// Matches Services
export const fetchLiveMatches = async () => {
  try {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        team1:team1_id (name, code, logo_url),
        team2:team2_id (name, code, logo_url)
      `)
      .eq('status', 'live')
      .order('match_date', { ascending: true });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching live matches:', error);
    return [];
  }
};

export const fetchUpcomingMatches = async () => {
  try {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        team1:team1_id (name, code, logo_url),
        team2:team2_id (name, code, logo_url)
      `)
      .eq('status', 'scheduled')
      .gte('match_date', new Date().toISOString())
      .order('match_date', { ascending: true });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    return [];
  }
};

// Points Table Services
export const fetchPointsTable = async (season = '2026') => {
  try {
    const { data, error } = await supabase
      .from('points_table')
      .select(`
        *,
        teams:team_id (name, code, logo_url, colors)
      `)
      .eq('season', season)
      .order('points', { ascending: false })
      .order('net_run_rate', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching points table:', error);
    return [];
  }
};

// News Services
export const fetchNews = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
