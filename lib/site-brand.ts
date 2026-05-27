/** Nome canónico da congregação e plataforma (UI, metadata, schema.org). */
export const SITE_NAME = 'BRIT IM MASHIACH'
export const SITE_NAME_ALT = 'Brit Im Mashiach'
export const SITE_TAGLINE =
  'Plataforma de estudos judaico-messiânicos, Kabaláh Luriana, calendário hebraico vivo e Toráh semanal com kavanáh.'
export const RAV_NAME = 'Rav Eliahu Barzilay ben Yehoshua'
export const CONGREGATION = 'Congregação Brit Im Mashiach — Franca, São Paulo'

/** Título e descrição da home — marca completa (evita confusão com buscas genéricas por "Brit"). */
export const SEO_HOME_TITLE =
  'Sinagoga Brit Im Mashiach — Franca SP | Judaísmo Messiânico e Toráh'
export const SEO_HOME_DESCRIPTION =
  'Sinagoga judaico-messiânica em Franca, SP — Rua General Carneiro, 749. Parashot com PaRDeS, Kabaláh Luriana, calendário hebraico e ensinos do Rav Eliahu Barzilay ben Yehoshua.'

export const SITE_LOCALITY = 'Franca'
export const SITE_REGION = 'São Paulo'
export const SITE_STATE_CODE = 'SP'
export const SITE_COUNTRY = 'BR'

/** Endereço da sinagoga em Franca (cultos e encontros presenciais). */
export const SITE_STREET = 'Rua General Carneiro'
export const SITE_STREET_NUMBER = '749'
/** Nº 749: faixa postal até 899/900 (bairro Estação, CEP dos Correios). */
export const SITE_NEIGHBORHOOD = 'Estação'
export const SITE_POSTAL_CODE = '14405-106'
export const SITE_ADDRESS_LINE = `${SITE_STREET}, ${SITE_STREET_NUMBER}`
export const SITE_ADDRESS_FULL = `${SITE_ADDRESS_LINE} — ${SITE_NEIGHBORHOOD}, ${SITE_LOCALITY} — ${SITE_STATE_CODE}`
export const SITE_EVENT_LOCATION = `Sinagoga Brit Im Mashiach — ${SITE_ADDRESS_FULL}`

export const SITE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Rua+General+Carneiro+749+Franca+SP+Brasil'

/** DDD 16 — Franca, SP. */
export const SITE_PHONE_E164 = '5516996326446'
export const SITE_PHONE_DISPLAY = '(16) 99632-6446'
export const SITE_PHONE_TEL = '+5516996326446'
export const SITE_WHATSAPP_URL = `https://wa.me/${SITE_PHONE_E164}`

/** Endereço postal para schema.org (Organization / Synagogue). */
export function sitePostalAddress() {
  return {
    '@type': 'PostalAddress' as const,
    streetAddress: SITE_ADDRESS_LINE,
    addressLocality: SITE_LOCALITY,
    addressRegion: SITE_STATE_CODE,
    postalCode: SITE_POSTAL_CODE,
    addressCountry: SITE_COUNTRY,
  }
}
