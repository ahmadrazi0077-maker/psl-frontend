import React, { useEffect } from 'react';
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

  useEffect(() => {
    // Update document title
    document.title = finalTitle;
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', finalDescription);
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
    
    // Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', finalTitle);
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', finalDescription);
    
  }, [finalTitle, finalDescription, canonical]);

  return null;
};

export default SEO;
