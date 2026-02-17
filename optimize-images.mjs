import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, 'public');

async function getFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

async function optimize() {
    console.log('Scanning images in:', publicDir);
    try {
        const files = await getFiles(publicDir);
        let totalSaved = 0;
        let count = 0;

        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

            try {
                const stats = await fs.stat(file);
                const originalSize = stats.size;

                const buffer = await fs.readFile(file);
                let sharpInstance = sharp(buffer);

                // Auto-rotate based on EXIF before stripping metadata
                sharpInstance = sharpInstance.rotate();

                if (ext === '.jpg' || ext === '.jpeg') {
                    sharpInstance = sharpInstance.jpeg({ quality: 80, mozjpeg: true });
                } else if (ext === '.png') {
                    // compressionLevel: 9 is max compression, force: false ensures format matches
                    sharpInstance = sharpInstance.png({ quality: 80, compressionLevel: 9, palette: true });
                } else if (ext === '.webp') {
                    sharpInstance = sharpInstance.webp({ quality: 80 });
                }

                const outputBuffer = await sharpInstance.toBuffer();
                const newSize = outputBuffer.length;

                if (newSize < originalSize) {
                    await fs.writeFile(file, outputBuffer);
                    const saved = originalSize - newSize;
                    totalSaved += saved;
                    count++;
                    console.log(`Optimized ${path.relative(publicDir, file)}: ${(originalSize / 1024).toFixed(1)}KB -> ${(newSize / 1024).toFixed(1)}KB (-${((saved / originalSize) * 100).toFixed(1)}%)`);
                } else {
                    console.log(`Skipped ${path.relative(publicDir, file)} (already optimized or larger)`);
                }
            } catch (error) {
                console.error(`Error processing ${file}:`, error);
            }
        }

        console.log(`\nDone! Optimized ${count} images.`);
        console.log(`Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
    } catch (err) {
        console.error("Error scanning directory:", err);
    }
}

optimize();
