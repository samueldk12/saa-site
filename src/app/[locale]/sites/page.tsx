'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaUser, FaBuilding, FaArrowRight, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import Navigation from '@/components/Navigation';
import { getTranslationsWithNamespace } from '@/lib/getTranslations';
import { whatsappLink } from '@/lib/lp/site';

// Hub de "Criar site": leva o visitante do site pessoal para o funil.
// /lp/pf e /lp/pj sorteiam uma das 5 landings do grupo (teste A/B).
export default function SitesHub() {
  const locale = useParams().locale as string;
  const t = getTranslationsWithNamespace(locale, 'sites');

  const cards = [
    { href: '/lp/pf', icon: <FaUser />, title: t('forYou'), text: t('forYouText') },
    { href: '/lp/pj', icon: <FaBuilding />, title: t('forBusiness'), text: t('forBusinessText') },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0C0E] text-gray-800 dark:text-white">
      <Navigation locale={locale} />

      <section className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
        <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4 pb-2 border-b border-gray-300 dark:border-gray-700">
          {t('eyebrow')}
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 leading-[1.05] tracking-tight">
          {t('title')}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">{t('subtitle')}</p>
      </section>

      <section className="container mx-auto px-4 pb-16 max-w-4xl">
        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="group block rounded-sm border border-gray-200 dark:border-gray-700/70 bg-white dark:bg-[#14161A] p-8 hover:border-gray-900 dark:hover:border-white transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-lg mb-6 group-hover:border-gray-900 dark:group-hover:border-white transition-colors">
                {c.icon}
              </div>
              <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{c.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{c.text}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white border-b border-gray-400 group-hover:border-current pb-0.5">
                {t('seeMore')} <FaArrowRight className="text-xs" />
              </span>
            </a>
          ))}
        </div>
        {locale !== 'pt' && <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">{t('note')}</p>}
      </section>

      <section className="container mx-auto px-4 pb-24 max-w-4xl">
        <div className="border-t border-gray-200 dark:border-gray-700/70 pt-10">
          <h2 className="font-serif text-2xl font-semibold mb-5">{t('orTalk')}</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappLink('Oi Samuel! Vi seu site e quero saber mais sobre a criação de sites.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 rounded-sm flex items-center gap-2 text-sm font-medium tracking-wide transition-colors"
            >
              <FaWhatsapp /> {t('whatsapp')}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="px-6 py-3 border border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-sm flex items-center gap-2 text-sm font-medium tracking-wide transition-colors"
            >
              <FaEnvelope /> {t('contactPage')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
