#!/usr/bin/env node

/**
 * Sitemap generator for go2-spain.com
 *
 * Reads all data files and generates a comprehensive sitemap.xml
 * Usage: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://go2-spain.com';
const TODAY = new Date().toISOString().split('T')[0];

function loadJsonSafe(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

function getSlugsFromDataDir(dirPath) {
  try {
    return fs
      .readdirSync(dirPath)
      .filter((f) => f.endsWith('.json') && f !== 'index.json')
      .map((f) => f.replace('.json', ''));
  } catch {
    return [];
  }
}

function getBlogSlugs() {
  const blogDir = path.join(process.cwd(), 'content', 'blog', 'en');
  try {
    return fs
      .readdirSync(blogDir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace('.md', ''));
  } catch {
    // Try flat blog dir
    const flatDir = path.join(process.cwd(), 'content', 'blog');
    try {
      return fs
        .readdirSync(flatDir)
        .filter((f) => f.endsWith('.md'))
        .map((f) => f.replace('.md', ''));
    } catch {
      return [];
    }
  }
}

function urlEntry(loc, changefreq = 'weekly', priority = '0.8') {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function main() {
  const dataDir = path.join(process.cwd(), 'data');
  const urls = [];

  // Homepage
  urls.push(urlEntry(`${SITE_URL}/`, 'daily', '1.0'));

  // Static pages
  const staticPages = [
    { path: '/city/', priority: '0.9' },
    { path: '/food/', priority: '0.9' },
    { path: '/drinks/', priority: '0.9' },
    { path: '/region/', priority: '0.9' },
    { path: '/islands/', priority: '0.9' },
    { path: '/visa/', priority: '0.8' },
    { path: '/transport/', priority: '0.9' },
    { path: '/weather/', priority: '0.9' },
    { path: '/esim/', priority: '0.8' },
    { path: '/travel-insurance/', priority: '0.8' },
    { path: '/practical-info/', priority: '0.8' },
    { path: '/blog/', priority: '0.9', changefreq: 'daily' },
    { path: '/destinations/', priority: '0.8' },
    { path: '/experiences/', priority: '0.8' },
    { path: '/itineraries/', priority: '0.8' },
    { path: '/about/', priority: '0.6', changefreq: 'monthly' },
    { path: '/contact/', priority: '0.6', changefreq: 'monthly' },
    { path: '/editorial-policy/', priority: '0.4', changefreq: 'yearly' },
    { path: '/how-we-research/', priority: '0.4', changefreq: 'yearly' },
    { path: '/affiliate-disclosure/', priority: '0.4', changefreq: 'yearly' },
    { path: '/privacy/', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms/', priority: '0.3', changefreq: 'yearly' },
  ];

  for (const page of staticPages) {
    urls.push(urlEntry(`${SITE_URL}${page.path}`, page.changefreq || 'weekly', page.priority));
  }

  // Dynamic data pages
  const dynamicSections = [
    { dir: 'cities', prefix: '/city/' },
    { dir: 'food', prefix: '/food/' },
    { dir: 'drinks', prefix: '/drinks/' },
    { dir: 'regions', prefix: '/region/' },
    { dir: 'islands', prefix: '/islands/' },
  ];

  for (const section of dynamicSections) {
    const slugs = getSlugsFromDataDir(path.join(dataDir, section.dir));
    for (const slug of slugs) {
      urls.push(urlEntry(`${SITE_URL}${section.prefix}${slug}/`, 'weekly', '0.7'));
    }
  }

  // Blog posts
  const blogSlugs = getBlogSlugs();
  for (const slug of blogSlugs) {
    urls.push(urlEntry(`${SITE_URL}/blog/${slug}/`, 'monthly', '0.6'));
  }

  // Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');
  console.log(`Sitemap generated with ${urls.length} URLs -> ${outputPath}`);

  // Also update sitemap-index.xml
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>
`;

  const indexPath = path.join(process.cwd(), 'public', 'sitemap-index.xml');
  fs.writeFileSync(indexPath, indexXml, 'utf-8');
  console.log(`Sitemap index updated -> ${indexPath}`);
}

main();
