import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-green-700 text-white p-4">
          <div className="container mx-auto flex gap-6">
            <Link to="/" className="hover:text-yellow-300">Home</Link>
            <Link to="/teams" className="hover:text-yellow-300">Teams</Link>
            <Link to="/test" className="hover:text-yellow-300">Test</Link>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={
            <div className="container mx-auto text-center py-20">
              <h1 className="text-4xl font-bold text-green-700">PSL Fan Hub</h1>
              <p className="mt-4">If you see this, React Router is working!</p>
            </div>
          } />
          <Route path="/teams" element={
            <div className="container mx-auto py-20 text-center">
              <h2 className="text-2xl font-bold">Teams Page</h2>
            </div>
          } />
          <Route path="/test" element={
            <div className="container mx-auto py-20 text-center">
              <h2 className="text-2xl font-bold text-green-600">Test Page Works!</h2>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
