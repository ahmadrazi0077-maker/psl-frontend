import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import Loader from '../components/common/Loader';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, [id]);

  const fetchNews = async () => {
    const { data } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();
    setNews(data);
    setLoading(false);
    
    // Increment view count
    if (data) {
      await supabase
        .from('news')
        .update({ views_count: (data.views_count || 0) + 1 })
        .eq('id', id);
    }
  };

  if (loading) return <Loader />;
  if (!news) return <div className="text-center py-20">News not found</div>;

  return (
    <>
      <SEO 
        title={news.title}
        description={news.excerpt || news.content.substring(0, 160)}
        keywords={`PSL 2026, ${news.title}, Pakistan Super League, Cricket News`}
        image={news.image_url}
        type="article"
        canonicalUrl={`https://pslupdateslive.online/news/${id}`}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/news" className="text-green-600 hover:text-green-700 mb-4 inline-block">
          ← Back to News
        </Link>
        
        <article className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
          <div className="text-gray-500 text-sm mb-6">
            {new Date(news.published_at).toLocaleDateString()} | By {news.author || 'Admin'} | 👁️ {news.views_count || 0} views
          </div>
          <div className="text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">{news.excerpt}</p>
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>
        </article>
      </div>
    </>
  );
};

export default NewsDetail;
