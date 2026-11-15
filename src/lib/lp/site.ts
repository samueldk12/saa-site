// Constantes de contato/oferta usadas por todas as landing pages.
// Edite aqui — e' o unico lugar com numero, e-mail e flags de SEO.

// WhatsApp usado na Home (wa.me). Obs.: a pagina SAA lista o telefone
// com final ...2175 — confirme qual dos dois e' o correto.
export const WHATSAPP_NUMBER = '5531991442176';

export const BRAND = 'Samuel Arão · SAA';

// false = as landings ficam fora do Google (noindex). Bom pra teste A/B
// com trafego pago/social, evita conteudo duplicado entre as variantes.
export const LP_INDEXABLE = false;

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
