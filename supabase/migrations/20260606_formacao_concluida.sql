-- Conclusao da formacao de lideres: libera o material restrito das Imersoes
-- (manuais de Cura Interior, Libertacao e Avodat HaNefesh).
-- Marcado manualmente pelo Rav/admin apos a conclusao da formacao.

alter table public.profiles
  add column if not exists formacao_concluida boolean not null default false;

comment on column public.profiles.formacao_concluida is
  'Lider concluiu a formacao da Escola Rav EBBY. Libera o material de facilitacao das Imersoes (/imersoes). Marcado manualmente pelo admin.';
