-- Escola Rav EBBY: cursos sequenciais, questionários, colação admin e diplomas.

create table if not exists public.escola_courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  certification_title text not null,
  subtitle text not null default '',
  audience text not null default 'leader'
    check (audience in ('leader', 'member', 'both')),
  prerequisite_course_id uuid references public.escola_courses (id) on delete set null,
  sort_order int not null default 0,
  requires_leader boolean not null default true,
  profile_flag_on_complete text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.escola_course_stages (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.escola_courses (id) on delete cascade,
  stage_number int not null check (stage_number >= 1),
  slug text not null,
  title text not null,
  subtitle text not null default '',
  passing_score_pct int not null default 70 check (passing_score_pct between 1 and 100),
  questionnaire jsonb not null default '{}'::jsonb,
  unique (course_id, stage_number),
  unique (course_id, slug)
);

create index if not exists idx_escola_stages_course
  on public.escola_course_stages (course_id, stage_number);

create table if not exists public.escola_enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id uuid not null references public.escola_courses (id) on delete cascade,
  highest_unlocked_stage int not null default 1,
  status text not null default 'active'
  check (status in ('active', 'completed')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (user_id, course_id)
);

create table if not exists public.escola_stage_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  stage_id uuid not null references public.escola_course_stages (id) on delete cascade,
  answers jsonb not null default '[]'::jsonb,
  score_pct int not null default 0,
  is_apt boolean not null default false,
  status text not null default 'submitted'
    check (status in ('submitted', 'awaiting_colacao', 'approved', 'rejected')),
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users (id) on delete set null
);

create index if not exists idx_escola_attempts_user_stage
  on public.escola_stage_attempts (user_id, stage_id, submitted_at desc);

create table if not exists public.escola_colacao_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id uuid not null references public.escola_courses (id) on delete cascade,
  stage_id uuid not null references public.escola_course_stages (id) on delete cascade,
  attempt_id uuid not null references public.escola_stage_attempts (id) on delete cascade,
  kind text not null default 'stage'
    check (kind in ('stage', 'course_diploma')),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolved_by uuid references auth.users (id) on delete set null,
  admin_note text
);

create index if not exists idx_escola_colacao_pending
  on public.escola_colacao_queue (status, created_at desc)
  where status = 'pending';

create table if not exists public.escola_diplomas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id uuid not null references public.escola_courses (id) on delete cascade,
  colacao_id uuid references public.escola_colacao_queue (id) on delete set null,
  certificate_code text unique not null,
  course_title text not null,
  certification_title text not null,
  issued_at timestamptz not null default now(),
  issued_by uuid references auth.users (id) on delete set null
);

alter table public.escola_courses enable row level security;
alter table public.escola_course_stages enable row level security;
alter table public.escola_enrollments enable row level security;
alter table public.escola_stage_attempts enable row level security;
alter table public.escola_colacao_queue enable row level security;
alter table public.escola_diplomas enable row level security;

-- Catálogo e etapas: leitura para autenticados.
create policy escola_courses_select_auth
  on public.escola_courses for select
  to authenticated
  using (is_published = true);

create policy escola_stages_select_auth
  on public.escola_course_stages for select
  to authenticated
  using (
    exists (
      select 1 from public.escola_courses c
      where c.id = course_id and c.is_published = true
    )
  );

-- Matrícula e tentativas: só o próprio usuário (escrita via service role nas server actions).
create policy escola_enrollments_own
  on public.escola_enrollments for select
  to authenticated
  using (user_id = auth.uid());

create policy escola_attempts_own
  on public.escola_stage_attempts for select
  to authenticated
  using (user_id = auth.uid());

create policy escola_diplomas_own
  on public.escola_diplomas for select
  to authenticated
  using (user_id = auth.uid());

-- Admin: service role nas server actions; RLS restritivo para client anon.

comment on table public.escola_courses is
  'Cursos da Escola Rav EBBY (Manhigut, Avodat, IECL). Progresso sequencial e colação Rav.';

comment on table public.escola_colacao_queue is
  'Fila de colação: permanece pendente até o admin aprovar ou rejeitar.';

comment on column public.escola_courses.profile_flag_on_complete is
  'Campo lógico do perfil ao concluir o curso (ex.: formacao_concluida). Atualizado só após colação.';
