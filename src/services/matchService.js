import { supabase } from '../lib/supabase';

export const fetchLiveMatches = async () => {
  try {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        team1:team1_id(name, code, logo_url),
        team2:team2_id(name, code, logo_url)
      `)
      .eq('status', 'live');
    
    if (error) throw error;
    return data || [];
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
        team1:team1_id(name, code, logo_url),
        team2:team2_id(name, code, logo_url)
      `)
      .eq('status', 'scheduled')
      .gte('match_date', new Date().toISOString())
      .order('match_date', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    return [];
  }
};

export const fetchPointsTable = async () => {
  try {
    // You can create a points_table view or calculate on the fly
    const { data, error } = await supabase
      .from('points_table')
      .select('*')
      .order('points', { ascending: false })
      .order('nrr', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching points table:', error);
    // Return mock data if table doesn't exist
    return [
      { id: 1, name: 'Multan Sultans', played: 0, won: 0, lost: 0, points: 0, nrr: '0.000' },
      { id: 2, name: 'Lahore Qalandars', played: 0, won: 0, lost: 0, points: 0, nrr: '0.000' },
    ];
  }
};

export const fetchNews = async (category = 'all') => {
  try {
    let query = supabase.from('news').select('*');
    
    if (category !== 'all') {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query
      .order('published_at', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
