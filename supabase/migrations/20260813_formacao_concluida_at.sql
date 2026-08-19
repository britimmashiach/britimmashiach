-- Data em que a formação Manhigut foi marcada como concluída (para diploma e lista do Rav).
alter table public.profiles
  add column if not exists formacao_concluida_at timestamptz null;

comment on column public.profiles.formacao_concluida_at is
  'Timestamp da conclusão da Formação Manhigut (Talmid Manhig). Preenchido ao marcar formacao_concluida = true.';

-- Backfill aproximado: quem já está concluído usa updated_at como referência.
update public.profiles
set formacao_concluida_at = coalesce(formacao_concluida_at, updated_at)
where formacao_concluida = true
  and formacao_concluida_at is null;
