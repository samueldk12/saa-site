'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useLayoutEffect, useRef } from 'react';

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

const isEl = (n: ChildNode): n is HTMLElement => n instanceof HTMLElement;

// Pega os "blocos" de mais alto nivel de uma pagina pra animar um a um.
// Cada pagina renderiza Navigation + um punhado de <section>/<div> —
// se so' existir um wrapper unico, desce um nivel pra achar blocos reais.
function pickBlocks(mountPoint: HTMLElement): HTMLElement[] {
  const root = mountPoint.firstElementChild as HTMLElement | null;
  if (!root) return [];
  let blocks = Array.from(root.children).filter(isEl).filter(el => el.tagName !== 'NAV');
  if (blocks.length <= 1 && blocks[0]) {
    const inner = Array.from(blocks[0].children).filter(isEl);
    if (inner.length > 1) blocks = inner;
  }
  return blocks.length > 0 ? blocks : Array.from(root.children).filter(isEl);
}

function createOverlay(background: string): HTMLDivElement {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.zIndex = '9999';
  overlay.style.background = background;
  overlay.style.pointerEvents = 'none';
  overlay.style.overflow = 'hidden';
  document.body.appendChild(overlay);
  return overlay;
}

// Home — os blocos caem de cima, um a um, como se a pagina fosse se
// montando enquanto "desce a tela".
function runHomeFall(mountPoint: HTMLElement, cleanups: (() => void)[]) {
  const blocks = pickBlocks(mountPoint);
  blocks.forEach((el, i) => {
    const anim = el.animate(
      [
        { transform: 'translateY(-64px)', opacity: 0 },
        { transform: 'translateY(10px)', opacity: 1, offset: 0.7 },
        { transform: 'translateY(0)', opacity: 1 },
      ],
      { duration: 620, delay: 80 + i * 140, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' }
    );
    cleanups.push(() => anim.cancel());
  });
}

// About — as secoes "renderizam", como se estivessem sendo compiladas:
// desfoque -> nitidez, com uma leve variacao de escala.
function runAboutRender(mountPoint: HTMLElement, cleanups: (() => void)[]) {
  const blocks = pickBlocks(mountPoint);
  blocks.forEach((el, i) => {
    const anim = el.animate(
      [
        { opacity: 0, filter: 'blur(10px)', transform: 'scale(0.97)' },
        { opacity: 0.6, filter: 'blur(4px)', transform: 'scale(0.99)', offset: 0.5 },
        { opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' },
      ],
      { duration: 560, delay: 60 + i * 130, easing: 'ease-out', fill: 'both' }
    );
    cleanups.push(() => anim.cancel());
  });
}

// Skills — cada bloco e' "desenhado" com um traco (clip-path) que varre
// da esquerda pra direita, com uma leve inclinacao de rabisco.
function runSkillsDraw(mountPoint: HTMLElement, cleanups: (() => void)[]) {
  const blocks = pickBlocks(mountPoint);
  blocks.forEach((el, i) => {
    const anim = el.animate(
      [
        { clipPath: 'inset(0 100% 0 0)', transform: 'rotate(-0.6deg)' },
        { clipPath: 'inset(0 0% 0 0)', transform: 'rotate(0deg)' },
      ],
      { duration: 460, delay: 90 + i * 150, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'both' }
    );
    cleanups.push(() => anim.cancel());
  });
}

// Projects — chuva de 0 e 1 forma o fundo, dissolve pra estrutura atual
// e so' entao o conteudo real e' "digitado" (varredura da esquerda).
function runProjectsType(mountPoint: HTMLElement, cleanups: (() => void)[]) {
  const overlay = createOverlay('#0B0E14');
  overlay.style.fontFamily = 'var(--font-mono), monospace';
  const colWidth = 22;
  const cols = Math.ceil(window.innerWidth / colWidth);
  for (let i = 0; i < cols; i++) {
    const col = document.createElement('div');
    col.style.position = 'absolute';
    col.style.top = '-100%';
    col.style.left = `${i * colWidth}px`;
    col.style.width = `${colWidth}px`;
    col.style.lineHeight = '18px';
    col.style.fontSize = '13px';
    col.style.color = '#5CE1A8';
    col.style.textAlign = 'center';
    col.style.opacity = String(0.3 + Math.random() * 0.55);
    const len = 22 + Math.floor(Math.random() * 14);
    col.innerHTML = Array.from({ length: len }, () => (Math.random() > 0.5 ? '1' : '0')).join('<br/>');
    overlay.appendChild(col);
    const anim = col.animate(
      [{ transform: 'translateY(0%)' }, { transform: 'translateY(220%)' }],
      { duration: 750 + Math.random() * 450, delay: Math.random() * 140, easing: 'linear', fill: 'forwards' }
    );
    cleanups.push(() => anim.cancel());
  }

  const timeoutId = window.setTimeout(() => {
    const fadeOut = overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, easing: 'ease-in', fill: 'forwards' });
    fadeOut.onfinish = () => overlay.remove();
    cleanups.push(() => overlay.remove());

    const blocks = pickBlocks(mountPoint);
    blocks.forEach((el, i) => {
      const anim = el.animate(
        [
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)' },
        ],
        { duration: 420, delay: i * 130, easing: 'steps(20, end)', fill: 'both' }
      );
      cleanups.push(() => anim.cancel());
    });
  }, 620);
  cleanups.push(() => { window.clearTimeout(timeoutId); overlay.remove(); });
}

