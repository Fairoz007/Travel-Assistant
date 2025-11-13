-- Drop old auth-dependent tables
DROP TABLE IF EXISTS public.activities CASCADE;
DROP TABLE IF EXISTS public.itineraries CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create new simplified trips table for public travel plans
CREATE TABLE public.trips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget TEXT NOT NULL,
  interests TEXT[] DEFAULT '{}',
  itinerary JSONB DEFAULT '[]',
  packing_list JSONB DEFAULT '[]',
  budget_plan JSONB DEFAULT '{}',
  deals JSONB DEFAULT '{}',
  location_info JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for slug lookup
CREATE INDEX idx_trips_slug ON public.trips(slug);
CREATE INDEX idx_trips_destination ON public.trips(destination);
CREATE INDEX idx_trips_created_at ON public.trips(created_at DESC);

-- Enable RLS but allow public read access
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read all trips
CREATE POLICY "Allow public read access" ON public.trips
  FOR SELECT USING (true);

-- Allow anyone to insert new trips
CREATE POLICY "Allow public insert" ON public.trips
  FOR INSERT WITH CHECK (true);

-- Allow anyone to update any trip
CREATE POLICY "Allow public update" ON public.trips
  FOR UPDATE USING (true);
