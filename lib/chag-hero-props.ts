/**
 * Props do hero cinematográfico por Chag. Usado em
 * app/chagim/[slug]/page.tsx via getChagHeroProps(slug).
 *
 * Quando retorna null, a página renderiza o <header> textual padrão.
 * Quando retorna props, a página renderiza <ChagHero {...props}/>
 * no topo (substitui o header textual) e oculta a seção order_num=1
 * do listing (cujo conteúdo vira o bloco âncora abaixo do hero).
 */

export type ChagHeroProps = {
  hebrew: string
  latin: string
  subtitle: string
  verseTransliteration: string
  verseTranslation: string
  /** Versículos hebraicos exibidos como camada de fundo (opacity 0.13). */
  backgroundVerses: string[]
  /** Texto de boas-vindas do bloco âncora (abaixo do hero). */
  anchorText: string
}

const HERO_PROPS: Record<string, ChagHeroProps> = {
  shabat: {
    hebrew: 'שַׁבָּת',
    latin: 'Shabat',
    subtitle: 'Shabat HaMalká, a Noiva eterna',
    verseTransliteration: "vayevarech Elohim et yom hash'vi'i vayekadesh otô",
    verseTranslation: 'e abençoou Elohim o sétimo dia e o santificou',
    backgroundVerses: [
      'וַיְכֻלּוּ הַשָּׁמַיִם וְהָאָרֶץ וְכָל-צְבָאָם',
      'וַיְכַל אֱלֹהִים בַּיּוֹם הַשְּׁבִיעִי מְלַאכְתּוֹ אֲשֶׁר עָשָׂה',
      'וַיִּשְׁבֹּת בַּיּוֹם הַשְּׁבִיעִי מִכָּל-מְלַאכְתּוֹ אֲשֶׁר עָשָׂה',
      'וַיְבָרֶךְ אֱלֹהִים אֶת-יוֹם הַשְּׁבִיעִי וַיְקַדֵּשׁ אֹתוֹ',
      'כִּי בוֹ שָׁבַת מִכָּל-מְלַאכְתּוֹ אֲשֶׁר-בָּרָא אֱלֹהִים לַעֲשׂוֹת',
      'וַיְכֻלּוּ הַשָּׁמַיִם וְהָאָרֶץ וְכָל-צְבָאָם',
      'וַיְכַל אֱלֹהִים בַּיּוֹם הַשְּׁבִיעִי מְלַאכְתּוֹ',
      'וַיִּשְׁבֹּת בַּיּוֹם הַשְּׁבִיעִי מִכָּל-מְלַאכְתּוֹ',
    ],
    anchorText:
      'Bem-vindo ao portal do Shabat da Brit Im Mashiach. Aqui você encontra tudo o que precisa para receber, viver e despedir o sétimo dia com a profundidade que ele merece. Liturgia completa em hebraico com transliteração sefardita e tradução fiel, guia prático para iniciantes, perspectiva kabalística luriânica e correlação messiânica alinhada à Toráh. Da primeira vela acesa até a Havdaláh, da primeira Bracháh até o último Nigún, conduzimos você passo a passo no ritmo do Método Rav EBBY.',
  },
  shavuot: {
    hebrew: 'שָׁבוּעוֹת',
    latin: 'Shavuot',
    subtitle: 'Zman Matan Torateinu, o Tempo da Outorga da Toráh',
    verseTransliteration: "natati et Torati bekirbam ve'al libam echtavena",
    verseTranslation: 'porei Minha Toráh no íntimo deles e sobre seus corações a escreverei',
    backgroundVerses: [
      'וְעַתָּה אִם-שָׁמוֹעַ תִּשְׁמְעוּ בְּקֹלִי וּשְׁמַרְתֶּם אֶת-בְּרִיתִי',
      'וִהְיִיתֶם לִי סְגֻלָּה מִכָּל-הָעַמִּים, כִּי-לִי כָּל-הָאָרֶץ',
      'וְאַתֶּם תִּהְיוּ-לִי מַמְלֶכֶת כֹּהֲנִים וְגוֹי קָדוֹשׁ',
      'אֵלֶּה הַדְּבָרִים אֲשֶׁר תְּדַבֵּר אֶל-בְּנֵי יִשְׂרָאֵל',
      'כִּי זֹאת הַבְּרִית אֲשֶׁר אֶכְרֹת אֶת-בֵּית יִשְׂרָאֵל',
      'נָתַתִּי אֶת-תּוֹרָתִי בְּקִרְבָּם וְעַל-לִבָּם אֶכְתֳּבֶנָּה',
      'וְהָיִיתִי לָהֶם לֵאלֹהִים וְהֵמָּה יִהְיוּ-לִי לְעָם',
      'וַיַּעֲנוּ כָל-הָעָם יַחְדָּו וַיֹּאמְרוּ, כֹּל אֲשֶׁר-דִּבֶּר יְהוָה נַעֲשֶׂה',
    ],
    anchorText:
      'Bem-vindo ao portal de Shavuot da Brit Im Mashiach. Aqui você encontra tudo o que precisa para receber, viver e despedir o tempo da outorga da Toráh com a profundidade que ele merece. Liturgia em hebraico com transliteração e tradução, programa completo do Tikun Leil Shavuot, leitura de Megilat Rut, perspectiva kabalística luriânica e a correlação messiânica que liga o Sinai ao versículo de Yirmiyahu 31:33. Do encerramento da Sefirat haOmer até o amanhecer do segundo dia, conduzimos você no ritmo do Método Rav EBBY.',
  },
  'rosh-hashana': {
    hebrew: 'רֹאשׁ הַשָּׁנָה',
    latin: 'Rosh Hashanáh',
    subtitle: 'Yom Teruáh, o Dia do Toque do Shofar',
    verseTransliteration: 'tiku vachodesh shofar, bakeseh leyom chageinu',
    verseTranslation: 'tocai o shofar no início do mês, na lua coberta, para o dia da nossa festa',
    backgroundVerses: [
      'וּבַחֹדֶשׁ הַשְּׁבִיעִי בְּאֶחָד לַחֹדֶשׁ מִקְרָא קֹדֶשׁ',
      'יִהְיֶה לָכֶם, כָּל מְלֶאכֶת עֲבֹדָה לֹא תַעֲשׂוּ',
      'יוֹם תְּרוּעָה יִהְיֶה לָכֶם',
      'תִּקְעוּ בַחֹדֶשׁ שׁוֹפָר, בַּכֵּסֶה לְיוֹם חַגֵּנוּ',
      'כִּי חֹק לְיִשְׂרָאֵל הוּא, מִשְׁפָּט לֵאלֹהֵי יַעֲקֹב',
      'עָלָה אֱלֹהִים בִּתְרוּעָה, יְהוָה בְּקוֹל שׁוֹפָר',
      'וְהָיָה בַּיּוֹם הַהוּא יִתָּקַע בְּשׁוֹפָר גָּדוֹל',
      'וּבָאוּ הָאֹבְדִים בְּאֶרֶץ אַשּׁוּר וְהִשְׁתַּחֲווּ לַיהוָה',
    ],
    anchorText:
      'Bem-vindo ao portal de Rosh Hashanáh da Brit Im Mashiach. Aqui você encontra tudo o que precisa para receber, viver e despedir o Yom Teruáh com a profundidade que ele merece. Liturgia em hebraico com transliteração e tradução, programa completo de Malchuyot, Zichronot e Shofarot, guia da Tashlich e dos simanim, perspectiva kabalística luriânica e a correlação messiânica que liga o shofar do Sinai ao shofar grande do Mashiach. Do primeiro toque à coroação do Eterno como Rei, conduzimos você no ritmo do Método Rav EBBY.',
  },
  'yom-kippur': {
    hebrew: 'יוֹם כִּפּוּר',
    latin: 'Yom Kippur',
    subtitle: 'Shabat Shabaton, o Dia do Perdão',
    verseTransliteration: "ki vayom hazeh yechaper aleichem letaher etchem",
    verseTranslation: 'porque neste dia se expiará por vós, para vos purificar',
    backgroundVerses: [
      'אַךְ בֶּעָשׂוֹר לַחֹדֶשׁ הַשְּׁבִיעִי הַזֶּה יוֹם הַכִּפֻּרִים הוּא',
      'מִקְרָא קֹדֶשׁ יִהְיֶה לָכֶם וְעִנִּיתֶם אֶת נַפְשֹׁתֵיכֶם',
      'כִּי בַיּוֹם הַזֶּה יְכַפֵּר עֲלֵיכֶם לְטַהֵר אֶתְכֶם',
      'מִכֹּל חַטֹּאתֵיכֶם לִפְנֵי יְהוָה תִּטְהָרוּ',
      'יְהוָה יְהוָה אֵל רַחוּם וְחַנּוּן, אֶרֶךְ אַפַּיִם וְרַב חֶסֶד וֶאֱמֶת',
      'נֹצֵר חֶסֶד לָאֲלָפִים, נֹשֵׂא עָוֹן וָפֶשַׁע וְחַטָּאָה וְנַקֵּה',
      'מִי אֵל כָּמוֹךָ נֹשֵׂא עָוֹן וְעֹבֵר עַל פֶּשַׁע',
      'שׁוּבָה יִשְׂרָאֵל עַד יְהוָה אֱלֹהֶיךָ',
    ],
    anchorText:
      'Bem-vindo ao portal de Yom Kippur da Brit Im Mashiach. Aqui você encontra tudo o que precisa para receber, viver e despedir o Dia do Perdão com a profundidade que ele merece. Liturgia em hebraico com transliteração e tradução, programa dos cinco serviços, guia da Avodá do Kohen Gadol e dos Treze Atributos, perspectiva kabalística luriânica e a correlação messiânica que reconhece o Mashiach como Kohen Gadol na ordem de Malki-Tzedek, sem qualquer substituição da Avodá histórica. Do Kol Nidrei à Tekiá Gedolá final, conduzimos você no ritmo do Método Rav EBBY.',
  },
  sukkot: {
    hebrew: 'סֻכּוֹת',
    latin: 'Sukkot',
    subtitle: "Zman Simchateinu, o Tempo da Nossa Alegria",
    verseTransliteration: "ki yitzpenéni besukó beyom ra'á",
    verseTranslation: 'pois Ele me esconderá em Sua Sucá no dia mal',
    backgroundVerses: [
      'בַּסֻּכּוֹת תֵּשְׁבוּ שִׁבְעַת יָמִים, כָּל הָאֶזְרָח בְּיִשְׂרָאֵל יֵשְׁבוּ בַּסֻּכּוֹת',
      'לְמַעַן יֵדְעוּ דֹרֹתֵיכֶם כִּי בַסֻּכּוֹת הוֹשַׁבְתִּי אֶת בְּנֵי יִשְׂרָאֵל',
      'וּלְקַחְתֶּם לָכֶם בַּיּוֹם הָרִאשׁוֹן פְּרִי עֵץ הָדָר, כַּפֹּת תְּמָרִים',
      'וַעֲנַף עֵץ עָבֹת וְעַרְבֵי נָחַל, וּשְׂמַחְתֶּם לִפְנֵי יְהוָה אֱלֹהֵיכֶם שִׁבְעַת יָמִים',
      'כִּי יִצְפְּנֵנִי בְּסֻכּוֹ בְּיוֹם רָעָה, יַסְתִּירֵנִי בְּסֵתֶר אָהֳלוֹ',
      'וְעָלוּ מִדֵּי שָׁנָה בְשָׁנָה לְהִשְׁתַּחֲוֹת לְמֶלֶךְ יְהוָה צְבָאוֹת',
      'וְלָחֹג אֶת חַג הַסֻּכּוֹת, וְהָיָה אֲשֶׁר לֹא יַעֲלֶה לֹא עֲלֵיהֶם הַגֶּשֶׁם',
      'וְשִׂמַּחְתָּ בְּחַגֶּךָ, וְהָיִיתָ אַךְ שָׂמֵחַ',
    ],
    anchorText:
      'Bem-vindo ao portal de Sukkot da Brit Im Mashiach. Aqui você encontra tudo o que precisa para construir e viver a Sucá, agitar as Arba Minim, receber os sete Ushpizin, cumprir as Hoshanot até a Hoshaná Rabá, com liturgia em hebraico, transliteração e tradução, perspectiva kabalística luriânica e correlação messiânica alinhada à Toráh. Do primeiro schach colocado ao último Hoshaná, conduzimos você no Z\'man Simchateinu no ritmo do Método Rav EBBY.',
  },
  'shemini-atzeret': {
    hebrew: 'שְׁמִינִי עֲצֶרֶת',
    latin: 'Shemini Atzeret',
    subtitle: 'O Oitavo Dia de Detenção',
    verseTransliteration: "bayom hash'mini atzeret tihyé lachem",
    verseTranslation: 'no oitavo dia detenção será para vós',
    backgroundVerses: [
      'בַּיּוֹם הַשְּׁמִינִי עֲצֶרֶת תִּהְיֶה לָכֶם, כָּל מְלֶאכֶת עֲבֹדָה לֹא תַעֲשׂוּ',
      'וְהִקְרַבְתֶּם עֹלָה אִשֵּׁה רֵיחַ נִיחֹחַ לַיהוָה',
      'קָשֶׁה עָלַי פְּרֵדַתְכֶם, הִתְעַכְּבוּ עוֹדִי יוֹם אֶחָד',
      'מַשִּׁיב הָרוּחַ וּמוֹרִיד הַגֶּשֶׁם',
      'יִזְכּוֹר אֱלֹהִים נִשְׁמַת אָבִי מוֹרִי, בְּגַן עֵדֶן תְּהֵא מְנוּחָתוֹ',
      'הֲיֵשׁ בְּהַבְלֵי הַגּוֹיִם מַגְשִׁמִים, וְאִם הַשָּׁמַיִם יִתְּנוּ רְבִיבִים',
      'הֲלֹא אַתָּה הוּא יְהוָה אֱלֹהֵינוּ וּנְקַוֶּה לָּךְ',
      'וְיָבֹא כַגֶּשֶׁם לָנוּ, כְּמַלְקוֹשׁ יוֹרֶה אָרֶץ',
    ],
    anchorText:
      'Bem-vindo ao portal de Shemini Atzeret da Brit Im Mashiach. Aqui você encontra o guia do oitavo dia íntimo, em que HaShem detém Israel por mais um dia de proximidade antes da partida: Tefilat Geshem (oração formal pela chuva), Yizkor pelos falecidos, perspectiva kabalística luriânica e correlação messiânica alinhada à Toráh. Do último ato em Sucá ao primeiro Mashiv haRuach umorid haGashem na Amidá, conduzimos você no ritmo do Método Rav EBBY.',
  },
  'simchat-torah': {
    hebrew: 'שִׂמְחַת תּוֹרָה',
    latin: 'Simchat Toráh',
    subtitle: 'A Alegria da Toráh',
    verseTransliteration: "Toráh tzivá-lanu Moshé, morasháh kehilat Yaakov",
    verseTranslation: 'a Toráh nos ordenou Moshé, herança da congregação de Yaakov',
    backgroundVerses: [
      'תּוֹרָה צִוָּה לָנוּ מֹשֶׁה, מוֹרָשָׁה קְהִלַּת יַעֲקֹב',
      'לִפְנֵי עֵינֵי כָּל יִשְׂרָאֵל, חֲזַק חֲזַק וְנִתְחַזֵּק',
      'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ',
      'שִׂישׂוּ וְשִׂמְחוּ בְּשִׂמְחַת תּוֹרָה, וּתְנוּ כָבוֹד לַתּוֹרָה כִּי טוֹבָה סְחָרָהּ',
      'אָז תִּשְׂמַח בְּתוּלָה בְּמָחוֹל, וּבַחוּרִים וּזְקֵנִים יַחְדָּו',
      'פִּקּוּדֵי יְהוָה יְשָׁרִים, מְשַׂמְּחֵי לֵב',
      'נָחַלְתִּי עֵדְוֹתֶיךָ לְעוֹלָם, כִּי שְׂשׂוֹן לִבִּי הֵמָּה',
      'יָמִין וּשְׂמֹאל תִּפְרוֹצִי וְאֶת יְהוָה תַּעֲרִיצִי, וְנִשְׂמְחָה וְנָגִילָה',
    ],
    anchorText:
      'Bem-vindo ao portal de Simchat Toráh da Brit Im Mashiach. Aqui você encontra o guia da alegria mais explosiva do calendário judaico: as sete Hakafot dançando com os Sifrei Toráh, Chatan Toráh e Chatan Bereshit, Kol haNearim, conclusão e reinício do ciclo anual, perspectiva kabalística luriânica e correlação messiânica alinhada à Toráh. Da última palavra de Devarim à primeira de Bereshit, formando o lev (coração) circular da Toráh viva, conduzimos você no ritmo do Método Rav EBBY.',
  },
}

export function getChagHeroProps(slug: string): ChagHeroProps | null {
  return HERO_PROPS[slug] ?? null
}
