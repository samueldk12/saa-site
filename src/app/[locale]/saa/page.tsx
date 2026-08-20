'use client';

import { getTranslations } from '@/lib/getTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { FaGlobe, FaBuilding, FaInfoCircle, FaExternalLinkAlt, FaHandshake, FaBrain, FaDatabase, FaCode, FaGamepad, FaBolt, FaGraduationCap as FaGrad } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function SAACompany() {
  const { locale } = useParams();
  const t = getTranslations(locale as string);
  
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Projetos da SAA
  const saaProjects = [
    {
      id: 'tralingo',
      name: 'Tralingo',
      description: locale === 'en'
        ? 'Gamified, AI-powered learning platform that turns any subject — from public exam prep to new hobbies — into personalized daily lessons with XP, streaks, and rankings.'
        : locale === 'es'
        ? 'Plataforma de aprendizaje gamificada impulsada por IA que convierte cualquier tema, desde oposiciones hasta nuevos hobbies, en lecciones diarias personalizadas con XP, rachas y rankings.'
        : 'Plataforma de aprendizado gamificada com IA que transforma qualquer assunto, de concursos públicos a novos hobbies, em lições diárias personalizadas com XP, ofensivas e rankings.',
      fullDescription: locale === 'en'
        ? 'Tralingo is an AI-powered gamified training platform built in partnership with PneuJogos (Pneu Studios). It generates personalized learning tracks from any content — upload a PDF of an exam syllabus or class notes and the AI turns it into dynamic, high-retention lessons and quizzes. Users earn XP, keep daily streaks, and compete on global rankings, whether preparing for public exams (concursos) and college entrance exams (ENEM/vestibulares) or picking up a new hobby like languages, programming, music, or cooking. Tralingo also offers a dedicated solution for companies to train teams with department-based tracks, corporate rankings, and performance reports.'
        : locale === 'es'
        ? 'Tralingo es una plataforma de entrenamiento gamificada impulsada por IA, creada en asociación con PneuJogos (Pneu Studios). Genera trayectos de aprendizaje personalizados a partir de cualquier contenido: sube un PDF del temario de una oposición o de tus apuntes y la IA lo transforma en lecciones y quizzes dinámicos de alta retención. Los usuarios ganan XP, mantienen rachas diarias y compiten en rankings globales, ya sea preparando oposiciones y exámenes de ingreso (vestibulares/ENEM) o aprendiendo un nuevo hobby como idiomas, programación, música o cocina. Tralingo también ofrece una solución dedicada para que las empresas capaciten a sus equipos con trayectos por departamento, rankings corporativos e informes de desempeño.'
        : 'O Tralingo é uma plataforma de treinamento gamificada com IA, criada em parceria com a PneuJogos (Pneu Studios). Ele gera trilhas de aprendizado personalizadas a partir de qualquer conteúdo — basta subir um PDF de edital ou de uma apostila para a IA transformar o material em lições e simulados dinâmicos e de alta retenção. Os usuários ganham XP, mantêm ofensivas diárias e competem em rankings globais, seja se preparando para concursos públicos e vestibulares/ENEM, seja aprendendo um novo hobby como idiomas, programação, música ou culinária. O Tralingo também oferece uma solução dedicada para empresas treinarem equipes com trilhas por departamento, ranking corporativo e relatórios de desempenho.',
      url: 'https://tralingo.com.br/',
      icon: <img src="/images/tralingo-logo.png" alt="Tralingo" className="w-8 h-8 object-contain" />,
      color: 'emerald',
      gradient: 'from-emerald-400 to-teal-600',
      bgLight: 'bg-emerald-50/80',
      bgDark: 'bg-emerald-900/20',
      technologies: ['AI', 'Gamification', 'Education'],
      partnership: 'PneuJogos (Pneu Studios)',
      partnerName: 'PneuJogos',
      image: '/images/tralingo-logo.png',
      partnerIcon: <img src="/images/pneujogos-logo.jpeg" alt="PneuJogos" className="w-6 h-6 object-contain rounded" />,
      showPartnerTag: true,
    },
    {
      id: 'venda',
      name: 'Venda',
      description: locale === 'en'
        ? 'Sales CRM with active CNPJ prospecting and an AI copilot that helps commercial teams find and close new customers.'
        : locale === 'es'
        ? 'CRM de ventas con prospección activa de CNPJ y un copiloto de IA que ayuda a los equipos comerciales a encontrar y cerrar nuevos clientes.'
        : 'CRM de vendas com prospecção ativa por CNPJ e um copiloto de IA que ajuda equipes comerciais a encontrar e fechar novos clientes.',
      fullDescription: locale === 'en'
        ? 'Venda is a Brazilian sales platform that combines a CRM, active prospecting, and an AI copilot for commercial teams. It lets you search Brazil\'s Federal Revenue database of more than 50 million companies by industry, size, and location, track leads through a visual Kanban sales funnel, and generate persuasive outreach scripts with an AI copilot powered by Google Gemini, using methodologies like SPIN Selling and Sandler. WhatsApp and email are built into the platform, along with trigger-based automations for follow-ups and lead nurturing.'
        : locale === 'es'
        ? 'Venda es una plataforma de ventas brasileña que combina un CRM, prospección activa y un copiloto de IA para equipos comerciales. Permite buscar en la base de datos de la Receita Federal de Brasil, con más de 50 millones de empresas, filtrando por sector, tamaño y ubicación, dar seguimiento a los leads en un embudo de ventas Kanban visual y generar guiones de abordaje persuasivos con un copiloto de IA impulsado por Google Gemini, usando metodologías como SPIN Selling y Sandler. WhatsApp y correo electrónico están integrados en la plataforma, junto con automatizaciones por disparadores para seguimientos y nutrición de leads.'
        : 'O Venda é uma plataforma de vendas brasileira que combina CRM, prospecção ativa e um copiloto de IA para equipes comerciais. Ele permite buscar na base da Receita Federal, com mais de 50 milhões de empresas, filtrando por segmento, porte e localização, acompanhar leads em um funil de vendas Kanban visual e gerar roteiros de abordagem persuasivos com um copiloto de IA baseado no Google Gemini, usando metodologias como SPIN Selling e Sandler. WhatsApp e e-mail já vêm integrados à plataforma, além de automações por gatilhos para follow-ups e nutrição de leads.',
      url: 'https://venda-app-six.vercel.app/',
      icon: <img src="/images/venda-logo.png" alt="Venda" className="w-8 h-8 object-contain" />,
      color: 'amber',
      gradient: 'from-amber-400 to-orange-600',
      bgLight: 'bg-amber-50/80',
      bgDark: 'bg-amber-900/20',
      technologies: ['AI', 'CRM', 'Automation'],
      image: '/images/venda-logo.png'
    },
    {
      id: 'rozenir',
      name: 'Rozenir',
      description: locale === 'en'
        ? 'Personal landing page for Rozenir Apolinário Gonzaga, a Belo Horizonte-based reseller and consultant offering beauty products, wellness plans, and construction-related services.'
        : locale === 'es'
        ? 'Landing page personal de Rozenir Apolinário Gonzaga, revendedora y consultora de Belo Horizonte que ofrece productos de belleza, planes de bienestar y servicios relacionados con la construcción.'
        : 'Landing page pessoal da Rozenir Apolinário Gonzaga, revendedora e consultora de Belo Horizonte que oferece produtos de beleza, planos de bem-estar e serviços ligados à construção civil.',
      fullDescription: locale === 'en'
        ? 'This landing page was built for Rozenir Apolinário Gonzaga, a technical building designer and sales consultant based in Belo Horizonte, MG. It presents her three lines of work in one place: Beauty, with perfumery, makeup, and skin and body care from trusted brands; Well-being, with insurance, health plans, and credit for personal and business goals; and Construction, with technical building design and tax-refund support for home construction expenses. The page centralizes her contact channels — WhatsApp, Instagram, and LinkedIn — so clients can reach her directly for personalized service.'
        : locale === 'es'
        ? 'Esta landing page fue creada para Rozenir Apolinário Gonzaga, delineante técnica de edificaciones y consultora de ventas de Belo Horizonte, MG. Presenta sus tres frentes de trabajo en un solo lugar: Belleza, con perfumería, maquillaje y cuidados para piel y cuerpo de marcas de confianza; Bienestar, con seguros, planes de salud y crédito para objetivos personales y empresariales; y Construcción, con diseño técnico de edificaciones y apoyo para la restitución de impuestos pagados en la construcción de la casa. La página centraliza sus canales de contacto — WhatsApp, Instagram y LinkedIn — para que los clientes puedan hablar con ella directamente y recibir un atendimiento personalizado.'
        : 'Esta landing page foi criada para a Rozenir Apolinário Gonzaga, desenhista técnica de edificações e consultora de vendas de Belo Horizonte, MG. Ela reúne suas três frentes de atuação em um só lugar: Beleza, com perfumaria, maquiagem e cuidados para pele e corpo de marcas confiáveis; Bem-estar, com seguros, planos de saúde e crédito para realizações pessoais e empresariais; e Construção, com desenho técnico de edificações e apoio para a restituição de impostos pagos na construção da casa. A página centraliza seus canais de contato — WhatsApp, Instagram e LinkedIn — para que os clientes falem diretamente com ela e tenham um atendimento personalizado.',
      url: 'https://lading-page-rozenir.vercel.app/',
      icon: <img src="/images/rozenir-logo.png" alt="Rozenir" className="w-8 h-8 object-contain" />,
      color: 'blue',
      gradient: 'from-blue-400 to-indigo-600',
      bgLight: 'bg-blue-50/80',
      bgDark: 'bg-blue-900/20',
      technologies: ['Web', 'Landing Page', 'Business'],
      image: '/images/rozenir-logo.png'
    }
  ];

  const openProjectModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Cartão de projeto — linguagem de "one-pager" corporativo: neutro, com
  // bordas finas e um único acento (navy), sem cor por projeto.
  const SAAProjectCard = ({ project, index }: { project: any; index: number }) => (
    <motion.div
      className="group relative rounded-[28px] overflow-hidden flex flex-col h-full border border-black/10 dark:border-white/15 bg-white/40 dark:bg-white/[0.06] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_4px_20px_rgba(15,23,42,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:bg-black/[0.04] dark:hover:bg-white/[0.1] hover:border-black/20 dark:hover:border-white/25 hover:-translate-y-1 transition-all duration-300"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/40 to-transparent" />
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center relative">
            {project.icon}
            {project.showPartnerTag && (
              <div className="absolute -bottom-2 -right-2 bg-blue-600 dark:bg-[#4FA8FF] rounded-full w-6 h-6 flex items-center justify-center border-2 border-white/80 dark:border-black/40">
                <FaHandshake className="text-slate-900 dark:text-white text-xs" />
              </div>
            )}
          </div>
          <button
            onClick={() => openProjectModal(project)}
            className="text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Ver detalhes"
          >
            <FaInfoCircle className="text-base sm:text-lg" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-1.5">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            {project.name}
          </h2>
          {project.partnerName && (
            <span className="flex items-center gap-1 text-[0.65rem] font-mono uppercase tracking-wide text-blue-700 dark:text-[#7CC5FF] border border-blue-600/30 dark:border-[#4FA8FF]/30 px-1.5 py-0.5 rounded-full">
              {project.partnerName}
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-white/60 mb-4 sm:mb-5 line-clamp-3 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech: string) => (
            <span
              key={`${project.id}-${tech}`}
              className="px-2 py-0.5 border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/5 text-slate-600 dark:text-white/60 rounded-full text-[0.65rem] font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10">
          <div className="flex items-center text-slate-400 dark:text-white/40 text-[0.65rem] font-mono uppercase tracking-wide">
            <FaBuilding className="mr-1.5 text-[0.6rem]" />
            {t.projects?.commercial || 'Comercial'}
          </div>

          {project.url && project.url !== '#' && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-[#7CC5FF] hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Visitar site"
            >
              <FaGlobe className="text-[0.65rem]" />
              {locale === 'en' ? 'Visit site' : locale === 'es' ? 'Visitar sitio' : 'Visitar site'}
              <FaExternalLinkAlt className="text-[0.55rem]" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );

  const ProjectModal = ({ project }: { project: any }) => {
    return (
      <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
        <motion.div
          className="relative rounded-[32px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/[0.08] backdrop-blur-2xl backdrop-saturate-150"
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25 }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/40 to-transparent" />
          <div className="p-5 sm:p-8 overflow-y-auto">
            <div className="flex justify-between items-start mb-6 pb-6 border-b border-black/10 dark:border-white/10">
              <div className="flex items-start">
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/10 backdrop-blur-sm mr-4 flex items-center justify-center relative">
                  {project.icon}
                  {project.showPartnerTag && (
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 dark:bg-[#4FA8FF] rounded-full w-7 h-7 flex items-center justify-center border-2 border-white/80 dark:border-black/40">
                      <FaHandshake className="text-sm text-slate-900 dark:text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex flex-wrap items-center gap-2 tracking-tight">
                    {project.name}
                    {project.partnerName && (
                      <span className="text-[0.65rem] font-mono uppercase tracking-wide text-blue-700 dark:text-[#7CC5FF] border border-blue-600/30 dark:border-[#4FA8FF]/30 px-1.5 py-0.5 rounded">
                        {project.partnerName}
                      </span>
                    )}
                  </h2>
                  <div className="mt-1.5 flex items-center text-slate-500 dark:text-white/50 text-xs font-mono uppercase tracking-wide">
                    <FaBuilding className="mr-1.5" />
                    <span>{t.projects?.commercial || 'Projeto Comercial'}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={closeProjectModal}
                className="text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Fechar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-white/40 mb-2">
                {t.projects?.description || 'Descrição'}
              </h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-white/70 leading-relaxed">
                {project.fullDescription || project.description}
              </p>

              {project.partnership && (
                <div className="mt-4 border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/5 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
                  {project.partnerIcon && (
                    <div className="w-8 h-8 flex-shrink-0">
                      {project.partnerIcon}
                    </div>
                  )}
                  <p className="text-slate-700 dark:text-white/70 text-xs sm:text-sm">
                    <span className="font-semibold text-slate-900 dark:text-white">{t.projects?.partnership || (locale === 'en' ? 'Partnership' : locale === 'es' ? 'Asociación' : 'Parceria')}:</span> {project.partnership}
                  </p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-white/40 mb-2">
                {t.projects?.technologies || 'Tecnologias'}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech: string) => (
                  <span
                    key={`modal-${project.id}-${tech}`}
                    className="px-2.5 py-1 border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/5 text-slate-700 dark:text-white/70 rounded-full text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 border-t border-black/10 dark:border-white/10 flex flex-wrap gap-2 sm:gap-3 justify-end">
            <button
              onClick={closeProjectModal}
              className="px-4 py-2 border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white rounded-full transition-colors text-sm font-medium"
            >
              {locale === 'en' ? 'Close' : locale === 'es' ? 'Cerrar' : 'Fechar'}
            </button>

            {project.url && project.url !== '#' && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 dark:bg-[#4FA8FF] hover:bg-blue-700 dark:hover:bg-[#3B93EA] text-white dark:text-black rounded-full flex items-center gap-2 transition-colors text-sm font-medium"
              >
                <FaGlobe className="text-sm" />
                <span>{locale === 'en' ? 'Visit Site' : locale === 'es' ? 'Visitar Sitio' : 'Visitar Site'}</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  // Cada capacidade aponta para o produto SAA que melhor a representa —
  // clicar abre o detalhe daquele projeto.
  const capabilities = [
    { label: 'AI', icon: <FaBrain />, projectId: 'venda' },
    { label: locale === 'en' ? 'Data' : 'Dados', icon: <FaDatabase />, projectId: 'venda' },
    { label: 'Web', icon: <FaCode />, projectId: 'rozenir' },
    { label: 'Game', icon: <FaGamepad />, projectId: 'tralingo' },
    { label: 'Marketing', icon: <FaBolt />, projectId: 'venda' },
    { label: locale === 'en' ? 'Learning' : locale === 'es' ? 'Aprendizaje' : 'Aprendizado', icon: <FaGrad />, projectId: 'tralingo' },
  ];

  const stats = [
    { value: String(saaProjects.length), label: locale === 'en' ? 'Products' : locale === 'es' ? 'Productos' : 'Produtos' },
    { value: '1', label: locale === 'en' ? 'Strategic partnership' : locale === 'es' ? 'Asociación estratégica' : 'Parceria estratégica' },
    { value: '3', label: locale === 'en' ? 'Markets served' : locale === 'es' ? 'Mercados atendidos' : 'Mercados atendidos' },
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-white dark:from-black via-[#EAF2FF] dark:via-[#050B1F] to-[#DCEEFF] dark:to-[#0E2A52] overflow-hidden">
      {/* Camada de cor por trás do vidro — e' o que da' o "liquid" ao glass */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <motion.div
          className="absolute -top-24 -left-24 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-600/25 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-cyan-400/25 to-blue-500/20 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-[30rem] h-[24rem] rounded-full bg-gradient-to-br from-blue-600/30 to-cyan-500/15 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -25, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <Navigation locale={locale as string} />

      <div className="container mx-auto px-4 sm:px-6 pt-24 pb-16 max-w-6xl relative z-10">
        {/* Masthead — liquid glass escuro, como o vidro da Apple */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-[32px] overflow-hidden mb-8 border border-black/10 dark:border-white/15 bg-white/40 dark:bg-white/[0.06] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_4px_24px_rgba(15,23,42,0.07)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/40 to-transparent" />
          <div className="p-6 sm:p-10 flex flex-col md:flex-row md:items-center gap-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/5 backdrop-blur-sm flex items-center justify-center p-3">
              <img
                src="/images/saa-logo.png"
                alt="SAA Logo"
                className="w-full h-full object-contain brightness-0 dark:invert"
              />
            </div>
            <div className="flex-1">
              <span className="text-[0.65rem] font-mono uppercase tracking-widest text-blue-700 dark:text-[#7CC5FF]">
                {locale === 'en' ? 'Company Overview' : locale === 'es' ? 'Perfil de la Empresa' : 'Perfil da Empresa'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1 mb-3 tracking-tight">
                SAA Company
              </h1>
              <p className="text-sm sm:text-base text-slate-700 dark:text-white/70 max-w-2xl">
                {locale === 'en'
                  ? 'SAA Company was created to deliver modern solutions for business challenges. The company specializes in AI, data engineering, web application development, and game development, focusing on innovative technological approaches for each project.'
                  : locale === 'es'
                  ? 'SAA Company fue creada para ofrecer soluciones modernas a desafíos empresariales. La empresa se especializa en IA, ingeniería de datos, desarrollo de aplicaciones web y desarrollo de juegos, con un enfoque en enfoques tecnológicos innovadores para cada proyecto.'
                  : 'A SAA Company foi criada para entregar soluções modernas para desafios empresariais. A empresa se especializa em IA, engenharia de dados, desenvolvimento de aplicações web e desenvolvimento de jogos, com foco em abordagens tecnológicas inovadoras para cada projeto.'}
              </p>
            </div>
          </div>

          {/* Faixa de indicadores */}
          <div className="grid grid-cols-3 border-t border-black/10 dark:border-white/10 divide-x divide-black/10 dark:divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="px-4 sm:px-8 py-4 text-center">
                <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">{s.value}</div>
                <div className="text-[0.65rem] sm:text-xs uppercase tracking-wide text-slate-500 dark:text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dock de linhas de atuação — capsula de vidro, estilo iOS 26 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-3 mb-10 overflow-x-auto pb-1"
        >
          <div className="flex items-center gap-1 sm:gap-2 rounded-full border border-black/10 dark:border-white/15 bg-white/40 dark:bg-white/[0.06] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_4px_16px_rgba(15,23,42,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.45)] px-2 py-2 shrink-0">
            {capabilities.map((c) => {
              const linkedProject = saaProjects.find(p => p.id === c.projectId);
              return (
                <button
                  key={c.label}
                  onClick={() => linkedProject && openProjectModal(linkedProject)}
                  aria-label={`${c.label}${linkedProject ? ` — ${linkedProject.name}` : ''}`}
                  title={linkedProject?.name}
                  className="flex flex-col items-center gap-1 px-3 sm:px-4 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <span className="text-base text-blue-600 dark:text-[#4FA8FF]">{c.icon}</span>
                  <span className="text-[0.65rem] text-slate-700 dark:text-white/80 whitespace-nowrap">{c.label}</span>
                </button>
              );
            })}
          </div>
          <a
            href="#parceria"
            aria-label={locale === 'en' ? 'Jump to partnership' : locale === 'es' ? 'Ir a la asociación' : 'Ir para parceria'}
            className="w-12 h-12 shrink-0 rounded-full border border-black/10 dark:border-white/15 bg-white/40 dark:bg-white/[0.06] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_4px_16px_rgba(15,23,42,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.45)] flex items-center justify-center text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <FaHandshake />
          </a>
        </motion.div>

        {/* Seção de Projetos */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {locale === 'en' ? 'Products' : locale === 'es' ? 'Productos' : 'Produtos'}
            </h2>
            <div className="h-px flex-1 bg-black/5 dark:bg-white/10" />
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-white/60 mb-8 max-w-2xl">
            {locale === 'en'
              ? 'Explore our commercial projects and solutions.'
              : locale === 'es'
              ? 'Explore nuestros proyectos y soluciones comerciales.'
              : 'Explore nossos projetos e soluções comerciais.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {saaProjects.map((project, index) => (
              <SAAProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* Seção de Parceria PneuJogos */}
        <section id="parceria" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {locale === 'en' ? 'Strategic Partnership' : locale === 'es' ? 'Asociación Estratégica' : 'Parceria Estratégica'}
            </h2>
            <div className="h-px flex-1 bg-black/5 dark:bg-white/10" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
            className="relative rounded-[32px] overflow-hidden border border-black/10 dark:border-white/15 bg-white/40 dark:bg-white/[0.06] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_4px_20px_rgba(15,23,42,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] p-6 sm:p-8"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/40 to-transparent" />
            <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/10 backdrop-blur-sm p-2 flex items-center justify-center">
                <img
                  src="/images/pneujogos-logo.jpeg"
                  alt="PneuJogos"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">PneuJogos</h3>
                  <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-mono uppercase tracking-wide text-blue-700 dark:text-[#7CC5FF] border border-blue-600/30 dark:border-[#4FA8FF]/30 px-2 py-1 rounded-full">
                    <FaHandshake className="text-[0.6rem]" />
                    {locale === 'en' ? 'Official Partner' : locale === 'es' ? 'Socio Oficial' : 'Parceiro Oficial'}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-700 dark:text-white/70 mb-4 leading-relaxed">
                  {locale === 'en'
                    ? 'PneuJogos (Pneu Studios) is SAA Company\'s game and gamification studio partner, focused on turning learning and engagement into playful experiences. Together, we built Tralingo, an AI-powered gamified training platform, combining SAA\'s AI and data engineering expertise with PneuJogos\' game design know-how.'
                    : locale === 'es'
                    ? 'PneuJogos (Pneu Studios) es el estudio de juegos y gamificación socio de SAA Company, enfocado en transformar el aprendizaje y el engagement en experiencias lúdicas. Juntos, desarrollamos Tralingo, una plataforma de entrenamiento gamificada con IA, uniendo la experiencia de SAA en IA e ingeniería de datos al know-how de game design de PneuJogos.'
                    : 'A PneuJogos (Pneu Studios) é a parceira de jogos e gamificação da SAA Company, focada em transformar aprendizado e engajamento em experiências lúdicas. Juntos, desenvolvemos o Tralingo, uma plataforma de treinamento gamificada com IA, unindo a expertise da SAA em IA e engenharia de dados ao know-how de game design da PneuJogos.'}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {['AI', 'Games', 'Gamification'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/5 text-slate-700 dark:text-white/70 rounded-full text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectModal project={selectedProject} />
        )}
      </AnimatePresence>
    </main>
  );
}