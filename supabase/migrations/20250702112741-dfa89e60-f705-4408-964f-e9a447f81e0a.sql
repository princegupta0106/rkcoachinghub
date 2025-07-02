-- Create updates table for news and announcements
CREATE TABLE public.updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery table for photos
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admissions table for enquiries
CREATE TABLE public.admissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (but make tables publicly accessible since no auth needed)
ALTER TABLE public.updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for public access
CREATE POLICY "Allow public read access to updates" 
ON public.updates 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert/update/delete for updates" 
ON public.updates 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow public read access to gallery" 
ON public.gallery 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert/update/delete for gallery" 
ON public.gallery 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow public read access to admissions" 
ON public.admissions 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert for admissions" 
ON public.admissions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public delete for admissions" 
ON public.admissions 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates on updates table
CREATE TRIGGER update_updates_updated_at
  BEFORE UPDATE ON public.updates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();