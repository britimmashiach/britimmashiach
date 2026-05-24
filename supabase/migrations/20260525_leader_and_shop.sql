-- Lideres: flag separada do papel premium (pagamento).
-- Premium = assinatura paga. is_leader = aprovado pelo Rav para o portal de lideres.

alter table public.profiles
  add column if not exists is_leader boolean not null default false;

create index if not exists idx_profiles_is_leader
  on public.profiles(is_leader)
  where is_leader = true;

comment on column public.profiles.is_leader is
  'Acesso ao portal /lideres/painel. Concedido manualmente pelo admin; independente de premium.';

-- Catalogo da lojinha (velas e futuros produtos). Checkout MP pode ser ligado depois.

create table if not exists public.shop_products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null default '',
  price_cents int not null check (price_cents >= 0),
  category text not null default 'geral',
  image_url text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_shop_products_active
  on public.shop_products(is_active, sort_order);

alter table public.shop_products enable row level security;

create policy shop_products_select_active
  on public.shop_products for select
  using (is_active = true or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy shop_products_admin_all
  on public.shop_products for all
  using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- Seed inicial: velas decorativas (nome da loja/logo virao depois)

insert into public.shop_products (slug, name, description, price_cents, category, sort_order)
values
  (
    'vela-shabbat-classica',
    'Vela decorativa Shabbat',
    'Vela artesanal para mesa de Shabbat e ambientacao da casa. Acabamento elegante, ideal para kiddush e momentos de kavanah em familia.',
    4500,
    'velas',
    1
  ),
  (
    'vela-menorah-dourada',
    'Vela decorativa Menorah',
    'Vela decorativa inspirada na Menorah, com detalhes dourados. Para Chanukah, estudo ou decoracao do lar messianico.',
    5200,
    'velas',
    2
  ),
  (
    'vela-par-shalom',
    'Vela Par Shalom',
    'Vela com motivo Shalom, simbolo de paz e wholeness. Presente ou uso pessoal na rotina de oracao.',
    3800,
    'velas',
    3
  )
on conflict (slug) do nothing;
