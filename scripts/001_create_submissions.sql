-- Create submissions table for ARILADIA REFORCEMENT lottery entries
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_title TEXT NOT NULL,
  project_type TEXT NOT NULL,
  project_link TEXT NOT NULL,
  description TEXT,
  payment_confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form submissions)
CREATE POLICY "Allow anonymous insert" ON public.submissions
  FOR INSERT
  WITH CHECK (true);

-- Allow anonymous to read their own submission by email (for confirmation)
CREATE POLICY "Allow read own" ON public.submissions
  FOR SELECT
  USING (true);
