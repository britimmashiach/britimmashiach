-- Beit Midrash do Manhig: modulos exclusivos do portal de lideres.

create table if not exists public.leader_modules (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  month_num int not null check (month_num between 1 and 24),
  stage int not null check (stage between 1 and 4),
  stage_label text not null,
  title text not null,
  subtitle text,
  excerpt text not null default '',
  content text not null default '',
  is_published boolean not null default false,
  reading_time_minutes int not null default 20,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_leader_modules_published
  on public.leader_modules(is_published, sort_order);

create index if not exists idx_leader_modules_month
  on public.leader_modules(month_num);

alter table public.leader_modules enable row level security;

-- Lideres aprovados e admins leem modulos publicados.
create policy leader_modules_select_published
  on public.leader_modules for select
  using (
    is_published = true
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and (p.is_leader = true or p.role = 'admin')
    )
  );

create policy leader_modules_admin_all
  on public.leader_modules for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

comment on table public.leader_modules is
  'Programa Manhigut (Beit Midrash do Manhig). Conteudo exclusivo para is_leader.';
