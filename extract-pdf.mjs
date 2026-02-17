import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractPDF() {
    try {
        const pdfPath = path.join(__dirname, 'V2 Uncoached Website (1).pdf');
        const dataBuffer = new Uint8Array(fs.readFileSync(pdfPath));

        const loadingTask = getDocument({ data: dataBuffer });
        const pdf = await loadingTask.promise;

        console.log('=== PDF TEXT CONTENT ===');
        console.log('Number of pages:', pdf.numPages);
        console.log('');

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const text = textContent.items.map(item => item.str).join(' ');
            console.log(`--- Page ${i} ---`);
            console.log(text);
            console.log('');
        }
    } catch (error) {
        console.error('Error parsing PDF:', error);
    }
}

extractPDF();
