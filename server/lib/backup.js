// A full backup as one ZIP: every uploaded file in Supabase Storage plus a
// JSON copy of every Uncoached table and the member list.
//
// Supabase Pro's daily backups cover the database only, not uploaded files, so
// this is the way to keep a complete copy (for example in the Uncoached Drive).
// Files are added one at a time, so memory stays small however big the backup.
import archiver from "archiver";

export const BACKUP_TABLES = [
    "subscriptions", "user_roles", "document_acceptances", "prompt_purchases",
    "site_copy", "practitioner_applications",
    "guided_shift_categories", "guided_shifts", "audio_families", "audio_breaths",
    "clarity_cards", "pocket_prompt_categories", "pocket_prompts",
    "afformation_cards", "afformation_questions", "voice_notes",
];

/** Every file path in a bucket, walking folders. */
export async function listAllFiles(storage, bucket, prefix = "") {
    const out = [];
    for (let offset = 0; ; offset += 1000) {
        const { data, error } = await storage.from(bucket).list(prefix, { limit: 1000, offset });
        if (error) throw new Error(`list ${bucket}/${prefix}: ${error.message}`);
        for (const item of data || []) {
            const path = prefix ? `${prefix}/${item.name}` : item.name;
            // Folders come back without an id.
            if (item.id === null || item.id === undefined) out.push(...await listAllFiles(storage, bucket, path));
            else out.push(path);
        }
        if (!data || data.length < 1000) break;
    }
    return out;
}

async function allRows(db, table) {
    const rows = [];
    for (let from = 0; ; from += 1000) {
        const { data, error } = await db.from(table).select("*").range(from, from + 999);
        if (error) return { error: error.message };
        rows.push(...(data || []));
        if (!data || data.length < 1000) break;
    }
    return rows;
}

async function allMembers(auth) {
    const members = [];
    for (let page = 1; page <= 50; page++) {
        const { data, error } = await auth.admin.listUsers({ page, perPage: 1000 });
        if (error) return { error: error.message };
        const users = data?.users || [];
        users.forEach((u) => members.push({
            id: u.id, email: u.email, created_at: u.created_at, last_sign_in_at: u.last_sign_in_at,
            providers: u.app_metadata?.providers || [], name: u.user_metadata?.full_name || u.user_metadata?.display_name || null,
        }));
        if (users.length < 1000) break;
    }
    return members;
}

/** Write the backup ZIP to `out` (an HTTP response or any writable stream). */
export async function writeBackup(db, out, now = new Date()) {
    const zip = archiver("zip", { zlib: { level: 6 } });
    zip.pipe(out);
    const added = () => new Promise((resolve) => zip.once("entry", resolve));
    const summary = { created_at: now.toISOString(), tables: {}, buckets: {}, problems: [] };

    for (const table of BACKUP_TABLES) {
        const rows = await allRows(db, table);
        if (rows.error) { summary.problems.push(`${table}: ${rows.error}`); continue; }
        summary.tables[table] = rows.length;
        const done = added();
        zip.append(JSON.stringify(rows, null, 2), { name: `data/${table}.json` });
        await done;
    }

    const members = await allMembers(db.auth);
    if (members.error) summary.problems.push(`members: ${members.error}`);
    else {
        summary.tables.members = members.length;
        const done = added();
        zip.append(JSON.stringify(members, null, 2), { name: "data/members.json" });
        await done;
    }

    const { data: buckets, error: bucketErr } = await db.storage.listBuckets();
    if (bucketErr) summary.problems.push(`buckets: ${bucketErr.message}`);
    for (const bucket of buckets || []) {
        let paths = [];
        try { paths = await listAllFiles(db.storage, bucket.id); } catch (e) { summary.problems.push(e.message); continue; }
        summary.buckets[bucket.id] = paths.length;
        for (const path of paths) {
            const { data: blob, error } = await db.storage.from(bucket.id).download(path);
            if (error || !blob) { summary.problems.push(`${bucket.id}/${path}: ${error?.message || "no data"}`); continue; }
            const done = added();
            zip.append(Buffer.from(await blob.arrayBuffer()), { name: `files/${bucket.id}/${path}` });
            await done;
        }
    }

    zip.append([
        "Uncoached full backup",
        `Made: ${summary.created_at}`,
        "",
        "data/    one JSON file per table, plus members.json (the member accounts)",
        "files/   every uploaded file, one folder per storage bucket",
        "",
        "Contains personal data. Keep it in the Uncoached Drive only.",
        "",
        "Counts:",
        JSON.stringify({ tables: summary.tables, files: summary.buckets }, null, 2),
        summary.problems.length ? `\nProblems:\n${summary.problems.join("\n")}` : "\nNo problems.",
    ].join("\n"), { name: "README.txt" });

    await zip.finalize();
    return summary;
}
