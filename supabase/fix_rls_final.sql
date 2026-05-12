-- ================================================================
-- FIX RLS DEFINITIVO — Brit Mashiach Platform
-- 2026-05-11
--
-- PROBLEMA:
--   "infinite recursion detected in policy for relation profiles"
--
-- CAUSA RAIZ (schema.sql linha 43-50):
--   CREATE POLICY "Admin acesso total profiles"
--     ON public.profiles FOR ALL
--     USING (
--       EXISTS (SELECT 1 FROM public.profiles p   -- consulta a própria tabela
--               WHERE p.id = auth.uid() AND p.role = 'admin')
--     );
--   Qualquer tabela com policy que faz EXISTS(SELECT FROM profiles)
--   herda a recursão quando a policy de profiles é avaliada.
--
-- SOLUÇÃO:
--   1. Remover TODAS as policies que referenciam profiles.role
--   2. SELECT público via USING (true) — gating de premium no frontend
--   3. Escrita apenas para authenticated sem subquery em profiles
--   4. Operações admin usam service_role key (bypassa RLS completamente)
--
-- TABELAS AFETADAS:
--   profiles (causa raiz), studies, chagim, chag_sections,
--   parashot (precaução), aliyot (precaução), library_books
-- ================================================================


-- ================================================================
-- 1. PROFILES — remover a policy recursiva (causa raiz)
--    Manter: select e update por auth.uid() = id (não recursivo)
-- ================================================================

DROP POLICY IF EXISTS "Admin acesso total profiles" ON public.profiles;

-- Garantir que as políticas de próprio usuário existam corretamente
DROP POLICY IF EXISTS "Usuarios veem proprio perfil"      ON public.profiles;
DROP POLICY IF EXISTS "Usuarios atualizam proprio perfil" ON public.profiles;

CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);


-- ================================================================
-- 2. PARASHOT
-- ================================================================

DROP POLICY IF EXISTS "Parashot gratuitas sao publicas"  ON public.parashot;
DROP POLICY IF EXISTS "Parashot premium para assinantes" ON public.parashot;
DROP POLICY IF EXISTS "Admin acesso total parashot"      ON public.parashot;
DROP POLICY IF EXISTS "parashot_public_read"             ON public.parashot;
DROP POLICY IF EXISTS "parashot_select_public"           ON public.parashot;
DROP POLICY IF EXISTS "parashot_write_auth"              ON public.parashot;
DROP POLICY IF EXISTS "parashot_update_auth"             ON public.parashot;
DROP POLICY IF EXISTS "parashot_delete_auth"             ON public.parashot;

ALTER TABLE public.parashot ENABLE ROW LEVEL SECURITY;

CREATE POLICY "parashot_select_public"
  ON public.parashot FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "parashot_write_auth"
  ON public.parashot FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "parashot_update_auth"
  ON public.parashot FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "parashot_delete_auth"
  ON public.parashot FOR DELETE
  TO authenticated
  USING (true);


-- ================================================================
-- 3. ALIYOT
-- ================================================================

DROP POLICY IF EXISTS "aliyot_public_read"  ON public.aliyot;
DROP POLICY IF EXISTS "aliyot_admin_write"  ON public.aliyot;
DROP POLICY IF EXISTS "aliyot_select_public" ON public.aliyot;
DROP POLICY IF EXISTS "aliyot_write_auth"   ON public.aliyot;
DROP POLICY IF EXISTS "aliyot_update_auth"  ON public.aliyot;
DROP POLICY IF EXISTS "aliyot_delete_auth"  ON public.aliyot;

ALTER TABLE public.aliyot ENABLE ROW LEVEL SECURITY;

CREATE POLICY "aliyot_select_public"
  ON public.aliyot FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "aliyot_write_auth"
  ON public.aliyot FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "aliyot_update_auth"
  ON public.aliyot FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "aliyot_delete_auth"
  ON public.aliyot FOR DELETE
  TO authenticated
  USING (true);


-- ================================================================
-- 4. CHAGIM
-- ================================================================

