import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import Loader from '../components/common/Loader';

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchStandings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('points_table')
        .select(`
          *,
          teams:team_id (name, logo_url, code)
        `)
        .eq('season', '2026')
        .order('points', { ascending: false })
        .order('net_run_rate', { ascending: false });
      
      if (error) throw error;
      setStandings(data || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching standings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStandings();
    
    // Auto-refresh every 5 minutes for live updates
    const interval = setInterval(() => {
      fetchStandings();
    }, 300000);
    
    return () => clearInterval(interval);
  }, [fetchStandings]);

  // Get playoff qualification status
  const getQualificationStatus = (position) => {
    if (position === 1) return { text: '🏆 Qualified - Top of Table', color: '#16a34a', bg: '#dcfce7' };
    if (position === 2) return { text: '✅ Qualified - Playoffs', color: '#16a34a', bg: '#dcfce7' };
    if (position === 3) return { text: '✅ Qualified - Playoffs', color: '#16a34a', bg: '#dcfce7' };
    if (position === 4) return { text: '⚡ Fighting for Playoffs', color: '#eab308', bg: '#fef9c3' };
    if (position === 5) return { text: '⚡ Fighting for Playoffs', color: '#eab308', bg: '#fef9c3' };
    if (position >= 6) return { text: '❌ Eliminated', color: '#dc2626', bg: '#fee2e2' };
    return { text: '', color: '', bg: '' };
  };

  if (loading) return <Loader />;

  return (
    <>
      <SEO 
        title="PSL Live Points Table 2026 - Updated Team Standings & Rankings"
        description="Get the latest PSL 2026 live points table, team rankings, net run rate, and playoff qualification scenarios. Updated after every match. Check your favorite team's position now!"
        keywords="PSL live points table, PSL 2026 standings, PSL points table today, Pakistan Super League rankings, PSL team standings, PSL net run rate, PSL playoff qualification"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                PSL 2026 Live Points Table
              </h1>
              <p className="text-gray-600">
                Real-time standings, team rankings, and playoff qualifications
              </p>
            </div>
            {lastUpdated && (
              <div className="bg-green-50 rounded-lg px-4 py-2 text-sm">
                <span className="text-green-700">🟢 Last updated:</span>
                <span className="text-gray-600 ml-2">
                  {lastUpdated.toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Points Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-700 to-green-600 text-white">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold">#</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Team</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">P</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">W</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">L</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">NR</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">Pts</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">NRR</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden md:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team, index) => {
                  const qualification = getQualificationStatus(index + 1);
                  return (
                    <tr 
                      key={team.id} 
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index < 4 ? 'bg-green-50/30' : ''
                      }`}
                    >
                      <td className="px-4 py-4 font-bold text-gray-800">
                        {index === 0 && '🏆'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                        {index > 2 && index + 1}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          {team.teams?.logo_url ? (
                            <img 
                              src={team.teams.logo_url} 
                              alt={team.team_name}
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                              {team.team_code}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-gray-800">{team.team_name}</div>
                            <div className="text-xs text-gray-500">{team.team_code}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center font-medium">{team.played}</td>
                      <td className="px-4 py-4 text-center text-green-600 font-semibold">{team.won}</td>
                      <td className="px-4 py-4 text-center text-red-600">{team.lost}</td>
                      <td className="px-4 py-4 text-center">{team.no_result || 0}</td>
                      <td className="px-4 py-4 text-center font-bold text-xl text-green-700">{team.points}</td>
                      <td className="px-4 py-4 text-center font-mono">
                        <span className={parseFloat(team.net_run_rate) >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {parseFloat(team.net_run_rate) >= 0 ? '+' : ''}{team.net_run_rate}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ backgroundColor: qualification.bg, color: qualification.color }}
                        >
                          {qualification.text}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend / Info Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-3 text-blue-800">📊 How Points Are Calculated</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• <strong>Win:</strong> 2 points</li>
              <li>• <strong>No Result:</strong> 1 point</li>
              <li>• <strong>Loss:</strong> 0 points</li>
              <li>• <strong>Tie:</strong> Super Over determines winner</li>
            </ul>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-3 text-green-800">🏆 Playoff Qualification</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• <strong>Top 4 teams</strong> qualify for playoffs</li>
              <li>• <strong>Qualifier 1:</strong> 1st vs 2nd</li>
              <li>• <strong>Eliminator:</strong> 3rd vs 4th</li>
              <li>• <strong>Qualifier 2:</strong> Loser Q1 vs Winner Eliminator</li>
              <li>• <strong>Final:</strong> Winner Q1 vs Winner Q2</li>
            </ul>
          </div>
        </div>

        {/* Live Updates Note */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>📱 Live updates refresh automatically every 5 minutes</p>
          <p className="mt-1">🏏 PSL 2026 - Pakistan Super League Official Points Table</p>
        </div>
      </div>
    </>
  );
};

export default Standings;
