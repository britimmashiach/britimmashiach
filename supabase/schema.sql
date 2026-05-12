-- Brit Mashiach - Schema Supabase (produção)
-- Executar no SQL Editor do Supabase Dashboard

create extension if not exists "uuid-ossp";

-- =============================================================
-- PROFILES
-- =============================================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  role text not null default 'free'
    check (role in ('free', 'premium', 'admin')),
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  subscription_status text
    check (subscription_status in ('active', 'canceled', 'past_due')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_profiles_email on public.profiles(email);
create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_profiles_stripe_customer on public.profiles(stripe_customer_id);

alter table public.profiles enable row level security;

drop policy if exists "Usuarios veem proprio perfil" on public.profiles;
drop policy if exists "Usuarios atualizam proprio perfil" on public.profiles;
drop policy if exists "Admin acesso total profiles" on public.profiles;

create policy "Usuarios veem proprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Usuarios atualizam proprio perfil"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Admin acesso total profiles"
  on public.profiles for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Trigger: criar perfil ao registrar usuário
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger: atualizar updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- =============================================================
-- STUDIES
-- =============================================================
create table if not exists public.studies (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  title_hebrew text,
  category text not null default 'shiur',
  content text not null default '',
  excerpt text not null default '',
  is_premium boolean not null default false,
  author text not null default 'Rav Eliahu Barzilay ben Yehoshua',
  reading_time_minutes integer not null default 10 check (reading_time_minutes > 0),
  tags text[] not null default '{}',
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_studies_slug on public.studies(slug);
create index if not exists idx_studies_category on public.studies(category);
create index if not exists idx_studies_premium on public.studies(is_premium);
create index if not exists idx_studies_published on public.studies(published_at desc);

alter table public.studies enable row level security;

drop policy if exists "Estudos gratuitos sao publicos" on public.studies;
drop policy if exists "Estudos premium para assinantes" on public.studies;
drop policy if exists "Admin acesso total studies" on public.studies;

create policy "Estudos gratuitos sao publicos"
  on public.studies for select
  using (not is_premium);

create policy "Estudos premium para assinantes"
  on public.studies for select
  using (
    is_premium and exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('premium', 'admin')
    )
  );

create policy "Admin acesso total studies"
  on public.studies for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop trigger if exists studies_updated_at on public.studies;
create trigger studies_updated_at
  before update on public.studies
  for each row execute procedure public.set_updated_at();

-- =============================================================
-- PARASHOT
-- =============================================================
create table if not exists public.parashot (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  name_hebrew text not null,
  book text not null,
  week_number integer not null check (week_number between 1 and 54),
  haftarah text not null default '',
  haftarah_hebrew text not null default '',
  summary text not null default '',
  peshat text not null default '',
  remez text not null default '',
  drash text not null default '',
  sod text not null default '',
  is_premium boolean not null default false,
  published_at timestamptz not null default now()
);

create index if not exists idx_parashot_slug on public.parashot(slug);
create index if not exists idx_parashot_book on public.parashot(book);
create index if not exists idx_parashot_week on public.parashot(week_number);

alter table public.parashot enable row level security;

drop policy if exists "Parashot gratuitas sao publicas" on public.parashot;
drop policy if exists "Parashot premium para assinantes" on public.parashot;
drop policy if exists "Admin acesso total parashot" on public.parashot;

create policy "Parashot gratuitas sao publicas"
  on public.parashot for select
  using (not is_premium);

create policy "Parashot premium para assinantes"
  on public.parashot for select
  using (
    is_premium and exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('premium', 'admin')
    )
  );

create policy "Admin acesso total parashot"
  on public.parashot for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- =============================================================
-- LIBRARY BOOKS
-- =============================================================
create table if not exists public.library_books (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  title_hebrew text,
  author text not null,
  description text not null default '',
  category text not null default 'comentário',
  is_premium boolean not null default false,
  file_url text,
  cover_url text,
  published_year integer,
  created_at timestamptz not null default now()
);

create index if not exists idx_library_category on public.library_books(category);
create index if not exists idx_library_premium on public.library_books(is_premium);

alter table public.library_books enable row level security;

drop policy if exists "Livros gratuitos sao publicos" on public.library_books;
drop policy if exists "Livros premium para assinantes" on public.library_books;
drop policy if exists "Admin acesso total library" on public.library_books;

create policy "Livros gratuitos sao publicos"
  on public.library_books for select
  using (not is_premium);

create policy "Livros premium para assinantes"
  on public.library_books for select
  using (
    is_premium and exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.role in ('premium', 'admin')
    )
  );

create policy "Admin acesso total library"
  on public.library_books for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
