import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://npfmrzlawzpfhgqgwjsj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZm1yemxhd3pwZmhncWd3anNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNzQ5ODgsImV4cCI6MjA4NTg1MDk4OH0.grEmZQYoceYldHOftojl5HEtJ71cERNPVqgruWtiX2c";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
