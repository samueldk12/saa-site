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

// Teste A/B: /lp/pf e /lp/pj sorteiam uma das 5 landings do grupo e fixam
// a escolha num cookie (o visitante sempre ve' a mesma). A URL nao muda
// (rewrite). ?v=3 forca a variante 3 — util para conferir cada pagina.
const AB_VARIANTS = 5;
const AB_COOKIE_DAYS = 30;

function abSplit(request: NextRequest, group: 'pf' | 'pj') {
  const cookieName = `saa_ab_${group}`;
  const forced = request.nextUrl.searchParams.get('v');
  const saved = request.cookies.get(cookieName)?.value;
  const valid = (v?: string | null) => !!v && /^[1-5]$/.test(v);

  const variant = valid(forced)
    ? (forced as string)
    : valid(saved)
    ? (saved as string)
    : String(Math.floor(Math.random() * AB_VARIANTS) + 1);

  const url = request.nextUrl.clone();
  url.pathname = `/lp/${group}-${variant}`;
  const res = NextResponse.rewrite(url);
  if (saved !== variant) {
    res.cookies.set(cookieName, variant, { maxAge: AB_COOKIE_DAYS * 86400, path: '/', sameSite: 'lax' });
  }
  return res;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/lp/pf' || pathname === '/lp/pf/') return abSplit(request, 'pf');
  if (pathname === '/lp/pj' || pathname === '/lp/pj/') return abSplit(request, 'pj');

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
    pathname.startsWith('/ingest') || // proxy do PostHog
    pathname.startsWith('/lp/') || // landing pages (so' em portugues, sem locale)
    pathname.startsWith('/admin') ||
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