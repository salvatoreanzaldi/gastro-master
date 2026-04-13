import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const faqPath = path.join(__dirname, './public/locales/de/faq.json');
const data = JSON.parse(fs.readFileSync(faqPath, 'utf8'));

let total = 0;
data.categories.forEach(cat => {
  const count = cat.items.length;
  console.log(`${cat.label}: ${count} Fragen`);
  total += count;
});
console.log(`\nGesamt: ${total} Fragen`);
