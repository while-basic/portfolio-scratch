-- Add missing columns if they don't exist
do $$ 
begin
    if not exists (select 1 from information_schema.columns 
                  where table_name = 'conversations' and column_name = 'messages') then
        alter table conversations add column messages jsonb not null default '[]'::jsonb;
    end if;

    if not exists (select 1 from information_schema.columns 
                  where table_name = 'conversations' and column_name = 'updated_at') then
        alter table conversations add column updated_at timestamp with time zone default timezone('utc'::text, now()) not null;
    end if;
end $$;

-- Ensure RLS is enabled
alter table conversations enable row level security;

-- Drop existing policies if any
drop policy if exists "Users can create their own conversations" on conversations;
drop policy if exists "Users can view their own conversations" on conversations;
drop policy if exists "Users can update their own conversations" on conversations;
drop policy if exists "Users can delete their own conversations" on conversations;

-- Create or update policies
create policy "Users can create their own conversations"
  on conversations for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own conversations"
  on conversations for select
  using (auth.uid() = user_id);

create policy "Users can update their own conversations"
  on conversations for update
  using (auth.uid() = user_id);

create policy "Users can delete their own conversations"
  on conversations for delete
  using (auth.uid() = user_id);

-- Create indexes if they don't exist
create index if not exists conversations_user_id_idx on conversations(user_id);
create index if not exists conversations_updated_at_idx on conversations(updated_at desc);

-- Create or replace the updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Drop and recreate the trigger
drop trigger if exists update_conversations_updated_at on conversations;
create trigger update_conversations_updated_at
  before update on conversations
  for each row
  execute function update_updated_at_column();
