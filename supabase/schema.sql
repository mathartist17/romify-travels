create table if not exists public.feedback_entries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  destination text not null,
  rating integer not null check (rating between 1 and 5),
  review text not null,
  images text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.feedback_entries enable row level security;

insert into storage.buckets (id, name, public)
values ('feedback-images', 'feedback-images', true)
on conflict (id) do update
set public = excluded.public;

drop policy if exists "public read feedback images" on storage.objects;
create policy "public read feedback images"
on storage.objects
for select
using (bucket_id = 'feedback-images');

drop policy if exists "public upload feedback images" on storage.objects;
create policy "public upload feedback images"
on storage.objects
for insert
with check (bucket_id = 'feedback-images');

drop policy if exists "public read feedback" on public.feedback_entries;
create policy "public read feedback"
on public.feedback_entries
for select
using (true);

drop policy if exists "public insert feedback" on public.feedback_entries;
create policy "public insert feedback"
on public.feedback_entries
for insert
with check (true);