import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = 'https://ascyzzrvruimfhxsdeau.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzY3l6enJ2cnVpbWZoeHNkZWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzMDUwNDEsImV4cCI6MjAzODg4MTA0MX0.cP4p5DndmIrm1oDdIO8NNZnDuIsmHCYJvVhljJqSnZ8'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default supabase