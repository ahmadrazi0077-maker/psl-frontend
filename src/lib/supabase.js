import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  supabaseUrl || 'https://dzpqytybfsikhikconbq.supabase.co',
  supabaseAnonKey || 'sb_publishable_U4W58eDaXBvjgaQWHK8oBA_QR14ZZGm'
);
