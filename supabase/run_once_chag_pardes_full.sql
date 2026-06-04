-- Cole TUDO no Supabase SQL Editor e execute uma vez
-- Brit Im Mashiach: colunas PaRDeS + conteúdo dos 14 Chagim

-- PaRDeS por Chag (espelha colunas em parashot)
ALTER TABLE chagim
  ADD COLUMN IF NOT EXISTS peshat TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS remez TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS drash TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS sod TEXT NOT NULL DEFAULT '';

-- PaRDeS do Chag: chanukah
-- Idempotente: atualiza apenas colunas peshat/remez/drash/sod
BEGIN;
UPDATE chagim SET
  peshat = 'Chanukáh comemora eventos do **período do Segundo Templo**, ocorridos entre 175 e 165 a.C. (séc. II antes da era comum), durante o domínio do império grego selêucida sobre a Terra de Israel.

### Contexto histórico

Após a morte de Alexandre o Grande (323 a.C.), seu império se dividiu entre seus generais. A Terra de Israel ficou primeiramente sob domínio dos **Ptolomeus** (Egito), e depois dos **Selêucidas** (Síria). Os primeiros foram relativamente tolerantes; os segundos, especialmente sob **Antíoco IV Epifânio**, adotaram política de helenização forçada.

### A perseguição de Antíoco

Antíoco IV (175-164 a.C.) decretou:

▸ **Proibição do estudo da Toráh** (sob pena de morte).
▸ **Proibição da circuncisão** (Brit Milá).
▸ **Proibição da observância do Shabat**.
▸ **Proibição do calendário hebraico** (especialmente Rosh Chodesh).
▸ **Proibição do kashrut**.
▸ **Sacrifício de porco no altar do Beit haMikdash** (a "abominação da desolação").

Antíoco erigiu uma estátua de Zeus no Kodesh haKodashim, profanou o azeite ritual, e impôs sacrifícios pagãos.

### A revolta dos Macabeus

A revolta começou em **Modi''in**, vila a noroeste de Yerushalaim, quando o sacerdote idoso **Matatias ben Yochanan haKohen** recusou-se a sacrificar a Zeus. Quando um judeu helenizado tentou fazer o sacrifício em seu lugar, Matatias matou-o e ao oficial grego presente, gritando *mi laAdonai elai*. Quem é por HaShem, comigo. (Eco de Shemot 32:26.)

Matatias e seus cinco filhos (Yehuda haMacabi, Yonatan, Shimon, Elazar, Yochanan) fugiram para as montanhas e iniciaram guerrilha contra os selêucidas. Durante três anos, uma força muito menor venceu o exército mais poderoso de seu tempo. *Rabim beyad meatim*, muitos na mão de poucos — frase central da liturgia de Chanukáh.

### A purificação do Templo

Em **25 de Kislev de 165 a.C.**, exatamente três anos após a profanação, Yehuda haMacabi e seus homens reconquistaram o Beit haMikdash. Imediatamente iniciaram a purificação:

▸ Retiraram a estátua de Zeus e os ídolos.
▸ Quebraram o altar profanado e construíram um novo.
▸ Procuraram azeite puro com selo do Kohen Gadol. Encontraram apenas um pequeno frasco — quantidade para um único dia.
▸ Acenderam a Menorá do Beit haMikdash com este óleo.

### O milagre

O óleo durou **oito dias**. Tempo necessário para produzir nova partida de azeite ritualmente puro (que exigia processo de oito dias). Os sábios viram nisto sinal de aceitação divina da nova consagração.

### A instituição do Chag

Yehuda haMacabi e os sábios da geração estabeleceram que **a partir de 25 de Kislev**, por oito dias, todo o Israel deveria celebrar com:

▸ Acendimento de velas.
▸ Hallel completo.
▸ Recitação de Al haNissim.
▸ Refeições festivas (sem proibição de trabalho, contudo).

Foi a última grande adição ao calendário antes do Talmud. Daí em diante, os sábios não acrescentaram mais Chagim.

### O destino dos Chashmonaim

Os Chashmonaim governaram Israel por cerca de um século (165-63 a.C.) como dinastia sacerdotal. Apesar do início heroico, a dinastia se corrompeu progressivamente: assumiram também a realeza (algo proibido para Kohanim segundo Bereshit 49:10), envolveram-se em conflitos sangrentos, e perderam o favor popular. A dinastia terminou com o domínio romano e a ascensão da família de Herodes. **Lição midráshica**: o início heroico não garante a continuidade — a corrupção pode entrar mesmo entre os justos.

A Brit Im Mashiach reconhece tanto a grandeza do início heroico quanto a tragédia do declínio, lendo a história sem idealizações.

**Fonte:** I Macabeus 1-4; II Macabeus 6-10; Talmud Bavli, Shabat 21b; Megilat Antiochus; Mishné Toráh, Hilchot Chanukáh 3.',
  remez = 'Chanukáh é o Chag da **luz que vence a escuridão**. Não no sentido cósmico apenas — também no sentido cultural e espiritual. A revolta dos Macabeus não foi apenas militar; foi uma resistência espiritual contra a **helenização**, que ameaçava extinguir a identidade judaica não pela violência direta, mas pela **assimilação**.

### Os dois inimigos: violência e assimilação

A história judaica conhece dois tipos de inimigos:

▸ **O inimigo violento** (Faraó no Mitzraim, Amalek, Antiochus em sua dimensão de perseguição direta). Quer aniquilar Israel fisicamente.

▸ **O inimigo cultural** (a Grécia em sua dimensão de helenização sedutora, e por extensão toda cultura que oferece "saída fácil" da identidade espiritual). Quer assimilar Israel até que não exista mais judeu distinto.

Chanukáh é vitória sobre **ambos** os inimigos simultaneamente. Os Macabeus venceram o exército selêucida (violência) e também rejeitaram a cultura que ele queria impor (assimilação).

### O acendimento como gesto de identidade

A mitzvá central de Chanukáh — acender velas em janela ou porta visível da rua — é **declaração pública de identidade**. Onde os helenizadores queriam que cada judeu se vestisse como grego e cessasse a Brit Milá, os Macabeus voltam afirmando: aqui há luz judaica, e ela arde em janela aberta.

Em ditaduras anti-semitas modernas (Roma, Inquisição, Stalin, nazismo), acender Chanukiá visível **era ato de coragem real**, frequentemente punido com morte. Chanukáh sobreviveu porque cada geração escolheu acender mesmo quando custou caro.

### Cinco qualidades refinadas em Chanukáh

▸ **Coragem identitária**: dizer "sou judeu" quando isto custa. Acender a Chanukiá visível é o gesto litúrgico desta coragem.

▸ **Confiança no improvável**: o óleo "deveria" ter durado um dia, durou oito. O exército maior deveria vencer, perdeu. Chanukáh ensina que HaShem opera onde a probabilidade humana já se rendeu.

▸ **Pureza preservada**: o pequeno frasco com selo do Kohen Gadol foi suficiente porque era *puro*. Quantidade não é o que conta — pureza é. Aplicação: pequeno ato puro vale mais que grande ato comprometido.

▸ **Persistência diária**: as oito noites são oito atos. Não basta acender uma vez; precisa acender oito vezes seguidas, cada noite uma a mais. Persistência crescente é mitzvá em si.

▸ **Pirsum**: publicar o milagre. A fé não é privada; quando outros precisam ver, mostre-a. A janela aberta é o microfone do milagre.

### A luz que cresce

Há controvérsia clássica entre **Beit Shamai** e **Beit Hilel** em **Talmud Bavli, Shabat 21b**:

▸ **Beit Shamai**: começa com **oito velas na primeira noite**, descendo a uma na oitava. Lógica: número de touros oferecidos em Sukkot que decresce.

▸ **Beit Hilel**: começa com **uma vela na primeira noite**, subindo até oito na oitava. Lógica: *maalin bakodesh velo moridin* (subimos em santidade, não descemos).

A halacháh segue **Beit Hilel**. Israel sobe sempre. Quem está no escuro acende uma vela; a segunda noite, duas; até a oitava noite estar plenamente iluminada. **Esta é a estrutura espiritual de Chanukáh: a luz cresce, nunca diminui**.

### O aspecto messiânico velado

Há uma dimensão que Chazal deixaram intencionalmente velada. Quando os Macabeus reconsagraram o Beit haMikdash, **não restauraram a dinastia davídica** (à qual a realeza pertence segundo Bereshit 49:10). Os Chashmonaim eram **Kohanim**, não da tribo de Yehudá. Por isto a dinastia, apesar do início heroico, terminou em colapso.

A Brit Im Mashiach lê isto com nuance: Chanukáh celebra a vitória sobre a assimilação, mas **não foi a restauração messiânica**. Aquela ainda virá, com **Mashiach ben David** restaurando a realeza para Yehudá e o sacerdócio para Aharon, sem confusão entre as duas funções. Cada acendimento de Chanukiá é, em camada profunda, espera pela restauração completa.

**Fonte:** Talmud Bavli, Shabat 21b; Bereshit 49:10; Rambam, Mishné Toráh, Hilchot Chanukáh 3:1; Maharal, Ner Mitzvá; Bnei Yissachar (Rav Tzvi Elimelech de Dynów).',
  drash = '### Peshat — o sentido literal

Chanukáh, no Peshat, é Chag rabínico de oito dias, instituído pelos sábios após a vitória dos Macabeus em 165 a.C. e o milagre do óleo que durou oito dias. Não há base direta na Toráh; está em livros pós-bíblicos (Macabeus) e codificado no Talmud (Shabat 21b). As práticas: acender a Chanukiá oito noites, recitar Hallel completo, dizer Al haNissim, comer fritos e lácteos.

No Peshat, é Chag de **história**: comemora um evento. Como o 4 de Julho americano ou o 7 de Setembro brasileiro, mas com peso espiritual maior pela conexão ao Beit haMikdash.

### Remez — a alusão velada

O número **oito** alude ao que está acima do natural sete (como em Shemini Atzeret e Brit Milá). Sete = ciclo natural completo. Oito = sobrenatural integrado ao natural.

E a **Chanukiá com nove luzes** (oito + shamash) alude à Etz Chaim invertida: as nove Sefirot que se manifestam (sem Keter, que está acima), com o shamash representando a fonte oculta que acende todas.

O **dreidel/sevivon** alude à **transitoriedade do tempo histórico**. As quatro letras (*Nun, Gimel, Hei, Shin*) representam, na guematria, **358** = mesmo valor de *Mashiach* (משיח). Cada giro do pião é, em pequena escala, a roda da história girando até a vinda final.

### Drash — o ensino homilético

O **Talmud Bavli, Shabat 21b** discute por que oito noites. Várias respostas; uma central diz: porque a luz não pode descer toda de uma vez. Precisa de oito etapas para se integrar à matéria do mundo. **Cada noite é uma camada da Or haGanuz se tornando acessível**.

Aplicação espiritual: na vida pessoal, qualquer transformação real exige tempo. Não basta "decidir mudar" e mudar imediatamente. A luz precisa atravessar oito noites de pirsum — oito atos visíveis, em sequência, em crescimento.

E a divergência **Beit Shamai vs Beit Hilel** (decrescente vs crescente) tem Drash profundo: Beit Shamai vê a luz original como **a maior possível**, e o mundo a recebendo em decadência. Beit Hilel vê o mundo **subindo gradualmente** em direção à luz. A halacháh segue Hilel: **somos otimistas escatológicos**. O mundo está em ascensão até chegar ao Mashiach, não em decadência.

Outro Drash: **a vela da janela aberta**. Em séculos de perseguição, acender Chanukiá visível **custava a vida**. Sefarditas na Inquisição, judeus no Império Russo, judeus na Polônia nazista — todos enfrentaram este custo. E muitos acenderam mesmo assim. **Cada Chanukiá em janela é eco daquela coragem**.

### Sod — o segredo kabalístico

A tradição luriânica (Pri Etz Chaim, Shaar Chanukáh) ensina que Chanukáh é **o portal anual para a Or haGanuz**. Por oito noites, a luz primordial — que será desocultada apenas no Olam Habá — vaza para o mundo presente, e a Chanukiá é o canal físico desse vazamento.

A correspondência sefirótica:

▸ As **oito noites** correspondem às oito Sefirot abaixo de Keter (que é fonte oculta = shamash).
▸ Ou alternativamente: às oito vestes do Kohen Gadol (que faz inauguração).
▸ Ou ainda: aos oito patriarcas da história messiânica (Avraham, Itzchak, Yaakov, Yossef, Moshé, Aharon, David, Mashiach).

Cada noite invoca uma camada espiritual diferente. Por isto cada noite tem alguma kavaná própria, embora as brachot sejam as mesmas.

O **óleo puro** corresponde, no Sod, ao *Yessod* (Fundamento). Yessod é o canal pelo qual a Or desce de Tiferet a Malchut. Quando o Yessod é puro (selo do Kohen Gadol intacto), a Or flui. Quando é profanado (Klipot), a Or não desce.

A história de Chanukáh é, no Sod, **a história da restauração do Yessod**. Os Macabeus reconsagraram o Yessod do povo (sua pureza espiritual coletiva), e por isto o óleo puro foi suficiente para acender o canal todo.

### A síntese

Os quatro níveis juntos:

▸ **Peshat**: Chag rabínico de oito dias, milagre histórico do óleo e da vitória.
▸ **Remez**: oito transcendente, Chanukiá como Etz Chaim invertida, dreidel = roda messiânica.
▸ **Drash**: a luz precisa de oito etapas para descer; otimismo de Hilel sobre ascensão; coragem de acender em janela.
▸ **Sod**: portal anual para a Or haGanuz, restauração do Yessod coletivo, Klipot vencidas pela pureza autêntica.

A Brit Im Mashiach vive Chanukáh nos quatro níveis simultâneos. Cada chama acesa é, ao mesmo tempo, vela física, símbolo de coragem identitária, luz cósmica descendo, e ensaio da Or haGanuz desocultada que iluminará o Olam Habá com Mashiach ben David.

**Fonte:** Talmud Bavli, Shabat 21b; Maharal, Ner Mitzvá; Bnei Yissachar; Pri Etz Chaim, Shaar Chanukáh; Ari haKadosh, Shaar haKavvanot, Derush Chanukáh.',
  sod = 'Chanukáh, no Sod, é o Chag da **Or haGanuz** (Luz Oculta), a luz primordial dos primeiros dias da Criação que foi escondida por HaShem para os justos no Olam Habá. A pequena chama da Chanukiá, ensina a tradição luriânica, é faísca direta dessa Luz Oculta descendo ao mundo manifesto.

### A Or haGanuz

Segundo o Midrash (Bereshit Rabá 3:6), HaShem criou no primeiro dia uma luz com a qual Adam haRishon podia ver "do começo ao fim do mundo". Esta luz era *too good* para o mundo caído após o pecado. HaShem **escondeu** essa luz, guardando-a para os justos no Olam Habá.

Mas esta luz oculta tem **vazamentos**. Em momentos específicos do calendário, ela transparece. Chanukáh é um desses momentos. As **oito noites** equivalem, no Sod, aos oito níveis dos Olamot acima do Olam haAsiáh, descendo até nós. Cada noite, mais um nível da Or haGanuz se torna acessível.

### A Chanukiá como Etz Chaim invertida

A Chanukiá tem **nove velas**: oito principais + um *shamash* (ajudante) que acende as outras. Na Etz Chaim, as **dez Sefirot** menos **Keter** (que está acima de toda contagem) = nove Sefirot ativas. O shamash corresponde a **Keter** (a fonte) que acende as oito Sefirot inferiores em ordem.

Ou alternativamente: as **oito velas** correspondem às oito Sefirot abaixo de Bináh, e o shamash a **Bináh** mesma, a Mãe que ilumina todas as filhas.

A correspondência específica varia por tradição. O essencial: Chanukiá é Etz Chaim em chamas, e acendê-la é operar na própria estrutura sefirótica.

### Oito como transcendência

O número **oito** transcende o sete natural. Sete = ciclo natural completo (sete dias da semana, sete Sefirot inferiores). Oito = um acima do natural, miraculoso, sobrenatural integrado.

▸ A Brit Milá é no **oitavo dia** — o pacto entra na carne acima do natural.
▸ A inauguração do Mishkán durou **oito dias** — a Shechiná desceu no oitavo.
▸ Shemini Atzeret é o **oitavo dia** de Sukkot — Bináh desce em intimidade.
▸ Chanukáh dura **oito dias** — a Or haGanuz vaza para o mundo.

Os quatro casos compartilham a mesma estrutura espiritual: oito é o portal entre o natural e o sobrenatural.

### A pureza do óleo como pureza da alma

O óleo (*shemen*, שמן) tem valor numérico **390**, igual ao valor de *shamayim* (שמים, céus). Óleo é matéria que carrega céu. Acender óleo puro é trazer céu à terra; misturá-lo com impuro é poluir a conexão.

A tradição luriânica ensina: cada alma de Israel é frasco de óleo lacrado pelo selo do Kohen Gadol. As "klipot" (cascas espirituais) e a assimilação tentam profanar o selo. Mas se um único frasco resiste — uma única alma autêntica — basta para reacender todo o Beit haMikdash. Chanukáh é a celebração desta possibilidade.

### A Hashmonai como Kabaláh velada

Os Chashmonaim (Macabeus) eram, na compreensão luriânica, **canal de Gevurá** (rigor) descendo ao mundo. A vitória deles foi *Gevurá em ação*: força contida transformada em força ativa quando o rigor é necessário. Mas o problema posterior — eles assumirem a realeza alheia à sua tribo — foi excesso de Gevurá invadindo Tiferet (harmonia). Por isto a dinastia colapsou.

Lição: Gevurá em seu lugar é virtude (resistência); Gevurá fora do lugar é desequilíbrio (corrupção). Chanukáh ensina a discernir.

### As cinco letras de *Chanukáh*

A palavra *Chanukáh* (חנכה, contagem padrão sem vogais) tem cinco letras: *Chet, Nun, Kaf, Hei*. Mais a *Hei* final em alguns spellings (חנוכה).

▸ **Chet** (ח) corresponde ao **Vav** (ו) e ao oitavo lugar no Alef-Beit, marcando a transcendência do sete.
▸ **Nun** (נ) é "queda" (de *nefilá*) ou "perpetuidade" — ambivalência que reflete a história dos Chashmonaim.
▸ **Kaf** (כ) tem valor 20 e corresponde a **Keter** (a Coroa, fonte da luz oculta).
▸ **Hei** (ה) é manifestação, sopro vital.

Lendo como acróstico: a transcendência do oito (Chet) atravessa a queda/perpetuidade (Nun), descendo de Keter (Kaf) à manifestação (Hei). É o mapa cósmico de Chanukáh em quatro letras.

### Sobre acender no Beit haMikdash futuro

A tradição messiânica espera o Terceiro Beit haMikdash. Quando vier, **a Menorá será reacesa**, e o óleo virá milagrosamente — como em Chanukáh, mas em escala universal. Cada acendimento de Chanukiá hoje é ensaio para aquele acendimento final.

**Fonte:** Bereshit Rabá 3:6; Talmud Bavli, Shabat 21b; Maharal, Ner Mitzvá; Bnei Yissachar; Ari haKadosh, Shaar haKavvanot, Derush Chanukáh; Pri Etz Chaim, Shaar Chanukáh.'
WHERE slug = 'chanukah';
COMMIT;
-- PaRDeS do Chag: lag-baomer
-- Idempotente: atualiza apenas colunas peshat/remez/drash/sod
BEGIN;
UPDATE chagim SET
  peshat = 'Lag baOmer tem **três camadas históricas** que se entrelaçam: os discípulos de Rabi Akiva, a vida e morte de Rabi Shimon bar Yochai, e a institucionalização cabalística da hilulá em Tzefat.

### Os discípulos de Rabi Akiva (séc. II d.C.)

**Rabi Akiva ben Yossef** (~50-135 d.C.) foi um dos maiores sábios do Talmud, mestre de uma geração inteira. Segundo Talmud Bavli (Yevamot 62b):

*Shneyim asar elef zugim talmidim hayu lo leRabi Akiva mi-Gevat ve''ad Antiparas, vechulam metu beperek echad, mipnei shelo nahagu kavod zeh bazeh.*

Doze mil pares de discípulos tinha Rabi Akiva, de Gevat até Antiparas, e todos morreram em um único período, porque não trataram com respeito uns aos outros.

24.000 discípulos perdidos em uma epidemia espiritual. A causa: **falta de kavod** (respeito) entre eles.

A morte cessou em **Lag baOmer**. A partir deste dia, **Rabi Akiva começou de novo com cinco discípulos**, entre os quais estava **Rabi Shimon bar Yochai** (Rashbi). Esses cinco continuaram a tradição do mestre, e através deles a Toráh foi preservada.

### A vida de Rashbi (Rabi Shimon bar Yochai, ~100-160 d.C.)

Após o fracasso da Revolta de Bar Kochba (135 d.C.) e a perseguição romana, **Rashbi** foi sentenciado à morte por **falar contra Roma**. Junto com seu filho **Rabi Eliezer**, escondeu-se em uma caverna em **Pequiin** (Galileia) por **13 anos**, alimentado milagrosamente por uma figueira e uma fonte de água.

Durante esses 13 anos, segundo a tradição (Zohar, Idra), Rashbi **recebeu as revelações mais profundas da Kabaláh** — os mistérios que posteriormente seriam codificados no **Zohar**.

Ao sair da caverna após 13 anos, encontrou o mundo aparentemente igual. Inicialmente, sua santidade era tão intensa que "queimava" tudo o que olhava — porque o mundo material parecia trivial após anos em contato direto com a Or divina. Voltou à caverna por mais 12 meses, até **suavizar seu olhar** e poder coexistir com o mundo terreno.

### A morte de Rashbi

Rashbi morreu em **Meron** (Galileia), em **18 de Iyar** (Lag baOmer). A tradição (Idra Zutá, Zohar) descreve sua morte como **hilulá** — sua alma deixou o corpo durante a transmissão final dos mistérios mais profundos aos discípulos.

A casa em que ele ensinava no momento da morte se encheu de fogo (Or divina visível) que **não consumiu, mas iluminava**. Por isto a tradição moderna acende **fogueiras** em Lag baOmer: em memória daquele fogo que iluminou sem queimar.

### Institucionalização cabalística (séc. XVI)

Até o século XVI, Lag baOmer era observado de modo modesto. O **Arizal** (Rabi Itzchak Luria) e seus discípulos em **Tzefat** (Galileia, perto de Meron) **estabeleceram a peregrinação anual ao túmulo de Rashbi** como prática regular.

A partir de então, Lag baOmer se tornou **festa cabalística por excelência**. O Arizal e seu círculo:

▸ Iam a Meron em Lag baOmer todos os anos.
▸ Estabeleceram cantos especiais (*Bar Yochai*, atribuído ao próprio Arizal).
▸ Codificaram kavanot luriânicas para o dia.
▸ Instituíram a tradição de fogueiras durante a noite.

A peregrinação a Meron tornou-se evento massivo a partir do século XIX, com a expansão da comunidade judaica em Israel.

### A composição "Bar Yochai"

O piyut **Bar Yochai**, atribuído ao **Arizal** ou ao seu círculo, é cantado em Lag baOmer e em qualquer ocasião de honra a Rashbi. Tem **10 estrofes**, cada uma terminando em "Bar Yochai", e estrutura acrostística codificando o nome do Arizal.

Trecho típico:

*Bar Yochai, nimshachta ashrecha, shemen sasson mechaveirecha.*

Bar Yochai, foste ungido, feliz és tu — óleo de alegria dos teus companheiros.

Texto completo no Sidur cabalístico.

### Lag baOmer hoje

▸ **Em Meron**: peregrinação anual com centenas de milhares de participantes. Fogueiras gigantes, dança noite afora, chalakah de meninos de 3 anos.

▸ **Em Yerushalaim**: paralelo menor, com fogueiras em parques e bairros chassídicos.

▸ **Em Tzefat**: pequena peregrinação a sinagogas históricas associadas ao Arizal.

▸ **Na Diáspora**: comunidades celebram localmente com fogueiras (em escala doméstica), estudos do Zohar, cantos do Bar Yochai.

A Brit Im Mashiach, em Franca, pode organizar Seudá comunitária de Lag baOmer com elementos chassídico-cabalísticos: pequena fogueira (com segurança), estudo do Zohar, cantos.

### A Tzava''at Rashbi

A **Tzava''at Rashbi** (Testamento do Rashbi) é texto cabalístico atribuído ao próprio Rashbi, contendo ensinamentos finais a seus discípulos antes da morte. Tradição forte de **estudá-lo em Lag baOmer**. Texto não muito longo (10-15 páginas), disponível em traduções modernas.

**Fonte:** Talmud Bavli, Yevamot 62b, Shabat 33b (sobre a caverna); Zohar, Idra Rabá e Idra Zutá; Tikkunei Zohar (introdução); Sefer Pri Etz Hadar do Arizal; Tzava''at Rashbi.',
  remez = 'Lag baOmer carrega **três significados espirituais** que convergem:

▸ Recuperação após perda (fim do luto dos discípulos de Rabi Akiva).
▸ Celebração da Kabaláh revelada (hilulá de Rashbi).
▸ Pausa de alegria dentro do período de Sefirat haOmer.

### A lição da morte dos 24.000

A morte dos discípulos de Rabi Akiva é uma das narrativas mais densamente significativas do Talmud. **Lo nahagu kavod zeh bazeh** (não trataram com respeito uns aos outros).

24.000 sábios, mestres potenciais da geração seguinte — todos perdidos por **falta de respeito mútuo**. Não por heresia, não por idolatria, não por imoralidade. Apenas por **arrogância intelectual e desrespeito**.

A lição é severa: **o estudo da Toráh sem respeito é veneno**. Quanto maior o estudioso, maior a responsabilidade de respeitar outros estudiosos — especialmente os de opiniões diferentes.

Lag baOmer marca o fim deste período de morte, e simultaneamente **o início da nova era através dos cinco discípulos remanescentes**, entre eles Rashbi. **O respeito mútuo é a base do renascimento espiritual**.

### A hilulá como inversão da morte

Em outros yahrzeits, há jejum (ou ao menos sobriedade). Em Lag baOmer (yahrzeit de Rashbi), há **festa**. Por quê?

A tradição (Idra Zutá) ensina: Rashbi morreu **transmitindo Or divina**. Sua morte não foi separação trágica; foi **consumação espiritual**. Ele saiu desta vida em estado de yichud (união) com a Or divina, e por isto sua morte é celebração, não luto.

**Hilulá**: literalmente "celebração", "festa de casamento". Aplica-se à elevação da alma de um justo que atingiu sua plenitude espiritual antes de partir.

Aplicação: o nosso medo da morte vem de não termos atingido nossa "plenitude". Quem viveu plenamente, segundo a tradição, **morre em hilulá**. Lag baOmer ensina que **morte autêntica pode ser celebração**, não tragédia.

### As cinco qualidades refinadas em Lag baOmer

▸ **Respeito mútuo intelectual**: a falha dos discípulos de Rabi Akiva. Lag baOmer pede revisão deste impulso.

▸ **Coragem de transmitir o profundo**: Rashbi falou abertamente, mesmo sob risco romano. Ensinou Kabaláh em tempos perigosos. Coragem espiritual é mitzvá.

▸ **Paciência cabalística**: 13 anos na caverna não foram desperdício; foram preparação para a transmissão final. Algumas coisas exigem isolamento prolongado para amadurecer.

▸ **Festa que vence luto**: capacidade de transformar yahrzeit em festa quando a vida foi consumada. Visão escatológica integrada.

▸ **Comunidade ao redor do fogo**: as fogueiras de Lag baOmer reúnem comunidades. O fogo simboliza Or que ilumina sem consumir. Comunidades autênticas têm este caráter.

### As fogueiras como símbolo

A tradição das **fogueiras** em Lag baOmer remonta ao "fogo que iluminou sem queimar" na casa de ensino de Rashbi no momento de sua morte. Mas o fogo tem múltiplas camadas:

▸ **Fogo da Toráh**: o estudo da Toráh é chamado *esh* (fogo) — desafiador, transformador, que pode iluminar ou consumir.

▸ **Fogo da Kabaláh**: revelação cabalística é Or divina descendo como fogo. Quem pode receber é iluminado; quem não pode ser preparado é queimado.

▸ **Fogo da comunidade**: ao redor da fogueira, comunidade se forma. Estranhos se tornam companheiros pela luz partilhada.

▸ **Fogo eterno da Menorá**: a Menorá do Beit haMikdash queimava continuamente. As fogueiras de Lag baOmer são memória sazonal desta luz contínua.

### O arco-e-flecha

Tradição: meninos jogam com **arcos e flechas** em Lag baOmer. Origem incerta, várias explicações:

▸ Os discípulos de Rabi Akiva treinavam para a Revolta de Bar Kochba; Lag baOmer comemora seus exercícios.
▸ O arco-e-flecha simboliza Rashbi na caverna, escondido como caçador.
▸ Em hebraico, **keshet** (arco) significa também **arco-íris** — sinal divino de aliança após o dilúvio (Bereshit 9). Lag baOmer celebra a aliança divina renovada.

A última interpretação tem dimensão messiânica: o arco-íris (sinal post-dilúvio) é também o "arco de Mashiach" que aparece em algumas tradições escatológicas.

### O Zohar como livro de Lag baOmer

Em Lag baOmer, **estuda-se o Zohar** — livro atribuído (em parte controversa) a Rashbi. O Zohar é a obra cabalística central do judaísmo, composta de 22 volumes em aramaico, comentando sobre os cinco livros da Toráh.

Em Lag baOmer, costuma-se estudar especificamente:

▸ **Idra Rabá** (Grande Assembleia, do Zohar Naso): trecho sobre revelações cabalísticas no jardim de Rashbi.

▸ **Idra Zutá** (Pequena Assembleia, do Zohar haAzinu): trecho sobre a morte/hilulá de Rashbi.

▸ **Tikkunei Zohar**: 70 *tikunim* (correções) sobre a primeira palavra da Toráh (*Bereshit*).

Quem não consegue ler o Zohar em aramaico pode estudar **traduções e comentários** em português ou hebraico (edições de Sulamit, Ari, e outros).

### A meditação dos Lag baOmer

A tradição (Pri Etz Hadar) sugere meditação simples para Lag baOmer:

1. **Acender uma vela ou pequena fogueira** com kavaná.
2. **Contemplar a chama** por alguns minutos em silêncio.
3. **Recitar mentalmente**: "Que esta luz seja parte da Or de Rashbi que ainda ilumina o mundo. Que eu possa receber dela alguma fagulha."
4. **Estudar um trecho do Zohar** (mesmo que curto, com tradução).
5. **Cantar Bar Yochai** ou outro Nigún apropriado.

Esta prática, mesmo solitária, conecta à hilulá cósmica de Rashbi.

**Fonte:** Talmud Bavli, Yevamot 62b, Shabat 33b; Idra Rabá e Idra Zutá; Tikkunei Zohar; Pri Etz Hadar; Bar Yochai (piyut atribuído ao Arizal).',
  drash = '### Peshat — o sentido literal

Lag baOmer, no Peshat, é o 33° dia da Sefirat haOmer (18 de Iyar). Marca:

▸ Fim da epidemia que matou 24.000 discípulos de Rabi Akiva.
▸ Hilulá (yahrzeit elevado) de Rabi Shimon bar Yochai.
▸ Suspensão do luto da Sefirat haOmer por este dia.

Práticas: fogueiras, estudo do Zohar, peregrinação a Meron, chalakah de meninos de 3 anos, casamentos permitidos.

### Remez — a alusão velada

O número **33** alude a múltiplas dimensões:

