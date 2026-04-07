import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TeamRoster from '../components/teams/TeamRoster';
import TeamStats from '../components/teams/TeamStats';
import Loader from '../components/common/Loader';
import { fetchTeamDetails } from '../services/teamService';
import { FaArrowLeft } from 'react-icons/fa';

const TeamDetail = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeam();
  }, [id]);

  const loadTeam = async () => {
    const data = await fetchTeamDetails(id);
    setTeam(data);
    setLoading(false);
  };

  if (loading) return <Loader />;
  if (!team) return <div>Team not found</div>;

  return (
    <div className="space-y-6">
      <Link to="/teams" className="inline-flex items-center text-green-600 hover:text-green-700">
        <FaArrowLeft className="mr-2" /> Back to Teams
      </Link>

      {/* Team Header */}
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <img src={team.logo} alt={team.name} className="w-32 h-32 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">{team.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-4">
          <div>
            <p className="text-gray-600">Captain</p>
            <p className="font-semibold">{team.captain}</p>
          </div>
          <div>
            <p className="text-gray-600">Coach</p>
            <p className="font-semibold">{team.coach}</p>
          </div>
          <div>
            <p className="text-gray-600">Home Ground</p>
            <p className="font-semibold">{team.homeGround}</p>
          </div>
          <div>
            <p className="text-gray-600">Championships</p>
            <p className="font-semibold">{team.titles}</p>
          </div>
        </div>
      </div>

      {/* Team Stats */}
      <TeamStats teamStats={team.stats} />

      {/* Team Roster */}
      <TeamRoster teamId={id} />
    </div>
  );
};

export default TeamDetail;