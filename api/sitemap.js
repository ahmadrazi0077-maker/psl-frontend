export default function handler(req, res) {
  // Only handle sitemap requestsimport { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const baseUrl = 'https://pslupdateslive.online';
  
  try {
    // Fetch all published news
    const { data: news, error } = await supabase
      .from('news')
      .select('id, slug, published_at, updated_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    
    // Generate XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add static pages
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
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }
    
    // Add all news pages dynamically
    for (const article of news) {
      const lastmod = article.updated_at || article.published_at || new Date().toISOString();
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/news/${article.id}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }
    
    xml += '</urlset>';
    
    // Set response headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.status(200).send(xml);
    
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}
  if (req.url === '/sitemap.xml') {
    const baseUrl = 'https://pslupdateslive.online';
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>2026-04-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/teams</loc>
    <lastmod>2026-04-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/players</loc>
    <lastmod>2026-04-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/matches</loc>
    <lastmod>2026-04-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/standings</loc>
    <lastmod>2026-04-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/news</loc>
    <lastmod>2026-04-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
    
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.status(200).send(xml);
  }
  
  // For any other API requests
  return res.status(404).json({ error: 'Not found' });
}
