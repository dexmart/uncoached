import { test } from "node:test";
import assert from "node:assert/strict";
import { PassThrough } from "node:stream";
import { writeBackup, listAllFiles } from "../lib/backup.js";

function fakeDb() {
    const tree = {
        "clarity-cards": { "": [{ name: "a.pdf", id: "1" }, { name: "old", id: null }], "old": [{ name: "b.pdf", id: "2" }] },
        "avatars": { "": [] },
    };
    return {
        from: () => ({ select: () => ({ range: async () => ({ data: [{ id: 1 }], error: null }) }) }),
        auth: { admin: { listUsers: async () => ({ data: { users: [{ id: "u1", email: "m@example.com", app_metadata: { providers: ["email"] }, user_metadata: {} }] }, error: null }) } },
        storage: {
            listBuckets: async () => ({ data: [{ id: "clarity-cards" }, { id: "avatars" }], error: null }),
            from: (bucket) => ({
                list: async (prefix) => ({ data: tree[bucket][prefix] || [], error: null }),
                download: async (path) => ({ data: new Blob([`file ${path}`]), error: null }),
            }),
        },
    };
}

test("lists files inside folders", async () => {
    const paths = await listAllFiles(fakeDb().storage, "clarity-cards");
    assert.deepEqual(paths.sort(), ["a.pdf", "old/b.pdf"]);
});

test("writes a zip with data, members, files and a readme", async () => {
    const out = new PassThrough();
    const chunks = [];
    out.on("data", (c) => chunks.push(c));
    const done = new Promise((r) => out.on("end", r));
    const summary = await writeBackup(fakeDb(), out, new Date("2026-10-21T00:00:00Z"));
    await done;
    const zip = Buffer.concat(chunks);
    assert.equal(zip.subarray(0, 2).toString(), "PK");
    const names = zip.toString("latin1");
    for (const n of ["data/subscriptions.json", "data/members.json", "files/clarity-cards/a.pdf", "files/clarity-cards/old/b.pdf", "README.txt"]) {
        assert.ok(names.includes(n), `missing ${n}`);
    }
    assert.equal(summary.buckets["clarity-cards"], 2);
    assert.equal(summary.tables.members, 1);
    assert.deepEqual(summary.problems, []);
});
