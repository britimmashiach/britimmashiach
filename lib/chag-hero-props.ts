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
  chanukah: {
    hebrew: 'חֲנֻכָּה',
    latin: 'Chanukáh',
    subtitle: 'A Festa das Luzes',
    verseTransliteration: 'ner mitzvá veToráh or',
    verseTranslation: 'a vela é mitzvá e a Toráh é luz',
    backgroundVerses: [
      'נֵר מִצְוָה וְתוֹרָה אוֹר',
      'הַנֵּרוֹת הַלָּלוּ אָנוּ מַדְלִיקִין עַל הַתְּשׁוּעוֹת וְעַל הַנִּסִּים',
      'בָּרוּךְ אַתָּה יְהוָה, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל חֲנֻכָּה',
      'בַּיָּמִים הָהֵם בַּזְּמַן הַזֶּה, רַבִּים בְּיַד מְעַטִּים',
      'וּטְמֵאִים בְּיַד טְהוֹרִים, וּרְשָׁעִים בְּיַד צַדִּיקִים',
      'לֹא בְחַיִל וְלֹא בְכֹחַ, כִּי אִם בְּרוּחִי אָמַר יְהוָה צְבָאוֹת',
      'מָעוֹז צוּר יְשׁוּעָתִי, לְךָ נָאֶה לְשַׁבֵּחַ',
      'חֲשׂוֹף זְרוֹעַ קָדְשֶׁךָ וְקָרֵב קֵץ הַיְשׁוּעָה',
    ],
    anchorText:
      'Bem-vindo ao portal de Chanukáh da Brit Im Mashiach. Aqui você encontra o guia completo para acender a Chanukiá com profundidade: brachot, programa dos oito dias, perspectiva kabalística luriânica e correlação messiânica alinhada à Toráh. Da primeira noite ao último acendimento, em memória do milagre do óleo e da vitória dos Macabeus, conduzimos você no ritmo do Método Rav EBBY.',
  },
  purim: {
    hebrew: 'פּוּרִים',
    latin: 'Purim',
    subtitle: 'A Festa da Megilá',
    verseTransliteration: 'venahafoch hu, asher yishletu haYehudim hemá besoneihem',
    verseTranslation: 'e reverteu-se, de modo que os judeus dominaram seus inimigos',
    backgroundVerses: [
      'וְנַהֲפוֹךְ הוּא, אֲשֶׁר יִשְׁלְטוּ הַיְּהוּדִים הֵמָּה בְּשׂוֹנְאֵיהֶם',
      'לַיְּהוּדִים הָיְתָה אוֹרָה וְשִׂמְחָה וְשָׂשׂוֹן וִיקָר',
      'אִישׁ יְהוּדִי הָיָה בְּשׁוּשַׁן הַבִּירָה, וּשְׁמוֹ מָרְדֳּכַי',
      'מִי יוֹדֵעַ אִם לְעֵת כָּזֹאת הִגַּעַתְּ לַמַּלְכוּת',
      'וּמָרְדֳּכַי יָצָא מִלִּפְנֵי הַמֶּלֶךְ בִּלְבוּשׁ מַלְכוּת',
      'כִּי מָרְדֳּכַי הַיְּהוּדִי מִשְׁנֶה לַמֶּלֶךְ אֲחַשְׁוֵרוֹשׁ',
      'אֲרוּר הָמָן אֲשֶׁר בִּקֵּשׁ לְאַבְּדִי, בָּרוּךְ מָרְדֳּכַי הַיְּהוּדִי',
      'כִּי הַיְהוּדִים יָדָם אֶל אֹיְבֵיהֶם, וּמַכֵּי בָהֶם',
    ],
    anchorText:
      'Bem-vindo ao portal de Purim da Brit Im Mashiach. Aqui você encontra o guia para viver o Chag da Megilá: leitura completa de Megilat Esther, mishloach manot, matanot la\'evyonim, seudat Purim, perspectiva kabalística luriânica e correlação messiânica alinhada à Toráh. Da bracháh da Megilá ao último cálice da Seudá, em meio à inversão venahafoch hu, conduzimos você no ritmo do Método Rav EBBY.',
  },
  pessach: {
    hebrew: 'פֶּסַח',
    latin: 'Pessach',
    subtitle: "Zman Cheruteinu, o Tempo da Nossa Liberdade",
    verseTransliteration: "bechol dor vador chayav adam lir'ot et atzmó keilu hu yatzá miMitzraim",
    verseTranslation: 'em cada geração, cada pessoa é obrigada a ver-se como se ela mesma houvesse saído do Mitzraim',
    backgroundVerses: [
      'בְּכָל דּוֹר וָדוֹר חַיָּב אָדָם לִרְאוֹת אֶת עַצְמוֹ כְּאִלּוּ הוּא יָצָא מִמִּצְרָיִם',
      'וְהִגַּדְתָּ לְבִנְךָ בַּיּוֹם הַהוּא לֵאמֹר, בַּעֲבוּר זֶה עָשָׂה יְהוָה לִי',
      'הַחֹדֶשׁ הַזֶּה לָכֶם רֹאשׁ חֳדָשִׁים, רִאשׁוֹן הוּא לָכֶם לְחָדְשֵׁי הַשָּׁנָה',
      'וְהוֹצֵאתִי אֶתְכֶם מִתַּחַת סִבְלוֹת מִצְרַיִם, וְהִצַּלְתִּי אֶתְכֶם',
      'וְגָאַלְתִּי אֶתְכֶם בִּזְרוֹעַ נְטוּיָה, וְלָקַחְתִּי אֶתְכֶם לִי לְעָם',
      'לֶחֶם עֹנִי אֲכָלוּהוּ, שִׁבְעַת יָמִים תֹּאכַל מַצּוֹת',
      'לְשָׁנָה הַבָּאָה בִּירוּשָׁלָיִם הַבְּנוּיָה',
      'דַּיֵּנוּ, אִלּוּ הוֹצִיאָנוּ מִמִּצְרַיִם וְלֹא עָשָׂה בָהֶם שְׁפָטִים',
    ],
    anchorText:
      'Bem-vindo ao portal de Pessach da Brit Im Mashiach. Aqui você encontra o guia completo do Z\'man Cheruteinu: bedikat chametz, Seder completo com Arba Kosot e Afikoman, leituras do Chag, perspectiva kabalística luriânica e correlação messiânica alinhada à Toráh. Da queima do chametz à última matsá do oitavo dia, em meio a ver-se como tendo saído pessoalmente do Mitzraim, conduzimos você no ritmo do Método Rav EBBY.',
  },
  'tu-bishvat': {
    hebrew: 'ט"וּ בִּשְׁבָט',
    latin: "Tu B'Shvat",
    subtitle: 'O Ano Novo das Árvores',
    verseTransliteration: 'ki haAdam etz haSadeh',
    verseTranslation: 'porque o homem é a árvore do campo',
    backgroundVerses: [
      'כִּי הָאָדָם עֵץ הַשָּׂדֶה',
      'אֶרֶץ חִטָּה וּשְׂעֹרָה, וְגֶפֶן וּתְאֵנָה וְרִמּוֹן',
      'אֶרֶץ זֵית שֶׁמֶן וּדְבָשׁ',
      'וְיָצָא חֹטֶר מִגֵּזַע יִשַׁי, וְנֵצֶר מִשָּׁרָשָׁיו יִפְרֶה',
      'וְהָיָה כְעֵץ שָׁתוּל עַל פַּלְגֵי מָיִם, אֲשֶׁר פִּרְיוֹ יִתֵּן בְּעִתּוֹ',
      'צַדִּיק כַּתָּמָר יִפְרָח, כְּאֶרֶז בַּלְּבָנוֹן יִשְׂגֶּה',
      'בְּאֶחָד בִּשְׁבָט רֹאשׁ הַשָּׁנָה לָאִילָן, כְּדִבְרֵי בֵית שַׁמַּאי',
      'בֵּית הִלֵּל אוֹמְרִים, בַּחֲמִשָּׁה עָשָׂר בּוֹ',
    ],
    anchorText:
      'Bem-vindo ao portal de Tu B\'Shvat da Brit Im Mashiach. Aqui você encontra o guia para celebrar o Ano Novo das Árvores: Seder de Tu B\'Shvat com 30 frutos, brachot sobre as Shiv\'at haMinim, perspectiva kabalística luriânica e correlação messiânica alinhada à Toráh. Da primeira tâmara à última uva, em meio à árvore messiânica em crescimento, conduzimos você no ritmo do Método Rav EBBY.',
  },
  'lag-baomer': {
    hebrew: 'ל"ג בָּעֹמֶר',
    latin: "Lag baOmer",
    subtitle: 'Hilulá de Rabi Shimon bar Yochai',
    verseTransliteration: 'Bar Yochai, nimshachta ashrecha',
    verseTranslation: 'Bar Yochai, foste ungido, feliz és tu',
    backgroundVerses: [
      'בַּר יוֹחַאי נִמְשַׁחְתָּ אַשְׁרֶיךָ, שֶׁמֶן שָׂשׂוֹן מֵחֲבֵרֶיךָ',
      'הַיּוֹם שְׁלוֹשָׁה וּשְׁלֹשִׁים יוֹם שֶׁהֵם חֲמִשָּׁה שָׁבוּעוֹת',
      'בַּר יוֹחַאי שֶׁמֶן מִשְׁחַת קֹדֶשׁ, נִמְשַׁחְתָּ מִמִּדַּת הַקֹּדֶשׁ',
      'הוֹד שֶׁבְּהוֹד, מִדַּת רַבִּי שִׁמְעוֹן בֶּן יוֹחַאי',
      'בַּר יוֹחַאי בִּשְׂדֵה תַּפּוּחִים, עָלִיתָ לְלַקֵּט בּוֹ מֶרְקָחִים',
      'בְּחִבּוּרָא דָא יִפְקוּן מִגָּלוּתָא בְּרַחֲמֵי',
      'אוֹרַח צַדִּיקִים כְּאוֹר נֹגַהּ, הוֹלֵךְ וָאוֹר עַד נְכוֹן הַיּוֹם',
      'בַּר יוֹחַאי קָדוֹשׁ נִקְרֵאתָ, מִדַּת קֹדֶשׁ הֶעֱלֵיתָ',
    ],
    anchorText:
      'Bem-vindo ao portal de Lag baOmer da Brit Im Mashiach. Aqui você encontra o guia do 33° dia do Omer: hilulá de Rabi Shimon bar Yochai, fogueiras, peregrinação a Meron, perspectiva kabalística luriânica e correlação messiânica alinhada à Toráh. Da primeira chama acesa ao último Zohar estudado, em meio à Or de Rashbi que continua iluminando, conduzimos você no ritmo do Método Rav EBBY.',
  },
  'tisha-beav': {
    hebrew: 'תִּשְׁעָה בְּאָב',
    latin: "Tisha B'Av",
    subtitle: 'O Dia mais Triste',
    verseTransliteration: "Eichá yashvá vadad ha'ir rabbati am",
    verseTranslation: 'como senta solitária a cidade, populosa entre os povos',
    backgroundVerses: [
      'אֵיכָה יָשְׁבָה בָדָד הָעִיר רַבָּתִי עָם, הָיְתָה כְּאַלְמָנָה',
      'בָּכוֹ תִבְכֶּה בַּלַּיְלָה, וְדִמְעָתָהּ עַל לֶחֱיָהּ',
      'חַסְדֵי יְהוָה כִּי לֹא תָמְנוּ, כִּי לֹא כָלוּ רַחֲמָיו',
      'חֲדָשִׁים לַבְּקָרִים, רַבָּה אֱמוּנָתֶךָ',
      'הֲשִׁיבֵנוּ יְהוָה אֵלֶיךָ וְנָשׁוּבָה, חַדֵּשׁ יָמֵינוּ כְּקֶדֶם',
      'נָחֲמוּ נָחֲמוּ עַמִּי, יֹאמַר אֱלֹהֵיכֶם',
      'דַּבְּרוּ עַל לֵב יְרוּשָׁלָיִם, וְקִרְאוּ אֵלֶיהָ כִּי מָלְאָה צְבָאָהּ',
      'כִּי כִרְגַע קָטֹן עֲזַבְתִּיךְ, וּבְרַחֲמִים גְּדֹלִים אֲקַבְּצֵךְ',
    ],
    anchorText:
      'Bem-vindo ao portal de Tisha B\'Av da Brit Im Mashiach. Aqui você encontra o guia do dia mais triste do calendário: três semanas de luto, jejum de 25 horas, Eichá, kinot, perspectiva kabalística luriânica e a correlação messiânica que atravessa cada lamentação como semente da redenção. Da queda do Beit haMikdash à esperança da reconstrução final, em meio ao nascimento de Mashiach na tarde do dia mais escuro, conduzimos você no ritmo do Método Rav EBBY.',
  },
  'tu-beav': {
    hebrew: 'ט"וּ בְּאָב',
    latin: "Tu B'Av",
    subtitle: 'O Chag do Amor',
    verseTransliteration: 'lo hayu yamim tovim leYisrael keChamishá Asar beAv',
    verseTranslation: 'não havia dias melhores para Israel que o 15 de Av',
    backgroundVerses: [
      'לֹא הָיוּ יָמִים טוֹבִים לְיִשְׂרָאֵל כַּחֲמִשָּׁה עָשָׂר בְּאָב וּכְיוֹם הַכִּפּוּרִים',
      'אֲנִי לְדוֹדִי וְדוֹדִי לִי, הָרֹעֶה בַּשּׁוֹשַׁנִּים',
      'כִּי עַזָּה כַמָּוֶת אַהֲבָה, מַיִם רַבִּים לֹא יוּכְלוּ לְכַבּוֹת אֶת הָאַהֲבָה',
      'כִּי בֹעֲלַיִךְ עֹשַׂיִךְ, יְהוָה צְבָאוֹת שְׁמוֹ',
      'וּמְשׂוֹשׂ חָתָן עַל כַּלָּה, יָשִׂישׂ עָלַיִךְ אֱלֹהָיִךְ',
      'בָּחוּר, שָׂא עֵינֶיךָ וּרְאֵה מָה אַתָּה בּוֹרֵר לְךָ',
      'שֶׁקֶר הַחֵן וְהֶבֶל הַיֹּפִי, אִשָּׁה יִרְאַת יְהוָה הִיא תִתְהַלָּל',
      'הִנֵּה מַה טּוֹב וּמַה נָּעִים, שֶׁבֶת אַחִים גַּם יָחַד',
    ],
    anchorText:
      'Bem-vindo ao portal de Tu B\'Av da Brit Im Mashiach. Aqui você encontra o guia do Chag do Amor: raízes históricas, dança em vinhedos, paralelos messiânicos com a reconciliação cósmica, perspectiva kabalística luriânica. Da reconciliação de Av à expectativa messiânica, em meio à lua cheia que ilumina vinhedos onde Shechiná-Malchut sobe a Tiferet, conduzimos você no ritmo do Método Rav EBBY.',
  },
}

export function getChagHeroProps(slug: string): ChagHeroProps | null {
  return HERO_PROPS[slug] ?? null
}
