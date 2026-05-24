-- Adiciona campo para id do PreApproval do Mercado Pago em profiles.
-- Mantém compatibilidade com stripe_* (rodando os dois provedores em paralelo).

alter table public.profiles
  add column if not exists mp_subscription_id text;

create index if not exists idx_profiles_mp_subscription_id
  on public.profiles(mp_subscription_id);

comment on column public.profiles.mp_subscription_id is
  'ID do PreApproval no Mercado Pago (assinatura recorrente).';
