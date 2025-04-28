import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['pt', 'en', 'es'];
const defaultLocale = 'pt';

function getLocale(request: NextRequest) {
  const headers: Record<string, string> = {};
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

  // Verificar se devemos ignorar esta rota
  if (shouldSkip(pathname)) return;

  // Redirecione se o caminho não começar com um locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

// Função para verificar se devemos pular esta rota
function shouldSkip(pathname: string) {
  // Ignorar APIs, recursos estáticos e arquivos
  return (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/files/') ||
    pathname.includes('.') // Provavelmente um arquivo (ex: .jpg, .png, etc.)
  );
}

// Configuração do middleware com matchers simples
export const config = {
  matcher: ['/', '/:path*']
}; 