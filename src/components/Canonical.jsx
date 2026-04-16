import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Canonical = () => {
  const location = useLocation();
  const baseUrl = 'https://pslupdateslive.online';
  const currentUrl = `${baseUrl}${location.pathname}`.replace(/\/$/, '');

  useEffect(() => {
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);
  }, [currentUrl]);

  return null;
};

export default Canonical;
