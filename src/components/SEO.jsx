import React from 'react';

import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  type = 'website',
  canonicalUrl
}) => {
  const location = useLocation();
  const baseUrl = 'https://pslupdateslive.online';
  const currentUrl = `${baseUrl}${location.pathname}`.replace(/\/$/, '');
  const canonical = canonicalUrl || currentUrl;

  const defaultTitle = 'PSL Updates Live - Pakistan Super League 2026';
  const finalTitle = title ? `${title} | PSL Updates Live` : defaultTitle;
  const finalDescription = description || 'Live PSL 2026 scores, team standings, player statistics and latest news from Pakistan Super League.';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL - CRITICAL FOR SEO */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
