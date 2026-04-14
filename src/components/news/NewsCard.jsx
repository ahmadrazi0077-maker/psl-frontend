import React from 'react';
import { Link } from 'react-router-dom';

const NewsCard = ({ news }) => {
  return (
    <Link to={`/news/${news.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{news.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{news.excerpt}</p>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{new Date(news.published_at).toLocaleDateString()}</span>
            <span className="text-green-600">Read More →</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
