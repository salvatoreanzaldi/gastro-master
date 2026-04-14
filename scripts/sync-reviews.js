#!/usr/bin/env node

/**
 * Google Sheets → JSON Review Sync
 *
 * Reads reviews from Google Sheet and converts to JSON format
 * Columns: A=Name, B=Sterne, C=Text, D=Datum, E=Foto-URL, F=Bewertung-URL
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

async function syncReviews() {
  try {
    console.log('🔄 Syncing reviews from Google Sheets...');
    console.log(`   Sheet ID: ${SHEETS_ID}`);
    console.log(`   Service Account: ${serviceAccount.client_email}`);

    // Read data from Google Sheet (including header for verification)
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEETS_ID,
      range: 'A1:F1',
    });

    const headers = headerResponse.data.values?.[0] || [];
    console.log(`   Headers: ${headers.join(' | ')}`);

    // Read review data (starting from row 2)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEETS_ID,
      range: 'A2:F',
    });

    const rows = response.data.values || [];

    if (rows.length === 0) {
      console.warn('⚠️  No reviews found in Google Sheet');
      process.exit(0);
    }

    console.log(`   Found ${rows.length} reviews in sheet`);

    // Convert sheet rows to GoogleReview objects
    const reviews = rows
      .filter(row => row && row[0]) // Skip empty rows
      .map((row, index) => {
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

        return {
          id: `${timestamp}-${name || `review-${index}`}`,
          rating,
          text: text || '',
          author_name: name || 'Anonymous',
          relative_time_description: dateStr || 'Recently',
          profile_photo_url: photoUrl || null,
          author_url: reviewUrl || null,
          time: timestamp,
        };
      });

    // Calculate statistics
    const totalCount = reviews.length;
    const totalRating = reviews.length > 0
      ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
      : 0;

    // Write to JSON file as direct array (frontend expects array format)
    const outputPath = path.join(process.cwd(), 'public/data/google-reviews.json');
    const outputDir = path.dirname(outputPath);

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(reviews, null, 2));

    console.log('✅ Successfully synced reviews!');
    console.log(`   Total reviews: ${totalCount}`);
    console.log(`   Average rating: ${totalRating}⭐`);
    console.log(`   Output: ${outputPath}`);
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    if (error.response?.data) {
      console.error('   Response:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

// Run sync
syncReviews();
