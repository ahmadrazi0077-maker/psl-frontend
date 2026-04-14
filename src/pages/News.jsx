import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    try {
      let query = supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      
      if (category !== 'all') {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'announcement', 'match_report', 'transfer', 'interview', 'general'];

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading news...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px', color: '#1f2937' }}>PSL News & Updates</h1>
      
      {/* Category Filter */}
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              backgroundColor: category === cat ? '#166534' : '#e5e7eb',
              color: category === cat ? 'white' : '#374151',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {cat === 'all' ? 'All' : cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {news.map((item) => (
          <Link to={`/news/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              {item.image_url && (
                <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }} />
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ backgroundColor: '#e5e7eb', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', textTransform: 'capitalize' }}>
                  {item.category?.replace('_', ' ')}
                </span>
                <span style={{ color: '#6b7280', fontSize: '12px' }}>
                  {new Date(item.published_at).toLocaleDateString()}
                </span>
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>{item.title}</h2>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>{item.excerpt}</p>
              <p style={{ color: '#166534', marginTop: '16px', fontWeight: 'bold' }}>Read More →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default News;
