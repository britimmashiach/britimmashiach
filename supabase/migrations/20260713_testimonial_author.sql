-- Rastreia o autor (usuário cadastrado) de um testemunho enviado pelo site.
-- Envio via API roda com service role (bypassa RLS); a coluna serve para
-- moderação/anti-abuso e para uma futura tela de aprovação no painel.

alter table public.kehilah_testimonials
  add column if not exists user_id uuid references auth.users(id) on delete set null;

create index if not exists idx_kehilah_testimonials_user_id
  on public.kehilah_testimonials(user_id);

comment on column public.kehilah_testimonials.user_id is
  'Usuário autenticado que enviou o testemunho pelo site (null para testemunhos cadastrados manualmente).';
