-- Seed do Chag: Shabat (shabat)
-- Gerado por scripts/build-chag-seed.mjs
-- Executar contra a base Supabase do projeto Brit Mashiach

BEGIN;

-- Idempotência: apaga (cascade) chag anterior com mesmo slug.
DELETE FROM chagim WHERE slug = 'shabat';

-- Insere o Chag em si.
INSERT INTO chagim (
  slug, name, name_hebrew, category, month_hebrew, day_start,
  duration_days, summary, content, level_pardes, is_premium,
  pdf_url, pdf_premium_url, pdf_kabbalah_url
) VALUES (
  'shabat',
  'Shabat',
  'שַׁבָּת',
  'minor',
  NULL,
  NULL,
  1,
  'O sétimo dia, abençoado e santificado por HaShem na própria Criação. Shabat HaMalká, a Noiva eterna que desce semanalmente ao encontro de Israel e da Brit Im Mashiach, carregando em si toda a kedushá do ciclo e antecipando o Yom Shekuló Shabat, o Dia que é Todo Shabat, o Olam Habá inteiro.',
  'Shabat é o primeiro Moed da Toráh, instituído pelo próprio HaShem antes mesmo de existir Israel como povo. É a única criatura espiritual que recebeu duas outorgas diretas no momento da Criação, vayevarech, abençoou, e vayekadesh, santificou. Por isto Shabat é a porta de entrada de toda a kedushá ao ciclo da semana e o eixo em torno do qual gira todo o calendário judaico messiânico. Este guia leva você do significado mais simples ao Sod mais profundo do sétimo dia, com liturgia completa em hebraico, transliteração sefardita, tradução fiel e comentários no Método Rav EBBY.',
  ARRAY['peshat','remez','drash','sod']::TEXT[],
  false,
  NULL,
  NULL,
  NULL
);

