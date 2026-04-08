import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Teams = React.lazy(() => import('./pages/Teams'));
const Players = React.lazy(() => import('./pages/Players'));
const Matches = React.lazy(() => import('./pages/Matches'));
const Standings = React.lazy(() => import('./pages/Standings'));
const News = React.lazy(() => import('./pages/News'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-gradient-to-r from-green-800 to-green-600 text-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <Link to="/" className="text-2xl font-bold hover:text-yellow-300 transition">
                🏏 PSL Fan Hub
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
                <Link to="/teams" className="hover:text-yellow-300 transition">Teams</Link>
                <Link to="/players" className="hover:text-yellow-300 transition">Players</Link>
                <Link to="/matches" className="hover:text-yellow-300 transition">Matches</Link>
                <Link to="/standings" className="hover:text-yellow-300 transition">Standings</Link>
                <Link to="/news" className="hover:text-yellow-300 transition">News</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <React.Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/players" element={<Players />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/standings" element={<Standings />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </React.Suspense>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-12 py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2026 PSL Fan Hub. All rights reserved.</p>
            <p className="text-gray-400 text-sm mt-2">Pakistan Super League Fan Platform</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
