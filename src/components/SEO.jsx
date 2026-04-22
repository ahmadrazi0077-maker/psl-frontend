import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  type = 'website',
  canonicalUrl,
  publishedTime,
  modifiedTime,
  author = 'PSL Updates Live'
}) => {
  const location = useLocation();
  const baseUrl = 'https://pslupdateslive.online';
  
  // Remove trailing slashes for consistent URLs
  const currentPath = location.pathname.replace(/\/$/, '');
  const currentUrl = `${baseUrl}${currentPath}`;
  
  // Ensure canonical URL is consistent (no trailing slashes, no index.html)
  const canonical = canonicalUrl || currentUrl;
  
  // Default values
  const defaultTitle = 'PSL Updates Live - Pakistan Super League 2026';
  const finalTitle = title ? `${title} | PSL Updates Live` : defaultTitle;
  const finalDescription = description || 'Live PSL 2026 scores, team standings, player statistics and latest news from Pakistan Super League.';
  const defaultKeywords = 'PSL 2026, Pakistan Super League, PSL Live Scores, PSL Teams, PSL Players, PSL Schedule, Cricket Live';
  const finalKeywords = keywords || defaultKeywords;
  const defaultImage = 'https://pslupdateslive.online/og-image.jpg';
  const finalImage = image || defaultImage;

  useEffect(() => {
    // ============================================
    // 1. BASIC META TAGS
    // ============================================
    
    // Update document title
    document.title = finalTitle;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', finalDescription);
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', finalKeywords);
    
    // ============================================
    // 2. CANONICAL URL (MOST IMPORTANT FOR DUPLICATE ISSUES)
    // ============================================
    
    // Remove any existing canonical links first
    const existingCanonicals = document.querySelectorAll('link[rel="canonical"]');
    existingCanonicals.forEach(link => link.remove());
    
    // Add the correct canonical link
    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', canonical);
    document.head.appendChild(canonicalLink);
    
    // ============================================
    // 3. OPEN GRAPH (SOCIAL MEDIA)
    // ============================================
    
    // Remove existing OG tags to prevent duplicates
    const ogProperties = ['og:title', 'og:description', 'og:url', 'og:type', 'og:image', 'og:site_name', 'og:locale'];
    ogProperties.forEach(prop => {
      const tags = document.querySelectorAll(`meta[property="${prop}"]`);
      tags.forEach(tag => tag.remove());
    });
    
    // Add fresh OG tags
    const addMetaTag = (property, content) => {
      if (!content) return;
      const meta = document.createElement('meta');
      meta.setAttribute('property', property);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    };
    
    addMetaTag('og:title', finalTitle);
    addMetaTag('og:description', finalDescription);
    addMetaTag('og:url', canonical);
    addMetaTag('og:type', type);
    addMetaTag('og:image', finalImage);
    addMetaTag('og:site_name', 'PSL Updates Live');
    addMetaTag('og:locale', 'en_US');
    
    // ============================================
    // 4. TWITTER CARDS
    // ============================================
    
    // Remove existing Twitter tags
    const twitterNames = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:site'];
    twitterNames.forEach(name => {
      const tags = document.querySelectorAll(`meta[name="${name}"]`);
      tags.forEach(tag => tag.remove());
    });
    
    // Add fresh Twitter tags
    const addTwitterTag = (name, content) => {
      if (!content) return;
      const meta = document.createElement('meta');
      meta.setAttribute('name', name);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    };
    
    addTwitterTag('twitter:card', 'summary_large_image');
    addTwitterTag('twitter:title', finalTitle);
    addTwitterTag('twitter:description', finalDescription);
    addTwitterTag('twitter:image', finalImage);
    addTwitterTag('twitter:site', '@PSLUpdatesLive');
    
    // ============================================
    // 5. ARTICLE SPECIFIC TAGS
    // ============================================
    
    if (type === 'article') {
      // Remove existing article tags
      const articleProps = ['article:published_time', 'article:modified_time', 'article:author', 'article:section'];
      articleProps.forEach(prop => {
        const tags = document.querySelectorAll(`meta[property="${prop}"]`);
        tags.forEach(tag => tag.remove());
      });
      
      // Add fresh article tags
      if (publishedTime) {
        addMetaTag('article:published_time', publishedTime);
      }
      if (modifiedTime) {
        addMetaTag('article:modified_time', modifiedTime);
      } else if (publishedTime) {
        addMetaTag('article:modified_time', publishedTime);
      }
      addMetaTag('article:author', author);
      addMetaTag('article:section', 'Sports');
    }
    
    // ============================================
    // 6. ROBOTS META TAG (Prevent duplicate issues)
    // ============================================
    
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    
    // ============================================
    // 7. ALTERNATE LANGUAGE VERSIONS (if needed)
    // ============================================
    
    // Remove existing hreflang
    const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflang.forEach(link => link.remove());
    
    // ============================================
    // 8. VIEWPORT AND CHARSET (ensure they exist)
    // ============================================
    
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      document.head.appendChild(viewport);
    }
    
  }, [finalTitle, finalDescription, finalKeywords, canonical, type, finalImage, publishedTime, modifiedTime, author]);

  return null;
};

export default SEO;
