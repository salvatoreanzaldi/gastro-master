const fs = require('fs');
const path = require('path');

// Read the FAQ JSON
const faqPath = './public/locales/de/faq.json';
const faqData = JSON.parse(fs.readFileSync(faqPath, 'utf8'));

// Try to use xlsx, if not available, use json2csv
let ExcelJS;
try {
  ExcelJS = require('exceljs');
} catch (e) {
  console.log('ExcelJS nicht installiert, installiere es...');
  require('child_process').execSync('npm install exceljs --save-dev', { stdio: 'inherit' });
  ExcelJS = require('exceljs');
}

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('FAQ', { properties: { tabColor: 'FF0000' } });

// Set up columns
worksheet.columns = [
  { header: 'Kategorie', key: 'category', width: 25 },
  { header: 'Frage', key: 'question', width: 50 },
  { header: 'Antwort', key: 'answer', width: 80 },
  { header: 'Quelle', key: 'source', width: 40 }
];

// Style header row
const headerRow = worksheet.getRow(1);
headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
headerRow.fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FF0A264A' }
};
headerRow.alignment = { vertical: 'center', horizontal: 'center', wrapText: true };

// Add data rows
let rowNumber = 2;
const categories = faqData.categories || [];

categories.forEach(category => {
  const items = category.items || [];
  
  items.forEach((item, index) => {
    const row = worksheet.getRow(rowNumber);
    
    // Only show category name on first item
    const categoryName = index === 0 ? category.label : '';
    
    // Clean up markdown links from answer
    let cleanAnswer = item.a || '';
    cleanAnswer = cleanAnswer.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    
    row.values = {
      category: categoryName,
      question: item.q || '',
      answer: cleanAnswer,
      source: item.source || ''
    };
    
    // Style cells
    row.font = { size: 11 };
    row.alignment = { vertical: 'top', wrapText: true };
    
    // Alternate row colors for better readability
    if (rowNumber % 2 === 0) {
      row.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF8FAFC' }
      };
    }
    
    // Set row height
    row.height = 'auto';
    
    rowNumber++;
  });
});

// Auto-fit columns
worksheet.columns.forEach(column => {
  column.width = Math.min(column.width, 60);
});

// Freeze header row
worksheet.views = [{ state: 'frozen', ySplit: 1 }];

// Save the file
const outputPath = './FAQ_Deutsche_Version.xlsx';
workbook.xlsx.writeFile(outputPath).then(() => {
  console.log(`✅ Excel-Datei erstellt: ${outputPath}`);
  console.log(`📊 Kategorien: ${categories.length}`);
  console.log(`❓ Fragen gesamt: ${categories.reduce((sum, cat) => sum + cat.items.length, 0)}`);
});