// SAA — abertura de show: tudo escuro, um spot circula em torno da logo
// (focando nela), depois se abre revelando o site inteiro.
function runSaaSpotlight(mountPoint: HTMLElement, cleanups: (() => void)[]) {
  const root = mountPoint.firstElementChild as HTMLElement | null;
  const logoEl = root?.querySelector('img[alt="SAA Logo"]') as HTMLElement | null;
  const rect = logoEl?.getBoundingClientRect();
  const baseX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const baseY = rect ? rect.top + rect.height / 2 : 96;

  const overlay = createOverlay('#000');
  const maxR = Math.hypot(window.innerWidth, window.innerHeight);
  const FOCUS_R = 64;
  const HOLD = 550;
  const SWEEP = 750;
  const orbitR = 22;

  const setSpot = (x: number, y: number, r: number) => {
    const mask = `radial-gradient(circle at ${x}px ${y}px, transparent ${Math.max(r - 36, 0)}px, black ${r}px)`;
    overlay.style.maskImage = mask;
    (overlay.style as unknown as { webkitMaskImage: string }).webkitMaskImage = mask;
  };

  setSpot(baseX, baseY, 0);
  const start = performance.now();
  let raf = 0;
  const tick = (t: number) => {
    const elapsed = t - start;
    if (elapsed < HOLD) {
      const p = elapsed / HOLD;
      const angle = p * Math.PI * 2.4;
      setSpot(baseX + Math.cos(angle) * orbitR, baseY + Math.sin(angle) * orbitR, FOCUS_R);
      raf = requestAnimationFrame(tick);
    } else if (elapsed < HOLD + SWEEP) {
      const p = (elapsed - HOLD) / SWEEP;
      const eased = 1 - Math.pow(1 - p, 3);
      const angle = p * Math.PI * 1.2;
      const driftR = orbitR * (1 - p);
      setSpot(baseX + Math.cos(angle) * driftR, baseY + Math.sin(angle) * driftR, FOCUS_R + (maxR - FOCUS_R) * eased);
      raf = requestAnimationFrame(tick);
    } else {
      overlay.remove();
    }
  };
  raf = requestAnimationFrame(tick);
  cleanups.push(() => { cancelAnimationFrame(raf); overlay.remove(); });
}

const RUNNERS: Record<string, (mp: HTMLElement, c: (() => void)[]) => void> = {
  home: runHomeFall,
  about: runAboutRender,
  skills: runSkillsDraw,
  projects: runProjectsType,
  saa: runSaaSpotlight,
};

function TransitionStage({ pathname, section, children }: { pathname: string; section: string; children: ReactNode }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!mountRef.current) return;
    const cleanups: (() => void)[] = [];
    const runner = RUNNERS[section] || runHomeFall;
    runner(mountRef.current, cleanups);
    return () => cleanups.forEach(fn => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <motion.div
      ref={mountRef}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
    >
      {children}
    </motion.div>
  );
}

export default function PageTransition({ children, locale }: { children: ReactNode; locale: string }) {
  const pathname = usePathname();
  const section = getSection(pathname, locale);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <TransitionStage key={pathname} pathname={pathname || ''} section={section}>
        {children}
      </TransitionStage>
    </AnimatePresence>
  );
}
