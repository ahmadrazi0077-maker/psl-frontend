import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Set headers
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  
  const baseUrl = 'https://pslupdateslive.online';
  
  try {
    // Initialize Supabase with environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;
    
    let news = [];
    
    // Only try to fetch if credentials exist
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data } = await supabase
        .from('news')
        .select('id, published_at')
        .eq('is_published', true)
        .limit(50);
      
      news = data || [];
    }
    
    // Build XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/teams</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/players</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/matches</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/standings</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/news</loc>
    <priority>0.9</priority>
  </url>`;
    
    // Add news articles
    for (const article of news) {
      xml += `
  <url>
    <loc>${baseUrl}/news/${article.id}</loc>
    <lastmod>${article.published_at || new Date().toISOString()}</lastmod>
    <priority>0.7</priority>
  </url>`;
    }
    
    xml += `
</urlset>`;
    
    res.status(200).send(xml);
    
  } catch (error) {
    console.error('Sitemap error:', error);
    // Fallback sitemap
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
  </url>
</urlset>`;
    res.status(200).send(fallbackXml);
  }
}
