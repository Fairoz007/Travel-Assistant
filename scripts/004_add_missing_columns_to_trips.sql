-- Add missing columns to trips table
ALTER TABLE public.trips
ADD COLUMN "style" TEXT,
ADD COLUMN "notes" TEXT;