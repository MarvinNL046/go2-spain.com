#!/usr/bin/env node

/**
 * Data verification script for go2-spain.com
 *
 * Checks that all data files are valid JSON and have required fields.
 * Usage: node scripts/verify-data.js
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(process.cwd(), 'data');
let errors = 0;
let warnings = 0;
let filesChecked = 0;

function checkJsonFile(filePath) {
  filesChecked++;
  const relativePath = path.relative(process.cwd(), filePath);

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);

    // Check index files
    if (path.basename(filePath) === 'index.json') {
      if (!Array.isArray(data)) {
        console.error(`ERROR: ${relativePath} - index.json should be an array`);
        errors++;
        return;
      }

      for (const item of data) {
        if (!item.slug) {
          console.error(`ERROR: ${relativePath} - item missing 'slug' field`);
          errors++;
        }
        if (!item.name && !item.title) {
          console.warn(`WARNING: ${relativePath} - item "${item.slug}" missing 'name' or 'title'`);
          warnings++;
        }
      }

      console.log(`OK: ${relativePath} (${data.length} items)`);
      return;
    }

    // Check individual data files
    if (typeof data !== 'object' || data === null) {
      console.error(`ERROR: ${relativePath} - should be a JSON object`);
      errors++;
      return;
    }

    if (!data.slug && !data.name && !data.title) {
      console.warn(`WARNING: ${relativePath} - missing common identifier field`);
      warnings++;
    }

    console.log(`OK: ${relativePath}`);
  } catch (err) {
    console.error(`ERROR: ${relativePath} - ${err.message}`);
    errors++;
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith('.json')) {
      checkJsonFile(fullPath);
    }
  }
}

console.log('Verifying data files...\n');
walkDir(dataDir);

console.log(`\n--- Summary ---`);
console.log(`Files checked: ${filesChecked}`);
console.log(`Errors: ${errors}`);
console.log(`Warnings: ${warnings}`);

if (errors > 0) {
  console.log('\nData verification FAILED');
  process.exit(1);
} else {
  console.log('\nData verification PASSED');
}
