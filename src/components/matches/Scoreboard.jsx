import React from 'react';

const Scoreboard = ({ innings }) => {
  const battingStats = innings?.batting || [];
  const bowlingStats = innings?.bowling || [];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-800 text-white p-4">
        <h3 className="text-xl font-bold">{innings?.team} Innings</h3>
        <p className="text-2xl font-bold">
          {innings?.runs}/{innings?.wickets} ({innings?.overs} overs)
        </p>
      </div>
      
      <div className="p-4">
        <h4 className="font-semibold mb-2">Batting</h4>
        <table className="w-full mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Batsman</th>
              <th className="p-2 text-left">R</th>
              <th className="p-2 text-left">B</th>
              <th className="p-2 text-left">4s</th>
              <th className="p-2 text-left">6s</th>
              <th className="p-2 text-left">SR</th>
            </tr>
          </thead>
          <tbody>
            {battingStats.map((player, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">{player.name}</td>
                <td className="p-2 font-semibold">{player.runs}</td>
                <td className="p-2">{player.balls}</td>
                <td className="p-2">{player.fours}</td>
                <td className="p-2">{player.sixes}</td>
                <td className="p-2">{player.strikeRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <h4 className="font-semibold mb-2">Bowling</h4>
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Bowler</th>
              <th className="p-2 text-left">O</th>
              <th className="p-2 text-left">M</th>
              <th className="p-2 text-left">R</th>
              <th className="p-2 text-left">W</th>
              <th className="p-2 text-left">Econ</th>
            </tr>
          </thead>
          <tbody>
            {bowlingStats.map((player, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">{player.name}</td>
                <td className="p-2">{player.overs}</td>
                <td className="p-2">{player.maidens}</td>
                <td className="p-2">{player.runs}</td>
                <td className="p-2 font-semibold">{player.wickets}</td>
                <td className="p-2">{player.economy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scoreboard;