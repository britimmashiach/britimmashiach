import { SITE_NAME_ALT, SITE_PHONE_E164 } from '@/lib/site-brand'

export const BIM_SHOP_NAME = `Loja ${SITE_NAME_ALT}`
export const BIM_SHOP_PATH = '/loja-bim'
export const BIM_SHOP_TAGLINE =
  'Camisetas e acessórios da congregação. Vista a aliança com kavanáh no dia a dia.'
export const BIM_SHOP_AVAILABILITY_LABEL = 'Em breve à disposição'

export const BIM_SHOP_WHATSAPP =
  process.env.NEXT_PUBLIC_SHOP_WHATSAPP?.trim().replace(/\D/g, '') || SITE_PHONE_E164

export function bimShopWhatsAppUrl(message: string): string {
  return `https://wa.me/${BIM_SHOP_WHATSAPP}?text=${encodeURIComponent(message)}`
}

export function bimShopInterestMessage(productName: string): string {
  return `${BIM_SHOP_NAME}. Shalom! Tenho interesse em: ${productName}.`
}
