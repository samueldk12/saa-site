'use client';

// import { useTranslations } from 'next-intl';
import { getTranslations, getTranslationsWithNamespace } from '@/lib/getTranslations';
import { motion } from '@/lib/motion-stub';
import Navigation from '@/components/Navigation';
import ContactForm from '@/components/ContactForm';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useParams } from 'next/navigation';

export default function Contact() {
  const params = useParams();
  const locale = params.locale as string;
  const t = getTranslationsWithNamespace(locale, 'contact');

  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/samueldk12',
      color: 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/samuel-arao/',
      color: 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:samuel.arao@gmail.com',
      color: 'text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navigation locale={locale} />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <div className="card p-8">
              <ContactForm locale={locale} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              {t('social.title')}
            </h2>
            <div className="flex justify-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-3xl ${social.color} transition-colors`}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 