import React from 'react';
import NewsList from '../components/news/NewsList';

const News = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">PSL News & Updates</h1>
      <NewsList />
    </div>
  );
};

export default News;