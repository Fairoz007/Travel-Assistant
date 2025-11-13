-- Create profiles table for user management
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  avatar_url text,
  created_at timestamp with time zone default now()
);

-- Create itineraries table
create table if not exists public.itineraries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  destination text not null,
  description text,
  start_date date,
  end_date date,
  budget numeric,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create activities table
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  itinerary_id uuid not null references public.itineraries(id) on delete cascade,
  title text not null,
  description text,
  activity_date date,
  location text,
  category text,
  duration_hours numeric,
  estimated_cost numeric,
  created_at timestamp with time zone default now()
);

-- Enable row level security
alter table public.profiles enable row level security;
alter table public.itineraries enable row level security;
alter table public.activities enable row level security;

-- Profiles policies
create policy "Profiles are viewable by their user" on public.profiles
  for select using (auth.uid() = id);

create policy "Profiles can be updated by their user" on public.profiles
  for update using (auth.uid() = id);

create policy "Profiles can be created by their user" on public.profiles
  for insert with check (auth.uid() = id);

-- Itineraries policies
create policy "Itineraries are viewable by their user" on public.itineraries
  for select using (auth.uid() = user_id);

create policy "Itineraries can be created by authenticated users" on public.itineraries
  for insert with check (auth.uid() = user_id);

create policy "Itineraries can be updated by their user" on public.itineraries
  for update using (auth.uid() = user_id);

create policy "Itineraries can be deleted by their user" on public.itineraries
  for delete using (auth.uid() = user_id);

-- Activities policies
create policy "Activities are viewable by itinerary user" on public.activities
  for select using (
    itinerary_id in (
      select id from public.itineraries where user_id = auth.uid()
    )
  );

create policy "Activities can be created by itinerary user" on public.activities
  for insert with check (
    itinerary_id in (
      select id from public.itineraries where user_id = auth.uid()
    )
  );

create policy "Activities can be updated by itinerary user" on public.activities
  for update using (
    itinerary_id in (
      select id from public.itineraries where user_id = auth.uid()
    )
  );

create policy "Activities can be deleted by itinerary user" on public.activities
  for delete using (
    itinerary_id in (
      select id from public.itineraries where user_id = auth.uid()
    )
  );

-- Create trigger for auto profile creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
