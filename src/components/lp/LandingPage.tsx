import {
  FaWhatsapp, FaMobileAlt, FaSearch, FaBolt, FaChartLine, FaShieldAlt, FaStore, FaCalendarCheck,
  FaLink, FaPalette, FaRocket, FaUsers, FaGift, FaPlug, FaClock, FaCheck, FaMapMarkerAlt,
  FaCamera, FaBriefcase, FaHeart, FaExternalLinkAlt,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import type { LandingConfig, IconKey } from '@/lib/lp/types';
import { PROJECTS } from '@/lib/lp';
import { BRAND, whatsappLink } from '@/lib/lp/site';
import LeadForm from './LeadForm';
import { TrackView, CtaLink, StickyCta } from './LandingClient';

const ICONS: Record<IconKey, IconType> = {
  whatsapp: FaWhatsapp, mobile: FaMobileAlt, search: FaSearch, bolt: FaBolt, chart: FaChartLine,
  shield: FaShieldAlt, store: FaStore, calendar: FaCalendarCheck, link: FaLink, palette: FaPalette,
  rocket: FaRocket, users: FaUsers, gift: FaGift, plug: FaPlug, clock: FaClock, check: FaCheck,
  map: FaMapMarkerAlt, camera: FaCamera, briefcase: FaBriefcase, heart: FaHeart,
};

const STEPS = [
  { title: 'Conversa rápida', text: 'Você me conta o que precisa pelo WhatsApp. Sem formulário longo.' },
  { title: 'Orçamento fechado', text: 'Envio escopo, prazo e valor antes de começar. Sem compromisso.' },
  { title: 'Você aprova e publica', text: 'Mostro a página, ajusto o que for preciso e só publico quando você aprovar.' },
];

function Headline({ text, highlight }: { text: string; highlight: string }) {
  const i = text.indexOf(highlight);
  if (!highlight || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-[var(--lp-accent)]">{highlight}</span>
      {text.slice(i + highlight.length)}
    </>
  );
}

// Ilustracao de pagina (celular ou navegador) montada em CSS — sem imagens.
function Mock({ cfg }: { cfg: LandingConfig }) {
  const m = cfg.mock;
  const body = (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="rounded-lg p-4" style={{ background: 'var(--lp-accent)', color: 'var(--lp-accent-ink)' }}>
        <div className={`text-lg font-bold leading-tight ${cfg.theme.serif ? 'font-serif' : ''}`}>{m.title}</div>
        <div className="mt-1 text-xs opacity-80">{m.subtitle}</div>
      </div>
      {m.buttons.map((b, i) => (
        <div
          key={b}
          className="rounded-lg border px-3 py-2.5 text-center text-sm font-medium"
          style={i === 0
            ? { background: 'var(--lp-ink)', color: 'var(--lp-bg)', borderColor: 'var(--lp-ink)' }
            : { borderColor: 'var(--lp-border)', color: 'var(--lp-ink)', background: 'var(--lp-surface)' }}
        >
          {b}
        </div>
      ))}
      <div className="mt-auto grid grid-cols-3 gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => <div key={i} className="h-10 rounded-md" style={{ background: 'var(--lp-border)' }} />)}
      </div>
    </div>
  );

  if (m.kind === 'phone') {
    return (
      <div aria-hidden="true" className="mx-auto w-60 rounded-[2rem] border-[6px] shadow-2xl" style={{ borderColor: 'var(--lp-ink)', background: 'var(--lp-bg)', height: 420 }}>
        <div className="mx-auto mt-1 h-1.5 w-16 rounded-full" style={{ background: 'var(--lp-border)' }} />
        {body}
      </div>
    );
  }
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border shadow-2xl" style={{ borderColor: 'var(--lp-border)', background: 'var(--lp-bg)', height: 380 }}>
      <div className="flex items-center gap-1.5 border-b px-3 py-2" style={{ borderColor: 'var(--lp-border)', background: 'var(--lp-surface)' }}>
        {[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--lp-border)' }} />)}
        <span className="ml-2 h-4 flex-1 rounded-full" style={{ background: 'var(--lp-border)' }} />
      </div>
      {body}
    </div>
  );
}

export default function LandingPage({ cfg }: { cfg: LandingConfig }) {
  const t = cfg.theme;
  const vars = {
    '--lp-accent': t.accent, '--lp-accent-ink': t.accentInk, '--lp-bg': t.bg, '--lp-surface': t.surface,
    '--lp-ink': t.ink, '--lp-muted': t.muted, '--lp-border': t.border,
    colorScheme: t.mode,
  } as React.CSSProperties;

  const heading = `${t.serif ? 'font-serif' : ''} font-bold tracking-tight`;
  const card = 'rounded-2xl border border-[color:var(--lp-border)] bg-[var(--lp-surface)]';
  const formCard = `${card} p-5 sm:p-6 shadow-xl`;
  const formInHero = cfg.layout.form === 'hero';
  const form = <LeadForm slug={cfg.slug} steps={cfg.layout.steps} form={cfg.form} />;

  return (
    <div style={vars} className="min-h-screen bg-[var(--lp-bg)] text-[color:var(--lp-ink)] antialiased" data-lp={cfg.slug}>
      <TrackView slug={cfg.slug} />

      {/* Topo minimalista: foco total na conversao */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <span className="text-sm font-semibold tracking-wide">{BRAND}</span>
        <a
          href={whatsappLink(cfg.form.waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--lp-border)] px-3.5 py-1.5 text-sm font-medium hover:border-[var(--lp-accent)]"
        >
          <FaWhatsapp /> WhatsApp
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-6 sm:px-6 sm:pt-10">
        <div className={`grid items-center gap-10 ${formInHero ? 'lg:grid-cols-[1.15fr_1fr]' : 'lg:grid-cols-[1.1fr_0.9fr]'}`}>
          <div>
            <span className="inline-block rounded-full border border-[color:var(--lp-border)] bg-[var(--lp-surface)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--lp-muted)]">
              {cfg.eyebrow}
            </span>
            <h1 className={`${heading} mt-5 text-[2rem] leading-[1.1] sm:text-5xl`}>
              <Headline text={cfg.headline} highlight={cfg.highlight} />
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[color:var(--lp-muted)]">{cfg.subheadline}</p>
            <ul className="mt-6 grid gap-2.5">
              {cfg.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <FaCheck className="mt-1 shrink-0 text-[var(--lp-accent)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {!formInHero && (
              <CtaLink slug={cfg.slug} className="mt-8 inline-flex rounded-xl bg-[var(--lp-accent)] px-7 py-4 text-lg font-bold text-[color:var(--lp-accent-ink)] shadow-lg hover:brightness-110">
                {cfg.cta}
              </CtaLink>
            )}
          </div>

          {formInHero ? (
            <div id="form" className={`${formCard} scroll-mt-6`}>{form}</div>
          ) : (
            <Mock cfg={cfg} />
          )}
        </div>
      </section>

      {/* Dor */}
      <section className="border-y border-[color:var(--lp-border)] bg-[var(--lp-surface)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className={`${heading} text-2xl sm:text-3xl`}>{cfg.painsTitle}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {cfg.pains.map((p) => (
              <li key={p} className="rounded-xl border border-[color:var(--lp-border)] bg-[var(--lp-bg)] p-4 leading-relaxed">{p}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Beneficios (+ ilustracao quando o form esta no hero) */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className={`grid items-center gap-10 ${formInHero ? 'lg:grid-cols-[1fr_0.8fr]' : ''}`}>
          <div>
            <h2 className={`${heading} text-2xl sm:text-3xl`}>{cfg.benefitsTitle}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {cfg.benefits.map((b) => {
                const Icon = ICONS[b.icon];
                return (
                  <div key={b.title} className={`${card} p-5`}>
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-lg" style={{ background: 'var(--lp-accent)', color: 'var(--lp-accent-ink)' }}>
                      <Icon />
                    </span>
                    <h3 className="font-bold">{b.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[color:var(--lp-muted)]">{b.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {formInHero && <Mock cfg={cfg} />}
        </div>
      </section>

      {/* Como funciona */}
      <section className="border-y border-[color:var(--lp-border)] bg-[var(--lp-surface)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className={`${heading} text-2xl sm:text-3xl`}>Como funciona</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-xl border border-[color:var(--lp-border)] bg-[var(--lp-bg)] p-5">
                <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold" style={{ background: 'var(--lp-accent)', color: 'var(--lp-accent-ink)' }}>{i + 1}</span>
                <h3 className="font-bold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[color:var(--lp-muted)]">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* O que esta incluso + projetos reais */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className={`${heading} text-2xl sm:text-3xl`}>O que está incluso</h2>
            <ul className="mt-6 grid gap-3">
              {cfg.included.map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <FaCheck className="mt-1 shrink-0 text-[var(--lp-accent)]" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>

          {cfg.projects.length > 0 && (
            <div>
              <h2 className={`${heading} text-2xl sm:text-3xl`}>Trabalhos reais</h2>
              <p className="mt-2 text-sm text-[color:var(--lp-muted)]">Páginas e produtos que eu mesmo construí — abra e veja funcionando.</p>
              <div className="mt-6 grid gap-4">
                {cfg.projects.map((id) => {
                  const p = PROJECTS[id];
                  if (!p) return null;
                  return (
                    <a key={id} href={p.url} target="_blank" rel="noopener noreferrer" className={`${card} flex items-center gap-4 p-4 hover:border-[var(--lp-accent)]`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt="" className="h-12 w-12 shrink-0 rounded-lg bg-white object-contain p-1" />
                      <span className="flex-1">
                        <span className="flex items-center gap-2 font-bold">{p.name} <FaExternalLinkAlt className="text-xs opacity-60" /></span>
                        <span className="mt-0.5 block text-sm text-[color:var(--lp-muted)]">{p.text}</span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-[color:var(--lp-border)] bg-[var(--lp-surface)]">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <h2 className={`${heading} text-2xl sm:text-3xl`}>Perguntas frequentes</h2>
          <div className="mt-8 grid gap-3">
            {cfg.faq.map((f) => (
              <details key={f.q} className="group rounded-xl border border-[color:var(--lp-border)] bg-[var(--lp-bg)] p-4">
                <summary className="cursor-pointer list-none font-semibold marker:hidden">
                  <span className="flex items-center justify-between gap-4">{f.q}<span className="text-[var(--lp-accent)] transition group-open:rotate-45">+</span></span>
                </summary>
                <p className="mt-3 leading-relaxed text-[color:var(--lp-muted)]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final / formulario */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {formInHero ? (
          <div className="text-center">
            <h2 className={`${heading} text-2xl sm:text-4xl`}>Pronto para começar?</h2>
            <p className="mx-auto mt-3 max-w-xl text-[color:var(--lp-muted)]">Deixe seu contato — eu respondo pelo WhatsApp com os próximos passos.</p>
            <CtaLink slug={cfg.slug} className="mt-8 inline-flex rounded-xl bg-[var(--lp-accent)] px-8 py-4 text-lg font-bold text-[color:var(--lp-accent-ink)] shadow-lg hover:brightness-110">
              {cfg.cta}
            </CtaLink>
          </div>
        ) : (
          <div className="mx-auto max-w-xl">
            <div id="form" className={`${formCard} scroll-mt-6`}>{form}</div>
          </div>
        )}
      </section>

      <footer className="border-t border-[color:var(--lp-border)] px-4 py-8 text-center text-sm text-[color:var(--lp-muted)]">
        <p>{BRAND} · Criação de sites e landing pages</p>
      </footer>

      <StickyCta slug={cfg.slug} label={cfg.cta} />
      <div className="h-16 md:hidden" aria-hidden="true" />
    </div>
  );
}
