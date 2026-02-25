
-- Create a public storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload to resumes bucket (files validated server-side)
CREATE POLICY "Allow public uploads to resumes"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'resumes');

-- Allow public reads from resumes bucket
CREATE POLICY "Allow public reads from resumes"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'resumes');
