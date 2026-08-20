'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
// import { useTranslations } from 'next-intl';
import { getTranslations } from '@/lib/getTranslations';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  locale: string;
}

// Cor de fundo do item ativo no menu mobile, por tema de pagina — mapa
// estatico para evitar classes Tailwind dinamicas que o compilador nao gera.
const MOBILE_ACTIVE_BG: Record<string, string> = {
  'theme-home': 'bg-gray-900 dark:bg-white dark:text-gray-900 text-white',
  'theme-about': 'bg-indigo-600 text-white',
  'theme-projects': 'bg-emerald-600 text-white',
  'theme-skills': 'bg-[#E33D3D] text-white',
  'theme-saa': 'bg-[#1E3A5F] text-white',
};

// Cada idioma ganha as cores da bandeira do seu pais, uma por letra —
// PT (Brasil: verde/azul), EN (EUA: azul/vermelho), ES (Espanha: vermelho/amarelo).
const LOCALE_COLORS: Record<'pt' | 'en' | 'es', [string, string]> = {
  pt: ['#009C3B', '#2563EB'],
  en: ['#2563EB', '#B22234'],
  es: ['#AA151B', '#F1BF00'],
};

const LocaleLabel = ({ code }: { code: 'pt' | 'en' | 'es' }) => {
  const [c1, c2] = LOCALE_COLORS[code];
  const [l1, l2] = code.toUpperCase().split('');
  return (
    <>
      <span style={{ color: c1 }}>{l1}</span>
      <span style={{ color: c2 }}>{l2}</span>
    </>
  );
};

