// Editable titles support *stars* for an emphasised run, which is how the "for"
// in Af*for*mations keeps its styling while Johanna can still reword the title.
//
//   emphasise('Af*for*mations', 'italic text-sage')
//     -> Af<span class="italic text-sage">for</span>mations
//
// Titles without stars come through untouched.

export const emphasise = (text, className = 'italic text-sage') =>
    (text || '').split(/\*(.+?)\*/g).map((part, i) =>
        (i % 2 ? <span key={i} className={className}>{part}</span> : part));

/** The same text with the markers stripped — for alt text and page titles. */
export const plain = (text) => (text || '').replace(/\*/g, '');
