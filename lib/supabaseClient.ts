import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://aatnxskekayjugmvzcks.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhdG54c2tla2F5anVnbXZ6Y2tzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5NjkyMDgsImV4cCI6MjA3MzU0NTIwOH0.N2zVNZDVcjdNTiHx7YZtCMQGdHNW8pGIPqx99iTzXOQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);