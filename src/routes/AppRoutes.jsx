import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/layout/Layout';
import Loader from '../components/common/Loader';

// Lazy load pages for better performance
const Home = lazy(() => import('../pages/Home'));
const Matches = lazy(() => import('../pages/Matches'));
const LiveMatch = lazy(() => import('../pages/LiveMatch'));
const Teams = lazy(() => import('../pages/Teams'));
const TeamDetail = lazy(() => import('../pages/TeamDetail'));
const Players = lazy(() => import('../pages/Players'));
const PlayerDetail = lazy(() => import('../pages/PlayerDetail'));
const Standings = lazy(() => import('../pages/Standings'));
const News = lazy(() => import('../pages/News'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const AdminDashboard = lazy(() => import('../pages/Admin/AdminDashboard'));

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  return isAuthenticated && user?.role === 'admin' 
    ? children 
    : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="matches" element={<Matches />} />
          <Route path="matches/:id" element={<LiveMatch />} />
          <Route path="teams" element={<Teams />} />
          <Route path="teams/:id" element={<TeamDetail />} />
          <Route path="players" element={<Players />} />
          <Route path="players/:id" element={<PlayerDetail />} />
          <Route path="standings" element={<Standings />} />
          <Route path="news" element={<News />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="admin" element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;