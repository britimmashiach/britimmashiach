-- Papel "Mestre": libera os metodos avancados da Gematria (Mispar Gadol, Siduri,
-- Katan, Katan Mispari, AtBash, im HaKolel). O publico geral so acessa o
-- Mispar Hechrachi. A promocao a Mestre e feita manualmente pelo admin.

alter table public.profiles
  add column if not exists is_mestre boolean not null default false;

comment on column public.profiles.is_mestre is
  'Mestre de Gematria: libera os metodos avancados da ferramenta /gematria (alem do Mispar Hechrachi, que e publico). Marcado manualmente pelo admin.';
