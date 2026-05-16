-- =============================================================
-- 2026-05-16 — Tranca buckets de PDF (proteção total via proxy)
-- =============================================================
-- Objetivo:
--   1. Bucket parashot-pdfs deixa de ser público.
--   2. Cria bucket users-watermarked (privado) para cache de PDFs
--      com marca d'água personalizada por usuário.
--   3. Cria bucket tehilim-pdfs (privado) para o Livro 0 e demais
--      Passukim do Tehilim (que hoje vive em /public).
--   4. Define policies que só permitem leitura via service_role.
--      Todo acesso passa pelo route handler /api/pdf que valida
--      sessão + role do usuário e (se necessário) estampa o PDF.
--
-- Idempotente: rode quantas vezes precisar.
-- =============================================================

-- ─── 1. parashot-pdfs vira privado ─────────────────────────────
update storage.buckets
   set public = false
 where id = 'parashot-pdfs';

-- ─── 2. users-watermarked (novo, privado) ──────────────────────
insert into storage.buckets (id, name, public)
values ('users-watermarked', 'users-watermarked', false)
on conflict (id) do update set public = false;

-- ─── 3. tehilim-pdfs (novo, privado) ───────────────────────────
insert into storage.buckets (id, name, public)
values ('tehilim-pdfs', 'tehilim-pdfs', false)
on conflict (id) do update set public = false;

-- ─── 4. Remove qualquer policy permissiva antiga ──────────────
do $$
declare
  pol record;
begin
  for pol in
    select policyname from pg_policies
    where schemaname = 'storage'
      and tablename  = 'objects'
      and policyname like 'pdf_%'
  loop
    execute format('drop policy if exists %I on storage.objects', pol.policyname);
  end loop;
end$$;

-- ─── 5. Policies: apenas service_role lê/escreve nesses 3 buckets ──
-- Como o proxy /api/pdf usa o cliente admin (service_role) que
-- bypassa RLS, na prática não precisaríamos de policies de read
-- para usuários. Manter explícito por segurança.

create policy "pdf_service_role_all"
  on storage.objects
  for all
  to service_role
  using (bucket_id in ('parashot-pdfs', 'tehilim-pdfs', 'users-watermarked'))
  with check (bucket_id in ('parashot-pdfs', 'tehilim-pdfs', 'users-watermarked'));

-- Bloqueia explicitamente acesso anon e authenticated direto via REST.
-- (Sem policies de select para esses roles, RLS nega por default.)

-- ─── 6. Normaliza colunas pdf_url da aliyot para conter apenas o path ─
-- Se hoje guardam URL completa do storage público, extraímos o path.
-- Idempotente: o regexp_replace só remove o prefixo se ele existir.
update public.aliyot
   set pdf_url          = regexp_replace(pdf_url,          '^https?://[^/]+/storage/v1/object/public/parashot-pdfs/', ''),
       pdf_premium_url  = regexp_replace(pdf_premium_url,  '^https?://[^/]+/storage/v1/object/public/parashot-pdfs/', ''),
       pdf_kabbalah_url = regexp_replace(pdf_kabbalah_url, '^https?://[^/]+/storage/v1/object/public/parashot-pdfs/', '')
 where pdf_url          like 'http%'
    or pdf_premium_url  like 'http%'
    or pdf_kabbalah_url like 'http%';

-- Mesma normalização nas parashot (caso pdf_url tenha sido populada com URL)
update public.parashot
   set pdf_url = regexp_replace(pdf_url, '^https?://[^/]+/storage/v1/object/public/parashot-pdfs/', '')
 where pdf_url like 'http%';

-- ─── 7. Comentário documentando o contrato ────────────────────
comment on column public.aliyot.pdf_url          is 'Path relativo dentro do bucket parashot-pdfs (ex.: bereshit/aliyah-1.pdf). Acesso via /api/pdf/aliyah/{id}.';
comment on column public.aliyot.pdf_premium_url  is 'Path relativo dentro do bucket parashot-pdfs (Premium). Acesso via /api/pdf/aliyah/{id}/premium.';
comment on column public.aliyot.pdf_kabbalah_url is 'Path relativo dentro do bucket parashot-pdfs (Admin/Kabbalah). Acesso via /api/pdf/aliyah/{id}/kabbalah.';
