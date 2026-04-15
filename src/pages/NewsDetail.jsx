import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

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
  };

  if (!news) return <div>Loading...</div>;

  return (
    <>
      <SEO 
        title={`${news.title} | PSL Updates Live`}
        description={news.excerpt}
        url={`https://pslupdateslive.online/news/${id}`}
        type="article"
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">{news.title}</h1>
        <p>{news.content}</p>
      </div>
    </>
  );
};

export default NewsDetail;