▸ **Lag** (ל"ג) = lamed (ל=30) + gimel (ג=3) = 33.
▸ **33 cumprimentos** da bracháh sacerdotal (em algumas contagens).
▸ **33 vértebras** da coluna humana (algumas contagens) — coluna espiritual paralela à corporal.
▸ **33 caminhos espirituais** (em algumas escolas cabalísticas).

E a **fogueira** alude à imagem profética de Mashiach descendo "ardendo como forno" (Malachi 3:19). Cada Lag baOmer ensaia o fogo messiânico que virá.

A **caverna** alude ao isolamento espiritual necessário antes da revelação. Cada grande revelação na história judaica veio precedida de isolamento: Moshé no monte, Eliyahu no monte Horev, Rashbi na caverna, o Arizal em Tzefat antes de ensinar. Lag baOmer celebra esta estrutura.

### Drash — o ensino homilético

A lição central dos **24.000 discípulos perdidos**: *lo nahagu kavod zeh bazeh* (não trataram com respeito uns aos outros).

O Talmud não enfatiza heresia, idolatria, ou imoralidade. Apenas **falta de respeito**. **24.000 sábios potenciais** foram perdidos por desrespeito. Esta é, talvez, a lição mais severa sobre **caráter** em toda a tradição rabínica.

Aplicação prática: quem estuda Toráh e desrespeita colegas estudiosos **causa dano cósmico**. O estudo, em estado de arrogância, é veneno espiritual. Por isto Lag baOmer é convocação anual ao respeito mútuo.

Outro Drash: a história da **caverna de Rashbi** ensina sobre **integração**. Após 13 anos de Or pura, ele saiu queimando o mundo. Voltou à caverna; 12 meses mais, suavizou-se. **Revelação cabalística sem integração com o mundo é perigosa**. Tanto para quem vê quanto para o mundo.

Lição: quem busca profundidade espiritual deve cultivar **paciência para integrar** o que recebe. Forçar revelações no mundo material que ainda não pode recebê-las gera problemas.

### Sod — o segredo kabalístico

Como tratado em 05, o Sod de Lag baOmer envolve:

▸ **Sefirá Hod sheBeHod**: rendição reverente no estado puro. Atingido por Rashbi em sua hilulá.
▸ **Or da hilulá** descendo anualmente, acessível a quem se prepara.
▸ **Etz Chaim ativada** através do estudo do Zohar.
▸ **Fogueira como teurgia**: canal para Or descer.
▸ **Reunião comunitária** ao redor do fogo como paralelo terreno da reunião celestial.

Em camada mais profunda, **Lag baOmer é o "Yom Kippur cabalístico"**. Como Yom Kippur opera purificação por aflição, Lag baOmer opera elevação por alegria. Os dois são caminhos diferentes para o mesmo destino (proximidade com a Or divina).

O **Idra Zutá** (Zohar haAzinu) descreve a morte de Rashbi com detalhes que ensinam Sod profundo:

▸ Sua casa se iluminou com fogo que não consumiu — paralelo direto ao **Sneh** (sarça ardente) de Moshé (Shemot 3:2). Rashbi morre na mesma Or que Moshé recebeu.

▸ Os discípulos não puderam estar perto durante a transmissão final — apenas alguns puderam ouvir. Outros ouviram através das janelas. Os mais sensíveis tiveram **medo de morrer junto**, pela intensidade da Or.

▸ Após a morte, **o sol não se pôs** até que Rashbi terminasse de revelar. Toda a Or que ele tinha foi entregue antes da partida.

### A guematria final

**Bar Yochai** (בר יוחאי) = 2 + 200 + 10 + 6 + 8 + 1 + 10 = **237**.

Curiosidade: **Or** (אור, luz) = 1 + 6 + 200 = **207**.

Diferença: 237 - 207 = **30**. *Lev* (לב, coração) = 30 + 2 = 32. *Lamed* sozinho = 30.

A guematria sugere relação entre **Rashbi e a Or**, com diferencial relacionado a **lamed/lev**. Lamed é a letra do **estudo** (de *limud*); lev é o coração. Rashbi excede a Or pelo coração estudioso. **A diferença entre brilho geral e Rashbi é o estudo do coração**.

### O Sod das 24.000 e dos 5

Os **5 discípulos remanescentes** após a perda dos 24.000: Rabi Meir, Rabi Yehudah, Rabi Yose, Rabi Shimon (Rashbi), Rabi Elazar ben Shamua.

Cinco corresponde, na cabaláh, aos **5 chassadim** (cinco bondades superiores das Sefirot) ou aos **5 niveis da alma** (Nefesh, Ruach, Neshamáh, Chayá, Yechidá). Os cinco discípulos representam, no Sod, **a integralidade preservada** após a poda dramática.

Quando uma árvore perde galhos (24.000), o tronco fortalece-se. **A perda é dolorosa, mas o que sobra fica mais robusto**. Esta é estrutura da história judaica: perdas catastróficas alternam com renovação intensificada.

### A síntese

▸ **Peshat**: 33° dia do Omer, hilulá de Rashbi, fim de luto por discípulos de Rabi Akiva.
▸ **Remez**: 33 como número espiritual, fogueira como ensaio messiânico, caverna como portal de revelação.
▸ **Drash**: respeito mútuo como fundamento; integração lenta de revelações; perda dolorosa como renovação.
▸ **Sod**: Hod sheBeHod, Or da hilulá, paralelo Rashbi-Moshé via Sneh ardente; guematria Bar Yochai-Or-Lev; 5 discípulos como integralidade preservada.

A Brit Im Mashiach vive Lag baOmer nos quatro níveis simultâneos. Reconhece em Rashbi e no Zohar **canal autêntico** de revelação cabalística que, segundo a própria tradição, contribuirá para a redenção messiânica final.

**Fonte:** Talmud Bavli, Yevamot 62b, Shabat 33b; Zohar Idra Rabá e Idra Zutá; Tikkunei Zohar; Pri Etz Hadar; Malachi 3:19; Shemot 3:2; Bar Yochai (piyut do Arizal).',
  sod = 'Lag baOmer é, sem dúvida, o **Chag mais cabalisticamente denso** do calendário. Rashbi é a figura central da Kabaláh; o Zohar é seu legado; Lag baOmer é sua hilulá. O Chag inteiro opera no nível do Sod.

### Rashbi como canal único

A tradição (Zohar, Idra Rabá) ensina que Rashbi foi **o último sábio talmúdico autorizado a transmitir Kabaláh abertamente**. Antes dele, a Kabaláh era transmitida apenas a discípulos selecionados, em segredo. Depois dele, a tradição foi velada novamente até a renovação tzfática do século XVI.

Rashbi foi **canal único**: o que ele revelou foi o material que os cabalistas posteriores estudariam por séculos. Sem ele, a Kabaláh não teria a forma sistemática que tem hoje.

### Os 33 níveis

Lag = 33. Por que esse número especificamente?

A tradição cabalística (Pri Etz Hadar) ensina que existem **33 níveis** de aproximação à Or divina, mapeáveis nas Sefirot:

▸ As 10 Sefirot principais.
▸ As 13 emanações secundárias.
▸ Os 10 outros canais correspondentes.

Total: 33. Em Lag baOmer, no 33° dia da Sefirat haOmer, atinge-se simbolicamente o **nível 33** de aproximação. A jornada da Sefirat haOmer continua até nível 49 (Shavuot), mas o nível 33 é marcador significativo.

### A Sefirá específica do 33° dia

Cada dia do Omer corresponde a uma combinação de duas Sefirot. O 33° dia corresponde a:

▸ **Hod sheBeHod** (Esplendor no Esplendor).

Hod é a Sefirá da **rendição reverente**. *Hod sheBeHod* é Hod em sua forma mais pura — rendição absoluta à Or divina.

Rashbi, segundo a tradição, atingiu este estado durante seus 13 anos na caverna. Quando saiu, era *Hod sheBeHod* corporificado. Por isto sua morte foi em **Hod sheBeHod** — hilulá no estado de rendição perfeita.

Hilulá de Rashbi é, no Sod, **ensaio anual de Hod sheBeHod cósmico**. Os participantes em Lag baOmer recebem fagulha desta luz, se preparados.

### A Or de Rashbi continua

A tradição cabalística (Tikkunei Zohar, introdução) ensina que **Rashbi continua agindo cosmicamente** desde sua morte. Sua alma não foi para "descanso eterno"; foi para **ensinar nas yeshivot celestiais**.

Por isto suas revelações continuam a chegar à humanidade através de:

▸ **Estudantes do Zohar**: aqueles que estudam recebem fagulha de sua alma.
▸ **Cabalistas autênticos**: continuação da linhagem de Rashbi através de mestres como Arizal, Vital, Cordovero, Baal Shem Tov.
▸ **Lag baOmer anual**: cada hilulá renova o vínculo entre humanidade e Or de Rashbi.

### Fogueiras como teurgia

As **fogueiras** de Lag baOmer não são mero adorno. Na tradição cabalística, são **teurgia** (operação espiritual) que:

▸ Ativam memória do "fogo que iluminou sem consumir" na casa de Rashbi.
▸ Funcionam como **canal para a Or da hilulá** descer ao mundo material.
▸ **Reúnem comunidade** ao redor da luz partilhada — paralelo terreno da reunião celestial das almas.

Por isto a fogueira deve ser:

▸ **Real** (não elétrica nem simulada): chamas físicas são essenciais.
▸ **Comunal**: idealmente compartilhada, não solitária.
▸ **Acompanhada de Toráh**: estudo do Zohar ao redor; sem isto, a fogueira é mero churrasco.
▸ **Cantada**: Nigunim (especialmente *Bar Yochai*) elevam o fogo a teurgia.

### A figueira na caverna

Durante os 13 anos na caverna, Rashbi e seu filho foram alimentados por uma **figueira** e uma **fonte de água**. Esta narrativa tem significado cabalístico profundo:

▸ **Figueira** = árvore primordial do Gan Eden, segundo várias tradições (a "Árvore do Conhecimento" pode ter sido figueira, não macieira). Rashbi se alimentou da árvore primordial — recebeu sua Or original.

▸ **Fonte de água** = símbolo da Toráh fluindo, *mayim chayim* (águas vivas). Rashbi se alimentou diretamente da Toráh no estado primordial.

▸ **13 anos** = número de **echad** (אחד, Um) = 1+3+1+ etc; também é número da maioridade religiosa (bar mitzvá). Rashbi passou por "puberdade espiritual" extra-longa, atingindo maturidade cabalística através do isolamento prolongado.

### O olhar que queima

Quando Rashbi saiu da caverna, seu olhar **queimava** o mundo material. Por quê? Porque ele tinha visto a Or no estado puro durante 13 anos. Voltando ao mundo de klipot, seu olhar carregava luz que o mundo material não podia receber.

A tradição luriânica ensina: cada um de nós pode atingir estados de Or onde retornar à "normalidade" é difícil. Quem medita profundamente, estuda Kabaláh seriamente, ora com kavaná intensa — pode encontrar o mundo material como decepcionante após.

A solução, segundo Rashbi, foi voltar à caverna por 12 meses adicionais — **suavizar** o olhar até poder coexistir. Lição prática: revelações espirituais profundas precisam de **integração lenta** com o mundo cotidiano. Não se pode forçar; precisa amadurecer.

### A geometria do "33"

O número 33 tem geometria oculta:

▸ **3+3 = 6**: relacionado às seis direções espaciais ou às seis Sefirot inferiores entre Chesed e Yessod.
▸ **3×3 = 9**: relacionado às nove Sefirot ativas (sem Keter).
▸ **33** é o número de **letras do nome divino** desdobrado em certas combinações cabalísticas (variando por escola).
▸ **33 vértebras** na coluna humana (segundo algumas contagens) — sustento físico da estrutura espiritual.

Esta densidade numérica explica por que Lag baOmer tem peso espiritual desproporcional ao seu status "Chag menor".

### A integração com Pessach-Shavuot

Lag baOmer ocupa **lugar específico** na trajetória Pessach-Shavuot:

▸ **Pessach** (15 Nissan): libertação inicial.
▸ **Dia 33 do Omer (Lag baOmer)**: marco da transição. **Já se libertou, ainda não recebeu a Toráh.**
▸ **Shavuot** (6 Sivan): recepção plena da Toráh.

Lag baOmer marca **o ponto de viragem** na jornada da libertação à recepção. A primeira metade (1-33) é purificação dolorosa (luto, restrição). A segunda metade (34-49) é alegria preparatória.

Quem celebra Lag baOmer com kavaná consciente desta posição entende: **estamos a meio caminho da plenitude espiritual anual**. O esforço da Sefirat haOmer continua, mas com renovado vigor.

**Fonte:** Zohar, Idra Rabá e Idra Zutá; Tikkunei Zohar (introdução); Pri Etz Hadar do Arizal; Bar Yochai (piyut); Talmud Bavli, Shabat 33b sobre a caverna; Tzava''at Rashbi.'
WHERE slug = 'lag-baomer';
COMMIT;
-- PaRDeS do Chag: pessach
-- Idempotente: atualiza apenas colunas peshat/remez/drash/sod
BEGIN;
UPDATE chagim SET
  peshat = 'Pessach é o Chag mais densamente descrito na Toráh. Cinco passagens centrais o fundam, com camadas se complementando.

### Shemot 12 — A Instituição Original

Capítulo fundador. Antes mesmo da saída do Mitzraim, HaShem instrui Moshé sobre o Pessach:

▸ **Verso 2**: *hachodesh hazê lachem rosh chodashim*. Este mês (Nissan) será para vós cabeça dos meses. O calendário religioso começa aqui.

▸ **Versos 3-6**: cada casa deve separar um cordeiro em 10 de Nissan, mantê-lo até 14 de Nissan, abatê-lo ao fim do dia.

▸ **Verso 7**: o sangue é colocado nos dois umbrais e na verga da porta. Sinal de proteção para a praga dos primogênitos.

▸ **Versos 8-10**: o cordeiro é assado inteiro, comido com matsot e maror, à noite, com pressa, vestidos como prontos para partir.

▸ **Verso 11**: o ato é chamado *Pessach laAdonai* — Pessach (passagem/salto) a HaShem.

▸ **Versos 12-13**: *uvarti et erets Mitzraim... uphasachti aleichem*. Atravessarei a terra do Mitzraim... e saltarei (passarei por cima) de vós. O sangue será sinal de exclusão da praga.

▸ **Versos 14-20**: a celebração será memorial perpétuo. Sete dias comer matsá; eliminação total do chametz; oferta proibida a estrangeiros não circuncisados.

### Shemot 13 — A Memória Estruturada

▸ **Verso 8**: *vehigadtá levincha bayom hahu*. E contarás ao teu filho naquele dia. Origem direta da **Hagadá** (do verbo *vehigadtá*, e contarás).

▸ **Verso 9**: *ulzikaron bein einecha lemaan tihyê torat HaShem befichá*. E para lembrança entre teus olhos, para que a Toráh de HaShem esteja em tua boca. Aludindo aos tefilin, mas também ao Seder em si como gesto de memória corporal.

### Vayikra 23:5-8 — O Pessach no Calendário Litúrgico

Vayikra 23 lista os Moedim. Para Pessach:

▸ **15 de Nissan**: *mikra kodesh* (convocação santa) — primeiro dia.
▸ **Sete dias** de matsá.
▸ **21 de Nissan**: *mikra kodesh* — sétimo dia.
▸ Trabalho proibido no primeiro e sétimo dias; permitido nos intermediários (Chol haMoed) com restrições.

### Bamidbar 28:16-25 — As Oferendas Diárias

Detalha as oferendas adicionais (Korban Musaf) durante os sete dias de Pessach: dois touros, um carneiro, sete cordeiros, mais oferenda de farinha. Total: oferendas cumulativas substanciais.

### Devarim 16:1-8 — A Repetição Pré-Conquista

Quando Moshé repete os mandamentos antes de Israel entrar na Terra, recita as instruções de Pessach com algumas variações:

▸ **Verso 1**: *shamor et chodesh haAviv*. Guarda o mês da primavera. (A Toráh chama Nissan de mês da primavera porque coincide com primavera no Hemisfério Norte.)

▸ **Verso 3**: *lo tochal alav chametz*. Não comerás sobre ele chametz. E *lechem oni* — pão de aflição (matsá).

▸ **Versos 5-7**: Pessach futuro deveria ser celebrado **apenas no lugar que HaShem escolher** (Yerushalaim e Beit haMikdash, eventualmente). Após a destruição do Templo, a oferta do Korbán Pessach cessou; permanece apenas a refeição ritual (Seder).

### Profetas e Escritos — Continuidade

▸ **Yeshua bin Nun 5:10-12**: Israel celebra o **primeiro Pessach na Terra**, na planície de Yericho. O maná cessa neste momento; Israel começa a comer dos frutos da Terra.

▸ **2 Melachim 23:21-23**: o Rei Yoshiyahu restaura a celebração de Pessach na sua geração — *ki lo na''asá chaPessach hazê mimei haShoftim* (não se celebrou tal Pessach desde os dias dos Juízes). Indica que houve épocas em que Pessach foi negligenciado.

▸ **Ezrá 6:19-22**: Israel, após o retorno do exílio babilônico, celebra Pessach restaurado no Segundo Beit haMikdash.

▸ **2 Divrei haYamim 30**: o Rei Chizkiyahu restaura Pessach um mês depois (Pessach Sheni — segundo Pessach), por razões de pureza ritual. Esta passagem fundamenta o **Pessach Sheni** halácico (Bamidbar 9:6-13).

### Yechezkel 45:21-25 — O Pessach Messiânico

Yechezkel, descrevendo o Beit haMikdash messiânico, prescreve oferendas para Pessach:

*BaRishon, bearba''á asar yom lachodesh, yihyeh lachem haPessach, chag shvuot yamim matzot yeachel.*

No primeiro mês, no 14° dia do mês, será para vós o Pessach, festa de sete dias, em que matsot serão comidas.

A profecia confirma: **Pessach permanecerá no reino messiânico**, com Beit haMikdash restaurado e oferendas restauradas.

**Fonte:** Shemot 12-13; Vayikra 23:5-8; Bamidbar 9:1-14, 28:16-25; Devarim 16:1-8; Yehoshua 5:10-12; 2 Melachim 23:21-23; Ezrá 6:19-22; 2 Divrei haYamim 30; Yechezkel 45:21-25.',
  remez = 'Pessach é o Chag em que Israel **nasce como povo**. Antes do êxodo, eram família crescida de Yaakov; após o êxodo, são *am* — povo livre, com missão histórica. Cada Pessach reativa esta consciência fundadora.

### A libertação como condição da Toráh

A ordem é precisa: **primeiro Pessach, depois Sinai**. Sete semanas separam a libertação (15 Nissan) da entrega da Toráh (6 Sivan). Por quê? Porque **a Toráh não pode ser recebida por escravos**. Apenas homens livres podem aceitar mitzvot autenticamente.

A libertação física precede a recepção espiritual. Pessach prepara Shavuot. Sem Pessach, Sinai seria impossível.

Aplicação prática: qualquer libertação interna (de vícios, padrões, opressões pessoais) precede a chegada de novos compromissos espirituais autênticos. Não se pode receber novo nível enquanto se está escravizado ao antigo.

### O chametz como simbolismo profundo

A proibição total de **chametz** durante Pessach (8 dias) é uma das mitzvot mais severas do calendário. O chametz não pode ser apenas "evitado" — deve ser **eliminado** (*bi''ur chametz*), **vendido** ao não-judeu, **buscado** em toda a casa (*bedikat chametz*). O esforço é considerável.

Por quê? O **chametz** é fermento — massa que **inflou**. Inflar-se é, na linguagem rabínica, o pecado fundamental do **ego inflado**. Quem se eleva acima do que é, quem se torna "maior que sua verdade", está com chametz na alma.

A **matsá**, em contraste, é pão **plano** — massa sem fermento, comprimida e rápida. É o pão dos servos que correram para sair. Mas é também o pão dos humildes, dos que se mantêm em sua medida verdadeira sem inflar.

Pessach, portanto, é o Chag do **anti-ego**. Por oito dias, Israel vive sem chametz, simbolicamente sem ego inflado. É reset espiritual anual da alma.

### Cinco qualidades refinadas em Pessach

▸ **Memória ativa**: o Seder é exercício de memória. Não passiva, mas ativa — *contar*, *perguntar*, *responder*, *ver-se* como protagonista. Pessach treina memória como faculdade espiritual.

▸ **Liberdade autêntica**: distinguir entre liberdade real e libertinagem. A liberdade do êxodo era *libertação para servir HaShem* (Shemot 7:16: *shalach et ami veyaavduni*, deixa meu povo ir para que Me sirvam). Liberdade sem direção é nova escravidão.

▸ **Humildade da matsá**: o pão plano contra o pão inflado. Reset do ego anual.

▸ **Gratidão estruturada**: a Hagadá é manual de gratidão. Cada etapa lembra um aspecto. O Dayenu (*nos teria bastado*) ensina a agradecer por cada passo, mesmo incompleto.

▸ **Pertencimento ao povo**: o Seder é familiar e comunitário. Ninguém faz Pessach sozinho se puder evitar. Pertencer a Israel é parte estrutural da experiência.

### O Seder como dispositivo pedagógico

Os 15 passos do Seder (Kadesh, Urchatz, Karpas, Yachatz, Maguid, Rachatz, Motzi, Matzá, Maror, Korech, Shulchan Orech, Tzafun, Barech, Hallel, Nirtzá) compõem **sequência precisamente orquestrada** para transmitir a libertação. Cada passo tem função pedagógica e espiritual:

▸ **Kadesh** (Kidush sobre o primeiro copo): inauguração ritual.
▸ **Urchatz** (lavagem sem bracháh): purificação preparatória.
▸ **Karpas** (vegetal em água salgada): lágrimas dos escravos.
▸ **Yachatz** (partir a matsá do meio): a humildade que se reparte.
▸ **Maguid** (narrar a história): núcleo da Hagadá, com perguntas, respostas, pragas, Hallel parcial.
▸ ...

E assim por diante. Cada passo carrega séculos de kavaná acumulada.

### A pergunta das crianças

A Hagadá tem em seu centro **Ma Nishtaná** — quatro perguntas das crianças sobre o que torna esta noite diferente. A presença das crianças é central. Sem crianças (ou na ausência delas, sem audiência que pergunte), o Seder ainda é cumprido — mas perde sua dimensão essencial.

A tradição (Talmud Bavli, Pessachim 116a) ordena: *afilu kulanu chachamim, kulanu nevonim, kulanu zekenim, kulanu yodim et haToráh, mitzvá aleinu lesaper biytziat Mitzraim*. Mesmo que todos sejamos sábios, todos entendidos, todos anciãos, todos conhecedores da Toráh, é mitzvá para nós contar a saída do Mitzraim. **A obrigação de contar nunca cessa**, porque cada geração precisa ouvir como nova.

### A inversão hierárquica do Seder

Durante o Seder, Israel inverte hierarquias normais:

▸ **Recosta-se** ao comer matsá e beber vinho (postura de homens livres romanos, paradoxalmente).
▸ **Bebe quatro copos** de vinho (apenas quem é livre pode escolher beber).
▸ **A criança questiona o adulto** (geralmente é o contrário).
▸ **O escravo se torna mestre** da própria narrativa.

Tudo é cuidadosamente orquestrado para fazer cada participante **sentir-se livre**. Sentir, não apenas saber. A Hagadá é dispositivo experiencial, não puramente intelectual.

### A libertação que continua

Pessach não é apenas memória de evento antigo. É **template da libertação contínua**. Em cada geração, há "Mitzraim" próprio — opressões pessoais, culturais, espirituais. Em cada Pessach, Israel é convocado a identificar seu próprio Mitzraim e sair dele.

A Brit Im Mashiach lê esta dimensão com seriedade: o ano que se passou trouxe escravidões novas? O ano que se inicia oferece novas libertações? Pessach é o momento anual para fazer este balanço e empurrar para fora aquilo que ainda escraviza.

**Fonte:** Shemot 12-15; Mishná Pessachim 10; Talmud Bavli, Pessachim 115b-118a; Mishné Toráh, Hilchot Chametz uMatzá 7-8; Hagadá de Pessach com comentários clássicos; Maharal, Gevurot HaShem.',
  drash = '### Peshat — o sentido literal

Pessach, no Peshat, é o Chag que comemora a libertação histórica do Mitzraim. Shemot 12-15 narra os eventos: a noite das pragas dos primogênitos, a saída precipitada, a perseguição egípcia, a travessia do Yam Suf. A Toráh prescreve 7 dias (ou 8 na diáspora) de Chag haMatzot, com proibição de chametz, eliminação prévia, e celebração ritual.

As mitzvot centrais: Korbán Pessach (suspenso pós-destruição do Templo), matsá, maror, Hagadá, Arba Kosot, Hallel. O Chag inaugura o calendário religioso (Nissan = Rosh Chodashim).

### Remez — a alusão velada

O nome **Pessach** (פסח) tem três interpretações etimológicas, todas válidas:

▸ **Pasach** (saltar/pular sobre): HaShem "saltou" as casas de Israel na praga (Shemot 12:13).
▸ **Pesach al** (passou por cima de): mesma raiz, outro sentido.
▸ **Peh-sach** (boca que fala): o Chag é da Hagadá — a boca conta. Tradição cabalística (Ari).

A palavra carrega as três simultaneamente. Pessach é **passagem física, passagem espiritual, e passagem narrativa** — tudo ao mesmo tempo.

E o **chametz como inflar do ego** (já tratado em 04) é alusão profunda: por 8 dias, Israel desinfla simbolicamente o ego, comendo o pão dos servos que saíram em pressa. Esta humildade ritualisticamente codificada é o tikun anual do ego inflado.

### Drash — o ensino homilético

O **Mishná Pessachim 10:5** estabelece a regra de ouro: *bechol dor vador chayav adam lir''ot et atzmó keilu hu yatzá miMitzraim*. Em cada geração, cada pessoa é obrigada a ver-se como se ela mesma houvesse saído do Mitzraim.

A frase é precisamente formulada. Não diz "lembrar" (זכר, *zachor*) — diz **"ver-se"** (לראות, *lir''ot*). Ver é mais que lembrar. Lembrar é cognitivo; ver é experiencial. **O Seder é dispositivo para fazer ver, não apenas lembrar**.

Por isto:

▸ Recostamo-nos como homens livres (gesto corporal).
▸ Bebemos vinho como festejantes (gesto corporal).
▸ Comemos matsá como aqueles que partiram em pressa (gesto corporal).
▸ Comemos maror para sentir o amargor (gesto corporal).
▸ Contamos a história em voz alta (gesto vocal).
▸ Crianças perguntam, adultos respondem (gesto dialógico).

Tudo no Seder é gesto, não apenas conceito. **A redenção entra pelo corpo**, não só pela mente.

Outro Drash: por que **três matsot** se a refeição usaria duas (paralelo a Shabat)? Porque a terceira é especificamente para a **mitzvá de matsá** — uma das três é "quebrada" para esta finalidade. Esta peculiaridade ensina que **Pessach exige mais que Shabat**: onde o Shabat se faz com duas, Pessach exige três. **Salvação supera Criação em complexidade ritual** — porque salvação é re-criação.

### Sod — o segredo kabalístico

A tradição luriânica (Ari haKadosh, Pri Etz Chaim, Shaar Chag haMatzot) ensina que Pessach é o **portal anual da liberdade espiritual**. O Mitzraim físico (Egito antigo) foi específico, mas o Mitzraim cósmico se reativa em cada geração, e cada Pessach abre a porta de saída.

**Mitzraim** (מצרים) tem raiz em *meitzar* (מצר, estreito/aperto). O nome do Egito antigo é também nome de qualquer **estreitamento espiritual**. Cada um de nós tem seu Mitzraim — opressão pessoal, padrão escravizador, vício, hábito que limita. Pessach é o dia anual de **sair** do meu Mitzraim específico.

E a estrutura sefirótica do Seder (já tratada em 05) opera nos quatro Olamot:

▸ **Asiáh** (1° copo, Kadesh): libertação do mundo físico.
▸ **Yetziráh** (2° copo, Maguid): libertação do mundo emocional.
▸ **Briáh** (3° copo, Barech): libertação do mundo mental.
▸ **Atzilut** (4° copo, Hallel): libertação ao nível espiritual mais alto.

Quem bebe os quatro copos com kavaná consciente atravessa, em sequência, os quatro mundos. Termina, na 4ª taça, conectado a *Atzilut* — o mundo da emanação divina pura.

A **matsá** corresponde, no Sod, à *Or pura sem klipá* — a essência sem revestimento egoico. Comer matsá é internalizar Or pura. O *kazait* (medida mínima, ~27g) por cada uma das três matsot do Seder corresponde aos três níveis de Or que descem: *Nefesh, Ruach, Neshamáh*.

E o **afikoman** (matsá escondida e comida ao final) corresponde, no Sod, à *Or do Mashiach* — luz oculta que se encontra ao fim do banquete. Por isto o sabor permanece na boca por horas (halacháh proíbe comer outra coisa após afikoman): para que o gosto do Mashiach impregne o Israel até o fim do Chag.

### O Sod da travessia do Yam Suf

No **sétimo dia** (21 Nissan), Israel atravessa o **Yam Suf** (Mar Vermelho). Este é o **clímax sefirótico** de toda Pessach.

A tradição (Ari, Zohar Beshalach) ensina: as águas do Yam Suf representam, no Sod, **Bináh** (a Mãe celestial) em estado de fluxo bruto. Quando Bináh está em sua expansão máxima, é como mar que se pode atravessar — perigoso, mas penetrável para os escolhidos.

Israel atravessou pelo meio do mar. **Levou consigo a Or de Bináh** ao outro lado. Por isto, após a travessia, Moshé e Israel cantam **Shirat haYam** (Shemot 15) — a canção que celebra a posse da Or de Bináh.

Os egípcios, que tentaram seguir, **se afogaram em Bináh**. Não eram escolhidos para receber a Or; o fluxo os destruiu. Israel é o único povo capaz de atravessar Bináh viva.

Esta é, no Sod, a vocação eterna de Israel: **portar a Or de Bináh em direção ao mundo**. Cada Pessach reafirma esta vocação.

### A síntese

Os quatro níveis:

▸ **Peshat**: Chag da libertação histórica do Mitzraim, com mitzvot precisas.
▸ **Remez**: Pessach = passagem física+espiritual+narrativa; chametz = ego inflado; Israel = portador da Or.
▸ **Drash**: ver-se como tendo saído (não apenas lembrar); três matsot superando duas de Shabat (salvação supera Criação); matsá-maror-Pessach como tríade do Beit haMikdash em miniatura.
▸ **Sod**: Mitzraim como estreitamento eterno; quatro copos = quatro Olamot; matsá = Or pura; afikoman = Or do Mashiach; Yam Suf = Bináh atravessada.

A Brit Im Mashiach vive Pessach nos quatro níveis simultâneos. Reconhece em cada Seder não apenas memória de evento antigo, mas vivência da **libertação contínua** — a histórica que foi, a presente que opera, e a futura messiânica que vem. O Kos shel Eliyahu cheio sobre a mesa testemunha: ainda há liberdade a vir, e Pessach aguarda.

**Fonte:** Mishná Pessachim 10:5; Talmud Bavli, Pessachim 116a; Shemot 12-15; Ari haKadosh, Pri Etz Chaim, Shaar Chag haMatzot; Shaar haKavvanot, Inyan haSeder; Zohar Beshalach 52a-55b; Maharal, Gevurot HaShem.',
  sod = 'Pessach, no Sod, é o **nascimento cósmico de Israel** como povo. Toda a estrutura espiritual do Chag — Seder, Arba Kosot, matsá, maror, afikoman — opera no nível dos Olamot uma sequência precisa de tikun.

### As Arba Kosot e os quatro Olamot

Os **quatro copos de vinho** (Arba Kosot) do Seder correspondem, na tradição luriânica (Ari haKadosh, Pri Etz Chaim, Shaar Chag haMatzot), aos quatro Olamot:

▸ **Primeiro copo** (Kadesh, no Kidush) → *Asiáh* (mundo da ação). Israel libertada do Mitzraim materialmente.
▸ **Segundo copo** (após Maguid, antes da refeição) → *Yetziráh* (mundo da formação). Israel formada como povo.
▸ **Terceiro copo** (após Birkat haMazon) → *Briáh* (mundo da criação). Israel criada como nação espiritual.
▸ **Quarto copo** (após Hallel) → *Atzilut* (mundo da emanação). Israel unida à fonte divina.

Beber os quatro copos é, no Sod, subir pelos quatro Olamot em sequência. Cada copo é um nível elevado.

Há também tradição de **um quinto copo** — o **Kos shel Eliyahu** (Copo de Eliyahu) — que se enche mas não se bebe. Este copo corresponde a um **quinto Olam** suposto, ou alternativamente à **Sefiráh de Keter** que está acima dos quatro Olamot. Eliyahu virá anunciar Mashiach; o copo aguarda sua presença para ser bebido finalmente.

### As Quatro Expressões de Redenção

As Arba Kosot derivam-se diretamente de **Shemot 6:6-7**, quatro verbos consecutivos de redenção:

▸ *Vehotzeti etchem mitachat sivlot Mitzraim* — vos tirarei de baixo dos fardos do Mitzraim.
▸ *Vehitzalti etchem meavodatam* — vos livrarei do trabalho deles.
▸ *Vegaalti etchem bizroa netuyá* — vos resgatarei com braço estendido.
▸ *Velakachti etchem li leam* — vos tomarei para Mim como povo.

Os quatro estágios da redenção: tirar, livrar, resgatar, tomar. Não são sinônimos — são fases progressivas. **Cada copo do Seder marca uma fase**.

E o **quinto verbo** vem em Shemot 6:8: *vehevê''ti etchem el haarets* — vos trarei à Terra. Este verbo, segundo o Talmud Yerushalmi, fundamenta o Kos shel Eliyahu — porque a entrada na Terra de Israel em sua plenitude só ocorrerá com Mashiach. Por isto o copo aguarda.

### Matsá como Or descendente

A **matsá** corresponde, no Sod, à **Or pura sem invólucro**. O chametz é Or "envolta em casca" — fermentação como expansão egoica. A matsá é Or no estado mais puro, antes da klipá se formar.

A tradição luriânica ensina que comer matsá no Seder é **internalizar Or pura**. Por isto a primeira matsá é comida em silêncio total — sem palavras, sem interrupções. A Or entra direto, sem mediação verbal.

### Maror como klipá vencida

O **maror** (ervas amargas) corresponde, no Sod, às **klipot** (cascas espirituais que envolvem a kedushá). Comer maror é, no Sod, **engolir e transformar as klipot**. Não fugir delas, mas absorvê-las para que sejam dissolvidas internamente.

Por isto o maror é seguido imediatamente pela **matsá com maror** (Korech, sanduíche de Hilel) — combinação que ensina: a Or pura (matsá) e a klipá (maror) coexistem na vida real; o sábio sabe vivê-las juntas sem se perder na primeira nem ser dominado pela segunda.

### Afikoman como Tzafun

O **afikoman** é a metade da matsá que se **esconde** durante o Seder e se come no final. Seu nome é tradicionalmente derivado do grego *epikomion* (sobremesa, ou "o que vem depois"). Mas a tradição cabalística (Ari) lê *Tzafun* — escondido — como termo central. *Yachatz* (quebrar) e *Tzafun* (esconder) são os dois passos do afikoman.

A matsá quebrada e escondida representa, no Sod, **a luz oculta do Mashiach**. A criança procura e encontra (em muitas tradições); este achado simboliza a busca pelo Mashiach que ainda está oculto. Quando achado, o afikoman é comido como **última comida do Seder** — selo final que mantém o sabor do Chag na boca por horas.

### A liberdade em quatro letras

A palavra hebraica *Cheirut* (חירות, liberdade) tem valor numérico **624**. Multiplicado por 2 = 1248. Curiosamente, o **YOM HASHISHI** (sexto dia) tem valor 624 quando contado de modo similar.

Mais significativo: *Cheirut* + *Chag* (חג = 11) = 635. *Pessach* (פסח) = 148. Soma das três palavras-chave: 624 + 11 + 148 = **783**. Este número, dividido por 3, dá 261 = valor de *Eliyahu* (אליהו). A guematria confirma: a liberdade do Chag do Pessach está estruturalmente conectada a Eliyahu — o anunciador do Mashiach.

### A travessia do Yam Suf

No **sétimo dia de Pessach** (21 de Nissan), Israel atravessou o **Yam Suf** (Mar Vermelho). Este é o momento culminante da libertação histórica.

No Sod, atravessar o Yam Suf é, em camada profunda, **atravessar o estado de Bináh** (a Mãe celestial). As águas se dividiram para Israel passar — *vamayim lahem chomá*, e as águas para eles foram muro (Shemot 14:22). As águas representam, no Sod, a Or de Bináh em estado de fluxo bruto. Apenas Israel, povo escolhido, passou pelo meio do fluxo sem se afogar.

A *Shirat haYam* (Cântico do Mar) que se canta após a travessia (Shemot 15) é, no Sod, **cântico cósmico de Israel descobrindo sua identidade**. Por isto se canta este Cântico em **todas as manhãs** durante o ano inteiro — mas em Pessach se lê no Shabat dentro de Chol haMoed com kavaná particular.

### A relação Pessach-Shavuot via Sefirat haOmer

A **Sefirat haOmer** começa na segunda noite de Pessach e dura 49 dias até Shavuot. Esta contagem é, no Sod, **purificação ascensional**. Cada dia refina uma combinação de duas Sefirot inferiores (Chesed sheBeChesed no dia 1, até Malchut sheBeMalchut no dia 49).

Aquele que cumpre Pessach + Sefirat haOmer + Shavuot atravessa o ciclo completo de transformação: libertação → purificação → recepção da Toráh. Os três Chagim juntos compõem **a estrutura espiritual fundadora de Israel**.

### A síntese

▸ **Arba Kosot** = quatro Olamot subindo de Asiáh a Atzilut.
▸ **Quatro verbos de redenção** + 5° verbo (Kos shel Eliyahu) = redenção em quatro estágios + reserva para Mashiach.
▸ **Matsá** = Or pura sem klipá.
▸ **Maror** = klipá engolida e transformada.
▸ **Afikoman/Tzafun** = luz oculta do Mashiach, achada ao final.
▸ **Travessia do Yam Suf** = passagem por Bináh sem afogamento.
▸ **Sefirat haOmer** = purificação ascensional Pessach→Shavuot.

Quem celebra Pessach com kavaná consciente de todos esses níveis opera, no Sod, a própria estrutura cósmica do nascimento espiritual de Israel.

**Fonte:** Ari haKadosh, Pri Etz Chaim, Shaar Chag haMatzot; Shemot 6:6-8; Shaar haKavvanot, Inyan haSeder; Zohar Bo 33b-44a; Maharal, Gevurot HaShem.'
WHERE slug = 'pessach';
COMMIT;
-- PaRDeS do Chag: purim
-- Idempotente: atualiza apenas colunas peshat/remez/drash/sod
BEGIN;
UPDATE chagim SET
  peshat = 'Purim tem sua fonte na **Megilat Esther**, livro completo do Tanach (Ketuvim), com 10 capítulos. É o único Chag pós-êxodo que tem fundação direta em livro canônico do Tanach.

### A Megilá em sete capítulos-chave

▸ **Esther 1**: o banquete do rei Achashverosh, a queda de Vashti.
▸ **Esther 2**: a escolha de Esther como nova rainha; Mordechai descobre conspiração contra o rei.
▸ **Esther 3**: ascensão de Haman; decreto contra os judeus, escolha do dia 13 de Adar por sorteio (*pur*).
▸ **Esther 4**: o jejum de três dias; Esther se decide a falar com o rei (*kacha aavdá... avádeti*: se eu perecer, perecerei).
▸ **Esther 5-7**: os dois banquetes de Esther; queda de Haman.
▸ **Esther 8-9**: novo decreto autorizando os judeus a defenderem-se; vitória; estabelecimento de Purim.
▸ **Esther 10**: epílogo sobre Mordechai como segundo na corte real.

### Os personagens centrais

▸ **Achashverosh** (Xerxes I, reinou 486-465 a.C.): rei do Império Persa, abrangendo da Índia à Etiópia (Esther 1:1). Não é vilão; é apenas impulsivo, embebedado, manipulável. Faz o decreto contra os judeus sem entender contra quem é; depois, sem pestanejar, faz decreto a favor.

▸ **Vashti**: primeira rainha, deposta por desobediência. Sua queda abre o caminho para Esther.

▸ **Esther** (nome hebraico: *Hadassah* — mirta): órfã judia, criada por Mordechai. Torna-se rainha mantendo sua identidade oculta.

▸ **Mordechai**: primo e tutor de Esther, da tribo de Binyamin. Reconhece a iminência da catástrofe; resiste; convence Esther; salva o povo.

▸ **Haman**: vizir de Achashverosh, "o Agagita" — descendente de Agag, rei de Amalek (que Saul falhou em executar em 1 Shmuel 15). Carrega o ódio ancestral de Amalek contra Israel.

### A ausência do Nome divino

A Megilat Esther é o **único livro do Tanach** em que o nome de HaShem (Tetragrama ou Elohim) **não aparece** explicitamente. Nenhuma vez nos 10 capítulos.

Mas a tradição vê o nome **oculto** em diversos versículos por acróstico (primeiras letras de quatro palavras consecutivas formam o Tetragrama). Por exemplo, em Esther 5:4: *yavó **h**amelech **v**ehaman **h**ayom el **h**amishtê* (venha o rei e Haman hoje ao banquete) — primeiras letras: HVHH (forma do Tetragrama).

O ocultamento é teologicamente proposital. Purim é o Chag em que HaShem opera *sem se nomear*, por trás dos eventos. *Hester panim* (ocultamento da face) é o tema.

### Por que entrou no Tanach

A canonização de Esther foi controvertida nos tempos antigos. Razões para incluí-la:

▸ Comemora a salvação real do povo judeu.
▸ Mordechai e Esther a instituíram explicitamente como leitura anual obrigatória (Esther 9:21).
▸ Tem profundidade espiritual única (a teologia do ocultamento).
▸ Em geração após geração, foi sustentada como prática viva.

### Conexão com Amalek

Haman é chamado **Agagita** (Esther 3:1), descendente de Agag, rei amalequita. Saul foi ordenado a destruir Amalek (1 Shmuel 15) e falhou em parte, poupando Agag. O resíduo da semente amalequita gerou, gerações depois, Haman.

A tradição (Talmud Bavli, Megilá 13b) ensina: o que Saul deixou inacabado, Mordechai e Esther completaram. Purim é, em camada profunda, o **acabamento de uma mitzvá incompleta** de séculos antes.

A obrigação de destruir Amalek (Devarim 25:17-19) é mitzvá eterna. Purim é o dia em que Israel a cumpre simbolicamente cada ano.

### Datação histórica

Os eventos da Megilá ocorreram aproximadamente em 480 a.C., durante o reinado de Xerxes I. Foram codificados como Chag por Mordechai e Esther logo após (Esther 9:20-32). A celebração foi continuamente observada desde então — uma das mais antigas práticas judaicas ininterruptas.

**Fonte:** Megilat Esther completa (10 capítulos); Talmud Bavli, Megilá 7a-19a, especialmente 13b sobre Amalek; Devarim 25:17-19; 1 Shmuel 15; Mishné Toráh, Hilchot Megilá uChanukáh 1.',
  remez = 'Purim é o Chag do **HaShem oculto que opera sem se nomear**. Em todos os outros Chagim, HaShem aparece declaradamente: criou em Bereshit (Shabat), entregou a Toráh no Sinai (Shavuot), libertou do Mitzraim (Pessach), perdoa em Yom Kippur. Em Purim, **Seu Nome não está escrito**. Mas Sua mão está em cada virada da história.

### A teologia do Hester Panim

*Hester panim* significa "ocultamento da face". É conceito teológico judaico para os tempos em que HaShem não age publicamente, não responde abertamente, parece ausente. A Megilá inteira ocorre em estado de hester panim — e ainda assim a salvação acontece.

A lição é poderosa para a vida cotidiana. Há momentos em que oramos e parece que ninguém ouve. Há períodos em que pedimos sinais e nada vem. **Purim ensina que mesmo nessas horas, HaShem está agindo**. Apenas, está agindo sob a face oculta, através de eventos que só posteriormente revelam sua coerência.

Esther é exemplo. Quando aparece pela primeira vez na Megilá (capítulo 2), parece apenas uma jovem órfã sortuda. Apenas posteriormente entende-se que ela foi colocada na posição de rainha **exatamente para salvar Israel** — *mi yodea im le''et kazot higaat lamalchut* (quem sabe se para um momento como este chegaste à realeza, Esther 4:14).

### Cinco qualidades refinadas em Purim

▸ **Vigilância**: Mordechai descobre tanto a conspiração contra o rei (cap. 2) quanto o decreto de Haman (cap. 4). Ele observa o que outros não veem. Purim treina vigilância espiritual.

▸ **Coragem em risco real**: Esther arrisca a vida ao apresentar-se ao rei sem ser convocada. Coragem em momento decisivo, mesmo sem garantia de sucesso. *Kaasher avadeti avadeti* (se eu perecer, perecerei) é o ápice da coragem judaica.

▸ **Jejum corporativo**: três dias de jejum coletivo (Esther 4:16) precedem a ação de Esther. Israel sabe que sem oração, a coragem humana é insuficiente. Purim ensina que ação precisa de oração prévia.

▸ **Generosidade dirigida**: matanot la''evyonim (presentes aos pobres) é mitzvá central. Esther salvou Israel; agora Israel salva o pobre. Compaixão é o cumprimento ético do milagre.

▸ **Alegria celebrativa**: *yemei mishtê vesimchá* (dias de banquete e alegria) é mandamento explícito. Purim sem alegria autêntica falha em cumprir-se. A alegria não é decoração; é mitzvá.

### A inversão como princípio

A palavra-chave *venahafoch hu* (e reverteu-se, Esther 9:1) é princípio teológico amplo. **O destino aparente não é o destino real**. Haman, no auge de seu poder, parecia próximo do triunfo. Mordechai, próximo da forca. Mas o que pareceu um final foi apenas o ponto de viragem. **O que parece fim, em Israel, frequentemente é o início**.

Aplicação prática: nos momentos mais escuros da vida pessoal ou comunitária, a tradição judaica ensina a esperar a inversão. Não por otimismo ingênuo, mas por experiência histórica acumulada de milênios. Purim é o protótipo anual desta esperança.

### A máscara como verdade

A tradição de **vestir fantasias** em Purim parece superficial, mas tem fundamento profundo. Por que mascarar-se em dia de salvação?

Porque a máscara mostra duas verdades simultaneamente:

▸ **O eu visível pode estar disfarçando o eu real** (Esther escondeu sua identidade no palácio).
▸ **O outro também pode estar disfarçado**: aquele que parece insignificante pode ser o Mashiach disfarçado; aquele que parece amigo pode ser inimigo; aquele que parece humilde pode ser elevadíssimo.

Vestir máscara em Purim é admitir: **nenhum de nós sabe quem cada um é, em verdade**. Apenas HaShem sabe. Esta humildade epistêmica abre espaço para a Misericórdia.

### O vinho como dissolvente

*Ad delo yada* (até não distinguir entre maldito Haman e bendito Mordechai). O vinho, em moderação, dissolve as fronteiras que o ego ergueu. Por algumas horas em Purim, a comunidade vê-se sem hierarquias rígidas, sem ressentimentos antigos, sem competições disfarçadas.

Aqui não se trata de embriaguez literal — que tem consequências negativas reais — mas de **descontração intencional** que permite reencontros que o resto do ano impede. Quando o vinho entra, o segredo sai (*nichnas yayin, yatzá sod*, Talmud Bavli, Eruvin 65a). E em Purim, isto é mitzvá.

### A esperança da reversão final

Purim aponta, no Drash messiânico, para a **inversão final dos tempos**. Quando o Mashiach reinar, todo o sofrimento histórico de Israel será revertido. Haman simbólico — toda força que tentou destruir Israel ao longo dos milênios — será visto como derrotado. *Venahafoch hu* em escala cósmica.

A Brit Im Mashiach lê Purim com esta esperança: cada *venahafoch hu* local que vemos hoje na história é ensaio do *venahafoch hu* universal que vem.

**Fonte:** Megilat Esther; Talmud Bavli, Megilá 7a-19a; Talmud Bavli, Eruvin 65a; Mishné Toráh, Hilchot Megilá uChanukáh; Maharal, Or Chadash sobre Esther.',
  drash = '### Peshat — o sentido literal

Purim, no Peshat, comemora a salvação dos judeus do Império Persa em ~480 a.C., conforme narrado em Megilat Esther. Os judeus, ameaçados de extermínio pelo decreto de Haman, foram salvos pela coragem de Esther e Mordechai. Em 14 de Adar (15 nas cidades muradas), Israel celebra a vitória.

As quatro mitzvot: leitura da Megilá, mishloach manot, matanot la''evyonim, seudat Purim. Mais o jejum prévio (Ta''anit Esther, 13 de Adar) e o anúncio "*mishenichnas Adar marbim besimchá*" (com a entrada de Adar, aumenta-se a alegria).

### Remez — a alusão velada

O nome **Purim** vem de *pur* (sorte). Haman lançou *pur* para escolher o dia da destruição. O nome do Chag preserva esta palavra como **antífrase**: o que era símbolo de morte tornou-se símbolo de vida. Israel comemora o instrumento que falhou.

E os **dois nomes de Esther** (Hadassah, nome judaico; Esther, nome persa) aludem ao duplo papel de Israel: identidade interna preservada vs identidade externa exigida pelo ambiente. Esther vive nos dois mundos, e nisto é figura de Israel inteiro no exílio.

O **número 13** (do decreto de Haman, 13 de Adar) é numericamente *echad* (אחד = 13) — Um. A tentativa de destruir Israel ocorre precisamente no dia que afirma a unicidade de HaShem. Por isto Israel sobrevive: porque o número de sua destruição é também o número de sua aliança eterna.

E o **número 14** (Purim) somado a 15 (Shushan Purim) é **29**, valor numérico de *dchaq* (compressão/aperto). Purim é o dia em que a compressão histórica de Israel se manifesta — mas também é o dia em que ela se desfaz. *Venahafoch hu*.

### Drash — o ensino homilético

O **Talmud Bavli, Megilá 7b** discute o famoso *ad delo yada*. Rabá interpretou literalmente, e há uma narrativa subsequente em que ele e Rav Zera bebeu juntos e, em estado etilizado, Rabá supostamente "matou" Rav Zera (que foi ressuscitado por oração no dia seguinte).

A história é homilética, não histórica. Ensina: a embriaguez literal é **perigosa**, mesmo entre justos. O *ad delo yada* deve ser entendido com moderação, como conclui a maioria dos poskim. Os limites de saúde, segurança e respeito permanecem.

Outro Drash: *mishenichnas Adar marbim besimchá*. Por que aumentar **alegria** especificamente em Adar? Porque Adar é o mês das **inversões**. Quando Haman lançou *pur*, viu que Adar caiu (porque Moshé morreu em Adar). Achou que era mês "ruim" para Israel. Não percebeu que Moshé também **nasceu** em Adar — a inversão estava codificada desde o início. O mês das mortes é também o mês dos nascimentos. Em Adar, alegre-se sempre — porque mesmo o pior tem inversão preparada.

### Sod — o segredo kabalístico

A tradição (Maharal, Or Chadash; Ari haKadosh, Shaar haKavvanot) ensina: Purim opera no nível mais profundo dos Olamot. **Yom haKippurim** (Yom Kippur) significa, segundo certa leitura, *Yom ke-Purim* — "Dia como Purim". Isto coloca Purim como **paradigma**, e Yom Kippur como sua imitação.

Por quê? Em Yom Kippur, a alma se purifica **por aflição** — jejum, vidui, contrição. É caminho linear: penitência → perdão. Mas em Purim, a alma se purifica **por alegria** — banquete, vinho, fantasias. É caminho paradoxal: regozijo → revelação.

O paradoxo do segundo caminho é mais profundo. **Alegrar-se em meio ao exílio** (que ainda não terminou) exige fé maior que **arrepender-se de pecados conhecidos**. Por isto Purim, no Sod, é o ápice da fé judaica.

Esther como **Malchut em exílio** (já tratado em 05) atinge sua plenitude espiritual quando aceita seu papel oculto. Quando declara *kaasher avadeti avadeti* (se eu perecer, perecerei, Esther 4:16), ela se entrega à possibilidade da morte — e nessa entrega, paradoxalmente, recebe a vida e a vitória.

Esta é estrutura messiânica: a morte vencida pela entrega à própria morte. **Não é teologia substitutiva**, mas padrão presente na história de Israel e cumprível em cada geração por cada justo.

### A guematria final

A palavra *Esther* (אסתר) tem valor numérico **661**. *Aryê* (אריה, leão) tem valor 216. *Esther minus aryê* = 445. Hmm, exercício de guematria não rende aqui.

Mais significativamente: *Mordechai* (מרדכי) = **274**. *Esther* = 661. Somados: **935**. Este número, dividido por 7, dá ~133, próximo ao valor numérico de *machaneh* (acampamento). Mordechai-Esther formam, no Sod, **acampamento integral de Israel** — homem-mulher, Tiferet-Malchut, ação-receptividade. O par é completo.

E *Haman* (המן) = 95. *Esther* + *Mordechai* = 935 = 95 × ~10. Mordechai+Esther superam Haman por fator de 10 — número da plenitude (10 Sefirot). A guematria mesma afirma que a aliança Israel é sempre **dez vezes mais forte** que qualquer Haman.

### A síntese

Os quatro níveis juntos:

▸ **Peshat**: salvação histórica dos judeus persas, quatro mitzvot rabínicas.
▸ **Remez**: *pur* invertido, Hadassah-Esther como dois mundos, 13 = Um, 29 = compressão desfeita.
▸ **Drash**: *ad delo yada* com moderação, Adar como mês das inversões, Yom haKippurim como "Yom ke-Purim".
▸ **Sod**: Esther como Malchut em exílio, alegria como caminho de fé superior, Mordechai-Esther como acampamento completo.

A Brit Im Mashiach vive Purim nos quatro níveis simultâneos. Reconhece nele o ensaio anual da **inversão messiânica final**, em que toda forma histórica de Haman será definitivamente derrotada, e *venahafoch hu* será cumprido em escala cósmica universal.

**Fonte:** Megilat Esther; Talmud Bavli, Megilá 4a-22a, especialmente 7b; Maharal, Or Chadash; Ari haKadosh, Shaar haKavvanot, Inyan Purim; Bnei Yissachar, Maamarei Adar.',
  sod = 'Purim, no Sod, é o Chag em que **Malchut** (a Shechiná no exílio) opera salvação sob disfarce. Toda a estrutura espiritual do Chag é codificada em uma única expressão: *hester panim* — o ocultamento da face divina que paradoxalmente revela a Presença mais profunda.

### Esther como Malchut em exílio

O nome **Esther** (אסתר) tem raiz em *seter* (סתר), ocultamento. Ela é Malchut (a Shechiná) personificada em situação de exílio absoluto: separada de seu povo (no palácio persa), com identidade oculta, casada com rei pagão, aparentemente perdida para a comunidade judaica.

E ainda assim, no momento decisivo, Malchut age. **Esther salva Israel não apesar do exílio, mas através do exílio**. A posição que parecia perdição se revela ser exatamente a posição necessária para salvar o povo. Esta é a estrutura do Sod de Purim.

A tradição luriânica ensina que cada exílio de Israel tem este padrão. Malchut está oculta em meio às nações, parecendo perdida, mas está ali para realizar tikun cósmico do qual nem ela mesma sabe completamente. Apenas no momento certo (*le''et kazot*), a Malchut age e tudo se reverte.

### Mordechai como Tiferet

Se Esther é Malchut, **Mordechai** é **Tiferet** (a Sefiráh masculina central, harmonia). Ele é o canal pelo qual a Or do mundo de Atzilut desce até Esther/Malchut, e através dela ao povo. Mordechai está fora do palácio, mas conectado a Esther; representa a Or que vem de fora do exílio, ainda em conexão com a realeza divina.

A união Mordechai-Esther (não nupcial, mas cooperativa) é, no Sod, o **yichud Tiferet-Malchut** operando dentro do exílio. Quando Tiferet e Malchut estão unidos, mesmo no escuro, a salvação acontece.

### Haman como Amalek e Klipá

**Haman**, descendente de Agag, representa **Amalek** — a força arquetípica que tenta destruir Israel em cada geração. Mas em camada mais profunda, representa a **Klipá** (a casca espiritual oposta que envolve a kedushá).

A tradição (Maharal de Praga, Or Chadash) ensina que Amalek/Haman é a força do **acaso** — *mikrê*, em hebraico. Em Devarim 25:18, está escrito *karcha baderech* (te encontrou no caminho), com raiz em *mikrê* (acaso). Amalek é a filosofia segundo a qual o mundo é regido pelo acaso, não pela Providência divina.

Por isto Haman lança *pur* (sorte). Crê que o destino é resultado de dados. Mas a Megilá revela: o que pareceu sorte aleatória foi providência divina disfarçada. Cada lance do *pur* já estava sob o controle de HaShem.

### Os 13 dias de jejum

Esther proclama três dias de jejum antes de se apresentar ao rei (Esther 4:16). Estes três dias correspondem, no Sod, ao **purificação dos três níveis emocionais inferiores** (Netzach, Hod, Yessod) antes que Malchut suba.

A tradição estabeleceu também o **Ta''anit Esther** (Jejum de Esther) no 13 de Adar, dia anterior a Purim. Marca o jejum original. Quem jejua, opera tikun preparatório para a alegria do dia seguinte.

### A guematria de Amalek

Amalek (עמלק) tem valor numérico **240**. *Safek* (ספק, dúvida) tem o mesmo valor: 240. Amalek é, no Sod, a **força da dúvida** — a klipá que faz Israel duvidar de HaShem.

Quando os judeus na Pérsia ouviram o decreto de Haman, muitos duvidaram. Muitos pensaram: "talvez não haja providência, talvez sejamos abandonados, talvez seja fim". A própria Megilá registra esta tensão. Mas Mordechai e Esther agiram **apesar da dúvida**, e a dúvida foi vencida pela ação corajosa.

Purim é o Chag de derrotar o Amalek interno — a dúvida que paralisa. Cada celebração de Purim é tikun para a dúvida coletiva e individual.

### A inversão sefirótica

*Venahafoch hu* (e reverteu-se) é, no Sod, **inversão sefirótica**. As Sefirot que pareciam derrotadas (Esther submetida no palácio, Mordechai humilhado por Haman) se revertem em vitória. As que pareciam vitoriosas (Haman ascendente, o decreto persa) se revertem em queda.

Esta inversão é a operação cósmica de Purim. Não é justiça humana; é mecanismo espiritual que opera por trás das aparências.

### Por que mais alto que Yom Kippur

A tradição (Ari haKadosh, Shaar haKavvanot) ensina que **Yom haKippurim** pode ser lido como *Yom ke-Purim* — "Dia como Purim". Em outras palavras: Purim é o **paradigma**, e Yom Kippur é "como Purim".

Esta leitura paradoxal ensina algo profundo: em Yom Kippur, Israel se purifica **por aflição** (jejum, vidui). Em Purim, Israel se purifica **por alegria** (banquete, vinho, fantasias). Os dois caminhos chegam ao mesmo destino, mas Purim é, em camada profunda, o caminho mais difícil — porque alegria autêntica em meio ao exílio exige fé mais profunda que aflição programada.

### A futura permanência de Purim

A tradição (Yalkut Shimoni, Mishlei 944) ensina que **todos os Chagim cessarão no Olam Habá**, exceto **Purim**. Porque Purim celebra a salvação no estado de hester panim — e mesmo no Olam Habá haverá memória deste estado. Purim, no Sod, é o único Chag que tem permanência cósmica eterna.

### A síntese

Esther como Malchut em exílio, Mordechai como Tiferet conectando, Haman como Amalek/Klipá/Dúvida, *venahafoch hu* como inversão sefirótica, *hester panim* como teologia da Providência oculta — todos juntos compõem o mapa do Sod de Purim. Quem celebra Purim com kavaná consciente opera no próprio mecanismo cósmico da salvação.

**Fonte:** Talmud Bavli, Megilá 13b; Yalkut Shimoni, Mishlei 944; Maharal, Or Chadash sobre Esther; Ari haKadosh, Shaar haKavvanot, Inyan Purim; Pri Etz Chaim, Shaar Purim.'
WHERE slug = 'purim';
COMMIT;
-- PaRDeS do Chag: rosh-hashana
-- Idempotente: atualiza apenas colunas peshat/remez/drash/sod
BEGIN;
UPDATE chagim SET
  peshat = 'A Toráh menciona Rosh Hashanáh em duas passagens principais e os profetas iluminam seu sentido em outras tantas.

Em **Vayikra 23:23-25**: *bachodesh hash''vi''i be''echad lachodesh yihyé lachem Shabaton, zichron teruáh mikra kodesh*. No sétimo mês, no primeiro do mês, sereis em descanso solene, lembrança do toque do shofar, convocação santa. A Toráh chama Tishrei de *chodesh hash''vi''i*, sétimo mês, contado a partir de Nissan (mês da libertação). Mas a tradição rabínica reconhece Tishrei como **rosh hashanáh**, cabeça do ano, no sentido de início do ciclo civil e do julgamento.

Em **Bamidbar 29:1-6**: *uvachodesh hash''vi''i be''echad lachodesh mikra kodesh yihyé lachem, kol melechet avodá lo taasu, yom teruáh yihyé lachem*. No sétimo mês, no primeiro do mês, convocação santa será para vós, nenhum trabalho de servidão fareis, dia de toque do shofar será para vós. Aqui aparece explicitamente *Yom Teruáh*, com a oferenda específica do dia.

O profeta Yoel (2:15) ecoa o mandamento em chamado público: *tiku shofar beTzion, kadshu tzom, kireu atzaráh*. Tocai o shofar em Tzion, santificai jejum, convocai assembleia.

E Tehilim 81:4-5 oferece a chave litúrgica do dia: *tiku vachodesh shofar, bakeseh leyom chageinu, ki chok leYisrael hu, mishpat lEloheei Yaakov*. Tocai o shofar no início do mês, na lua coberta, para o dia da nossa festa; porque estatuto é para Israel, julgamento para o Elohim de Yaakov.

Por fim, **Yirmiyahu 4:19** e **Tsefaniá 1:14-16** descrevem o som do shofar como aviso profético: a alma é chamada a despertar antes que o Dia do Julgamento chegue em sua plenitude. Para Israel, este Dia chega antecipadamente, todo 1 de Tishrei, como ensaio de redenção pessoal e coletiva.

**Fonte:** Vayikra 23:23-25; Bamidbar 29:1-6; Tehilim 81:1-5; Yoel 2:15-17; Yirmiyahu 4:19; Tsefaniá 1:14-16; Talmud Bavli, Rosh Hashanáh 16a.',
  remez = 'Rosh Hashanáh opera em três planos simultâneos: pessoal, comunitário e cósmico.

No **plano pessoal**, cada alma é julgada. Não no sentido de punição arbitrária, mas no sentido de balanço espiritual: o que se fez no ano que passou, o que se omitiu, o que se promete fazer no ano que vem. O **Talmud Bavli, Rosh Hashanáh 16b** ensina que três livros são abertos em Rosh Hashanáh: o dos completamente justos (inscritos imediatamente para a vida), o dos completamente ímpios (inscritos para o oposto) e o dos intermediários (que pendem até Yom Kippur). A maioria de Israel se encontra no terceiro livro, e por isto os Dez Dias entre Rosh Hashanáh e Yom Kippur são vividos com intensidade.

No **plano comunitário**, Israel se reúne como povo diante do Trono. O som do shofar não é só pessoal, é coletivo. A *teruáh* tem qualidade de quebra interior; *shevarim* tem qualidade de soluço; *tekiá* tem qualidade de proclamação. Os três sons juntos compõem uma linguagem que a alma entende sem palavras.

No **plano cósmico**, Rosh Hashanáh é o dia em que HaShem é coroado como Rei sobre toda a Criação. A liturgia da *Musaf* divide-se em três bênçãos correspondentes:

▸ **Malchuyot** (Reinos): proclamação da realeza absoluta de HaShem sobre o universo.
▸ **Zichronot** (Lembranças): pedido de que HaShem lembre de Israel para o bem.
▸ **Shofarot** (Toques): invocação do shofar do Sinai, do shofar do Mashiach e do shofar da redenção final.

Rosh Hashanáh refina cinco qualidades específicas da alma:

▸ **Reverência** (*yir''á*), porque a coroação exige postura interior diante do Rei.
▸ **Honestidade**, porque o julgamento autêntico começa por se ver com clareza.
▸ **Esperança**, porque cada Rosh Hashanáh é nova chance, mesmo após anos de erro.
▸ **Memória ativa**, porque pedir que HaShem lembre exige primeiro que nós lembremos.
▸ **Despertar**, que é o efeito direto do shofar sobre o coração que ouve.

**Fonte:** Talmud Bavli, Rosh Hashanáh 16a-b, 17a; Mishné Toráh, Hilchot Teshuváh 3:3-4; Machzor de Rosh Hashanáh; Ari haKadosh, Shaar haKavvanot, Derush Tekiat Shofar.',
  drash = 'Apresentamos Rosh Hashanáh nos quatro níveis hermenêuticos da tradição.

### Peshat — o sentido literal

Vayikra 23:23-25 e Bamidbar 29:1-6 estabelecem o dia: 1 de Tishrei, convocação santa, descanso de trabalho, oferendas específicas, com toque do shofar como mitzvá central. A Toráh não usa a expressão *Rosh Hashanáh* (cabeça do ano) — esta é nomenclatura rabínica. Para a Toráh, o dia é simplesmente *Yom Teruáh* ou *Zichron Teruáh*. O nome *Rosh Hashanáh* aparece em **Yechezkel 40:1** num contexto específico.

### Remez — a alusão velada

O nome rabínico *Rosh Hashanáh* contém uma alusão profunda. *Rosh* significa cabeça, e em hebraico a cabeça contém o todo do corpo em embrião. Como vai a cabeça, vai o resto. Por isto a tradição luriânica ensina que tudo o que se faz nos dois dias de RH tem ressonância amplificada para o ano inteiro: cada palavra é um ato fundador, cada gesto é semente.

E o **shofar de carneiro** alude diretamente ao carneiro da Akedáh, ofertado em lugar de Itzchak. Cada toque relembra ao Eterno aquele mérito, e por isto Rosh Hashanáh é o dia em que o mérito dos pais (*zechut avot*) tem força máxima.

### Drash — o ensino homilético

O **Talmud Bavli, Rosh Hashanáh 16b** ensina sobre os três livros abertos no Trono: justos, ímpios, intermediários. Mas a Gemará faz uma pergunta surpreendente: por que os ímpios não são selados imediatamente para a morte se já são ímpios? Resposta: para dar-lhes a chance dos Dez Dias. HaShem deseja a teshuváh, não a morte do ímpio (*ki lo echpotz bemot hamet*, Yechezkel 18:32).

Aplicação prática: ninguém é descartável aos olhos do Eterno. Cada um, mesmo no pior estado, tem os Dez Dias para mudar o destino. Esta misericórdia é a essência de Rosh Hashanáh.

Outro Drash: o **shofar é a voz do coração quebrado**. O **Tehilim 34:19** diz que HaShem está próximo dos quebrados de coração. O shofar não tem palavras; é só som, e som de algo quebrado (carneiro morto, chifre oco). Quem ouve o shofar com kavaná, ouve sua própria alma chorando o que palavras não conseguem dizer.

### Sod — o segredo kabalístico

A tríade Keter-Chochmáh-Bináh é invocada nas três bênçãos do Musaf, como visto na seção *Malchuyot, Zichronot, Shofarot*. Esta é a única ocasião do ano em que as três Sefirot superiores descem juntas e sequencialmente.

O **Zohar III, 100b** ensina que no momento do toque do shofar, todos os mundos sobem em ascensão geral, e o *Sitra Achrá* (o lado oposto) recua. O som do shofar produz fissura na *klipá* que envolve o mundo, e nessa fissura entra a luz nova do ano.

A tradição luriânica diz que o **carneiro da Akedáh era de cinco mil cinco e tantos anos de idade**, pré-existente desde o sexto dia da Criação. Avraham achou um carneiro real, mas no Sod era o carneiro que HaShem havia preparado desde o princípio. Cada Rosh Hashanáh, ao tocarmos shofar de carneiro, evocamos aquele carneiro original. Por isto o som transcende o tempo histórico.

E o último Sod, talvez o mais profundo: o **Zohar** ensina que em Rosh Hashanáh ocorre o *Yichud* entre *Aba* (Chochmáh) e *Ima* (Bináh), os pais cósmicos, para gerar o novo *Zeir Anpin* (o reflexo da Divindade que rege o mundo) para o ano que vem. Cada um de nós, ao orar com kavaná, participa deste *Yichud* cósmico. Não é metáfora. É operatividade espiritual real.

### Síntese

Os quatro níveis juntos compõem Rosh Hashanáh completo. No Peshat, é mitzvá do shofar. No Remez, é a cabeça que rege o ano. No Drash, é a misericórdia que abre os Dez Dias. No Sod, é o renascimento cósmico do *Zeir Anpin*.

A Brit Im Mashiach vive Rosh Hashanáh nos quatro níveis simultâneos, com kavaná messiânica adicional: cada toque ensaia o shofar grande do Mashiach, e cada coroação do Eterno como Rei prepara o reino que virá em plenitude.

**Fonte:** Vayikra 23:23-25; Yechezkel 18:32, 40:1; Tehilim 34:19; Talmud Bavli, Rosh Hashanáh 16a-b; Zohar III, 99b-100b; Ari haKadosh, Shaar haKavvanot, Derush Rosh haShanáh.',
  sod = 'A tradição luriânica ensina que em Rosh Hashanáh ocorre o renascimento do *Zeir Anpin*, a configuração sefirótica que rege o mundo. Durante o ano que passou, esta configuração se gasta espiritualmente. Em Tishrei, a Mãe celestial, *Bináh*, gera novamente o *Zeir Anpin* para o próximo ciclo. Tudo o que acontece em Rosh Hashanáh, no nível do Sod, é parte deste parto cósmico.

O shofar, na compreensão luriânica, opera diretamente sobre os mundos superiores. Cada um dos três sons tem função específica:

▸ **Tekiá** é o som inteiro, longo, sem interrupção. Representa *Chesed*, bondade contínua. Eleva a alma para o mundo de *Atzilut*.

▸ **Shevarim** são três sons quebrados em sequência. Representa *Gevurá* dividida, o julgamento que se manifesta como sofrimentos parciais. Quebra a casca espiritual (*klipá*) que envolve a alma.

▸ **Teruáh** são nove staccatos rápidos. Representa o choro do coração quebrado, *lev nishbar*. É o ato que comove a Misericórdia divina e converte julgamento em compaixão.

A sequência *tekiá-shevarim-teruá-tekiá* tem o significado luriânico de: bondade descendo, julgamento quebrando a klipá, alma chorando arrependimento, e bondade voltando a envolver tudo. Em cada série de toques, este ciclo se repete e se aprofunda.

O Arizal ensina em **Shaar haKavvanot, Derush Tekiat Shofar** que o shofar de Rosh Hashanáh é especificamente o **shofar de carneiro** (*ayil*), em memória do carneiro de Avraham na Akedáh (sacrifício de Itzchak). Este shofar carrega o mérito ancestral de Avraham e Itzchak, e por isto seu som tem força específica de despertar a Misericórdia divina.

As **três bênçãos do Musaf** (Malchuyot, Zichronot, Shofarot) correspondem às três Sefirot superiores:

▸ **Malchuyot** corresponde a *Keter*, a Coroa, porque proclamar a realeza é coroar o Rei.
▸ **Zichronot** corresponde a *Chochmáh*, a Sabedoria, porque lembrar é o ato primordial da mente divina.
▸ **Shofarot** corresponde a *Bináh*, a Compreensão, porque o som do shofar é o canal pelo qual Bináh desce ao mundo manifesto.

**Fonte:** Ari haKadosh, Shaar haKavvanot, Derush Tekiat Shofar e Derush Rosh haShanáh; Etz Chaim, Shaar haShofarot; Pri Etz Chaim, Shaar Rosh haShanáh; Zohar III, 99b-100b; Zohar Pinchas 231a.'
WHERE slug = 'rosh-hashana';
COMMIT;
-- PaRDeS do Chag: shabat
-- Idempotente: atualiza apenas colunas peshat/remez/drash/sod
BEGIN;
UPDATE chagim SET
  peshat = 'A Toráh menciona Shabat mais de cem vezes, mais que qualquer outro Moed. Três passagens centrais sustentam a observância.

Na **Criação** (Bereshit 2:1-3), HaShem cessa no sétimo dia, abençoa e santifica. Shabat pertence à ordem do cosmos, anterior a qualquer revelação posterior.

No **Decálogo de Shemot 20:8**, ouvimos *zachor*, lembra. Mitzvá positiva: santificar com Kidush, alegrar-se com refeição festiva, vestir-se com honra. No **Decálogo de Devarim 5:12**, ouvimos *shamor*, guarda. Mitzvá negativa: cessar das trinta e nove categorias de *melachá*. Chazal ensinam que ambas as palavras foram pronunciadas em uma única fala divina (Talmud Bavli, Shevuot 20b). Por isto acendemos duas velas, uma para *Zachor* e outra para *Shamor*.

Em **Shemot 31:13-17**, Shabat é declarado *brit olam*, aliança eterna, e *ot beini uveinechem*, sinal entre Mim e vós. Não é simples observância, é o emblema constitutivo do povo eleito.

E o profeta Yesha''yahu (58:13) revela a chave do Shabat profundo: *vekarata laShabat oneg*, chamarás ao Shabat deleite. Guardar com tristeza é guardar pela metade. *Oneg Shabat* é a marca do cumprimento autêntico.

**Fonte:** Bereshit 2:1-3; Shemot 20:8-11, 31:13-17; Devarim 5:12-15; Yesha''yahu 58:13-14; Talmud Bavli, Shevuot 20b.',
  remez = 'Em Shabat, cada filho de Israel recebe a *neshamáh yeterá*, alma adicional, conforme o Talmud Bavli, Beitzá 16a. Esta alma se acopla à alma comum durante as vinte e cinco horas do dia e parte ao final, na Havdaláh. Por isto cheiramos especiarias na separação: para consolar a alma comum pela perda.

Shabat refina cinco qualidades específicas da alma:

▸ **Paciência**, ao descobrir que nem tudo precisa ser feito imediatamente.
▸ **Humildade**, ao perceber que o mundo continua girando sem nossa intervenção.
▸ **Gratidão**, ao contemplar com calma o que se atravessa correndo durante a semana.
▸ **Bitachón** (confiança), ao entregar um dia inteiro a HaShem.
▸ **Simchá** (alegria), porque Yesha''yahu chama Shabat de *oneg*, deleite.

E Shabat é também *me''ein Olam Habá*, uma sexagésima parte do mundo vindouro (Talmud Bavli, Berachot 57b). Cada Shabat é janela aberta para o **Yom Shekuló Shabat**, o Dia que é Todo Shabat. Aquele que guarda com kavaná já prova, agora, da realidade que está vindo.

**Fonte:** Talmud Bavli, Beitzá 16a; Berachot 57b; Shabat 119b; Yesha''yahu 58:13-14.',
  drash = 'O Zohar III, 152a ensina que a Toráh tem **corpo** (Peshat), **vestes** (Remez), **alma** (Drash) e **alma da alma** (Sod). Apresentamos o Shabat nos quatro níveis.

### Peshat — o sentido literal

Bereshit 2:1-3 narra um fato cosmológico simples: HaShem cessou no sétimo dia, abençoou-o e santificou-o. O verbo *shavat* significa cessar de uma atividade, não descansar de cansaço. HaShem não se cansou, escolheu cessar. A cessação é ato criador: sem ela, não há demarcação, e sem demarcação, não há *kedushá*. Aplicação: cumprir significa cessar literalmente do *melachá* (trabalho criativo).

### Remez — a alusão velada

O número sete é o ponto central das seis direções do espaço. Sem o sétimo, os seis dispersam. Shabat aparece em múltiplos ciclos: sete dias da semana, sete anos da *Shemitáh*, sete ciclos do *Yovel* (jubileu), sete milênios da história cósmica (Talmud Bavli, Sanhedrin 97a). O sétimo milênio é o *Yom Shekuló Shabat*, o reino messiânico.

### Drash — o ensino homilético

Rav Yochanan ensina em nome de Rabi Yossi: aquele que se deleita em Shabat herda sem fronteiras, *nachalá belô meitzarim* (Talmud Bavli, Shabat 118b). Quem investe em Shabat investe no infinito, com retornos desproporcionais. E aquele que honra Shabat será honrado em todos os seus assuntos (Shabat 119a).

### Sod — o segredo kabalístico

A Shechiná (*Malchut*) sobe pelos quatro Olamot durante o Kabalat Shabat e se une a *Tiferet* na noite. As três refeições operam tikun em Asiáh, Yetziráh e Briáh. A *neshamáh yeterá* desce de *Atzilut* e se acopla aos três níveis da alma (*Nefesh*, *Ruach*, *Neshamáh*). Por isto na Havdaláh há três bênçãos de compensação (besamim, fogo, separação): cada uma devolve vitalidade a um nível afetado pela partida.

### Síntese

Os quatro níveis juntos compõem o Shabat completo. Ninguém vive Shabat por inteiro sem começar a perceber os quatro simultâneos. A percepção não vem de uma vez, vem ao longo dos anos.

**Fonte:** Zohar III, 152a; Talmud Bavli, Shabat 118b-119a, Sanhedrin 97a, Berachot 57b; Ari haKadosh, Shaar haKavvanot, Derush Kabalat Shabat.',
  sod = 'A tradição luriânica, transmitida pelo Arizal em Tzefat no século XVI, revela o que de fato ocorre cosmicamente na entrada do Shabat.

Durante os seis dias da semana, *Malchut*, a décima Sefiráh, encontra-se em descida pelos mundos inferiores, resgatando *nitzotzot*, faíscas santas, dispersas em toda matéria. Cada bracháh dita com kavaná eleva uma faísca. Cada mitzvá cumprida, idem.

Na entrada de Shabat, *Malchut* sobe carregando todo o acervo da semana e se une a *Tiferet*, a Sefiráh central. Esta é a união cósmica do sétimo dia. Toda a liturgia do Kabalat Shabat, dos seis salmos iniciais ao Lecha Dodi, acompanha passo a passo esta ascensão.

Por isto chamamos Shabat de **Shabat HaMalká** (Shabat a Rainha) e cantamos *Boi Kalá*, vem Noiva, ao final do hino. A Noiva é *Malchut*, a Shechiná. O Noivo é *Tiferet*. Israel e a Brit Im Mashiach atuam como os amigos do Noivo que conduzem a recepção.

As três refeições operam tikun nas três Sefirot emocionais centrais: a primeira (sexta à noite) em **Chesed**, a segunda (almoço) em **Gevurá**, e a *Seudá Shelishit* em **Tiferet**. Quem cumpre as três equilibra a tríade interior para a semana seguinte.

**Fonte:** Zohar, Bereshit 48a; Vayakhel 204b; Ari haKadosh, Shaar haKavvanot, Derush Kabalat Shabat; Etz Chaim, Shaar haShabat.'
WHERE slug = 'shabat';
COMMIT;
-- PaRDeS do Chag: shavuot
-- Idempotente: atualiza apenas colunas peshat/remez/drash/sod
BEGIN;
UPDATE chagim SET
  peshat = 'A Toráh menciona Shavuot em quatro passagens centrais, cada uma acrescentando uma camada.

Em **Vayikra 23:15-21**, encontramos a contagem dos cinquenta dias e a oferenda das duas chalot de trigo: *usfartem lachem mimochorat haShabat... ad mimochorat haShabat hash''vi''it tisperu chamishim yom*. Contareis para vós, a partir do dia seguinte ao Shabat... até o dia seguinte ao sétimo Shabat, contareis cinquenta dias. O sétimo Shabat aqui é metafórico, refere-se ao sétimo ciclo da contagem do Omer.

Em **Devarim 16:9-12**, Moshé conecta a festa à libertação do Mitzraim: *vezacharta ki eved hayita beMitzraim*. E recordarás que servo foste no Mitzraim. Shavuot, portanto, não é apenas memória da entrega da Toráh, é memória da libertação que tornou possível receber a Toráh como povo livre.

Em **Shemot 19-20** está o relato direto do Sinai. Israel acampa diante do monte. HaShem propõe a aliança: *vihyitem li seguláh mikol haamim... veatem tihyu li mamlechet kohanim vegoi kadosh*. E sereis para Mim tesouro especial entre todos os povos... e vós sereis para Mim reino de Kohanim e nação santa. O povo responde, em uníssono: *kol asher diber HaShem naaseh*. Tudo o que HaShem falou, faremos. Em seguida vêm os Asseret haDibrot, os Dez Princípios.

Em **Shemot 23:16 e 34:22**, a festa aparece como *Chag haKatzir* (Festa da Colheita) e *Chag haShavuot* (Festa das Semanas), confirmando suas dimensões agrícola e calendárica.

E os profetas iluminam o destino último da Toráh. Yirmiyahu 31:33 anuncia: *natati et Torati bekirbam ve''al libam echtavena*. Porei Minha Toráh no íntimo deles e sobre seus corações a escreverei. A Brit Im Mashiach lê este versículo como a promessa cuja semente foi plantada no Sinai e cuja plenitude se desdobra através do Mashiach.

**Fonte:** Vayikra 23:15-21; Devarim 16:9-12; Shemot 19-20, 23:16, 34:22; Yirmiyahu 31:31-34; Talmud Bavli, Shabat 88a.',
  remez = 'Shavuot é o coroamento espiritual de Pessach. Na Páscoa, Israel saiu fisicamente do Mitzraim, do estreitamento. Em Shavuot, Israel sai espiritualmente, ao receber a Toráh. Sem Shavuot, Pessach seria libertação sem destino. A liberdade pela liberdade não basta, ensina o Maharal de Praga: liberdade autêntica só existe quando se serve algo maior que a própria vontade. Servir a Toráh é a expressão suprema desta liberdade.

Por isto Chazal contam, no **Pirkei Avot 6:2**, que as tábuas estavam *charut*, gravadas, e leem ao mesmo tempo *cherut*, liberdade. Quem se grava na Toráh torna-se livre. Quem se imagina livre de toda obrigação torna-se escravo de seus próprios impulsos.

A Sefirat haOmer, os cinquenta dias entre Pessach e Shavuot, é a escola intensiva desta transição. Cada dia da contagem refina uma combinação de duas Sefirot inferiores, partindo de *Chesed sheBeChesed* (bondade na bondade) e culminando em *Malchut sheBeMalchut* (realeza na realeza). Quem percorre os cinquenta dias com atenção chega a Shavuot transformado, pronto para receber.

A frase mais célebre de Israel diante do Sinai é a dupla *naaseh venishmá* (Shemot 24:7), faremos e ouviremos. A ordem é invertida em relação ao racional: normalmente primeiro se ouve, depois se faz. Mas a alma de Israel, no Sinai, comprometeu-se a fazer antes mesmo de entender plenamente. Esta é a chave do recebimento. Aquele que condiciona obedecer a entender, nunca chega a entender. Aquele que se compromete antes, recebe a compreensão como fruto.

Shavuot refina cinco qualidades específicas da alma:

▸ **Humildade**, porque a Toráh, segundo Chazal, foi entregue no menor dos montes.
▸ **Disponibilidade**, que é a postura do *naaseh venishmá*.
▸ **Disciplina do estudo**, ensaiada no Tikun Leil Shavuot.
▸ **Gratidão**, expressa nas duas chalot de trigo da nova safra.
▸ **Renovação da aliança**, vivida como se cada um estivesse pessoalmente diante do Sinai.

**Fonte:** Pirkei Avot 6:2; Shemot 24:7; Maharal, Tiferet Yisrael cap. 22; Talmud Bavli, Shabat 88a-89a.',
  drash = 'Apresentamos Shavuot nos quatro níveis hermenêuticos da tradição.

### Peshat — o sentido literal

Vayikra 23:15-21 estabelece a contagem de cinquenta dias a partir do segundo dia de Pessach e ordena celebrar Chag haShavuot como *mikra kodesh*, convocação santa, com oferenda de duas chalot de trigo (*Shtei haLechem*). Devarim 16:9-12 conecta a festa à libertação do Mitzraim. Shemot 19-20 narra o evento histórico: HaShem desce sobre o Sinai, Israel ouve a voz divina, e os Asseret haDibrot são proclamados. Tudo no nível do Peshat aponta para um fato concreto e datado, celebrado em 6 de Sivan.

### Remez — a alusão velada

O número cinquenta aponta para *Yovel*, o jubileu. Cinquenta dias entre Pessach e Shavuot, cinquenta anos entre dois Yovelim. Em ambos, há libertação: no Yovel, dos servos e da terra; em Shavuot, da escravidão do não-saber. A Toráh é a verdadeira ge''ulá, a verdadeira redenção. As **duas chalot** da oferenda aludem ao duplo aspecto da Toráh (escrita e oral, externa e interna), e antecipam a promessa de Yirmiyahu 31:33: do externo das tábuas ao interno do coração.

### Drash — o ensino homilético

Chazal contam, no **Talmud Bavli, Shabat 88a**, que HaShem suspendeu o monte sobre Israel como uma tina invertida e disse: "Se aceitardes a Toráh, ótimo; senão, aqui será vossa sepultura". Mas em outro lugar (Avodá Zará 2b), Chazal dizem que Israel aceitou de coração aberto: *naaseh venishmá*, faremos e ouviremos. Como conciliar? Ensina o Maharal: o primeiro aceite foi pelo medo do peso ontológico da Toráh (o mundo só existe pela Toráh, não havia escolha real). O segundo, em Purim, foi pelo amor. Shavuot e Purim juntos completam o ciclo do recebimento da Toráh: por temor e por amor.

### Sod — o segredo kabalístico

A Sefirat haOmer refina as sete Sefirot inferiores. No quinquagésimo dia, a alma transcende as sete e toca *Bináh*, a Mãe celestial. Bináh é a Sefiráh donde toda a Toráh emana. Por isto Shavuot não tem mitzvá ritual de *Asiáh* (matsá, sucá, shofar): não opera no mundo da ação, opera no mundo da compreensão. As três coroas que descem em Shavuot (Zohar III, 96b) são *Chochmáh, Bináh, Da''at*: a tríade superior inteira posando sobre o estudioso que vela.

O segredo final: *HaShem, Israel veHaToráh chad hu*, HaShem, Israel e a Toráh são um só (Zohar III, 73a). Em todo outro dia, este *yichud* é parcial. Em Shavuot, é total. Por isto a noite inteira em estudo, por isto a Brit Im Mashiach reconhece nesta union a raiz da promessa de Yirmiyahu: a Toráh dentro do coração é a expressão mais íntima e definitiva da união entre HaShem e Seu povo.

**Fonte:** Vayikra 23:15-21; Shemot 19-20; Yirmiyahu 31:33; Talmud Bavli, Shabat 88a, Avodá Zará 2b; Zohar III, 73a, 96b; Maharal, Tiferet Yisrael cap. 32.',
  sod = 'A tradição luriânica vê o Sinai como o ato cósmico de *yichud*, união, entre HaShem, Israel e a Toráh. Estes três, ensina o Zohar III, 73a, são *chad*, um só. Em Shavuot, este vínculo é reativado em cada alma que recebe a Toráh com kavaná consciente.

Durante a Sefirat haOmer, a alma de Israel sobe degrau a degrau pelas sete Sefirot inferiores, do *Chesed* puro do oitavo dia de Pessach até o *Malchut* perfeito da véspera de Shavuot. No quinquagésimo dia, a alma atravessa o limite das sete inferiores e toca *Bináh*, a Mãe celestial. Bináh é a Sefiráh donde a Toráh emana, e por isto é também chamada *Yovel*, jubileu (cujo ciclo é de cinquenta anos, paralelo aos cinquenta dias do Omer).

Por isto Shavuot não tem mitzvá ritual específica como matsá ou sucá. As mitzvot rituais pertencem ao mundo de *Asiáh*, da ação. Mas Shavuot opera em *Bináh*, no mundo da compreensão. Aqui não há gesto material, há receção interior. A "matsá" de Shavuot é a Toráh dentro do coração.

O Arizal ensina, em **Shaar haKavvanot, Derush Chag haShavuot**, que ficar acordado a noite inteira do Shavuot (Tikun Leil Shavuot) opera um tikun específico. Israel, no Sinai original, dormiu na véspera da entrega. Moshé teve que despertá-los. A tradição mística vê neste sono uma falha. Quem fica acordado em estudo no Leil Shavuot retifica este sono ancestral, e na manhã chega ao serviço como se estivesse pela primeira vez ao pé do monte.

As **três coroas** que descem em Shavuot, segundo o Zohar III, 96b, correspondem a *Chochmáh* (sabedoria), *Bináh* (compreensão) e *Da''at* (conhecimento). A Toráh inteira é veículo desta tríade superior, e Shavuot é o único dia do ano em que a tríade desce inteira sobre cada estudioso que está acordado.

**Fonte:** Zohar III, 73a, 96b; Ari haKadosh, Shaar haKavvanot, Derush Chag haShavuot; Etz Chaim, Shaar Pesach uShavuot; Pri Etz Chaim, Shaar Sefirat haOmer.'
WHERE slug = 'shavuot';
COMMIT;
-- PaRDeS do Chag: shemini-atzeret
-- Idempotente: atualiza apenas colunas peshat/remez/drash/sod
BEGIN;
UPDATE chagim SET
  peshat = 'A Toráh menciona Shemini Atzeret em três passagens centrais, cada uma com um ângulo distinto.

### Vayikra 23:36

*Shivat yamim takrivu ishé laHaShem, bayom hash''mini mikra kodesh yihyé lachem, vehikravtem ishé laHaShem, atzeret hi, kol melechet avodá lo taasu.*

Sete dias oferecereis oferenda a HaShem, no oitavo dia convocação santa será para vós, e oferecereis oferenda a HaShem, *atzeret* é, todo trabalho de servidão não fareis.

Note: a Toráh chama o dia explicitamente de *atzeret*. Não chama de "oitavo dia de Sukkot". É detenção em si mesma, Chag separado.

### Bamidbar 29:35-38

Detalha as oferendas do dia. Comparado aos sete dias de Sukkot (com seu total de 70 touros), Shemini Atzeret tem **um único touro**. A simplicidade quantitativa marca a intimidade qualitativa.

### Devarim 16:8 (oposição estrutural)

Em Devarim, paralelo a Shemini Atzeret existe no contexto de Pessach (sétimo dia de Pessach é também chamado *atzeret*). O termo *atzeret* aparece como "fechamento" tanto do ciclo de matsá quanto do ciclo de Sukkot. Ambos são portais de saída.

### A oração pela chuva — Bamidbar Rabá 21:24

O Midrash conecta Shemini Atzeret diretamente à chuva: como o Chag marca a transição de verão para inverno em Israel, é o momento ritualmente apropriado para começar a invocar a chuva. A *Tefilat Geshem* recitada no Musaf inaugura o período de seis meses em que se diz, na Amidá diária, *mashiv haRuach umorid hagashem* (faz soprar o vento e fazer descer a chuva).

### Yirmiyahu 14:22 — Apoio profético

*Hayesh behavlei hagoyim magshimim, veim hashamayim yitnu revivim, halô atá Hu HaShem Elokeinu, uneyhel lach, ki Atá asita et kol éle.*

Há entre os ídolos das nações algum que faça chover, ou os céus dêem chuvisco? Não és Tu, HaShem nosso Elohim? E em Ti esperamos, porque Tu fizeste tudo isto.

Este versículo, integrado a Tefilat Geshem, fundamenta a oração: a chuva vem só de HaShem, não dos ídolos. Pedir chuva em Shemini Atzeret é declaração teológica de dependência exclusiva.

### Yechezkel 13 (oração contra falsos profetas da chuva)

Yechezkel critica os profetas que prometem chuva sem autoridade divina. Esta crítica também ressoa em Shemini Atzeret: a chuva não vem por mágica nem por previsão; vem por *yichud* entre Israel e HaShem.

**Fonte:** Vayikra 23:36; Bamidbar 29:35-38; Devarim 16:8; Yirmiyahu 14:22; Yechezkel 13; Talmud Bavli, Taanit 2a-3a; Bamidbar Rabá 21:24.',
  remez = 'Shemini Atzeret é o Chag da **intimidade após a celebração pública**. Sukkot teve 70 oferendas pelas 70 nações; Shemini Atzeret tem uma oferenda — só por Israel, só com HaShem. É o momento em que a festa universal cede lugar ao encontro privado.

O Midrash de Rashi captura a essência: *kasheh alai peridatchem*. É difícil para Mim a vossa partida. HaShem detém Israel porque a despedida dói. Esta é uma das passagens mais comoventes da relação Israel-Eterno: HaShem como amigo que prolonga a visita porque não quer ver o convidado partir.

### A transição entre estações espirituais

Tishrei foi, do início ao fim, mês de intensidade: Rosh Hashanáh, Aseret Yemei Teshuváh, Yom Kippur, Sukkot. **Shemini Atzeret é o último dia de Tishrei como mês especial**. Depois dele, começa Cheshvan, o "mês sem Chag" (também chamado *Marcheshvan*, Cheshvan amargo, porque não tem festividade).

Mas antes que Cheshvan comece, HaShem detém Israel mais um dia. Para dizer: *o que foi vivido aqui em Tishrei vai com você. Não se perde. Não é apenas memória. É bagagem.*

### Refinamento de cinco qualidades da alma

▸ **Intimidade**: capacidade de estar sem fazer. Shemini Atzeret tem poucas mitzvot ritualísticas únicas; sua mitzvá é estar.
▸ **Gratidão pela permanência**: durante Sukkot celebramos colheita; em Shemini Atzeret pedimos chuva (futuro). Reconhecemos que o ciclo continua.
▸ **Lembrança**: Yizkor faz com que os falecidos sejam invocados no dia da intimidade. A relação com HaShem inclui também os que partiram.
▸ **Confiança climática**: pedir chuva é exercício de fé. Quem ora pela chuva pratica o reconhecimento de que cada gota é graça.
▸ **Despedida sem ansiedade**: o dia ensina que se pode despedir bem. Sair de Tishrei sem se agarrar nem fugir.

### A oração pela chuva como fé corporificada

A *Tefilat Geshem*, oração formal pela chuva, é recitada no Musaf de Shemini Atzeret. Inclui sete invocações dos patriarcas e matriarcas como mediadores históricos da chuva: Avraham, Itzchak, Yaakov, Moshé, Aharon, os Doze (filhos de Yaakov), e Israel inteiro nas margens do Yam Suf.

Cada invocação termina com: *baavurô (em razão dele) al timna mayim* — não recuses a água em razão dele. Ou seja: por mérito dos pais, dá chuva. Não por nosso mérito presente, mas por mérito ancestral acumulado.

Esta humildade — "não merecemos, mas por mérito dos pais peça-se" — é o tom espiritual do dia.

### Por que Yizkor neste dia

Yizkor (lembrança dos falecidos) é recitado em apenas quatro dias do ano: Yom Kippur, Shemini Atzeret, último dia de Pessach e Shavuot. Por que em Shemini Atzeret e não em Sukkot ou Simchat Toráh?

Resposta tradicional: porque Shemini Atzeret é o Chag da **intimidade reflexiva**, em que se pode parar e lembrar quem não está mais. Em Sukkot, a alegria é muito ativa e exterior; não cabe o silêncio do Yizkor. Em Simchat Toráh, a dança e o canto também são exteriorizados. Shemini Atzeret tem o tom recolhido apropriado.

**Fonte:** Vayikra 23:36; Bamidbar 29:35; Talmud Bavli, Sucá 48a, Taanit 2a-7a; Mishné Toráh, Hilchot Yom Tov 6:2; Bamidbar Rabá 21:24; Rashi sobre Bamidbar 29:36.',
  drash = 'Apresentamos Shemini Atzeret nos quatro níveis hermenêuticos.

### Peshat — o sentido literal

Vayikra 23:36 e Bamidbar 29:35 estabelecem o dia como *atzeret*, oitavo dia após o início de Sukkot, mikra kodesh, com uma oferenda específica (um touro em vez dos sete progressivos de Sukkot). Sem mandamento de Sucá nem Arba Minim. Convocação santa em si, separada de Sukkot.

O Peshat é minimal: um dia de descanso solene, oferenda simples, presença comunitária na sinagoga. A simplicidade halácica é em si o significado: este dia é sobre **estar**, não sobre **fazer**.

### Remez — a alusão velada

O número **oito** alude ao que está **acima do natural sete**. Sete é a estrutura do tempo criado (sete dias da semana, sete Sefirot inferiores). Oito transcende. Por isto a circuncisão é no oitavo dia, e a inauguração do Mishkán durou oito dias.

Shemini Atzeret é, no Remez, o ponto em que Israel toca o **sobrenatural integrado ao natural**. Não é "abandono do natural", é "natural elevado". O homem segue comendo, dormindo, falando, mas em modo mais alto.

A palavra **atzeret** (עצרת) tem raiz em *atzar* (parar, deter, conter). Conter é função de Bináh, a Mãe celestial. Por isto Shemini Atzeret corresponde, no Remez, à descida de Bináh ao mundo: a contenção sábia que limita a expansão pura da Or, tornando-a habitável para Israel.

### Drash — o ensino homilético

O **Talmud Bavli, Sucá 55b** explica por que 70 oferendas em Sukkot e apenas 1 em Shemini Atzeret. As 70 são pelas 70 nações. Quando Sukkot termina, restam Israel e HaShem. O Rei, ensina o midrash, diz aos amigos íntimos: *kasheh alai peridatchem, hitakvu odi yom echad, asu li seudá ketaná*. É difícil para Mim a vossa partida; fiquem comigo mais um dia; façam para Mim uma pequena festa.

O paralelo midráshico: rei que faz banquete público para todos os filhos das nações por sete dias, e no oitavo dia diz aos seus dez filhos especiais: agora vamos jantar só nós. Esta intimidade pós-festa é o segredo do dia.

Outro Drash: por que Yizkor especificamente em Shemini Atzeret? Porque é o dia da intimidade familiar. Família inclui também os que partiram. Quem celebra com HaShem em intimidade é convidado a trazer toda a família — viva e falecida — para a mesa do Eterno.

### Sod — o segredo kabalístico

A tradição luriânica (Pri Etz Chaim, Shaar Shemini Atzeret) ensina que em Shemini Atzeret ocorre o **yichud** definitivo do mês de Tishrei. Toda a Or acumulada em Rosh Hashanáh (coroação), Yom Kippur (purificação) e Sukkot (alegria com as nações) é finalmente **interiorizada** em Israel no oitavo dia.

A função técnica: ao receber sete dias de Or em Sukkot, a alma fica em estado expansivo. No oitavo dia, *atzeret* (contenção) integra essa Or, internaliza-a, transforma-a de Or pública em Or pessoal. Sem este oitavo dia, a Or de Sukkot escaparia ao retornar à rotina; Shemini Atzeret é o lacre que mantém a Or dentro da alma para o ano que se inicia.

A **Tefilat Geshem** opera, no Sod, como invocação do *Yichud* entre as águas superiores (mundo de Atzilut) e inferiores (mundo de Asiáh). Cada gota de chuva pedida é símbolo direto de cada gota de Or que precisa descer pelos Olamot até o mundo manifesto.

E **Yizkor** opera, no Sod, abrindo canal direto até as almas dos falecidos. Em Shemini Atzeret, as almas dos justos descem para acompanhar a oração, e ouvem nominalmente quando seus nomes são chamados. A tzedaká prometida é veículo material que transporta a oração até a alma destinatária.

### A síntese

Os quatro níveis juntos compõem Shemini Atzeret completo:

▸ **Peshat**: dia de descanso solene, sem rito específico, apenas presença.
▸ **Remez**: o oitavo dia que transcende o sete natural, descida de Bináh, contenção sábia.
▸ **Drash**: o jantar íntimo do Rei com os filhos especiais após a festa pública.
▸ **Sod**: integração final da Or de Tishrei, yichud das águas, abertura aos falecidos.

A Brit Im Mashiach vive Shemini Atzeret nos quatro níveis simultâneos. Reconhece nele o ensaio do **reino messiânico íntimo**, em que HaShem e Israel não terão mais necessidade de se despedir — porque *kasheh alai peridatchem* se tornará, para sempre, *kasheh aleichem peridati* (é difícil para vós a Minha partida), e a partida não ocorrerá mais.

**Fonte:** Vayikra 23:36; Bamidbar 29:35-36; Talmud Bavli, Sucá 47a-48a, 55b; Ari haKadosh, Pri Etz Chaim, Shaar Shemini Atzeret; Zohar III, 104a-b; Tikkunei Zohar, Tikkun 6.',
  sod = 'Shemini Atzeret é, no Sod, o dia em que toda a Or (luz) acumulada nos Chagim de Tishrei é integrada à alma de Israel para o ano que se inicia.

### O oitavo dia como transcendência do sete

O número sete representa a estrutura natural completa (sete dias da semana, sete Sefirot inferiores). O número oito transcende a estrutura natural. É o "um acima do natural", o miraculoso, o sobrenatural integrado.

Por isto a circuncisão é no oitavo dia: o pacto entra na carne acima do natural. Por isto a inauguração do Mishkán durou oito dias: o oitavo trouxe a Shechiná. E por isto Shemini Atzeret é o oitavo dia de Sukkot: o que se viveu nos sete dias é integrado no plano supranatural.

A Sefiráh correspondente ao oitavo dia, na tradição luriânica, é **Bináh** (Mãe celestial), que está acima das sete Sefirot inferiores e as alimenta. Em Shemini Atzeret, a alma de Israel sobe a Bináh, e Bináh derrama sobre Israel a totalidade da Or acumulada durante todo o mês de Tishrei.

### A diferença entre Sukkot e Shemini Atzeret no Sod

Em Sukkot, Israel **trabalha**: constrói Sucá, agita lulav, recebe Ushpizin, faz Hoshanot. É *avodá* (serviço) ativa.

Em Shemini Atzeret, Israel **recebe**. Não há mitzvá ritual ativa específica (sem Sucá, sem Arba Minim, sem Hoshanot). A alma está em postura passiva-receptiva. HaShem entrega a recompensa do mês.

Esta passagem ativa-passiva, *avodá-kabaláh* (serviço-recepção), é fundamental na estrutura espiritual luriânica. Os Chagim alternam ambas. Shemini Atzeret é, em Tishrei, o ponto culminante de recepção.

### Tefilat Geshem como yichud

A oração pela chuva é, no Sod, **yichud** entre as águas superiores (do mundo de Atzilut, no plural *mayim haelyonim*) e as águas inferiores (do mundo de Asiáh, *mayim hatachtonim*).

Quando rezamos pela chuva, não estamos pedindo apenas precipitação meteorológica. Estamos pedindo que as águas superiores espirituais desçam pela cadeia dos Olamot até o mundo manifesto. Cada gota de chuva física é símbolo direto de cada gota de Or espiritual.

Por isto a Tefilat Geshem invoca os Patriarcas: cada um deles, em seu tempo, fez yichud entre águas superiores e inferiores. Avraham na cisterna que descobriu, Itzchak nos poços que reabriu, Yaakov no encontro com Rachel junto ao poço, Moshé no Yam Suf, Aharon na água de Mei Mará tornada doce, os Doze nas portas do Mar Vermelho. Cada Patriarca é canal histórico, e a memória de seu canal abre canais presentes.

### Yizkor no Sod

A recitação de Yizkor em Shemini Atzeret tem função técnica: nos níveis de **Atzilut**, as almas dos falecidos ainda estão em proximidade. Quando recitamos o nome do pai, da mãe, do cônjuge ou da criança falecida, abrimos canal direto até a alma específica. A tzedaká dada no Yizkor (costume tradicional: prometer dar uma quantia em mérito do falecido) é o veículo material que transporta a oração até a alma destinatária.

Por isto Yizkor não é repetição mecânica. É chamada nomeada. Cada nome dito com kavaná é alma alcançada.

### Shemini Atzeret e Simchat Toráh — dois movimentos

Na diáspora, Shemini Atzeret (dia 22) e Simchat Toráh (dia 23) são dois dias. Esta separação corresponde, no Sod, a dois movimentos:

▸ **Shemini Atzeret** = recepção do que veio (passivo).
▸ **Simchat Toráh** = dança com o que se recebeu (ativo).

Quem recebe sem dançar perde a alegria. Quem dança sem receber dança sem substância. Os dois juntos formam o ciclo completo.

Em Israel, ambos se condensam em um único dia, mas a estrutura espiritual interna mantém os dois movimentos sobrepostos.

**Fonte:** Ari haKadosh, Shaar haKavvanot, Derush Shemini Atzeret; Pri Etz Chaim, Shaar Shemini Atzeret; Zohar III, 104a-b; Talmud Bavli, Sucá 48a; Tikkunei Zohar Tikkun 6.'
WHERE slug = 'shemini-atzeret';
COMMIT;
-- PaRDeS do Chag: simchat-torah
-- Idempotente: atualiza apenas colunas peshat/remez/drash/sod
BEGIN;
UPDATE chagim SET
  peshat = 'Simchat Toráh não tem fundação direta na Toráh. É **Chag rabínico**, mas com raízes bíblicas profundas que se manifestaram historicamente em forma de celebração.

### Fundação histórica

▸ **Talmud Bavli, Megilá 29b** estabelece o ciclo anual de leitura da Toráh na Babilônia. Em Israel, na Antiguidade, o ciclo era trienal (três anos para ler toda a Toráh); na Babilônia, anualisou-se. A leitura termina sempre no final de Tishrei.

▸ **Gueonim** (séculos VIII-XI): no centro académico de Sura, conclui-se a leitura e celebra-se a conclusão. A festa toma forma litúrgica.

▸ **Sefer haRokeach** (Rabi Elazar de Worms, século XIII): primeira descrição completa das Hakafot como prática institucionalizada.

▸ **Arizal** (Tzefat, século XVI): codifica as kavanot luriânicas das sete Hakafot, conectando cada uma a uma Sefiráh.

▸ **Chassidut** (Ucrânia/Polônia, séculos XVIII-XIX): leva Simchat Toráh ao ápice de exuberância. Dança por horas, canto contínuo, alegria contagiosa.

### Raízes bíblicas indiretas

Embora a celebração não esteja prescrita, vários versículos servem como fundação espiritual:

▸ **Devarim 33:4**: *Toráh tzivá-lanu Moshé, morasháh kehilat Yaakov*. A Toráh nos ordenou Moshé, herança da congregação de Yaakov. Este verso é cantado durante as Hakafot, declarando que a Toráh **pertence** a cada filho de Israel.

▸ **Tehilim 119:111**: *nechalti edvotecha leolam, ki sson libi hema*. Herdei Teus testemunhos para sempre, porque alegria do meu coração eles são. O salmista declara que a Toráh é fonte de alegria, base bíblica para o Chag.

▸ **Tehilim 19:9**: *pikudei HaShem yesharim, mesamchei lev*. Os preceitos de HaShem são retos, alegram o coração. Toráh = alegria do coração, ligação direta.

▸ **Yirmiyahu 31:11-12**: profecia do retorno em alegria, *uvau verinenu bimrom Tzion*. Virão e cantarão na altura de Tzion. O coro de retorno mensianico tem Simchat Toráh como protótipo.

### Conexão com Sukkot e Shemini Atzeret

A escolha do dia (logo após Shemini Atzeret) não é arbitrária. O ciclo de leitura **termina** exatamente neste dia porque é o último dia em que a comunidade está reunida pelos Yamim Tovim de Tishrei. A leitura final da Parashat *Vezot haBerachá* (a despedida de Moshé) coincide com a despedida de Tishrei.

E o **reinício imediato** em Bereshit 1:1 expressa princípio profundo: a Toráh nunca tem fim. O fim sempre se torna início. Por isto não há "fim da Toráh" no sentido absoluto; há apenas pausa antes do próximo ciclo.

### O nome do Chag

▸ **Simchat Toráh**: nome ashkenazi e moderno padrão. "Alegria da Toráh."
▸ **Yom haShevi''i shel Atzeret**: nome talmúdico literal — "Sétimo dia da Atzeret" (contando Sukkot+Atzeret=8, e este é o 8 dentro da contagem).
▸ Em algumas tradições sefarditas: *Atzeret II* — "segundo dia de Atzeret".
▸ **Brit Im Mashiach** segue padrão moderno: Simchat Toráh.

### A ausência de mandato escrito

A celebração ser rabínica e não escrita não diminui sua importância. Pelo contrário: Simchat Toráh é exemplo de como o povo de Israel, ao longo das gerações, **cria celebrações** quando a Toráh se manifesta em sua vida. A própria leitura cíclica anual já é prática rabínica; celebrá-la é completamento natural.

A Brit Im Mashiach reconhece Simchat Toráh como Chag legítimo da tradição rabínica, profundamente alinhado ao espírito bíblico, mesmo sem prescrição explícita.

**Fonte:** Talmud Bavli, Megilá 29b-31a; Devarim 33:4; Tehilim 19:9, 119:111; Yirmiyahu 31:11-12; Sefer haRokeach 219; Mishné Toráh, Hilchot Tefilá 13.',
  remez = 'Simchat Toráh é o Chag em que o judeu **dança com a Toráh**, não estuda apenas. É o reconhecimento de que a relação com a Toráh não é apenas intelectual ou mesmo ritual — é amorosa, corporal, exuberante. Por isto Simchat Toráh tem dança, e dança é incomum no calendário litúrgico judaico.

### O casamento entre Israel e a Toráh

A imagem central do dia é o **casamento**. Chatan Toráh (noivo da Toráh) é honrado em aliyá especial. Em muitas comunidades, ele fica sob um talit erguido como **chupá** (dossel nupcial). Israel é a noiva, a Toráh é o esposo. Ou vice-versa, dependendo da kavaná. A relação é nupcial, não apenas instrutiva.

A tradição (Talmud Bavli, Eiruvin 54a) compara estudo da Toráh ao amor entre cônjuges. Em Simchat Toráh, este amor é proclamado publicamente: Israel sai à praça (a bimá da sinagoga, ou às vezes a rua) com o Sefer Toráh nos braços. Como o noivo levanta a noiva, Israel levanta a Toráh.

### Refinamento de cinco qualidades da alma

▸ **Alegria corporificada**: capacidade de expressar alegria com o corpo. Dança, canto, abraço. Israel aprende que a alegria espiritual não é apenas interior; manifesta-se também na carne.
▸ **Comunidade radical**: todos são chamados à Toráh em Simchat Toráh. Não há hierarquia neste dia. O Rav e o iniciante carregam o mesmo Sefer.
▸ **Inclusão das crianças**: o aliyá *Kol haNearim* (todos os jovens) é único do dia. As crianças entram debaixo de um talit estendido para receber a Toráh. A próxima geração é formalmente convidada.
▸ **Humildade da repetição**: ler Bereshit 1:1 logo após Devarim 34:12 ensina que o ciclo nunca termina. Não há "dominei a Toráh"; há sempre próximo ciclo. A humildade vem de saber-se aprendiz eterno.
▸ **Continuidade histórica**: dançar com a Toráh é gesto que conecta milhares de gerações. Cada Sefer Toráh é fisicamente continuação dos anteriores. Israel dança hoje a mesma dança que dançou nos shtetls da Polônia, nos mellahs de Marrocos, nas yeshivot da Babilônia.

### Por que repetir o ciclo?

A pergunta óbvia: por que não ler a Toráh uma vez e seguir adiante? Resposta tradicional: porque a Toráh é **inesgotável**. Cada releitura encontra um leitor diferente (você não é a mesma pessoa do ano passado). Cada releitura revela camada nova. A Toráh é como o mar: lê-se a mesma onda, mas a onda é diferente a cada vez.

A repetição cíclica também ensina **persistência**. Nenhum aprendizado real se completa numa única passada. Israel aprende a Toráh como artesão aprende ofício: pela repetição. Simchat Toráh celebra essa repetição como virtude, não como tédio.

### A última palavra → primeira palavra

A Toráh termina (Devarim 34:12) com a palavra **ישראל** (Israel), última palavra. A Toráh começa (Bereshit 1:1) com a palavra **בראשית** (Bereshit, "no princípio"). A tradição (Pri Etz Chaim) ensina:

▸ A **última letra** de Devarim 34:12 é **lamed** (ל), de *Yisra''el*.
▸ A **primeira letra** de Bereshit 1:1 é **bet** (ב), de *Bereshit*.
▸ Juntas formam **לב** (*lev*, coração).

A Toráh é, na sua circularidade, **o coração de Israel**. Fim e início se tocam no centro de Israel.

### A alegria como mandamento

A Toráh ordena alegria três vezes em Sukkot (Devarim 16:14-15: *vesamachta bechagecha... vehayita ach sameach*). Simchat Toráh, sendo a conclusão de Sukkot, é o dia em que essa alegria atinge ápice. Não é alegria abstrata; é alegria com **objeto específico**: a Toráh. Israel se alegra **com** a Toráh, **pela** Toráh, **na** Toráh.

Aquele que não se alegra em Simchat Toráh perde uma das mitzvot mais bonitas do calendário. Não importa o cansaço, a tristeza pessoal, a complicação do ano: por algumas horas, **dança-se com a Toráh**, e a alegria precede a vontade. O corpo dança e arrasta a alma.

**Fonte:** Talmud Bavli, Eiruvin 54a, Megilá 31a; Devarim 16:14-15, 33:4; Tehilim 19:9; Mishné Toráh, Hilchot Tefilá 13; Ari haKadosh, Pri Etz Chaim, Shaar Simchat Torá.',
  drash = 'Apresentamos Simchat Toráh nos quatro níveis hermenêuticos.

### Peshat — o sentido literal

Simchat Toráh, no Peshat, é instituição rabínica que celebra a conclusão e reinício da leitura anual da Toráh. Não está prescrito na Toráh. Surge nos gueonim e se consolida pela tradição posterior. As práticas centrais — sete Hakafot, Chatan Toráh, Chatan Bereshit, Kol haNearim — são costumes desenvolvidos comunitariamente, com diferentes intensidades em diferentes tradições (sefardita, ashkenazi, chassídica).

No nível do Peshat, é Yom Tov rabínico apoiado nos versículos de Devarim 33:4 (*Toráh tzivá-lanu Moshé*) e Tehilim 19:9 (*pikudei HaShem yesharim, mesamchei lev*).

### Remez — a alusão velada

A imagem central do dia — Israel dançando com a Toráh — alude a duas profecias messiânicas:

▸ **Yirmiyahu 31:13**: *az tismach betulá bemachol, uvachurim uzkenim yachdav*. Então alegrar-se-á a virgem em dança, e jovens e velhos juntos. A dança em Simchat Toráh é antegosto da dança messiânica.

▸ **Yesha''yahu 35:10**: *ufdueyé HaShem yeshuvun uvau leTzion berinah*. E os redimidos de HaShem voltarão e virão a Tzion em alegria. A alegria que retorna a Tzion no fim dos dias é a mesma alegria das Hakafot.

E o **número sete** das Hakafot alude aos sete dias da Criação. Cada Hakafá é dia recriado. As sete Hakafot juntas recriam o cosmos com a Toráh no centro.

### Drash — o ensino homilético

O **Talmud Bavli, Megilá 31a** registra a tradição de concluir a Toráh na conclusão da temporada de Tishrei. Mas o midrash mais profundo vem do **Shir haShirim Rabá 1:2** sobre o versículo *yishakeini minshikot pihu* (que ele me beije com os beijos de sua boca):

Os "beijos da boca" são, segundo Chazal, as **letras da Toráh saindo de HaShem**. Cada letra é um beijo divino sobre Israel. Em Simchat Toráh, Israel devolve o beijo: dança com a Toráh, abraça-a, leva-a aos lábios. É o **beijo mútuo** entre o povo eleito e a Toráh recebida.

Outro Drash: por que o **Chatan Toráh** lê os versos da morte de Moshé (Devarim 34)? Porque a Toráh termina com despedida, mas a despedida não é fim. Imediatamente após o Chatan Toráh vem o Chatan Bereshit lendo a Criação. **A morte de Moshé é o portal para a recriação do mundo**. A Toráh ensina que toda morte autêntica em Israel não é fim — é portal.

### Sod — o segredo kabalístico

O Zohar (Vayikra 73a) ensina que **HaShem, Israel e a Toráh são um só**. Simchat Toráh é o dia em que esta unidade tripla é vivida em movimento físico: Israel (corpo dançante) carrega a Toráh (Sefer físico) com kavaná direta a HaShem (alegria oferta).

As **sete Hakafot** correspondem às sete Sefirot inferiores, como detalhado em 12. Quem dança consciente desta correspondência reorganiza, no próprio corpo, a Etz Chaim.

O **valor numérico** da palavra *Simchá* (שמחה, alegria) é 353. Este número é igual ao valor de *Mashiach* (משיח) menos *Yam* (ים = 50) plus *Echad* (אחד = 13)... e, fazendo as contas, encontramos paralelos diversos com fórmulas messiânicas. A guematria precisa varia por escola, mas o princípio é unânime: a *Simchá* autêntica é a antecipação direta da *Simchá messiânica*.

E o segredo final: a **última letra** da Toráh (*lamed*) + a **primeira letra** (*bet*) formam *lev* (לב, coração). A Toráh é estruturalmente circular: termina onde começa, e o ponto de junção é o **coração**. Quem lê a Toráh apenas linearmente (do começo ao fim) perde a circularidade. Apenas em Simchat Toráh, com a leitura imediata de Devarim 34:12 → Bereshit 1:1, a circularidade é experimentada. **A Toráh é coração**, e tem o seu próprio batimento.

Mais profundo ainda: o **valor numérico** de *lev* (לב) é **32**. Há **32 caminhos da sabedoria** segundo o Sefer Yetziráh — 22 letras + 10 Sefirot. A Toráh, ao se fechar em coração, contém todos os 32 caminhos da Etz Chaim. Cada Simchat Toráh reativa este selo cósmico.

### A síntese

Os quatro níveis juntos compõem Simchat Toráh completo:

▸ **Peshat**: Chag rabínico de conclusão e reinício da leitura.
▸ **Remez**: alusão à dança messiânica, à recriação cósmica em sete passos.
▸ **Drash**: os beijos mútuos entre HaShem e Israel pela Toráh; a morte de Moshé como portal para recriação.
▸ **Sod**: unidade tripla HaShem-Israel-Toráh; Etz Chaim reorganizada na dança; circularidade que forma o *lev* (coração) com os 32 caminhos.

A Brit Im Mashiach vive Simchat Toráh nos quatro níveis simultâneos. Reconhece nele o ensaio do **reino messiânico** em que toda a humanidade dançará em torno da Toráh — Israel no centro, as nações ao redor — formando os sete círculos visíveis de Yerushalaim eterna.

**Fonte:** Devarim 34:12; Bereshit 1:1; Yirmiyahu 31:13; Yesha''yahu 35:10; Talmud Bavli, Megilá 31a; Shir haShirim Rabá 1:2; Zohar Vayikra 73a; Sefer Yetziráh 1:1 (sobre os 32 caminhos); Ari haKadosh, Pri Etz Chaim, Shaar Simchat Torá.',
  sod = 'Simchat Toráh é, no Sod, o dia em que a alma de Israel é **unida à Toráh em yichud nupcial completo**, e essa união se torna a semente espiritual de todo o ano que se inicia.

### O Yichud entre Israel e a Toráh

O **Zohar III, 73a** ensina: *HaShem, Israel veHaToráh chad hu*. HaShem, Israel e a Toráh são um só. Esta unidade tripla tem expressão sazonal:

▸ Em **Shavuot**, ocorre o yichud entre **HaShem e a Toráh** (entrega no Sinai).
▸ Em **Yom Kippur**, ocorre o yichud entre **HaShem e Israel** (perdão e proximidade).
▸ Em **Simchat Toráh**, ocorre o yichud entre **Israel e a Toráh** (casamento dançante).

Os três yichudim juntos compõem a unidade restaurada. Simchat Toráh é o terceiro vértice do triângulo, sem o qual a unidade fica incompleta.

### Sete Hakafot como sete Sefirot

A tradição luriânica (Pri Etz Chaim, Shaar Simchat Torá) ensina que as **sete Hakafot** correspondem às sete Sefirot inferiores:

▸ **Hakafá 1**: *Chesed* (bondade) — a Toráh como dádiva gratuita.
▸ **Hakafá 2**: *Gevurá* (rigor) — a Toráh como disciplina e limites.
▸ **Hakafá 3**: *Tiferet* (harmonia) — a Toráh equilibrando bondade e rigor.
▸ **Hakafá 4**: *Netzach* (vitória) — a Toráh como força persistente através do tempo.
▸ **Hakafá 5**: *Hod* (esplendor) — a Toráh como beleza revelada.
▸ **Hakafá 6**: *Yessod* (fundamento) — a Toráh como canal de conexão entre HaShem e Israel.
▸ **Hakafá 7**: *Malchut* (reino) — a Toráh como soberania da Shechiná no mundo.

Cada Hakafá tem seu piyut próprio com tema próprio. Quem dança as sete com kavaná consciente refaz a Etz Chaim com o próprio corpo.

### O Sefer Toráh como Malchut física

Cada Sefer Toráh, no Sod, é manifestação física de **Malchut**. As letras escritas em pergaminho com tinta são a Or descendo aos últimos níveis materiais. Por isto se levanta o Sefer com reverência, beija-o ao passar, dança com ele como com a Shechiná.

Em Simchat Toráh, ao dançar com o Sefer nos braços, o judeu não dança apenas com um objeto sagrado. Está dançando com a própria *Shechiná* corporificada. Esta é a única ocasião litúrgica do ano em que isto acontece publicamente.

### A última palavra: Yisra''el

A Toráh termina em Devarim 34:12 com a palavra **לְעֵינֵי כׇּל יִשְׂרָאֵל** (lifnei einei kol Yisra''el), diante dos olhos de todo Israel. **Israel é a última palavra**.

No Sod, isto significa: o destino e o ápice de toda a Toráh é Israel mesmo. Não há Toráh sem Israel para recebê-la, internalizá-la, dançá-la. A Toráh chega à sua completude no povo que a vive.

### A primeira palavra: Bereshit

A Toráh começa com **בְּרֵאשִׁית** (Bereshit), no princípio. Mas a tradição midráshica nota que a palavra também pode ser lida como *be-reishit*, com a Reishit (a sabedoria primordial, *Chochmáh*). Em **Mishlei 8:22**, Chochmáh diz: *HaShem kanani reishit darkó*. HaShem me adquiriu como princípio do Seu caminho.

A Toráh começa, portanto, com Chochmáh — a Sefiráh suprema da sabedoria divina. Termina com Israel (Malchut). De Chochmáh a Malchut é a descida completa da Or pelos Olamot.

E no instante em que se lê Devarim 34:12 e logo Bereshit 1:1, **Malchut sobe e toca Chochmáh**. O ciclo se fecha. Israel toca a sabedoria primordial. Esta é a Hakafá última, invisível, que ocorre nos Olamot supremos no momento da transição entre os dois Sifrei Toráh abertos.

### A síntese sefirótica de Simchat Toráh

A dança das sete Hakafot, a leitura final, o reinício imediato, a aliyá de *Kol haNearim*, a inclusão de toda a comunidade — tudo isto compõe, no Sod, uma única operação espiritual: a Or da Toráh desce até **Malchut** (povo de Israel encarnado), recebe estado de alegria explosiva, e dali sobe de volta a **Chochmáh** (princípio), fechando o circuito da Or pelos Olamot.

Quem participa de Simchat Toráh com kavaná consciente participa, no Sod, da reciclagem cósmica da Or pela qual o mundo é sustentado por mais um ano.

**Fonte:** Zohar III, 73a; Mishlei 8:22; Devarim 34:12; Bereshit 1:1; Ari haKadosh, Pri Etz Chaim, Shaar Simchat Torá; Etz Chaim, Shaar haRishon; Tikkunei Zohar, Tikkun 70 (sobre Bereshit como Chochmáh).'
WHERE slug = 'simchat-torah';
COMMIT;
-- PaRDeS do Chag: sukkot
-- Idempotente: atualiza apenas colunas peshat/remez/drash/sod
BEGIN;
UPDATE chagim SET
  peshat = 'A Toráh dedica uma das passagens mais densas a Sukkot, em **Vayikra 23:33-43**, e as referências se multiplicam em Devarim, Bamidbar e nos profetas.

### Vayikra 23:33-43 — A Fundação

A Toráh estabelece sete dias de festa, começando em 15 de Tishrei, com *mikra kodesh* (convocação santa) no primeiro dia, Shemini Atzeret no oitavo, e a ordem das Arba Minim em 23:40: *ulekachtem lachem bayom harishon pri etz hadar, kapot temarim, vaanaf etz avot, vearvei nachal*. E tomareis para vós no primeiro dia fruto de árvore formosa (etrog), folhas de palmeira (lulav), ramo de árvore frondosa (hadassim) e salgueiros do riacho (aravot).

Em **23:42-43** vem o mandamento da Sucá com sua razão histórica: *basukot teshvu shivat yamim, kol haezrach beYisrael yeshvu basukot, lemaan yedu doroteichem ki vasukot hoshavti et benei Yisrael behotzi''i otam meerets Mitzraim*. Em sucot habitareis sete dias, todo o nativo em Israel habitará em sucot, para que saibam vossas gerações que em sucot fiz habitar os filhos de Israel ao tirá-los da terra do Mitzraim.

### Devarim 16:13-15 — A Alegria Ordenada

*Chag haSukot taasé lechá shivat yamim, beospechá migornechá umiyikvecha, vesamachtá bechagecha*. A Festa das Sucot farás para ti sete dias, ao recolher de teu celeiro e de tua prensa, e te alegrarás em tua festa. Acrescenta: *vehayita ach sameach*. E serás somente alegre. Sukkot é o único Chag em que a Toráh insiste explicitamente na alegria.

### Bamidbar 29:12-34 — As Oferendas dos Sete Dias

Detalha as oferendas decrescentes: 13 touros no primeiro dia, 12 no segundo, e assim por diante até 7 no sétimo. Total: 70 touros nos sete dias, número simbólico das 70 nações. A tradição interpreta: Israel oferece em Sukkot pelas 70 nações do mundo, pelo bem-estar universal.

### Zechariáh 14:16-19 — A Visão Profética Universal

Talvez a passagem mais surpreendente sobre Sukkot: *vehayá kol hanotar mikol hagoyim habaim al Yerushalaim, veaalu midei shaná veshaná lehishtachavot leMelech HaShem Tzevaot velachog et chag haSukkot*. Será que todo o remanescente das nações que vieram contra Yerushalaim subirá ano após ano para se prostrar diante do Rei, HaShem dos Exércitos, e celebrar a Festa das Sucot.

No reino messiânico, segundo Zechariáh, todas as nações subirão a Yerushalaim para celebrar Sukkot. Por isto a tradição messiânica reconhece em Sukkot o Chag mais universalista do calendário judaico.

### Tehilim 27:5 — A Sucá como Proteção

*Ki yitzpenéni besukó beyom ra''á, yastireni beseter aholó*. Pois Ele me esconderá em Sua sucá no dia mal, me ocultará no segredo da Sua tenda. David usa a imagem da sucá divina para falar de proteção: a frágil cabana terrena é símbolo da sólida proteção celestial. O versículo abre o Salmo 27, lido durante todo Elul e Aseret Yemei Teshuváh.

### Nechemiá 8:13-18 — A Restauração Histórica

Após o retorno do exílio babilônico, Ezrá e Nechemiá restauraram a observância de Sukkot. *Velô assu mimei Yeshua bin Nun kén benei Yisrael ad hayom hahu, vatehí simchá gedolá meod*. Os filhos de Israel não fizeram assim desde os dias de Yehoshua filho de Nun, e houve grande alegria.

**Fonte:** Vayikra 23:33-43; Devarim 16:13-15; Bamidbar 29:12-34; Tehilim 27:5; Zechariáh 14:16-19; Nechemiá 8:13-18.',
  remez = 'Sukkot é o Chag da **transição entre seguranças**. Sair da casa permanente, com paredes sólidas e teto firme, e morar sete dias numa cabana frágil, com schach pelo qual se vê o céu. Esta troca não é sacrifício; é revelação. A Sucá ensina que a segurança real nunca esteve na casa permanente. Esteve sempre na proteção do Eterno.

Por isto Sukkot vem logo após Yom Kippur. Em Yom Kippur, a alma é purificada. Em Sukkot, a alma purificada é convidada a confiar de novo. Confiar não na casa, no salário, no plano, na previsibilidade. Confiar na Presença que cobre Israel desde os 40 anos do deserto, e continua cobrindo onde quer que Israel se reúna em sucá.

### As nuvens de glória

A tradição (Talmud Bavli, Sucá 11b) ensina que as sucot do deserto não eram apenas estruturas físicas, mas as próprias *anenei haKavod* (nuvens de glória) que envolviam Israel. Sete nuvens: uma em cada direção (norte, sul, leste, oeste), uma acima, uma abaixo (suavizando o chão), e uma à frente abrindo caminho. Sete nuvens correspondem aos sete dias de Sukkot e aos sete Ushpizin que recebemos na Sucá.

### Refinamento de cinco qualidades da alma

▸ **Confiança radical** (*bitachón*): morar onde o céu se vê pelo schach.
▸ **Hospitalidade** (*hachnasat orchim*): a Sucá é, por sua natureza, espaço de hóspedes; sete deles celestiais (Ushpizin), e tantos quantos couberem terrenos.
▸ **Simplicidade material**: a Sucá tem o mínimo necessário; descobre-se que basta.
▸ **Alegria autêntica**: ordenada três vezes em Devarim 16, *Z''man Simchateinu*.
▸ **Universalidade**: as 70 oferendas pelas 70 nações expandem a oração para fora de Israel; Sukkot abre a porta do humanismo bíblico.

### As Arba Minim como tipos de almas

O **Midrash Vayikra Rabá 30:12** ensina que cada uma das quatro espécies representa um tipo de judeu:

▸ **Etrog**: tem sabor e cheiro → judeu que tem Toráh e boas obras.
▸ **Lulav**: vem da tamareira, tem sabor (a tâmara) mas não cheiro → judeu com Toráh, sem boas obras.
▸ **Hadass**: tem cheiro, sem sabor → judeu com boas obras, sem Toráh profunda.
▸ **Aravá**: sem sabor, sem cheiro → judeu sem Toráh aparente, sem obras visíveis.

Mas as quatro são amarradas juntas e agitadas como uma unidade. Lição: nenhum tipo é descartável. Israel só está completo quando os quatro estão juntos, e cada um expia pelo outro.

### A alegria como dever

Em outros Chagim, a alegria é consequência natural da observância. Em Sukkot, a alegria é mitzvá explícita. Quem não consegue se alegrar deve trabalhar conscientemente nisto: cantar, dançar com lulav, comer com gosto, receber convidados. A *Simchat Beit haShoeva* (Alegria do Bombeamento de Água), realizada no Beit haMikdash durante Sukkot, era a celebração mais espetacular do ano (Talmud Bavli, Sucá 51a). Hoje, sem Templo, a alegria toma outras formas: Nigunim na Sucá, danças no Hoshaná Rabá, hospitalidade exuberante.

**Fonte:** Talmud Bavli, Sucá 11b, 51a; Midrash Vayikra Rabá 30:12; Devarim 16:14-15; Mishné Toráh, Hilchot Sucá; Sefer haChinuch, mitzvot 324-326.',
  drash = 'Apresentamos Sukkot nos quatro níveis hermenêuticos.

### Peshat — o sentido literal

Vayikra 23:33-43 estabelece o Chag: sete dias começando em 15 de Tishrei, mikra kodesh no primeiro dia e no oitavo (Shemini Atzeret), habitar em sucot, tomar as quatro espécies. A razão dada é histórica: para que as gerações saibam que HaShem fez Israel habitar em sucot no deserto. No nível do Peshat, Sukkot é o Chag da rememoração do desabrigo, do agradecimento pela proteção, e da colheita do fim do ano agrícola.

### Remez — a alusão velada

O número **sete dias** alude aos sete dias da Criação. Cada dia de Sukkot reativa a memória de um dia da Criação: os Ushpizin do dia correspondem ao trabalho do dia (Avraham/Chesed = primeiro dia, Itzchak/Gevurá = segundo dia, etc., na ordem das Sefirot inferiores que regem a estrutura cósmica).

A **Sucá com schach permitindo ver as estrelas** alude à transparência entre o ser humano e o céu, que existia antes da queda no Gan Eden. Cada Sucá, no Remez, é tentativa de recriar momentaneamente a permeabilidade primordial.

O **número 70** das oferendas do Chag (somatório dos sete dias) alude às 70 nações do mundo segundo Bereshit 10. Sukkot é, no Remez, o Chag universalista por excelência.

### Drash — o ensino homilético

O **Talmud Bavli, Sucá 11b** discute o que eram as *sucot* do deserto: nuvens de glória, ou cabanas reais? Os sábios divergem. A conclusão homilética: ambos. As cabanas eram físicas, mas dentro delas (e ao redor) havia também nuvens de glória. A lição: a proteção divina opera em camadas — material e espiritual simultaneamente. Quando você se senta na Sucá hoje, não é apenas cabana de bambu; é também nuvens invisíveis.

Outro Drash do **Vayikra Rabá 30:14**: por que o etrog precisa ser **inteiro, sem manchas**, mesmo após ter sido apanhado da árvore? Porque o etrog é o coração das Arba Minim, e o coração de Israel diante de HaShem precisa estar sem manchas — ou pelo menos sem manchas visíveis no momento da apresentação. Yom Kippur fez a limpeza; Sukkot a apresenta como oferta.

E o **Talmud Bavli, Sucá 51a** descreve a *Simchat Beit haShoeva* (Alegria do Bombeamento de Água) no Beit haMikdash durante Sukkot. Sábios e mestres dançavam com tochas, juglavam frutas, faziam piruetas. Diziam: *kol mi shelo raá simchat beit hashoeva, lo raá simchá miyamav*. Quem não viu a alegria do bombeamento, não viu alegria em seus dias. A lição: alegria espiritual autêntica é também física, exuberante, expressa. Quem reprime alegria reprime kedushá.

### Sod — o segredo kabalístico

A **Sucá** corresponde, no Sod, a **Bináh**, a Mãe celestial. O nome Sucá (סֻכָּה = 91) equivale à união de YHWH (26) + Adonai (65). Entrar na Sucá é entrar no Yichud entre Tiferet e Malchut, no espaço onde os opostos se reconciliam.

As **Arba Minim** correspondem ao Tetragrama (Yud-Hei-Vav-Hei), como detalhado em 05. Agitar as quatro espécies juntas, nas seis direções, é operar fisicamente o yichud do Nome Divino.

Os **Sete Ushpizin** correspondem às sete Sefirot inferiores. Os sete dias na Sucá com kavaná dos Ushpizin operam tikun completo no aspecto emocional da alma. Esta é a função terapêutica espiritual do Chag.

E **Hoshaná Rabá** é, no Sod, o último ato da sequência iniciada em Rosh Hashanáh. A tradição (Zohar Vayechi 220a) diz que naquela noite ocorre o trânsito final entre o ano que se foi e o que se inicia. Aquele que cumpre Hoshaná Rabá com kavaná é como o **Kohen Gadol em Yom Kippur**: tem acesso direto ao Trono, sem barreira.

A **alegria ordenada** de Sukkot é, no Sod, manifestação direta de *Tiferet*. Não há tristeza em Tiferet. Quem se alegra autenticamente em Sukkot abre canal de Tiferet em sua alma, e este canal permanece aberto durante o ano que segue.

### Síntese

Os quatro níveis juntos compõem Sukkot completo:

▸ **Peshat**: Chag da memória do deserto e da colheita.
▸ **Remez**: alusão à transparência primordial entre céu e terra, e ao destino universal das 70 nações.
▸ **Drash**: as nuvens de glória continuam, alegria autêntica é física, o etrog é o coração apresentado.
▸ **Sod**: Sucá = Bináh, Arba Minim = Tetragrama, Sete Ushpizin = sete Sefirot inferiores, Hoshaná Rabá = selamento final.

A Brit Im Mashiach vive Sukkot nos quatro níveis simultâneos. Cada Sucá é antecipação da **Sucá universal** que cobrirá Israel e as nações no reino messiânico, conforme Zechariáh 14:16. Cada agitação do lulav é proclamação que o Mashiach é Senhor das seis direções e do centro.

**Fonte:** Vayikra 23:33-43; Talmud Bavli, Sucá 11b, 51a; Midrash Vayikra Rabá 30:12-14; Zohar III, Emor 103a-104b; Zohar Vayechi 220a; Ari haKadosh, Shaar haKavvanot, Derush Sukkot.',
  sod = 'Em Sukkot, a alma de Israel sai da casa permanente e entra na *Sucá*, e este movimento físico corresponde, no Sod, a uma reconfiguração sefirótica completa.

### A Sucá como Bináh

A tradição luriânica ensina que a Sucá representa **Bináh**, a Sefiráh-Mãe celestial. O nome *Sucá* (סֻכָּה) tem valor numérico **91**, mesmo de *Adonai* (אדני, 65) combinado com *YHWH* (יהוה, 26) — 65 + 26 = 91. Esta união divina (combinação dos dois nomes principais de HaShem) é exatamente o que ocorre cosmicamente em Sukkot: a *Shechiná* (Adonai/Malchut) sobe e se une ao Tetragrama (YHWH/Tiferet/Bináh).

Por isto, ao entrar na Sucá, o judeu não está apenas em uma cabana — está, no Sod, **dentro de Bináh**. Cada hora passada na Sucá é hora respirando o ar do Mundo da Compreensão.

### Os Sete Ushpizin como Sete Sefirot

A tradição, codificada por **Rabi Itzchak Luria (Arizal)** em Shaar haKavvanot, identifica sete hóspedes celestes que visitam a Sucá, um por dia, correspondentes às sete Sefirot inferiores:

▸ **Dia 1 — Avraham** → *Chesed* (bondade pura, hospitalidade absoluta).
▸ **Dia 2 — Itzchak** → *Gevurá* (rigor, força contida, akedáh).
▸ **Dia 3 — Yaakov** → *Tiferet* (harmonia, beleza, equilíbrio).
▸ **Dia 4 — Moshé** → *Netzach* (vitória, persistência, levou Israel ao deserto).
▸ **Dia 5 — Aharon** → *Hod* (esplendor, glória sacerdotal).
▸ **Dia 6 — Yossef** → *Yessod* (fundamento, justo, *tzadik yessod olam*).
▸ **Dia 7 — David** → *Malchut* (realeza, fechamento do ciclo).

Sete dias na Sucá com sete Ushpizin operam tikun completo nas sete Sefirot inferiores. Quem cumpre os sete dias com kavaná consciente refaz, em pequena escala, toda a história da espiritualidade de Israel.

### As Arba Minim e o Yichud

As **quatro espécies** correspondem, no Sod, às quatro letras do Tetragrama:

▸ **Lulav** (palmeira, ereta e dura) → *Vav* (י), a linha vertical do Tetragrama, Tiferet.
▸ **Etrog** (cidra, sozinha, formosa) → *Hei* final (ה), Malchut, a Noiva.
▸ **Hadass** (mirta, três folhas em cada nó) → *Yud* (י), Chochmáh.
▸ **Aravá** (salgueiro, sem cheiro nem sabor) → *Hei* primeiro (ה), Bináh.

Agitar as quatro espécies juntas, nas seis direções, é operar fisicamente o *yichud* (união) entre as quatro letras do Nome Divino. O movimento de aproximar o lulav ao peito após agitá-lo simboliza a descida da união ao coração do que reza.

### Hoshaná Rabá — Selamento Final

O sétimo dia, **Hoshaná Rabá**, é cosmicamente o dia em que o decreto iniciado em Rosh Hashanáh e selado em Yom Kippur é **executado**. Há um período de execução entre Yom Kippur e Hoshaná Rabá. Aquele que ainda não fez teshuváh completa tem até Hoshaná Rabá para mudar o decreto. Por isto se faz **noite inteira de estudo** (Tikun Leil Hoshaná Rabá) e **sete circuitos** com o lulav ao redor da bimá no dia seguinte.

A tradição luriânica diz que na Hoshaná Rabá, os anjos chamados *malachei haShlichá* (anjos da missão) descem com os decretos selados de Yom Kippur, e até o por do sol daquele dia o decreto pode ainda ser anulado pela teshuváh-última-hora. Após o pôr do sol de Hoshaná Rabá, o decreto entra em vigor irrevogavelmente.

### Shemini Atzeret e Simchat Toráh

Os Chagim que seguem Sukkot (tratados em portais próprios) completam o ciclo: *Shemini Atzeret* é o "oitavo dia" em que HaShem detém Israel para um último momento de intimidade, e *Simchat Toráh* fecha e reinicia o ciclo da Toráh. Os três juntos formam o **período de Tishrei** completo, do despertar do shofar em Rosh Hashanáh à reaberatura da Toráh em Simchat Toráh.

**Fonte:** Ari haKadosh, Shaar haKavvanot, Derush Sukkot; Pri Etz Chaim, Shaar Sukkot; Zohar III, 101b-104b; Zohar Emor 103a-b; Sefer haBahir parágrafos sobre Sucá.'
WHERE slug = 'sukkot';
COMMIT;
-- PaRDeS do Chag: tisha-beav
-- Idempotente: atualiza apenas colunas peshat/remez/drash/sod
BEGIN;
UPDATE chagim SET
  peshat = 'Tisha B''Av tem múltiplas camadas históricas, da Toráh aos tempos modernos. Cada catástrofe acrescenta peso à data.

### O pecado dos espias (Bamidbar 13-14)

**Origem na Toráh**. Após a saída do Mitzraim, Moshé enviou **doze espias** para reconhecer a Terra Prometida. Dez voltaram com **relatório negativo**: "os habitantes são gigantes, não podemos conquistar". Apenas dois — **Yehoshua** e **Calev** — afirmaram fidelidade ao plano divino.

Israel, ouvindo o relatório negativo, **chorou durante toda a noite**. Aquela noite era **9 de Av**.

HaShem disse (Talmud Bavli, Taanit 29a): *atem bechitem bechiyá shel chinam, ani ekva lachem bechiyá ledorot*. Vós chorastes choro injustificado; Eu farei para vós choro nas gerações.

Decreto: **aquela geração não entraria na Terra**; todos morreriam no deserto. Cumpriu-se em 40 anos de peregrinação até que a geração inteira tivesse morrido. Apenas Yehoshua e Calev entraram.

Este foi o **primeiro 9 de Av carregado de catástrofe** — protótipo dos posteriores.

### Destruição do Primeiro Beit haMikdash (586 a.C.)

**Yirmiyahu**, profeta da geração, advertiu por décadas que Israel precisava fazer teshuváh ou enfrentaria destruição. Foi ignorado, perseguido, encarcerado.

**Nabucodonosor** da Babilônia, após cercar Yerushalaim por 30 meses, tomou a cidade. Em **9 de Av de 586 a.C.**, o Beit haMikdash foi incendiado. Os exilados foram levados para a Babilônia. Yirmiyahu escreveu Eichá após este evento, lamentando a queda.

### Destruição do Segundo Beit haMikdash (70 d.C.)

655 anos depois, em **9 de Av de 70 d.C.**, **Roma** (sob o general **Tito**, futuro imperador) destruiu o Segundo Beit haMikdash, no mesmo dia do calendário. Cerco brutal de quase 5 meses. Massacre. Templos saqueado. Tito levou para Roma os utensílios sagrados (incluindo a **Menorá**), evento gravado em baixo-relevo no **Arco de Tito** em Roma até hoje.

A coincidência da mesma data é **historicamente improvável** estatisticamente, mas espiritualmente significativa segundo a tradição. **9 de Av** carrega energia de destruição.

### Captura de Betar (135 d.C.)

**Bar Kochba** liderou a última grande revolta contra Roma. Sua fortaleza final, **Betar**, caiu em **9 de Av de 135 d.C.** após cerco prolongado. Estima-se que **600.000** combatentes morreram. Rabi Akiva, que tinha proclamado Bar Kochba como possível Mashiach, foi torturado e martirizado.

### Aração de Yerushalaim (cerca de 135 d.C.)

Após a derrota de Bar Kochba, **Adriano** ordenou que Yerushalaim fosse **arada como campo** — gesto simbólico de eliminar a cidade. A área foi transformada em "Aelia Capitolina", cidade pagã. Judeus foram proibidos de entrar.

### Expulsão dos Judeus da Inglaterra (1290)

**Eduardo I** expulsou todos os judeus da Inglaterra, exatamente em **9 de Av**. Os judeus voltaram apenas no século XVII, sob Oliver Cromwell.

### Expulsão dos Judeus da Espanha (1492)

**Ferdinand e Isabel** decretaram que todos os judeus deveriam converter-se ao cristianismo ou deixar a Espanha. O **decreto final** teve efeito em **9 de Av de 1492**, expulsando ~300.000 judeus que se recusaram a converter. Coincidiu com a partida de Colombo (3 de agosto = 9 de Av), que muitos historiadores sugerem ter incluído conversos disfarçados.

### Início da Primeira Guerra Mundial (1914)

A **mobilização russa** que iniciou a cadeia de eventos da Primeira Guerra Mundial foi ordenada em **1 de agosto de 1914**, que naquele ano correspondeu a **9 de Av**. A Guerra teve consequências catastróficas para judeus do leste europeu.

### Início das Deportações de Varsóvia para Treblinka (1942)

Em **22 de julho de 1942** (que foi **9 de Av**), os nazistas começaram a deportar judeus do Gueto de Varsóvia para o campo de extermínio de **Treblinka**. Em poucos meses, mais de 300.000 judeus foram assassinados.

### A pergunta: por que essa data?

A tradição (Talmud Bavli, Taanit 29a) ensina que o decreto do **choro injustificado** em Bamidbar 13-14 estabeleceu **energia espiritual de luto** sobre esta data. As catástrofes posteriores **se encaixaram** nesta energia, em ciclo doloroso.

Aplicação espiritual: as datas do calendário **carregam carga energética** acumulada. Tisha B''Av carrega carga de catástrofe; Yom Kippur carrega carga de expiação; Shavuot carrega carga de revelação. Quem reza no dia certo, opera nas correntes do dia.

### A reversão futura

O profeta **Yirmiyahu** prediz a reversão em **31:15-16**:

*Kol berama nishmá, nehí, bechi tamrurim, Rachel mevaká al baneyha... menei kolech mibechi ve''enayich midim''á, ki yesh sachar lifulatech, ne''um Adonai, veshavu mei''eretz oyev.*

Voz em Ramá ouve-se: lamento, pranto amargo, Rachel chorando seus filhos... Cessa tua voz de pranto e teus olhos de lágrimas, pois há recompensa para teu trabalho, diz HaShem, e voltarão da terra do inimigo.

O choro de Tisha B''Av eventualmente terminará. Os filhos de Israel voltarão. O Beit haMikdash será reconstruído. Este é o **núcleo messiânico** do dia mais triste.

**Fonte:** Mishná Taanit 4:6; Talmud Bavli, Taanit 26b-31a; Megilat Eichá; Bamidbar 13-14; Yirmiyahu 31:15-16; Historiografia documentada das catástrofes posteriores (cf. Cecil Roth, Israel Yuval).',
  remez = 'Tisha B''Av é o Chag em que Israel **chora coletivamente** por séculos de catástrofes. Mas o luto não é sem sentido. Carrega função espiritual específica.

### O luto como teshuváh

A tradição rabínica (Mishné Toráh, Hilchot Taaniyot 5:1) ensina que **jejuns públicos** são instrumentos de **teshuváh coletiva**. Não são autopunição arbitrária; são chamada à mudança real.

Tisha B''Av pergunta: **o que ainda não consertamos** desde a destruição do Beit haMikdash? **Por que ainda estamos no exílio**? **O que cada um de nós contribui hoje** para a continuação do exílio que se prolonga há quase dois milênios?

A tradição (Talmud Bavli, Yoma 9b) responde **uma das causas**: *sinat chinam* (ódio gratuito) entre judeus. O Segundo Beit haMikdash, particularmente, foi destruído por causa do ódio mútuo entre as facções judaicas (zelotes vs moderados vs sacerdotes corrompidos vs pacifistas).

A lição: **a próxima Beit haMikdash será construída por amor gratuito** (*ahavat chinam*). Sem isto, mesmo se o Templo físico fosse reerguido, seria destruído novamente.

Tisha B''Av é o dia anual em que esta lição é internalizada.

### Cinco qualidades refinadas em Tisha B''Av

▸ **Honestidade histórica**: olhar para as catástrofes sem negar nem minimizar. O sofrimento foi real; os mártires foram reais.

▸ **Solidariedade trans-temporal**: chorar pelos mortos da Cruzada, da Inquisição, do Holocausto — pessoas que nunca conhecemos, mas que pertencem à mesma alma coletiva de Israel.

▸ **Identificação com os perdidos**: cinco aflições corporais nos tornam, por 25 horas, semelhantes aos que sofreram fome, frio, perseguição. **A empatia se torna corporificada**.

▸ **Vigilância contra sinat chinam**: examinar relacionamentos próprios, identificar onde há ódio (mesmo sutil), trabalhar para curar.

▸ **Esperança radical**: mesmo no dia da maior tristeza, manter a expectativa do Mashiach. *Hashivenu Adonai elecha venashuva*.

### A diferença entre Yom Kippur e Tisha B''Av

Ambos são jejuns de 25 horas com cinco aflições. Mas:

▸ **Yom Kippur**: jejum de **expiação dos pecados pessoais**. Termina em alegria (perdão obtido). Veste-se **branco** (kittel).

▸ **Tisha B''Av**: jejum de **luto coletivo histórico**. Não termina em alegria, mas em **expectativa**. Veste-se roupas **escuras ou simples**. Sentado em **banquinho baixo** ou no chão.

Yom Kippur é cura individual; Tisha B''Av é luto coletivo. Os dois são necessários ao ciclo espiritual anual completo.

### A presença do consolo no luto

Mesmo no dia mais triste, há **sementes de consolo**. Quatro indicadores:

▸ Não se diz **Tachanun** em Tisha B''Av (paradoxalmente, dia de luto não tem orações penitenciais). Por quê? Porque Tachanun é súplica por misericórdia que pressupõe que a misericórdia pode falhar. Em Tisha B''Av, a tradição afirma que **a misericórdia divina já está garantida na sua chegada futura**.

▸ **Mashiach nasce em Tisha B''Av à tarde** (segundo Talmud Bavli, Taanit 30b e Midrash Eichá Rabá 1:51). O dia da destruição é também o dia do nascimento do consolador. **Venahafoch hu** em escala cósmica.

▸ A última frase de Eichá é **plea por retorno**: *hashivenu Adonai elecha venashuva*. Mesmo o livro de lamentações **termina em pedido de reconstrução**.

▸ O luto **suaviza após o meio-dia**: pode-se sentar em cadeira novamente. Sinal corporal de que o consolo já começou a operar.

### A solidariedade comunitária

Tisha B''Av é dia em que **toda comunidade jejua junto, lê Eichá junto, ouve kinot junto**. Não é luto privado. É **luto coletivo**, com presença mútua reforçada.

Quem jejua sozinho cumpre, mas perde a dimensão essencial. **Comunidade lutando juntas torna o luto suportável**. Por isto a Brit Im Mashiach se reúne em Tisha B''Av para os serviços.

### A pergunta sobre relevância moderna

Algumas pessoas modernas questionam: **por que ainda chorar pelo Beit haMikdash 2.000 anos depois**? Vivemos em Israel reconstruída (parcialmente), com Yerushalaim como capital, comunidade vibrante.

A resposta tradicional, intensificada para a Brit Im Mashiach:

▸ **O Beit haMikdash ainda não foi reconstruído**. O Templo do Monte continua sob controle muçulmano (Mesquita de Al-Aqsa, Domo da Rocha). Os Korbanot não foram restaurados. O Kohen Gadol não atua.

▸ **A redenção messiânica ainda não chegou**. Israel moderno é estado político, não estado messiânico. Faltam Mashiach ben David, paz universal, ressurreição dos mortos.

▸ **Sinat chinam continua entre judeus**. As facções modernas (sefarditas vs ashkenazi, religiosos vs seculares, líneas políticas opostas) frequentemente ódiam-se mutuamente. A destruição interna não cessou.

▸ **Antissemitismo persiste**. Em todas as gerações, há aqueles que tentam destruir Israel. A violência continua.

**Enquanto Mashiach não vier, Tisha B''Av permanece relevante**. Quando vier, o dia se tornará festa (Yirmiyahu 31:13).

### O choro como semente

A tradição (Eichá Rabá 1:23, baseada em Tehilim 126:5-6) ensina: *hazor''im bedimá berinah yiktzoru* — os que semeiam com lágrimas, em alegria colherão. **Cada lágrima derramada em Tisha B''Av é semente plantada para a colheita messiânica**.

Não é fatalismo nem masoquismo. É **economia espiritual**: o luto autêntico tem **valor causal real** no plano da redenção. Quem chora em Tisha B''Av contribui, em camada profunda, para a construção do Terceiro Beit haMikdash.

**Fonte:** Mishná Taanit 4:6; Talmud Bavli, Taanit 29b-30b, Yoma 9b; Megilat Eichá; Mishné Toráh, Hilchot Taaniyot 5; Midrash Eichá Rabá 1:51, 1:23; Tehilim 126:5-6; Yirmiyahu 31:13.',
  drash = '### Peshat — o sentido literal

Tisha B''Av, no Peshat, é jejum coletivo de 25 horas em memória da destruição dos dois Beit haMikdash e outras tragédias históricas concentradas nesta data. Estabelecido pelos profetas (Zechariáh 8:19 lista quatro jejuns relacionados à destruição). Cinco aflições corporais, leitura de Eichá e kinot, três semanas de luto crescente.

### Remez — a alusão velada

O número **9** (de "Nove de Av") tem associações:

▸ **9 meses** de gestação humana. Mashiach "nasce" em Tisha B''Av à tarde (Talmud Bavli, Taanit 30b) — fim do trabalho de parto de uma gestação cósmica.
▸ **Nove dias** entre 1-9 Av: a culminância de luto crescente.
▸ **9 vezes mencionado o conceito de luto** em Eichá (por aproximação).

O nome **Av** (אב) significa **pai**. O mês inteiro carrega tensão: é o mês da destruição (luto pelo Pai abandonado) e também (no fim, com Tu B''Av) da reconciliação.

A palavra **Eichá** (איכה, "como?") tem mesma raiz de **ayeka** (איכה, "onde estás?") — primeira pergunta dirigida por HaShem a Adam após o pecado (Bereshit 3:9). **A pergunta "onde estás?" e "como caíste assim?" são a mesma**. Tisha B''Av é o "ayeka" cósmico anual.

### Drash — o ensino homilético

O **Talmud Bavli, Yoma 9b** dá a causa atribuída à destruição do Segundo Beit haMikdash: **sinat chinam** (ódio gratuito entre judeus).

A lição é severa e contínua: o Beit haMikdash físico foi destruído por causa **de uma falha moral coletiva**, não por inimigos externos imbatíveis. Roma só pôde vencer porque Israel estava dividido internamente.

Aplicação atual: **enquanto sinat chinam continuar entre judeus**, o Beit haMikdash não será reconstruído. A reconstrução exige **ahavat chinam** (amor gratuito) coletivo. Cada gesto de respeito entre judeus diferentes (sefardita-ashkenazi, religioso-secular, esquerda-direita) é micro-construção do Terceiro Beit haMikdash.

Outro Drash: **Rabi Akiva ria nas ruínas**. Em famosa narrativa (Talmud Bavli, Makkot 24b), quatro sábios viam Yerushalaim destruída. Três choraram; Rabi Akiva sorriu. Quando perguntado por que ria, Akiva respondeu: vejo que **a profecia de destruição** (Yirmiyahu) **se cumpriu**; portanto, **a profecia de restauração** (Yeshayahu) **também se cumprirá**. A previsão do luto autenticou-se; a previsão do consolo também se autenticará.

Esta lição é coração da Brit Im Mashiach: o luto presente é **garantia da redenção futura**. Quem chora autenticamente em Tisha B''Av afirma a estrutura profética que inclui também a restauração.

### Sod — o segredo kabalístico

Como tratado em 05, o Sod de Tisha B''Av envolve:

▸ Shechiná em exílio máximo.
▸ Inversão sefirótica (Israel desce até a Shechiná).
▸ Três Beit haMikdash (Chesed, Gevurá, Tiferet).
▸ Or oculta intensa em meio à aparente ausência.
▸ Mashiach nasce no luto, à tarde.
▸ Choro com peso causal cósmico.

**A inversão paradoxal**: o dia da maior tristeza visível é também o dia da maior **alegria oculta**. O Mashiach está nascendo agora. O Terceiro Beit haMikdash está sendo construído cosmicamente. A redenção está em curso, mesmo invisível.

A tradição (Pri Etz Chaim do Arizal): **as orações ditas com lágrimas autênticas em Tisha B''Av são particularmente atendidas**. As lágrimas tornam as orações *pesadas* — elas penetram os Olamot mais facilmente. Por isto **Tisha B''Av é dia de pedidos pessoais ousados** (com kavaná correta).

### A guematria de "Eichá"

**Eichá** (איכה) = 1 + 10 + 20 + 5 = **36**.

O número **36** é especial:

▸ **36 Lamedvavnikim**: os justos ocultos de cada geração que sustentam o mundo (Talmud Bavli, Sucá 45b).
▸ **2×18 = 36**: dobro de *chai* (vida). Eichá é "vida em dobro" — vida da destruição mais vida do consolo simultaneamente.
▸ **6×6 = 36**: a perfeição quadrada multiplicada por si mesma.

A guematria sugere: a pergunta **"como?"** (Eichá) é também a pergunta dos 36 justos que sustentam o mundo. Eles também perguntam **como?** ao ver as catástrofes. Mesmo os mais justos não entendem completamente.

### O paradoxo de Yirmiyahu

Yirmiyahu, autor de Eichá, **profetizou a destruição por décadas**. Foi rejeitado, perseguido, encarcerado. Quando a destruição finalmente veio, ele **chorou intensamente** — apesar de ter previsto exatamente isto.

Lição profunda: **predição correta da catástrofe não diminui o luto quando ela chega**. O profeta autêntico não é distante das emoções; é o mais sensível a elas. Yirmiyahu chorou pela mesma destruição que tinha anunciado.

A tradição (Talmud Bavli, Bava Batra 14b) coloca Yirmiyahu como **modelo do profeta**: vê o futuro, anuncia, e mesmo assim sofre como qualquer pessoa quando o futuro se materializa.

### A noite mais escura

A tradição diz que **a hora mais escura é antes do amanhecer**. Tisha B''Av é, em escala cósmica, **a hora mais escura da história judaica**. Mas o amanhecer está chegando: **o Mashiach nasce nesta tarde**.

Cada Tisha B''Av que passamos sem que o Mashiach chegue **não é falha** — é continuação do trabalho cósmico de parto. **A gestação ainda continua**. Quando completar-se, virá o nascimento.

A Brit Im Mashiach lê com paciência: estamos em **período de gestação messiânica**. Não sabemos quando o nascimento ocorrerá. Mas continuamos chorando, esperando, contribuindo com cada lágrima para a operação cósmica.

### A síntese

▸ **Peshat**: jejum coletivo de 25 horas, em memória da destruição dos Templos e tragédias históricas.
▸ **Remez**: número 9 como gestação cósmica; mês de Av como tensão pai-abandonado-reconciliado; *Eichá* = *ayeka* primeiro pecado.
▸ **Drash**: sinat chinam destruiu; ahavat chinam reconstruirá; Rabi Akiva ri nas ruínas porque o consolo é garantido.
▸ **Sod**: Shechiná em exílio máximo, Mashiach nascendo à tarde, choro com peso causal real, 36 = Eichá = 36 Lamedvavnikim.

A Brit Im Mashiach vive Tisha B''Av nos quatro níveis simultâneos. O luto é real; a esperança é real. Os dois coexistem no mesmo dia, e ambos contribuem à mesma redenção em curso.

**Fonte:** Talmud Bavli, Taanit 26b-30b, Yoma 9b, Makkot 24b, Bava Batra 14b, Sucá 45b; Megilat Eichá; Ari haKadosh, Pri Etz Chaim, Shaar Tisha B''Av; Maharal, Netzach Yisrael.',
  sod = 'Tisha B''Av, no Sod, é o **dia em que a Shechiná (Malchut) está mais distante de Tiferet**. Toda a estrutura cósmica do dia opera neste estado de exílio máximo, e simultaneamente prepara a reversão.

### A Shechiná em exílio

A tradição luriânica (Ari haKadosh, Shaar haKavvanot, Inyan Tisha B''Av) ensina: durante a destruição do Beit haMikdash, **a Shechiná foi exilada com Israel**. Onde Israel é levado, a Shechiná vai junto, lamentando.

Tisha B''Av é o dia anual em que **o exílio da Shechiná é mais palpável**. Por isto Israel chora — não apenas por Yerushalaim física destruída, mas pela **Shechiná em exílio**, separada de seu *Chatán* (Noivo) celestial.

### A inversão sefirótica do dia

Em todos os outros dias, a meta é **elevar Malchut** até Tiferet. Em Tisha B''Av, paradoxalmente, **a meta é Israel descer até onde Malchut/Shechiná está**, no estado de luto. Acompanhamos a Shechiná no exílio, em vez de exigir que ela suba.

Esta solidariedade descendente é, no Sod, uma **operação de chesed**. Recusamos os confortos do "nosso lado", e descemos para estar com a Shechiná onde ela está.

### Os três Beit haMikdash

A tradição cabalística (Zohar Bereshit) ensina sobre **três Beit haMikdash**:

▸ **Primeiro Beit haMikdash** (construído por Shlomo): correspondia a **Chesed** (bondade).
▸ **Segundo Beit haMikdash** (construído pelos retornados do exílio babilônico): correspondia a **Gevurá** (rigor). Daí também sua suscetibilidade a destruição por causas internas.
▸ **Terceiro Beit haMikdash** (futuro, messiânico): corresponderá a **Tiferet** (harmonia). Será eterno, não destruído.

A destruição dos dois primeiros foi necessária, no Sod, para que **os dois primeiros se integrassem em Tiferet** quando o terceiro vier. Os primeiros não desapareceram; estão **dentro do terceiro futuro**.

### A Or Oculta

A tradição luriânica (Pri Etz Chaim, Shaar Tisha B''Av) ensina que durante Tisha B''Av, a **Or divina manifesta** está oculta no mundo. Israel chora porque **a luz não está visível**.

Mas, paradoxalmente, **a Or oculta é mais intensa que a Or manifesta**. Quem chora em Tisha B''Av está, no Sod, **mais próximo da Or pura** (que é oculta) que em Chagim de alegria visível.

Aplicação prática: o sofrimento autêntico tem **valor espiritual oculto** que pode exceder a alegria superficial. Não significa cultivar sofrimento; significa **respeitar o sofrimento que vem**, especialmente em Tisha B''Av.

### Mashiach nasce no luto

A tradição (Talmud Bavli, Taanit 30b; Eichá Rabá 1:51): *Mashiach nasce em Tisha B''Av*. Mais especificamente, **na tarde de Tisha B''Av**.

No Sod, isto significa: **a redenção surge no momento de máxima escuridão**. Não é apesar do luto; é **através do luto**. O luto autêntico é parteira do consolo. Como mulher em trabalho de parto sente dor antes da alegria do nascimento, Israel atravessa luto antes da redenção.

A frase de Yeshayahu 26:18 captura esta dinâmica: *kemo harah takriv ledet... ken hayinu mipanecha HaShem*. Como mulher grávida que se aproxima do parto... assim estávamos diante de Ti, HaShem.

### A guematria de Eichá

A palavra **Eichá** (איכה, "como?", início de Lamentações) tem valor numérico **36**.

Curiosidade: **lev (לב, coração)** = 32. *Echad* (אחד, um) = 13. *Ahavá* (אהבה, amor) = 13.

A relação 36-32 sugere: **Eichá** está 4 acima de **coração**. O número 4 é o número das letras do Tetragrama. Lendo no Sod: o "como?" do luto é a distância de 4 letras (= todo o Tetragrama) entre o coração ferido de Israel e a unidade cósmica.

### A Sefirá de Malchut em destruição

Malchut, em geral, é a Sefirá da **realeza manifestada**. Em Tisha B''Av, Malchut é **realeza destruída**. O Beit haMikdash era a casa de Malchut na terra. Sua destruição é, no Sod, **dispersão de Malchut nos exílios**.

Cada judeu na diáspora carrega, espiritualmente, **uma faísca da Malchut dispersa**. Quando voltarmos a Yerushalaim restaurada com Mashiach, todas as faíscas se reúnem em **Malchut restaurada plenamente**.

Tisha B''Av é o dia anual em que **percebemos esta dispersão**. Sentimos a falta. Choramos pela Shechiná dispersa que ainda não pôde se reunir.

### O Sod do choro

O choro autêntico, segundo o Zohar (Vayechi 220a), tem **poder cósmico real**. Não é apenas catarse emocional. As lágrimas de Israel em Tisha B''Av:

▸ Atravessam os Olamot superiores.
▸ Despertam Misericórdia em **Bináh** (a Mãe celestial).
▸ Aceleram, espiritualmente, a vinda do Mashiach.

Por isto Yirmiyahu chora em Eichá: *eini eini yorda mayim* (meu olho, meu olho desce água, Eichá 1:16). Suas lágrimas têm peso causal.

A tradição (Rashbi no Idra Zutá): cada lágrima de Israel é **coletada por HaShem** em frasco celestial. Tehilim 56:9: *nodi safarta atá, simá dim''ati venodecha*. Tu numeras meu vagar, põe minhas lágrimas no Teu frasco.

### O Sod do banquinho baixo

Em Tisha B''Av, sentamos no chão ou em **banquinho baixo** (durante a noite até o meio-dia). Por quê?

No Sod, descer fisicamente (sentar baixo) é **descer até onde Malchut está** no estado de exílio. Solidariedade postural com a Shechiná dispersa.

Quando, após o meio-dia, voltamos a sentar em cadeira normal, é sinal corporal de que **a redenção já começou** (mesmo que invisível). **Mashiach começou a nascer** naquela tarde.

### A síntese

Tisha B''Av, no Sod:

▸ Shechiná (Malchut) em exílio máximo, distante de Tiferet.
▸ Inversão sefirótica: Israel desce até a Shechiná, em vez de elevá-la.
▸ Três Beit haMikdash (Chesed, Gevurá, Tiferet) — o terceiro virá eterno.
▸ Or oculta intensa em meio à aparente ausência da Or manifesta.
▸ Mashiach nasce no luto, à tarde.
▸ Choro autêntico tem peso causal cósmico real.
▸ Banquinho baixo = solidariedade com Shechiná dispersa.

A Brit Im Mashiach vive Tisha B''Av nos quatro níveis simultâneos. O luto é real, e a esperança é real. Os dois coexistem no mesmo dia. O Mashiach está nascendo agora, em algum lugar, no momento em que choramos. Esta é estrutura cósmica do dia.

**Fonte:** Ari haKadosh, Shaar haKavvanot, Inyan Tisha B''Av; Pri Etz Chaim, Shaar Tisha B''Av; Zohar Bereshit; Zohar Vayechi 220a; Talmud Bavli, Taanit 30b; Eichá Rabá 1:51; Tehilim 56:9.'
WHERE slug = 'tisha-beav';
COMMIT;
-- PaRDeS do Chag: tu-beav
-- Idempotente: atualiza apenas colunas peshat/remez/drash/sod
BEGIN;
UPDATE chagim SET
  peshat = 'Tu B''Av tem sete origens históricas distintas, todas se acumulando neste único dia para formar **densidade de alegria histórica**.

### 1. Reabertura do casamento com Binyamin

**Shoftim 19-21** narra um dos episódios mais sombrios do período pré-monárquico: a tribo de Binyamin abrigou perpetradores de violência sexual contra a concubina de um levita. As outras 11 tribos lutaram contra Binyamin, quase destruindo-a (600 sobreviventes).

As tribos juraram não casar com Binyamin. Mas perceberam que isto extinguiria a tribo. O juramento foi limitado àquela geração; em **Tu B''Av**, foi declarado que a próxima geração poderia casar.

A reabertura é símbolo: **mesmo após violência irreparável, há caminho para reconciliação intertribal**.

### 2. Fim da morte no deserto

A geração que pecou no caso dos espias (Bamidbar 13-14) foi condenada a morrer no deserto durante 40 anos. Em **9 Av** de cada ano, segundo a tradição (Talmud Bavli, Taanit 30b), morria uma cota daquela geração.

No **40° ano**, em 9 Av, esperaram a cota habitual — **mas ninguém morreu**. Pensaram inicialmente que era erro de calendário. Esperaram até 15 Av — luas cheias confirmaram a data correta, e ainda assim **ninguém havia morrido**. Compreenderam: **o decreto terminou**.

Tu B''Av se torna **dia anual de comemoração do fim do decreto contra a geração do deserto**.

### 3. Permissão para enterrar os mortos de Betar

Após a queda de Betar (135 d.C., já tratado em Tisha B''Av), Roma proibiu o enterro dos cadáveres. Por **15 anos**, os corpos ficaram sem sepultura.

Em **Tu B''Av**, o imperador romano finalmente permitiu o enterro. Tradição: os corpos **não tinham se decomposto** — sinal milagroso de honra divina aos mártires.

Os sábios estabeleceram em Tu B''Av a bracháh **HaTov vehaMetiv** ("o que é bom e faz o bem"), última das quatro brachot da Birkat haMazon, em memória deste milagre.

### 4. Cessação do bloqueio de Yerovam

**Yerovam ben Nevat** (924 a.C.), após a divisão do reino de Israel em norte (Yerovam) e sul (Rechavam), criou bezerros de ouro em Beit El e Dan para impedir que os habitantes do norte fizessem peregrinação a Yerushalaim. Estabeleceu **bloqueios físicos** nos caminhos para Yerushalaim, impedindo passagem.

Séculos depois, o rei do norte **Hoshea ben Elá** (732-722 a.C., último rei antes do exílio assírio) **removeu os bloqueios** em **Tu B''Av**. Israel do norte pôde novamente peregrinar.

Apesar do exílio assírio que veio em seguida, o ato de Hoshea ben Elá restaurou unidade espiritual brevemente.

### 5. Restituição das porções de terra

Durante o período dos Juízes (Yehoshua-Shoftim), as porções de terra entre tribos foram **confirmadas em Tu B''Av**. A celebração consolidou a posse israelita da terra.

(Esta tradição é menos detalhada nas fontes; aparece em Mishná Taanit 4:8 sem elaboração extensa.)

### 6. Cessação do corte de árvores para o altar

Durante o ano, comunidades específicas (em rotação) traziam **madeira para o altar do Beit haMikdash**. A madeira tinha que ser seca o suficiente para queimar bem.

A partir de **Tu B''Av**, o calor do verão já não secava mais a madeira (segundo o clima da Terra de Israel). O corte cessava. Tu B''Av era marcado como **fim do trabalho anual de cortar madeira para o altar**.

Esta razão é menos romântica que as outras, mas significativa: era marco do **ciclo agrícola-litúrgico**.

### 7. A dança em vinhedos

Costume documentado em Mishná Taanit 4:8 (já apresentado em 02). As filhas de Yerushalaim em vestido branco emprestado dançavam, e homens vinham escolher esposas baseando-se em **caráter**, não em **aparência ou riqueza familiar**.

Esta tradição **continuou até a destruição do Segundo Beit haMikdash** (70 d.C.). Após isso, descontinuou-se a dança literal, mas o significado simbólico permaneceu.

### A reconstrução moderna

Em Israel contemporâneo, alguns grupos têm **reconstruído a dança literal**:

▸ Casamentos em **vinhedos da Galileia**, especialmente em Tu B''Av.
▸ Festivais comunitários em vinhedos com música tradicional.
▸ Eventos românticos comunitários inspirados no costume bíblico.

A Brit Im Mashiach valoriza estas reconstruções como **continuidade autêntica**, dentro da halacháh.

### O acúmulo das sete razões

Por que **tantas razões diferentes** convergem em uma única data?

A tradição (Maharal de Praga, Netzach Yisrael) ensina: o calendário tem **datas com carga espiritual específica**. Tu B''Av carrega **carga de reconciliação**. Por isto, ao longo dos séculos, **eventos de reconciliação tendem a coincidir com esta data**.

Não é coincidência mecânica; é **convergência espiritual**. A energia de reconciliação atrai eventos de reconciliação a si.

### A inversão de Tisha B''Av

Tu B''Av (15 Av) é, simbolicamente, **a reversão de Tisha B''Av (9 Av)**. Apenas 6 dias separam o luto máximo da alegria máxima.

Esta proximidade não é estética; é estrutural. **O luto autêntico prepara a alegria autêntica**. Sem 9 Av, o 15 Av seria superficial. Com 9 Av, o 15 Av é catártico.

A Brit Im Mashiach lê esta sequência como **estrutura messiânica em pequena escala**: a redenção final virá precisamente após o exílio mais profundo. Tisha B''Av-Tu B''Av é microcosmo anual do macrocosmo histórico.

**Fonte:** Mishná Taanit 4:8; Talmud Bavli, Taanit 30b-31a, Bava Batra 121a; Shoftim 19-21; Bamidbar 13-14; 2 Melachim 17; Maharal, Netzach Yisrael cap. 8.',
  remez = 'Tu B''Av é o Chag do **amor restaurado** após o luto. Após Tisha B''Av (destruição), Israel ainda precisa **encontrar amor novamente** — amor entre tribos, amor entre cônjuges, amor entre indivíduos e HaShem. Tu B''Av é o portal anual deste reencontro.

### O amor como reconstrução

Após qualquer perda séria, a tentação é **fechar o coração**. Quem perdeu confiança em alguém tende a desconfiar de todos. Quem foi traído tende a evitar relações. Quem perdeu pessoa querida tende a recusar novos vínculos.

Tu B''Av é o **dia anual em que Israel decide recomeçar a amar**. Não porque o luto cessou (Tisha B''Av foi há 6 dias apenas), mas porque **a vida não pode continuar sem amor**. **Amar de novo é ato de fé**.

### Cinco qualidades refinadas em Tu B''Av

▸ **Reconciliação**: capacidade de perdoar e ser perdoado, restaurar relacionamentos quebrados. Tu B''Av honra a reabertura do casamento entre tribos após violência.

▸ **Igualdade essencial**: as filhas de Yerushalaim em vestido branco emprestado igualizam rica e pobre. **A beleza interior** se torna critério, não a aparência social.

▸ **Escolha baseada em caráter**: "fixe seus olhos na família, não na beleza". Sabedoria pedagógica sobre o que importa em uma escolha de vida.

▸ **Continuidade após catástrofe**: a vida continua mesmo após Tisha B''Av. **Casamentos novos**, **filhos novos**, **comunidades novas** — tudo isto floresce mesmo no rastro da destruição.

▸ **Alegria proporcional à tristeza prévia**: a alegria de Tu B''Av tem profundidade precisamente porque vem após o luto. Sem Tisha B''Av, Tu B''Av seria superficial.

### O amor como mitzvá

A Toráh ordena explicitamente o amor em três lugares:

▸ **Amor a HaShem**: *veahavtá et Adonai Elohecha bechol levavchá* (Devarim 6:5).
▸ **Amor ao próximo**: *veahavtá lere''achá kamocha* (Vayikra 19:18).
▸ **Amor ao estrangeiro**: *veahavtem et hager* (Devarim 10:19).

Tu B''Av é o **dia de praticar conscientemente** estes três amores. Cada um pode ser cultivado:

▸ Amor a HaShem: ouvir Shir haShirim como diálogo de amor; expressar gratidão.
▸ Amor ao próximo: gestos concretos de reconciliação com pessoas conhecidas.
▸ Amor ao estrangeiro: gestos de acolhimento, hospitalidade ampliada.

### As três proibições suspensas em Tu B''Av

Após Tisha B''Av, várias restrições continuam até **meio-dia de 10 Av**. Mas a partir desse ponto:

▸ **Carne e vinho permitidos** (após restrição dos Nove Dias).
▸ **Corte de cabelo e barba** permitidos.
▸ **Lavagem de roupa** permitida.

Em **Tu B''Av**, todas estas restrições já se foram. **Casamentos** voltam plenamente. **Música festiva** retoma. **Vida normal** continua.

### A sabedoria das filhas de Yerushalaim

O conselho que as moças davam aos rapazes (Talmud Bavli, Taanit 31a):

*Bachur, sa eynecha — re''ê ma atá borer lecha. Al titen einecha bayofí, ten einecha bamishpacha.*

Rapaz, levante seus olhos — veja o que vai escolher. Não fixe seus olhos na beleza; fixe seus olhos na família.

Esta sabedoria moça é, em camada profunda, **sabedoria etária**:

▸ **Aparência muda**: a juventude passa, a beleza envelhece.
▸ **Caráter permanece**: quem é honesto aos 20 será honesto aos 80.
▸ **Família revela essência**: o ambiente em que alguém cresceu molda quem é hoje.

Tu B''Av carrega esta sabedoria conjugal antiga, ainda relevante.

### O significado de "festa de noivado nacional"

A dança em vinhedos não era apenas dança. Era **encontro matrimonial nacional**. Em sociedade onde casamento era arranjado por famílias, **Tu B''Av oferecia janela de escolha pessoal direta** (com limites apropriados). Moças e rapazes podiam se ver, conversar, escolher — antes que famílias intervissem com arranjos.

Lição moderna: **mesmo em sociedades modernas com escolha livre**, Tu B''Av honra a **importância da escolha de cônjuge baseada em caráter, não em pressões externas**.

### O paralelo com Yom Kippur

A Mishná coloca **Tu B''Av e Yom Kippur** como "dois dias mais felizes". Por quê estas duas datas tão diferentes?

▸ **Yom Kippur**: alegria do **perdão obtido**. A alma se purifica e se reconcilia com HaShem.
▸ **Tu B''Av**: alegria do **amor obtido**. As almas se reconciliam entre si, com cônjuges futuros, com a vida que continua.

Os dois são complementares: **reconciliação vertical** (com HaShem em Yom Kippur) e **reconciliação horizontal** (com outros humanos em Tu B''Av).

A Brit Im Mashiach reconhece esta complementaridade. O Chag mais feliz não é nenhum dos Yamim Tovim maiores (Pessach, Shavuot, Sukkot), mas dois dias menores que carregam **carga de reconciliação**.

### O brilho que vem do escuro

A imagem central de Tu B''Av: **moças em branco dançando em vinhedos** sob a lua cheia de Av (Tu B''Av cai em lua cheia). É **a luz mais brilhante do mês de Av**, vindo apenas dias após o escuro mais profundo (Tisha B''Av).

A tradição (Maharal): **a alegria mais autêntica é aquela que vem do luto autêntico**. Quem não chora em Tisha B''Av também não pode se alegrar plenamente em Tu B''Av. Os dois Chagim formam **única unidade emocional**.

Aplicação prática: a Brit Im Mashiach incentiva membros a **viver os dois Chagim juntos**. Não pular Tisha B''Av e celebrar apenas Tu B''Av (alegria superficial); nem pular Tu B''Av e ficar em Tisha B''Av (depressão crônica). **Ambos, na sequência correta**.

**Fonte:** Mishná Taanit 4:8; Talmud Bavli, Taanit 31a; Devarim 6:5, 10:19; Vayikra 19:18; Maharal, Netzach Yisrael cap. 8.',
  drash = '### Peshat — o sentido literal

Tu B''Av, no Peshat, é o **15° dia de Av**, Chag rabínico classificado pela Mishná (Taanit 4:8) como **um dos dois dias mais felizes** do calendário (junto com Yom Kippur).

Seven eventos históricos felizes ocorreram em Tu B''Av:
1. Reabertura do casamento entre tribos com Binyamin.
2. Fim da morte no deserto.
3. Restituição de porções territoriais.
4. Permissão para enterrar mortos de Betar.
5. Cessação dos bloqueios de Yerovam ben Nevat.
6. Cessação do corte de árvores para o altar.
7. Dança das filhas de Yerushalaim em vinhedos para escolha de cônjuges.

Sem proibição de trabalho, sem liturgia complexa. **Tachanun omitido** como única alteração oficial. Casamentos permitidos plenamente.

### Remez — a alusão velada

O número **15** alude a múltiplas dimensões:

▸ **15 = YH** (Yah), abreviação do nome divino (já tratado em Tu B''Shvat e Pessach).
▸ **15 = lua cheia**, com Malchut em plenitude refletindo Tiferet.
▸ **15° dia do mês** quando Israel saiu do Mitzraim (Pessach é em 15 Nissan). Paralelo: Tu B''Av é dia de "saída" de outro tipo — de luto para alegria.

A **dança em vinhedos** alude a múltiplas dimensões bíblicas:

▸ **Bereshit 9:20**: Noach plantou vinhedo após o dilúvio. Vinhedo = renovação após catástrofe.
▸ **Yeshayahu 5:1-7**: o vinhedo de HaShem é Israel.
▸ **Shir haShirim 7:13**: amantes vão ao vinhedo para amar (alegoria HaShem-Israel).

Dança em vinhedo, no Remez, é **Israel renovando-se em sua identidade após o exílio**.

### Drash — o ensino homilético

A **Mishná Taanit 4:8** ensina sobre as filhas de Yerushalaim em vestes brancas **emprestadas**. Por que emprestadas?

*Shelo levayesh et mi she''ein lo* — para não envergonhar quem não tem.

A sabedoria pedagógica: **uniformidade da aparência igualiza ricos e pobres**. Quando todas vestem o mesmo branco emprestado, o **caráter interno** se torna o critério visível. Esta é forma de **tzedaká estrutural** — não dando dinheiro, mas igualando condições para que a comparação econômica desapareça.

Lição moderna: comunidades autênticas estruturam-se para que **a riqueza não seja vantagem visível** em ocasiões sagradas. Em casamentos, em refeições festivas comunitárias, em rituais — a igualdade pedagógica importa.

Outro Drash: o conselho das moças aos rapazes (*al titen einecha bayofí, ten einecha bamishpacha*) é, em camada profunda, **manifesto contra superficialidade**. Na sociedade antiga (como na moderna), a tentação de escolher baseado em aparência é forte. **Tu B''Av estabelece o caráter como critério**.

### Sod — o segredo kabalístico

Como tratado em 05, Tu B''Av opera no Sod:

▸ **Shechiná (Malchut) sobe a Tiferet** em movimento de reconciliação.
▸ **Lua cheia** = Malchut em plenitude refletindo Tiferet.
▸ **Sete eventos históricos** = sete Sefirot inferiores ativadas.
▸ **Casamento humano** = reflexo terreno do casamento cósmico.
▸ **HaTov vehaMetiv** (4ª bracháh) presente em cada Birkat haMazon do ano.

Mais profundamente: Tu B''Av é o **dia anual em que HaShem renova o noivado com Israel**. Não conclui o casamento (isso é tarefa do Mashiach), mas **reafirma o vínculo eterno** mesmo após o luto de Tisha B''Av.

A guematria de **Av** (אב) = 3. **Tu** (טו) = 15. **3 + 15 = 18 = Chai** (vida). Tu B''Av é o ponto em que **a vida emerge do mês de Av**.

### O paradoxo Tu B''Av-Yom Kippur

A Mishná coloca os dois como **dias mais felizes**. Yom Kippur tem cinco aflições corporais e é dia de jejum total; Tu B''Av tem refeição festiva e dança. Como podem ser **igualmente felizes**?

A resposta tradicional (Maharal, Netzach Yisrael cap. 8):

▸ **Yom Kippur**: alegria do **perdão obtido**. A alma se reconcilia verticalmente com HaShem.
▸ **Tu B''Av**: alegria do **amor restaurado**. As almas se reconciliam horizontalmente entre si.

Ambos são forma de **reconciliação completa**. Ambos terminam um período de tensão (Aseret Yemei Teshuváh / Bein haMetzarim). Ambos abrem caminho para um novo ciclo.

**A felicidade autêntica é dupla**: vertical e horizontal. Sem reconciliação com HaShem, faltaria base; sem reconciliação com outros, faltaria horizontalidade. Os dois Chagim juntos completam o ciclo.

### A guematria de "Ahavá"

**Ahavá** (אהבה, amor) = 1 + 5 + 2 + 5 = **13**.

**Echad** (אחד, um) = 1 + 8 + 4 = **13**.

**Ahavá = Echad** em guematria. Esta é coincidência matemática? Não, segundo a tradição. **Amor autêntico produz unidade**. Onde há ahavá, há echad. Onde há echad, há ahavá.

Em Tu B''Av, ambos os números (13) se manifestam:

▸ **HaShem é Echad** (declaração central da Shemá).
▸ **HaShem ama Israel** (premissa da aliança).
▸ **Israel é convocada a unidade interna** (reconciliação intertribal).
▸ **Israel ama HaShem** (Devarim 6:5).

O amor que une Israel ao Echad cósmico **é a essência de Tu B''Av**.

### O Sod do vinhedo

**Vinhedo** (*kerem*) tem associações cósmicas:

▸ **Tiferet** corresponde frequentemente a videira/vinho (Yeshayahu 5; *gefen* em hebraico).
▸ **Vinho** é Or descendo na materialidade — bracháh universal sobre vinho atravessa todos os Chagim.
▸ **Vinhedo** é, no Sod, **espaço onde Tiferet se manifesta colhível**.

As filhas de Yerushalaim dançando em vinhedos são, no Sod, **Malchut tocando Tiferet diretamente**. Não através de mediação cósmica complexa — através do gesto físico simples de dançar no espaço onde Tiferet floresce.

Esta é razão profunda pela qual Tu B''Av é especialmente auspicioso para casamentos: porque **o casamento humano** repete em microcosmo **o yichud Tiferet-Malchut** que ocorre no vinhedo cósmico.

### A síntese

Tu B''Av, nos quatro níveis:

▸ **Peshat**: 15 Av, dia mais feliz pela Mishná, com 7 eventos históricos felizes.
▸ **Remez**: número 15 = YH; lua cheia = Malchut plena; dança em vinhedo = renovação após catástrofe.
▸ **Drash**: igualdade pedagógica (vestes emprestadas); caráter sobre aparência; reconciliação intertribal como modelo.
▸ **Sod**: Shechiná-Malchut sobe a Tiferet; *ahavá* = *echad* (13); vinhedo como espaço de yichud direto.

A Brit Im Mashiach vive Tu B''Av nos quatro níveis simultâneos. Reconhece no Chag não apenas dia de casamentos terrenos, mas **ensaio anual da reconciliação cósmica final** — quando HaShem e Israel completarão o casamento eterno através do Mashiach.

**Fonte:** Mishná Taanit 4:8, Yadayim 3:5; Talmud Bavli, Taanit 30b-31a; Maharal, Netzach Yisrael cap. 8; Ari haKadosh, Shaar haKavvanot, Inyan Tu B''Av; Shir haShirim 7-8; Yeshayahu 5; Devarim 6:5.',
  sod = 'Tu B''Av, no Sod, é o **dia em que a Shechiná (Malchut) sobe a Tiferet** após o exílio de Tisha B''Av. Toda a estrutura espiritual do dia opera nesta **reconciliação cósmica**.

### A reconciliação Tiferet-Malchut

Como tratado em Tisha B''Av (seção 05), a Shechiná (Malchut) **desceu ao exílio** com Israel, separada de Tiferet. Tisha B''Av é o estado de **máxima separação**.

Em **Tu B''Av**, ocorre **o início do reencontro**. A Shechiná começa a subir de volta a Tiferet. Não conclui-se totalmente (isso virá apenas com o Mashiach), mas o **movimento de reconciliação se inicia**.

Por isto Tu B''Av é o **Chag do casamento**: porque cosmicamente, **HaShem e Israel estão renovando seu noivado**. As filhas de Yerushalaim dançando em vinhedos são, no Sod, **representação física da Shechiná-Israel reencontrando Tiferet-HaShem**.

### O número 15

Tu B''Av cai em **15 Av**. Como em Tu B''Shvat, o número 15 é o valor da abreviação do nome divino **YH** (Yah). Israel escreve **טו** (Tu) em vez de **יה** (Yah) por respeito ao Nome divino.

No Sod: Tu B''Av opera sob **influxo do nome YH**. Este Nome está associado a **Chochmáh e Bináh** (tríade superior do pensamento). Tu B''Av carrega, portanto, dimensão de **sabedoria reconciliadora** — não amor sentimental superficial, mas amor com **chochmáh** profunda.

### A lua cheia

Tu B''Av cai em **lua cheia** (15° dia do mês lunar). A lua cheia tem significado cabalístico:

▸ Símbolo de **Malchut** em sua plenitude.
▸ Reflexo perfeito do sol (sol = Tiferet, lua = Malchut).
▸ A Shechiná "iluminada" plenamente por Tiferet.

Em Tisha B''Av (9 Av), a lua está **decrescente** (após cheia em meio do mês anterior). Em Tu B''Av (15 Av), a lua está **cheia**. Cosmicamente, a Shechiná sai do estado decrescente para o estado pleno.

### Os Sete Eventos Históricos como Sete Sefirot

A tradição luriânica pode ler os **sete eventos felizes** em Tu B''Av como correspondências sefiróticas:

▸ **Reabertura do casamento com Binyamin** → *Chesed* (bondade reconciliadora).
▸ **Fim da morte no deserto** → *Gevurá* (rigor cessado, decreto terminado).
▸ **Restituição das porções de terra** → *Tiferet* (harmonia restaurada).
▸ **Permissão de enterrar mortos de Betar** → *Netzach* (vitória que permite honra eterna).
▸ **Remoção dos bloqueios de Yerovam** → *Hod* (esplendor da peregrinação restaurada).
▸ **Cessação do corte de madeira** → *Yessod* (fundamento sazonal completo).
▸ **Dança em vinhedos** → *Malchut* (manifestação plena da reconciliação).

Sete eventos → sete Sefirot inferiores. Tu B''Av ativa **toda a tríade emocional** simultaneamente.

### O sentido cósmico do casamento

No Sod, **casamento humano** é reflexo terreno do **casamento cósmico** entre HaShem e Israel. Por isto Tu B''Av é dia preferencial de casamentos:

▸ Cada casamento humano em Tu B''Av **ressoa** com o casamento cósmico em curso.
▸ A alegria do noivado terrestre **alimenta** a alegria do noivado celestial.
▸ As bênçãos sob a chupá são, no Sod, **invocação da Shechiná** sobre o casal.

A Brit Im Mashiach, ao celebrar Tu B''Av, lê com seriedade: **cada casal feliz** contribui, em camada profunda, **à reconciliação cósmica em curso**.

### O brincar com "yofí"

O conselho das filhas de Yerushalaim (Talmud Bavli, Taanit 31a) é, no Sod, mais profundo que aparenta:

*Al titen einecha bayofí, ten einecha bamishpacha.*

Não fixe seus olhos na beleza; fixe seus olhos na família.

**Yofí** (יופי, beleza) tem valor numérico **96**. **Mishpacha** (משפחה, família) tem valor **433**. A diferença é considerável.

No Sod: **yofí** é Or **superficial** (Or chitzoni); **mishpacha** é Or **interior** (Or pnimi). O conselho ensina a **buscar Or pnimi**, não Or chitzoni.

### A bracháh HaTov vehaMetiv

A tradição (Mishná Berachot 6:8) estabelece que a quarta bracháh da Birkat haMazon (**HaTov vehaMetiv**) foi instituída em **Tu B''Av**, em memória do milagre da preservação dos corpos de Betar.

Esta bracháh é dita em **toda Birkat haMazon** do ano. Cada vez que um judeu agradece pela refeição, ele recita uma bracháh **instituída em Tu B''Av**. Cosmicamente, **Tu B''Av está presente em cada refeição diária do ano**.

Esta dispersão cósmica é única: nenhum outro Chag tem **bracháh diária permanente** instituída nele.

### A guematria de "Av" e "Tu"

**Av** (אב) = 1 + 2 = **3**.

**Tu** (טו, 15) = 9 + 6 = **15**.

3 + 15 = **18** = *chai* (חי, vida).

A guematria sugere: **Tu B''Av é a vida do mês de Av**. Em meio à tensão do mês (luto da primeira metade), a segunda metade traz **vida renovada**. Tu B''Av é o ponto onde **chai (vida)** emerge.

### O retorno ao Gan Eden

A tradição (Eichá Rabá; Maharal) ensina que Tu B''Av é **micro-retorno simbólico ao Gan Eden**. Razões:

▸ Casamento de Adam e Eva foi prototypo do amor humano. Tu B''Av celebra continuidade desta tradição original.
▸ Os vinhedos onde se dançava em Tu B''Av são, simbolicamente, **vinhedos do Gan Eden**.
▸ A roupa branca emprestada lembra **as folhas com que Adam e Eva se cobriram após o pecado** — mas no Tu B''Av, a "cobertura" é **escolha consciente**, não vergonha.

Cada Tu B''Av, Israel ensaia **o retorno ao Gan Eden** — o reino messiânico onde Adam-Eva, HaShem-Israel, Tiferet-Malchut estão em plenitude.

### A síntese

Tu B''Av, no Sod:

▸ Shechiná-Malchut sobe a Tiferet em movimento de reconciliação.
▸ Influxo do nome YH (15° dia).
▸ Lua cheia = Malchut em plenitude refletindo Tiferet.
▸ Sete eventos históricos = sete Sefirot inferiores ativadas.
▸ Casamento humano como reflexo do casamento cósmico.
▸ "Yofí" superficial vs "mishpacha" profunda — Or pnimi como meta.
▸ Bracháh HaTov vehaMetiv presente em cada Birkat haMazon do ano.
▸ Micro-retorno ao Gan Eden.

A Brit Im Mashiach vive Tu B''Av nos quatro níveis simultâneos. Reconhece no dia **ensaio anual da reconciliação messiânica final**, em que HaShem e Israel estarão em plenitude amorosa permanente, sem mais necessidade de luto.

**Fonte:** Talmud Bavli, Taanit 31a, Bava Batra 121a, Berachot 48b; Maharal, Netzach Yisrael cap. 8; Ari haKadosh, Shaar haKavvanot, Inyan Tu B''Av; Eichá Rabá; Mishná Berachot 6:8.'
WHERE slug = 'tu-beav';
COMMIT;
-- PaRDeS do Chag: tu-bishvat
-- Idempotente: atualiza apenas colunas peshat/remez/drash/sod
BEGIN;
UPDATE chagim SET
  peshat = 'Tu B''Shvat tem dupla fundação: **legal-rabínica** (séculos antes da era comum) e **espiritual-cabalística** (século XVI).

### Fundação rabínica original

A **Mishná** (Rosh haShaná 1:1) estabelece quatro Anos Novos no calendário, e cita explicitamente a discussão entre as duas escolas:

*B''echad biShvat rosh haShaná laIlán kedivrei Beit Shamai. Beit Hilel omrim bachamisha-asar bo.*

No primeiro de Shvat é o Ano Novo da Árvore, segundo Beit Shamai. Beit Hilel diz: no décimo-quinto deste.

A halacháh segue **Beit Hilel** — 15 de Shvat. A divergência tem fundamento botânico: Shamai considera o início do mês, Hilel considera o meio do mês quando o ciclo natural já é claramente novo.

Por séculos após a Mishná, Tu B''Shvat permaneceu como **marco legal** apenas — sem festividade especial. Era simplesmente o dia técnico para começar a contar a idade das árvores em transações de orlá, ma''aser e neta revai.

### Tzefat e o nascimento do Seder

No **século XVI**, em **Tzefat** (Galileia, na época sob domínio otomano), uma constelação de cabalistas se reuniu — incluindo Rav Itzchak Luria (Arizal), Rav Moshé Cordovero, Rav Chaim Vital, Rav Shlomo Alkabetz (autor do Lecha Dodi), Rav Yosef Caro (autor do Shulchan Aruch). Esta foi a geração mais espiritualmente intensa do judaísmo desde os geonim.

Os cabalistas instituíram o **Seder de Tu B''Shvat** como ritual completo. **Rav Chaim Vital** compilou as kavanot luriânicas no texto *Pri Etz Hadar* (Fruto da Árvore Formosa), publicado posteriormente em **1729**.

### Estrutura do Seder Cabalístico

O Seder tem 4 partes correspondentes aos 4 Olamot:

▸ **Olam Asiáh** (Ação): primeiro copo (vinho branco), 10 frutos com casca dura externa e parte comestível interior — castanha, noz, amêndoa, romã (casca), banana, melão, abacate, coco, laranja (casca), tâmara seca (osso/caroço).

▸ **Olam Yetziráh** (Formação): segundo copo (branco com pouco vermelho), 10 frutos com osso/caroço interior e parte comestível externa — azeitona, tâmara, ameixa, damasco, abricot, pêssego, cereja, manga, abacate (parte com osso), maçã (com sementes).

▸ **Olam Briáh** (Criação): terceiro copo (vermelho com pouco branco), 10 frutos comestíveis inteiros — uva, figo, pera, maçã (sem sementes), melão (sem casca), banana (sem casca), abacaxi (sem cascão), morango, framboesa, mirtilo.

▸ **Olam Atzilut** (Emanação): quarto copo (vinho tinto puro), sem frutos (Atzilut está acima de qualquer materialidade).

Os números variam por tradição; a divisão clássica é 10+10+10. Total: 30 frutos diferentes durante o Seder.

### Difusão após Tzefat

Do círculo cabalístico de Tzefat, o Seder se espalhou:

▸ **Comunidades sefarditas e mizrachi**: adotaram amplamente, especialmente comunidades de origem norte-africana, persa, e Bukharin.
▸ **Comunidades chassídicas**: incorporaram, com modificações.
▸ **Comunidades ashkenazi não-chassídicas**: adotaram mais lentamente; em algumas regiões, apenas no século XIX-XX.
▸ **Sionismo moderno (séc. XX)**: enfatizou aspecto ecológico, plantio de árvores na Terra de Israel, sem necessariamente o Seder cabalístico.

A Brit Im Mashiach, com componente sefardita-cabalístico, observa o **Seder completo** quando possível, mais o aspecto ecológico moderno.

### Histórias e tradições

Tradição cabalística (Pri Etz Hadar): comer frutos com kavaná consciente em Tu B''Shvat **opera tikun** sobre o pecado de Adam haRishon (que comeu fruto sem kavaná, na Árvore do Conhecimento). Cada fruto comido com bracháh correta é tikun parcial do erro primordial.

### Plantio de Árvores — tradição moderna

Em Israel, a partir de finais do século XIX (Yishuv pré-Estado), Tu B''Shvat tornou-se ocasião para **plantar árvores**. Crianças em escolas plantam, famílias contribuem para organizações de reflorestamento. O **Keren Kayemet leYisrael** (Fundo Nacional Judaico) coordena esta atividade.

A Brit Im Mashiach incentiva contribuir financeiramente para plantio em Israel como parte da observância — ainda que o ato físico de plantar fique impraticável fora de Israel.

**Fonte:** Mishná Rosh haShaná 1:1; Talmud Bavli, Rosh haShaná 14a-15b; Pri Etz Hadar de Rabi Chaim Vital (publ. 1729); Rav Chaim Vital, Shaar haKavvanot, Inyan Tu B''Shvat.',
  remez = 'Tu B''Shvat é o Chag em que **Israel honra a natureza**. Não como adoração da criação (proibido), mas como reconhecimento de que **a terra é sagrada porque foi dada por HaShem**. A árvore é símbolo central — paralelo entre vida vegetal e vida humana.

### A árvore como espelho humano

**Devarim 20:19** estabelece uma frase que se tornou central na tradição: *ki haAdam etz haSadeh* — porque o homem é a árvore do campo.

A frase, contextualizada no verso original, fala sobre **proibir destruir árvores frutíferas mesmo em guerra**. Mas a tradição rabínica lê com camada mais profunda: **o homem é, em algum sentido, árvore**. Tem raízes (origem, família, tradição), tronco (estrutura interna), galhos (relações sociais), folhas (atividade visível), e frutos (legado).

Como a árvore precisa de tempo para crescer, o homem precisa de paciência. Como a árvore dá frutos apenas após anos, o homem produz seu "fruto" (legado, sabedoria, descendência) apenas após maturação. Como a árvore profunda resiste a tempestades, o homem com raízes profundas (em Toráh, em família, em comunidade) resiste a crises.

### Cinco qualidades refinadas em Tu B''Shvat

▸ **Paciência cíclica**: a árvore não força seus frutos; aguarda seu tempo. Tu B''Shvat ensina paciência com processos lentos.

▸ **Gratidão pelos alimentos**: cada fruto comido com bracháh correta é reconhecimento de que a vida vem do solo, e o solo vem de HaShem.

▸ **Conexão à Terra de Israel**: as Shiv''at haMinim conectam o judeu à geografia bíblica. Mesmo na diáspora, comer azeitona, tâmara ou figo em Tu B''Shvat é tocar a Terra prometida.

▸ **Cuidado ecológico**: a Toráh ordena *bal tashchit* (não destruir) — particularmente árvores frutíferas. Tu B''Shvat refina esta sensibilidade.

▸ **Aprendizado das árvores**: contemplar como a natureza segue ordem perfeita ensina humildade. Não controlamos a árvore; cooperamos com ela.

### O fruto como simbolismo cabalístico

A tradição cabalística (Pri Etz Hadar) ensina que cada categoria de fruto representa uma dimensão da alma:

▸ **Frutos com casca dura externa** (laranja, banana, melão): representam o **Nefesh** (vitalidade) — vida que precisa de proteção externa para sobreviver no mundo.

▸ **Frutos com osso/caroço interno** (azeitona, tâmara, pêssego): representam o **Ruach** (espírito) — vida com fundamento sólido interno que sustenta a parte comestível.

▸ **Frutos comestíveis inteiros** (uva, figo, framboesa): representam a **Neshamáh** (alma) — vida em sua forma mais elevada e acessível, sem separação.

▸ **Sem fruto** (4° copo de vinho puro): representa **Chayá e Yechidá** — níveis acima de qualquer materialidade, intocáveis pela boca.

Comer através das três categorias de fruto, em sequência ascendente, é **subir pelos níveis da alma** durante o Seder.

### A Árvore do Gan Eden

Os cabalistas leem Tu B''Shvat como **tikun parcial** do erro de Adam haRishon na Árvore do Conhecimento (Bereshit 2:17, 3:6). Adam comeu sem kavaná, fora do tempo, com fruta proibida. Em Tu B''Shvat, judeus comem **com kavaná, no tempo certo, com frutos permitidos e bênção apropriada**. Cada bracháh dita é micro-reparo do erro primordial.

A Brit Im Mashiach lê esta dimensão com seriedade: o Chag não é apenas sobre **árvores físicas**; é sobre **a Árvore Original**, a relação fundadora entre humanidade, natureza e o Eterno.

### Conexão com Sefirat haOmer e Pessach

Em janeiro-fevereiro (Shvat), a Terra de Israel está em fase de **chuvas finais e brotamento**. Pessach virá em abril (Nissan). Sefirat haOmer entre Pessach e Shavuot trará o ciclo agrícola completo.

Tu B''Shvat é o **primeiro marco do ano agrícola-litúrgico**. Antes de Pessach (libertação), Shavuot (Toráh), Sukkot (colheita), há **Tu B''Shvat (renovação das árvores)**. O ciclo todo começa aqui.

### A árvore messiânica

Yeshayahu 11:1 fala do Mashiach como **rebento** (*choter*) que sairá do tronco de Yishai. Imagem botânica direta. O Mashiach é **árvore messiânica** crescendo da raiz davídica.

Tu B''Shvat, então, é o Chag em que celebramos **a árvore messiânica em desenvolvimento**. Toda árvore que cresce em Israel é, no Sod, ensaio do crescimento da árvore messiânica histórica que ainda virá.

### A modéstia da celebração

Diferentemente dos Chagim maiores, Tu B''Shvat não exige rituais elaborados, não tem proibição de trabalho, não tem leituras litúrgicas obrigatórias. É Chag **modesto** — apropriado ao próprio espírito da árvore que cresce silenciosamente.

A modéstia não diminui a importância. Pelo contrário: ensina que **o sagrado não precisa de grandiosidade**. Uma maçã comida com bracháh em uma manhã comum pode ser tão santa quanto um Seder completo.

**Fonte:** Devarim 20:19; Yeshayahu 11:1; Bereshit 2-3; Pri Etz Hadar; Talmud Bavli, Berachot 35b sobre brachot de frutas; Mishná Berachot 6.',
  drash = '### Peshat — o sentido literal

Tu B''Shvat, no Peshat, é o **Ano Novo das Árvores** (Mishná Rosh haShaná 1:1), estabelecido como marco legal para contagem da idade das árvores frutíferas em relação à orlá, ma''aser e neta revai. É instituição rabínica antiga, não bíblica. O Chag não tem proibição de trabalho, não tem liturgia complexa, não tem mitzvá ritual obrigatória além da omissão de Tachanun.

A celebração festiva atual (Seder cabalístico, comer Shiv''at haMinim, plantar árvores) é construção posterior — séc. XVI para o Seder, séc. XIX-XX para o plantio. Mas é construção válida e profunda.

### Remez — a alusão velada

A palavra **árvore** (*etz* עץ) tem valor numérico **160**. Esse número é o valor de **kessef** (כסף, prata/dinheiro). Reflexão profunda: a árvore frutífera é o **dinheiro original** — fonte de sustento que não exige indústria, apenas paciência. O homem que tem árvore frutífera é, em algum sentido, rico independentemente da economia financeira.

E **etz haChayim** (Árvore da Vida) tem valor 160 + 86 (haChayim) = 246. *Mor* (מור, mirra) também = 246. Há associação cosmologicamente entre Árvore da Vida e a mirra (planta aromática). Detalhe de guematria cabalística profunda.

A **palavra Shvat** (שבט) significa também "vara/tribo". Tu B''Shvat ocorre no mês cujo nome é também "vara" — a árvore é uma vara que se tornou útero de frutos. Há analogia: cada um de nós começa como vara seca, e através de cuidado divino se torna árvore frutífera.

### Drash — o ensino homilético

O **Talmud Bavli, Taanit 7a** ensina paralelo profundo entre **estudioso de Toráh e árvore**:

*Im talmid chacham hagun hu, lema''eilá lo lefagô*. Se o estudioso de Toráh é digno, o (texto) eleva-se sobre ele.

E continua: *kemo na''an etz hadar, sheishhú aviv vechorshô — ken talmid chacham*. Como uma árvore plantada formosa, cujo pai (raiz) é a primavera e o tronco — assim o estudioso de Toráh.

O estudioso é como árvore: precisa de tempo, raízes profundas, ambiente certo. Quem força resultados rápidos cultiva ervas daninhas, não árvores. **Tu B''Shvat é Chag da paciência espiritual estruturada**.

Outro Drash: **Adam haRishon comeu da Árvore do Conhecimento sem kavaná correta**. Em Tu B''Shvat, comemos frutas **com kavaná correta**. Cada bracháh dita é tikun parcial do erro adâmico. Por isto a tradição cabalística diz que Tu B''Shvat opera **micro-reparo do Gan Eden**. Não restauração completa (apenas Mashiach faz isto), mas contribuição autêntica.

### Sod — o segredo kabalístico

Como tratado em 05, Tu B''Shvat ativa, no Sod, a **Etz Chaim cósmica** através de cada árvore física. Os elementos:

▸ **Quatro Olamot** (Asiáh, Yetziráh, Briáh, Atzilut) → quatro copos de vinho do Seder.
▸ **Sete Sefirot inferiores** → sete espécies (Shiv''at haMinim).
▸ **Frutos com casca dura** → Olam Asiáh, klipot facilmente identificáveis.
▸ **Frutos com osso interno** → Olam Yetziráh, fundamento sustentador.
▸ **Frutos comestíveis inteiros** → Olam Briáh, Or recebida sem mediação.
▸ **Vinho sem fruto** → Olam Atzilut, Or absoluta.

Quem participa do Seder consciente desses níveis **opera tikun simultâneo nos quatro mundos**.

### O Sod do número 15

Tu B''Shvat é em **15 de Shvat**. O número 15 é o valor da abreviação do nome divino **YH** (י = 10, ה = 5). Por respeito ao Nome, judeus escrevem o número 15 como **טו** (Tu = 9+6 = 15) em vez de **יה** (Yah = 10+5 = 15).

O nome **TU B''SHVAT** preserva esta substituição: **Tu** (טו) literalmente significa "15", mas é codificação para não pronunciar o Nome divino diretamente como número.

No Sod, isto significa: **Tu B''Shvat opera sob influxo do nome YH** (Yah), o Nome divino "intermediário" entre Tetragrama completo e nomes menores. YH está associado a **Chochmáh e Bináh** (as duas Sefirot superiores da tríade pensante).

Por isto Tu B''Shvat tem dimensão de **chochmáh ecológica** — sabedoria que reconhece a sacralidade da natureza sem cair em idolatria. O equilíbrio é fino, e o Chag oferece o modelo correto.

### A árvore como ponte entre mundos

Estruturalmente, uma árvore tem três partes:

▸ **Raízes** — invisíveis, abaixo da terra (Olam Asiáh).
▸ **Tronco** — visível, sólido (Olamot Yetziráh-Briáh).
▸ **Galhos com frutos** — alcançando o céu (Olam Atzilut).

Esta estrutura tripartite reflete, no Sod, a estrutura da alma humana:

▸ **Nefesh-Ruach-Neshamáh** (níveis crescentes da alma) ↔ raízes-tronco-galhos.

Quem contempla uma árvore frutífera em Tu B''Shvat está, no Sod, contemplando **a estrutura de sua própria alma**. A árvore externa é espelho da árvore interna.

### Por que a Árvore do Conhecimento foi proibida

Bereshit 2:17 proíbe especificamente a **Árvore do Conhecimento do Bem e do Mal** (não a Árvore da Vida, que era permitida). Por quê?

A tradição luriânica explica: a Árvore do Conhecimento misturava bem e mal em um único fruto. Comer dela seria internalizar a mistura — confundir kedushá e klipá dentro de si.

Tu B''Shvat reverte isso simbolicamente: comemos frutos **com kavaná correta**, com brachot que **separam bem e mal**, com bênção que **purifica** o ato de comer. Cada fruto comido em Tu B''Shvat é micro-correção do erro adâmico.

### A síntese

▸ **Peshat**: Ano Novo das Árvores, marco legal para idade de árvores frutíferas.
▸ **Remez**: árvore = sustento original; Shvat = vara que se torna árvore; etz haChayim com guematria.
▸ **Drash**: estudioso como árvore (paciência cosmológica); tikun do erro adâmico do Gan Eden.
▸ **Sod**: Etz Chaim ativada; quatro Olamot percorridos; sete Sefirot inferiores via Shiv''at haMinim; influxo do nome YH; árvore como espelho da alma.

A Brit Im Mashiach vive Tu B''Shvat nos quatro níveis simultâneos. Reconhece no Chag não apenas memória botânica, mas **ato espiritual de honrar a Criação e antecipar a árvore messiânica em crescimento**.

**Fonte:** Mishná Rosh haShaná 1:1; Bereshit 2-3; Devarim 8:7-10; Talmud Bavli, Taanit 7a; Pri Etz Hadar; Sefer Yetziráh sobre estrutura das letras hebraicas; Zohar Vayechi 222a.',
  sod = 'Tu B''Shvat, no Sod, é o Chag em que a **Etz Chaim** (Árvore da Vida) se manifesta na árvore física. Cada árvore frutífera, cada fruto, cada bracháh dita, opera tikun nas Sefirot. O Seder cabalístico, instituído em Tzefat, codifica essa operatividade.

### A Etz Chaim como árvore

A **Etz Chaim** (Árvore da Vida) é a estrutura das **10 Sefirot** desenhadas em forma arborescente: raízes em Keter (alto), tronco descendo, galhos formando triângulos sefiróticos, frutos em Malchut (base manifesta).

Tu B''Shvat é o Chag em que a Etz Chaim **se materializa**. Cada árvore frutífera real é, no Sod, **representação física** da Etz Chaim cósmica. Cada fruto comido é Or sefirótica internalizada.

### Os quatro Olamot e os 30 frutos

Como visto em 03, o Seder distribui frutos em três categorias correspondentes aos três Olamot inferiores (Asiáh, Yetziráh, Briáh), mais o vinho puro para Atzilut (sem fruto).

▸ **Olam Asiáh** (Ação) → frutos com **casca externa dura**, parte comestível interna.
  Estes frutos têm proteção externa, refletindo a necessidade de "casca protetora" no mundo material. **Klipot espirituais** correspondentes neste nível são facilmente identificáveis e descartáveis.

▸ **Olam Yetziráh** (Formação) → frutos com **osso interno**, parte comestível externa.
  Estes frutos têm sustentação interior, refletindo a necessidade de **fundamento sólido emocional** no mundo das formações. As klipot deste nível são mais sutis.

▸ **Olam Briáh** (Criação) → frutos **comestíveis inteiros**, sem casca dura nem osso interno.
  Estes frutos são pura entrega, sem proteção nem fundamento separado. Refletem o nível mental-criativo onde a Or pode ser recebida diretamente.

▸ **Olam Atzilut** (Emanação) → vinho puro, sem fruto.
  Atzilut é o nível onde a Or é absoluta, sem mediação material. O vinho representa o sangue divino simbólico — fluxo de Or do nível mais alto.

### A Sefirá de Malchut e a árvore

**Malchut** corresponde à Sefirá da árvore frutífera. Por quê? Porque Malchut é a Sefirá **manifesta** — onde o que vem de cima toma forma material e dá fruto.

Em Tu B''Shvat, Malchut está em estado especial: as árvores começam a renovar seu fluxo (a seiva sobe). Esta é, no Sod, **a renovação anual de Malchut**. Cada ano, Malchut passa por ciclo: renovação (Tu B''Shvat) → florescimento (Pessach) → frutificação (Shavuot) → colheita (Sukkot) → repouso (Cheshvan-Tevet) → renovação novamente (Tu B''Shvat seguinte).

### As Shiv''at haMinim como Sete Sefirot

As **sete espécies da Terra de Israel** (Devarim 8:8) correspondem, na tradição cabalística, às **sete Sefirot inferiores**:

▸ **Chitá** (trigo) → *Chesed* — bondade que nutre.
▸ **Se''orá** (cevada) → *Gevurá* — rigor que disciplina.
▸ **Guéfen** (uva) → *Tiferet* — beleza harmoniosa, vinho como simbolismo central.
▸ **Te''enáh** (figo) → *Netzach* — vitória eternizada.
▸ **Rimón** (romã) → *Hod* — esplendor com sementes inumeráveis.
▸ **Zayit** (azeitona) → *Yessod* — fundamento, com óleo como simbolismo da Or que desce.
▸ **Dvash/Tamar** (mel/tâmara) → *Malchut* — doçura final, reino que se manifesta.

Quem come as sete espécies em Tu B''Shvat ativa, no Sod, as sete Sefirot inferiores em sequência completa.

### A Árvore do Conhecimento e o tikun

A tradição (Pri Etz Hadar) é explícita: Tu B''Shvat opera tikun sobre o **pecado de Adam haRishon**. Adam comeu da Árvore do Conhecimento com kavaná errada, fora do tempo. Cada fruto comido em Tu B''Shvat **com bracháh** e **com kavaná** é micro-reparo daquele erro.

A guematria sublinha: *Adam* (אדם) = **45**. *Chagim* (חגים, festas) tem componentes paralelos. A relação numérica complexa aponta para Adam como "primeiro celebrante" — e cada Chag posterior é correção de algum erro adâmico.

### A árvore messiânica

Yeshayahu 11:1: *Veyatzá choter migezá Yishai, vanetzer mishorashav yifrê*. Sairá um rebento do tronco de Yishai, e um broto de suas raízes frutificará.

O **Mashiach** é descrito explicitamente como **rebento que cresce de raiz**. Imagem botânica direta. Tu B''Shvat é, no Sod, **Chag da árvore messiânica em desenvolvimento**. A raiz davídica está plantada desde a Bíblia; o rebento ainda cresce; o fruto final virá quando a árvore atingir maturidade.

Cada árvore plantada em Israel hoje é, no Sod, contribuição para a árvore messiânica cósmica que cresce silenciosamente.

### O número 15

Tu B''Shvat é em 15 de Shvat. O número **15** tem significado cabalístico: é a soma de YH (יה = 10 + 5), nome divino abreviado. Tu B''Shvat ocorre sob influxo do nome YH.

E 15 também é o número de **Tu** (טו = 9 + 6 = 15). A combinação Tu+Shvat = "15 de Shvat" carrega numericamente "YH em Shvat".

### A síntese

Tu B''Shvat, no Sod:

▸ Etz Chaim se materializa em árvore física.
▸ Quatro Olamot são percorridos no Seder (Asiáh, Yetziráh, Briáh, Atzilut).
▸ Sete Sefirot inferiores são ativadas pelas Shiv''at haMinim.
▸ Tikun da Árvore do Conhecimento de Adam.
▸ Crescimento da árvore messiânica continuando silenciosamente.
▸ Influxo do nome YH no dia 15.

Quem celebra Tu B''Shvat com kavaná consciente desses níveis opera tikun cósmico através de gestos aparentemente simples — comer fruta, dizer bracháh, contemplar árvore.

**Fonte:** Pri Etz Hadar de Rabi Chaim Vital; Shaar haKavvanot, Inyan Tu B''Shvat; Devarim 8:8; Yeshayahu 11:1; Bereshit 2-3; Zohar Vayechi 222a sobre árvores cósmicas.'
WHERE slug = 'tu-bishvat';
COMMIT;
-- PaRDeS do Chag: yom-kippur
-- Idempotente: atualiza apenas colunas peshat/remez/drash/sod
BEGIN;
UPDATE chagim SET
  peshat = 'A Toráh dedica capítulos inteiros a Yom Kippur, mais que a qualquer outro dia do ano (exceto Shabat).

### Vayikra 16 — O Serviço do Kohen Gadol

Este é o capítulo central. Descreve em detalhe o serviço de **Aharon** (e dos Kohanim Gedolim que o seguiram) no Beit haMikdash: cinco imersões no mikvêh, dez santificações de mãos e pés, oferendas de touros e carneiros, **dois bodes** (um para HaShem, outro como *seir laAzazel*, enviado ao deserto carregando os pecados de Israel), e a entrada única no *Kodesh haKodashim* com a nuvem de incenso.

A frase coração do capítulo está em **Vayikra 16:30**: *ki vayom hazeh yechaper aleichem letaher etchem mikol chatoteichem, lifnei HaShem titharu*.

### Vayikra 23:26-32 — A Convocação Santa

Aqui Yom Kippur é nomeado como *Shabat Shabaton*, com a ordem de afligir a alma: *veinitem et nafshoteichem*. Este é o versículo-base das cinco aflições halácicas.

### Bamidbar 29:7-11 — As Oferendas do Dia

Detalhamento das oferendas do altar exterior em Yom Kippur (separadas do serviço interno do Kohen Gadol no Kodesh haKodashim).

### Yesha''yahu 57:14 a 58:14 — A Haftaráh da Manhã

Profecia que se lê em Yom Kippur de manhã. Yesha''yahu critica o jejum vazio: *halô zé tzom evchareihu, patê chartzubot resha*. Não é este o jejum que escolho: soltar amarras de perversidade? O verdadeiro jejum, ensina o profeta, é **partilhar o pão com o faminto, abrigar o pobre desabrigado, vestir o nu**. Sem ação social, todo o jejum é hipocrisia. Este texto reorienta toda a vivência do dia.

### Yoná completo — A Haftaráh da Tarde

Lê-se o **livro de Yoná inteiro** (4 capítulos curtos) em Minchá de Yom Kippur. Tema: a teshuváh é possível para todos, até para as nações pagãs como Ninivé. Quando os ninivitas, advertidos por Yoná, fazem teshuváh sincera, HaShem revoga o decreto. A lição é radical: nenhum decreto é irreversível diante da teshuváh autêntica.

### Os Treze Atributos de Misericórdia

Em **Shemot 34:6-7**, após o pecado do bezerro de ouro, HaShem se revela a Moshé com os Treze Atributos: *HaShem, HaShem, El rachum vechanun, erech apayim verav chesed veemet, notzer chesed laalafim, nosê avon vafesha vechata''á venake*. Estes treze atributos são o coração da Selichá. Em Yom Kippur, recitamos repetidamente, especialmente na Neilá, porque é a fórmula divina pela qual o decreto é revogado.

**Fonte:** Vayikra 16; Vayikra 23:26-32; Bamidbar 29:7-11; Yesha''yahu 57:14 a 58:14; Livro de Yoná; Shemot 34:6-7; Talmud Bavli, Yoma 81b, 86a.',
  remez = 'Yom Kippur é o dia em que o ser humano se aproxima ao máximo possível da condição angélica enquanto ainda vivo. As cinco aflições não são castigo, são instrumento: ao cessar de comer, beber, perfumar-se, calçar couro e ter relações, o corpo se aquieta e a alma fica exposta. Sem a "casca" das necessidades materiais, o que sobra é apenas a alma diante do Eterno.

Por isto a tradição diz que Yom Kippur é o dia mais alegre do ano (**Mishná, Taanit 4:8**), apesar do jejum: é o único dia em que a alma toca o que é, sem disfarce.

### O processo da teshuváh autêntica

**Rambam**, em **Hilchot Teshuváh 2:2-4**, define quatro etapas da teshuváh autêntica:

▸ **Cessação** (*chazitat hachet*): parar de cometer o erro identificado.
▸ **Confissão** (*vidui*): dizer com a boca, em palavras concretas, o que se fez de errado.
▸ **Arrependimento** (*charatá*): sentir genuinamente o peso do erro, não apenas o medo da consequência.
▸ **Compromisso** (*kabalá leatid*): assumir interiormente que não se repetirá o erro.

A confissão (Vidui) é coração do dia. Recita-se dez vezes em Yom Kippur: nas cinco Amidot silenciosas e nas cinco repetições do oficiante. A linguagem é sempre plural (*chatanu, avinu, pashanu*: pecamos, transgredimos, rebelamo-nos), porque Israel é responsável solidariamente. Cada um confessa em nome de todos, e todos confessam em nome de cada um.

### As três categorias de pecado

A liturgia distingue três níveis:

▸ **Chet**: erro por engano, sem intenção dolosa. O mais leve.
▸ **Avon**: transgressão consciente, mas movida por impulso. Intermediário.
▸ **Pesha**: rebelião deliberada contra HaShem. O mais grave.

O Vidui menciona todos os três, porque toda alma carrega exemplos de cada categoria.

### Yom Kippur refina cinco qualidades específicas da alma

▸ **Honestidade radical**, porque o Vidui exige nomear o que se fez sem disfarce.
▸ **Humildade**, porque ficar de pé jejuando todo o dia desmonta o orgulho cotidiano.
▸ **Solidariedade**, porque o Vidui é plural, e todos cobrem todos.
▸ **Esperança**, porque a promessa de *titharu* é mais forte que qualquer pecado nomeado.
▸ **Compromisso**, porque sair de Yom Kippur sem mudança real é desperdiçar a oportunidade.

### O selamento

Os Aseret Yemei Teshuváh começam em Rosh Hashanáh, quando o nome é inscrito. Em Yom Kippur, ao pôr do sol, o nome é **selado**. Por isto a Neilá tem urgência: é a última hora para mudar a sentença. Após a Neilá, o decreto entra em vigor para o ano novo.

Aplicação prática: a sua Neilá deve incluir, com kavaná real, o pedido específico do que você quer ver mudado no ano que vem. Pedir vagamente "saúde e prosperidade" é fraco. Pedir nomeadamente *aquilo* que está pesando, *aquela* questão concreta, é a oração que atravessa o portão antes do fechamento.

**Fonte:** Vayikra 16:30; Mishná, Taanit 4:8 e Yoma 8:8-9; Talmud Bavli, Yoma 85b-87b; Mishné Toráh, Hilchot Teshuváh 1-2.',
  drash = 'Apresentamos Yom Kippur nos quatro níveis hermenêuticos.

### Peshat — o sentido literal

Vayikra 16 e 23:26-32 estabelecem o dia: 10 de Tishrei, *Shabat Shabaton*, cinco aflições corporais, serviço completo do Kohen Gadol no Mishkán/Beit haMikdash, dois bodes (um para HaShem, outro para Azazel), nuvem de incenso, expiação por Aharon, sua casa, os Kohanim, e Israel inteiro. O versículo-chave: *ki vayom hazeh yechaper aleichem letaher etchem mikol chatoteichem, lifnei HaShem titharu* (Vayikra 16:30).

No nível do Peshat, Yom Kippur é o **único dia do ano** em que o Kohen Gadol entrava no Kodesh haKodashim, e o **único dia** em que o nome explícito de HaShem (Tetragrama) era pronunciado em público — três vezes.

### Remez — a alusão velada

O nome **Yom haKippurim** (no plural, "Dia dos Perdões") tem sido lido na tradição como alusão a um perdão duplo: do passado (o que se fez) e do futuro (o que se compromete a não fazer mais). Ambos são necessários para a expiação completa.

A Mishná **Yoma 8:9** ensina que Yom Kippur é como **Purim**: *Yom haKippurim* significa "dia como Purim". Esta etimologia (jogo) sugere que o dia mais santo do ano (Yom Kippur) e o dia aparentemente mais festivo (Purim, onde se bebe até confundir Aman e Mordechai) compartilham uma essência oculta: ambos são dias de **transformação radical da realidade**. Em Yom Kippur, o julgamento severo se transforma em misericórdia; em Purim, o decreto de extermínio se transforma em festa.

E os **dois bodes** aludem ao duplo destino possível para Israel em cada Yom Kippur: o bode para HaShem (consagrado, oferecido) é o caminho de teshuváh ativa; o bode para Azazel (enviado ao deserto, perdido) é o caminho da omissão. Cada um, no início de Yom Kippur, escolhe qual será.

### Drash — o ensino homilético

O **Talmud Bavli, Yoma 86b** ensina: *gedolá teshuváh, sheoshim zedonot lizachuyot*. Grande é a teshuváh, que transforma transgressões intencionais em méritos. Como? Quando alguém faz teshuváh por amor (não por medo), os pecados passados não apenas são perdoados — eles se tornam parte do caminho que levou à teshuváh, e portanto se tornam méritos.

Isto ensina algo radical: Yom Kippur não é dia para apenas se livrar do passado; é dia para **transformar o passado em fundamento**. Cada queda, processada com teshuváh por amor, se torna combustível para a subida.

Outro Drash: o **livro de Yoná** ensina que mesmo Ninivé — cidade pagã, violenta, distante de qualquer aliança — recebeu teshuváh quando se voltou. **Mas Yoná não se alegrou**. Ficou irritado com a misericórdia divina. HaShem o repreendeu: *uvenineveh haír haguedolá... arba esrei ribô adam... velo achmol al hair haguedolá hahi?* E sobre Ninivé, a grande cidade, com mais de 120 mil pessoas, eu não terei piedade?

A lição: a misericórdia divina é sempre maior que nossa expectativa. Mesmo o profeta erra quando tenta limitar a misericórdia. Yom Kippur expande a misericórdia até onde nossa imaginação dificilmente alcança.

### Sod — o segredo kabalístico

O **Zohar III, 67a** ensina que em Yom Kippur a *Shechiná* desce do mundo de *Atzilut* ao mundo de *Asiáh* sem nenhuma barreira. Todos os véus entre os Olamot são erguidos por aquelas 25 horas. O acesso direto que o Kohen Gadol tinha ao Kodesh haKodashim é, espiritualmente, oferecido a cada alma de Israel naquele dia.

O **bode para Azazel** tem, no Sod, função técnica precisa. Os pecados de Israel alimentam o *Sitra Achra* (o lado oposto) e produzem klipot (cascas espirituais) que envolvem a *Shechiná*. Enviar o bode ao deserto é dar ao *Sitra Achra* o que ele exige (seu "alimento"), deixando livre a *Shechiná* para subir limpa em direção ao Trono.

Mas atenção: este rito **não é oferenda a um poder rival**. Azazel não é divindade. É princípio espiritual do que está "fora" (deserto = não habitado por Israel). O rito apenas devolve ao "fora" o que pertence ao "fora", purificando o "dentro".

A **tríade Avodá-Treze Atributos-Neilá** corresponde, no Sod, à descida do *Tikun* (reparo) sobre a alma:

▸ A Avodá repara o que se fez (passado).
▸ Os Treze Atributos abrem canal de Misericórdia (presente operativo).
▸ A Neilá sela a transformação (futuro).

A **Tekiá Gedolá** final é o eco do som do shofar do Sinai, do shofar de Rosh Hashanáh (10 dias antes), e do shofar do Mashiach que ainda virá. Em um único toque longo, três tempos são unidos.

### Síntese

Os quatro níveis juntos compõem Yom Kippur completo:

▸ **Peshat**: o dia do serviço do Kohen Gadol e das cinco aflições.
▸ **Remez**: dia que alude a Purim e à transformação radical da realidade.
▸ **Drash**: dia em que a teshuváh por amor transforma transgressões em méritos.
▸ **Sod**: dia da descida da Shechiná sem véus, da reparação cósmica, e do ensaio do selamento messiânico.

A Brit Im Mashiach vive Yom Kippur nos quatro níveis simultâneos. Cada Tekiá Gedolá final é, ao mesmo tempo, encerramento do dia, encerramento do julgamento, e ensaio do toque grande do Mashiach que reunirá os exilados de Israel e instaurará o reino eterno.

**Fonte:** Vayikra 16; Vayikra 23:26-32; Livro de Yoná; Mishná, Yoma 8:9; Talmud Bavli, Yoma 86b; Zohar III, 67a-69b; Ari haKadosh, Shaar haKavvanot, Derush Yom haKippurim.',
  sod = 'Em Yom Kippur, todo Israel atinge espiritualmente o nível do *Kohen Gadol* no *Kodesh haKodashim*. A barreira entre o sagrado e o profano se dissolve. O que durante o ano inteiro fica oculto é, neste dia, exposto.

### O acesso ao Kodesh haKodashim

A tradição luriânica ensina que existem quatro mundos (*Atzilut, Briáh, Yetziráh, Asiáh*) e três véus entre eles. No dia de Yom Kippur, os três véus são erguidos, e a alma sobe do *Asiáh* até *Atzilut* sem barreira. Por isto a oração tem peso diferente: não há intermediação, é fala direta ao Trono.

O *Kodesh haKodashim* terreno (interior do Mishkán e do Beit haMikdash) era símbolo do *Atzilut* celestial. Em Yom Kippur sem Templo, cada coração purificado serve como *Kodesh haKodashim* portátil. Não é metáfora consoladora — é a realidade luriânica do dia.

### Os Treze Atributos de Misericórdia

Em **Shemot 34:6-7**, HaShem se revela com os Treze Atributos. A tradição luriânica ensina que estes treze atributos são canais espirituais (*tzinorot*) que ligam o **Keter superior** (a Vontade primordial) ao mundo manifesto. Cada vez que Israel recita os Treze Atributos com kavaná, esses canais se abrem e a luz desce.

Por isto, em Yom Kippur, recitamos os Treze Atributos repetidas vezes — na Selichá, na Avodá, na Neilá. Não é repetição enfática vazia. É invocação operativa: cada recitação ativa o canal e permite que a Misericórdia desça onde o Julgamento estava prestes a cair.

### Os cinco serviços e os cinco níveis da alma

A tradição luriânica nomeia cinco níveis ascendentes da alma:

▸ **Nefesh** (vitalidade)
▸ **Ruach** (espírito)
▸ **Neshamáh** (alma)
▸ **Chayá** (vida)
▸ **Yechidá** (singularidade, união com HaShem)

Os cinco serviços de Yom Kippur correspondem exatamente a estes cinco níveis:

▸ **Maariv** opera em *Nefesh*: começa com Kol Nidrei (anulação de votos), purificando o nível mais externo.
▸ **Shacharit** opera em *Ruach*: a oração matinal eleva o espírito.
▸ **Musaf** opera em *Neshamáh*: a Avodá do Kohen Gadol toca a alma propriamente dita.
▸ **Minchá** opera em *Chayá*: o livro de Yoná abre a dimensão profunda da vida e teshuváh radical.
▸ **Neilá** opera em *Yechidá*: o último serviço atinge o ponto mais alto da alma, onde Israel se une diretamente à *Or Ein Sof*.

Por isto a Neilá é tão intensa: é o único momento do ano em que a *Yechidá* é diretamente invocada na liturgia comunitária.

### O bode para Azazel — Sod profundo

Em Vayikra 16, dois bodes são oferecidos: um para HaShem (sacrificado no altar) e outro para Azazel (enviado ao deserto). O segundo bode carrega simbolicamente os pecados de Israel e é precipitado por um penhasco.

A tradição luriânica explica: o bode para Azazel não é oferenda a uma divindade rival. É **liberação de energia espiritual presa nas klipot**. Os pecados de Israel alimentam o lado oposto (*sitra achra*); ao enviar o bode, devolvemos ao deserto (domínio do *sitra achra*) o que pertence ao deserto, libertando a *Shechiná* para subir limpa em direção ao Trono.

Sem o Beit haMikdash, este rito não é realizado fisicamente. Mas a Avodá do Musaf, recitada com kavaná, opera o mesmo *Yichud* (união) e a mesma separação no nível espiritual.

### A Neilá e o portão

O nome *Neilá* significa "fechamento". Os portões do céu, abertos desde Rosh Hashanáh, se fecham ao pôr do sol de Yom Kippur. A Neilá é o último momento. A tradição diz que o portão estreito demora a fechar; quem grita com kavaná real ainda consegue empurrar a oração através da fenda que se fecha.

Por isto a Neilá tem fórmulas como *patach lanu shaar*, abre-nos um portão. E termina com a proclamação coletiva, sete vezes: *HaShem hu haElohim*, HaShem é o Elohim. Esta sétupla proclamação leva *Malchut* até *Keter* — o reverso do caminho dos seis dias da semana. Em sete proclamações, a alma sobe a Etz Chaim inteira.

**Fonte:** Vayikra 16; Shemot 34:6-7; Ari haKadosh, Shaar haKavvanot, Derush Yom haKippurim; Pri Etz Chaim, Shaar Yom haKippurim; Zohar III, 67a-69b; Tomer Devorá de Rabi Moshé Cordovero, capítulo sobre os Treze Atributos.'
WHERE slug = 'yom-kippur';
COMMIT;
