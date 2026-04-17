import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Loader from '../components/common/Loader';
import LiveScores from './pages/LiveScores';

// Lazy load pages
const Home = lazy(() => import('../pages/Home'));
const Teams = lazy(() => import('../pages/Teams'));
const TeamDetail = lazy(() => import('../pages/TeamDetail'));
const Players = lazy(() => import('../pages/Players'));
const PlayerDetail = lazy(() => import('../pages/PlayerDetail'));
const Matches = lazy(() => import('../pages/Matches'));
const Standings = lazy(() => import('../pages/Standings'));
const News = lazy(() => import('../pages/News'));
const NewsDetail = lazy(() => import('../pages/NewsDetail'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Nested routes */}
          <Route index element={<Home />} />
          <Route path="teams" element={<Teams />} />
          <Route path="teams/:id" element={<TeamDetail />} />
          <Route path="players" element={<Players />} />
          <Route path="players/:id" element={<PlayerDetail />} />
          <Route path="matches" element={<Matches />} />
          <Route path="standings" element={<Standings />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="/LiveScores" element={<LiveScores />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
