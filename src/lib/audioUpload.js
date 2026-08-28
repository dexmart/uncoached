// Supabase caps uploads project-wide, above whatever a bucket allows. That cap
// is what Johanna hit uploading "Settle Into Sleep": the storage API answers
// "The object exceeded the maximum allowed size", which tells her nothing about
// what to do next.
//
// Existing tracks confirm where the ceiling sits — 46.4MB uploaded fine, and
// the failure was a larger WAV of the same kind.
export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

export const formatSize = (bytes) => {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
    return `${Math.max(1, Math.round(bytes / 1024))}KB`;
};

/**
 * Check a chosen audio file before uploading. Returns a message to show, or
 * null if the file is fine. WAVs are perfectly legal but roughly ten times the
 * size of the same recording as an MP3, so they are worth flagging early.
 */
export const checkAudioFile = (file) => {
    if (!file) return null;
    const isWav = /\.wave?$/i.test(file.name) || file.type === 'audio/wav' || file.type === 'audio/x-wav';

    if (file.size > MAX_UPLOAD_BYTES) {
        return {
            level: 'error',
            text: isWav
                ? `This file is ${formatSize(file.size)}, and uploads have to stay under ${formatSize(MAX_UPLOAD_BYTES)}. It's a WAV — exporting the same recording as an MP3 will bring it down to around ${formatSize(file.size / 10)} with no audible difference, and it will load much faster for members too.`
                : `This file is ${formatSize(file.size)}, and uploads have to stay under ${formatSize(MAX_UPLOAD_BYTES)}. Try exporting it again as an MP3 at 128kbps.`,
        };
    }

    if (isWav && file.size > 15 * 1024 * 1024) {
        return {
            level: 'warning',
            text: `This will upload, but at ${formatSize(file.size)} it's a large WAV. As an MP3 it would be roughly ${formatSize(file.size / 10)} and would start playing much faster for members on their phones.`,
        };
    }

    return null;
};

/**
 * Turn a storage error into something worth reading. Anything we don't
 * recognise is passed through unchanged.
 */
export const explainUploadError = (error, file) => {
    const raw = error?.message || String(error || '');

    if (/maximum allowed size|exceeded/i.test(raw)) {
        const size = file ? ` Yours is ${formatSize(file.size)}.` : '';
        return `That audio file is too large to upload.${size} Uploads have to stay under ${formatSize(MAX_UPLOAD_BYTES)} — exporting it as an MP3 rather than a WAV will usually be about a tenth of the size.`;
    }
    if (/mime type|not supported/i.test(raw)) {
        return 'That file type isn\'t accepted. Please upload an MP3, WAV, M4A or OGG file.';
    }
    return raw;
};
