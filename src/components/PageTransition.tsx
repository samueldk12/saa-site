'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

// Cada secao do site tem uma personalidade propria (RPG, terminal, HQ,
// vidro liquido...) — a transicao de entrada/saida da pagina segue essa
// mesma linguagem, em vez de um fade generico igual para todo mundo.
const THEME_VARIANTS: Record<string, Variants> = {
  home: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
  },
  about: {
    // ficha de RPG "desenrolando" — como um pergaminho se abrindo
    initial: { opacity: 0, scaleY: 0.97, y: 14 },
    animate: { opacity: 1, scaleY: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scaleY: 0.98, y: -8, transition: { duration: 0.25, ease: 'easeIn' } },
  },
  skills: {
    // capa de gibi "batendo" na tela
    initial: { opacity: 0, scale: 0.92, rotate: -1.5 },
    animate: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] } },
    exit: { opacity: 0, scale: 0.94, rotate: 1, transition: { duration: 0.18, ease: 'easeIn' } },
  },
  projects: {
    // terminal "escrevendo" a tela da esquerda pra direita
    initial: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    animate: { opacity: 1, clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.4, ease: 'linear' } },
    exit: { opacity: 0, transition: { duration: 0.15, ease: 'linear' } },
  },
  saa: {
    // vidro liquido "materializando" com blur, como o glass da Apple
    initial: { opacity: 0, scale: 1.015, filter: 'blur(10px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, filter: 'blur(6px)', transition: { duration: 0.25, ease: 'easeIn' } },
  },
};

const getSection = (pathname: string | null, locale: string) => {
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

export default function PageTransition({ children, locale }: { children: ReactNode; locale: string }) {
  const pathname = usePathname();
  const section = getSection(pathname, locale);
  const variants = THEME_VARIANTS[section] || THEME_VARIANTS.home;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        style={{ willChange: 'opacity, transform, filter' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
