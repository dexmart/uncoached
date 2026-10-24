// Put uploaded files back into Supabase Storage from an unzipped full backup
// (see lib/backup.js). The backup keeps every file at files/<bucket>/<path>,
// so each one goes back to the same bucket and path, which is what the
// database rows point at.
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, sep, extname } from "node:path";

const TYPES = {
    ".mp3": "audio/mpeg", ".m4a": "audio/mp4", ".wav": "audio/wav", ".ogg": "audio/ogg",
    ".pdf": "application/pdf",
    ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
    ".gif": "image/gif", ".svg": "image/svg+xml",
    ".mp4": "video/mp4", ".json": "application/json", ".txt": "text/plain",
};

export const contentTypeOf = (path) => TYPES[extname(path).toLowerCase()] || "application/octet-stream";

async function walk(dir) {
    const out = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) out.push(...await walk(full));
        else out.push(full);
    }
    return out;
}

/** Every file in <backupDir>/files as { bucket, path, full, size }. */
export async function backupFiles(backupDir) {
    const root = join(backupDir, "files");
    const files = [];
    for (const full of await walk(root)) {
        const [bucket, ...rest] = relative(root, full).split(sep);
        if (!rest.length) continue;
        files.push({ bucket, path: rest.join("/"), full, size: (await stat(full)).size });
    }
    return files;
}

/** Upload every backed-up file to `storage`. Missing buckets are created private. */
export async function restoreFiles(storage, backupDir, log = () => {}) {
    const files = await backupFiles(backupDir);
    const summary = { buckets: {}, failed: [], createdBuckets: [] };

    const { data: existing } = await storage.listBuckets();
    const have = new Set((existing || []).map((b) => b.id));
    for (const bucket of new Set(files.map((f) => f.bucket))) {
        if (have.has(bucket)) continue;
        const { error } = await storage.createBucket(bucket, { public: false });
        if (error) summary.failed.push(`${bucket}: could not create bucket: ${error.message}`);
        else summary.createdBuckets.push(bucket);
    }

    for (const f of files) {
        const { error } = await storage.from(f.bucket).upload(f.path, await readFile(f.full), {
            contentType: contentTypeOf(f.path),
            upsert: true,
        });
        if (error) { summary.failed.push(`${f.bucket}/${f.path}: ${error.message}`); continue; }
        summary.buckets[f.bucket] = (summary.buckets[f.bucket] || 0) + 1;
        log(`${f.bucket}/${f.path}`);
    }
    return summary;
}
