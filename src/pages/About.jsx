import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FaTrophy, FaUsers, FaChartLine, FaNewspaper, FaCalendarAlt } from 'react-icons/fa';
import { GiCricketBat } from 'react-icons/gi';

const About = () => {
  return (
    <>
      <SEO 
        title="About Us - PSL Updates Live"
        description="PSL Updates Live is your trusted source for Pakistan Super League 2026 coverage. Get live scores, team standings, player stats, and exclusive news about PSL 11."
        keywords="About PSL Updates Live, PSL 2026 coverage, Pakistan Super League news, PSL live scores, cricket updates"
      />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 rounded-full px-4 py-2 mb-4">
            <span className="text-green-700 font-semibold">Welcome to PSL Updates Live</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Ultimate Destination for{' '}
            <span className="text-green-600">PSL 2026</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bringing the excitement of Pakistan Super League 11 directly to cricket fans worldwide
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At <strong>PSL Updates Live</strong>, we are passionate about delivering the most comprehensive, 
            accurate, and timely coverage of the Pakistan Super League. Our mission is to create a central 
            hub where cricket enthusiasts can find everything they need – from live scores and match schedules 
            to detailed player statistics and breaking news.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you're a die-hard fan of Lahore Qalandars, a Karachi Kings supporter, or simply love 
            the thrill of T20 cricket, we ensure you never miss a moment of the action.
          </p>
        </div>

        {/* What We Offer */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GiCricketBat className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Scores</h3>
            <p className="text-gray-600 text-sm">
              Real-time updates of all PSL 2026 matches with ball-by-ball commentary
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTrophy className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Points Table</h3>
            <p className="text-gray-600 text-sm">
              Up-to-date team standings, net run rates, and playoff qualification scenarios
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUsers className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Player Stats</h3>
            <p className="text-gray-600 text-sm">
              Detailed performance metrics of every PSL player, from batting averages to bowling economy
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaChartLine className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Team Analysis</h3>
            <p className="text-gray-600 text-sm">
              In-depth analysis of all 8 PSL teams including new franchises
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaNewspaper className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Latest News</h3>
            <p className="text-gray-600 text-sm">
              Breaking news, transfer updates, injury reports, and exclusive interviews
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCalendarAlt className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Match Schedule</h3>
            <p className="text-gray-600 text-sm">
              Complete PSL 2026 fixture list with dates, venues, and match timings
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-2xl text-white p-8 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-center">Why Choose PSL Updates Live?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">Fastest Updates</h3>
                <p className="text-sm text-green-100">Real-time score updates as they happen</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">100% Free Access</h3>
                <p className="text-sm text-green-100">No subscriptions or hidden fees</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">Mobile Friendly</h3>
                <p className="text-sm text-green-100">Optimized for all devices</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">Accurate Stats</h3>
                <p className="text-sm text-green-100">Verified data from official sources</p>
              </div>
            </div>
          </div>
        </div>

        {/* PSL 2026 Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About PSL 11 (2026)</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The <strong>Pakistan Super League 2026</strong> marks the 11th edition of Pakistan's premier 
            T20 cricket tournament. This historic season features an expanded format with <strong>8 teams</strong>, 
            including two new franchises – Hyderabad Kingsmen and Rawalpindiz – alongside the original six teams.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            With <strong>44 matches</strong> scheduled across Pakistan's iconic cricket venues, PSL 11 promises 
            more action, bigger rivalries, and unprecedented excitement. The tournament brings together world-class 
            international talent alongside Pakistan's finest cricketers.
          </p>
          <p className="text-gray-700 leading-relaxed">
            From the bowling fireworks of Shaheen Afridi to the batting elegance of Babar Azam, 
            PSL 2026 is set to be the most competitive season yet. Stay tuned to PSL Updates Live for 
            complete coverage of every ball, every wicket, and every celebration.
          </p>
        </div>

        {/* PSL Teams */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">PSL 2026 Teams</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Karachi Kings', 'Lahore Qalandars', 'Islamabad United', 'Peshawar Zalmi',
              'Quetta Gladiators', 'Multan Sultans', 'Hyderabad Kingsmen', 'Rawalpindiz'
            ].map((team, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 text-center hover:bg-green-50 transition">
                <span className="text-gray-800 font-medium">{team}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Our Commitment */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Commitment to You</h2>
          <p className="text-gray-700 leading-relaxed text-center mb-6">
            We are cricket fans just like you. Every update, every statistic, and every article is crafted 
            with care and accuracy. Our team works around the clock to ensure you get the most reliable 
            PSL coverage available anywhere.
          </p>
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Explore PSL 2026
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
