import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const faqFiles = fs.readdirSync(path.join(__dirname, 'public/locales/de')).filter(f => f.endsWith('.json'));

console.log('Suche nach FAQ in allen deutschen JSON-Dateien...\n');

for (const file of faqFiles) {
  const filePath = path.join(__dirname, `public/locales/de/${file}`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Deep search for objects with 'q' and 'a' properties
  function countQandA(obj, depth = 0) {
    let count = 0;
    if (typeof obj !== 'object' || obj === null) return 0;
    
    if (obj.q && obj.a) {
      count = 1;
    }
    
    if (Array.isArray(obj)) {
      obj.forEach(item => count += countQandA(item, depth + 1));
    } else {
      Object.values(obj).forEach(val => count += countQandA(val, depth + 1));
    }
    
    return count;
  }
  
  const count = countQandA(data);
  if (count > 0) {
    console.log(`${file.padEnd(35)} → ${count} FAQ`);
  }
}
