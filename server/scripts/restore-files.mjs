// Restore uploaded files from a full backup into a Supabase project.
//
//   1. Unzip the backup from Admin > Backup into a folder.
//   2. cd server
//   3. node scripts/restore-files.mjs <unzipped-backup-folder> <https://PROJECT.supabase.co>
//   4. Paste that project's service_role key when asked (it is never saved).
//
// Each file goes back to the same bucket and path. Afterwards it checks that
// every bucket has the right number of files and that sample files come back
// byte for byte.
import { createInterface } from "node:readline/promises";
import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";
import { restoreFiles, backupFiles } from "../lib/restoreFiles.js";
import { listAllFiles } from "../lib/backup.js";

const [backupDir, projectUrl] = process.argv.slice(2);
if (!backupDir || !projectUrl) {
    console.error("Usage: node scripts/restore-files.mjs <unzipped-backup-folder> <https://PROJECT.supabase.co>");
    process.exit(1);
}

let key = (process.env.TARGET_SERVICE_ROLE_KEY || "").trim();
if (!key) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    key = (await rl.question(`Paste the service_role key for ${projectUrl}: `)).trim();
    rl.close();
}

const db = createClient(projectUrl, key, { auth: { persistSession: false } });
const expected = await backupFiles(backupDir);
console.log(`Restoring ${expected.length} files to ${projectUrl} ...`);

let done = 0;
const summary = await restoreFiles(db.storage, backupDir, () => {
    if (++done % 10 === 0) console.log(`  ${done}/${expected.length}`);
});

console.log("\nCheck:");
let ok = summary.failed.length === 0;
for (const bucket of [...new Set(expected.map((f) => f.bucket))].sort()) {
    const want = expected.filter((f) => f.bucket === bucket);
    const have = await listAllFiles(db.storage, bucket);
    const sameCount = have.length >= want.length;
    // Download up to 3 files per bucket and compare them with the backup copy.
    let samples = 0, matched = 0;
    for (const f of want.slice(0, 3)) {
        samples++;
        const { data } = await db.storage.from(bucket).download(f.path);
        if (data && Buffer.from(await data.arrayBuffer()).equals(await readFile(f.full))) matched++;
    }
    ok = ok && sameCount && matched === samples;
    console.log(`  ${bucket}: backup ${want.length}, in Storage ${have.length}, samples identical ${matched}/${samples}`);
}
if (summary.createdBuckets.length) console.log(`Created buckets (private): ${summary.createdBuckets.join(", ")}`);
if (summary.failed.length) console.log(`\nFailed:\n  ${summary.failed.join("\n  ")}`);
console.log(ok ? "\nRESTORE OK: every file is back." : "\nRESTORE INCOMPLETE: see above.");
process.exit(ok ? 0 : 1);
