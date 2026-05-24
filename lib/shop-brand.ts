/**
 * Marca da lojinha. Nome e logo definitivos entram aqui quando o Rav enviar.
 * Env opcional: NEXT_PUBLIC_SHOP_NAME, NEXT_PUBLIC_SHOP_WHATSAPP (somente digitos, ex. 5516999999999)
 */

export const SHOP_NAME = process.env.NEXT_PUBLIC_SHOP_NAME?.trim() || 'Lojinha Brit'
export const SHOP_TAGLINE =
  'Velas decorativas e artigos para o lar messianico. Produzidos com cuidado pela congregacao.'

export const SHOP_WHATSAPP =
  process.env.NEXT_PUBLIC_SHOP_WHATSAPP?.trim().replace(/\D/g, '') || '5516996326446'

export function shopWhatsAppUrl(message: string): string {
  return `https://wa.me/${SHOP_WHATSAPP}?text=${encodeURIComponent(message)}`
}

export function formatShopPrice(cents: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}
