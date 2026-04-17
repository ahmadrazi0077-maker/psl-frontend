import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // Adjust path

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reset state when ID changes
  useEffect(() => {
    // Cleanup function - resets state when navigating away
    return () => {
      setNews(null);
      setLoading(true);
      setError(null);
    };
  }, []); // Empty array means this runs on unmount only

  // Fetch news when ID changes
  useEffect(() => {
    if (!id) return;

    let isMounted = true; // Prevent state updates if component unmounts

    const fetchNews = async () => {
      if (!isMounted) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        if (isMounted) {
          setNews(data);
          
          // Increment view count
          await supabase
            .from('news')
            .update({ views_count: (data.views_count || 0) + 1 })
            .eq('id', id);
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchNews();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [id]); // Re-run when ID changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Article</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button onClick={() => navigate('/news')} className="text-green-600 hover:underline">
          ← Back to News
        </button>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <button onClick={() => navigate('/news')} className="text-green-600 hover:underline">
          ← Back to News
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 text-green-600 hover:text-green-700 flex items-center gap-2"
      >
        ← Back to News
      </button>

      {news.image_url && (
        <img 
          src={news.image_url} 
          alt={news.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
          onError={(e) => {
            e.target.src = '/fallback-image.jpg';
          }}
        />
      )}

      <h1 className="text-4xl md:text-5xl font-bold mb-4">{news.title}</h1>

      <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-8 pb-4 border-b">
        <span className="capitalize bg-gray-100 px-3 py-1 rounded-full">
          {news.category?.replace('_', ' ')}
        </span>
        <span>
          📅 {new Date(news.published_at).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
        <span>✍️ By {news.author || 'PSL Updates Live Team'}</span>
        <span>👁️ {news.views_count || 0} views</span>
      </div>

      <div className="text-xl text-gray-700 italic mb-8 pl-4 border-l-4 border-green-500">
        {news.excerpt}
      </div>

      {/* Render HTML content properly */}
      <div 
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-green-600 prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />

      <div className="mt-12 pt-8 border-t">
        <h3 className="text-xl font-bold mb-4">Share this article</h3>
        <div className="flex gap-4">
          <button 
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Facebook
          </button>
          <button 
            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${news.title}`, '_blank')}
            className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition"
          >
            Twitter
          </button>
          <button 
            onClick={() => window.open(`https://wa.me/?text=${news.title} ${window.location.href}`, '_blank')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
