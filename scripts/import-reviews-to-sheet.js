#!/usr/bin/env node

/**
 * Import Reviews from JSON to Google Sheet
 *
 * Reads all reviews from public/data/google-reviews.json
 * and uploads them to Google Sheets, avoiding duplicates
 *
 * Usage: node scripts/import-reviews-to-sheet.js
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
  console.error('❌ Missing environment variables');
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = typeof SERVICE_ACCOUNT_JSON === 'string'
    ? JSON.parse(SERVICE_ACCOUNT_JSON)
    : SERVICE_ACCOUNT_JSON;
} catch (error) {
  console.error('❌ Failed to parse service account JSON:', error.message);
  process.exit(1);
}

const sheets = google.sheets({
  version: 'v4',
  auth: new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  }),
});

async function importReviews() {
  try {
    console.log('📥 Importing reviews to Google Sheet...');

    // Read reviews from JSON file
    const jsonPath = path.join(process.cwd(), 'public/data/google-reviews.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const reviews = JSON.parse(jsonData);

    if (!Array.isArray(reviews)) {
      console.error('❌ JSON is not an array of reviews');
      process.exit(1);
    }

    console.log(`   Found ${reviews.length} reviews in JSON`);

    // Get existing reviews from sheet to avoid duplicates
    const existingResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEETS_ID,
      range: 'A2:C',
    });

    const existingRows = existingResponse.data.values || [];
    const existingNames = new Set(existingRows.map(row => row[0]?.toLowerCase()));
    const existingTexts = new Set(existingRows.map(row => row[2]?.substring(0, 50).toLowerCase()));

    console.log(`   Found ${existingRows.length} existing reviews in sheet`);

    // Prepare rows to insert (avoid duplicates)
    const rowsToInsert = reviews
      .filter(review => {
        // Skip if author name already exists
        if (existingNames.has(review.author_name?.toLowerCase())) {
          return false;
        }
        // Skip if review text (first 50 chars) already exists
        if (existingTexts.has(review.text?.substring(0, 50).toLowerCase())) {
          return false;
        }
        return true;
      })
      .map(review => {
        // Format date
        const date = new Date(review.time * 1000);
        const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD

        return [
          review.author_name || 'Anonymous',
          Math.round(review.rating) || 5,
          review.text || '',
          formattedDate,
          review.profile_photo_url || '',
        ];
      });

    console.log(`   Will insert ${rowsToInsert.length} new reviews (duplicates skipped)`);

    if (rowsToInsert.length === 0) {
      console.log('   ✓ All reviews already in sheet!');
      return;
    }

    // Append to sheet
    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEETS_ID,
      range: 'A2:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: rowsToInsert,
      },
    });

    console.log(`✅ Successfully imported ${appendResponse.data.updates.updatedRows} reviews!`);
    console.log(`   Total rows in sheet: ${existingRows.length + rowsToInsert.length}`);
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    if (error.response?.data) {
      console.error('   Response:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

importReviews();
