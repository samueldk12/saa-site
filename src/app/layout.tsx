import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Source_Serif_4 } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Samuel Apolinário Arão',
  description: 'Senior BI Consultant and Data Engineer',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

// Unico dono de <html>/<body> do app — a rota raiz so' redireciona pra
// /pt (ver app/page.tsx), e o [locale]/layout.tsx (aninhado) nao pode
// renderizar <html>/<body> de novo, senao vira html dentro de body,
// invalido e quebra a hidratacao. O lang muda por idioma via
// PageTransition, que sincroniza document.documentElement.lang.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${sourceSerif.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
