export type Audience = 'pf' | 'pj';

export type IconKey =
  | 'whatsapp' | 'mobile' | 'search' | 'bolt' | 'chart' | 'shield' | 'store'
  | 'calendar' | 'link' | 'palette' | 'rocket' | 'users' | 'gift' | 'plug'
  | 'clock' | 'check' | 'map' | 'camera' | 'briefcase' | 'heart';

export interface Theme {
  mode: 'light' | 'dark';
  accent: string;      // cor de destaque (botoes, realces)
  accentInk: string;   // texto sobre o accent
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  border: string;
  serif?: boolean;     // titulos em serifa
}

export interface MockConfig {
  kind: 'phone' | 'browser';
  title: string;
  subtitle: string;
  buttons: string[];
}

export interface LandingConfig {
  slug: string;
  audience: Audience;
  niche: string;
  seo: { title: string; description: string };
  theme: Theme;
  // Braco do experimento: onde o formulario aparece e se e' em etapas.
  layout: { form: 'hero' | 'bottom'; steps: boolean };
  eyebrow: string;
  headline: string;
  highlight: string;   // trecho do headline destacado com a cor accent
  subheadline: string;
  bullets: string[];
  cta: string;
  mock: MockConfig;
  painsTitle: string;
  pains: string[];
  benefitsTitle: string;
  benefits: { icon: IconKey; title: string; text: string }[];
  included: string[];
  faq: { q: string; a: string }[];
  form: {
    title: string;
    subtitle: string;
    button: string;
    interestLabel: string;
    interests: string[];
    company: boolean;      // pede nome da empresa
    waMessage: string;     // mensagem pre-preenchida do WhatsApp
  };
  // ids de projetos reais (ver PROJECTS) exibidos como prova
  projects: string[];
}
