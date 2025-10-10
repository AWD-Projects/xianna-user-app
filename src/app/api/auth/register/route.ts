import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
    try {
        console.log('[REGISTER] Starting registration process');
        const { email, password, name } = await request.json();
        console.log('[REGISTER] Request data:', { email, name, passwordLength: password?.length });

        // Validate input
        if (!email || !password || !name) {
            console.log('[REGISTER] Validation failed: missing fields');
            return NextResponse.json(
                { error: 'Email, password, and name are required' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            console.log('[REGISTER] Validation failed: password too short');
            return NextResponse.json(
                { error: 'Password must be at least 6 characters long' },
                { status: 400 }
            );
        }

        // Create the user using admin client (bypasses RLS and email confirmation)
        console.log('[REGISTER] Creating admin client');
        const adminSupabase = createAdminClient();

        // Create auth user
        console.log('[REGISTER] Creating auth user');
        const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto-confirm email
            user_metadata: {
                full_name: name,
            }
        });

        if (authError) {
            console.error('[REGISTER] Auth error:', authError);

            // Handle duplicate user error
            if (authError.message.includes('already registered') ||
                authError.message.includes('User already registered')) {
                return NextResponse.json(
                    { error: 'Este email ya está registrado. Intenta iniciar sesión.' },
                    { status: 400 }
                );
            }

            return NextResponse.json(
                { error: authError.message },
                { status: 400 }
            );
        }

        if (!authData.user) {
            console.error('[REGISTER] No user returned from auth');
            return NextResponse.json(
                { error: 'Failed to create user' },
                { status: 500 }
            );
        }

        console.log('[REGISTER] Auth user created:', authData.user.id);

        // Create user profile in user_details table
        console.log('[REGISTER] Creating user profile');
        const { error: profileError } = await adminSupabase
            .from('user_details')
            .insert({
                correo: email,
                nombre: name,
            });

        if (profileError) {
            console.error('[REGISTER] Profile creation error:', profileError);

            // If profile creation fails, clean up the auth user
            console.log('[REGISTER] Cleaning up auth user due to profile error');
            await adminSupabase.auth.admin.deleteUser(authData.user.id);

            // Handle duplicate email in user_details
            if (profileError.code === '23505') {
                console.log('[REGISTER] Duplicate email detected');
                return NextResponse.json(
                    { error: 'Este email ya está registrado. Intenta iniciar sesión.' },
                    { status: 400 }
                );
            }

            return NextResponse.json(
                { error: 'Failed to create user profile' },
                { status: 500 }
            );
        }

        console.log('[REGISTER] Registration successful');
        return NextResponse.json({
            message: 'User created successfully',
            user: {
                id: authData.user.id,
                email: authData.user.email,
            }
        });

    } catch (error) {
        console.error('[REGISTER] Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
