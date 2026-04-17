#!/usr/bin/env node

/**
 * Google Sheets → JSON Review Sync (Multi-Tab Version)
 *
 * Reads reviews from multiple Google Sheet tabs and converts to JSON format
 * Columns: A=Name, B=Sterne, C=Text, D=Datum, E=Foto-URL, F=Bewertung-URL
 *
 * Safety Features:
 * - Error handling: Falls Google Sheets nicht erreichbar → alte JSON behalten
 * - Validierung: Jeder Tab muss mindestens 1 Review haben
 * - Logging: Detailliertes Log pro Tab
 *
 * Usage: node scripts/sync-reviews.js
 */

import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const SHEETS_ID = process.env.GOOGLE_SHEETS_ID;
const SERVICE_ACCOUNT_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

if (!SHEETS_ID || !SERVICE_ACCOUNT_JSON) {
  console.error('❌ Missing required environment variables:');
  console.error('   GOOGLE_SHEETS_ID:', SHEETS_ID ? '✓' : '✗');
  console.error('   GOOGLE_SERVICE_ACCOUNT_JSON:', SERVICE_ACCOUNT_JSON ? '✓' : '✗');
  process.exit(1);
}

// Parse service account JSON
let serviceAccount;
try {
  serviceAccount = typeof SERVICE_ACCOUNT_JSON === 'string'
    ? JSON.parse(SERVICE_ACCOUNT_JSON)
    : SERVICE_ACCOUNT_JSON;
} catch (error) {
  console.error('❌ Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON:', error.message);
  process.exit(1);
}

// Initialize Google Sheets API
const sheets = google.sheets({
  version: 'v4',
  auth: new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  }),
});


/**
 * Get local avatar path if it exists, otherwise use Google URL
 * Converts "John Doe" → "/assets/reviews-avatars/john-doe.jpg"
 * Preserves Unicode characters like ü, ö, ä
 */
function getAvatarPath(authorName, googlePhotoUrl) {
  if (!authorName) return googlePhotoUrl;
  
  // Convert name to slug: "John Doe" → "john-doe"
  // Only replace spaces and remove problematic chars, preserve Unicode
  const slug = authorName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')                    // spaces → dashes
    .replace(/[^a-z0-9\-äöüß]/g, '')        // keep letters, numbers, dashes, and German umlauts
    .replace(/-+/g, '-');                     // multiple dashes → single dash
  
  const localPath = `/assets/reviews-avatars/${slug}.jpg`;
  
  // Check if local file exists
  try {
    const fullPath = path.join(process.cwd(), 'public', localPath);
    if (fs.existsSync(fullPath)) {
      return localPath;
    }
  } catch (e) {
    // Silently fail and use Google URL
  }
  
  return googlePhotoUrl;
}

/**
 * Converts a sheet row to a GoogleReview object
 * Row format: [Name, Sterne, Text, Datum, Foto-URL, Bewertung-URL]
 */
function parseRowToReview(row, index) {
  const [name, starsStr, text, dateStr, photoUrl, reviewUrl] = row;
  const rating = Math.max(1, Math.min(5, Math.round(parseFloat(starsStr) || 0)));

  // Parse date - handle various formats
  let timestamp = Math.floor(Date.now() / 1000);
  if (dateStr) {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      timestamp = Math.floor(parsed.getTime() / 1000);
    }
  }

  // Use local avatar if available, otherwise use Google URL
  const avatarUrl = getAvatarPath(name, photoUrl);

  return {
    id: `${timestamp}-${name || `review-${index}`}`,
    rating,
    text: text || '',
    author_name: name || 'Anonymous',
    relative_time_description: dateStr || 'Recently',
    profile_photo_url: avatarUrl || null,
    author_url: reviewUrl || null,
    time: timestamp,
  };
}

async function syncReviews() {
  try {
    console.log('🔄 Syncing reviews from Google Sheets...');
    console.log(`   Sheet ID: ${SHEETS_ID}`);
    console.log(`   Service Account: ${serviceAccount.client_email}\n`);

    // Step 1: Get all tab names
    console.log('📋 Loading sheet metadata...');
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SHEETS_ID,
      fields: 'sheets.properties.title',
    });

    const tabNames = spreadsheet.data.sheets
      ?.map(s => s.properties.title)
      .filter(name => name && !name.startsWith('_')) // Ignore hidden tabs starting with _
      || [];

    if (tabNames.length === 0) {
      console.error('❌ No tabs found in Google Sheet');
      process.exit(1);
    }

    console.log(`✓ Found ${tabNames.length} tab(s): ${tabNames.join(', ')}\n`);

    // Step 2: Load reviews from each tab in parallel
    console.log('📥 Loading reviews from each tab...');
    const tabDataEntries = await Promise.all(
      tabNames.map(async (tabName) => {
        try {
          const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEETS_ID,
            range: `'${tabName}'!A2:F`, // A2:F to skip header, quotes for special chars
          });

          const rows = response.data.values || [];
          const validRows = rows.filter(row => row && row[0]); // Skip empty rows
          const reviews = validRows.map((row, index) => parseRowToReview(row, index));

          console.log(`   "${tabName}": ${reviews.length} reviews`);
          return [tabName, reviews];
        } catch (error) {
          console.error(`   ❌ Failed to load tab "${tabName}": ${error.message}`);
          return [tabName, []]; // Return empty array for this tab
        }
      })
    );

    const tabs = Object.fromEntries(tabDataEntries);

    // Step 3: Validate - each tab must have at least 1 review
    console.log('\n✓ Validating tabs...');
    const invalidTabs = Object.entries(tabs)
      .filter(([_, reviews]) => reviews.length === 0)
      .map(([tabName]) => tabName);

    if (invalidTabs.length > 0) {
      console.error(`\n❌ Validation failed! Empty tabs: ${invalidTabs.join(', ')}`);
      console.error('   Each tab must have at least 1 review.');
      console.error('   → Using fallback: preserving old JSON file\n');
      process.exit(1);
    }

    console.log('   ✓ All tabs have reviews\n');

    // Step 4: Calculate statistics (from "Alle" tab if it exists, otherwise first tab)
    console.log('📊 Calculating statistics...');
    const statsSourceTab = tabs['Alle'] ?? Object.values(tabs)[0];
    const totalRating = statsSourceTab.length > 0
      ? Math.round((statsSourceTab.reduce((sum, r) => sum + r.rating, 0) / statsSourceTab.length) * 10) / 10
      : 0;

    // Use hardcoded totalCount (GMB total from Google My Business)
    const totalCount = 131;

    console.log(`   Average rating: ${totalRating}⭐`);
    console.log(`   Total reviews (GMB): ${totalCount}\n`);

    // Step 5: Build output structure
    const output = {
      availableTabs: tabNames,
      tabs: tabs,
      meta: {
        syncedAt: new Date().toISOString(),
        totalRating: totalRating,
        totalCount: totalCount,
      },
    };

    // Step 6: Write to file
    const outputPath = path.join(process.cwd(), 'public/data/google-reviews.json');
    const outputDir = path.dirname(outputPath);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

    console.log('✅ Successfully synced reviews!');
    console.log(`   Output: ${outputPath}`);
    console.log(`\n📋 Summary:`);
    tabNames.forEach(tabName => {
      console.log(`   • "${tabName}": ${tabs[tabName].length} reviews`);
    });
    console.log(`   • Average rating: ${totalRating}⭐`);
    console.log(`   • Synced at: ${output.meta.syncedAt}\n`);
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    console.error('\n⚠️  Fallback: Preserving old JSON file');
    if (error.response?.data) {
      console.error('   Response:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

// Run sync
syncReviews();