export default function Navigation({ locale }: NavigationProps) {
  const t = getTranslations(locale);
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Controlar o scroll para mudar a aparência da navegação
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar o menu móvel quando uma rota é alterada
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Função para mudar o locale mantendo o mesmo caminho
  const getLocalePath = (newLocale: string) => {
    // Verifica se o pathname está disponível e se contém o locale atual
    if (!pathname) return `/${newLocale}`;
    
    // Se o pathname contém "/undefined/", vamos corrigir isso
    if (pathname.includes('/undefined/')) {
      // Extrair o caminho após '/undefined/'
      const pathAfterUndefined = pathname.split('/undefined/')[1];
      return `/${newLocale}/${pathAfterUndefined}`;
    }
    
    // Extrai o caminho após o locale atual, se o locale estiver presente
    let pathWithoutLocale = pathname;
    if (locale && pathname.startsWith(`/${locale}`)) {
      pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    }
    
    // Construir o novo caminho com o novo locale
    return `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
  };

  const navItems = [
    { href: `/${locale}`, label: t.navigation.home, theme: 'theme-home' },
    { href: `/${locale}/about`, label: t.navigation.about, theme: 'theme-about' },
    { href: `/${locale}/skills`, label: t.navigation.skills, theme: 'theme-skills' },
    { href: `/${locale}/projects`, label: t.navigation.projects, theme: 'theme-projects' },
    { href: `/${locale}/saa`, label: 'SAA Company', theme: 'theme-saa' },
  ];

  // Hover mais tematico por pagina de destino — nao so cor, mas um gesto
  // que remete ao estilo daquela pagina (RPG, terminal, HQ, vidro...).
  const hoverMotion: Record<string, any> = {
    'theme-home': { y: -1 },
    'theme-about': { y: -2, rotate: [0, -3, 3, -2, 0], transition: { duration: 0.4 } },
    'theme-skills': { scale: [1, 1.18, 0.94, 1.06, 1], rotate: [0, -5, 4, -2, 0], transition: { duration: 0.45 } },
    'theme-projects': { y: -1 },
    'theme-saa': { y: -1 },
  };

  // O header adota a identidade visual da pagina atual — nao so o link
  // ativo, a barra inteira muda de tom conforme a secao em que se esta.
  const getSection = () => {
    if (!pathname) return 'home';
    const withoutLocale = locale && pathname.startsWith(`/${locale}`)
      ? pathname.replace(`/${locale}`, '') || '/'
      : pathname;
    if (withoutLocale.startsWith('/about')) return 'about';
    if (withoutLocale.startsWith('/projects')) return 'projects';
    if (withoutLocale.startsWith('/skills')) return 'skills';
    if (withoutLocale.startsWith('/saa')) return 'saa';
    return 'home';
  };
  const section = getSection();

  const barAppearance: Record<string, string> = {
    home: scrolled
      ? 'bg-[#FAF9F6]/90 dark:bg-[#0B0C0E]/90 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-800'
      : 'bg-[#FAF9F6]/80 dark:bg-[#0B0C0E]/80 backdrop-blur-sm border-b border-transparent',
    about: scrolled
      ? 'bg-[#FDFCF8]/90 dark:bg-[#08080C]/90 backdrop-blur-md shadow-md border-b border-purple-300/40 dark:border-purple-500/20'
      : 'bg-[#FDFCF8]/80 dark:bg-[#08080C]/80 backdrop-blur-sm border-b border-transparent',
    projects: scrolled
      ? 'bg-[#F6F8FA]/90 dark:bg-[#0B0E14]/95 backdrop-blur-md shadow-md border-b border-emerald-600/25 dark:border-[#5CE1A8]/25'
      : 'bg-[#F6F8FA]/80 dark:bg-[#0B0E14]/90 backdrop-blur-sm border-b border-transparent',
    skills: scrolled
      ? 'bg-[#F4EFE4]/90 dark:bg-[#171316]/90 backdrop-blur-md shadow-md border-b-2 border-[#E33D3D]/50'
      : 'bg-[#F4EFE4]/80 dark:bg-[#171316]/80 backdrop-blur-sm border-b-2 border-[#E33D3D]/25',
    saa: scrolled
      ? 'bg-white/70 dark:bg-[#050814]/70 backdrop-blur-2xl backdrop-saturate-150 shadow-md border-b border-black/10 dark:border-white/10'
      : 'bg-white/50 dark:bg-[#050814]/60 backdrop-blur-xl backdrop-saturate-150 border-b border-transparent',
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-colors duration-500 ${barAppearance[section]}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center">
              <div className="relative h-10 w-36 sm:h-12 sm:w-40 md:h-16 md:w-52">
                <Image
                  src="/images/logo.svg"
                  alt="SAA Logo"
                  fill
                  priority
                  className="object-contain dark:brightness-0 dark:invert"
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-10">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${item.theme} text-sm lg:text-base ${pathname === item.href ? 'nav-link-active' : ''}`}
                >
                  <motion.span className="inline-block" whileHover={hoverMotion[item.theme]}>
                    {item.label}
                  </motion.span>
                </Link>
              ))}
            </div>
            
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Link
                href={getLocalePath('pt')}
                  className={`nav-link text-sm ${locale === 'pt' ? 'font-bold' : 'font-normal'}`}
              >
                <LocaleLabel code="pt" />
              </Link>
              <Link
                href={getLocalePath('en')}
                  className={`nav-link text-sm ${locale === 'en' ? 'font-bold' : 'font-normal'}`}
              >
                <LocaleLabel code="en" />
              </Link>
              <Link
                href={getLocalePath('es')}
                  className={`nav-link text-sm ${locale === 'es' ? 'font-bold' : 'font-normal'}`}
              >
                <LocaleLabel code="es" />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
                <ThemeToggle />
              <a
                href="https://github.com/samueldk12"
                target="_blank"
                rel="noopener noreferrer"
                className={`nav-link `}
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/samuel-arao/"
                target="_blank"
                rel="noopener noreferrer"
                className={`nav-link `}
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none p-2 transition-colors text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden shadow-lg bg-white dark:bg-gray-900">
          <div className="px-4 pt-2 pb-4 space-y-2 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 px-3 rounded-md text-base font-medium transition-colors ${
                  pathname === item.href
                    ? MOBILE_ACTIVE_BG[item.theme]
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-4">
                <Link
                  href={getLocalePath('pt')}
                  className={`px-3 py-1 rounded-md ${
                    locale === 'pt'
                      ? 'bg-gray-200 dark:bg-gray-700 font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <LocaleLabel code="pt" />
                </Link>
                <Link
                  href={getLocalePath('en')}
                  className={`px-3 py-1 rounded-md ${
                    locale === 'en'
                      ? 'bg-gray-200 dark:bg-gray-700 font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <LocaleLabel code="en" />
                </Link>
                <Link
                  href={getLocalePath('es')}
                  className={`px-3 py-1 rounded-md ${
                    locale === 'es'
                      ? 'bg-gray-200 dark:bg-gray-700 font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <LocaleLabel code="es" />
                </Link>
              </div>

              <div className="flex space-x-4">
                <a
                  href="https://github.com/samueldk12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                >
                  <FaGithub className="h-6 w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/samuel-arao/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  <FaLinkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
} 