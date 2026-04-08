import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl text-gray-600 mb-8">Page Not Found</h2>
      <Link to="/" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
