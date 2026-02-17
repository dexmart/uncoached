const fs = require('fs');

async function extractPDF() {
    try {
        const pdfParse = (await import('pdf-parse')).default;
        const pdfPath = 'public/images/Clarity_Cards_Developer_Spec.docx.pdf';
        const dataBuffer = fs.readFileSync(pdfPath);

        const data = await pdfParse(dataBuffer);
        fs.writeFileSync('clarity_cards_spec.txt', data.text);
        console.log('Done! Pages:', data.numpages);
    } catch (error) {
        console.error('Error parsing PDF:', error);
    }
}

extractPDF();
