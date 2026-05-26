-- Ouvidoria: sugestoes, opinioes e reclamacoes dos visitantes.

create table if not exists public.site_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  category text not null check (category in ('sugestao', 'opiniao', 'reclamacao')),
  subject text not null default '',
  message text not null check (char_length(message) >= 10 and char_length(message) <= 3000),
  contact_name text,
  contact_email text,
  status text not null default 'novo' check (status in ('novo', 'lido', 'respondido', 'arquivado')),
  created_at timestamptz not null default now()
);

create index if not exists idx_site_feedback_created_at
  on public.site_feedback(created_at desc);

create index if not exists idx_site_feedback_status
  on public.site_feedback(status);

alter table public.site_feedback enable row level security;

create policy site_feedback_admin_select
  on public.site_feedback for select
  using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

comment on table public.site_feedback is
  'Mensagens da ouvidoria: sugestoes, opinioes e reclamacoes. Insert via API (service role).';
