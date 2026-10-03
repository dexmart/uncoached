import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const API = import.meta.env.VITE_API_URL;

const COLUMNS = [
    ['email', 'Member email'],
    ['accepted_at', 'Accepted at (UTC)'],
    ['user_agreement_version', 'User Agreement version'],
    ['terms_version', 'Terms version'],
    ['privacy_version', 'Privacy version'],
    ['billing_version', 'Billing version'],
    ['accepted', 'Accepted'],
    ['user_id', 'Member ID'],
    ['id', 'Record ID'],
];

const csvCell = (v) => {
    const s = String(v ?? '');
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

// Every User Agreement acceptance, read-only. The records themselves can't be
// edited or deleted by anyone; this page only shows them and downloads a copy
// (a spreadsheet file that opens in Google Sheets) for safekeeping in Drive.
const AdminAgreementRecordsPage = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                const res = await fetch(`${API}/admin/acceptances`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ accessToken: session?.access_token }),
                });
                const body = await res.json().catch(() => ({}));
                if (!active) return;
                if (!res.ok) setError(body.error || 'Could not load the records.');
                else setRecords(body.records || []);
            } catch {
                if (active) setError('Could not reach the server. Please try again.');
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => { active = false; };
    }, []);

    const shown = records.filter((r) => r.email.toLowerCase().includes(search.trim().toLowerCase()));

    const download = () => {
        const lines = [COLUMNS.map(([, h]) => h).join(',')]
            .concat(records.map((r) => COLUMNS.map(([k]) => csvCell(r[k])).join(',')));
        const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `uncoached-agreement-records-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const when = (iso) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                <div>
                    <h1 className="font-display text-4xl text-text-dark mb-2">Agreement Records</h1>
                    <p className="text-text-dark/70 max-w-2xl">
                        Every time a member accepts the User Agreement, with the version of each document they accepted.
                        These records can&apos;t be edited or deleted. Download a copy to keep in Google Drive. It opens in Google Sheets.
                    </p>
                </div>
                <button
                    onClick={download}
                    disabled={!records.length}
                    className="px-5 py-2.5 bg-clay text-white font-medium rounded-xl hover:bg-clay/90 transition-colors shadow-sm disabled:opacity-40"
                >
                    Download all ({records.length})
                </button>
            </div>

            {loading ? (
                <div className="w-8 h-8 border-4 border-clay border-t-transparent rounded-full animate-spin" />
            ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">{error}</div>
            ) : records.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-text-dark/10 text-text-dark/50">
                    No one has accepted the User Agreement yet.
                </div>
            ) : (
                <>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by email"
                        className="w-full md:w-80 mb-4 px-4 py-2 border border-text-dark/20 rounded-xl focus:outline-none focus:border-clay bg-white"
                    />
                    <div className="bg-white rounded-2xl border border-text-dark/10 shadow-sm overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-bone/60 text-left text-text-dark/70">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Member</th>
                                    <th className="px-4 py-3 font-medium">Accepted</th>
                                    <th className="px-4 py-3 font-medium">Agreement</th>
                                    <th className="px-4 py-3 font-medium">Terms</th>
                                    <th className="px-4 py-3 font-medium">Privacy</th>
                                    <th className="px-4 py-3 font-medium">Billing</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-text-dark/5">
                                {shown.map((r) => (
                                    <tr key={r.id}>
                                        <td className="px-4 py-3 text-text-dark">{r.email}</td>
                                        <td className="px-4 py-3 text-text-dark/80 whitespace-nowrap">{when(r.accepted_at)}</td>
                                        <td className="px-4 py-3 text-text-dark/80">{r.user_agreement_version}</td>
                                        <td className="px-4 py-3 text-text-dark/80">{r.terms_version || '–'}</td>
                                        <td className="px-4 py-3 text-text-dark/80">{r.privacy_version || '–'}</td>
                                        <td className="px-4 py-3 text-text-dark/80">{r.billing_version || '–'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminAgreementRecordsPage;
