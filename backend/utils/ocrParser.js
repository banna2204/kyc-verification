import Tesseract from 'tesseract.js';

// Resolve PDFParse class dynamically support modern 2.4.5
const getPDFParseClass = async () => {
  const mod = await import('pdf-parse');
  return mod.PDFParse || mod.default?.PDFParse;
};

/**
 * Extracts text from a file buffer using either PDF-Parse or Tesseract OCR.
 * @param {Buffer} buffer 
 * @param {String} mimetype 
 * @returns {Promise<String>}
 */
export const extractTextFromBuffer = async (buffer, mimetype) => {
  try {
    if (mimetype === 'application/pdf') {
      const PDFParseClass = await getPDFParseClass();
      if (!PDFParseClass) throw new Error('PDFParse class not found in module exports');
      const parser = new PDFParseClass({ data: buffer });
      const parsed = await parser.getText();
      return parsed.text || '';
    } else if (mimetype.startsWith('image/')) {
      // Tesseract can process image buffers directly
      const result = await Tesseract.recognize(buffer, 'eng');
      return result.data.text || '';
    }
    return '';
  } catch (error) {
    console.error('OCR/PDF Parse Error:', error);
    throw new Error('Failed to extract text from document');
  }
};
