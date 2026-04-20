const puppeteer = require('puppeteer');
const express = require('express');
const { mkdirSync, writeFileSync } = require('fs');
const { join, dirname } = require('path');

const DIST_DIR = join(process.cwd(), 'build');
const PORT = 3005;

// Add your most important URLs here
const ROUTES = [
  '/',
  '/teams',
  '/players', 
  '/matches',
  '/standings',
  '/news',
  '/about'
];

async function prerender() {
  // Start local server
  const app = express();
  app.use(express.static(DIST_DIR));
  app.use((_, res) => {
    res.sendFile(join(DIST_DIR, 'index.html'));
  });

  const server = app.listen(PORT);
  console.log(`[prerender] Server running on http://localhost:${PORT}`);

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    for (const route of ROUTES) {
      const url = `http://localhost:${PORT}${route}`;
      console.log(`[prerender] Rendering ${url}`);

      await page.goto(url, { waitUntil: 'networkidle0' });
      const html = await page.content();

      const isRoot = route === '/';
      const filePath = isRoot
        ? join(DIST_DIR, 'index.html')
        : join(DIST_DIR, route, 'index.html');

      mkdirSync(dirname(filePath), { recursive: true });
      writeFileSync(filePath, html);
      console.log(`[prerender] Saved ${filePath}`);
    }

    await browser.close();
  } finally {
    server.close();
  }
}

prerender().catch(console.error);
