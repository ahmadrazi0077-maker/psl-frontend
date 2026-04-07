import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import PlayerStats from '../components/players/PlayerStats';
import Loader from '../components/common/Loader';
import { fetchPlayerDetails } from '../services/playerService';
import { FaArrowLeft } from 'react-icons/fa';

const PlayerDetail = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPlayer = useCallback(async () => {
    try {
      const data = await fetchPlayerDetails(id);
      setPlayer(data);
    } catch (error) {
      console.error('Error loading player:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadPlayer();
  }, [loadPlayer]);

  if (loading) return <Loader />;
  if (!player) return <div>Player not found</div>;

  return (
    <div className="space-y-6">
      <Link to="/players" className="inline-flex items-center text-green-600 hover:text-green-700">
        <FaArrowLeft className="mr-2" /> Back to Players
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img 
            src={player.image || '/default-player.jpg'} 
            alt={player.name}
            className="w-48 h-48 object-cover rounded-lg mx-auto md:mx-0"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{player.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{player.role}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              <div>
                <p className="text-gray-600 text-sm">Team</p>
                <p className="font-semibold">{player.team}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Matches</p>
                <p className="font-semibold">{player.matches}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Batting Style</p>
                <p className="font-semibold">{player.battingStyle}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Bowling Style</p>
                <p className="font-semibold">{player.bowlingStyle || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PlayerStats stats={player.careerStats} />

      {player.recentMatches && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Recent Performances</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Match</th>
                  <th className="p-3 text-left">Runs</th>
                  <th className="p-3 text-left">Balls</th>
                  <th className="p-3 text-left">4s</th>
                  <th className="p-3 text-left">6s</th>
                  <th className="p-3 text-left">Wickets</th>
                </tr>
              </thead>
              <tbody>
                {player.recentMatches.map((match, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-3">{match.opponent}</td>
                    <td className="p-3 font-semibold">{match.runs}</td>
                    <td className="p-3">{match.balls}</td>
                    <td className="p-3">{match.fours}</td>
                    <td className="p-3">{match.sixes}</td>
                    <td className="p-3">{match.wickets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerDetail;
