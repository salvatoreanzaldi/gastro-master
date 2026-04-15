#!/usr/bin/env node

/**
 * Download Review Avatars from Google URLs
 *
 * Reads profile_photo_url from google-reviews.json and downloads images locally
 * Updates JSON with local paths: /assets/reviews-avatars/filename.jpg
 *
 * Usage: node scripts/download-review-avatars.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const REVIEWS_JSON = path.join(__dirname, '../public/data/google-reviews.json');
const AVATARS_DIR = path.join(__dirname, '../public/assets/reviews-avatars');

/**
 * Sanitize author name to create safe filename
 * "Ignazio Margherone" → "ignazio-margherone"
 */
function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9äöüß ]/g, '') // Keep only alphanumeric + umlauts
    .replace(/\s+/g, '-') // spaces → hyphens
    .substring(0, 50);
}

/**
 * Create unique filename (handle duplicates)
 */
function createUniqueFilename(baseName, existingNames) {
  let filename = `${baseName}.jpg`;
  let counter = 2;

  while (existingNames.has(filename)) {
    filename = `${baseName}-${counter}.jpg`;
    counter++;
  }

  return filename;
}

/**
 * Download image from URL and save to file
 */
async function downloadImage(url, targetPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(targetPath, Buffer.from(buffer));
    return true;
  } catch (error) {
    console.error(`      ❌ Failed to download: ${error.message}`);
    return false;
  }
}

async function downloadAvatars() {
  try {
    console.log('🖼️  Downloading review avatars from Google URLs...\n');

    // Ensure output directory exists
    if (!fs.existsSync(AVATARS_DIR)) {
      fs.mkdirSync(AVATARS_DIR, { recursive: true });
      console.log(`✓ Created directory: ${AVATARS_DIR}\n`);
    }

    // Read reviews JSON
    const data = JSON.parse(fs.readFileSync(REVIEWS_JSON, 'utf8'));
    const allReviews = data.tabs['Alle'] ?? Object.values(data.tabs)[0];

    if (!allReviews || allReviews.length === 0) {
      console.error('❌ No reviews found in JSON');
      process.exit(1);
    }

    // Collect unique URLs and generate filenames
    console.log('📋 Processing unique avatars...');
    const urlToFilename = new Map(); // url → filename
    const usedFilenames = new Set();

    for (const review of allReviews) {
      if (!review.profile_photo_url || urlToFilename.has(review.profile_photo_url)) {
        continue;
      }

      const baseName = sanitizeFilename(review.author_name);
      const filename = createUniqueFilename(baseName, usedFilenames);

      urlToFilename.set(review.profile_photo_url, filename);
      usedFilenames.add(filename);
    }

    console.log(`✓ Found ${urlToFilename.size} unique avatars\n`);

    // Download images
    console.log('⬇️  Downloading images...');
    let downloaded = 0;
    let skipped = 0;

    for (const [url, filename] of urlToFilename.entries()) {
      const targetPath = path.join(AVATARS_DIR, filename);

      // Skip if already exists
      if (fs.existsSync(targetPath)) {
        console.log(`   ⏭️  ${filename} (already exists)`);
        skipped++;
        continue;
      }

      process.stdout.write(`   ⬇️  ${filename} ... `);
      const success = await downloadImage(url, targetPath);

      if (success) {
        console.log('✓');
        downloaded++;
      } else {
        console.log('✗');
        // Don't mark as error - image stays with Google URL as fallback
      }

      // Avoid rate limiting - 50ms delay between requests
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    console.log(`\n✓ Downloaded: ${downloaded}, Skipped: ${skipped}\n`);

    // Update JSON with local paths
    console.log('📝 Updating JSON with local paths...');
    const urlToLocalPath = new Map();

    for (const [url, filename] of urlToFilename.entries()) {
      urlToLocalPath.set(url, `/assets/reviews-avatars/${filename}`);
    }

    // Update all tabs
    for (const tabName of data.availableTabs) {
      data.tabs[tabName] = data.tabs[tabName].map(review => ({
        ...review,
        profile_photo_url: urlToLocalPath.get(review.profile_photo_url) ?? review.profile_photo_url,
      }));
    }

    fs.writeFileSync(REVIEWS_JSON, JSON.stringify(data, null, 2));
    console.log(`✓ Updated: ${REVIEWS_JSON}\n`);

    console.log('✅ Avatar download complete!');
    console.log(`   Total images: ${urlToFilename.size}`);
    console.log(`   Output: ${AVATARS_DIR}\n`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

downloadAvatars();
