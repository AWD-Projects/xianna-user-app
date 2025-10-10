// src/lib/supabase/admin.ts
import { createClient } from '@supabase/supabase-js'

// Service role client for server-side operations that bypass RLS
export function createAdminClient() {
  console.log('[ADMIN CLIENT] Creating admin client');
  console.log('[ADMIN CLIENT] SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('[ADMIN CLIENT] SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[ADMIN CLIENT] ERROR: Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable. Please add it to .env.local');
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('[ADMIN CLIENT] ERROR: Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
  }

  console.log('[ADMIN CLIENT] Admin client created successfully');
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
