import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AutoSitemap = () => {
  useEffect(() => {
    // Listen for new news
    const subscription = supabase
      .channel('news_changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'news' },
        (payload) => {
          console.log('New news detected! Updating sitemap...');
          updateSitemapOnNewContent();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updateSitemapOnNewContent = async () => {
    // Call your backend API to regenerate sitemap
    try {
      await fetch('/api/regenerate-sitemap', { method: 'POST' });
      console.log('✅ Sitemap updated with new content');
    } catch (error) {
      console.error('Error updating sitemap:', error);
    }
  };

  return null;
};

export default AutoSitemap;
