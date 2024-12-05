-- Create image_likes table
create table if not exists public.image_likes (
  id uuid default uuid_generate_v4() primary key,
  image_id uuid not null references public.ai_gallery(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(image_id, user_id)
);

-- Enable RLS
alter table public.image_likes enable row level security;

-- Create policy to allow users to like/unlike
create policy "Users can like/unlike images"
  on public.image_likes for all
  using (auth.uid() = user_id);

-- Create function to increment likes
create or replace function public.increment_likes(image_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.ai_gallery
  set likes = likes + 1
  where id = image_id;
end;
$$;

-- Create function to decrement likes
create or replace function public.decrement_likes(image_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.ai_gallery
  set likes = greatest(0, likes - 1)
  where id = image_id;
end;
$$;

-- Grant permissions
grant usage on schema public to authenticated;
grant all on public.image_likes to authenticated;
grant execute on function public.increment_likes to authenticated;
grant execute on function public.decrement_likes to authenticated; 