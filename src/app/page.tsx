export { default } from 'next/redirect';

export const runtime = 'edge';

// Redireciona para a versão em português por padrão
export function GET() {
  return Response.redirect(new URL('/pt', 'https://samuelarao-pt.vercel.app/'));
} 