-- Bucket privado para PDFs da Biblioteca (Modelo Netivot, 49 Portões, etc.)
insert into storage.buckets (id, name, public)
values ('library-pdfs', 'library-pdfs', false)
on conflict (id) do update set public = false;

-- Estende policy existente para incluir library-pdfs
drop policy if exists "pdf_service_role_all" on storage.objects;

create policy "pdf_service_role_all"
  on storage.objects
  for all
  to service_role
  using (
    bucket_id in ('parashot-pdfs', 'tehilim-pdfs', 'users-watermarked', 'library-pdfs')
  )
  with check (
    bucket_id in ('parashot-pdfs', 'tehilim-pdfs', 'users-watermarked', 'library-pdfs')
  );

-- Slug estável para URLs /api/pdf/library/{slug}
alter table public.library_books
  add column if not exists slug text;

create unique index if not exists idx_library_books_slug
  on public.library_books (slug)
  where slug is not null;

-- Modelo Fixo de Netivot (referência Rav EBBY, caminhos 11–32)
insert into public.library_books (
  slug,
  title,
  title_hebrew,
  author,
  description,
  category,
  is_premium,
  file_url,
  published_year
)
select
  'modelo-fixo-netivot',
  'Modelo Fixo de Netivot',
  'נְתִיבֹות',
  'Rav Eliahu Barzilay ben Yehoshua',
  'Os 22 caminhos (11 a 32) da Etz Chaim segundo o Método Rav EBBY. Referência fixa Luriânica com letras, Sefirot e Olamot.',
  'kabaláh',
  true,
  'netivot/modelo-fixo-rav-ebby.pdf',
  5786
where not exists (
  select 1 from public.library_books where slug = 'modelo-fixo-netivot'
);

update public.library_books
   set title          = 'Modelo Fixo de Netivot',
       title_hebrew   = 'נְתִיבֹות',
       author         = 'Rav Eliahu Barzilay ben Yehoshua',
       description    = 'Os 22 caminhos (11 a 32) da Etz Chaim segundo o Método Rav EBBY. Referência fixa Luriânica com letras, Sefirot e Olamot.',
       category       = 'kabaláh',
       is_premium     = true,
       file_url       = 'netivot/modelo-fixo-rav-ebby.pdf',
       published_year = 5786
 where slug = 'modelo-fixo-netivot';

comment on column public.library_books.slug is 'Identificador na URL /api/pdf/library/{slug}.';
comment on column public.library_books.file_url is 'Path relativo no bucket library-pdfs (ex.: netivot/modelo-fixo-rav-ebby.pdf).';
