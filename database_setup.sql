-- Database Setup for Telefonic Version 4.0

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT CHECK (category IN ('phones', 'watches', 'bags', 'other')),
    mrp NUMERIC,
    price NUMERIC NOT NULL,
    image_url TEXT,
    offer_label TEXT,
    is_dark BOOLEAN DEFAULT false,
    is_accent BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies
-- Allow anyone to read active products
CREATE POLICY "Allow public read access for active products" ON public.products
    FOR SELECT USING (is_active = true);

-- Allow authenticated users (Admin) to manage products
CREATE POLICY "Allow admin to manage products" ON public.products
    FOR ALL USING (auth.role() = 'authenticated');

-- 4. Settings Table for Global Offers
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value JSONB
);

-- Seed initial settings
INSERT INTO public.settings (key, value) 
VALUES ('global_offer', '{"active": false, "label": "Valentine Offer"}') 
ON CONFLICT (key) DO NOTHING;

-- 5. Create Storage Bucket for Product Images
-- Note: This is usually done via the Supabase dashboard or API, 
-- but we mention it here for completeness.
-- Bucket name: 'product-images' (Public Read access)
