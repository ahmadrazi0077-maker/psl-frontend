import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Loader from '../components/common/Loader';
import { FaArrowLeft, FaCalendar, FaEye, FaUser, FaShare, FaWhatsapp, FaTwitter, FaFacebook } from 'react-icons/fa';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsDetail();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchNewsDetail = async () => {
    try {
      setLoading(true);
      
      // Fetch current news
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
      
      // Fetch related news (same category, different id)
      if (newsData.category) {
        const { data: relatedData } = await supabase
          .from('news')
          .select('*')
          .eq('category', newsData.category)
          .eq('is_published', true)
          .neq('id', id)
          .order('published_at', { ascending: false })
          .limit(3);
        
        setRelatedNews(relatedData || []);
      }
      
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const shareOnWhatsApp = () => {
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(news.title + ' ' + url)}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  if (loading) return <Loader />;
  
  if (!news) {
    return (
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
        className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 transition"
      >
        <FaArrowLeft /> Back to News
      </button>

      {/* Article Header */}
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
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-4 border-b">
            <span className="flex items-center gap-1">
              <FaCalendar /> {new Date(news.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-1">
              <FaUser /> {news.author || 'Admin'}
            </span>
            <span className="flex items-center gap-1">
              <FaEye /> {news.views_count || 0} views
            </span>
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              {news.excerpt}
            </p>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {news.content}
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-3">Share this article:</h3>
            <div className="flex gap-3">
              <button 
                onClick={shareOnWhatsApp}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                <FaWhatsapp /> WhatsApp
              </button>
              <button 
                onClick={shareOnTwitter}
                className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
              >
                <FaTwitter /> Twitter
              </button>
              <button 
                onClick={shareOnFacebook}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <FaFacebook /> Facebook
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related News Section */}
      {relatedNews.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map((item) => (
              <Link key={item.id} to={`/news/${item.id}`}>
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.excerpt}</p>
                  <div className="text-xs text-gray-400">
                    {new Date(item.published_at).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsDetail;
