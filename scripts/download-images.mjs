#!/usr/bin/env node
/**
 * Download Unsplash images for Go2Spain
 * All photos are free under the Unsplash License (commercial use OK)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, '..', 'public', 'images');

const IMAGES = {
  cities: {
    'madrid': 'photo-1753742284274-d0248f9ce24b',
    'barcelona': 'photo-1659003587819-357640764fa6',
    'seville': 'photo-1636800045676-425630d794e4',
    'valencia': 'photo-1697578343810-24576e636267',
    'granada': 'photo-1722466122465-387f414fd44e',
    'bilbao': 'photo-1748790754915-b7169fb3d29d',
    'san-sebastian': 'photo-1720894961992-61b5d9ec0931',
    'malaga': 'photo-1709229001947-23eef33c12a5',
    'toledo': 'photo-1670691377771-68fdcc987e64',
    'salamanca': 'photo-1590516654873-db527efb0dc5',
  },
  food: {
    'paella': 'photo-1747709790554-092f0e5723df',
    'tapas': 'photo-1565599837630-15af1496cd6e',
    'gazpacho': 'photo-1589187154184-995b8a4e740a',
    'churros': 'photo-1695234502934-dca6a45f88cb',
    'tortilla-espanola': 'photo-1584289134474-2123caf15113',
    'jamon-iberico': 'photo-1572788493895-3a9a445fe36e',
    'patatas-bravas': 'photo-1615830783066-26a99bc9d959',
    'croquetas': 'photo-1626011852881-4609127619a8',
    'sangria': 'photo-1650977118160-a2a7a7ad54cb',
    'crema-catalana': 'photo-1745186487034-1fb021059216',
  },
  hero: {
    'spain-hero-1': 'photo-1751240261953-61968db052a2',
    'spain-hero-2': 'photo-1693668560647-6636518ebdf4',
    'spain-hero-3': 'photo-1593174898997-488a0443e852',
  },
};

async function download(photoId, outPath) {
  const url = `https://images.unsplash.com/${photoId}?w=1200&q=80&auto=format`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Go2Spain/1.0' } });
  if (!res.ok) return false;
  const buffer = Buffer.from(await res.arrayBuffer());
  try {
    const sharp = (await import('sharp')).default;
    await sharp(buffer).resize(1200, 800, { fit: 'cover' }).webp({ quality: 80 }).toFile(outPath);
  } catch {
    fs.writeFileSync(outPath.replace('.webp', '.jpg'), buffer);
  }
  return true;
}

async function main() {
  console.log('🇪🇸 Downloading images for Go2Spain...\n');
  for (const [cat, items] of Object.entries(IMAGES)) {
    fs.mkdirSync(path.join(PUBLIC, cat), { recursive: true });
    console.log(`📁 ${cat}:`);
    for (const [slug, id] of Object.entries(items)) {
      const out = path.join(PUBLIC, cat, `${slug}.webp`);
      if (fs.existsSync(out) && fs.statSync(out).size > 1000) { console.log(`  ✓ ${slug} (exists)`); continue; }
      const ok = await download(id, out);
      console.log(ok ? `  ✓ ${slug}` : `  ✗ ${slug}`);
      await new Promise(r => setTimeout(r, 300));
    }
  }
  console.log('\n✅ Done!');
}

main().catch(console.error);
