import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

console.log('Type of pdf:', typeof pdf);
if (typeof pdf === 'object') {
  console.log('Keys:', Object.keys(pdf));
  console.log('default property type:', typeof pdf.default);
  console.log('pdfParse property type:', typeof pdf.pdfParse);
}
