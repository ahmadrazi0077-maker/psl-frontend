import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import Loader from '../common/Loader';
import { fetchNews } from '../../services/newsService';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    loadNews();
  }, [category]);

  const loadNews = async () => {
    const data = await fetchNews(category);
    setNews(data);
    setLoading(false);
  };

  const categories = ['all', 'match report', 'transfer', 'injury', 'announcement'];

  const featuredNews = news.find(n => n.isFeatured);
  const regularNews = news.filter(n => !n.isFeatured);

  if (loading) return <Loader />;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded capitalize ${category === cat ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {featuredNews && (
        <div className="mb-8">
          <NewsCard news={featuredNews} isFeatured={true} />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularNews.map(item => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </div>
  );
};

export default NewsList;