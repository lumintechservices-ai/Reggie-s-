import { createClient } from '@supabase/supabase-js';

// ---DEVELOPER NOTE---
// The values below have been set directly from the user's provided credentials.
// For a production environment, it is strongly recommended to use environment
// variables (e.g., process.env.SUPABASE_URL) to keep sensitive keys secure.
const supabaseUrl = 'https://aatnxskekayjugmvzcks.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhdG54c2tla2F5anVnbXZ6Y2tzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5NjkyMDgsImV4cCI6MjA3MzU0NTIwOH0.N2zVNZDVcjdNTiHx7YZtCMQGdHNW8pGIPqx99iTzXOQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);