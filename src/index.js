import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  if (rootElement.hasChildNodes()) {
    // Prerendered HTML exists - hydrate it
    ReactDOM.hydrateRoot(rootElement, <App />);
  } else {
    // Normal SPA mode
    ReactDOM.createRoot(rootElement).render(<App />);
  }
}
