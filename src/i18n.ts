import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Define os idiomas suportados
export const locales = ['en', 'pt', 'es'];
export const defaultLocale = 'pt';

// Configura o next-intl para carregar as mensagens corretamente
export default getRequestConfig(async ({ locale }) => {
  // Valida o locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Carrega as mensagens para o locale solicitado
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
}); 