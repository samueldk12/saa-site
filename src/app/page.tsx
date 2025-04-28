import { NextResponse } from 'next/server';

export const runtime = 'edge';

// Redireciona para a versão em português por padrão
export function GET() {
  return NextResponse.redirect(new URL('/pt', 'https://samuelarao-pt.vercel.app/'));
} 