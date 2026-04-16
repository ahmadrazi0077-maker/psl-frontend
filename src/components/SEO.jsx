import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title = 'PSL Updates Live - Pakistan Super League 2026',
  description = 'Get live scores, team standings, player statistics, and latest news from Pakistan Super League 2026. Follow all PSL matches live.',
  keywords = 'PSL, PSL 2026, Pakistan Super League, Cricket, Live Scores, PSL Teams, PSL Players',
  image = 'https://pslupdateslive.online/og-image.jpg',
  url = 'https://pslupdateslive.online',
  type = 'website'
}) => {
  const location = useLocation();
  const currentUrl = url + location.pathname;

  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: currentUrl },
      { property: 'og:image', content: image },
      { property: 'og:type', content: type },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image }
    ];
    
    // Update or create meta tags
    metaTags.forEach(tag => {
      let meta;
      if (tag.name) {
        meta = document.querySelector(`meta[name="${tag.name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', tag.name);
          document.head.appendChild(meta);
        }
      } else if (tag.property) {
        meta = document.querySelector(`meta[property="${tag.property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', tag.property);
          document.head.appendChild(meta);
        }
      }
      if (meta) {
        if (tag.name) meta.setAttribute('content', tag.content);
        if (tag.property) meta.setAttribute('content', tag.content);
      }
    });
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);
    
  }, [title, description, keywords, image, currentUrl, type]);

  return null;
};

export default SEO;
