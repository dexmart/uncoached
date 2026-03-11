const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    const { data, error } = await supabase
        .from('guided_shifts')
        .select(`
            *,
            guided_shift_categories (
                title,
                icon
            )
        `)
        .eq('id', 'dialing-it-down')
        .single();

    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Data:", JSON.stringify(data, null, 2));
    }
}
run();
