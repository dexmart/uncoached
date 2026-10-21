import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const API = import.meta.env.VITE_API_URL;

// Download a full backup: every uploaded file plus a copy of all the data.
// Supabase already backs up the database every day; it does not back up
// uploaded files, so this is the way to keep a complete copy in Drive.
const AdminBackupPage = () => {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [started, setStarted] = useState(false);

    const download = async () => {
        setBusy(true);
        setError('');
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const res = await fetch(`${API}/admin/backup-link`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessToken: session?.access_token }),
            });
            const body = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(body.error || 'Could not start the backup.');
            window.location.assign(`${API}${body.path}`);
            setStarted(true);
        } catch (e) {
            setError(e.message || 'Could not start the backup.');
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="font-display text-4xl text-text-dark mb-2">Backup</h1>
            <p className="text-text-dark/70 mb-8">
                Download a full copy of Uncoached to keep in your Google Drive.
            </p>

            <div className="bg-white rounded-2xl border border-text-dark/10 shadow-sm p-6 space-y-4">
                <h2 className="font-display text-2xl text-text-dark">Full backup</h2>
                <p className="text-text-dark/80">
                    One ZIP file with every uploaded file (audio, PDFs, photos) and a copy of all the data:
                    members, memberships, agreement records, website text and every content item.
                </p>
                <ul className="text-sm text-text-dark/70 list-disc pl-5 space-y-1">
                    <li>Supabase already backs up the database every day. It does not back up uploaded files, so download one of these once a month.</li>
                    <li>The file can be large and take a few minutes. Keep this tab open until the download finishes.</li>
                    <li>It contains personal data. Keep it only in the Uncoached Drive.</li>
                </ul>
                <button
                    onClick={download}
                    disabled={busy}
                    className="px-5 py-2.5 bg-clay text-white font-medium rounded-xl hover:bg-clay/90 transition-colors shadow-sm disabled:opacity-50"
                >
                    {busy ? 'Starting…' : 'Download full backup'}
                </button>
                {started && !error && (
                    <p className="text-sm text-sage">Your download has started. Check your browser&apos;s downloads.</p>
                )}
                {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
        </div>
    );
};

export default AdminBackupPage;
