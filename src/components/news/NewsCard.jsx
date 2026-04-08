import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const NewsCard = ({ news, isFeatured = false }) => {
  return (
    <Link to={`/news/${news.id}`}>
      <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all ${isFeatured ? 'md:col-span-2 hover:-translate-y-1' : 'hover:-translate-y-1'}`}>
        {news.image_url && (
          <img 
            src={news.image_url} 
            alt={news.title}
            className={`w-full object-cover ${isFeatured ? 'h-64' : 'h-48'}`}
          />
        )}
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>{formatDistanceToNow(new Date(news.published_at), { addSuffix: true })}</span>
            <span className="mx-2">•</span>
            <span className="capitalize">{news.category?.replace('_', ' ')}</span>
            {news.views_count > 0 && (
              <>
                <span className="mx-2">•</span>
                <span>👁️ {news.views_count} views</span>
              </>
            )}
          </div>
          <h3 className={`font-bold mb-2 ${isFeatured ? 'text-2xl' : 'text-xl'} hover:text-green-600 transition-colors`}>
            {news.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt || news.content?.substring(0, 150)}...</p>
          <div className="flex items-center justify-between">
            <span className="text-green-600 font-semibold">Read More →</span>
            {news.author && <span className="text-sm text-gray-500">By {news.author}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
