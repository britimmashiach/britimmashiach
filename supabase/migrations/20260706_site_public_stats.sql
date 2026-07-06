-- Contadores públicos da página inicial (valores exibidos, editáveis pelo admin).

create table if not exists public.site_public_stats (
  id int primary key default 1 check (id = 1),
  members_count int not null default 0 check (members_count >= 0),
  visitors_count int not null default 0 check (visitors_count >= 0),
  leaders_count int not null default 0 check (leaders_count >= 0),
  mestres_count int not null default 0 check (mestres_count >= 0),
  updated_at timestamptz not null default now()
);

insert into public.site_public_stats (id)
values (1)
on conflict (id) do nothing;

alter table public.site_public_stats enable row level security;

drop policy if exists site_public_stats_select on public.site_public_stats;
drop policy if exists site_public_stats_admin_all on public.site_public_stats;

create policy site_public_stats_select
  on public.site_public_stats for select
  using (true);

create policy site_public_stats_admin_all
  on public.site_public_stats for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

comment on table public.site_public_stats is
  'Contadores exibidos na página inicial. Valores editáveis em /admin; visitantes é manual.';
