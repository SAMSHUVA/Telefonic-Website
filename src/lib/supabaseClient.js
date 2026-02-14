import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project URL and Anon Key in .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Safety check to prevent app crash if keys are missing
const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL';

export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        // Mock client to prevent crashes before keys are provided
        from: () => ({
            select: () => ({
                eq: () => ({
                    single: () => Promise.resolve({ data: null, error: null }),
                    order: () => Promise.resolve({ data: [], error: null })
                }),
                order: () => Promise.resolve({ data: [], error: null })
            }),
            insert: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
            update: () => ({ eq: () => Promise.resolve({ error: { message: 'Supabase not configured' } }) }),
            delete: () => ({ eq: () => Promise.resolve({ error: { message: 'Supabase not configured' } }) })
        }),
        storage: {
            from: () => ({
                upload: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
                getPublicUrl: () => ({ data: { publicUrl: '' } })
            })
        }
    };
