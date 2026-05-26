-- Campos Asaas para Premium (PIX recorrente + anual) e CPF do pagador.

alter table public.profiles
  add column if not exists asaas_customer_id text,
  add column if not exists asaas_pix_authorization_id text,
  add column if not exists asaas_subscription_id text,
  add column if not exists cpf_cnpj text;

create index if not exists idx_profiles_asaas_customer_id
  on public.profiles(asaas_customer_id);

create index if not exists idx_profiles_asaas_pix_authorization_id
  on public.profiles(asaas_pix_authorization_id);

comment on column public.profiles.asaas_customer_id is
  'ID do cliente no Asaas (cus_...).';

comment on column public.profiles.asaas_pix_authorization_id is
  'ID da autorização Pix Automático no Asaas.';

comment on column public.profiles.asaas_subscription_id is
  'ID da assinatura Asaas vinculada ao Pix Automático (sub_...).';

comment on column public.profiles.cpf_cnpj is
  'CPF/CNPJ do pagador usado no Asaas (somente dígitos).';
