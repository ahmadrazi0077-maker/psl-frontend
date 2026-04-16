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
    
    // Update or create meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: finalTitle },
      { property: 'og:description', content: finalDescription },
      { property: 'og:url', content: canonical },
      { property: 'og:type', content: type }
    ];
    
    if (image) {
      ogTags.push({ property: 'og:image', content: image });
    }
    
    ogTags.forEach(tag => {
      let meta = document.querySelector(`meta[property="${tag.property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', tag.content);
    });
    
    // Twitter tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: finalTitle },
      { name: 'twitter:description', content: finalDescription }
    ];
    
    if (image) {
      twitterTags.push({ name: 'twitter:image', content: image });
    }
    
    twitterTags.forEach(tag => {
      let meta = document.querySelector(`meta[name="${tag.name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', tag.name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', tag.content);
    });
    
  }, [finalTitle, finalDescription, keywords, canonical, type, image]);

  return null;
};

export default SEO;
