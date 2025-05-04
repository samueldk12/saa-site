import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redireciona apenas a raiz para o locale padrão
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/pt', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  // Configuração de matcher simples
  matcher: ['/']
}; 