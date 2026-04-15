export default async function handler(req, res) {
  const baseUrl = 'https://pslupdateslive.online';
  
  // You can fetch dynamic data here from Supabase
  // For now, using static URLs
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
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
  </url>
</urlset>`;
  
  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(xml);
}
