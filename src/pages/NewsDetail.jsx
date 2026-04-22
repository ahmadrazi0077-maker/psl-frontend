import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import Loader from '../components/common/Loader';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState([]);

  const fetchNewsDetail = useCallback(async () => {
    try {
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
  }, [id]);

  useEffect(() => {
    fetchNewsDetail();
    window.scrollTo(0, 0);
  }, [fetchNewsDetail]);

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
    <>
      <SEO 
        title={news.title}
        description={news.excerpt || news.content.substring(0, 160)}
        keywords={`PSL 2026, ${news.title}, Pakistan Super League, Cricket News`}
        image={news.image_url}
        type="article"
        publishedTime={news.published_at}
        modifiedTime={news.updated_at}
        author={news.author}
        canonicalUrl={`https://pslupdateslive.online/news/${id}`}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/news" className="text-green-600 hover:text-green-700 mb-4 inline-block">
          ← Back to News
        </Link>
        
        <article className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-4 border-b">
            <span>{new Date(news.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span>By {news.author || 'Admin'}</span>
            <span>{news.views_count || 0} views</span>
          </div>
          
          <div className="text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">{news.excerpt}</p>
            <div className="whitespace-pre-wrap">{news.content}</div>
          </div>
        </article>
        
        {/* Related News */}
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
    </>
  );
};

export default NewsDetail;
