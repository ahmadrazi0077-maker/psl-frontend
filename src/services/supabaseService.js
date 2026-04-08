import { supabase } from '../lib/supabase';

// Teams Services
export const fetchTeams = async () => {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
};

export const fetchTeamById = async (id) => {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

// Players Services
export const fetchPlayers = async (filters = {}) => {
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
  return data;
};

export const fetchPlayerById = async (id) => {
  const { data, error } = await supabase
    .from('players')
    .select('*, teams:team_id (*)')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

// Matches Services
export const fetchLiveMatches = async () => {
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
  return data || [];
};

export const fetchUpcomingMatches = async () => {
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
  return data || [];
};

export const fetchPastMatches = async () => {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      team1:team1_id (name, code, logo_url),
      team2:team2_id (name, code, logo_url)
    `)
    .eq('status', 'completed')
    .order('match_date', { ascending: false })
    .limit(10);
  
  if (error) throw error;
  return data || [];
};

export const fetchMatchById = async (id) => {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      team1:team1_id (name, code, logo_url, captain_name),
      team2:team2_id (name, code, logo_url, captain_name),
      winner:winner_team_id (name, code)
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

// Points Table Services
export const fetchPointsTable = async (season = '2026') => {
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
  return data;
};

// News Services
export const fetchNews = async (limit = 10) => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data;
};

export const fetchNewsById = async (id) => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  
  // Increment view count
  await supabase
    .from('news')
    .update({ views_count: data.views_count + 1 })
    .eq('id', id);
  
  return data;
};

// Statistics Services
export const fetchStats = async () => {
  const [teamsCount, playersCount, matchesCount] = await Promise.all([
    supabase.from('teams').select('*', { count: 'exact', head: true }),
    supabase.from('players').select('*', { count: 'exact', head: true }),
    supabase.from('matches').select('*', { count: 'exact', head: true })
  ]);
  
  return {
    totalTeams: teamsCount.count || 0,
    totalPlayers: playersCount.count || 0,
    totalMatches: matchesCount.count || 0
  };
};
