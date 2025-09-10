import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://phwzmhsotoajyoiqrwvn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBod3ptaHNvdG9hanlvaXFyd3ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNjg4MzAsImV4cCI6MjA3Mjc0NDgzMH0.prStGMzRhVQqA-P16Q9mtU4m0QY_Ll57N4fwxEeRq1E";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBod3ptaHNvdG9hanlvaXFyd3ZuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzE2ODgzMCwiZXhwIjoyMDcyNzQ0ODMwfQ.n3o4mfzK_8iqZkbVkpe0C41CBTnBMZB4cJCIDMLXn5k";
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey) ;

export { supabaseAdmin as a, supabase as s };
