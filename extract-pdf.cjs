const fs = require('fs');

async function extractPDF() {
    try {
        const pdfParse = (await import('pdf-parse')).default;
        const pdfPath = 'V2 Uncoached Website (1).pdf';
        const dataBuffer = fs.readFileSync(pdfPath);

        const data = await pdfParse(dataBuffer);
        console.log('=== PDF TEXT CONTENT ===');
        console.log('Number of pages:', data.numpages);
        console.log('');
        console.log(data.text);
    } catch (error) {
        console.error('Error parsing PDF:', error);
    }
}

extractPDF();
