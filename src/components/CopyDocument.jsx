// Renders an editable long-form document (Terms, Privacy) from plain text.
//
// Deliberately simple so Johanna can edit it in a normal textarea:
//   "## Heading"  -> a section heading (also gets an id, so pages can link to it)
//   "• item"      -> a bullet
//   blank line    -> new paragraph
// "Practitioner Disclaimer:" -> "practitioner-disclaimer", so a link elsewhere
// keeps working as long as the heading keeps its name.
const slug = (heading) =>
    heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const CopyDocument = ({ text }) => {
    const blocks = (text || '').split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

    return (
        <>
            {blocks.map((block, i) => {
                const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);

                // A heading, optionally followed by lines belonging to it
                if (lines[0].startsWith('##')) {
                    const heading = lines[0].replace(/^##\s*/, '');
                    const rest = lines.slice(1);
                    return (
                        <div key={i} className="space-y-3">
                            <h2 id={slug(heading)} className="font-display text-xl text-text-dark scroll-mt-28">
                                {heading}
                            </h2>
                            {rest.length > 0 && <Lines lines={rest} />}
                        </div>
                    );
                }

                return <Lines key={i} lines={lines} />;
            })}
        </>
    );
};

const Lines = ({ lines }) => {
    const out = [];
    let bullets = [];

    const flush = (key) => {
        if (!bullets.length) return;
        out.push(
            <ul key={`u${key}`} className="space-y-2 pl-1">
                {bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0" />
                        <span>{b}</span>
                    </li>
                ))}
            </ul>
        );
        bullets = [];
    };

    lines.forEach((line, i) => {
        if (/^[•*-]\s+/.test(line)) {
            bullets.push(line.replace(/^[•*-]\s+/, ''));
        } else {
            flush(i);
            out.push(<p key={`p${i}`}>{line}</p>);
        }
    });
    flush('end');

    return <div className="space-y-3">{out}</div>;
};

export default CopyDocument;
