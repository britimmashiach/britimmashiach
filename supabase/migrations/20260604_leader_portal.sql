-- Portal de líderes: avisos do Rav e biblioteca de recursos/PDFs exclusivos.

-- Avisos do Rav (comunicados internos para líderes aprovados)
create table if not exists public.leader_announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  pinned boolean not null default false,
  is_published boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_leader_announcements_feed
  on public.leader_announcements(is_published, pinned desc, created_at desc);

alter table public.leader_announcements enable row level security;

create policy leader_announcements_select_published
  on public.leader_announcements for select
  using (
    is_published = true
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and (p.is_leader = true or p.role = 'admin')
    )
  );

create policy leader_announcements_admin_all
  on public.leader_announcements for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

comment on table public.leader_announcements is
  'Avisos do Rav EBBY para líderes aprovados (is_leader). Leitura restrita ao portal de líderes.';

-- Biblioteca de recursos/PDFs exclusivos para líderes
create table if not exists public.leader_resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  category text not null default 'geral',
  file_url text not null,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_leader_resources_feed
  on public.leader_resources(is_published, sort_order, created_at desc);

alter table public.leader_resources enable row level security;

create policy leader_resources_select_published
  on public.leader_resources for select
  using (
    is_published = true
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and (p.is_leader = true or p.role = 'admin')
    )
  );

create policy leader_resources_admin_all
  on public.leader_resources for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

comment on table public.leader_resources is
  'PDFs e materiais exclusivos para líderes aprovados (is_leader).';
