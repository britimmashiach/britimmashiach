-- Comunidade viva: agenda da kehilah, pedidos de oração e testemunhos aprovados.

create table if not exists public.kehilah_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  event_type text not null default 'culto'
    check (event_type in ('culto', 'estudo', 'live', 'moed', 'outro')),
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text not null default 'Sinagoga Brit Im Mashiach — Franca, SP',
  live_url text,
  is_public boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_kehilah_events_starts_at
  on public.kehilah_events(starts_at asc)
  where is_public = true;

create table if not exists public.prayer_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  contact_name text,
  contact_email text,
  message text not null check (char_length(message) >= 10 and char_length(message) <= 2000),
  is_anonymous boolean not null default false,
  status text not null default 'novo' check (status in ('novo', 'em_oracao', 'arquivado')),
  created_at timestamptz not null default now()
);

create index if not exists idx_prayer_requests_created_at
  on public.prayer_requests(created_at desc);

create table if not exists public.kehilah_testimonials (
  id uuid primary key default gen_random_uuid(),
  author_display_name text not null,
  body text not null check (char_length(body) >= 20 and char_length(body) <= 1500),
  city text,
  is_approved boolean not null default false,
  is_featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_kehilah_testimonials_featured
  on public.kehilah_testimonials(sort_order asc, created_at desc)
  where is_approved = true;

alter table public.kehilah_events enable row level security;
alter table public.prayer_requests enable row level security;
alter table public.kehilah_testimonials enable row level security;

create policy kehilah_events_public_select
  on public.kehilah_events for select
  using (is_public = true);

create policy kehilah_testimonials_public_select
  on public.kehilah_testimonials for select
  using (is_approved = true);

create policy prayer_requests_admin_select
  on public.prayer_requests for select
  using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

comment on table public.kehilah_events is 'Agenda pública da kehilah (cultos, estudos, lives).';
comment on table public.prayer_requests is 'Pedidos de oração; insert via API (service role).';
comment on table public.kehilah_testimonials is 'Testemunhos aprovados exibidos na página Comunidade.';
