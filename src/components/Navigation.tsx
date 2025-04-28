'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
// import { useTranslations } from 'next-intl';
import { getTranslations } from '@/lib/getTranslations';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';
// import { motion } from 'framer-motion';
import { motion } from '../lib/motion-stub';

interface NavigationProps {
  locale: string;
}

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
    // Extrai o caminho após o locale atual
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    return `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
  };

  const navItems = [
    { href: `/${locale}`, label: t.navigation.home },
    { href: `/${locale}/about`, label: t.navigation.about },
    { href: `/${locale}/projects`, label: t.navigation.projects },
    { href: `/${locale}/skills`, label: t.navigation.skills },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md'
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
      }`}
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
                  className={`nav-link text-sm lg:text-base ${pathname === item.href ? 'nav-link-active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Link
                  href={getLocalePath('pt')}
                  className={`nav-link text-sm ${locale === 'pt' ? 'font-bold' : 'font-normal'}`}
                >
                  PT
                </Link>
                <Link
                  href={getLocalePath('en')}
                  className={`nav-link text-sm ${locale === 'en' ? 'font-bold' : 'font-normal'}`}
                >
                  EN
                </Link>
                <Link
                  href={getLocalePath('es')}
                  className={`nav-link text-sm ${locale === 'es' ? 'font-bold' : 'font-normal'}`}
                >
                  ES
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/samueldk12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  <FaGithub className="text-xl" />
                </a>
                <a
                  href="https://www.linkedin.com/in/samuel-arao/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none p-2"
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
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 px-3 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'bg-blue-600 text-white'
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
                  PT
                </Link>
                <Link
                  href={getLocalePath('en')}
                  className={`px-3 py-1 rounded-md ${
                    locale === 'en'
                      ? 'bg-gray-200 dark:bg-gray-700 font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  EN
                </Link>
                <Link
                  href={getLocalePath('es')}
                  className={`px-3 py-1 rounded-md ${
                    locale === 'es'
                      ? 'bg-gray-200 dark:bg-gray-700 font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  ES
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