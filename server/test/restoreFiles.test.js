import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { restoreFiles, backupFiles, contentTypeOf } from "../lib/restoreFiles.js";

async function makeBackup() {
    const dir = await mkdtemp(join(tmpdir(), "uc-restore-"));
    await mkdir(join(dir, "files", "audio-breaths", "calm"), { recursive: true });
    await mkdir(join(dir, "files", "clarity-cards"), { recursive: true });
    await writeFile(join(dir, "files", "audio-breaths", "calm", "one.mp3"), "AAA");
    await writeFile(join(dir, "files", "clarity-cards", "card.pdf"), "%PDF");
    await writeFile(join(dir, "README.txt"), "not a file to restore");
    return dir;
}

function fakeStorage(existingBuckets) {
    const uploads = [];
    const created = [];
    return {
        uploads, created,
        listBuckets: async () => ({ data: existingBuckets.map((id) => ({ id })) }),
        createBucket: async (id) => { created.push(id); return { error: null }; },
        from: (bucket) => ({
            upload: async (path, body, opts) => { uploads.push({ bucket, path, body: body.toString(), opts }); return { error: null }; },
        }),
    };
}

test("backupFiles finds every file under files/<bucket>/ with its nested path", async () => {
    const dir = await makeBackup();
    try {
        const files = (await backupFiles(dir)).map((f) => `${f.bucket}|${f.path}|${f.size}`).sort();
        assert.deepEqual(files, ["audio-breaths|calm/one.mp3|3", "clarity-cards|card.pdf|4"]);
    } finally { await rm(dir, { recursive: true, force: true }); }
});

test("restoreFiles puts each file back at the same bucket and path, with its type", async () => {
    const dir = await makeBackup();
    try {
        const storage = fakeStorage(["audio-breaths"]);
        const summary = await restoreFiles(storage, dir);
        assert.deepEqual(storage.created, ["clarity-cards"]);
        assert.deepEqual(summary.buckets, { "audio-breaths": 1, "clarity-cards": 1 });
        assert.deepEqual(summary.failed, []);
        const mp3 = storage.uploads.find((u) => u.path === "calm/one.mp3");
        assert.equal(mp3.bucket, "audio-breaths");
        assert.equal(mp3.body, "AAA");
        assert.deepEqual(mp3.opts, { contentType: "audio/mpeg", upsert: true });
    } finally { await rm(dir, { recursive: true, force: true }); }
});

test("contentTypeOf knows the Uncoached file types", () => {
    assert.equal(contentTypeOf("a/B.PDF"), "application/pdf");
    assert.equal(contentTypeOf("x.jpeg"), "image/jpeg");
    assert.equal(contentTypeOf("x.unknown"), "application/octet-stream");
});
