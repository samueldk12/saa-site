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

const MIN_BLOCKS = 3;
const MAX_BLOCKS = 7;

// Pega os "blocos" de mais alto nivel de uma pagina pra animar um a um.
// Cada pagina tem um numero bem diferente de secoes (Skills e' so' uma,
// About tem oito) — sem limitar isso, paginas com poucos blocos ficam
// com um unico bloco gigante (quebra visualmente) e paginas com muitos
// blocos esticam a sequencia por segundos. Desce niveis ate' ter pelo
// menos MIN_BLOCKS, e corta em MAX_BLOCKS pra sequencia nunca esticar
// demais nem depender do tamanho da pagina.
function pickBlocks(mountPoint: HTMLElement): HTMLElement[] {
  const root = mountPoint.firstElementChild as HTMLElement | null;
  if (!root) return [];
  let blocks = Array.from(root.children).filter(isEl).filter(el => el.tagName !== 'NAV');
  let depth = 0;
  while (blocks.length < MIN_BLOCKS && depth < 3) {
    const source = blocks[0] || root;
    const inner = Array.from(source.children).filter(isEl);
    if (inner.length <= 1) break;
    blocks = inner;
    depth++;
  }
  if (blocks.length === 0) blocks = [root];
  return blocks.slice(0, MAX_BLOCKS);
}

// Incremento de atraso entre blocos, calculado pra' a sequencia inteira
// (do primeiro ao ultimo bloco comecar) caber dentro de `totalSpan`,
// independente de quantos blocos a pagina tiver.
function staggerStep(totalSpan: number, blockCount: number, min = 30, max = 170) {
  if (blockCount <= 1) return 0;
  return Math.max(min, Math.min(max, totalSpan / (blockCount - 1)));
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
  const step = staggerStep(380, blocks.length);
  blocks.forEach((el, i) => {
    const anim = el.animate(
      [
        { transform: 'translateY(-64px)', opacity: 0 },
        { transform: 'translateY(10px)', opacity: 1, offset: 0.7 },
        { transform: 'translateY(0)', opacity: 1 },
      ],
      { duration: 500, delay: 60 + i * step, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' }
    );
    cleanups.push(() => anim.cancel());
  });
}

// About — as secoes "renderizam", como se estivessem sendo compiladas:
// desfoque -> nitidez, com uma leve variacao de escala.
function runAboutRender(mountPoint: HTMLElement, cleanups: (() => void)[]) {
  const blocks = pickBlocks(mountPoint);
  const step = staggerStep(420, blocks.length);
  blocks.forEach((el, i) => {
    const anim = el.animate(
      [
        { opacity: 0, filter: 'blur(10px)', transform: 'scale(0.97)' },
        { opacity: 0.6, filter: 'blur(4px)', transform: 'scale(0.99)', offset: 0.5 },
        { opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' },
      ],
      { duration: 480, delay: 50 + i * step, easing: 'ease-out', fill: 'both' }
    );
    cleanups.push(() => anim.cancel());
  });
}

// Skills — cada bloco e' "desenhado": um traco (clip-path) varre da
// esquerda pra direita com uma leve inclinacao de rabisco, e uma ponta
// de caneta luminosa percorre a borda junto, como se estivesse
// literalmente riscando o painel na tela.
function runSkillsDraw(mountPoint: HTMLElement, cleanups: (() => void)[]) {
  const blocks = pickBlocks(mountPoint);
  const step = staggerStep(360, blocks.length);
  blocks.forEach((el, i) => {
    const duration = 420;
    const delay = 60 + i * step;

    const anim = el.animate(
      [
        { clipPath: 'inset(0 100% 0 0)', transform: 'rotate(-0.6deg)' },
        { clipPath: 'inset(0 0% 0 0)', transform: 'rotate(0deg)' },
      ],
      { duration, delay, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'both' }
    );
    cleanups.push(() => anim.cancel());

    const wasStatic = getComputedStyle(el).position === 'static';
    if (wasStatic) el.style.position = 'relative';

    const pen = document.createElement('div');
    pen.style.position = 'absolute';
    pen.style.top = '0';
    pen.style.width = '3px';
    pen.style.height = '100%';
    pen.style.background = 'linear-gradient(180deg, transparent, #E33D3D, transparent)';
    pen.style.boxShadow = '0 0 12px 2px rgba(227,61,61,0.75)';
    pen.style.pointerEvents = 'none';
    pen.style.zIndex = '50';
    el.appendChild(pen);

    const penAnim = pen.animate(
      [
        { left: '0%', opacity: 0 },
        { left: '0%', opacity: 1, offset: 0.03 },
        { left: '100%', opacity: 1, offset: 0.94 },
        { left: '100%', opacity: 0 },
      ],
      { duration, delay, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'both' }
    );
    penAnim.onfinish = () => pen.remove();
    cleanups.push(() => {
      penAnim.cancel();
      pen.remove();
      if (wasStatic) el.style.position = '';
    });
  });
}

// Projects — uma chuva de 0 e 1 cai cobrindo a tela, e a estrutura real
// da pagina ja' vai se formando por baixo enquanto ela ainda cai — os
// digitos "viram" o layout, em vez de duas etapas separadas.
function runProjectsType(mountPoint: HTMLElement, cleanups: (() => void)[]) {
  const overlay = createOverlay('transparent');
  overlay.style.fontFamily = 'var(--font-mono), monospace';

  const backdrop = document.createElement('div');
  backdrop.style.position = 'absolute';
  backdrop.style.inset = '0';
  backdrop.style.background = '#0B0E14';
  overlay.appendChild(backdrop);

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
    const len = 20 + Math.floor(Math.random() * 12);
    col.innerHTML = Array.from({ length: len }, () => (Math.random() > 0.5 ? '1' : '0')).join('<br/>');
    overlay.appendChild(col);
    const anim = col.animate(
      [{ transform: 'translateY(0%)' }, { transform: 'translateY(220%)' }],
      { duration: 650 + Math.random() * 350, delay: Math.random() * 120, easing: 'linear', fill: 'forwards' }
    );
    cleanups.push(() => anim.cancel());
  }

  // a estrutura real comeca a se formar bem cedo, ainda debaixo da chuva
  const revealId = window.setTimeout(() => {
    const blocks = pickBlocks(mountPoint);
    const step = staggerStep(320, blocks.length);
    blocks.forEach((el, i) => {
      const anim = el.animate(
        [
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)' },
        ],
        { duration: 420, delay: i * step, easing: 'steps(24, end)', fill: 'both' }
      );
      cleanups.push(() => anim.cancel());
    });
  }, 180);
  cleanups.push(() => window.clearTimeout(revealId));

  // o fundo escuro vai sumindo enquanto os digitos ainda caem por cima,
  // deixando a pagina real "aparecer atraves" da chuva
  const backdropFade = backdrop.animate(
    [{ opacity: 1 }, { opacity: 0 }],
    { duration: 700, delay: 220, easing: 'ease-in', fill: 'forwards' }
  );
  cleanups.push(() => backdropFade.cancel());

  const removeId = window.setTimeout(() => overlay.remove(), 1050);
  cleanups.push(() => { window.clearTimeout(removeId); overlay.remove(); });
}

