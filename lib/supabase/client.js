import { createBrowserClient } from '@supabase/ssr'

export function getSupabaseClient() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.warn('Supabase env vars missing in client. Build safe mode.');
        return {
            auth: {
                getUser: () => Promise.resolve({ data: { user: null }, error: null }),
                getSession: () => Promise.resolve({ data: { session: null }, error: null }),
                signInWithPassword: () => Promise.reject(new Error("Mock Client: Auth disabled (missing env vars)")),
                signUp: () => Promise.reject(new Error("Mock Client: Auth disabled (missing env vars)")),
                signOut: () => Promise.resolve({ error: null }),
                updateUser: () => Promise.reject(new Error("Mock Client: Auth disabled (missing env vars)")),
                resetPasswordForEmail: () => Promise.reject(new Error("Mock Client: Auth disabled (missing env vars)")),
                onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } })
            },
            from: () => ({
                select: () => ({
                    eq: () => ({
                        single: () => Promise.resolve({ data: null, error: null }),
                        maybeSingle: () => Promise.resolve({ data: null, error: null }),
                        order: () => Promise.resolve({ data: [], error: null })
                    }),
                    insert: () => Promise.resolve({ data: null, error: null }),
                    update: () => Promise.resolve({ data: null, error: null }),
                    delete: () => Promise.resolve({ data: null, error: null }),
                    upsert: () => Promise.resolve({ data: null, error: null })
                }),
                storage: {
                    from: () => ({
                        upload: () => Promise.resolve({ data: null, error: null }),
                        getPublicUrl: () => ({ data: { publicUrl: '' } })
                    })
                }
            })
        };
    }

    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
}
