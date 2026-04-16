import { supabase } from '../lib/supabase';

const BASE_URL = 'https://pslupdateslive.online';

// Generate sitemap XML
export const generateSitemapXML = async () => import { supabase } from '../lib/supabase';
import fs from 'fs';

const generateSitemap = async () => {
  const baseUrl = 'https://pslupdateslive.online';
  
  // Fetch all news
  const { data: news } = await supabase
    .from('news')
    .select('id, published_at')
    .eq('is_published', true);
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Static pages
  const staticPages = ['/', '/teams', '/players', '/matches', '/standings', '/news'];
  for (const page of staticPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${page}</loc>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += `  </url>\n`;
  }
  
  // News pages
  for (const article of news) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/news/${article.id}</loc>\n`;
    xml += `    <lastmod>${article.published_at}</lastmod>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }
  
  xml += '</urlset>';
  
  // Write to public folder
  fs.writeFileSync('public/sitemap.xml', xml);
  console.log('✅ Sitemap generated with', news.length, 'news articles');
};

generateSitemap();{
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // 1. Static Pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/teams', priority: '0.9', changefreq: 'weekly' },
    { url: '/players', priority: '0.9', changefreq: 'weekly' },
    { url: '/matches', priority: '0.8', changefreq: 'daily' },
    { url: '/standings', priority: '0.8', changefreq: 'daily' },
    { url: '/news', priority: '0.9', changefreq: 'daily' },
  ];
  
  for (const page of staticPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }
  
  // 2. Dynamic Pages - Teams
  const { data: teams } = await supabase.from('teams').select('id, name, updated_at');
  if (teams) {
    for (const team of teams) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/teams/${team.id}</loc>\n`;
      xml += `    <lastmod>${team.updated_at || new Date().toISOString()}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }
  }
  
  // 3. Dynamic Pages - Players
  const { data: players } = await supabase.from('players').select('id, name, updated_at').limit(100);
  if (players) {
    for (const player of players) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/players/${player.id}</loc>\n`;
      xml += `    <lastmod>${player.updated_at || new Date().toISOString()}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    }
  }
  
  // 4. Dynamic Pages - News (Most Important for SEO)
  const { data: news } = await supabase
    .from('news')
    .select('id, slug, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false });
  
  if (news) {
    for (const article of news) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/news/${article.id}</loc>\n`;
      xml += `    <lastmod>${article.published_at || new Date().toISOString()}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    }
  }
  
  // 5. Dynamic Pages - Matches
  const { data: matches } = await supabase
    .from('matches')
    .select('id, match_date')
    .order('match_date', { ascending: false });
  
  if (matches) {
    for (const match of matches) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/matches/${match.id}</loc>\n`;
      xml += `    <lastmod>${match.match_date || new Date().toISOString()}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }
  }
  
  xml += '</urlset>';
  return xml;
};

// Generate and save sitemap
export const updateSitemap = async () => {
  try {
    const xml = await generateSitemapXML();
    
    // In browser environment, you can't write files directly
    // Instead, we'll make an API call to save it
    const response = await fetch('/api/save-sitemap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ xml })
    });
    
    if (response.ok) {
      console.log('✅ Sitemap updated successfully!');
    }
  } catch (error) {
    console.error('❌ Error updating sitemap:', error);
  }
};
