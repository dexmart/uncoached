-- This script grants Admin privileges to Johanna.
-- It searches for her email or name in the auth.users or public.profiles table.

-- Replace 'johanna%' with her exact email if the query below doesn't find her automatically.
-- Run this in the Supabase SQL Editor.

INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email ILIKE '%johanna%'
   OR id IN (SELECT id FROM profiles WHERE display_name ILIKE '%johanna%')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- Verify the update
SELECT u.email, p.display_name, r.role
FROM user_roles r
JOIN auth.users u ON r.user_id = u.id
JOIN profiles p ON r.user_id = p.id
WHERE r.role = 'admin';
