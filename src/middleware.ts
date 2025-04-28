import { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['pt', 'en', 'es'];
const defaultLocale = 'pt';

function getLocale(request: NextRequest) {
  const headers = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const negotiator = new Negotiator({ headers });
  const languages = negotiator.languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verifique se o caminho já começa com um locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Evite redirecionar para API e arquivos estáticos
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/files/') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.png')
  ) {
    return;
  }

  // Redirecione se o caminho não começar com um locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Corresponde a todas as solicitações que:
     * - Não começam com `/api/`, `/images/`, `/_next/` ou `/files/`
     * - Não terminam com `.svg`, `.jpg` ou `.png`
     * - Não têm um locale no pathname
     */
    {
      source: '/((?!api|images|_next|files|.*\\.(svg|jpg|png)).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}; 