-- Seed opcional: agenda e testemunhos de exemplo (ajuste datas antes de rodar em produção).

insert into public.kehilah_events (title, description, event_type, starts_at, ends_at, location, live_url, is_public, sort_order)
values
  (
    'Shabat — culto e kiddush',
    'Toráh, Musaf e comunhão após o culto. Todos os visitantes são bem-vindos com respeito ao dress code modesto.',
    'culto',
    (date_trunc('week', now() at time zone 'America/Sao_Paulo') + interval '6 days' + time '09:30') at time zone 'America/Sao_Paulo',
    (date_trunc('week', now() at time zone 'America/Sao_Paulo') + interval '6 days' + time '12:30') at time zone 'America/Sao_Paulo',
    'Sinagoga Brit Im Mashiach — Rua General Carneiro, 749 — Estação, Franca — SP',
    null,
    true,
    10
  ),
  (
    'Estudo da Parashá — Beit Midrash',
    'Leitura da Aliyáh da semana com PaRDeS. Primeira Aliyáh aberta; aprofundamento nos portões internos.',
    'estudo',
    (date_trunc('week', now() at time zone 'America/Sao_Paulo') + interval '3 days' + time '19:30') at time zone 'America/Sao_Paulo',
    (date_trunc('week', now() at time zone 'America/Sao_Paulo') + interval '3 days' + time '21:00') at time zone 'America/Sao_Paulo',
    'Sinagoga Brit Im Mashiach — Rua General Carneiro, 749 — Estação, Franca — SP',
    null,
    true,
    20
  ),
  (
    'Aula ao vivo — portão aberto',
    'Transmissão ocasional de ensino do Rav EBBY. Link divulgado na véspera para irmãos cadastrados.',
    'live',
    (now() + interval '14 days') at time zone 'America/Sao_Paulo',
    (now() + interval '14 days' + interval '90 minutes') at time zone 'America/Sao_Paulo',
    'Online — plataforma Brit Im Mashiach',
    null,
    true,
    30
  )
;

insert into public.kehilah_testimonials (author_display_name, body, city, is_approved, is_featured, sort_order)
values
  (
    'Irmã M. — Franca',
    'Encontrar a Brit Im Mashiach devolveu minha fé às raízes hebraicas. O estudo semanal da Parashá com PaRDeS mudou a forma como leio a Toráh e vivo o Shabat em família.',
    'Franca, SP',
    true,
    true,
    10
  ),
  (
    'Irmão R.',
    'O calendário hebraico e os Chagim na plataforma ajudam quem está longe da sinagoga a permanecer no ciclo. Quando entrei nos portões internos, o Sod das Aliyot abriu um nível de oração que eu não conhecia.',
    null,
    true,
    true,
    20
  ),
  (
    'Casal D. & S.',
    'Viemos de origem evangélica e fomos recebidos com respeito pastoral. Hoje guardamos kashrut comunitária, estudamos Netivot e servimos na obra com kavanáh.',
    'Ribeirão Preto, SP',
    true,
    false,
    30
  );