// SAA — abertura de show: tudo escuro, um spot circula em torno da logo
// (focando nela), depois se abre revelando o site inteiro.
function runSaaSpotlight(mountPoint: HTMLElement, cleanups: (() => void)[]) {
  const root = mountPoint.firstElementChild as HTMLElement | null;
  // A Navigation (renderizada antes no DOM) tambem tem uma logo com o
  // mesmo alt="SAA Logo" — busca pelo src, que e' exclusivo da logo do
  // masthead, senao o seletor por alt pega a logo errada (a do header).
  const logoEl = root?.querySelector('img[src*="saa-logo"]') as HTMLElement | null;
  const rect = logoEl?.getBoundingClientRect();
  const hasValidRect = !!rect && rect.width > 0 && rect.height > 0;
  const baseX = hasValidRect ? rect!.left + rect!.width / 2 : window.innerWidth / 2;
  const baseY = hasValidRect ? rect!.top + rect!.height / 2 : 96;

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

// Som tematico por secao — toca junto com a animacao de entrada. No
// primeiro carregamento da pagina o navegador bloqueia autoplay com som
// (sem gesto do usuario ainda) e a Promise so' falha silenciosamente,
// entao so' soa mesmo em navegacoes reais (clique em link).
const SOUNDS: Record<string, string> = {
  home: '/sounds/page-home.wav',
  about: '/sounds/page-about.wav',
  skills: '/sounds/page-skills.wav',
  projects: '/sounds/page-projects.wav',
  saa: '/sounds/page-saa.wav',
};

function playThemeSound(section: string, cleanups: (() => void)[]) {
  const src = SOUNDS[section];
  if (!src) return;
  try {
    const audio = new Audio(src);
    audio.volume = 0.45;
    audio.play().catch(() => {});
    cleanups.push(() => { audio.pause(); });
  } catch {
    // ambiente sem suporte a audio — ignora
  }
}

function TransitionStage({ pathname, section, children }: { pathname: string; section: string; children: ReactNode }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!mountRef.current) return;
    const cleanups: (() => void)[] = [];
    const runner = RUNNERS[section] || runHomeFall;
    runner(mountRef.current, cleanups);
    playThemeSound(section, cleanups);
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
