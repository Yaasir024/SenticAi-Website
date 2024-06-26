import { createClient } from '@supabase/supabase-js'

const projectUrl = import.meta.env.VITE_SB_PROJECT_URL;
const anonKey = import.meta.env.VITE_ANON_KEY;

export const supabase = createClient(projectUrl, anonKey)