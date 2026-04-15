import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendar, FaEye } from 'react-icons/fa';

const NewsCard = ({ news, isFeatured = false }) => {
  return (
    <Link to={`/news/${news.id}`}>
      <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ${isFeatured ? 'md:col-span-2 hover:-translate-y-1' : 'hover:-translate-y-1'}`}>
        {news.image_url && (
          <img 
            src={news.image_url} 
            alt={news.title}
            className={`w-full object-cover ${isFeatured ? 'h-64' : 'h-48'}`}
          />
        )}
        <div className="p-6">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
            <span className="capitalize">{news.category?.replace('_', ' ')}</span>
            <span className="flex items-center gap-1">
              <FaCalendar size={12} /> {new Date(news.published_at).toLocaleDateString()}
            </span>
            {news.views_count > 0 && (
              <span className="flex items-center gap-1">
                <FaEye size={12} /> {news.views_count}
              </span>
            )}
          </div>
          <h3 className={`font-bold mb-2 ${isFeatured ? 'text-2xl' : 'text-xl'} hover:text-green-600 transition-colors line-clamp-2`}>
            {news.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-green-600 font-semibold hover:text-green-700 transition">
              Read More →
            </span>
            {news.author && (
              <span className="text-sm text-gray-500">By {news.author}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
