import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function getSupabaseServer() {
    const cookieStore = cookies()

    // Safety check for build time or missing env vars
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.warn('Supabase env vars missing. Returning MOCK client to prevent build crash.');
        // Return a mock that satisfies basic chaining: .from().select().single() etc.
        const mockClient = {
            from: () => ({
                select: () => ({
                    eq: () => ({
                        single: () => Promise.resolve({ data: null, error: null }),
                        maybeSingle: () => Promise.resolve({ data: null, error: null }),
                        order: () => ({ data: [], error: null })
                    }),
                    insert: () => Promise.resolve({ data: null, error: null }),
                    update: () => Promise.resolve({ data: null, error: null }),
                    delete: () => Promise.resolve({ data: null, error: null }),
                })
            }),
            auth: {
                getUser: () => Promise.resolve({ data: { user: null }, error: null }),
                getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            },
            storage: {
                from: () => ({
                    upload: () => Promise.resolve({ data: null, error: null }),
                    getPublicUrl: () => ({ data: { publicUrl: '' } })
                })
            }
        };
        return mockClient;
    }

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value
                },
                set(name, value, options) {
                    try {
                        cookieStore.set({ name, value, ...options })
                    } catch (error) {
                        // The `set` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
                remove(name, options) {
                    try {
                        cookieStore.set({ name, value: '', ...options })
                    } catch (error) {
                        // The `delete` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}
