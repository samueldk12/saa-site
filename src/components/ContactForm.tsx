'use client';

import { useState } from 'react';
import { getTranslationsWithNamespace } from '@/lib/getTranslations';
import { maskPhone, submitLead } from '@/lib/lp/client';
import { whatsappLink } from '@/lib/lp/site';

const input =
  'w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white';

// Formulario de contato do site: grava o lead (origem "contact") e
// avisa o dono, no mesmo funil das landing pages.
export default function ContactForm({ locale }: { locale: string }) {
  const t = getTranslationsWithNamespace(locale, 'contact');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() && !whatsapp.trim()) {
      setError(t('form.needContact'));
      setStatus('error');
      return;
    }
    setStatus('sending');
    setError('');
    const res = await submitLead({ source: 'contact', name, email, whatsapp, message, website });
    if (res.ok) {
      setStatus('done');
    } else {
      setError(res.error || t('form.error'));
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <p role="status" className="text-center text-green-700 dark:text-green-400 font-medium py-6">
        {t('form.success')}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form.name')}</label>
        <input id="name" name="name" className={input} value={name} onChange={(e) => setName(e.target.value)} required minLength={2} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form.email')}</label>
        <input id="email" name="email" type="email" className={input} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      </div>
      <div>
        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form.whatsapp')}</label>
        <input id="whatsapp" name="whatsapp" inputMode="tel" className={input} value={whatsapp} onChange={(e) => setWhatsapp(maskPhone(e.target.value))} placeholder="(31) 99999-9999" autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form.message')}</label>
        <textarea id="message" name="message" rows={4} className={input} value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-60"
      >
        {status === 'sending' ? t('form.sending') : t('form.submit')}
      </button>

      {status === 'error' && (
        <a href={whatsappLink('Oi Samuel! Tentei enviar o formulário do seu site.')} target="_blank" rel="noopener noreferrer" className="block text-center text-sm underline text-gray-600 dark:text-gray-300">
          WhatsApp
        </a>
      )}
    </form>
  );
}
