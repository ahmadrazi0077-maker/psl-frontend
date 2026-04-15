export default function handler(req, res) {
  // Only handle sitemap requests
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
