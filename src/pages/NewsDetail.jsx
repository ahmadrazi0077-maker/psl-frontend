import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Loader from '../components/common/Loader';
import SEO from '../components/SEO';

const NewsDetail = ({ news }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsDetail();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchNewsDetail = async () => {
    try {
      setLoading(true);
      
      const { data: newsData, error: newsError } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();
      
      if (newsError) throw newsError;
      setNews(newsData);
      
      // Update view count
      await supabase
        .from('news')
        .update({ views_count: (newsData.views_count || 0) + 1 })
        .eq('id', id);
      
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  
  if (!news) {
    return (
       <>
      <SEO 
        title={news.title}
        description={news.excerpt}
        image={news.image_url}
        type="article"
        publishedTime={news.published_at}
        modifiedTime={news.updated_at}
        author={news.author}
        canonicalUrl={`https://pslupdateslive.online/news/${news.id}`}
      />
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">News Not Found</h2>
        <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
        <Link to="/news" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="text-green-600 hover:text-green-700 mb-6 inline-block"
      >
        ← Back to News
      </button>

      {/* Article */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {news.image_url && (
          <img 
            src={news.image_url} 
            alt={news.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        )}
        
        <div className="p-6 md:p-8">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold capitalize">
              {news.category?.replace('_', ' ')}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            {news.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6 pb-4 border-b">
            <span>{new Date(news.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span>By {news.author || 'Admin'}</span>
            <span>{news.views_count || 0} views</span>
          </div>

          {/* Content */}
          <div className="text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">{news.excerpt}</p>
            <div className="whitespace-pre-wrap">
              {news.content}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default NewsDetail;
