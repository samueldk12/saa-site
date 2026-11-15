'use client';

import { useRef, useState } from 'react';
import { FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import { maskPhone, submitLead, track } from '@/lib/lp/client';
import { whatsappLink } from '@/lib/lp/site';

interface Props {
  slug: string;
  steps: boolean;
  form: {
    title: string;
    subtitle: string;
    button: string;
    interestLabel: string;
    interests: string[];
    company: boolean;
    waMessage: string;
  };
}

const field =
  'w-full rounded-xl border border-[color:var(--lp-border)] bg-[var(--lp-bg)] px-4 py-3 text-base text-[color:var(--lp-ink)] placeholder:text-[color:var(--lp-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--lp-accent)]';

export default function LeadForm({ slug, steps, form }: Props) {
  const [step, setStep] = useState<1 | 2>(steps ? 1 : 2);
  const [interest, setInterest] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const started = useRef(false);

  const started_ = () => {
    if (started.current) return;
    started.current = true;
    track('form_start', slug);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setStatus('sending');
    const res = await submitLead({ source: slug, name, whatsapp, company, interest, website });
    if (res.ok) setStatus('done');
    else {
      setError(res.error || 'Erro ao enviar.');
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="text-center py-4" role="status">
        <FaCheckCircle className="mx-auto text-4xl text-[var(--lp-accent)] mb-3" />
        <h3 className="text-xl font-bold mb-2">Recebi seu contato!</h3>
        <p className="text-[color:var(--lp-muted)] mb-5">
          Vou te responder pelo WhatsApp em breve. Se preferir adiantar a conversa:
        </p>
        <a
          href={whatsappLink(form.waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-white"
        >
          <FaWhatsapp /> Chamar agora no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div onFocusCapture={started_} onClickCapture={started_}>
      <h3 className="text-xl font-bold mb-1">{form.title}</h3>
      <p className="text-sm text-[color:var(--lp-muted)] mb-5">{form.subtitle}</p>

      {step === 1 ? (
        <div>
          <p className="text-sm font-semibold mb-3">{form.interestLabel}</p>
          <div className="grid gap-2">
            {form.interests.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { setInterest(opt); setStep(2); }}
                className="text-left rounded-xl border border-[color:var(--lp-border)] bg-[var(--lp-bg)] px-4 py-3 hover:border-[var(--lp-accent)] hover:ring-1 hover:ring-[var(--lp-accent)] transition"
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="text-xs text-[color:var(--lp-muted)] mt-3">Passo 1 de 2</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="grid gap-3" noValidate={false}>
          {steps && interest && (
            <button type="button" onClick={() => setStep(1)} className="text-left text-xs text-[color:var(--lp-muted)] underline">
              {interest} · alterar
            </button>
          )}

          <label className="grid gap-1 text-sm font-medium">
            Seu nome
            <input className={field} value={name} onChange={(e) => setName(e.target.value)} required minLength={2} autoComplete="name" placeholder="Como posso te chamar?" />
          </label>

          <label className="grid gap-1 text-sm font-medium">
            WhatsApp
            <input
              className={field}
              value={whatsapp}
              onChange={(e) => setWhatsapp(maskPhone(e.target.value))}
              required
              inputMode="tel"
              autoComplete="tel"
              placeholder="(31) 99999-9999"
              pattern="\(\d{2}\) \d{4,5}-\d{4}"
              title="Informe DDD + número"
            />
          </label>

          {form.company && (
            <label className="grid gap-1 text-sm font-medium">
              Empresa <span className="font-normal text-[color:var(--lp-muted)]">(opcional)</span>
              <input className={field} value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" placeholder="Nome da empresa" />
            </label>
          )}

          {!steps && (
            <label className="grid gap-1 text-sm font-medium">
              {form.interestLabel} <span className="font-normal text-[color:var(--lp-muted)]">(opcional)</span>
              <select className={field} value={interest} onChange={(e) => setInterest(e.target.value)}>
                <option value="">Selecione</option>
                {form.interests.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </label>
          )}

          {/* honeypot — escondido de humanos */}
          <input
            type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
            value={website} onChange={(e) => setWebsite(e.target.value)}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          {error && <p role="alert" className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-xl bg-[var(--lp-accent)] px-5 py-3.5 text-base font-bold text-[color:var(--lp-accent-ink)] shadow-lg transition hover:brightness-110 disabled:opacity-60"
          >
            {status === 'sending' ? 'Enviando…' : form.button}
          </button>

          {status === 'error' && (
            <a href={whatsappLink(form.waMessage)} target="_blank" rel="noopener noreferrer" className="text-center text-sm underline">
              Prefere falar direto? Chame no WhatsApp
            </a>
          )}

          <p className="text-xs text-[color:var(--lp-muted)]">
            Sem compromisso. Uso seus dados só para responder a este contato.
          </p>
        </form>
      )}
    </div>
  );
}
