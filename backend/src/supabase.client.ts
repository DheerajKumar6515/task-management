import 'dotenv/config';
import { createClient } from "@supabase/supabase-js";
import WebSocket from 'ws';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables in .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey,{
    auth: {
    persistSession: false,
  },
  realtime: {
    transport: WebSocket as any,
  },
})