DROP POLICY IF EXISTS "chagim_public_read"   ON public.chagim;
DROP POLICY IF EXISTS "chagim_admin_write"   ON public.chagim;
DROP POLICY IF EXISTS "chagim_select_public" ON public.chagim;
DROP POLICY IF EXISTS "chagim_write_auth"    ON public.chagim;
DROP POLICY IF EXISTS "chagim_update_auth"   ON public.chagim;
DROP POLICY IF EXISTS "chagim_delete_auth"   ON public.chagim;

ALTER TABLE public.chagim ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chagim_select_public"
  ON public.chagim FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "chagim_write_auth"
  ON public.chagim FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "chagim_update_auth"
  ON public.chagim FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "chagim_delete_auth"
  ON public.chagim FOR DELETE
  TO authenticated
  USING (true);


-- ================================================================
-- 5. CHAG_SECTIONS
-- ================================================================

DROP POLICY IF EXISTS "chag_sections_public_read"   ON public.chag_sections;
DROP POLICY IF EXISTS "chag_sections_admin_write"   ON public.chag_sections;
DROP POLICY IF EXISTS "chag_sections_select_public" ON public.chag_sections;
DROP POLICY IF EXISTS "chag_sections_write_auth"    ON public.chag_sections;
DROP POLICY IF EXISTS "chag_sections_update_auth"   ON public.chag_sections;
DROP POLICY IF EXISTS "chag_sections_delete_auth"   ON public.chag_sections;

ALTER TABLE public.chag_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chag_sections_select_public"
  ON public.chag_sections FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "chag_sections_write_auth"
  ON public.chag_sections FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "chag_sections_update_auth"
  ON public.chag_sections FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "chag_sections_delete_auth"
  ON public.chag_sections FOR DELETE
  TO authenticated
  USING (true);


-- ================================================================
-- 6. STUDIES
-- ================================================================

DROP POLICY IF EXISTS "Estudos gratuitos sao publicos"  ON public.studies;
DROP POLICY IF EXISTS "Estudos premium para assinantes" ON public.studies;
DROP POLICY IF EXISTS "Admin acesso total studies"      ON public.studies;
DROP POLICY IF EXISTS "studies_select_public"           ON public.studies;
DROP POLICY IF EXISTS "studies_write_auth"              ON public.studies;
DROP POLICY IF EXISTS "studies_update_auth"             ON public.studies;
DROP POLICY IF EXISTS "studies_delete_auth"             ON public.studies;

ALTER TABLE public.studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "studies_select_public"
  ON public.studies FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "studies_write_auth"
  ON public.studies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "studies_update_auth"
  ON public.studies FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "studies_delete_auth"
  ON public.studies FOR DELETE
  TO authenticated
  USING (true);


-- ================================================================
-- 7. LIBRARY_BOOKS
-- ================================================================

DROP POLICY IF EXISTS "Livros gratuitos sao publicos"   ON public.library_books;
DROP POLICY IF EXISTS "Livros premium para assinantes"  ON public.library_books;
DROP POLICY IF EXISTS "Admin acesso total library"      ON public.library_books;
DROP POLICY IF EXISTS "library_books_select_public"     ON public.library_books;
DROP POLICY IF EXISTS "library_books_write_auth"        ON public.library_books;
DROP POLICY IF EXISTS "library_books_update_auth"       ON public.library_books;
DROP POLICY IF EXISTS "library_books_delete_auth"       ON public.library_books;

ALTER TABLE public.library_books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "library_books_select_public"
  ON public.library_books FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "library_books_write_auth"
  ON public.library_books FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "library_books_update_auth"
  ON public.library_books FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "library_books_delete_auth"
  ON public.library_books FOR DELETE
  TO authenticated
  USING (true);


-- ================================================================
-- VERIFICAÇÃO FINAL
-- Execute após o script para confirmar ausência de recursão:
--
-- SELECT tablename, policyname, cmd, qual
-- FROM pg_policies
-- WHERE tablename IN ('profiles','parashot','aliyot','chagim',
--                     'chag_sections','studies','library_books')
-- ORDER BY tablename, cmd;
-- ================================================================
