// Bakes Johanna's current wording into the bundle at build time.
//
// The site is a static build, so anything fetched from the database can only
// arrive after the page has already painted — which is what made the homepage
// headline show the original wording for a moment and then swap to hers.
//
// This runs before `vite build`, reads site_copy, and writes it to
// src/lib/siteCopySnapshot.json. The app imports that file, so the very first
// paint of a brand-new visit already has her words in it. The live fetch still
// runs and still wins, so anything she changes after a deploy is picked up.
//
// If there is no network or no keys, the previous snapshot is left alone and
// the build carries on — this must never be able to break a deploy.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, '../src/lib/siteCopySnapshot.json');

// Vercel provides these as build environment variables. Locally they come from
// .env.local / .env, which Vite loads for the app but not for this script.
const fromEnvFile = (key) => {
    for (const file of ['.env.local', '.env']) {
        const path = resolve(here, '..', file);
        if (!existsSync(path)) continue;
        const match = readFileSync(path, 'utf8').match(new RegExp(`^${key}=(.*)$`, 'm'));
        if (match) return match[1].trim();
    }
    return undefined;
};

const url = process.env.VITE_SUPABASE_URL || fromEnvFile('VITE_SUPABASE_URL');
const key = process.env.VITE_SUPABASE_ANON_KEY || fromEnvFile('VITE_SUPABASE_ANON_KEY');

const keep = (why) => {
    const existing = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
    if (!existsSync(OUT)) writeFileSync(OUT, '{}\n');
    console.log(`site copy snapshot: ${why} — keeping the ${Object.keys(existing).length} entries already committed`);
};

if (!url || !key) {
    keep('no Supabase keys in the build environment');
} else {
    try {
        const res = await fetch(`${url}/rest/v1/site_copy?select=key,value`, {
            headers: { apikey: key, Authorization: `Bearer ${key}` },
            signal: AbortSignal.timeout(15000),
        });
        if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);

        const rows = await res.json();
        if (!Array.isArray(rows)) throw new Error('unexpected response');

        const map = {};
        for (const row of rows) {
            if (row.value && row.value.trim()) map[row.key] = row.value;
        }

        // Sorted so the file only changes when the wording actually changes.
        const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
        writeFileSync(OUT, `${JSON.stringify(sorted, null, 2)}\n`);
        console.log(`site copy snapshot: baked ${Object.keys(sorted).length} edited fields into the build`);
    } catch (err) {
        keep(`couldn't reach Supabase (${err.message})`);
    }
}
