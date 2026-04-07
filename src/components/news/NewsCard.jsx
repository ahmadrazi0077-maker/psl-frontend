import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const NewsCard = ({ news, isFeatured = false }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow ${isFeatured ? 'md:col-span-2' : ''}`}>
      {news.image && (
        <img 
          src={news.image} 
          alt={news.title}
          className={`w-full object-cover ${isFeatured ? 'h-64' : 'h-48'}`}
        />
      )}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{formatDistanceToNow(new Date(news.date), { addSuffix: true })}</span>
          <span className="mx-2">•</span>
          <span>{news.category}</span>
        </div>
        <h3 className={`font-bold mb-2 ${isFeatured ? 'text-2xl' : 'text-xl'}`}>
          {news.title}
        </h3>
        <p className="text-gray-600 mb-4">{news.excerpt}</p>
        <button className="text-green-600 font-semibold hover:text-green-700">
          Read More →
        </button>
      </div>
    </div>
  );
};

export default NewsCard;