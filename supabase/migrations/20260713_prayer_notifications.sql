-- Resposta a pedidos de oração (líderes/mestres) + notificações in-app.

alter table public.prayer_requests
  add column if not exists response_text text,
  add column if not exists responded_by uuid references public.profiles(id) on delete set null,
  add column if not exists responded_at timestamptz;

alter table public.prayer_requests
  drop constraint if exists prayer_requests_status_check;

alter table public.prayer_requests
  add constraint prayer_requests_status_check
  check (status in ('novo', 'em_oracao', 'respondido', 'arquivado'));

comment on column public.prayer_requests.response_text is 'Resposta escrita por um líder/mestre (ou admin) ao pedido.';
comment on column public.prayer_requests.responded_by is 'Perfil (líder/mestre/admin) que respondeu.';
comment on column public.prayer_requests.responded_at is 'Quando a resposta foi enviada.';

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('prayer_request_new', 'prayer_request_response')),
  title text not null,
  body text not null default '',
  link text,
  metadata jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_notifications_user_unread
  on public.notifications(user_id, created_at desc)
  where read_at is null;

create index if not exists idx_notifications_user_created
  on public.notifications(user_id, created_at desc);

alter table public.notifications enable row level security;

drop policy if exists notifications_owner_select on public.notifications;
create policy notifications_owner_select
  on public.notifications for select
  using (user_id = auth.uid());

drop policy if exists notifications_owner_update on public.notifications;
create policy notifications_owner_update
  on public.notifications for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

comment on table public.notifications is 'Notificações in-app por usuário (pedidos de oração novos/respondidos, etc). Insert somente via service role.';

-- Líderes e mestres (além do admin) também podem ver e acompanhar os pedidos.
drop policy if exists prayer_requests_leader_select on public.prayer_requests;
create policy prayer_requests_leader_select
  on public.prayer_requests for select
  using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and (p.role = 'admin' or p.is_leader = true or p.is_mestre = true)
  ));

-- O autor do pedido pode ver o próprio pedido (e a resposta, quando houver).
drop policy if exists prayer_requests_owner_select on public.prayer_requests;
create policy prayer_requests_owner_select
  on public.prayer_requests for select
  using (user_id = auth.uid());
