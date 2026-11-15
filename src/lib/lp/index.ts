import { PF_LANDINGS } from './pf';
import { PJ_LANDINGS } from './pj';
import type { LandingConfig, Audience } from './types';

export const LANDINGS: LandingConfig[] = [...PF_LANDINGS, ...PJ_LANDINGS];

export const LANDING_SLUGS = LANDINGS.map((l) => l.slug);

export function getLanding(slug: string): LandingConfig | undefined {
  return LANDINGS.find((l) => l.slug === slug);
}

export function landingsOf(audience: Audience) {
  return LANDINGS.filter((l) => l.audience === audience);
}

// Origens validas para um lead (alem das landings).
export const EXTRA_SOURCES = ['contact', 'sites-hub', 'home'];

export function isKnownSource(source: string) {
  return LANDING_SLUGS.includes(source) || EXTRA_SOURCES.includes(source);
}

// Projetos REAIS usados como prova nas landings (ja' publicados no site).
export const PROJECTS: Record<string, { name: string; text: string; url: string; image: string }> = {
  rozenir: {
    name: 'Rozenir',
    text: 'Landing page de uma consultora de Belo Horizonte, reunindo beleza, bem-estar e construção em um só lugar, com contato por WhatsApp.',
    url: 'https://lading-page-rozenir.vercel.app/',
    image: '/images/rozenir-logo.png',
  },
  tralingo: {
    name: 'Tralingo',
    text: 'Plataforma de aprendizado gamificada com IA, criada em parceria com a PneuJogos.',
    url: 'https://tralingo.com.br/',
    image: '/images/tralingo-logo.png',
  },
  venda: {
    name: 'Venda',
    text: 'CRM de vendas com prospecção por CNPJ e copiloto de IA para equipes comerciais.',
    url: 'https://venda-app-six.vercel.app/',
    image: '/images/venda-logo.png',
  },
};
