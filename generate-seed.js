const fs = require('fs');

const rawData = fs.readFileSync('data_utf8.js', 'utf8');

// A quick and dirty regex to extract families:
// Look for { id: ..., title: "...", purpose: "...", icon: (...), shifts: [...] }
const families = [];
const familyRegex = /\{\s*id:\s*(\d+),\s*title:\s*"([^"]+)",\s*purpose:\s*"([^"]+)",\s*icon:\s*\([\s\S]*?<svg([\s\S]*?)<\/svg>\s*\),\s*shifts:\s*\[([\s\S]*?)\]\s*\}/g;

let match;
while ((match = familyRegex.exec(rawData)) !== null) {
    const id = match[1];
    const title = match[2];
    const purpose = match[3];
    const svgInner = match[4];
    const shiftsRaw = match[5];

    // reconstruct svg string and escape single quotes for SQL
    const icon = `<svg${svgInner}</svg>`.replace(/'/g, "''").replace(/\n/g, '').replace(/\s+/g, ' ');

    const shifts = [];
    const shiftRegex = /\{\s*name:\s*"([^"]+)",\s*status:\s*"([^"]+)"\s*\}/g;
    let shiftMatch;
    while ((shiftMatch = shiftRegex.exec(shiftsRaw)) !== null) {
        shifts.push({
            name: shiftMatch[1].replace(/'/g, "''"),
            status: shiftMatch[2]
        });
    }

    families.push({ id, title, purpose: purpose.replace(/'/g, "''"), icon, shifts });
}

let sql = `-- Seed file for Guided Shifts\n\n`;

families.forEach((f, index) => {
    // Generate an artificial UUID based on index just for tracking associations easily in this script
    const catId = `00000000-0000-0000-0000-${String(f.id).padStart(12, '0')}`;

    sql += `INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)\n`;
    sql += `VALUES ('${catId}', '${f.title}', '${f.purpose}', '${f.icon}', ${index});\n\n`;

    f.shifts.forEach((s, sIndex) => {
        // e.g., 'the-centering-drop'
        const shiftId = s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const isActive = s.status === 'active' ? 'true' : 'false';

        sql += `INSERT INTO public.guided_shifts (id, category_id, title, intro, description, approach, use_when, is_active, sort_order)\n`;
        // Provide empty/default values for the missing text fields so it's a good starting point
        sql += `VALUES ('${shiftId}', '${catId}', '${s.name}', '', '', '', '[]'::jsonb, ${isActive}, ${sIndex})\n`;
        sql += `ON CONFLICT (id) DO NOTHING;\n\n`;
    });
});

fs.writeFileSync('seed-guided-shifts.sql', sql, 'utf8');
console.log('SQL Seed generated successfully!');
