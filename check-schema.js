import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    // Attempt to select from tables to see if is_active exists
    const queries = ['pocket_prompts', 'clarity_cards', 'affirmations', 'voice_notes'];

    for (const table of queries) {
        const { data, error } = await supabase.from(table).select('is_active').limit(1);
        if (error) {
            console.log(`Table ${table} error:`, error.message);
        } else {
            console.log(`Table ${table} has is_active column.`);
        }
    }
}
run();
