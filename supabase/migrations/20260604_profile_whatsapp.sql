-- WhatsApp do membro para receber avisos da kehilah pelo zap.
-- O numero so e gravado quando o proprio membro registra (consentimento).

alter table public.profiles
  add column if not exists whatsapp text;

alter table public.profiles
  add column if not exists whatsapp_notify boolean not null default false;

comment on column public.profiles.whatsapp is
  'Numero de WhatsApp do membro (formato livre, normalizado no app). Opcional.';
comment on column public.profiles.whatsapp_notify is
  'Quando true, o membro aceitou receber avisos da kehilah por WhatsApp.';

-- Indice para listar quem optou por receber avisos (uso administrativo/disparo).
create index if not exists idx_profiles_whatsapp_notify
  on public.profiles(whatsapp_notify)
  where whatsapp_notify = true;
