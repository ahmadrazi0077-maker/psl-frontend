import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'PSL Updates Live - Pakistan Super League 2026',
  description = 'Get live scores, team standings, player statistics, and latest news from Pakistan Super League 2026. Follow all PSL matches live.',
  keywords = 'PSL, PSL 2026, Pakistan Super League, Cricket, Live Scores, PSL Teams, PSL Players',
  image = 'https://pslupdateslive.online/og-image.jpg',
  url = 'https://pslupdateslive.online',
  type = 'website'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="PSL Updates Live" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
