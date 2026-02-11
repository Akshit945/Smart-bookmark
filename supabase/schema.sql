-- Create a table for bookmarks
create table bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  title text not null,
  url text not null,
  is_liked boolean default false,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table bookmarks enable row level security;

-- Create policies
create policy "Users can view their own bookmarks" on bookmarks
  for select using (auth.uid() = user_id);

create policy "Users can insert their own bookmarks" on bookmarks
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own bookmarks" on bookmarks
  for update using (auth.uid() = user_id);

create policy "Users can delete their own bookmarks" on bookmarks
  for delete using (auth.uid() = user_id);

-- Enable Realtime
alter publication supabase_realtime add table bookmarks;