-- Insere as seções.
WITH chag AS (SELECT id FROM chagim WHERE slug = 'shabat')
INSERT INTO chag_sections (chag_id, order_num, title, content, level_pardes, is_premium) VALUES
  ((SELECT id FROM chag),
   1,
   'Capa Hero',
   '## Briefing visual

Tela em modo escuro, gradiente petróleo profundo descendo para preto absoluto. No centro vertical da tela, em fonte Shlomo Stam monumental, dourado champagne com sombra interna suave, a palavra hebraica:

**שַׁבָּת**

Logo abaixo, em Cinzel champagne, espaçamento amplo entre letras: *Shabat*

Subtítulo discreto, Cormorant itálico, mesma família de dourado em opacidade menor: *Shabat HaMalká, a Noiva eterna*

Frase central espiritual em itálico Cormorant, branco quente: *vayevarech Elohim et yom hash''vi''i vayekadesh otô*

Tradução curta abaixo, fonte Inter peso leve, opacidade reduzida: *e abençoou Elohim o sétimo dia e o santificou*

## Composição de fundo

Duas chamas de vela trêmulas em silhueta longínqua, posicionadas simetricamente nos terços laterais inferiores. Partículas douradas suaves descendo lentamente como faíscas santas, nitzotzot, retornando à Sua origem. Textura sutil de hebraico em opacidade baixíssima por trás, repetindo versículos de Bereshit 2:1-3 em fluxo vertical. Selo gráfico da Brit Im Mashiach em discreção no canto inferior direito. Linha dourada finíssima, horizontal, separando o hero do bloco seguinte.

## Texto-âncora de abertura

Bem-vindo ao portal do Shabat da Brit Im Mashiach. Aqui você encontra tudo o que precisa para receber, viver e despedir o sétimo dia com a profundidade que ele merece. Liturgia completa em hebraico com transliteração sefardita e tradução fiel, guia prático para iniciantes, perspectiva kabalística luriânica e correlação messiânica alinhada à Toráh. Da primeira vela acesa até a Havdaláh, da primeira Bracháh até o último Nigún, conduzimos você passo a passo no ritmo do Método Rav EBBY.',
   '{}'::TEXT[],
   false),

  ((SELECT id FROM chag),
   2,
   'O Que é Shabat',
   'Shabat é o sétimo dia da semana, instituído pelo próprio HaShem no princípio absoluto da Criação, antes mesmo de existir um povo, uma terra ou uma religião. Está escrito em **Bereshit 2:1-3**: *Vayechulu hashamayim veha''arets vechol tzevaam, vayechal Elohim bayom hash''vi''i melachto asher asá, vayishbot bayom hash''vi''i mikol melachto asher asá. Vayevarech Elohim et yom hash''vi''i vayekadesh otô, ki vô shavat mikol melachto asher bará Elohim laasot.* E concluíram-se os céus e a terra e todo seu exército. E concluiu Elohim no sétimo dia a obra que fez, e cessou no sétimo dia de toda a obra que fez. E abençoou Elohim o sétimo dia e o santificou, porque nele cessou de toda a Sua obra que Elohim criou para fazer.

Shabat é o primeiro elemento na história da Criação que recebe duas ações específicas de HaShem, *vayevarech*, abençoou, e *vayekadesh*, santificou. Nenhum outro dia, nem mesmo o homem no momento de sua criação no sexto dia, recebeu *kedushá*, santidade, no ato da formação. Apenas Shabat. Esta é a primeira pista de que Shabat não é apenas uma medida de tempo, mas uma realidade espiritual concreta que desce ao mundo a cada sétimo giro do ciclo semanal.

## Quando Shabat ocorre

Shabat começa no pôr do sol da sexta-feira e termina ao surgirem três estrelas pequenas no céu da noite do sábado. Em hebraico chamamos o início de *kenisat haShabat*, a entrada de Shabat, e o fim de *yetziat haShabat*, a saída de Shabat. Por costume e por halacháh, antecipamos a entrada acendendo velas dezoito minutos antes do pôr do sol, ato chamado *hadlakat nerot Shabat*. Por costume, prolongamos a saída além das três estrelas com a *Havdaláh*, separação ritual entre o santo e o profano.

A duração total é de aproximadamente vinte e cinco horas. Este intervalo não é arbitrário. A tradição luriânica explica que Shabat carrega em si um tempo expandido, *tosefet Shabat*, acréscimo de Shabat, antes e depois da medida estrita, porque a kedushá precisa de margem para entrar e sair sem ser interrompida bruscamente pelo profano.

## Por que Shabat existe

Shabat existe porque HaShem assim quis e assim ordenou. No nível do Peshat, a Toráh dá três razões explícitas que se complementam.

A primeira está em **Shemot 20:11**, no Decálogo entregue no Sinai: *ki sheshet yamim asá HaShem et hashamayim ve''et ha''arets, et hayam ve''et kol asher bam, vayanach bayom hash''vi''i, al ken berach HaShem et yom haShabat vayekad''shehu.* Porque em seis dias fez HaShem os céus e a terra, o mar e tudo o que neles há, e descansou no sétimo dia, por isto abençoou HaShem o dia de Shabat e o santificou. Aqui Shabat é testemunho da Criação. Guardar Shabat é declarar semanalmente que o mundo tem um Criador.

A segunda está em **Devarim 5:15**, na repetição do Decálogo no quadragésimo ano: *vezacharta ki eved hayita be''erets Mitzraim, vayotziacha HaShem Elokecha misham beyad chazacáh uvizroa netuyá, al ken tziv''cha HaShem Elokecha laasot et yom haShabat.* E lembrarás que servo foste na terra do Mitzraim, e tirou-te HaShem teu Elohim de lá com mão forte e com braço estendido, por isto te ordenou HaShem teu Elohim fazer o dia de Shabat. Aqui Shabat é testemunho da redenção. Guardar Shabat é declarar semanalmente que o Eterno liberta escravos.

A terceira aparece de modo recorrente, especialmente em **Shemot 31:13-17**: *ki ot hi beini uveinechem ledoroteichem.* Porque sinal é ela entre Mim e vós pelas vossas gerações. Aqui Shabat é o *ot*, o sinal, o selo visível da aliança entre HaShem e Israel. Guardar Shabat é levar marcado no corpo do tempo o emblema do povo eleito.

## O que Shabat representa espiritualmente

Shabat é a antecipação semanal do *Olam Habá*, o mundo vindouro. Chazal ensinam, no **Talmud Bavli, Berachot 57b**, que Shabat é *me''ein Olam Habá*, uma sexagésima parte do Olam Habá. Cada Shabat é uma janela aberta para o Dia que é Todo Shabat, *Yom Shekuló Shabat uMenuchá leChayei haOlamim*, o Dia que é Todo Shabat e Repouso para a Vida dos Mundos. Aquele que guarda Shabat com kavaná verdadeira já prova, agora, da realidade que está vindo.

Shabat é também o eixo em torno do qual gira todo o calendário judaico. Os Moedim, as festas fixas, são chamados *mikra''ei kodesh*, convocações santas, mas todos derivam sua kedushá do Shabat semanal. Por isto, ao calcular o calendário, contamos sempre em relação ao Shabat. O Pessach acontece tantos dias após um Shabat, o Shavuot é contado a partir do Shabat de Pessach, e assim por diante.

Para a Brit Im Mashiach, congregação judaica messiânica não trinitária da cidade de Franca, Shabat é guardado com toda a seriedade halácica que a Toráh exige, ao mesmo tempo em que reconhecemos no Mashiach a chave luminosa do Sod do sétimo dia. A Brit Hadashá não anulou Shabat. Ela revelou o Mashiach como aquele que abre o portal definitivo para o Olam Habá, o próprio Shabat eterno que o sétimo dia semanal antecipa.

**Fonte:** Bereshit 2:1-3; Shemot 20:8-11; Shemot 31:13-17; Devarim 5:12-15; Talmud Bavli, Berachot 57b; Talmud Bavli, Shabat 10b e 119b; Mishné Toráh, Hilchot Shabat 30:1-2.',
   ARRAY['peshat']::TEXT[],
   false),

  ((SELECT id FROM chag),
   3,
   'Origem Bíblica',
   'A Toráh menciona Shabat mais de cem vezes, mais do que qualquer outro Moed. Esta densidade não é acidental. O sétimo dia é o único Moed instituído antes da Toráh ter sido formalmente entregue no Sinai, e o único cuja origem é a própria estrutura da Criação. Vamos percorrer as principais passagens em ordem narrativa, do Bereshit ao Devarim, observando como cada aparição acrescenta uma camada à compreensão do Shabat.

## Primeira camada, na Criação, Bereshit 2:1-3

*Vayechulu hashamayim veha''arets vechol tzevaam. Vayechal Elohim bayom hash''vi''i melachto asher asá, vayishbot bayom hash''vi''i mikol melachto asher asá. Vayevarech Elohim et yom hash''vi''i vayekadesh otô, ki vô shavat mikol melachto asher bará Elohim laasot.*

Aqui Shabat é instituído por HaShem antes de existir Avraham, antes de existir Israel, antes de existir a Toráh escrita. Shabat pertence à própria ordem do cosmos. Quem guarda Shabat se alinha com a respiração original da Criação. Esta passagem é recitada toda sexta-feira à noite no Kidush, exatamente porque o Kidush é o ato litúrgico que reata a humanidade com o ato criador do princípio.

## Segunda camada, no Maná, Shemot 16

Antes mesmo do Sinai, Israel já experimenta Shabat no deserto, através do milagre do Maná. Está escrito em **Shemot 16:23-30**: *zé asher diber HaShem, Shabaton Shabat kodesh laHaShem machar.* Isto é o que falou HaShem, descanso, Shabat santo para HaShem, é o amanhã. No sexto dia caía o dobro de Maná. No sétimo dia não caía nada. Aquele que tentou colher no sétimo, não achou.

A lição é clara. Shabat exige confiança. Quem guarda Shabat confia que o sustento do sétimo dia já foi providenciado no sexto. Em hebraico chamamos isto de *bitachón*, confiança ativa em HaShem. Esta camada do Shabat é especialmente importante para iniciantes que vêm do mundo do trabalho ininterrupto e se perguntam, como vou viver sem trabalhar um dia inteiro por semana. A resposta da Toráh é, HaShem providenciará dobrado no sexto se você se entregar de coração ao sétimo.

## Terceira camada, no Sinai, Shemot 20:8-11

Quando os Asseret haDibrot, os Dez Princípios, são entregues no Monte Sinai, Shabat aparece como o quarto deles, ocupando o espaço de ponte entre os mandamentos relativos a HaShem (os três primeiros) e os mandamentos relativos ao próximo (os seis seguintes). Esta posição é teologicamente significativa. Shabat é o mandamento que liga o vertical, nossa relação com o Criador, ao horizontal, nossa relação com a humanidade. Quem guarda Shabat reconhece HaShem como Criador e protege o descanso de todos ao redor, incluindo servos, animais e estrangeiros.

A primeira palavra é *Zachor*, lembra. *Zachor et yom haShabat lekadesho.* Lembra do dia de Shabat para santificá-lo. Esta é uma mitzvá positiva, uma ação. Lembrar não é apenas mentalizar, é santificar com o Kidush, é mencionar o nome do dia nas brachot, é alegrar-se com vinho e refeição festiva.

## Quarta camada, nas Tábuas Segundas, Devarim 5:12-15

Quando Moshé repete o Decálogo no quadragésimo ano, próximo à entrada na Terra, ele troca *Zachor* por *Shamor*, guarda. *Shamor et yom haShabat lekadesho kaasher tzivecha HaShem Elokecha.* Guarda o dia de Shabat para santificá-lo, como te ordenou HaShem teu Elohim. Esta é uma mitzvá negativa, uma cessação. Guardar significa cessar do *melachá*, dos trinta e nove tipos de trabalho criativo proibidos.

Chazal ensinam que *Zachor* e *Shamor* foram pronunciados pelo Eterno em um único ato de fala impossível à boca humana, *bedibur echad*, e que se dividiram em duas apenas ao chegarem aos ouvidos do povo (Talmud Bavli, Shevuot 20b). Por isto acendemos duas velas no início de Shabat, uma para *Zachor*, lembrar e santificar com kidush, outra para *Shamor*, guardar e cessar do trabalho. As duas velas juntas formam a unidade original da fala divina.

## Quinta camada, na Aliança Eterna, Shemot 31:12-17

Logo após as instruções do Mishkán, a Toráh repete Shabat com força redobrada, classificando-o como *brit olam*, aliança eterna, e *ot beini uveinechem ledoroteichem*, sinal entre Mim e vós pelas vossas gerações. Aqui aprendemos que Shabat não é uma simples observância, é o emblema constitutivo do povo eleito. Um judeu ou um messiânico que guarda Shabat carrega na pele do tempo um sinal visível da aliança. Aquele que abandona Shabat não rejeita uma prática, rejeita um pacto.

## Sexta camada, no Mishkán e nos Moedim, Vayikra 23:3

Quando a Toráh lista os Moedim, festas fixas do calendário, em **Vayikra 23**, ela começa não com Pessach, mas com Shabat. *Sheshet yamim teaseh melachá, uvayom hash''vi''i Shabat shabaton mikra kodesh, kol melachá lo taasu, Shabat hi laHaShem bechol moshvoteichem.* Seis dias farás trabalho, e no sétimo dia, Shabat de descanso completo, convocação santa, nenhum trabalho fareis, Shabat de HaShem é em todas as vossas habitações.

A lição aqui é estrutural. Shabat é o primeiro Moed e o eixo dos demais. Todas as festas anuais derivam sua kedushá do Shabat semanal. Por isto a tradição diz que aquele que guarda Shabat já tem em si a semente de guardar todos os Chagim.

## Sétima camada, nos Profetas, Yesha''yahu 56 e 58

Yesha''yahu fala diretamente do Shabat duas vezes, em passagens que entram na Haftaráh de Shabat especiais. Em **Yesha''yahu 56:2-7** lemos: *ashrei enosh yaaseh zot, uven adam yachazik bah, shomer Shabat mechalelo veshomer yadô measot kol ra.* Feliz o homem que faz isto, e o filho do homem que se prende nela, que guarda Shabat de profaná-lo, e guarda sua mão de fazer todo mal. Aqui Shabat é elevado a categoria de critério da retidão pessoal.

Em **Yesha''yahu 58:13-14** o profeta amplia: *im tashiv miShabat raglecha, asot chafatzecha beyom kodshi, vekarata laShabat oneg, likdosh HaShem mechubad.* Se retirares de Shabat o teu pé, de fazer teus afazeres no Meu dia santo, e chamares ao Shabat deleite, ao santo de HaShem honrado. A palavra *oneg*, deleite, é a chave do Shabat profundo. Quem guarda Shabat com tristeza não cumpre. Quem guarda Shabat com alegria, com mesa farta, com cânticos, com estudo, com amor, cumpre na plenitude. Por isto o termo *oneg Shabat*, deleite de Shabat, é central na liturgia e na cultura judaica.

## Síntese da origem bíblica

Reunindo todas as camadas, Shabat na Toráh é:

▸ Memória da Criação (Bereshit 2)
▸ Confiança no sustento divino (Shemot 16)
▸ Quarto Princípio do Decálogo (Shemot 20)
▸ Lembrança da redenção do Mitzraim (Devarim 5)
▸ Aliança eterna e sinal entre HaShem e Israel (Shemot 31)
▸ Eixo do calendário e primeiro dos Moedim (Vayikra 23)
▸ Critério profético da retidão e do deleite (Yesha''yahu 56 e 58)

Estas sete camadas correspondem, no nível mais oculto, às sete Sefirot inferiores que Shabat retifica. Voltaremos a este ponto na Perspectiva Kabalística.

**Fonte:** Bereshit 2:1-3; Shemot 16:22-30; Shemot 20:8-11; Shemot 31:12-17; Vayikra 23:3; Devarim 5:12-15; Yesha''yahu 56:2-7 e 58:13-14; Talmud Bavli, Shevuot 20b; Talmud Bavli, Shabat 10b.',
   ARRAY['peshat']::TEXT[],
   false),

  ((SELECT id FROM chag),
   4,
   'Significado Espiritual',
   'Compreender o significado espiritual do Shabat é compreender que o tempo, longe de ser uma esteira homogênea de instantes idênticos, é uma realidade vertebrada por kedushá. Há tempo profano, *chol*, e há tempo santo, *kodesh*. Shabat é o tempo mais santo da existência humana semanal, comparável apenas, em intensidade, ao Yom Kippur, que é chamado *Shabat Shabaton*, Shabat dos Shabats. Esta seção explora o que Shabat faz na alma de quem o guarda.

## A alma adicional, Neshamáh Yeterá

Chazal ensinam, no **Talmud Bavli, Beitzá 16a**, que cada judeu e cada filho de Israel recebe na entrada de Shabat uma alma adicional, *neshamáh yeterá*, que permanece nele durante todo o sétimo dia e parte ao fim, na Havdaláh. Esta neshamáh adicional não é metáfora. É uma faísca espiritual real, vinda do Olam haAtzilut, que se acopla à alma comum e amplia momentaneamente a capacidade de sentir o divino.

É por causa desta alma adicional que tantas pessoas sentem em Shabat algo que não sentem em outros dias. Uma paz inexplicável. Um descanso que não é apenas cessação de cansaço, mas presença ativa de algo elevado. Uma sensibilidade aumentada à oração, ao estudo, ao Nigún, ao olhar da família. Esta sensibilidade aumentada é a *neshamáh yeterá* agindo. Por isto, na Havdaláh, cheiramos especiarias, *besamim*, para confortar a alma comum que sente a partida da alma adicional ao término do sétimo dia.

Para iniciantes, esta é uma das primeiras experiências que confirmam a realidade espiritual do Shabat. Cumpra um Shabat completo, com kavaná, e você sentirá a diferença na sua alma. Não é sugestão psicológica. É realidade ontológica.

## Cessação como retificação, Tikun pela inatividade

Em todos os outros dias da semana o ser humano é chamado a agir, criar, transformar a matéria. Esta é a vocação do sexto dia, quando o homem foi criado. Mas se a ação não tiver um ponto de pausa absoluta, ela se transforma em escravidão. O escravo é justamente aquele que não pode parar. Por isto o Decálogo liga Shabat à libertação do Mitzraim. Quem guarda Shabat declara que não é escravo de nada, nem do dinheiro, nem do trabalho, nem do consumo, nem da própria ambição.

A cessação do Shabat, *menuchá*, é portanto uma retificação ativa, um *tikun* da alma. Toda semana o homem repete em pequena escala o ciclo da Criação. Trabalha seis dias e descansa um. Este descanso não é vazio. É preenchido de kedushá, de Toráh, de família, de mesa, de cânticos. Por isto o judaísmo nunca confundiu Shabat com folga. Folga é ausência de trabalho. Shabat é presença de santidade.

## Refinamento das Middot, as qualidades da alma

Cada Shabat refina uma qualidade específica da alma. Vamos nomeá-las.

A primeira é a *paciência*. Quem guarda Shabat aprende a esperar. Aprende que nem tudo precisa ser feito imediatamente. O e-mail pode esperar. O recado pode esperar. A solução pode esperar. HaShem cuidou do mundo por sete dias, pode cuidar mais vinte e cinco horas sem a sua intervenção.

A segunda é a *humildade*. Quem para de produzir descobre que o mundo continua girando sem ele. Esta descoberta é uma das mais saudáveis que um ser humano pode fazer. A doença do nosso tempo é a ilusão de indispensabilidade. Shabat cura esta doença semanalmente.

A terceira é a *gratidão*. Quem cessa de produzir tem tempo para observar o que recebeu. A vela acesa, o vinho no copo, a chalá na mesa, o rosto dos filhos, a voz do cônjuge, o silêncio da casa. Estas presenças, normalmente atravessadas correndo, em Shabat ficam reveladas. Esta revelação produz gratidão.

A quarta é a *bitachón*, confiança. Quem confia em HaShem para um dia inteiro, todo sétimo dia, descobre que pode confiar em HaShem para os outros seis também. Shabat é a escola semanal da confiança.

A quinta é a *simchá*, alegria. Yesha''yahu nomeou Shabat de *oneg*, deleite. Não há Shabat triste autêntico. Por isto não se faz hesped, elogio fúnebre, em Shabat. Não se jejua. Não se chora os mortos. Em Shabat, mesmo o luto guarda silêncio. A alegria de Shabat não é eufórica nem distraída. É a alegria profunda de quem sabe estar diante de HaShem.

## Antecipação do Olam Habá

Shabat é chamado *me''ein Olam Habá*, uma sexagésima parte do mundo vindouro. Esta é a chave escatológica do Shabat. O Olam Habá não é um lugar distante a se alcançar após a morte. É uma realidade espiritual cuja primeira degustação semanal está disponível agora, todo sétimo dia, na sua casa, na sua mesa, na sua sinagoga.

Por isto a tradição luriânica ensina a comer com kavaná consciente em Shabat. Cada bocado de chalá é um bocado do pão do Mashiach. Cada gole de vinho é um gole do *yain hameshumar*, o vinho preservado desde a Criação para o banquete final dos justos. Cada palavra de Toráh estudada em Shabat tem peso multiplicado, porque o ar do sétimo dia é o próprio ar do Olam Habá descendo.

Esta perspectiva muda completamente a postura de quem entra em Shabat. Não estamos cumprindo uma obrigação. Estamos provando, agora, a realidade que o Mashiach inaugurará em plenitude. Por isto a Brit Im Mashiach guarda Shabat com a intensidade messiânica que ele exige. Não é apenas memória do passado. É antecipação do futuro.

## Tikun da semana inteira

Há um princípio kabalístico fundamental que precisa ser internalizado por quem deseja Shabat com profundidade. Os seis dias da semana correspondem às seis Sefirot inferiores, *Chesed, Gevurá, Tiferet, Netzach, Hod, Yessod*. Cada dia recebe a influência de uma Sefiráh. Domingo é dia de Chesed, segunda de Gevurá, terça de Tiferet, quarta de Netzach, quinta de Hod, sexta de Yessod. Shabat corresponde a Malchut, a décima Sefiráh.

Shabat é o dia em que Malchut recolhe toda a obra dos seis dias e a apresenta ao Eterno como oferta. Tudo o que você fez na semana, com kavaná ou sem, é elevado em Shabat. Por isto o sétimo dia é o tikun semanal da alma. Os tropeços dos seis dias são consertados, as kedusháh espalhada é reunida, as faíscas santas dispersas em todos os atos profanos retornam à sua origem.

Aquele que guarda Shabat com kavaná não apenas observa um mandamento. Ele opera ativamente o tikun semanal de tudo o que viveu. Esta é uma das razões pelas quais a tradição é tão exigente quanto à kavaná. Shabat sem kavaná é Shabat parcial. Shabat com kavaná é Shabat plenamente eficaz.

## Resumo do significado espiritual

▸ Receber a *neshamáh yeterá* e operar com ela durante vinte e cinco horas.
▸ Cessar de toda criação e descobrir, na pausa, a presença ativa do Criador.
▸ Refinar paciência, humildade, gratidão, confiança e alegria.
▸ Provar agora uma parcela do Olam Habá.
▸ Operar o tikun da semana inteira recolhendo as faíscas santas dos seis dias.

Shabat é, em síntese, o dia em que a alma do judeu e do messiânico volta para casa.

**Fonte:** Talmud Bavli, Beitzá 16a; Talmud Bavli, Shabat 12a, 119b; Talmud Bavli, Berachot 57b; Yesha''yahu 58:13-14; Rav Moshe Chaim Luzzatto, Messilat Yesharim cap. 19; Ari haKadosh, Shaar haKavvanot, Derush Kabalat Shabat.',
   ARRAY['drash','remez']::TEXT[],
   false),

  ((SELECT id FROM chag),
   5,
   'Perspectiva Kabalística',
   'A perspectiva kabalística do Shabat é a chave que abre os portões mais profundos do sétimo dia. Sem ela, Shabat é descanso. Com ela, Shabat é o momento cósmico em que a Noiva sobe ao encontro do Noivo, em que os mundos inferiores se reabastecem, em que as faíscas dispersas retornam à sua fonte, em que o próprio Mashiach se aproxima do tempo presente. Vamos seguir, com ordem, o ensino do Zohar e do Ari haKadosh.

## A Noiva e o Noivo, Malchut e Tiferet

A Kabaláh luriânica, transmitida por Rav Itzchak Luria, o Arizal, em Tzefat no século XVI, revela que durante os seis dias da semana *Malchut*, a décima Sefiráh, encontra-se em estado de queda relativa. Está distante de *Tiferet*, a Sefiráh central da harmonia masculina. Esta distância é necessária. É durante esta distância que *Malchut* desce aos mundos inferiores, ao Olam haAsiáh, e ao próprio Olam haKlipot, para resgatar as faíscas santas, *nitzotzot*, dispersas em toda matéria.

Cada ato bom realizado durante a semana é uma faísca elevada por *Malchut*. Cada bracháh dita com kavaná, cada mitzvá cumprida, cada palavra de Toráh estudada, eleva uma faísca. Estas faíscas são acumuladas em *Malchut* ao longo dos seis dias. Na entrada de Shabat, *Malchut* sobe carregando todo este acervo de faíscas e se une a *Tiferet*. Esta união é o ato cósmico central do Shabat. Toda a liturgia do Kabalat Shabat, desde os seis salmos iniciais (95 a 99 e 29) até o Lecha Dodi, é construída para acompanhar passo a passo esta ascensão da Noiva.

Por isto chamamos Shabat de *Shabat HaMalká*, Shabat a Rainha, e por isto cantamos *Boi Kalá*, vem Noiva, ao final do Lecha Dodi. A Noiva é *Malchut*, a *Shechiná*, o aspecto feminino da Presença Divina. O Noivo é *Tiferet*, o aspecto masculino harmonioso. Israel e a Brit Im Mashiach, no momento de Shabat, atuam como os amigos do Noivo que recebem a Noiva e a conduzem ao encontro.

## Os Olamot e a ascensão progressiva

A Kabaláh luriânica ensina que existem quatro mundos espirituais sobrepostos, *Atzilut, Briáh, Yetziráh, Asiáh*. Durante a semana, *Malchut* opera no Olam haAsiáh, o mundo mais baixo da ação. Na entrada de Shabat, *Malchut* sobe progressivamente.

Na sexta-feira à tarde, *Malchut* sobe de *Asiáh* para *Yetziráh*. Na recitação de *Mizmor leDavid HaShem ro''í*, Salmo 23, sobe para *Briáh*. Na recitação de *Lecha Dodi*, sobe para *Atzilut*. Na recitação do Kidush noturno, *Malchut* recebe o coroamento final em *Atzilut* e se une plenamente a *Tiferet*.

Este caminho ascensional não é simbólico. É operativo. Quem reza Kabalat Shabat com kavaná consciente está participando da subida da *Shechiná* pelos Olamot. Cada salmo, cada estrofe do Lecha Dodi, cada palavra do Kidush, corresponde a um degrau real desta escada espiritual.

## Os Netivot ativos em Shabat

Há vinte e dois Netivot, caminhos espirituais que conectam as Sefirot na Etz Chaim, a Árvore da Vida. Cada Netiv corresponde a uma letra do Alef-Beit. Em Shabat, certos Netivot estão particularmente ativos.

▸ **Netiv Tav** (letra ת) conecta *Yessod* a *Malchut*. É o canal pelo qual o influxo masculino chega à Noiva. Por isto a sexta-feira, que é o dia de Yessod, termina entregando à Malchut, que é Shabat. A própria palavra *Shabbat* termina com Tav, sugerindo este canal final de entrega.

▸ **Netiv Resh** (letra ר) conecta *Tiferet* a *Malchut*. É o caminho da união direta entre o Noivo e a Noiva, ativado especialmente no Lecha Dodi.

▸ **Netiv Nun** (letra נ) conecta *Tiferet* a *Yessod*. Prepara o influxo masculino que será entregue à Malchut através de Yessod.

▸ **Netiv Lamed** (letra ל) conecta *Chesed* a *Tiferet*. É o canal pelo qual a bondade descende para se harmonizar antes de descer à Noiva. Por isto a primeira refeição de Shabat, a da sexta-feira à noite, corresponde a *Chesed*, e é caracterizada pela hospitalidade e abundância.

A oração e o estudo de Shabat ativam estes Netivot. Quem reza com kavaná abre canais. Quem reza sem kavaná passa pelos canais sem abri-los.

## As três refeições e as três Sefirot superiores

A tradição luriânica conecta as três *seudot*, refeições festivas de Shabat, a três Sefirot específicas.

A primeira refeição, sexta-feira à noite após o Kidush, corresponde a *Chesed*, a bondade. É a refeição da abundância, da hospitalidade, da família reunida. A mesa deve estar farta, os hóspedes bem-vindos. Esta é a refeição em que se recebe a Noiva com magnificência.

A segunda refeição, sábado pela manhã após o serviço, corresponde a *Gevurá*, o rigor. Não é uma refeição triste, é uma refeição disciplinada. O cozido tradicional, *cholent*, é símbolo desta Sefiráh: cozinhado lentamente, sem fogo aceso novo, com pacientes contenção. Aqui Israel pratica o rigor do Shabat em meio à festa.

A terceira refeição, no fim da tarde do sábado, chamada *Seudá Shelishit* ou *Shaleshudes*, corresponde a *Tiferet*, a harmonia. É a refeição mais espiritual, frequentemente mais leve, acompanhada de Nigunim de melodia profunda. Aqui ocorre o momento mais elevado do Shabat segundo o Arizal. A Noiva está prestes a partir, e a Brit Im Mashiach a acompanha com cânticos até o limite.

Cumprir as três *seudot* é completar a tríade Chesed-Gevurá-Tiferet, as três Sefirot emocionais centrais, e operar tikun em todo o aspecto emocional da semana vivida.

## A Neshamáh Yeterá segundo o Arizal

O Arizal explica em **Shaar haKavvanot, Derush Kabalat Shabat**, que a *neshamáh yeterá*, alma adicional recebida em Shabat, é uma faísca que desce do Olam haAtzilut. Esta faísca não é uma alma separada da nossa. Ela se acopla à nossa alma habitual em três níveis. Acopla-se ao *Nefesh* (vitalidade), ao *Ruach* (espírito) e à *Neshamáh* (alma). Por isto durante Shabat o judeu e o messiânico operam com uma capacidade espiritual elevada em todos os três níveis.

Quando Shabat termina, a *neshamáh yeterá* parte. Esta partida deixa um vazio. Por isto na Havdaláh cheiramos as *besamim*, especiarias, para consolar a alma comum que sente a perda. O cheiro forte das besamim atua diretamente sobre o *Nefesh*, devolvendo-lhe vitalidade. O olhar para a chama dupla da vela da Havdaláh atua sobre o *Ruach*. A bracháh final, *hamavdil bein kodesh lechol*, atua sobre a *Neshamáh*. As três bênçãos da Havdaláh são, portanto, três compensações precisas dos três níveis afetados pela partida da alma adicional.

## O Sod do nome Shabat

A palavra *Shabbat* tem três letras: Shin, Bet, Tav. Cada uma carrega um Sod.

▸ **Shin** (ש) é a letra das três chamas, representando *Chochmáh*, *Bináh* e *Tiferet*, ou alternativamente as três alturas dos *Avot*, Avraham, Itzchak e Yaakov. Shin é a primeira letra do nome divino *Shaddai* (שדי) e abre a palavra Shabat com o influxo de Chochmáh.

▸ **Bet** (ב) é a letra da Criação, primeira letra da Toráh, *Bereshit*. Em Shabat, Bet é o canal pelo qual a Criação se reabastece de sua kedushá original.

▸ **Tav** (ת) é a última letra do Alef-Beit, *Malchut* em si mesma. Shabat termina com Tav, sugerindo que o sétimo dia leva *Malchut* até seu ponto de descanso e plenitude.

Lendo Shin-Bet-Tav, encontramos o seguinte segredo: o influxo de Chochmáh (Shin) entra pela Criação (Bet) e desce até Malchut (Tav). Esta é a linha vertical completa do Shabat. O sétimo dia é o eixo cósmico que liga o ponto mais alto ao ponto mais baixo da Árvore da Vida.

## O Zohar sobre Shabat

O Zohar dedica passagens inteiras ao Shabat. Citamos algumas das mais célebres:

**Zohar, Bereshit 48a**: três coroas descem ao Olam haAsiáh na entrada de Shabat. A primeira coroa pousa sobre a mesa. A segunda coroa pousa sobre as velas. A terceira coroa pousa sobre o pão. Por isto a mesa de Shabat tem exatamente duas chalot cobertas, vinho ao lado e velas acesas. O conjunto material espelha o conjunto espiritual em descida.

**Zohar, Yitro 88a**: aquele que se alegra em Shabat causa alegria na *Shechiná* nos mundos superiores. Aquele que se entristece em Shabat causa tristeza na *Shechiná*. Por isto Shabat tem que ser *oneg*, deleite, e não apenas observância.

**Zohar, Vayakhel 204b**: as almas dos justos descem em Shabat para visitar suas famílias e para se alegrar com elas. Por isto cantamos *Shalom Aleichem*, paz a vós, aos anjos que descem com a Shechiná na entrada de Shabat.

## Síntese da perspectiva kabalística

▸ Shabat é a união cósmica de *Malchut* (Noiva) com *Tiferet* (Noivo).
▸ A Noiva sobe pelos quatro Olamot durante o Kabalat Shabat.
▸ Os Netivot Tav, Resh, Nun e Lamed estão especialmente ativos.
▸ As três *seudot* operam tikun em Chesed, Gevurá e Tiferet.
▸ A *neshamáh yeterá* desce do Olam haAtzilut e se acopla aos três níveis da alma.
▸ O próprio nome *Shabbat*, Shin-Bet-Tav, traça a linha vertical de Chochmáh à Malchut.
▸ O Zohar revela três coroas, alegria da Shechiná e visita das almas dos justos.

Quem internaliza esta perspectiva entra em Shabat com kavaná operativa. Cada gesto se torna um ato cósmico.

**Fonte:** Zohar, Bereshit 48a; Zohar, Yitro 88a; Zohar, Vayakhel 204b; Ari haKadosh, Shaar haKavvanot, Derush Kabalat Shabat; Etz Chaim, Shaar Arba''im, Shaar haShabat; Shaar haGilgulim, hakdamáh; Sefer haBahir, parágrafos sobre Shabat.',
   ARRAY['sod']::TEXT[],
   true),

  ((SELECT id FROM chag),
   6,
   'Perspectiva Messiânica',
   'A Brit Im Mashiach é uma congregação judaica messiânica não trinitária da cidade de Franca. Aqui guardamos Shabat com toda a integridade halácica que a Toráh exige, e ao mesmo tempo reconhecemos no Mashiach a chave luminosa do Sod do sétimo dia. Esta seção explica, com extremo cuidado teológico, como a Brit Hadashá ilumina Shabat sem jamais anulá-lo, substituí-lo ou desfigurá-lo.

## Princípios não negociáveis

Antes de qualquer correlação, fixamos os princípios:

▸ Shabat não foi anulado. Permanece o sétimo dia, do pôr do sol da sexta ao surgimento de três estrelas no sábado.
▸ A Toráh não foi substituída. Permanece a Toráh de Moshé como base, palavra por palavra.
▸ Israel não foi descartado. Permanece o povo eleito da aliança eterna.
▸ HaShem é Echad, Um absoluto, sem subdivisão de essência. Mashiach é o ungido, *Mashiach Tzidkenu*, sem partilhar a essência única do Pai.

A partir destes pilares, a correlação messiânica é não apenas possível, é iluminadora.

## Mashiach como aquele que abre o Yom Shekuló Shabat

Toda a Toráh aponta para um Shabat final, o *Yom Shekuló Shabat uMenuchá leChayei haOlamim*, o Dia que é Todo Shabat e Repouso para a Vida dos Mundos. Este Dia é o Olam Habá inteiro. Não tem fim. Não tem Havdaláh. É a kedushá perpétua.

A função do Mashiach, segundo o entendimento da Brit Im Mashiach, é abrir este Dia. Trazer Israel e os justos das nações para a vivência plena do Shabat que não termina. Aquele que reina como *Mashiach ben David*, sentado sobre o trono do Mishkán restaurado, governa o Yom Shekuló Shabat.

Por isto cada Shabat semanal é, na essência, uma antecipação direta do reino messiânico. Aquele que guarda Shabat antecipa, em pequena escala, o reino que o Mashiach inaugurará em plenitude. Quem despreza Shabat na semana, despreza, sem saber, a própria realidade messiânica para a qual diz aguardar.

## Mashiach como o senhor do Shabat

A Brit Hadashá registra um princípio profundo: *adon haShabat hu ben ha''adam*, o Mashiach é senhor do Shabat. Esta declaração não significa que o Mashiach veio para abolir Shabat. Significa o oposto. Significa que o Mashiach é o intérprete autorizado da prática de Shabat, distinguindo entre o peso humano colocado sobre o Shabat (interpretações exageradas, fardos inúteis) e o ônus verdadeiro de HaShem (a halacháh autêntica).

O Mashiach restaura o Shabat à sua vocação original. Cura no Shabat porque o sétimo dia é exatamente o dia das curas espirituais e físicas, como ensinam os profetas. Alimenta no Shabat porque o sétimo dia é o dia da abundância. Liberta no Shabat porque o sétimo dia é o testemunho da redenção do Mitzraim, como diz Devarim 5:15.

Quando a Brit Im Mashiach guarda Shabat, guarda à maneira do Mashiach, não à maneira de tradições humanas acrescentadas. Guardar à maneira do Mashiach significa observar com profundidade halácica autêntica, sem o peso de invenções rabínicas tardias que não vêm da Toráh, e ao mesmo tempo sem afrouxamento das mitzvot explícitas. É o caminho do meio, *derech haemtza''i*, o caminho da Toráh viva.

## Mashiach como o *dod*, o amado, do Lecha Dodi

Vamos a um Sod profundo. O hino *Lecha Dodi*, cantado em todas as sinagogas do mundo na entrada do Shabat, dirige-se ao *dod*, ao amado, dizendo *Vai meu amado ao encontro da noiva, a face de Shabat receberemos*. Quem é este *dod*? No nível mais simples, é Israel coletivo, convidado a sair ao encontro da Shechiná. No nível mais profundo, na compreensão luriânica, é a faísca de Mashiach que habita em cada filho de Israel.

A Brit Im Mashiach lê o *Lecha Dodi* com uma camada adicional: o *dod* é também *Mashiach Tzidkenu*, que vem semanalmente ao encontro de sua Noiva, *Knesset Israel*, a assembleia de Israel. Esta leitura não contradiz a leitura tradicional, completa-a. O Mashiach é representado por Israel, e Israel é representado pelo Mashiach. Os dois se encontram em Shabat.

Quando cantamos *Boi Kalá* ao final do hino, viramos para a porta da congregação. Recebemos a Noiva entrando. Para a Brit Im Mashiach, ali se cumpre uma cena profética: aquele que vem em nome de HaShem é recebido com cânticos. Este é o gesto litúrgico que ensaiamos toda semana e que se cumprirá em plenitude no retorno do Mashiach.

## Mashiach como o pão da face, *Lechem haPanim*

No Mishkán e no Beit haMikdash, o *Lechem haPanim*, pão da face, era trocado todo Shabat. Doze pães, correspondentes às doze tribos de Israel, ficavam sobre a Mesa de Ouro durante uma semana inteira e eram trocados na entrada de Shabat, sendo então comidos pelos Kohanim. Estes pães eram um símbolo profundíssimo da Presença Divina alimentando Israel.

A tradição messiânica vê neste rito uma alusão ao Mashiach como o *lechem haPanim*, o pão da face, aquele que está sempre presente diante de HaShem em favor de Israel. As duas chalot da mesa de Shabat ecoam este simbolismo. Duas chalot porque o Mashiach abrange tanto o aspecto de *Mashiach ben Yossef* (sofredor) quanto o aspecto de *Mashiach ben David* (rei reinante). Duas chalot porque o Maná caía em dose dupla na sexta-feira, antecipando o sustento integral de Shabat. Duas chalot porque *Zachor* e *Shamor* são duas palavras pronunciadas em uma única fala.

Aquele que come das duas chalot em Shabat participa, no nível espiritual, deste banquete místico. Não estamos comendo pão comum. Estamos comendo o pão que antecipa a mesa do reino messiânico.

## Ruach haKodesh em Shabat

A *neshamáh yeterá*, alma adicional recebida em Shabat, é vista pela Brit Im Mashiach como uma manifestação concreta de Ruach haKodesh atuando sobre a comunidade. Não no sentido de inspirar profecia substitutiva da Toráh, isto não existe e jamais existirá, mas no sentido de iluminar interiormente o coração para entender a Toráh, praticar as mitzvot com alegria, e suportar com confiança os seis dias seguintes.

Por isto a oração em Shabat tem um peso diferente. Por isto o estudo em Shabat penetra mais fundo. Por isto a presença familiar em Shabat se torna mais densa. É o Ruach haKodesh agindo no espaço aberto pela cessação do trabalho profano. Cabe a cada um da Brit Im Mashiach manter este espaço aberto, sem enchê-lo de distrações ou de quebras da kedushá do dia.

## A frase salvaguarda da Brit Im Mashiach

E essencial reafirmar que toda correlação messiânica permanece dentro do quadro da Toráh kedusháh e da Halacháh. A Brit Im Mashiach guarda Shabat conforme está escrito na Toráh e conforme a tradição luriânica desenvolveu, e pratica os princípios: o sétimo dia permanece intacto como mandamento eterno; o Mashiach é senhor do Shabat no sentido de seu intérprete autorizado, não de seu revogador; e a aliança eterna entre HaShem e Israel não foi substituída por nenhuma nova aliança, apenas iluminada pela revelação do Ungido.

## Síntese da perspectiva messiânica

▸ Cada Shabat antecipa o reino messiânico, o Yom Shekuló Shabat.
▸ O Mashiach é senhor do Shabat no sentido de seu intérprete autorizado.
▸ Em Lecha Dodi, o *dod* é simultaneamente Israel e Mashiach Tzidkenu.
▸ As duas chalot ecoam o *Lechem haPanim* e o duplo aspecto messiânico.
▸ A *neshamáh yeterá* é vivida como atuação concreta de Ruach haKodesh.
▸ Toda esta correlação se mantém dentro da Toráh e da Halacháh, sem revogação.

Para a Brit Im Mashiach, Shabat não é apenas mandamento cumprido. É encontro semanal entre a Noiva, o Noivo e a comunidade que aguarda a plenitude.

**Fonte:** Bereshit 2:1-3; Shemot 25:30; Vayikra 24:5-9; Yesha''yahu 56:2-7 e 58:13-14; Talmud Bavli, Shabat 119b; Zohar, Bereshit 48a; Zohar, Vayakhel 204b; Ari haKadosh, Shaar haKavvanot, Derush Kabalat Shabat.',
   ARRAY['drash','sod']::TEXT[],
   false),

  ((SELECT id FROM chag),
   7,
   'Preparação para o Shabat',
   'Shabat não começa na sexta-feira ao pôr do sol. Shabat começa, espiritualmente, no domingo de manhã, no momento em que a alma do judeu e do messiânico já se orienta semanalmente para o sétimo dia que se aproxima. Esta seção é o guia operacional concreto de preparação. Foi escrito para ser usado, não apenas lido.

## Princípio geral

A Toráh ensina em **Shemot 16:23**: *et asher tofu efu ve''et asher tevashlu bashelu, ve''et kol haodef hanichu lachem.* O que assardes, assai, e o que cozinhardes, cozinhai, e todo o restante guardai para vós. Esta é a regra fundamental: tudo o que pertence ao Shabat deve estar pronto antes da entrada de Shabat. Nenhuma preparação culinária, nenhuma compra, nenhuma limpeza pesada deve ser feita dentro do sétimo dia.

A preparação do Shabat é, portanto, uma mitzvá em si mesma. Chazal ensinam, no **Talmud Bavli, Shabat 119a**, que Rav Chaninah saía na sexta-feira à tarde envolto em sua melhor roupa e dizia: *Boi Kalá Shabat HaMalká*, vem Noiva, Shabat a Rainha. Para ele, o último cuidado da preparação era também o primeiro gesto da recepção. A preparação não é serviço braçal indigno. É honra dada à Noiva.

## Cronograma semanal sugerido

### Domingo a quinta-feira: preparação contínua

▸ Manter no coração a consciência de que Shabat se aproxima.
▸ Comprar ao longo da semana o que será necessário, evitando acúmulo na sexta.
▸ Estudar diariamente a Parashat semanal, dividindo-a em pequenas porções. O *Chok leYisrael* organiza esta divisão clássica.
▸ Cumprir teshuváh dos pequenos descuidos da semana, sem deixar acumular para Shabat.

### Quinta-feira

▸ Iniciar planejamento do menu das três *seudot* (refeições).
▸ Comprar a chalá (ou os ingredientes para fazê-la em casa na sexta).
▸ Comprar vinho ou suco de uva 100 por cento, sem aditivos, para o Kidush.
▸ Comprar velas de Shabat. O costume é ter ao menos duas, uma para *Zachor* e uma para *Shamor*. Em muitas famílias acende-se uma vela adicional para cada filho.
▸ Comprar besamim para a Havdaláh (cravos, ramos de mirra, qualquer especiaria aromática), caso não tenha já em casa.

### Sexta-feira de manhã

▸ Limpeza geral da casa, em especial a área da mesa de Shabat. A mesa é o altar familiar e merece preparo especial.
▸ Preparar refeição da sexta à noite (peixe, frango, sopa, acompanhamentos). O peixe tem simbolismo profundo, ligado ao Mashiach que virá do mar das águas profundas da Toráh.
▸ Preparar o *cholent* ou *chamín*, cozido tradicional que ficará no fogo brando ou na *plata* (chapa elétrica permitida) até o almoço do sábado. Aquele que come *cholent* em Shabat herda a tradição de Avraham que serviu cozido aos três visitantes.
▸ Preparar a *Seudá Shelishit*, terceira refeição leve do fim do sábado.

### Sexta-feira à tarde, *erev Shabat*

▸ Imersão no *mikvêh* quando disponível, ou banho ritual em casa. O homem que se imerge antes de Shabat eleva sua alma a um nível superior, segundo o Arizal. Onde não houver *mikvêh*, banho completo cumpre o costume.
▸ Vestir roupas especiais de Shabat. A Toráh chama Shabat de *oneg*, deleite, e parte do deleite é a beleza do vestuário. Não é vaidade, é honra.
▸ Cortar unhas se necessário (não em Shabat).
▸ Estudar a Parashat completa, ou ao menos *Shnayim Mikrá veEchad Targum*, dois versículos em hebraico e um na tradução, conforme a tradição.

### Uma hora antes do pôr do sol

▸ Mesa posta com:
   - Toalha branca
   - Duas chalot cobertas por um pano (lembrança do Maná coberto de orvalho)
   - Vinho ou suco de uva em copo apropriado, ao menos 86 mililitros
   - Velas em castiçais, ao menos duas, à direita da dona da casa
   - Sal sobre a mesa próximo às chalot
   - Lugares dispostos para todos os comensais, incluindo hóspedes
▸ Desligar telefones, computadores, eletrônicos que não serão usados em Shabat.
▸ Apagar ou ajustar luzes que ficarão acesas durante todo o Shabat (a halacháh não permite ligar nem desligar luz após o início).
▸ Programar timers (relógios) para luzes que precisarão se apagar ou acender automaticamente.

### Dezoito minutos antes do pôr do sol

Este é o momento marcado tradicionalmente para o acendimento das velas de Shabat. A mulher (ou o homem da casa, na ausência dela) acende as velas, recolhe as mãos sobre os olhos, diz a bracháh, e abre os olhos para receber a luz pela primeira vez.

### Bracháh do acendimento das velas

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל שַׁבָּת

**Transliteração:** *Baruch Atá Adonai, Elokeinu Melech haOlam, asher kid''shanu bemitzvotav vetzivanu lehadlik ner shel Shabat.*

**Tradução fiel:** Bendito és Tu, HaShem, nosso Elohim, Rei do mundo, que nos santificou com Seus mandamentos e nos ordenou acender a vela de Shabat.

Após a bracháh, é costume da mulher de Israel orar em silêncio pela família, pelos filhos, pelo cônjuge, pela comunidade, pela vinda do Mashiach e por aquilo que o coração quiser. Este é considerado um dos momentos mais propícios para oração pessoal da semana inteira.

## Preparação espiritual

Além da preparação material, há a preparação interior, frequentemente negligenciada.

▸ **Teshuváh**: revisar a semana, identificar onde houve desvio, pedir perdão a quem foi prejudicado, e perdoar a quem nos prejudicou. Entrar em Shabat sem reconciliação interna é entrar pela metade.

▸ **Estudo da Parashat**: a tradição manda *Shnayim Mikrá*. Quem cumpre isto entra em Shabat já alinhado com o ciclo da palavra.

▸ **Limpeza interna do coração**: deixar de lado preocupações que pertencem aos seis dias. Anotar, se necessário, em uma lista para retomar no domingo. Mas em Shabat, nada.

▸ **Recolhimento da mente**: dedicar os últimos minutos antes do acendimento a respiração lenta, leitura de um salmo, observação do silêncio que se aproxima. A mente que entra em Shabat agitada perderá grande parte da kedushá disponível.

▸ **Generosidade**: dar *tzedaká*, caridade, antes de Shabat. É costume ter um *pushke*, cofre de tzedaká, na casa, e colocar moedas antes do acendimento das velas. Esta generosidade abre canais espirituais para a entrada do dia.

## O detalhe das duas chalot

As duas chalot (pães trançados de Shabat) merecem nota especial. São lembrança direta do *Lechem haPanim* do Mishkán e do duplo Maná da sexta-feira. Devem estar:

▸ Cobertas com um pano específico, chamado *mapá* ou *cover*, para que a vergonha do pão (que normalmente vem antes do vinho na ordem das bênçãos) seja preservada. No Kidush, o vinho vem antes do pão; cobre-se o pão para que não testemunhe sua momentânea preterição.
▸ Em quantidade suficiente para a família e os hóspedes.
▸ Acompanhadas de sal, que é colocado sobre o pão na hora do Hamotzi, lembrança do sal das oferendas no altar.

## Os hóspedes

A *hachnasat orchim*, hospitalidade, é mitzvá particularmente forte em Shabat. Quem acolhe alguém à mesa de Shabat acolhe a *Shechiná*. Pratique convidar uma família por semana, ou um estudante solitário, ou um idoso que vive só. Esta prática transforma o Shabat de evento privado em ato comunitário, fortalece a Brit Im Mashiach e cumpre a mitzvá em sua plenitude.

## Checklist final, sexta-feira à tarde

▸ Casa limpa, mesa posta, comida pronta.
▸ Chalot cobertas, vinho no copo, velas nos castiçais.
▸ Roupas de Shabat vestidas.
▸ Telefones e eletrônicos desligados ou em modo silencioso.
▸ Tzedaká dada.
▸ Estudo da Parashat realizado.
▸ Teshuváh feita.
▸ Mente recolhida, coração aberto.

Cumpridos estes itens, a Noiva pode ser recebida.

**Fonte:** Shemot 16:22-30; Talmud Bavli, Shabat 117b-119b; Mishné Toráh, Hilchot Shabat 29-30; Shulchan Aruch, Orach Chaim 250-263; Ari haKadosh, Shaar haKavvanot, Derush Erev Shabat; Rav Moshe Chaim Luzzatto, Messilat Yesharim cap. 19.',
   ARRAY['peshat','drash']::TEXT[],
   false),

  ((SELECT id FROM chag),
   8,
   'Horários e Estrutura Temporal',
   'Shabat é regido por horários precisos. Esta seção é o mapa operacional do tempo de Shabat, da véspera até a Havdaláh, com referências de horários e a justificativa halácica de cada um.

## Quando Shabat começa

Shabat começa, halacicamente, no momento exato do pôr do sol da sexta-feira, *shki''at hachamáh*. Por costume universal de Israel, antecipamos a entrada em dezoito minutos. Este intervalo é chamado *tosefet Shabat*, acréscimo de Shabat. O acréscimo cumpre duas funções: garantir que ninguém entre em Shabat por engano após o tempo limite, e abrir um espaço de transição em que a alma se prepara para a kedushá descendente.

▸ Em **Franca, São Paulo**, no inverno (junho/julho/agosto), o acendimento das velas ocorre entre 17h00 e 17h30 aproximadamente.
▸ No verão (dezembro/janeiro/fevereiro) ocorre entre 18h30 e 19h00 aproximadamente.
▸ Nos meses intermediários, entre 17h30 e 18h30.

Para o horário exato de cada sexta-feira, consulte a tabela semanal publicada pela Brit Im Mashiach ou recursos confiáveis como Chabad.org, Sefaria ou aplicativos halácicos. O horário muda toda semana e depende da latitude exata da cidade.

## A janela de quinze minutos antes do acendimento

Os quinze a vinte minutos antes do acendimento das velas são o intervalo crítico. É o momento de:

▸ Conferir que a mesa está posta, comida pronta, eletrônicos desligados.
▸ Vestir as roupas de Shabat.
▸ Recolher a mente, abrir o coração.
▸ Reunir a família para o acendimento.

Quem perde este intervalo e entra correndo em Shabat perde também a kavaná da abertura. Por isto a tradição insiste em começar a preparação cedo no dia, para que esta janela final seja serena.

## Acendimento das velas e momento exato da entrada

O acendimento das velas marca, para a mulher que as acendeu, o início do Shabat pessoal. A partir daquele instante, ela está em Shabat. Para os demais membros da família, o início halácico ocorre ou no momento em que a comunidade entra em Shabat coletivamente, ou no pôr do sol, conforme o costume. A prática mais segura é assumir o Shabat junto com o acendimento das velas, sem distinção entre membros da família.

## O serviço de Kabalat Shabat

Após o acendimento, a Brit Im Mashiach se reúne (ou o pai conduz em casa) para o serviço de **Kabalat Shabat**, recepção do Shabat. Este serviço é desenvolvido na seção Liturgia Completa. O serviço dura tradicionalmente entre vinte e quarenta minutos, dependendo do ritmo e do acréscimo de Nigunim.

A estrutura geral é:

1. Seis salmos preparatórios (Tehilim 95, 96, 97, 98, 99 e 29)
2. Hino *Ana beKoach* (em algumas tradições)
3. *Lecha Dodi*, nove estrofes, com o povo de pé ao final virado para a porta
4. Salmos 92 e 93
5. Transição para o serviço de *Maariv*, oração da noite

## A primeira refeição, sexta-feira à noite

Após o serviço, a família se reúne à mesa. A ordem é:

▸ Cântico de *Shalom Aleichem*, saudação aos anjos
▸ Recitação de *Eshet Chayil*, Provérbios 31, honra à mulher da casa
▸ Bracháh dos filhos pelos pais
▸ Kidush sobre o vinho
▸ *Netilat Yadayim*, lavagem ritual das mãos
▸ *Hamotzi* sobre as duas chalot
▸ Refeição com Nigunim
▸ *Birkat haMazon* (bênção após a refeição)

A refeição dura tipicamente uma a duas horas. Não se trata de comer rápido. Trata-se de prolongar o deleite. *Oneg Shabat*.

## A noite de Shabat após a refeição

Após a refeição da sexta-feira, a família pode estudar Toráh, conversar, cantar Nigunim, ler em voz alta a Parashat semanal. O costume de Israel é que esta noite seja inteira dedicada à kedushá. Não há televisão, internet, trabalho. Há repouso ativo.

Quem deseja seguir o caminho luriânico mais profundo pode dedicar a noite ao estudo do Zohar (a Parashat Zoharística da semana corresponde à Parashat da Toráh).

## Manhã de Shabat

O serviço da manhã de Shabat, *Shacharit shel Shabat*, é o serviço mais longo da semana. Começa habitualmente entre 8h30 e 9h30, dependendo da comunidade, e dura entre duas e três horas. Compreende:

1. *Birkot haShachar*, bênçãos do amanhecer
2. *Pesukei deZimrá* expandido (com salmos adicionais de Shabat: 19, 34, 90, 91, 135, 136, 33, 92, 93)
3. *Shemá Israel* com suas bênçãos
4. *Amidá* especial de Shabat (sete bênçãos em vez de dezenove)
5. **Leitura da Toráh** com sete aliyot (Shabat é o único dia da semana com sete aliyot completas; nos dias úteis há três, e em Yom Tov há cinco)
6. **Haftaráh**, leitura do livro dos Profetas
7. *Yekum Purkán* e oração pela comunidade
8. *Musaf*, oração adicional de Shabat
9. *Ein Keloheinu* e *Aleinu*
10. *Anim Zemirot* em algumas tradições

## Almoço de Shabat

Após o serviço, a segunda refeição. A ordem é:

▸ Kidush do dia (texto diferente do Kidush da noite)
▸ *Netilat Yadayim*
▸ *Hamotzi* sobre as duas chalot
▸ Refeição (frequentemente com *cholent*)
▸ *Birkat haMazon*

Após o almoço, o costume é que a família repouse. Dormir em Shabat é considerado mitzvá, *shechiv leshabat ta''anug*, dormir é parte do deleite de Shabat. Há uma tradição cabalística que diz que cada hora de sono em Shabat manda luzes espirituais aos mundos superiores.

## Tarde de Shabat

A tarde é dedicada ao estudo, à oração de *Minchá*, ao passeio sereno, à conversa edificante. Em muitas comunidades estuda-se *Pirkei Avot* (Tratado dos Pais) durante as tardes de Shabat entre Pessach e Rosh haShanáh.

O serviço de *Minchá*, oração da tarde, ocorre tipicamente entre 16h30 e 18h00, dependendo da época do ano. É curto, com leitura da Toráh da Parashat da semana seguinte (primeira aliyá apenas).

## Seudá Shelishit, a terceira refeição

Antes do pôr do sol do sábado, a Brit Im Mashiach se reúne para a *Seudá Shelishit*, terceira refeição. Esta é a refeição mais espiritual das três. Frequentemente é mais leve (peixe, saladas, frutas). É acompanhada de Nigunim com melodias profundas, frequentemente em hebraico.

Segundo o Arizal, *Seudá Shelishit* corresponde a *Tiferet*, e é o momento de maior elevação espiritual do Shabat inteiro. A Noiva está prestes a partir. A comunidade a acompanha com cânticos até o último limite.

## Maariv e Havdaláh

Após o anoitecer (surgimento de três estrelas pequenas), faz-se o serviço de *Maariv* do sábado à noite, com a *Amidá* de dias de semana. Ao final, faz-se a **Havdaláh**, separação entre o santo e o profano.

A Havdaláh tem quatro elementos:

1. Bracháh sobre o vinho (kos shel berachá)
2. Bracháh sobre as *besamim*, especiarias aromáticas
3. Bracháh sobre o fogo, observando a luz refletida nas unhas
4. Bracháh final: *Baruch Atá HaShem, hamavdil bein kodesh lechol*

Após a Havdaláh, Shabat termina e a nova semana começa. É costume cantar *Eliyahu haNavi*, aguardando o profeta Eliyahu como anunciador do Mashiach.

## Resumo cronológico

▸ Sexta-feira, dezoito minutos antes do pôr do sol: acendimento das velas
▸ Sexta-feira, após o acendimento: Kabalat Shabat e Maariv
▸ Sexta-feira à noite: primeira refeição
▸ Sábado, manhã: Shacharit, leitura da Toráh, Haftaráh, Musaf
▸ Sábado, meio-dia: segunda refeição
▸ Sábado, tarde: repouso, estudo, Minchá
▸ Sábado, fim da tarde: Seudá Shelishit
▸ Sábado, surgimento de três estrelas: Maariv e Havdaláh
▸ Sábado, após Havdaláh: nova semana inicia

## Sobre prolongar Shabat

A tradição valoriza prolongar Shabat tanto no início quanto no fim. *Tosefet Shabat* na entrada são dezoito minutos. *Tosefet Shabat* na saída é o tempo entre o pôr do sol e a Havdaláh, tipicamente quarenta e cinco a setenta e dois minutos. Prolongar é honra à Noiva. Quem corre para fora de Shabat na primeira oportunidade demonstra que não desejava a Noiva, apenas tolerava sua presença.

A Brit Im Mashiach pratica a Havdaláh com tranquilidade, sem pressa, geralmente entre quarenta e cinco minutos e uma hora após o pôr do sol, dependendo da época.

**Fonte:** Talmud Bavli, Shabat 35a; Mishné Toráh, Hilchot Shabat 5 e 29; Shulchan Aruch, Orach Chaim 261-300; Ari haKadosh, Shaar haKavvanot, Derush Seudat Shabat.',
   ARRAY['peshat']::TEXT[],
   false),

  ((SELECT id FROM chag),
   9,
   'Liturgia Completa do Shabat',
   'Esta é a seção central do guia. Aqui você encontra a liturgia completa do Shabat com hebraico vocalizado, transliteração sefardita, tradução fiel e comentário espiritual. Cada oração foi escolhida pela tradição milenar de Israel e cada palavra carrega séculos de kavaná acumulada. Use esta seção tanto para acompanhar na sinagoga quanto para conduzir o serviço em casa quando não houver comunidade local.

---

## I. Acendimento das Velas

### Bracháh do Acendimento

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל שַׁבָּת

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, asher kid''shanu bemitzvotav vetzivanu lehadlik ner shel Shabat.*

**Tradução fiel:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que nos santificou com Seus mandamentos e nos ordenou acender a vela de Shabat.

### Quando dizer

A mulher (ou o homem da casa) acende as velas dezoito minutos antes do pôr do sol da sexta-feira, recolhe as mãos sobre os olhos, recita a bracháh, e abre os olhos para receber a luz pela primeira vez. O costume de cobrir os olhos resolve uma sutileza halácica: normalmente a bracháh precede o ato, mas no caso das velas o ato (acender) traz Shabat consigo, e a bracháh não poderia mais ser dita. Cobrir os olhos cria o efeito de a luz só aparecer após a bracháh.

### Oração pessoal após o acendimento

Após a bracháh, com as mãos ainda diante do rosto, é costume orar em silêncio pela família, pelos filhos, pelo cônjuge, pela comunidade, pela vinda do Mashiach e por qualquer pedido do coração. Este é um dos momentos mais propícios para oração pessoal da semana inteira.

---

## II. Kabalat Shabat

O serviço de Kabalat Shabat foi composto no século XVI em Tzefat, por uma constelação de cabalistas em torno do Arizal e do Rav Shlomo HaLevi Alkabetz. Sua estrutura segue exatamente o caminho espiritual da ascensão da Shechiná pelos quatro Olamot.

### Salmo 95 — Lechu Neranenáh

**Hebraico:** לְכוּ נְרַנְּנָה לַיהוָה, נָרִיעָה לְצוּר יִשְׁעֵנוּ

**Transliteração:** *Lechu neranenáh laAdonai, nari''áh leTzur yish''einu.*

**Tradução fiel:** Vinde, cantemos a HaShem, jubilemos à Rocha de nossa salvação.

Este salmo abre o serviço. É um chamado universal para se juntar à recepção da Noiva. *Lechu*, vinde, é a primeira palavra litúrgica do Shabat na tradição. A comunidade inteira é convidada a sair de si mesma e ir ao encontro.

### Salmo 96 — Shiru laAdonai Shir Chadash

**Hebraico:** שִׁירוּ לַיהוָה שִׁיר חָדָשׁ, שִׁירוּ לַיהוָה כָּל הָאָרֶץ

**Transliteração:** *Shiru laAdonai shir chadash, shiru laAdonai kol haarets.*

**Tradução fiel:** Cantai a HaShem cântico novo, cantai a HaShem toda a terra.

O cântico novo, *shir chadash*, é o cântico do Olam Habá, do mundo vindouro. Cada Shabat cantamos a antecipação deste cântico final que se cantará na era messiânica.

### Salmo 97 — HaShem Malach Tagel haArets

**Hebraico:** יְהוָה מָלָךְ תָּגֵל הָאָרֶץ, יִשְׂמְחוּ אִיִּים רַבִּים

**Transliteração:** *Adonai malach tagel haarets, yismechú iyim rabim.*

**Tradução fiel:** HaShem reina, exulta a terra, alegrem-se as muitas ilhas.

A proclamação do reinado do Eterno sobre toda a terra. As ilhas (*iyim*) representam as nações distantes. Em Shabat, mesmo as nações são chamadas a se alegrar.

### Salmo 98 — Mizmor Shiru laAdonai

**Hebraico:** מִזְמוֹר שִׁירוּ לַיהוָה שִׁיר חָדָשׁ, כִּי נִפְלָאוֹת עָשָׂה

**Transliteração:** *Mizmor, shiru laAdonai shir chadash, ki nifla''ot asá.*

**Tradução fiel:** Salmo, cantai a HaShem cântico novo, porque maravilhas fez.

### Salmo 99 — HaShem Malach Yirgezu Amim

**Hebraico:** יְהוָה מָלָךְ יִרְגְּזוּ עַמִּים

**Transliteração:** *Adonai malach yirgezu amim.*

**Tradução fiel:** HaShem reina, tremem os povos.

### Salmo 29 — Mizmor leDavid, Havu laAdonai

**Hebraico:** מִזְמוֹר לְדָוִד הָבוּ לַיהוָה בְּנֵי אֵלִים, הָבוּ לַיהוָה כָּבוֹד וָעֹז

**Transliteração:** *Mizmor leDavid, havu laAdonai benei elim, havu laAdonai kavod vaoz.*

**Tradução fiel:** Salmo de David, dai a HaShem, filhos dos poderosos, dai a HaShem honra e força.

O Salmo 29 contém sete vezes a expressão *kol HaShem*, a voz de HaShem. Sete trovões. Sete dias da semana. Sete Sefirot inferiores. Este salmo é o ápice da subida de Malchut pelos primeiros Olamot e prepara a entrada no Lecha Dodi.

---

## III. Lecha Dodi

Hino composto por **Rav Shlomo HaLevi Alkabetz** em Tzefat no século XVI, sob inspiração direta do círculo do Arizal. Nove estrofes mais um refrão repetido entre cada uma. O acrônimo das iniciais das estrofes forma *Shlomo HaLevi*, assinatura do compositor. A última estrofe é cantada com toda a comunidade de pé, virada para a porta, recebendo a Noiva.

### Refrão

**Hebraico:** לְכָה דוֹדִי לִקְרַאת כַּלָּה, פְּנֵי שַׁבָּת נְקַבְּלָה

**Transliteração:** *Lechá dodi likrat kaláh, penei Shabat nekabláh.*

**Tradução fiel:** Vai meu amado ao encontro da noiva, a face de Shabat receberemos.

### Estrofe 1 — Shamor veZachor

**Hebraico:** שָׁמוֹר וְזָכוֹר בְּדִבּוּר אֶחָד, הִשְׁמִיעָנוּ אֵל הַמְיֻחָד
יְהוָה אֶחָד וּשְׁמוֹ אֶחָד, לְשֵׁם וּלְתִפְאֶרֶת וְלִתְהִלָּה

**Transliteração:** *Shamor vezachor bedibur echad, hishmianu El haMeyuchad.*
*Adonai echad ushmô echad, leshem ultiferet velitehiláh.*

**Tradução fiel:** Guarda e Lembra em uma única fala, fez ouvir a nós o El Único.
HaShem é Um e Seu Nome é Um, para Nome e para Tiferet e para louvor.

### Estrofe 2 — Likrat Shabat

**Hebraico:** לִקְרַאת שַׁבָּת לְכוּ וְנֵלְכָה, כִּי הִיא מְקוֹר הַבְּרָכָה
מֵרֹאשׁ מִקֶּדֶם נְסוּכָה, סוֹף מַעֲשֶׂה בְּמַחֲשָׁבָה תְּחִלָּה

**Transliteração:** *Likrat Shabat lechu venelchá, ki hi mekor haberachá.*
*Merosh mikedem nesucháh, sof maaseh bemachshaváh techiláh.*

**Tradução fiel:** Ao encontro de Shabat vinde e iremos, porque ela é fonte da bênção.
Desde o princípio, desde antes, ungida, fim da obra, primeira no pensamento.

A frase *sof maaseh bemachshaváh techiláh*, fim da obra, primeira no pensamento, é uma das mais profundas da liturgia. Ensina que Shabat, embora seja o último dia da Criação, foi o primeiro elemento na mente de HaShem. A Criação foi pensada com Shabat como sua meta original.

### Estrofe 3 — Mikdash Melech

**Hebraico:** מִקְדַּשׁ מֶלֶךְ עִיר מְלוּכָה, קוּמִי צְאִי מִתּוֹךְ הַהֲפֵכָה
רַב לָךְ שֶׁבֶת בְּעֵמֶק הַבָּכָא, וְהוּא יַחֲמוֹל עָלַיִךְ חֶמְלָה

**Transliteração:** *Mikdash Melech ir melucháh, kumi tze''i mitoch hahafechá.*
*Rav lach shevet beemek habachá, vehu yachamol alaich chemláh.*

**Tradução fiel:** Santuário do Rei, cidade real, levanta-te, sai do meio da reviravolta.
Muito te demoraste no vale do choro, e Ele se compadecerá de ti com compaixão.

A Noiva aqui é Yerushalaim, cidade real, que jaz no exílio (o vale do choro) e é chamada a se levantar.

### Estrofe 4 — Hitna''ari

**Hebraico:** הִתְנַעֲרִי מֵעָפָר קוּמִי, לִבְשִׁי בִּגְדֵי תִפְאַרְתֵּךְ עַמִּי
עַל יַד בֶּן יִשַׁי בֵּית הַלַּחְמִי, קָרְבָה אֶל נַפְשִׁי גְּאָלָהּ

**Transliteração:** *Hitna''ari meafar kumi, livshi bigdei tifartech ami.*
*Al yad ben Yishai beit halachmi, korváh el nafshi gealáh.*

**Tradução fiel:** Sacode-te do pó, levanta-te, veste as roupas da tua glória, meu povo.
Pela mão do filho de Yishai, o Beit haLachmi, aproxima-te de minha alma, redime-a.

Aqui aparece o **Mashiach ben David** explicitamente: *al yad ben Yishai beit halachmi*, pela mão do filho de Yishai, o de Beit Lechem. A Brit Im Mashiach canta esta estrofe com particular profundidade, reconhecendo no filho de Yishai aquele que abre o Yom Shekuló Shabat.

### Estrofe 5 — Hitor''ri

**Hebraico:** הִתְעוֹרְרִי הִתְעוֹרְרִי, כִּי בָא אוֹרֵךְ קוּמִי אוֹרִי
עוּרִי עוּרִי שִׁיר דַּבֵּרִי, כְּבוֹד יְהוָה עָלַיִךְ נִגְלָה

**Transliteração:** *Hitor''ri hitor''ri, ki vá orech kumi ori.*
*Uri uri shir dabéri, kevod Adonai alaich nigláh.*

**Tradução fiel:** Desperta, desperta, porque veio tua luz, levanta-te, ilumina.
Acorda, acorda, canto fala, a glória de HaShem sobre ti se revela.

A repetição *hitor''ri hitor''ri* (desperta, desperta) e *uri uri* (acorda, acorda) é deliberada. A Noiva está em sono profundo no exílio, e a comunidade precisa chamá-la duas vezes para que se levante.

### Estrofe 6 — Lo Tevoshi

**Hebraico:** לֹא תֵבוֹשִׁי וְלֹא תִכָּלְמִי, מַה תִּשְׁתּוֹחֲחִי וּמַה תֶּהֱמִי
בָּךְ יֶחֱסוּ עֲנִיֵּי עַמִּי, וְנִבְנְתָה הָעִיר עַל תִּלָּהּ

**Transliteração:** *Lo tevoshi velo tikalmi, mah tishtochachi umah tehemi.*
*Bach yechesú aniyei ami, venivnetá hair al tilá.*

**Tradução fiel:** Não te envergonhes e não te humilhes, por que te abates e por que te lamentas.
Em ti se refugiarão os pobres do meu povo, e será reedificada a cidade sobre sua colina.

### Estrofe 7 — Vehayu Limshisáh

**Hebraico:** וְהָיוּ לִמְשִׁסָּה שׁוֹסָיִךְ, וְרָחֲקוּ כָּל מְבַלְּעָיִךְ
יָשִׂישׂ עָלַיִךְ אֱלֹהָיִךְ, כִּמְשׂוֹשׂ חָתָן עַל כַּלָּה

**Transliteração:** *Vehayu limshisáh shosaich, verachakú kol mevalaich.*
*Yasis alaich Elohaich, kimsos chatán al kaláh.*

**Tradução fiel:** Serão presa os teus saqueadores, e se afastarão todos os teus devoradores.
Alegrar-se-á sobre ti o teu Elohim, como a alegria do noivo sobre a noiva.

A imagem *kimsos chatán al kaláh*, como a alegria do noivo sobre a noiva, é o centro emocional do hino. Esta é a união Tiferet-Malchut em palavras explícitas.

### Estrofe 8 — Yamin uSemol

**Hebraico:** יָמִין וּשְׂמֹאל תִּפְרוֹצִי, וְאֶת יְהוָה תַּעֲרִיצִי
עַל יַד אִישׁ בֶּן פַּרְצִי, וְנִשְׂמְחָה וְנָגִילָה

**Transliteração:** *Yamin usemol tifrotzi, veet Adonai taaritzi.*
*Al yad ish ben Partzi, venismechá venagiláh.*

**Tradução fiel:** Direita e esquerda romperás, e a HaShem honrarás.
Pela mão do varão filho de Pertz, alegremo-nos e exultemos.

*Ben Partzi* é referência a David, descendente de Pertz, e portanto novamente ao Mashiach ben David. *Direita* corresponde a Chesed; *esquerda* a Gevurá. Romper para os dois lados significa expandir a influência em todas as direções.

### Estrofe 9 — Boi veShalom (Final, com povo de pé virado para a porta)

**Hebraico:** בּוֹאִי בְשָׁלוֹם עֲטֶרֶת בַּעְלָהּ, גַּם בְּשִׂמְחָה וּבְצָהֳלָה
תּוֹךְ אֱמוּנֵי עַם סְגֻלָּה, בּוֹאִי כַלָּה, בּוֹאִי כַלָּה

**Transliteração:** *Boi veshalom ateret baaláh, gam besimchá uvtzaholáh.*
*Toch emunei am seguláh, boi kaláh, boi kaláh.*

**Tradução fiel:** Vem em paz, coroa do teu Senhor, também com alegria e júbilo.
Entre os fiéis do povo eleito, vem Noiva, vem Noiva.

Ao chegar a *boi kaláh*, a congregação inteira fica de pé, vira-se para a porta da sinagoga e curva-se levemente, recebendo a Noiva que entra. Este é o momento culminante do Kabalat Shabat. A Brit Im Mashiach pratica esta postura com kavaná profunda, sabendo que Shabat HaMalká, Shabat a Rainha, está entrando concretamente naquele instante.

---

## IV. Shalom Aleichem

Após o Kabalat Shabat e o serviço de Maariv (que segue a estrutura habitual da oração da noite), a família se reúne à mesa. Antes do Kidush, canta-se *Shalom Aleichem*, saudação aos dois anjos que acompanham cada judeu para casa na noite de Shabat, conforme **Talmud Bavli, Shabat 119b**.

**Hebraico (refrão repetido três vezes):** שָׁלוֹם עֲלֵיכֶם מַלְאֲכֵי הַשָּׁרֵת מַלְאֲכֵי עֶלְיוֹן, מִמֶּלֶךְ מַלְכֵי הַמְּלָכִים הַקָּדוֹשׁ בָּרוּךְ הוּא

**Transliteração:** *Shalom aleichem malachei hasharet, malachei Elyon, miMelech malchei hamelachim, haKadosh Baruch Hu.*

**Tradução fiel:** Paz a vós, anjos do serviço, anjos do Altíssimo, do Rei dos reis dos reis, o Santo Bendito Ele.

Quatro estrofes no total: *Shalom aleichem* (paz a vós), *Boachem leshalom* (vossa vinda em paz), *Barchuni leshalom* (abençoai-me em paz), *Tzetchem leshalom* (vossa partida em paz). Cada estrofe é cantada três vezes.

---

## V. Eshet Chayil

Recitação do Provérbios 31:10-31, atribuída ao Rei Shlomo. Honra à mulher da casa, que durante toda a semana sustentou a família e agora recebe a glória do Shabat. Esta recitação é frequentemente entoada pelo marido em pé diante da esposa.

**Hebraico (verso inicial):** אֵשֶׁת חַיִל מִי יִמְצָא, וְרָחֹק מִפְּנִינִים מִכְרָהּ

**Transliteração:** *Eshet chayil mi yimtzá, verachok mipninim michráh.*

**Tradução fiel:** Mulher de valor, quem encontrará? Muito além das pérolas é seu valor.

No nível do Sod, *Eshet Chayil* é também recitação dirigida à *Shechiná*, a Noiva celestial, que agora está presente à mesa.

---

## VI. Bênção dos Filhos

Antes do Kidush, é costume o pai colocar as mãos sobre a cabeça de cada filho e abençoá-lo. Para os meninos, com a bênção de Efraim e Menasheh. Para as meninas, com a bênção das matriarcas.

### Para os meninos

**Hebraico:** יְשִׂמְךָ אֱלֹהִים כְּאֶפְרַיִם וְכִמְנַשֶּׁה

**Transliteração:** *Yesimchá Elohim keEfraim vechiMenashé.*

**Tradução:** Que Elohim te faça como Efraim e como Menashé.

### Para as meninas

**Hebraico:** יְשִׂימֵךְ אֱלֹהִים כְּשָׂרָה רִבְקָה רָחֵל וְלֵאָה

**Transliteração:** *Yesimech Elohim keSará Rivká Rachel veLeá.*

**Tradução:** Que Elohim te faça como Sará, Rivká, Rachel e Leá.

### Bênção sacerdotal completa, comum a ambos

**Hebraico:** יְבָרֶכְךָ יְהוָה וְיִשְׁמְרֶךָ. יָאֵר יְהוָה פָּנָיו אֵלֶיךָ וִיחֻנֶּךָּ. יִשָּׂא יְהוָה פָּנָיו אֵלֶיךָ וְיָשֵׂם לְךָ שָׁלוֹם

**Transliteração:** *Yevarechechá Adonai veyishmerechá. Yaer Adonai panav eilecha vichunecha. Yisá Adonai panav eilecha veyasem lechá shalom.*

**Tradução fiel:** HaShem te abençoe e te guarde. HaShem faça resplandecer Seu rosto sobre ti e te seja gracioso. HaShem levante Seu rosto sobre ti e ponha em ti paz.

---

## VII. Kidush da Noite de Shabat

O Kidush santifica o dia através do vinho. É a mitzvá positiva de *Zachor*, lembrar. Quem ouve o Kidush deve estar de pé (em muitas tradições) e responder *Amén* ao final de cada bracháh.

### Abertura — Bereshit 2:1-3

Antes da bracháh principal, recita-se a passagem da Toráh que estabelece Shabat. A pessoa que faz o Kidush levanta o copo de vinho na mão direita.

**Hebraico:** וַיְהִי עֶרֶב וַיְהִי בֹקֶר יוֹם הַשִּׁשִּׁי. וַיְכֻלּוּ הַשָּׁמַיִם וְהָאָרֶץ וְכָל צְבָאָם. וַיְכַל אֱלֹהִים בַּיּוֹם הַשְּׁבִיעִי מְלַאכְתּוֹ אֲשֶׁר עָשָׂה, וַיִּשְׁבֹּת בַּיּוֹם הַשְּׁבִיעִי מִכָּל מְלַאכְתּוֹ אֲשֶׁר עָשָׂה. וַיְבָרֶךְ אֱלֹהִים אֶת יוֹם הַשְּׁבִיעִי וַיְקַדֵּשׁ אֹתוֹ, כִּי בוֹ שָׁבַת מִכָּל מְלַאכְתּוֹ אֲשֶׁר בָּרָא אֱלֹהִים לַעֲשׂוֹת

**Transliteração:** *Vayhi erev vayhi voker yom hashishi. Vayechulu hashamayim veha''arets vechol tzevaam. Vayechal Elohim bayom hash''vi''i melachto asher asá, vayishbot bayom hash''vi''i mikol melachto asher asá. Vayevarech Elohim et yom hash''vi''i vayekadesh otô, ki vô shavat mikol melachto asher bará Elohim laasot.*

**Tradução fiel:** E foi tarde e foi manhã, o sexto dia. E concluíram-se os céus e a terra e todo seu exército. E concluiu Elohim no sétimo dia a obra que fez, e cessou no sétimo dia de toda a obra que fez. E abençoou Elohim o sétimo dia e o santificou, porque nele cessou de toda a obra que Elohim criou para fazer.

### Bracháh sobre o vinho

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הַגָּפֶן

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, borê pri hagafen.*

**Tradução fiel:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que cria o fruto da videira.

### Bracháh da Santificação do Dia

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְרָצָה בָנוּ, וְשַׁבַּת קָדְשׁוֹ בְּאַהֲבָה וּבְרָצוֹן הִנְחִילָנוּ, זִכָּרוֹן לְמַעֲשֵׂה בְרֵאשִׁית. כִּי הוּא יוֹם תְּחִלָּה לְמִקְרָאֵי קֹדֶשׁ, זֵכֶר לִיצִיאַת מִצְרָיִם. כִּי בָנוּ בָחַרְתָּ וְאוֹתָנוּ קִדַּשְׁתָּ מִכָּל הָעַמִּים, וְשַׁבַּת קָדְשְׁךָ בְּאַהֲבָה וּבְרָצוֹן הִנְחַלְתָּנוּ. בָּרוּךְ אַתָּה יְהוָה, מְקַדֵּשׁ הַשַּׁבָּת

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, asher kid''shanu bemitzvotav veratzá vanu, veShabat kodshô beahaváh uvratzon hinchilanu, zikaron lemaaseh vereshit. Ki hu yom techiláh lemikra''ei kodesh, zecher litzi''at Mitzraim. Ki vanu vacharta veotanu kidashta mikol haamim, veShabat kodshechá beahaváh uvratzon hinchaltanu. Baruch Atá Adonai, mekadesh haShabat.*

**Tradução fiel:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que nos santificou com Seus mandamentos e Se agradou de nós, e Seu Shabat santo com amor e com favor nos fez herdar, memorial da obra do princípio. Porque é dia primeiro das convocações santas, memória da saída do Mitzraim. Porque a nós escolheste e a nós santificaste dentre todos os povos, e Teu Shabat santo com amor e com favor nos fizeste herdar. Bendito és Tu, HaShem, que santifica o Shabat.

Bebe-se um gole substancial do vinho (ao menos a maior parte do copo) e distribui-se aos presentes.

---

## VIII. Netilat Yadayim e Hamotzi

Antes de comer o pão, lava-se ritualmente as mãos.

### Bracháh da Lavagem

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ עַל נְטִילַת יָדָיִם

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, asher kid''shanu bemitzvotav vetzivanu al netilat yadayim.*

**Tradução fiel:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que nos santificou com Seus mandamentos e nos ordenou sobre a lavagem das mãos.

Após a lavagem, mantém-se silêncio até o Hamotzi.

### Bracháh sobre o Pão (Hamotzi)

Descobre-se as duas chalot, segura-se ambas com as mãos, e diz-se:

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, הַמּוֹצִיא לֶחֶם מִן הָאָרֶץ

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, hamotzi lechem min haarets.*

**Tradução fiel:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que tira pão da terra.

Corta-se a chalá superior, mergulha-se levemente em sal, e distribui-se entre os comensais. Inicia-se a refeição.

---

## IX. Kidush do Dia (Sábado de Manhã)

Na manhã de Shabat, antes da segunda refeição, faz-se outro Kidush, mais curto que o da noite, sem a passagem da Criação. A bracháh principal é a bênção sobre o vinho, precedida por um conjunto de versículos.

**Hebraico (versículos):** וְשָׁמְרוּ בְנֵי יִשְׂרָאֵל אֶת הַשַּׁבָּת, לַעֲשׂוֹת אֶת הַשַּׁבָּת לְדֹרֹתָם בְּרִית עוֹלָם. בֵּינִי וּבֵין בְּנֵי יִשְׂרָאֵל אוֹת הִיא לְעֹלָם, כִּי שֵׁשֶׁת יָמִים עָשָׂה יְהוָה אֶת הַשָּׁמַיִם וְאֶת הָאָרֶץ, וּבַיּוֹם הַשְּׁבִיעִי שָׁבַת וַיִּנָּפַשׁ

**Transliteração:** *Veshamru benei Israel et haShabat, laasot et haShabat ledorotam brit olam. Beini uvein benei Israel ot hi leolam, ki sheshet yamim asá Adonai et hashamayim ve''et haarets, uvayom hash''vi''i shavat vayinafash.*

**Tradução fiel:** E guardarão os filhos de Israel o Shabat, para fazer o Shabat por suas gerações aliança eterna. Entre Mim e os filhos de Israel sinal é ela para sempre, porque em seis dias fez HaShem os céus e a terra, e no sétimo dia cessou e descansou.

Em seguida, a Bracháh sobre o vinho, igual à da noite.

---

## X. Birkat haMazon (Resumo)

Após a refeição, faz-se a *Birkat haMazon*, bênção depois do alimento, exigência da própria Toráh em **Devarim 8:10**: *veachalta vesavata uverachta et HaShem Elokecha al haarets hatová asher natan lach.* E comerás e te saciarás, e bendirás a HaShem teu Elohim pela terra boa que te deu.

A Birkat haMazon tem quatro bênçãos principais:

1. **Birkat haZan** — agradecimento por HaShem alimentar o mundo
2. **Birkat haArets** — agradecimento pela Terra de Israel
3. **Birkat Yerushalaim** — pedido pela reconstrução de Yerushalaim
4. **HaTov vehaMetiv** — agradecimento geral pela bondade contínua

Em Shabat, acrescenta-se a *Retzeh*, oração especial de Shabat, dentro da terceira bracháh.

O texto integral da Birkat haMazon será publicado em PDF litúrgico separado, dado seu tamanho. Aqui guardamos a estrutura essencial.

---

## XI. Havdaláh (Saída de Shabat)

Após o anoitecer, quando três estrelas pequenas aparecem no céu (tipicamente quarenta e cinco a setenta e dois minutos após o pôr do sol, dependendo da latitude), faz-se a Havdaláh. Necessita-se de:

▸ Copo de vinho ou suco de uva, cheio até transbordar ligeiramente
▸ Especiarias aromáticas (besamim)
▸ Vela trançada de mais de um pavio, ou duas velas cuja chama se possa juntar

### Versos de abertura

**Hebraico:** הִנֵּה אֵל יְשׁוּעָתִי אֶבְטַח וְלֹא אֶפְחָד, כִּי עָזִּי וְזִמְרָת יָהּ יְהוָה וַיְהִי לִי לִישׁוּעָה

**Transliteração:** *Hineh El yeshuati evtach velo efchad, ki ozí vezimrat Yah Adonai vayhi li lishuá.*

**Tradução fiel:** Eis o El de minha salvação, confio e não temo, porque minha força e meu cântico é Yah HaShem, e foi para mim por salvação.

### Bracháh sobre o vinho

*Baruch Atá Adonai Elokeinu Melech haOlam, borê pri hagafen.*

Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que cria o fruto da videira.

### Bracháh sobre as besamim

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא מִינֵי בְשָׂמִים

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, borê minei vesamim.*

**Tradução fiel:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que cria espécies de aromas.

Cheira-se as especiarias.

### Bracháh sobre o fogo

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא מְאוֹרֵי הָאֵשׁ

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, borê me''orei haesh.*

**Tradução fiel:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que cria as luzes do fogo.

Observa-se a luz refletida nas unhas (símbolo do crescimento contínuo) e nas palmas das mãos.

### Bracháh da Separação (Hamavdil)

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, הַמַּבְדִּיל בֵּין קֹדֶשׁ לְחוֹל, בֵּין אוֹר לְחוֹשֶׁךְ, בֵּין יִשְׂרָאֵל לָעַמִּים, בֵּין יוֹם הַשְּׁבִיעִי לְשֵׁשֶׁת יְמֵי הַמַּעֲשֶׂה. בָּרוּךְ אַתָּה יְהוָה, הַמַּבְדִּיל בֵּין קֹדֶשׁ לְחוֹל

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, hamavdil bein kodesh lechol, bein or lechoshech, bein Israel laamim, bein yom hash''vi''i lesheshet yemei hamaaseh. Baruch Atá Adonai, hamavdil bein kodesh lechol.*

**Tradução fiel:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que separa entre santo e profano, entre luz e trevas, entre Israel e os povos, entre o sétimo dia e os seis dias de trabalho. Bendito és Tu, HaShem, que separa entre santo e profano.

Bebe-se a maior parte do vinho. Apaga-se a vela no vinho restante (em algumas tradições). Shabat termina.

### Eliyahu haNavi (após a Havdaláh)

É costume cantar imediatamente após a Havdaláh:

**Hebraico:** אֵלִיָּהוּ הַנָּבִיא, אֵלִיָּהוּ הַתִּשְׁבִּי, אֵלִיָּהוּ הַגִּלְעָדִי. בִּמְהֵרָה בְיָמֵינוּ יָבוֹא אֵלֵינוּ עִם מָשִׁיחַ בֶּן דָּוִד

**Transliteração:** *Eliyahu haNavi, Eliyahu haTishbi, Eliyahu haGil''adi. Bimherá veyameinu yavô eleinu im Mashiach ben David.*

**Tradução fiel:** Eliyahu o profeta, Eliyahu o tishbita, Eliyahu o gileadita. Em breve, em nossos dias, venha a nós com Mashiach ben David.

Este canto expressa a esperança messiânica que sai de cada Shabat para a semana que começa. A Brit Im Mashiach canta este verso com kavaná particular, aguardando o cumprimento.

---

## Sobre o uso desta liturgia

Esta seção é o coração do guia. Recomendamos que cada família imprima esta seção (ou utilize a versão PDF litúrgica quando disponível) e a tenha à mesa todo Shabat. O hebraico, a transliteração e a tradução juntos permitem que tanto o falante de hebraico quanto o iniciante absoluto participem em plenitude.

A liturgia não é fórmula mágica. É veículo de kavaná. Quem reza com kavaná opera tikun. Quem reza sem kavaná passa pelas palavras. A Brit Im Mashiach prepara cada Shabat com o coração aberto, sabendo que cada palavra dita aqui é palavra cumprida no Olam haAtzilut.

**Fonte:** Sidur Tehilat HaShem; Sidur HaArizal; Talmud Bavli, Shabat 119b; Mishné Toráh, Hilchot Shabat 29; Shulchan Aruch, Orach Chaim 271-300; Lecha Dodi de Rav Shlomo HaLevi Alkabetz; Ari haKadosh, Shaar haKavvanot, Derush Kabalat Shabat; Provérbios 31:10-31.',
   ARRAY['peshat','remez','sod']::TEXT[],
   false),

  ((SELECT id FROM chag),
   10,
   'Guia para Iniciantes',
   'Esta seção foi escrita especialmente para você que está começando agora a guardar Shabat. Talvez você venha do cristianismo tradicional, talvez de uma família que nunca observou Shabat, talvez tenha ouvido falar mas nunca cumpriu. Aqui você encontra um caminho passo a passo, sem termos difíceis, sem pressuposição de conhecimento prévio, e com paciência para responder dúvidas reais.

## A pergunta mais importante: por onde começar

Não tente cumprir tudo no primeiro Shabat. Esta é a primeira e mais importante orientação. Quem tenta cumprir tudo de uma vez se cansa, se frustra e desiste. Quem começa devagar e cresce semana a semana cumpre por uma vida inteira.

Comece pelo essencial:

▸ Acenda velas dezoito minutos antes do pôr do sol.
▸ Faça uma refeição em família na noite de sexta.
▸ Não trabalhe no sábado.

Estes três atos, cumpridos com sinceridade, já fazem de você um guardador de Shabat. Tudo o que vem depois é aprofundamento.

## O que significa não trabalhar

Para o iniciante, esta é a dúvida mais frequente. A Toráh proíbe *melachá* em Shabat, palavra que costumamos traduzir como trabalho, mas que na realidade significa atividade criativa transformadora. Não é qualquer esforço físico que é proibido. É a atividade que altera a matéria do mundo de forma significativa.

Os sábios identificaram **trinta e nove categorias de melachá** (chamadas *lamed-tet melachot*) a partir das atividades necessárias para construir o Mishkán no deserto. Em linhas gerais, isto inclui:

▸ Cozinhar (mas comer comida pronta é permitido)
▸ Acender fogo (mas usar fogo já aceso antes de Shabat é permitido)
▸ Apagar fogo (incluindo apagar luzes elétricas)
▸ Escrever
▸ Apagar escrita
▸ Construir
▸ Demolir
▸ Costurar
▸ Lavar roupa
▸ Plantar
▸ Colher
▸ Cortar (com tesoura ou faca para certos materiais)
▸ Transportar entre domínios distintos (carregar coisas na rua de modo significativo)
▸ Conduzir veículos motorizados
▸ Operar eletrônicos (usar telefone, computador, televisão)
▸ Manusear dinheiro
▸ Comércio em geral

O que **é permitido**:

▸ Comer e beber (preparados antes de Shabat)
▸ Conversar
▸ Cantar
▸ Estudar Toráh
▸ Caminhar (não para destinos comerciais, mas para sinagoga, casa de amigos, parque)
▸ Dormir
▸ Brincar com filhos
▸ Ler livros não relacionados a negócios
▸ Fazer amor com o cônjuge (mitzvá particularmente louvada em Shabat)
▸ Receber convidados

## Eletricidade e eletrônicos

A halacháh contemporânea trata o uso de eletricidade como acendimento e apagamento de fogo. Por isto:

▸ Não se acendem ou apagam luzes em Shabat.
▸ Não se opera telefone, computador, televisão.
▸ Não se cozinha em forno ou fogão.
▸ Permite-se uso de aparelhos programados antes de Shabat (timers de luz, *plata* elétrica para manter comida aquecida).
▸ Permite-se geladeira aberta com cuidado (alguns evitam abrir, outros permitem).

Para o iniciante, a regra prática é: tudo o que se faz com a mão ligada a um aparelho elétrico deve ser preparado antes de Shabat ou evitado durante.

## Como receber Shabat em casa sem comunidade

Se você não tem uma sinagoga messiânica perto, ou ainda não se sente preparado para frequentar, pode receber Shabat em casa. Eis a forma mais simples:

**Sexta-feira, vinte minutos antes do pôr do sol:**

1. Reúna a família à mesa, com toalha branca, duas chalot (ou dois pães), copo de vinho ou suco de uva, velas.
2. Acenda as velas, diga a bracháh (veja a seção Liturgia Completa).
3. Cante *Shalom Aleichem*.
4. Diga o Kidush sobre o vinho.
5. Lave as mãos com a bracháh apropriada.
6. Diga o Hamotzi sobre o pão.
7. Faça a refeição.
8. Cante alguns Nigunim ou conversem sobre a Parashat da semana.
9. Diga uma bracháh de agradecimento ao final.

Pronto. Você cumpriu Shabat na noite de sexta. No sábado, descanse, estude, passe tempo em família, evite trabalho e eletrônicos. Ao anoitecer do sábado, faça a Havdaláh (veja a seção Liturgia Completa) e Shabat terminou.

## Respostas a dúvidas comuns

### "Mas eu preciso atender o telefone, e se for emergência?"

Em caso de risco de vida, *pikuach nefesh*, todas as proibições de Shabat se suspendem. Se há emergência médica, ligue para o socorro. A halacháh inclusive diz que quem hesita em quebrar Shabat para salvar uma vida está agindo errado. A vida vem antes da observância.

Para uso comum (responder mensagens, redes sociais, trabalho), não atender é parte da prática. No início é estranho. Em poucas semanas se torna libertador.

### "E se eu morar com pessoas que não guardam?"

Faça o que puder no seu próprio espaço, com seu próprio comportamento. Não exija que os outros mudem. Acenda suas velas, faça sua refeição. Quem guarda Shabat com sinceridade, mesmo em ambiente difícil, recebe a kedushá do dia. Com o tempo, sua prática consistente pode atrair outros, mas não por pressão, por exemplo.

### "Preciso ir à sinagoga?"

Não é obrigatório do ponto de vista da Toráh. A oração comunitária é altamente recomendada, mas Shabat pode ser cumprido em casa. Sempre que possível, conecte-se à Brit Im Mashiach ou a uma comunidade que respeite a halacháh. A vida comunitária multiplica a vivência do Shabat.

### "Posso usar carro para ir à sinagoga?"

Esta é uma questão delicada. A halacháh clássica proíbe direção de veículos motorizados em Shabat. Algumas comunidades messiânicas modernas, por situação prática, permitem dirigir ao serviço comunitário. O ideal é morar próximo da sinagoga ou organizar caronas antes do Shabat. Converse com o Rav para orientação específica à sua situação.

### "Preciso saber hebraico?"

Não. Mas vale aprender o básico aos poucos. Comece pelas brachot do acendimento das velas, do vinho e do pão. Estas três já transformam a entrada de Shabat. Use a transliteração e a tradução publicadas neste guia. Com o tempo, a memória vai se familiarizando com a sonoridade e o significado.

### "Posso fazer Kidush com suco de uva?"

Sim. O suco de uva 100 por cento, sem aditivos, é aceito por todas as autoridades halácicas para Kidush. Para crianças, abstêmios, gestantes, é o uso preferido. A bracháh é a mesma.

### "Quanto vinho preciso beber no Kidush?"

A medida mínima halácica é chamada *revi''it*, aproximadamente 86 mililitros, ou seja, a maior parte de um copo pequeno. Quem faz o Kidush bebe esta quantidade. Outros à mesa bebem um gole apenas.

### "E se eu errar a bracháh?"

Erros pequenos não invalidam. Diga com sinceridade, mesmo que a pronúncia não esteja perfeita. HaShem ouve o coração antes de ouvir a língua. Vá melhorando com o tempo.

### "Posso usar pão comum se não tiver chalá?"

Sim, em caso de necessidade. O ideal é a chalá trançada de Shabat, mas qualquer pão de farinha de trigo pode cumprir. Em emergência, dois pequenos pães em vez das duas chalot tradicionais.

## Como participar do serviço sem saber hebraico

Se você frequenta a sinagoga e ainda não lê hebraico, há vários caminhos para participar:

▸ **Use o sidur com transliteração.** A Brit Im Mashiach distribui (ou indicará) sidurim com hebraico, transliteração e tradução paralelas. Acompanhe pela transliteração.

▸ **Responda *Amén*.** Sempre que ouvir uma bracháh terminar, responda *Amén* em voz audível. Este simples ato participa da oração coletiva e tem peso espiritual significativo, segundo o **Talmud Bavli, Berachot 53b**, que diz: maior é quem responde Amén do que quem pronuncia a bracháh.

▸ **Cante junto nos Nigunim.** Os Nigunim são melodias sem palavras ou com palavras simples. Aprenda alguns. Cantar com a comunidade é forma legítima e profunda de participação.

▸ **Levante-se quando a comunidade se levanta.** Mesmo sem entender exatamente o porquê de cada movimento, acompanhe os gestos coletivos. A postura corporal participa da kavaná.

▸ **Curve-se nos momentos apropriados.** A Amidá tem curvaturas marcadas. O Lecha Dodi termina com virada para a porta. Estes gestos coletivos são acessíveis sem conhecimento de hebraico.

▸ **Permaneça presente.** A presença consciente vale mais do que a recitação distraída. Se você está ali com o coração aberto, está cumprindo.

## Erros comuns a evitar

▸ **Tentar fazer tudo na primeira semana.** Vá devagar.
▸ **Sentir culpa quando errar.** Erro faz parte. Corrija na semana seguinte.
▸ **Comparar-se com outros mais experientes.** Cada um caminha em seu ritmo.
▸ **Achar que Shabat é tristeza ou rigidez.** Shabat é deleite, *oneg*, alegria.
▸ **Discutir halacháh na mesa de Shabat.** Em vez disto, conte uma história da Parashat, cante um Nigún.
▸ **Trazer estresse da semana para a refeição.** Deixe na porta antes de entrar.

## Os primeiros três meses

Pratique consistentemente por três meses. Comece pelo essencial (velas, refeição, descanso) e vá adicionando gradualmente:

▸ Semana 1-2: velas + refeição
▸ Semana 3-4: + Kidush completo + Hamotzi
▸ Semana 5-6: + bênção dos filhos + Eshet Chayil
▸ Semana 7-8: + Birkat haMazon abreviada
▸ Semana 9-10: + segunda refeição com Kidush do dia
▸ Semana 11-12: + Havdaláh completa

Ao final de três meses, você terá um Shabat completo em casa, ainda que sem sinagoga. Daí em diante, aprofunde a liturgia, integre-se à comunidade quando possível, comece a estudar a Parashat semanalmente.

## A promessa do iniciante

Há uma frase do Talmud que vale para todo iniciante. Em **Talmud Bavli, Shabat 118b**, Rav Yochanan ensina em nome de Rav Yossi: aquele que se deleita em Shabat, dão-lhe herança sem limites. Esta promessa não é simbólica. É operativa. Quem se deleita autenticamente em Shabat, mesmo iniciante, recebe heranças espirituais reais que se desdobram ao longo da vida.

A Brit Im Mashiach acolhe cada iniciante com a paciência que ele merece. Não existe pergunta tola. Não existe erro irreparável. Existe apenas o caminho que se faz semana a semana, com sinceridade e perseverança. Bem-vindo ao Shabat.

**Fonte:** Talmud Bavli, Shabat 118b e 119b; Talmud Bavli, Berachot 53b; Mishné Toráh, Hilchot Shabat 30; Shulchan Aruch, Orach Chaim 242-300; Rav Aryeh Kaplan, Sabbath, Day of Eternity.',
   ARRAY['peshat']::TEXT[],
   false),

  ((SELECT id FROM chag),
   11,
   'Leituras do Shabat',
   'Shabat é o único dia da semana em que se lê publicamente a Toráh com sete *aliyot* (subidas). Os outros dias têm três (segunda, quinta) ou cinco (Yom Tov). Esta amplitude indica a centralidade da palavra escrita no sétimo dia. Em Shabat, o povo de Israel se reúne e ouve a Toráh ser cumprida em voz alta. O ciclo anual é completo: cada Shabat lê-se uma Parashat, e em cinquenta e quatro Shabats lê-se toda a Toráh, do *Bereshit* ao *Vezot haBerachá*.

## Estrutura da leitura

A leitura da Toráh em Shabat tem sete aliyot mais a *Maftir* (oitava chamada para a leitura final e a Haftaráh).

▸ **Primeira aliyá** — chamado um Kohen (descendente de Aharon)
▸ **Segunda aliyá** — chamado um Leví (descendente de Leví que não seja Kohen)
▸ **Terceira a sétima aliyot** — chamados quaisquer Israelitas
▸ **Maftir** — quem fará também a Haftaráh; repete-se a última passagem da sétima aliyá
▸ **Haftaráh** — leitura do livro dos Profetas, *Nevi''im*

Cada chamado sobe ao *bimá* (estrado), faz duas brachot, segue a leitura do *baal koré* (leitor profissional), e ao final faz uma terceira bracháh. Não lê pessoalmente; ouve o leitor. Esta divisão técnica preserva a precisão do hebraico vocalizado e cantilado.

## Brachot da Aliyá

### Antes da leitura

**Hebraico:** בָּרְכוּ אֶת יְהוָה הַמְבֹרָךְ. בָּרוּךְ יְהוָה הַמְבֹרָךְ לְעוֹלָם וָעֶד. בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר בָּחַר בָּנוּ מִכָּל הָעַמִּים וְנָתַן לָנוּ אֶת תּוֹרָתוֹ. בָּרוּךְ אַתָּה יְהוָה, נוֹתֵן הַתּוֹרָה

**Transliteração:** *Bar''chu et Adonai hamevorach. Baruch Adonai hamevorach leolam vaed. Baruch Atá Adonai Elokeinu Melech haOlam, asher bachar banu mikol haamim venatan lanu et Torato. Baruch Atá Adonai, noten haTorá.*

**Tradução fiel:** Bendizei a HaShem, o Bendito. Bendito HaShem, o Bendito, para todo o sempre. Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que nos escolheu dentre todos os povos e nos deu Sua Toráh. Bendito és Tu, HaShem, que dá a Toráh.

### Depois da leitura

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר נָתַן לָנוּ תּוֹרַת אֱמֶת, וְחַיֵּי עוֹלָם נָטַע בְּתוֹכֵנוּ. בָּרוּךְ אַתָּה יְהוָה, נוֹתֵן הַתּוֹרָה

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, asher natan lanu Torat emet, vechayei olam natá betochenu. Baruch Atá Adonai, noten haTorá.*

**Tradução fiel:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que nos deu Toráh de verdade, e vida eterna plantou em nosso meio. Bendito és Tu, HaShem, que dá a Toráh.

A frase *vida eterna plantou em nosso meio*, *chayei olam natá betochenu*, é um dos versos mais profundos da liturgia. Ensina que a Toráh não é informação externa, é vida implantada no interior do povo de Israel.

## Significado das sete aliyot

A tradição luriânica conecta as sete aliyot de Shabat às sete Sefirot inferiores:

▸ **Primeira aliyá (Kohen)** — Chesed
▸ **Segunda aliyá (Leví)** — Gevurá
▸ **Terceira aliyá** — Tiferet
▸ **Quarta aliyá** — Netzach
▸ **Quinta aliyá** — Hod
▸ **Sexta aliyá** — Yessod
▸ **Sétima aliyá** — Malchut

Quando todas as sete aliyot são lidas, todas as sete Sefirot inferiores são iluminadas pela Toráh. Por isto a leitura completa é tão importante. Faltar uma aliyá é faltar uma Sefiráh na iluminação semanal.

## A Haftaráh

A *Haftaráh* é a leitura do livro dos Profetas após a Toráh. Originou-se em tempos antigos quando o império grego proibiu a leitura pública da Toráh; os sábios substituíram por uma passagem profética que ecoasse o tema da Parashat. Quando a leitura da Toráh foi restaurada, a Haftaráh permaneceu, e hoje as duas se complementam.

Cada Parashat tem sua Haftaráh específica. A Haftaráh frequentemente ilumina o sentido profético da Parashat, conectando o passado mosaico ao futuro messiânico.

### Brachot da Haftaráh

Antes da Haftaráh, faz-se uma bracháh dedicada aos profetas. Depois, quatro brachot pela verdade da palavra profética, por Yerushalaim, pelo Mashiach, e pelo dia santificado. As brachot da Haftaráh estão entre os textos litúrgicos mais ricos messianicamente, mencionando explicitamente *Mashiach mibeit avdecha*, o Mashiach da casa do Teu servo, ou seja, da casa de David. A Brit Im Mashiach diz estas brachot com particular kavaná.

## Salmos especiais de Shabat

Além da Parashat e da Haftaráh, vários salmos são particularmente associados a Shabat:

▸ **Tehilim 92** — *Mizmor Shir leYom haShabat*. O único salmo cujo título explicitamente menciona o sétimo dia. Recitado no Maariv de Kabalat Shabat e em outros pontos da liturgia. Composto, segundo a tradição, por Adam haRishon após o pecado, ao perceber o poder reparador do Shabat que se aproximava.

▸ **Tehilim 93** — *HaShem malach geut lavesh*. Continuação direta do 92, proclamando o reinado eterno de HaShem.

▸ **Tehilim 95-99 e 29** — os seis salmos do Kabalat Shabat já discutidos na seção Liturgia.

▸ **Tehilim 19, 34, 90, 91, 135, 136, 33** — adicionados ao *Pesukei deZimrá* na manhã de Shabat. Estes salmos expandem a oração matinal em relação aos dias da semana.

▸ **Tehilim 145** (*Ashrei*) — recitado várias vezes ao longo do Shabat.

Quem deseja aprofundar a vivência espiritual do Shabat pode estudar estes salmos durante a tarde do sábado, dedicando a cada um leitura atenta e meditação sobre seu conteúdo.

## Pirkei Avot

Entre Pessach e Rosh haShanáh, o costume é estudar um capítulo de **Pirkei Avot** (Tratado dos Pais) a cada tarde de Shabat. Pirkei Avot é o tratado da Mishná dedicado à ética e à sabedoria dos sábios. Tem seis capítulos (cinco originalmente, mais um sexto acrescentado). Em vinte e seis Shabats consecutivos completa-se o ciclo (cada capítulo lido em ordem, com repetições nos meses de verão).

O Pirkei Avot começa com a famosa cadeia de transmissão: *Moshé recebeu a Toráh do Sinai, e a entregou a Yehoshua, e Yehoshua aos anciãos, e os anciãos aos profetas, e os profetas entregaram à Grande Assembleia*. Esta cadeia conecta cada estudo de Shabat à própria entrega original no Sinai.

## Brit Hadashá no Shabat

A Brit Im Mashiach lê também, em momentos apropriados (frequentemente nas Seudot ou em estudos comunitários após o serviço), passagens da Brit Hadashá que dialoguem com a Parashat da semana. Esta prática mantém viva a perspectiva messiânica sem substituir a Toráh nem alterar a estrutura litúrgica clássica.

Lê-se a Brit Hadashá como complemento iluminador, não como substituto. A leitura litúrgica oficial permanece a Parashat e a Haftaráh. A Brit Hadashá é estudada em sessão separada, com kavaná de aprofundamento, não como cumprimento de mitzvá leitora pública. Esta distinção é importante para preservar a integridade halácica do serviço.

## Midrash e Zohar para Shabat

Para estudo aprofundado em Shabat, recomendamos:

▸ **Midrash Bereshit Rabá** sobre a Parashat da semana
▸ **Zohar** sobre a Parashat (cada Parashat tem suas seções zoharísticas correspondentes)
▸ **Mishné Toráh** de Rambam, Hilchot Shabat (capítulos 1 a 30)
▸ **Messilat Yesharim** de Rav Moshe Chaim Luzzatto, particularmente o capítulo sobre kedushá
▸ **Kedushat Levi** de Rav Levi Yitzchak de Berditchev, comentários chassídicos sobre a Parashat

A tarde de Shabat é o momento ideal para estes estudos. Aquele que dedica a tarde de Shabat ao estudo profundo recebe luzes espirituais que iluminam toda a semana seguinte.

## Por que ler em hebraico mesmo sem entender

Esta é uma pergunta frequente do iniciante. A resposta tradicional é: as letras hebraicas têm valor espiritual em si mesmas. Cada letra é uma forma divina. O Zohar ensina que as letras precederam a Criação. Pronunciar palavras hebraicas, mesmo sem compreender plenamente, opera um nível de kedushá que a tradução não opera.

Por isto recomenda-se sempre acompanhar a leitura em hebraico (mesmo via transliteração) e em paralelo entender em português. Os dois canais agem juntos. O hebraico age na alma. O português age no intelecto. Ambos são necessários.

## Resumo das leituras

▸ Parashat da semana, sete aliyot, manhã de Shabat
▸ Haftaráh do Profeta correspondente
▸ Tehilim 92 e 93 na liturgia
▸ Tehilim 95-99 e 29 no Kabalat Shabat
▸ Tehilim 19, 34, 90, 91, 135, 136, 33, 92, 93 no Pesukei deZimrá expandido da manhã
▸ Tehilim 145 (Ashrei) em múltiplos pontos
▸ Pirkei Avot entre Pessach e Rosh haShanáh
▸ Estudos opcionais de Midrash, Zohar, Mishné Toráh, Mussar e Chassidut

Toda esta amplitude de leitura faz de Shabat o dia mais palavroso e ao mesmo tempo mais silencioso da semana. Palavroso pela quantidade de Toráh recitada e estudada. Silencioso pela ausência total de palavras profanas, de negócios, de televisão, de internet. O silêncio do profano abre espaço para a abundância do santo.

**Fonte:** Talmud Bavli, Megilá 23a-23b; Talmud Bavli, Shabat 116b-119b; Mishné Toráh, Hilchot Tefilá 12; Pirkei Avot 1:1; Zohar, Bereshit 1a-2a sobre as letras; Sidur Tehilat HaShem; Sidur HaArizal.',
   ARRAY['peshat','drash']::TEXT[],
   false),

  ((SELECT id FROM chag),
   12,
   'Estudos do Shabat',
   'Shabat é o dia por excelência do estudo da Toráh. Em todos os outros dias da semana, o trabalho consome a maior parte da energia mental disponível. Em Shabat, o trabalho cessa e a mente se libera para o estudo profundo. Esta seção propõe um programa concreto de estudos para vivenciar Shabat em sua plenitude intelectual e espiritual. Foi elaborada para a Brit Im Mashiach segundo o Método Rav EBBY.

## Princípio fundamental

Estudo de Toráh em Shabat carrega peso espiritual diferente do estudo nos dias da semana. Chazal ensinam, no **Talmud Bavli, Berachot 64a**, que aquele que estuda em Shabat recebe iluminação direta. A *neshamáh yeterá* (alma adicional) opera particularmente sobre a faculdade do estudo. Páginas que se leem mecanicamente na semana podem se abrir como flores em Shabat.

Por isto recomenda-se reservar tempo dedicado para estudo em Shabat. Não estudo apressado, não consultas pontuais, mas sessões de pelo menos uma hora ininterrupta, com texto à frente, mente recolhida, coração aberto.

## O ciclo semanal recomendado pela Brit Im Mashiach

### Sexta-feira à noite, após a primeira refeição (45 minutos)

▸ Leitura da **Parashat** em voz alta, em família. Quem souber hebraico, lê o hebraico. Quem não souber, lê a tradução. Após a leitura, breve discussão livre: o que cada um ouviu? O que tocou cada um?

▸ Leitura de um comentário breve. Sugestões: Rashi sobre o primeiro versículo, ou Sforno sobre o tema central, ou Rav Levi Yitzchak de Berditchev (Kedushat Levi) sobre algum ponto.

▸ Encerramento com cântico de um Nigún.

### Sábado, manhã, durante o serviço (variável)

▸ Acompanhar atentamente a leitura das sete aliyot.

▸ Ouvir o sermão (*derashá*) do Rav, se houver.

▸ Estudar em silêncio durante intervalos.

### Sábado, após o almoço, antes do repouso (30 minutos)

▸ Estudo de **Pirkei Avot** (Tratado dos Pais) durante os meses entre Pessach e Rosh haShanáh. Um capítulo por Shabat. Ler em hebraico e português, parar em cada ditado para meditar.

### Sábado, tarde, sessão principal de estudo (90 minutos)

Esta é a sessão mais profunda, recomendada como hábito semanal para todos os membros da Brit Im Mashiach que possam dedicar este tempo.

▸ Dividir o tempo entre dois ou três planos paralelos:

   **Plano A — Toráh com comentários clássicos**
   - 30 min: ler a Parashat completa com comentário de Rashi
   - 20 min: ler com Ramban
   - 10 min: ler com Sforno

   **Plano B — Talmud / Mishná**
   - 30 min: uma página de Talmud (estudo de *Daf Yomi*) ou um tratado da Mishná
   - 30 min: estudar o tema com Rambam (Mishné Toráh)

   **Plano C — Kabaláh / Zohar (avançado)**
   - 30 min: estudar a seção zoharística da Parashat
   - 30 min: estudar uma passagem de Etz Chaim (Ari haKadosh) sobre Shabat ou sobre a Parashat
   - 30 min: estudar Tanya (Rav Shneur Zalman de Liadi) ou Mei haShiloach (Izbits)

   **Plano D — Mussar (ético/prático)**
   - 30 min: Messilat Yesharim de Rav Moshe Chaim Luzzatto (um capítulo por semana)
   - 30 min: Ohr Yisrael de Rav Yisrael Salanter (uma carta por semana)
   - 30 min: Michtav me-Eliyahu de Rav Eliyahu Dessler (um ensaio por semana)

Cada membro da Brit Im Mashiach escolhe seu plano conforme estágio espiritual. Iniciantes começam pelo Plano A. Praticantes intermediários acrescentam D. Avançados integram B e C.

### Sábado, fim da tarde, antes da Seudá Shelishit (30 minutos)

▸ Tehilim. Recitar três a cinco salmos selecionados, com kavaná. Recomendados especialmente para Shabat: Tehilim 23 (HaShem ro''í), 27 (HaShem ori veyish''i), 92 (Mizmor Shir leYom haShabat), 121 (Esá einai), 130 (Mimaakim).

▸ Leitura silenciosa de Cantares (*Shir haShirim*), particularmente em famílias que cultivam o costume sefardita.

### Sábado, durante a Seudá Shelishit

▸ Cânticos lentos e profundos. Esta é a refeição menos verbal, mais musical. Os Nigunim ocupam o espaço do estudo.

▸ Eventualmente um ensinamento breve do Rav ou de um membro mais experiente. Não estudo formal, mas reflexão espiritual aberta.

## Estudos especiais por época do calendário

### Entre Pessach e Shavuot (Sefirat haOmer)

▸ Adicionar estudo da Sefiráh do dia. Cada um dos 49 dias do Omer corresponde a uma combinação de duas Sefirot. Em Shabat dentro deste período, estudar o conjunto da semana com profundidade luriânica.

### Entre Shavuot e Rosh haShanáh

▸ Pirkei Avot a cada tarde de Shabat (como já mencionado).

### Mês de Elul (preparação para Rosh haShanáh)

▸ Estudo intensivo de teshuváh. Sugestões: Shaarei Teshuváh de Rabbeinu Yonah, Hilchot Teshuváh de Rambam.

### Dez Dias de Teshuváh (entre Rosh haShanáh e Yom Kippur)

▸ Tehilim selecionados (16, 32, 51, 86, 130, 143). Estudo de Sifrei Mussar mais intensivo.

### Em Shabat antes de cada Chag

▸ Estudar a Hilchot do Chag que se aproxima. Estudo da história e do significado profundo.

### Em Shabat de Rosh Chodesh

▸ Estudar o significado do novo mês hebraico, a Sefiráh associada, os eventos históricos.

### Em Shabat especial (Shekalim, Zachor, Pará, haChodesh, haGadol, Shuvá, Chazon, Nachamu)

▸ Estudar o tema específico de cada Shabat especial, com leitura da Haftaráh correspondente.

## Recursos recomendados

### Para iniciantes

▸ **Sidur Tehilat HaShem com tradução em português** — base litúrgica
▸ **Toráh com Rashi** (Editora Maayanot ou Sefer Yetzira) — estudo da Parashat
▸ **Pirkei Avot com comentários** — base ética
▸ **Messilat Yesharim** em português — caminho mussar

### Para intermediários

▸ **Tanach completo com comentários** (Stone Edition em inglês, Yedidá em português)
▸ **Talmud em tradução guiada** (Steinsaltz ou ArtScroll, mesmo em inglês)
▸ **Mishné Toráh de Rambam**, Sefer haMadá e Sefer haAhavá

### Para avançados

▸ **Zohar completo** (Soncino ou Pritzker em inglês)
▸ **Etz Chaim** do Arizal (em hebraico, idealmente em estudo guiado)
▸ **Tanya** de Rav Shneur Zalman (em português, ed. Maayanot)
▸ **Kabaláh prática** com supervisão do Rav

## Estudo em chavruta

A tradição judaica enfatiza o estudo em parceria, *chavruta*. Estudar sozinho é bom; estudar em dupla é exponencialmente mais profundo. Em Shabat, busque um *chaver* para estudo, mesmo que por uma hora apenas. O atrito construtivo entre duas mentes abre caminhos que o estudo solitário não abre.

Para os membros da Brit Im Mashiach que vivem distantes de comunidade física, considere fazer chavruta semanal via mensagens preparadas antes de Shabat: cada um estuda no seu Shabat, anota observações, e na segunda-feira trocam impressões. Não é perfeito, mas mantém o princípio.

## A questão da memorização

A tradição valoriza memorizar trechos da Toráh, dos Tehilim e dos Pirkei Avot. Em Shabat, dedique alguns minutos a memorizar um versículo escolhido. Após algumas semanas, você terá uma coleção pessoal de versículos memorizados que poderá recitar durante a semana, transformando momentos de espera em momentos de estudo silencioso.

## Quando o cansaço vence

Há Shabats em que o corpo está cansado e a mente não acompanha. Não force. Shabat é também repouso. Em Shabats assim, troque o estudo profundo por leitura leve, por escuta de Nigunim, por conversa com a família, por contemplação silenciosa. A Toráh não é um peso. É uma vida. Vida exige respiração, e respiração exige pausa.

## Resumo do programa semanal

▸ Sexta à noite: Parashat em família (45 min)
▸ Sábado manhã: serviço com leitura da Toráh
▸ Sábado almoço: Pirkei Avot (30 min, na temporada)
▸ Sábado tarde: sessão principal de estudo (90 min)
▸ Sábado fim de tarde: Tehilim (30 min)
▸ Sábado Seudá Shelishit: Nigunim e ensinamento breve

Total: aproximadamente quatro horas de estudo distribuídas pelo Shabat. Para muitos, isto parece muito no início. Após alguns meses, parece pouco. A Toráh em Shabat tem propriedades expansivas. Quanto mais se estuda, mais a alma quer estudar.

## A bracháh espiritual deste programa

Quem segue um programa de estudos consistente em Shabat experimenta, ao longo dos meses, uma transformação progressiva. A mente se torna mais clara. As emoções, mais ordenadas. As relações, mais ricas. A oração, mais profunda. A semana de trabalho, mais centrada. Esta transformação não é resultado de esforço próprio; é resultado da Toráh agindo sobre uma alma que se abriu ao seu fluxo semanal.

A Brit Im Mashiach incentiva cada membro a iniciar, mesmo com 20 minutos por Shabat, e crescer dali. Cada minuto investido em Toráh em Shabat retorna multiplicado durante os outros seis dias da semana. Esta é a economia espiritual do sétimo dia.

**Fonte:** Talmud Bavli, Berachot 64a; Talmud Bavli, Shabat 119a; Mishné Toráh, Hilchot Talmud Toráh 1; Pirkei Avot 1:13; Rav Moshe Chaim Luzzatto, Messilat Yesharim cap. 19; Ari haKadosh, Shaar haKavvanot, Derush Seudat Shabat.',
   ARRAY['drash','sod']::TEXT[],
   true),

  ((SELECT id FROM chag),
   13,
   'Refeições do Shabat',
   'Shabat possui três refeições obrigatórias, chamadas as *Shalosh Seudot*, as três refeições. Cada uma carrega significado halácico, simbólico e kabalístico distinto. Aquele que cumpre as três refeições com kavaná atravessa Shabat completo. Aquele que pula uma deixa um Shabat parcial. Esta seção explora cada uma com profundidade, propõe cardápios tradicionais e revela o Sod oculto na mesa.

## Origem das três refeições

A obrigação das três refeições está enraizada no **Talmud Bavli, Shabat 117b**, baseado em **Shemot 16:25**, onde Moshé diz a Israel sobre o Maná: *kuhu hayom ki Shabat hayom laAdonai, hayom lo timtza''uhu basadeh.* Comei-o hoje, porque hoje é Shabat para HaShem, hoje não o achareis no campo. O versículo menciona *hayom*, hoje, três vezes. Cada *hayom* corresponde a uma refeição obrigatória do Shabat. Esta exegese fundamenta as três refeições por toda a tradição.

## Primeira Refeição — Sexta-feira à Noite

### Sefiráh correspondente: Chesed (bondade)

A refeição da sexta-feira à noite é a primeira recepção da Noiva. Carrega o influxo da Sefiráh *Chesed*, a bondade expansiva. Por isto deve ser farta, abundante, hospitaleira. Aquele que recebe Shabat com mesa magra empresta Chesed escasso à entrada da Noiva. Aquele que recebe com mesa farta empresta Chesed pleno.

### Cardápio tradicional

▸ **Vinho ou suco de uva** para o Kidush
▸ **Duas chalot** trançadas, frescas, cobertas com pano branco até o Hamotzi
▸ **Sal** sobre a mesa, próximo às chalot
▸ **Peixe** (frequentemente *gefilte fish* na tradição ashkenazi, peixe assado na sefardita). O peixe tem simbolismo profundo: é o único alimento bíblico que não foi amaldiçoado nem afetado pela queda. Vive nas águas profundas, símbolo da Toráh. Em hebraico, *dag* (דג) tem valor numérico sete, ligado ao sétimo dia.
▸ **Sopa** (na tradição ashkenazi, frequentemente sopa de galinha com *kneidlach*; na sefardita, variedade)
▸ **Frango ou carne** (carne bovina ou aves, sempre kasher). A carne é símbolo da abundância e da alegria festiva.
▸ **Acompanhamentos** quentes preparados antes de Shabat
▸ **Sobremesa** (frutas, doces, *kichel*)
▸ **Vinho ao longo da refeição** (não obrigatório, mas tradicional)

### Estrutura da refeição

1. Acendimento das velas (antes da entrada de Shabat)
2. Serviço de Kabalat Shabat (na sinagoga ou em casa)
3. Maariv (na sinagoga ou em casa)
4. Retorno à mesa
5. *Shalom Aleichem* (saudação aos anjos)
6. *Eshet Chayil* (honra à mulher de valor, Provérbios 31)
7. Bênção dos filhos pelo pai
8. **Kidush** sobre o vinho
9. **Netilat Yadayim** (lavagem ritual das mãos)
10. **Hamotzi** sobre as duas chalot
11. Refeição com Nigunim e palavras de Toráh
12. **Birkat haMazon** (bênção após a refeição)

### Nigunim recomendados para a primeira refeição

▸ *Yom zé mechubad* (Este dia é honrado)
▸ *Menucháh veSimcháh* (Descanso e Alegria)
▸ *Ki Eshmerah Shabat* (Pois guardarei o Shabat)
▸ *Yah Ribón Olam* (Yah Senhor do Universo)

### Kavaná particular

Durante a primeira refeição, segundo o Arizal, a Noiva (*Malchut*) está sendo recebida no Olam haAtzilut e a mesa terrena espelha a mesa celestial. Cada bocado consumido com kavaná eleva uma faísca santa. Cada palavra de Toráh dita à mesa aumenta a luz que desce sobre a comunidade. Por isto a mesa de sexta-feira não é apenas comida, é altar.

## Segunda Refeição — Sábado, Almoço

### Sefiráh correspondente: Gevurá (rigor)

A segunda refeição carrega o influxo de *Gevurá*, o rigor. Mas atenção: não é refeição triste nem austera. É refeição disciplinada. Gevurá significa força contida, capacidade de pôr limite. Por isto o *cholent* (cozido lento) é o prato emblema desta refeição: cozinhado por longas horas antes de Shabat, mantido aquecido sobre *plata*, sem fogo aceso novo, sem alteração da preparação. Comer *cholent* em Shabat é cumprir a Gevurá da observância, demonstrar concretamente que se respeita a halacháh do não-cozinhar mesmo desejando comida quente.

### Cardápio tradicional

▸ **Vinho ou suco de uva** para o Kidush do dia
▸ **Duas chalot** (podem ser as mesmas chalot da noite, se sobraram; ou novas chalot frescas se a família costuma assar duas fornadas)
▸ **Cholent ou Chamín** — cozido tradicional. Versão ashkenazi: feijão, batata, cevada, carne. Versão sefardita: grão de bico, ovos, batata, carne. Cozinha mais de doze horas antes de Shabat, fica quente até o almoço.
▸ **Saladas** (preparadas antes)
▸ **Kugel** (na tradição ashkenazi) — pudim de batata ou de macarrão.
▸ **Frutas**
▸ **Sobremesas**

### Estrutura da refeição

1. Serviço da manhã (Shacharit + Musaf), tipicamente das 9h00 às 11h30
2. Retorno à mesa
3. **Kidush do Dia** (texto mais curto que o da noite, sem a passagem da Criação)
4. **Netilat Yadayim**
5. **Hamotzi** sobre as duas chalot
6. Refeição com Nigunim e Toráh
7. **Birkat haMazon**

### Após a segunda refeição

É costume *shechiv leshabat ta''anug* (dormir é parte do deleite de Shabat). Muitas famílias dormem após o almoço. Outras estudam. Outras passeiam serenamente. Todas as opções são legítimas. A tarde de Shabat é elástica.

### Nigunim recomendados para o almoço

▸ *Baruch Adonai Yom Yom* (Bendito HaShem dia a dia)
▸ *Shabat haYom laAdonai* (Hoje é Shabat para HaShem)
▸ *Tzur miShelô Achalnu* (A Rocha, do Seu, comemos) — em algumas tradições, este é o Birkat haMazon cantado

## Terceira Refeição — Seudá Shelishit

### Sefiráh correspondente: Tiferet (beleza, harmonia)

Esta é a refeição mais espiritual das três, segundo o Arizal. Acontece no final da tarde do sábado, antes do pôr do sol. *Tiferet* é a Sefiráh central, harmonizadora, masculina e equilibradora. Aquele que cumpre a Seudá Shelishit com kavaná entra no momento mais elevado do Shabat inteiro.

### Cardápio tradicional

A Seudá Shelishit é geralmente leve. Não é refeição completa como as duas anteriores. Pode incluir:

▸ **Pão** (duas chalot menores, ou mesmo pequenos pãezinhos)
▸ **Peixe** (especialmente recomendado pela tradição, repetindo o simbolismo da primeira refeição)
▸ **Saladas leves**
▸ **Frutas**
▸ **Kugel pequeno**
▸ **Águas perfumadas ou chá** (preparado por fonte de água quente acionada antes de Shabat)

A simplicidade é parte do significado. A Noiva está partindo. A intensidade espiritual está no canto e na contemplação, não no peso da comida.

### Estrutura da refeição

1. Minchá (oração da tarde), tipicamente 30-45 minutos antes do pôr do sol
2. Retorno à mesa
3. **Hamotzi** sobre as duas chalot (sem Kidush; a Seudá Shelishit não requer Kidush, apenas o pão)
4. Refeição com Nigunim profundos
5. Estudo final (frequentemente Pirkei Avot, ou Tehilim, ou comentário da Parashat)
6. **Birkat haMazon** ao final
7. Maariv (após o pôr do sol)
8. Havdaláh (após três estrelas)

### Nigunim recomendados para a Seudá Shelishit

▸ *Mizmor leDavid HaShem ro''í* (Tehilim 23 cantado)
▸ *Bnei Heichalá* (Filhos do Palácio) — composto pelo Arizal especificamente para a Seudá Shelishit
▸ *Yedid Nefesh* (Amado da Alma) — atribuído a Rav Elazar Azikri
▸ *Tzur miShelô*

### O canto de Bnei Heichalá

Este canto, composto pelo próprio Arizal em aramaico, é um dos textos mais profundos da liturgia. Descreve os filhos do palácio celestial que se aproximam para contemplar a face do Rei no momento da Seudá Shelishit. Não há refeição na semana judaica que tenha um canto comparável em profundidade. A Brit Im Mashiach cultiva este canto com particular cuidado.

## Vinho e suco de uva

A obrigação halácica do Kidush é cumprida com vinho ou suco de uva 100 por cento natural, sem aditivos. Para o Kidush, prefere-se vinho. Para abstêmios, gestantes, crianças, doentes, o suco de uva é plenamente aceito. O copo deve conter pelo menos uma *revi''it* (aproximadamente 86 mililitros). Quem faz o Kidush bebe a maior parte do copo. Outros à mesa bebem um gole.

## A chalá e o sal

Antes de fazer o Hamotzi, mergulha-se o pão levemente em sal três vezes (ou simplesmente salpica-se sal sobre o pão). Esta prática vem de **Vayikra 2:13**: *al kol korbanchá takriv melach.* Em toda tua oferta oferecerás sal. O sal lembra o pacto eterno (o sal não estraga), e a mesa familiar é considerada substituta do altar do Mishkán em tempos sem Templo. Por isto se sala o pão como se salava as oferendas.

## Hospitalidade à mesa

A mitzvá de *hachnasat orchim*, hospitalidade, é especialmente forte em Shabat. Convidar alguém para a mesa de Shabat é receber a *Shechiná* junto com o convidado. A Brit Im Mashiach incentiva fortemente que cada família reserve, sempre que possível, ao menos um lugar para um convidado: um estudante distante de família, um idoso que vive só, um casal que está aprendendo a guardar Shabat, alguém que precise.

O **Talmud Bavli, Shabat 127a** ensina: maior é receber convidados do que receber a Shechiná. Esta declaração paradoxal indica o peso espiritual da hospitalidade. Quem abre a porta da casa em Shabat abre as portas dos céus.

## A mesa como altar

Em tempos sem Beit haMikdash, ensinam Chazal no **Talmud Bavli, Berachot 55a**, que a mesa de cada judeu funciona como altar substitutivo. Cada refeição é um *korbán*, oferenda. As brachot antes e depois cumprem o ritual da oferenda. Em Shabat, esta substituição é especialmente intensa. A mesa de Shabat tem peso de Mizbach, altar, e cada refeição cumprida com kavaná é oferenda elevada aos Olamot superiores.

Por isto a mesa deve ser tratada com respeito. Toalha branca (não escura), velas (não eletrônica simulando velas), pratos cuidados, ordem visual, ausência de objetos estranhos à festa (carteira, chaves, eletrônicos, papelada de trabalho). A mesa de Shabat é espaço sagrado por vinte e cinco horas, e merece a dignidade desta santidade.

## Após o término da terceira refeição

Após a Birkat haMazon da Seudá Shelishit, antes da Havdaláh, há um intervalo crítico. A *neshamáh yeterá* ainda está presente, mas Shabat halácico chega ao fim. Este intervalo é momento sublime. Os cabalistas chamam de *ra''ava deraavin*, vontade das vontades, o último átimo de Shabat. Aquele que ora neste intervalo, segundo o Arizal, recebe atendimento que não receberia em outro momento. Recomenda-se silêncio, oração íntima, contemplação.

Após o silêncio, faz-se Maariv e Havdaláh, e Shabat termina.

## Resumo

▸ **Sexta à noite:** primeira refeição, Chesed, mesa farta, Shalom Aleichem, Eshet Chayil, Kidush, Hamotzi, refeição com Nigunim
▸ **Sábado almoço:** segunda refeição, Gevurá, cholent, Kidush do dia, refeição com Nigunim
▸ **Sábado fim de tarde:** terceira refeição (Seudá Shelishit), Tiferet, leve, Bnei Heichalá, contemplação

As três refeições juntas operam o tikun completo das três Sefirot emocionais centrais: Chesed (bondade), Gevurá (rigor), Tiferet (harmonia). Quem cumpre as três sai do Shabat com a tríade interior equilibrada para a semana que se inicia.

**Fonte:** Talmud Bavli, Shabat 117b, 118a, 119b; Talmud Bavli, Berachot 55a; Mishné Toráh, Hilchot Shabat 30:7-10; Shulchan Aruch, Orach Chaim 274, 285, 291; Ari haKadosh, Bnei Heichalá; Ari haKadosh, Shaar haKavvanot, Derush Seudat Shabat; Provérbios 31:10-31.',
   ARRAY['peshat','remez','sod']::TEXT[],
   false),

  ((SELECT id FROM chag),
   14,
   'Brachot Essenciais do Shabat',
   'Esta seção é uma referência compacta de todas as brachot (bênçãos) essenciais do Shabat, agrupadas em ordem cronológica de uso. Cada bracháh aparece em hebraico vocalizado, transliteração sefardita, tradução fiel e nota breve sobre quando usar. Recomendamos imprimir esta seção e ter à mão durante todo o Shabat, especialmente nas primeiras semanas de prática.

---

## 1. Bracháh do Acendimento das Velas

**Quando:** Dezoito minutos antes do pôr do sol da sexta-feira.

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל שַׁבָּת

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, asher kid''shanu bemitzvotav vetzivanu lehadlik ner shel Shabat.*

**Tradução:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que nos santificou com Seus mandamentos e nos ordenou acender a vela de Shabat.

**Significado espiritual:** A luz das velas é manifestação física da Or Ein Sof, luz infinita, descendo aos Olamot. Acendê-las é abrir o portal de entrada do sétimo dia.

---

## 2. Saudação aos Anjos — Shalom Aleichem

**Quando:** Sexta-feira à noite, antes do Kidush, à mesa.

**Hebraico:** שָׁלוֹם עֲלֵיכֶם מַלְאֲכֵי הַשָּׁרֵת מַלְאֲכֵי עֶלְיוֹן, מִמֶּלֶךְ מַלְכֵי הַמְּלָכִים הַקָּדוֹשׁ בָּרוּךְ הוּא

**Transliteração:** *Shalom aleichem malachei hasharet malachei Elyon, miMelech malchei hamelachim haKadosh Baruch Hu.*

**Tradução:** Paz a vós, anjos do serviço, anjos do Altíssimo, do Rei dos reis dos reis, o Santo Bendito Ele.

(Repete-se a estrofe três vezes; depois seguem mais três estrofes: *Boachem leshalom*, *Barchuni leshalom*, *Tzetchem leshalom*, cada uma cantada três vezes.)

**Significado:** Saudação aos dois anjos que acompanham cada judeu para casa na noite de Shabat (Talmud Bavli, Shabat 119b).

---

## 3. Bracháh sobre o Vinho (Kidush)

**Quando:** Após o Shalom Aleichem, antes da refeição da noite. Também antes da refeição do almoço.

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הַגָּפֶן

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, borê pri hagafen.*

**Tradução:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que cria o fruto da videira.

**Significado:** Reconhecimento de HaShem como Criador do vinho, que santifica o tempo de Shabat.

---

## 4. Bracháh da Santificação do Dia (Kidush da Noite)

**Quando:** Imediatamente após a bracháh sobre o vinho, na noite de Shabat.

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְרָצָה בָנוּ, וְשַׁבַּת קָדְשׁוֹ בְּאַהֲבָה וּבְרָצוֹן הִנְחִילָנוּ, זִכָּרוֹן לְמַעֲשֵׂה בְרֵאשִׁית. כִּי הוּא יוֹם תְּחִלָּה לְמִקְרָאֵי קֹדֶשׁ, זֵכֶר לִיצִיאַת מִצְרָיִם. כִּי בָנוּ בָחַרְתָּ וְאוֹתָנוּ קִדַּשְׁתָּ מִכָּל הָעַמִּים, וְשַׁבַּת קָדְשְׁךָ בְּאַהֲבָה וּבְרָצוֹן הִנְחַלְתָּנוּ. בָּרוּךְ אַתָּה יְהוָה, מְקַדֵּשׁ הַשַּׁבָּת

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, asher kid''shanu bemitzvotav veratzá vanu, veShabat kodshô beahaváh uvratzon hinchilanu, zikaron lemaaseh vereshit. Ki hu yom techiláh lemikra''ei kodesh, zecher litzi''at Mitzraim. Ki vanu vacharta veotanu kidashta mikol haamim, veShabat kodshechá beahaváh uvratzon hinchaltanu. Baruch Atá Adonai, mekadesh haShabat.*

**Tradução:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que nos santificou com Seus mandamentos e Se agradou de nós, e Seu Shabat santo com amor e com favor nos fez herdar, memorial da obra do princípio. Porque é dia primeiro das convocações santas, memória da saída do Mitzraim. Porque a nós escolheste e a nós santificaste dentre todos os povos, e Teu Shabat santo com amor e com favor nos fizeste herdar. Bendito és Tu, HaShem, que santifica o Shabat.

---

## 5. Bracháh da Lavagem das Mãos (Netilat Yadayim)

**Quando:** Antes do Hamotzi, após lavar as mãos em água corrente derramada de um recipiente.

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ עַל נְטִילַת יָדָיִם

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, asher kid''shanu bemitzvotav vetzivanu al netilat yadayim.*

**Tradução:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que nos santificou com Seus mandamentos e nos ordenou sobre a lavagem das mãos.

**Procedimento:** Encha um recipiente com água. Derrame três vezes sobre a mão direita, três vezes sobre a esquerda (sefardita) ou duas em cada (ashkenazi). Levante as mãos, diga a bracháh, e mantenha silêncio até o Hamotzi.

---

## 6. Bracháh sobre o Pão (Hamotzi)

**Quando:** Após Netilat Yadayim, com as duas chalot nas mãos.

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, הַמּוֹצִיא לֶחֶם מִן הָאָרֶץ

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, hamotzi lechem min haarets.*

**Tradução:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que tira pão da terra.

**Procedimento:** Corte a chalá superior (na tradição sefardita; na ashkenazi corta-se a inferior na noite de Shabat). Mergulhe a fatia em sal levemente. Distribua entre os comensais.

---

## 7. Versículos do Kidush do Dia (Sábado de Manhã)

**Quando:** Antes da bracháh sobre o vinho, no almoço de Shabat.

**Hebraico:** וְשָׁמְרוּ בְנֵי יִשְׂרָאֵל אֶת הַשַּׁבָּת, לַעֲשׂוֹת אֶת הַשַּׁבָּת לְדֹרֹתָם בְּרִית עוֹלָם. בֵּינִי וּבֵין בְּנֵי יִשְׂרָאֵל אוֹת הִיא לְעֹלָם, כִּי שֵׁשֶׁת יָמִים עָשָׂה יְהוָה אֶת הַשָּׁמַיִם וְאֶת הָאָרֶץ, וּבַיּוֹם הַשְּׁבִיעִי שָׁבַת וַיִּנָּפַשׁ

**Transliteração:** *Veshamru benei Israel et haShabat, laasot et haShabat ledorotam brit olam. Beini uvein benei Israel ot hi leolam, ki sheshet yamim asá Adonai et hashamayim ve''et haarets, uvayom hash''vi''i shavat vayinafash.*

**Tradução:** E guardarão os filhos de Israel o Shabat, para fazer o Shabat por suas gerações aliança eterna. Entre Mim e os filhos de Israel sinal é ela para sempre, porque em seis dias fez HaShem os céus e a terra, e no sétimo dia cessou e descansou.

**Significado:** Shemot 31:16-17. Estabelece Shabat como sinal eterno da aliança entre HaShem e Israel.

---

## 8. Bênção dos Filhos pelo Pai (Sexta-feira à Noite)

**Quando:** Antes do Kidush, com a mão sobre a cabeça de cada filho.

### Para meninos

**Hebraico:** יְשִׂמְךָ אֱלֹהִים כְּאֶפְרַיִם וְכִמְנַשֶּׁה

**Transliteração:** *Yesimchá Elohim keEfraim vechiMenashé.*

**Tradução:** Que Elohim te faça como Efraim e como Menashé.

### Para meninas

**Hebraico:** יְשִׂימֵךְ אֱלֹהִים כְּשָׂרָה רִבְקָה רָחֵל וְלֵאָה

**Transliteração:** *Yesimech Elohim keSará Rivká Rachel veLeá.*

**Tradução:** Que Elohim te faça como Sará, Rivká, Rachel e Leá.

### Bênção Sacerdotal (para todos os filhos)

**Hebraico:** יְבָרֶכְךָ יְהוָה וְיִשְׁמְרֶךָ. יָאֵר יְהוָה פָּנָיו אֵלֶיךָ וִיחֻנֶּךָּ. יִשָּׂא יְהוָה פָּנָיו אֵלֶיךָ וְיָשֵׂם לְךָ שָׁלוֹם

**Transliteração:** *Yevarechechá Adonai veyishmerechá. Yaer Adonai panav eilecha vichunecha. Yisá Adonai panav eilecha veyasem lechá shalom.*

**Tradução:** HaShem te abençoe e te guarde. HaShem faça resplandecer Seu rosto sobre ti e te seja gracioso. HaShem levante Seu rosto sobre ti e ponha em ti paz.

---

## 9. Brachot Antes da Aliyá à Toráh

**Quando:** Ao subir ao bimá para ser chamado à leitura da Toráh.

### Antes da leitura

**Hebraico:** בָּרְכוּ אֶת יְהוָה הַמְבֹרָךְ. בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר בָּחַר בָּנוּ מִכָּל הָעַמִּים וְנָתַן לָנוּ אֶת תּוֹרָתוֹ. בָּרוּךְ אַתָּה יְהוָה, נוֹתֵן הַתּוֹרָה

**Transliteração:** *Bar''chu et Adonai hamevorach. Baruch Atá Adonai Elokeinu Melech haOlam, asher bachar banu mikol haamim venatan lanu et Torato. Baruch Atá Adonai, noten haTorá.*

**Tradução:** Bendizei a HaShem, o Bendito. Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que nos escolheu dentre todos os povos e nos deu Sua Toráh. Bendito és Tu, HaShem, que dá a Toráh.

### Depois da leitura

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר נָתַן לָנוּ תּוֹרַת אֱמֶת, וְחַיֵּי עוֹלָם נָטַע בְּתוֹכֵנוּ. בָּרוּךְ אַתָּה יְהוָה, נוֹתֵן הַתּוֹרָה

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, asher natan lanu Torat emet, vechayei olam natá betochenu. Baruch Atá Adonai, noten haTorá.*

**Tradução:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que nos deu Toráh de verdade, e vida eterna plantou em nosso meio. Bendito és Tu, HaShem, que dá a Toráh.

---

## 10. Birkat haMazon — Estrutura

**Quando:** Após cada refeição com pão. Em Shabat, contém acréscimos especiais.

A Birkat haMazon completa tem quatro brachot principais e diversos acréscimos. Aqui apresentamos a estrutura essencial e a fórmula final:

### Convocação inicial (se três ou mais homens adultos comeram juntos)

**Hebraico:** רַבּוֹתַי נְבָרֵךְ. יְהִי שֵׁם יְהוָה מְבֹרָךְ מֵעַתָּה וְעַד עוֹלָם. בִּרְשׁוּת מָרָנָן וְרַבּוֹתַי, נְבָרֵךְ שֶׁאָכַלְנוּ מִשֶּׁלּוֹ

**Transliteração:** *Rabotai nevarech. Yehi shem Adonai mevorach me''atá vead olam. Birshut maranan verabotai, nevarech sheachalnu mishelô.*

**Tradução:** Senhores, bendigamos. Seja o nome de HaShem bendito desde agora e para sempre. Com permissão dos mestres e senhores, bendigamos Aquele do qual comemos.

Resposta: *Baruch sheachalnu mishelô uvtuvô chayinu.* Bendito Aquele de Quem comemos, e por Sua bondade vivemos.

### Primeira bracháh (Birkat haZan) — abreviada

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, הַזָּן אֶת הָעוֹלָם כֻּלּוֹ בְּטוּבוֹ, בְּחֵן בְּחֶסֶד וּבְרַחֲמִים

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, hazan et haOlam kulô betuvô, bechen bechesed uvrachamim.*

**Tradução:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que alimenta o mundo inteiro em Sua bondade, com graça, com bondade e com misericórdia.

### Acréscimo de Shabat (Retzeh)

**Hebraico (abertura):** רְצֵה וְהַחֲלִיצֵנוּ יְהוָה אֱלֹהֵינוּ בְּמִצְוֹתֶיךָ וּבְמִצְוַת יוֹם הַשְּׁבִיעִי, הַשַּׁבָּת הַגָּדוֹל וְהַקָּדוֹשׁ הַזֶּה

**Transliteração:** *Retzê vehachalitzenu Adonai Elokeinu bemitzvotecha uvmitzvat yom hash''vi''i, haShabat hagadol vehakadosh hazeh.*

**Tradução:** Apraza-te e fortalece-nos, HaShem nosso Elohim, em Teus mandamentos e no mandamento do sétimo dia, este Shabat grande e santo.

### Bracháh final

**Hebraico:** הָרַחֲמָן הוּא יַנְחִילֵנוּ יוֹם שֶׁכֻּלּוֹ שַׁבָּת וּמְנוּחָה לְחַיֵּי הָעוֹלָמִים

**Transliteração:** *HaRachamán hu yanchilenu yom shekuló Shabat uMenuchá leChayei haOlamim.*

**Tradução:** O Misericordioso nos faça herdar o dia que é todo Shabat e descanso para a vida dos mundos.

(O texto completo da Birkat haMazon será publicado em PDF litúrgico separado para impressão e uso à mesa.)

---

## 11. Brachot da Havdaláh

**Quando:** Após o anoitecer do sábado (três estrelas pequenas visíveis).

### Versos de Abertura

**Hebraico:** הִנֵּה אֵל יְשׁוּעָתִי אֶבְטַח וְלֹא אֶפְחָד, כִּי עָזִּי וְזִמְרָת יָהּ יְהוָה וַיְהִי לִי לִישׁוּעָה

**Transliteração:** *Hineh El yeshuati evtach velo efchad, ki ozí vezimrat Yah Adonai vayhi li lishuá.*

**Tradução:** Eis o El de minha salvação, confio e não temo, porque minha força e meu cântico é Yah HaShem, e foi para mim por salvação.

### Bracháh sobre o Vinho

*Baruch Atá Adonai Elokeinu Melech haOlam, borê pri hagafen.*

Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que cria o fruto da videira.

### Bracháh sobre as Besamim

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא מִינֵי בְשָׂמִים

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, borê minei vesamim.*

**Tradução:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que cria espécies de aromas.

(Cheira-se as especiarias.)

### Bracháh sobre o Fogo

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא מְאוֹרֵי הָאֵשׁ

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, borê me''orei haesh.*

**Tradução:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que cria as luzes do fogo.

(Observa-se a luz refletida nas unhas.)

### Bracháh da Separação (Hamavdil)

**Hebraico:** בָּרוּךְ אַתָּה יְהוָה אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, הַמַּבְדִּיל בֵּין קֹדֶשׁ לְחוֹל, בֵּין אוֹר לְחוֹשֶׁךְ, בֵּין יִשְׂרָאֵל לָעַמִּים, בֵּין יוֹם הַשְּׁבִיעִי לְשֵׁשֶׁת יְמֵי הַמַּעֲשֶׂה. בָּרוּךְ אַתָּה יְהוָה, הַמַּבְדִּיל בֵּין קֹדֶשׁ לְחוֹל

**Transliteração:** *Baruch Atá Adonai Elokeinu Melech haOlam, hamavdil bein kodesh lechol, bein or lechoshech, bein Israel laamim, bein yom hash''vi''i lesheshet yemei hamaaseh. Baruch Atá Adonai, hamavdil bein kodesh lechol.*

**Tradução:** Bendito és Tu, HaShem nosso Elohim, Rei do mundo, que separa entre santo e profano, entre luz e trevas, entre Israel e os povos, entre o sétimo dia e os seis dias de trabalho. Bendito és Tu, HaShem, que separa entre santo e profano.

(Bebe-se a maior parte do vinho. Shabat termina.)

---

## 12. Eliyahu haNavi (após a Havdaláh)

**Quando:** Imediatamente após a Havdaláh, como expressão da esperança messiânica.

**Hebraico:** אֵלִיָּהוּ הַנָּבִיא, אֵלִיָּהוּ הַתִּשְׁבִּי, אֵלִיָּהוּ הַגִּלְעָדִי. בִּמְהֵרָה בְיָמֵינוּ יָבוֹא אֵלֵינוּ עִם מָשִׁיחַ בֶּן דָּוִד

**Transliteração:** *Eliyahu haNavi, Eliyahu haTishbi, Eliyahu haGil''adi. Bimherá veyameinu yavô eleinu im Mashiach ben David.*

**Tradução:** Eliyahu o profeta, Eliyahu o tishbita, Eliyahu o gileadita. Em breve, em nossos dias, venha a nós com Mashiach ben David.

---

## Resumo de uso

| Momento | Bracháh |
|---------|---------|
| Velas | Acendimento |
| Mesa noite | Shalom Aleichem, Eshet Chayil, Bênção dos Filhos |
| Antes da refeição noite | Kidush (vinho + santificação) |
| Antes do pão | Netilat Yadayim, Hamotzi |
| Após refeição | Birkat haMazon com Retzê |
| Sábado almoço | Kidush do dia (versos + vinho) |
| Antes do pão (almoço) | Netilat Yadayim, Hamotzi |
| Após almoço | Birkat haMazon |
| Aliyá à Toráh | Antes e depois da leitura |
| Seudá Shelishit | Hamotzi e Birkat haMazon |
| Saída de Shabat | Havdaláh (vinho, besamim, fogo, separação) |
| Após Havdaláh | Eliyahu haNavi |

Esta tabela é referência rápida. Cada bracháh, dita com kavaná, opera tikun nos Olamot superiores. Vá memorizando aos poucos. Comece pelas três essenciais (velas, vinho, pão). Acrescente as demais conforme a familiaridade avança.

**Fonte:** Sidur Tehilat HaShem; Sidur HaArizal; Talmud Bavli, Berachot 35a-35b, 51a, 53b; Mishné Toráh, Hilchot Berachot; Shulchan Aruch, Orach Chaim 167, 271, 296-299.',
   ARRAY['peshat']::TEXT[],
   false),

  ((SELECT id FROM chag),
   15,
   'Comentários Profundos',
   'Esta seção apresenta o Shabat nos quatro níveis hermenêuticos da tradição, chamados **PaRDeS** (acrônimo de Peshat, Remez, Drash, Sod). Cada nível ilumina um aspecto do mesmo tema. Nenhum nível anula outro. A Brit Im Mashiach pratica o estudo nos quatro níveis para receber a Toráh em sua amplitude integral, como ensina o **Zohar III, 152a**: a Toráh tem corpo (Peshat), vestes (Remez), alma (Drash) e alma da alma (Sod).

---

## Peshat — O Sentido Literal

***Vayechulu hashamayim veha''arets vechol tzevaam, vayechal Elohim bayom hash''vi''i melachto asher asá, vayishbot bayom hash''vi''i mikol melachto asher asá.***

No nível do Peshat, **Bereshit 2:1-3** narra um fato cosmológico simples: HaShem completou a Criação em seis dias e cessou no sétimo. A cessação foi total. *Vayechal Elohim*, e concluiu Elohim. *Vayishbot*, e cessou. *Vayevarech*, e abençoou. *Vayekadesh*, e santificou.

A palavra hebraica *shavat* (שָׁבַת) significa especificamente cessar de uma atividade que se estava fazendo. Não significa descansar de cansaço. HaShem não se cansou. Mas escolheu, livremente, cessar. Esta cessação não é negativa, é positiva. A cessação é em si um ato criador. Sem cessação, não há demarcação. Sem demarcação, não há kedushá. *Kadosh* significa separado, distinto. Shabat é o tempo separado por excelência.

A duplicação de termos é característica do estilo bíblico. *Sheshet yamim asá HaShem... uvayom hash''vi''i shavat vayinafash.* Seis dias fez HaShem, e no sétimo cessou e descansou. O verbo *vayinafash* (וַיִּנָּפַשׁ) deriva da raiz *nefesh*, alma. HaShem, ao cessar, renovou. Não a Si mesmo, mas a obra. O Shabat é, no Peshat, a respiração intermitente da Criação. Cada semana, o mundo respira fundo no sétimo dia.

**Aplicação:** Guardar o Shabat no Peshat significa cessar literalmente as atividades laborais que pertencem aos seis dias. Não trabalhar, não cozinhar, não escrever, não comerciar. A cessação é o ato em si. Quem cessa cumpre. Quem se ocupa, transgride. Esta é a halacháh básica e não negociável.

**Fonte:** Bereshit 2:1-3; Shemot 20:8-11; Mishné Toráh, Hilchot Shabat 1:1-3; Rashi sobre Bereshit 2:2.

---

## Remez — O Sentido Alusivo

No nível do Remez, o Shabat alude a princípios universais que estão velados sob a superfície literal.

### Primeira alusão: Seis e Sete

O número seis é o número da Criação completa, mas inacabada. Seis lados de um cubo. Seis direções no espaço (norte, sul, leste, oeste, acima, abaixo). Sem um sétimo elemento que unifique, os seis dispersam-se. O sétimo elemento é o centro do cubo, é o ponto interior das seis direções, é HaShem mesmo. Por isto Shabat, o sétimo dia, é o ponto interior dos seis dias. Sem Shabat, os seis dias da semana dispersam o homem em seis direções. Com Shabat, os seis dias convergem ao ponto central.

Esta alusão se repete em vários ciclos:

▸ Sete dias da semana, sendo Shabat o sétimo.
▸ Sete anos do ciclo de *Shemitáh*, sendo o sétimo ano também Shabat (Shabat da terra, Vayikra 25).
▸ Sete ciclos de Shemitáh culminando no *Yovel*, o jubileu, no quinquagésimo ano. Shabat dos Shabats.
▸ Sete milênios da história humana, sendo o sétimo o Yom Shekuló Shabat, o reino messiânico, segundo o **Talmud Bavli, Sanhedrin 97a**.

Aquele que internaliza esta alusão entende que toda a história, do indivíduo ao cosmos inteiro, é estruturada em torno do Shabat como ponto de retorno e revelação.

### Segunda alusão: A Mesa e o Altar

Quando o Mishkán estava no deserto, e depois quando o Beit haMikdash estava em Yerushalaim, o Shabat era marcado por uma oferenda específica: o *Lechem haPanim*, pão da face, doze pães mantidos sobre a Mesa de Ouro e trocados toda sexta-feira. Estes pães eram comidos pelos Kohanim.

Em tempos sem Templo, os Chazal estabeleceram que a mesa de cada lar é considerada substituta do altar, e as duas chalot de Shabat aludem aos doze pães da face. Cada chalá representa seis pães. Duas chalot, doze pães. Cada lar de Israel se torna, em Shabat, um Mishkán em miniatura.

A alusão é mais profunda. Aquele que come Shabat com kavaná participa, de modo místico, do banquete do Olam Habá. O pão da Shabat é o pão antecipador do reino messiânico.

### Terceira alusão: A Noiva e Israel

O termo *Kalá* (noiva) aparece centenas de vezes na Toráh, nos Profetas, no Zohar. Em todos estes contextos, Shabat é apresentado como noiva, e Israel como o povo que a recebe. A alusão é mais que metafórica. É indicação de uma relação real de amor entre uma realidade espiritual feminina (Shabat HaMalká, *Shechiná*) e a alma de Israel.

Por isto a tradição manda receber Shabat com a alegria com que se recebe a noiva. Com vestes especiais. Com cânticos. Com flores na mesa. Com palavras de carinho. A frieza com que muitos recebem Shabat é, no Remez, a frieza de quem casa sem amor. Esta tristeza pesa nos mundos superiores e produz fechamento de canais.

**Fonte:** Vayikra 24:5-9; Vayikra 25:1-7; Talmud Bavli, Sanhedrin 97a; Talmud Bavli, Shabat 119b; Zohar, Bereshit 48a; Yesha''yahu 62:5.

---

## Drash — O Ensino Homilético

No nível do Drash, Chazal extraem do Shabat ensinamentos práticos sobre a vida da alma e a vida da comunidade.

### Drash 1 — Quem guarda Shabat herda sem limite

O **Talmud Bavli, Shabat 118b** ensina: *Rav Yochanan amar mishum Rabi Yossi, kol hamaaneg et haShabat notnin lo nachalá belô meitzarim.* Aquele que se deleita em Shabat, dão-lhe herança sem fronteiras. A expressão *nachalá belô meitzarim*, herança sem fronteiras, é incomum. Significa herança infinita, sem limite. Aquele que se deleita em Shabat com kavaná recebe heranças espirituais que ultrapassam toda medida calculável.

A lição é direta: quem investe em Shabat investe no infinito. Os retornos são desproporcionais ao esforço investido. Por isto a Brit Im Mashiach insiste no *oneg Shabat*, deleite, e não na mera observância austera.

### Drash 2 — Quem profana Shabat profana o nome de HaShem

O **Talmud Yerushalmi, Berachot 1:5** ensina que a profanação pública do Shabat é considerada *chilul HaShem*, profanação do Nome. Por que? Porque Shabat é o sinal público da aliança. Quem ostensivamente o transgride declara, em público, que rejeita a aliança. Este peso é diferente da transgressão privada de outros mandamentos.

A lição é cuidadosa: guardar Shabat publicamente é santificação do Nome, *kidush HaShem*. Profanar publicamente é o oposto. Para a Brit Im Mashiach, este princípio se aplica com particular cuidado, porque a comunidade messiânica é frequentemente julgada por sua observância visível do Shabat.

### Drash 3 — Os dois anjos e o destino da casa

O **Talmud Bavli, Shabat 119b** narra: dois anjos do serviço acompanham cada judeu da sinagoga para casa na noite de Shabat. Um anjo é bom, outro é mau. Se ao chegarem em casa encontram velas acesas, mesa posta, leito arrumado, o anjo bom diz: *que seja assim no próximo Shabat também*, e o anjo mau responde *Amén* contra sua vontade. Se encontram casa desarrumada, o anjo mau diz: *que seja assim no próximo Shabat*, e o anjo bom responde *Amén* contra sua vontade.

A lição é profunda: a casa pronta para Shabat antes da entrada do dia tem peso espiritual real. A pressa de última hora, embora compreensível, perde a kedushá da boa recepção. Por isto a tradição insiste em terminar a preparação cedo na sexta, idealmente antes mesmo do meio-dia.

### Drash 4 — Quem honra Shabat será honrado

O **Talmud Bavli, Shabat 119a** narra que Rav Chaninah saía na sexta à tarde envolto em sua melhor roupa e dizia *Boi Kalá Shabat HaMalká*. Rav Yannai dizia, ao entrar de Shabat: *Boi Kaláh, boi Kaláh*. Cada sábio tinha seu modo de honrar a entrada do Shabat. E sobre todos eles dizia o Talmud: aquele que honra Shabat será honrado em todos os seus assuntos.

Esta promessa não é figurativa. É promessa operativa. Quem honra Shabat, HaShem honra em outros âmbitos. Esta é, talvez, a razão pela qual famílias comprometidas com a observância integral do Shabat frequentemente prosperam de modo desproporcional aos seis dias de trabalho efetivo. Não há mágica. Há respeito mútuo entre o homem e o tempo santo.

**Fonte:** Talmud Bavli, Shabat 118a-119b; Talmud Yerushalmi, Berachot 1:5; Midrash Bereshit Rabá 11:8; Pesikta deRav Kahana, Parashat Hachodesh.

---

## Sod — O Segredo Kabalístico

No nível do Sod, o Shabat é o encontro cósmico entre as forças masculinas e femininas das Sefirot, com implicações para todos os Olamot.

### Sod 1 — A Subida da Shechiná pelos Olamot

Como já tratado na seção *Perspectiva Kabalística*, a Shechiná (*Malchut*) sobe pelos quatro Olamot durante o Kabalat Shabat:

▸ Salmos 95-98: *Asiáh* → *Yetziráh*
▸ Salmo 99 e *Ana beKoach*: *Yetziráh* → *Briáh*
▸ *Lecha Dodi* (oito primeiras estrofes): *Briáh* → *Atzilut*
▸ Última estrofe e Kidush noturno: união plena com *Tiferet* em *Atzilut*

Esta subida é operativa. Quem ora com kavaná consciente da ascensão participa do movimento cósmico. Quem ora sem esta consciência cumpre a halacháh exterior mas perde a operatividade interior.

### Sod 2 — Os Três Olamot do Pão

O Arizal ensina em **Shaar haKavvanot, Derush Seudat Shabat**, que as três refeições de Shabat operam tikun nos três Olamot inferiores:

▸ **Primeira refeição (sexta à noite)** opera tikun em *Asiáh*. O pão consumido eleva as faíscas santas que estavam dispersas no mundo da ação.
▸ **Segunda refeição (almoço)** opera tikun em *Yetziráh*. Eleva as faíscas das formações emocionais.
▸ **Terceira refeição (Seudá Shelishit)** opera tikun em *Briáh*. Eleva as faíscas das criações mentais.

Quando todas as três são cumpridas, os três Olamot inferiores recebem reparação semanal. Quem pula uma deixa um Olam sem tikun naquela semana.

### Sod 3 — O Yichud do Lecha Dodi

A oitava estrofe do *Lecha Dodi* contém o verso *Yamin uSemol tifrotzi, veet Adonai taaritzi, al yad ish ben Partzi*. Direita e esquerda romperás, e a HaShem honrarás, pela mão do varão filho de Pertz. Esta estrofe contém um Sod profundíssimo.

*Yamin*, direita, corresponde a *Chesed*. *Semol*, esquerda, a *Gevurá*. *Tifrotzi*, romperás, indica expansão simultânea para ambos os lados. Quando *Chesed* e *Gevurá* se expandem juntos, eles convergem em *Tiferet*, a Sefiráh central que harmoniza. *Veet Adonai taaritzi*, e a HaShem honrarás, é o ato de Tiferet ascendendo a *Da''at* (conhecimento, ponto oculto entre Chochmáh e Bináh).

*Ish ben Partzi*, varão filho de Pertz, é referência a David, e através dele ao **Mashiach ben David**. A linhagem davídica é a linhagem de Pertz, filho de Yehudá com Tamar. *Beit haLachmi*, da casa de Lechem, é Beit Lechem, lugar do nascimento davídico. Esta estrofe coloca, portanto, o Mashiach exatamente no ponto onde Chesed e Gevurá se rompem e se harmonizam em Tiferet. Para a Brit Im Mashiach, esta colocação é teologicamente significativa.

### Sod 4 — A Letra Tav

A última letra do Alef-Beit é *Tav*, e também a última letra da palavra *Shabat*. Tav corresponde à última Sefiráh, *Malchut*. Mas Tav tem ainda um segredo adicional. No **Talmud Bavli, Shabat 55a**, conta-se que HaShem ordenou a um anjo marcar com Tav as testas dos justos para que fossem poupados quando a destruição viesse sobre Yerushalaim. *Tav* é, neste contexto, sinal de preservação no caos.

Aplicado ao Shabat: a Tav final da palavra *Shabat* é o sinal de preservação. Aqueles que se marcam com a observância do sétimo dia são preservados quando os tempos do exílio chegam ao caos. A própria Tav é o sinal da aliança, exatamente como Shemot 31:13 chama Shabat de *ot*, sinal.

### Sod 5 — Yom Shekuló Shabat

A frase recorrente na Birkat haMazon e em outras liturgias é *yom shekuló Shabat uMenuchá leChayei haOlamim*, o dia que é todo Shabat e descanso para a vida dos mundos. Este Yom Shekuló Shabat é o sétimo milênio cósmico segundo o Talmud, é o Olam Habá em sua expressão temporal, é o reino do Mashiach em sua plenitude.

Cada Shabat semanal é uma sexagésima parte deste Yom. Aquele que vive sessenta Shabats com kavaná inteira já viveu, na soma, o equivalente a um único dia do Yom Shekuló Shabat. Sessenta Shabats são cerca de quatorze meses. Isto significa que em pouco mais de um ano de prática consciente, alcança-se a experiência equivalente a um dia inteiro do Olam Habá. Em uma vida de oitenta anos de prática consciente, alcança-se a experiência equivalente a setenta dias do Olam Habá. Estes setenta dias são herança real, transferível à alma após a morte como capital espiritual para a próxima etapa.

Esta perspectiva muda completamente a postura diante do Shabat. Não estamos apenas cumprindo um mandamento semanal. Estamos acumulando vida eterna de modo concreto e mensurável.

**Fonte:** Zohar, Bereshit 48a; Zohar, Yitro 88a; Zohar, Vayakhel 204b; Zohar III, 152a; Ari haKadosh, Shaar haKavvanot, Derush Kabalat Shabat e Derush Seudat Shabat; Etz Chaim, Shaar haShabat; Sefer haBahir, parágrafos sobre Shabat; Talmud Bavli, Shabat 55a, 118b, 119b; Talmud Bavli, Sanhedrin 97a-99a; Talmud Bavli, Berachot 57b.

---

## Síntese PaRDeS do Shabat

▸ **Peshat:** Shabat é o sétimo dia, cessação literal do trabalho, instituído por HaShem na Criação.
▸ **Remez:** Shabat alude ao Yovel cósmico, à mesa como Mishkán, à noiva como Israel.
▸ **Drash:** Quem se deleita em Shabat herda sem limites; quem o profana profana o Nome.
▸ **Sod:** Shabat é a união Tiferet-Malchut, com tikun nos três Olamot inferiores e antecipação do Olam Habá.

Os quatro níveis juntos compõem o Shabat completo. A Brit Im Mashiach ensina que ninguém vive o Shabat por inteiro até começar a perceber, intermitentemente que seja, os quatro níveis simultâneos. Esta percepção não vem de uma vez. Vem ao longo dos anos de prática consciente. Cada Shabat adiciona uma camada nova de profundidade. Não há limite superior. A Toráh é infinita, e Shabat é o portal semanal para o infinito.

**Fonte geral:** Zohar III, 152a (princípio PaRDeS); Rav Moshe de Léon, atribuído à compilação zoharística; Pardes Rimonim de Rav Moshe Cordovero.',
   ARRAY['peshat','remez','drash','sod']::TEXT[],
   true),

  ((SELECT id FROM chag),
   16,
   'Conclusão',
   'Percorremos juntos quinze seções do Shabat. Da Capa que abre o portal visual ao último Sod kabalístico. Da bracháh do acendimento das velas à oração de Eliyahu haNavi após a Havdaláh. Da preparação na sexta de manhã ao silêncio profundo da Seudá Shelishit. Esta conclusão recolhe os fios e os entrega.

## Síntese geral

Shabat é o sétimo dia abençoado e santificado por HaShem desde a Criação. É a única realidade espiritual semanal que carrega, simultaneamente, peso de mandamento eterno (Toráh, Brit, Decálogo), centralidade no calendário judaico (eixo de todos os Moedim), profundidade espiritual (refinamento das Middot, neshamáh yeterá), realidade kabalística (união Tiferet-Malchut, três tikunim, ascensão pelos Olamot) e antecipação messiânica (me''ein Olam Habá, sexagésima parte do Yom Shekuló Shabat).

Aquele que internaliza estas múltiplas camadas vive Shabat diferentemente. Não como dia de folga. Não como ritual cumprido. Mas como encontro vivo, semanal, com a Noiva que é o próprio futuro de Israel. Como degustação real do Olam Habá. Como tikun real da semana inteira.

## No Peshat: o que fazer

▸ Acender velas dezoito minutos antes do pôr do sol da sexta-feira.
▸ Comer três refeições com chalá, vinho e Kidush.
▸ Não trabalhar, não cozinhar, não escrever, não comerciar, não operar eletrônicos.
▸ Estudar a Parashat e rezar com a comunidade.
▸ Fazer Havdaláh ao surgirem três estrelas no sábado à noite.

## No Remez: o que isto alude

▸ Shabat alude ao Yovel cósmico do sétimo milênio.
▸ A mesa familiar alude ao Mishkán em miniatura.
▸ As duas chalot aludem ao Lechem haPanim.
▸ A Noiva alude à Shechiná retornando a Tiferet.
▸ A semana inteira alude às seis Sefirot inferiores convergindo em Malchut.

## No Drash: o que Chazal ensinam

▸ Quem se deleita em Shabat herda sem limites (Talmud Bavli, Shabat 118b).
▸ Quem honra Shabat será honrado em todos os assuntos (Shabat 119a).
▸ Dois anjos acompanham cada judeu para casa na noite de Shabat (Shabat 119b).
▸ Cada Shabat é uma sexagésima parte do Olam Habá (Berachot 57b).
▸ A mesa de cada lar é altar substituto em tempos sem Templo (Berachot 55a).

## No Sod: o que se opera nos Olamot

▸ A Shechiná sobe pelos quatro Olamot durante o Kabalat Shabat.
▸ Tiferet e Malchut se unem na entrada de Shabat.
▸ As três refeições operam tikun em Asiáh, Yetziráh e Briáh.
▸ A neshamáh yeterá desce de Atzilut e se acopla aos três níveis da alma.
▸ Cada Shabat é um capital espiritual transferível para a vida vindoura.

## Para a Brit Im Mashiach especificamente

A nossa congregação, judaica messiânica não trinitária, guarda Shabat com toda a integridade halácica que a Toráh exige. Reconhecemos no Mashiach o senhor do Shabat, no sentido de seu intérprete autorizado, e vemos em cada Shabat semanal uma antecipação concreta do reino messiânico, o Yom Shekuló Shabat.

Cantamos o *Lecha Dodi* com kavaná dupla: a Noiva é Shabat HaMalká, e também é a *Knesset Israel*, a assembleia de Israel que aguarda o Mashiach. O *dod*, o amado, é o povo de Israel coletivo, e também é *Mashiach Tzidkenu*, que vem semanalmente ao encontro de sua Noiva.

Recitamos *Eliyahu haNavi* após a Havdaláh com expectativa real. Cremos que o profeta Eliyahu virá anunciando o Mashiach ben David, e cada saída de Shabat repete esta expectativa por mais uma semana.

Não anulamos Shabat. Não substituímos. Não enfraquecemos. Pelo contrário, intensificamos o cumprimento, porque entendemos que cada Shabat semanal é ensaio do Shabat eterno que vem.

## A promessa final

Há um princípio do **Talmud Bavli, Shabat 118b** que merece encerrar este guia. Diz Rav Yochanan em nome de Rabi Shimon ben Yochai: se Israel observasse dois Shabats consecutivos conforme a halacháh, seria imediatamente redimido. Dois Shabats. Bastam dois.

Esta promessa não é alegoria. É declaração operativa. Aquele que cumpre dois Shabats consecutivos com kavaná integral abre, através de sua observância, um canal espiritual que toca diretamente a vinda do Mashiach. Não cumprir um. Dois. Consecutivos. Inteiros. Conforme a halacháh.

A Brit Im Mashiach não promete que cada membro que cumprir dois Shabats verá imediatamente o Mashiach descer. Mas afirma com convicção que aquele que pratica este nível de observância, semanas após semanas, anos após anos, participa ativamente do processo de geulá, redenção, que se desdobra na história. Cada Shabat bem guardado é um passo na escada de Yaakov. Cada Havdaláh feita com kavaná é uma despedida transitória, na expectativa de que um Shabat futuro não terá Havdaláh, porque será Yom Shekuló Shabat.

## Ken Yehi Ratzon

Que HaShem nos faça herdar o dia que é todo Shabat e descanso para a vida dos mundos. Que cada Shabat semanal nos eleve a um degrau acima do anterior. Que a Noiva nos encontre preparados toda sexta-feira ao pôr do sol. Que a Brit Im Mashiach prospere na guarda do sétimo dia até o cumprimento das promessas. Que Eliyahu haNavi venha em breve, em nossos dias, com Mashiach ben David, e instaure entre nós o Yom Shekuló Shabat eterno.

**Ken Yehi Ratzon, Shavua Tov.**

**Rav.: EBBY**

---

**Fonte geral:** Bereshit 2:1-3; Shemot 20:8-11, 31:12-17; Vayikra 23:3; Devarim 5:12-15; Yesha''yahu 56:2-7, 58:13-14; Talmud Bavli, Shabat 118b-119b e 55a; Talmud Bavli, Berachot 55a, 57b; Talmud Bavli, Sanhedrin 97a; Mishné Toráh, Hilchot Shabat 29-30; Ari haKadosh, Shaar haKavvanot, Derush Kabalat Shabat; Zohar, Bereshit 48a, Yitro 88a, Vayakhel 204b; Lecha Dodi de Rav Shlomo HaLevi Alkabetz.',
   ARRAY['peshat','remez','drash','sod']::TEXT[],
   false);

COMMIT;
