'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
// import { useTranslations } from 'next-intl';
import { getTranslations } from '@/lib/getTranslations';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
// import { motion } from 'framer-motion';
import { motion } from '../lib/motion-stub';

interface NavigationProps {
  locale: string;
}

export default function Navigation({ locale }: NavigationProps) {
  const t = getTranslations(locale);
  const pathname = usePathname();

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
      className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href={`/${locale}`} className="flex items-center">
              <div className="relative h-16 w-52">
                <Image 
                  src="/images/logo.svg" 
                  alt="SAA Logo" 
                  fill
                  priority
                  className="object-contain dark:brightness-0 dark:invert"
                />
              </div>
            </Link>
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? 'nav-link-active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Link
                href={getLocalePath('pt')}
                className="nav-link"
              >
                PT
              </Link>
              <Link
                href={getLocalePath('en')}
                className="nav-link"
              >
                EN
              </Link>
              <Link
                href={getLocalePath('es')}
                className="nav-link"
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
      </div>
    </motion.nav>
  );
} 