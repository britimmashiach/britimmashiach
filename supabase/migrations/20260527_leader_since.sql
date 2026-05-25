-- Data em que o Talmid foi aprovado como lider: inicio da jornada Manhigut (1 modulo por mes).

alter table public.profiles
  add column if not exists leader_since timestamptz;

comment on column public.profiles.leader_since is
  'Inicio do ciclo Manhigut (mes 1). Preenchido ao aprovar is_leader; limpo ao revogar.';

-- Lideres ja aprovados antes desta migration: usa updated_at como aproximacao.
update public.profiles
set leader_since = updated_at
where is_leader = true and leader_since is null;
