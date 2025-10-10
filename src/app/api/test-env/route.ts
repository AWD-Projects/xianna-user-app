import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        // Show first 20 chars of service role key to verify it's there (safe)
        serviceRoleKeyPreview: process.env.SUPABASE_SERVICE_ROLE_KEY
            ? `${process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 20)}...`
            : 'MISSING',
    });
}
