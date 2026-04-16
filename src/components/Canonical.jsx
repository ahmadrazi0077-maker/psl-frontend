import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const Canonical = () => {
  const location = useLocation();
  const baseUrl = 'https://pslupdateslive.online';
  const currentUrl = `${baseUrl}${location.pathname}`.replace(/\/$/, '');

  return (
    <Helmet>
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default Canonical;
