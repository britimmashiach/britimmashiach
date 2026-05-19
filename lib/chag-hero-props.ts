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
}

export function getChagHeroProps(slug: string): ChagHeroProps | null {
  return HERO_PROPS[slug] ?? null
}
