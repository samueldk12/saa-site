import { ThemeProvider } from '../providers';
import PageTransition from '@/components/PageTransition';

export function generateStaticParams() {
  return [
    { locale: 'pt' },
    { locale: 'en' },
    { locale: 'es' }
  ];
}

// So' o layout raiz (app/layout.tsx) pode renderizar <html>/<body> — este
// layout aninhado so' fornece o Provider de tema e a transicao de pagina.
// O atributo lang do <html>, que depende do locale, e' sincronizado pelo
// PageTransition (client component) via document.documentElement.lang.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ThemeProvider>
      <PageTransition locale={locale}>{children}</PageTransition>
    </ThemeProvider>
  );
}
