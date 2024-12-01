import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xbifyvmtlqeyvksqtoni.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiaWZ5dm10bHFleXZrc3F0b25pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5NjEyOTMsImV4cCI6MjA0ODUzNzI5M30.Zhbu-i9OQMf9brmguwN9l-yxLPQUnvVERVQq3108q8E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
