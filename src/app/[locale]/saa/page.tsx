'use client';

import { getTranslations } from '@/lib/getTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { FaGlobe, FaBuilding, FaInfoCircle, FaExternalLinkAlt, FaHandshake } from 'react-icons/fa';
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
      id: 'paipeline',
      name: 'Paipeline',
      description: locale === 'en' 
        ? 'AI platform that transforms how companies use artificial intelligence by centralizing the process in a unified, visual, and intelligent flow. It automatically selects the best AI for each step, focusing on efficiency, quality, and cost-effectiveness.' 
        : locale === 'es'
        ? 'Plataforma de IA que transforma cómo las empresas utilizan la inteligencia artificial, centralizando el proceso en un flujo unificado, visual e inteligente. Selecciona automáticamente la mejor IA para cada etapa, con foco en eficiencia, calidad y costo-beneficio.'
        : 'Plataforma de IA que transforma como empresas utilizam inteligência artificial, centralizando o processo em um fluxo unificado, visual e inteligente. Seleciona automaticamente a melhor IA para cada etapa, com foco em eficiência, qualidade e custo-benefício.',
      fullDescription: locale === 'en'
        ? 'pAIpeline is a Wersam project born with the mission to transform how companies use artificial intelligence, making its application as accessible and strategic as any other essential resource. The platform solves the challenge of dealing with multiple AI tools, complex interfaces, and unpredictable results by centralizing the entire process in a unified, visual, and intelligent flow. Its goal is to allow data—whether documents, images, or any other format—to go through customized pipelines that automatically choose the best AI for each step, always focusing on efficiency, quality of results, and cost-effectiveness. By treating AI as a commodity, pAIpeline enables companies of any size to leverage the full potential of their data with predictability, control, and scalability.'
        : locale === 'es'
        ? 'pAIpeline es un proyecto de Wersam que nace con la misión de transformar la forma en que las empresas utilizan la inteligencia artificial, haciendo que su aplicación sea tan accesible y estratégica como cualquier otro recurso esencial. La plataforma resuelve el desafío de lidiar con múltiples herramientas de IA, interfaces complejas y resultados impredecibles al centralizar todo el proceso en un flujo unificado, visual e inteligente. Su objetivo es permitir que los datos, ya sean documentos, imágenes o cualquier otro formato, pasen por pipelines personalizados que eligen automáticamente la mejor IA para cada etapa, siempre con foco en eficiencia, calidad de resultados y costo-beneficio. Al tratar la IA como un commodity, pAIpeline permite que empresas de cualquier tamaño aprovechen todo el potencial de sus datos con previsibilidad, control y escalabilidad.'
        : 'O pAIpeline é um projeto da Wersam que nasce com a missão de transformar a forma como empresas utilizam inteligência artificial, tornando sua aplicação tão acessível e estratégica quanto qualquer outro recurso essencial. A plataforma resolve o desafio de lidar com múltiplas ferramentas de IA, interfaces complexas e resultados imprevisíveis ao centralizar todo o processo em um fluxo unificado, visual e inteligente. Seu objetivo é permitir que dados — sejam documentos, imagens ou qualquer outro formato — passem por pipelines personalizados que escolhem automaticamente a melhor IA para cada etapa, sempre com foco em eficiência, qualidade dos resultados e custo-benefício. Ao tratar a IA como uma comodity, o pAIpeline permite que empresas de qualquer porte aproveitem todo o potencial dos dados com previsibilidade, controle e escalabilidade.',
      url: 'https://www.paipeline.com.br/',
      icon: <img src="/images/pipeline-logo.png" alt="Paipeline" className="w-8 h-8" />,
      color: 'emerald',
      gradient: 'from-emerald-400 to-teal-600',
      bgLight: 'bg-emerald-50/80',
      bgDark: 'bg-emerald-900/20',
      technologies: ['AI', 'Data Pipeline', 'Automation'],
      partnership: 'WerSam (Samuel + Weverton Miranda)',
      image: '/images/pipeline-logo.png',
      partnerIcon: <img src="/images/wersam-logo.png" alt="WerSam" className="w-6 h-6" />,
      showPartnerTag: true,
    },
    {
      id: 'altpaiper',
      name: 'Alt-Paiper',
      description: locale === 'en'
        ? 'AI-assisted document creation platform that offers multiple levels of assistance, from blank templates to complete documents. Ideal for academic, legal or technical writing.' 
        : locale === 'es'
        ? 'Plataforma de creación de documentos con IA que ofrece múltiples niveles de asistencia, desde plantillas en blanco hasta documentos completos. Ideal para redacción académica, jurídica o técnica.'
        : 'Plataforma de criação de documentos com IA que oferece múltiplos níveis de assistência, desde templates em branco até documentos completos. Ideal para redação acadêmica, jurídica ou técnica.',
      fullDescription: locale === 'en'
        ? 'Alt-Paiper is a document creation and editing platform powered by artificial intelligence. It offers different levels of assistance to help users create their documents - from blank documents with formatting guidelines, to AI-generated roadmaps for studies, to complete document generation based on a given topic. The platform is designed to assist in academic, legal, and technical writing, allowing users to choose the level of AI assistance they need for each project.' 
        : locale === 'es'
        ? 'Alt-Paiper es una plataforma de creación y edición de documentos asistida por inteligencia artificial. Ofrece diferentes niveles de asistencia para ayudar a los usuarios a crear sus documentos - desde documentos en blanco con normas de formato, pasando por hojas de ruta de estudios generadas por IA, hasta la generación completa de documentos basados en un tema proporcionado. La plataforma está diseñada para ayudar en la redacción académica, jurídica y técnica, permitiendo a los usuarios elegir el nivel de asistencia de IA que necesitan para cada proyecto.'
        : 'Alt-Paiper é uma plataforma de criação e edição de documentos assistida por inteligência artificial. Ela oferece diferentes níveis de assistência para ajudar os usuários a criar seus documentos - desde documentos em branco com normas de formatação, passando por roadmaps de estudos gerados por IA, até a geração completa de documentos com base em um tema fornecido. A plataforma é projetada para auxiliar na redação acadêmica, jurídica e técnica, permitindo que os usuários escolham o nível de assistência de IA que precisam para cada projeto.',
      url: 'https://paiper-brown.vercel.app/',
      icon: <img src="/images/altpaiper-logo.png" alt="Alt-Paiper" className="w-8 h-8" />,
      color: 'amber',
      gradient: 'from-amber-400 to-orange-600',
      bgLight: 'bg-amber-50/80',
      bgDark: 'bg-amber-900/20',
      technologies: ['AI', 'Document Generation', 'Academic Writing'],
      image: '/images/altpaiper-logo.png'
    },
    {
      id: 'ondetrabalho',
      name: 'Onde Trabalho',
      description: locale === 'en'
        ? 'Anonymous forum for people to discuss their work environment, debate the future of work, and report workplace harassment.' 
        : locale === 'es'
        ? 'Foro anónimo para que las personas hablen sobre su ambiente de trabajo, debatan sobre el futuro del trabajo y reporten acoso laboral.'
        : 'Fórum para pessoas falarem sobre o ambiente de trabalho, o que fazem, debaterem sobre o futuro do trabalho, reportarem sobre assédios e afins, tudo de forma anônima.',
      url: 'https://ondetrabalho.com.br/',
      icon: <img src="/images/ondetrabalho-logo.png" alt="Onde Trabalho" className="w-8 h-8" />,
      color: 'blue',
      gradient: 'from-blue-400 to-indigo-600',
      bgLight: 'bg-blue-50/80',
      bgDark: 'bg-blue-900/20',
      technologies: ['Forum', 'Community', 'Workplace'],
      image: '/images/ondetrabalho-logo.png'
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

  // Função para obter cores para as tags de tecnologias
  const getTechColor = (tech: string): { bg: string, bgDark: string, text: string, textDark: string } => {
    const normalizedTech = tech.toLowerCase();
    const techColors: Record<string, { bg: string, bgDark: string, text: string, textDark: string }> = {
      'ai': { bg: 'bg-purple-100', bgDark: 'bg-purple-900/30', text: 'text-purple-800', textDark: 'text-purple-300' },
      'data': { bg: 'bg-blue-100', bgDark: 'bg-blue-900/30', text: 'text-blue-800', textDark: 'text-blue-300' },
      'pipeline': { bg: 'bg-teal-100', bgDark: 'bg-teal-900/30', text: 'text-teal-800', textDark: 'text-teal-300' },
      'web': { bg: 'bg-indigo-100', bgDark: 'bg-indigo-900/30', text: 'text-indigo-800', textDark: 'text-indigo-300' },
      'automation': { bg: 'bg-green-100', bgDark: 'bg-green-900/30', text: 'text-green-800', textDark: 'text-green-300' },
      'collaboration': { bg: 'bg-blue-100', bgDark: 'bg-blue-900/30', text: 'text-blue-800', textDark: 'text-blue-300' },
      'forum': { bg: 'bg-blue-100', bgDark: 'bg-blue-900/30', text: 'text-blue-800', textDark: 'text-blue-300' },
      'community': { bg: 'bg-emerald-100', bgDark: 'bg-emerald-900/30', text: 'text-emerald-800', textDark: 'text-emerald-300' },
      'document': { bg: 'bg-amber-100', bgDark: 'bg-amber-900/30', text: 'text-amber-800', textDark: 'text-amber-300' },
      'default': { bg: 'bg-gray-100', bgDark: 'bg-gray-800/50', text: 'text-gray-800', textDark: 'text-gray-300' }
    };

    // Tentativa de correspondência para cada tecnologia
    for (const [key, value] of Object.entries(techColors)) {
      if (normalizedTech.includes(key)) {
        return value;
      }
    }

    return techColors.default;
  };

  // Componente de cartão de projetos comerciais
  const SAAProjectCard = ({ project, index }: { project: any; index: number }) => (
    <motion.div
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
      
      <div className="p-4 sm:p-6 flex-1 relative z-10">
        <div 
          className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0 ${project.bgLight} dark:${project.bgDark}`}
          style={{ 
            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
          }}
        />
        
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <motion.div 
            className={`p-2 sm:p-3 rounded-full ${project.bgLight} dark:${project.bgDark} text-${project.color}-600 dark:text-${project.color}-400 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center relative`}
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {project.icon}
            {project.showPartnerTag && (
              <div className="absolute -bottom-1 -right-1 bg-teal-500 dark:bg-teal-600 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center border-2 border-white dark:border-gray-800">
                <FaHandshake className="text-white text-[0.5rem] sm:text-xs" />
              </div>
            )}
          </motion.div>
          <div className="flex space-x-2">
            <motion.button
              onClick={() => openProjectModal(project)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Ver detalhes"
            >
              <FaInfoCircle className="text-base sm:text-xl" />
            </motion.button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <motion.h2 
            className="text-base sm:text-xl font-bold text-gray-800 dark:text-white"
            whileHover={{ color: `var(--color-${project.color}-600)` }}
          >
            {project.name}
          </motion.h2>
          {project.showPartnerTag ? (
            <div className="flex items-center text-[0.65rem] sm:text-xs text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
              <span>WerSam</span>
            </div>
          ) : project.partnerIcon && (
            <div className="flex items-center text-[0.65rem] sm:text-xs text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
              <div className="w-3 h-3 sm:w-4 sm:h-4 mr-1">
                {project.partnerIcon}
              </div>
              <span>WerSam</span>
            </div>
          )}
        </div>
        
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {project.technologies.map((tech: string) => {
            const techColor = getTechColor(tech);
            return (
              <motion.span 
                key={`${project.id}-${tech}`} 
                className={`px-2 py-0.5 sm:px-3 sm:py-1 ${techColor.bg} dark:${techColor.bgDark} ${techColor.text} dark:${techColor.textDark} rounded-full text-[0.65rem] sm:text-xs font-medium`}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {tech}
              </motion.span>
            );
          })}
        </div>
      </div>
          
      <div className="p-3 sm:p-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-[0.65rem] sm:text-xs">
          <FaBuilding className="mr-1 text-[0.5rem] sm:text-xs" />
          {t.projects?.commercial || 'Comercial'}
        </div>
        
        <div className="flex space-x-1 sm:space-x-2">
          {project.url && project.url !== '#' && (
            <motion.a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-2 py-1 sm:px-3 sm:py-1 bg-${project.color}-600 hover:bg-${project.color}-700 text-white rounded flex items-center gap-1 text-[0.65rem] sm:text-xs transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Visitar site"
            >
              <FaGlobe className="text-[0.5rem] sm:text-xs" />
              <span>{locale === 'en' ? 'Visit site' : locale === 'es' ? 'Visitar sitio' : 'Visitar site'}</span>
            </motion.a>
          )}
          
          <motion.button
            onClick={() => openProjectModal(project)}
            className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded flex items-center gap-1 text-[0.65rem] sm:text-xs transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaInfoCircle className="text-[0.5rem] sm:text-xs" />
            <span>{locale === 'en' ? 'Details' : locale === 'es' ? 'Detalles' : 'Detalhes'}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const ProjectModal = ({ project }: { project: any }) => {
    return (
      <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`h-1.5 sm:h-2 bg-gradient-to-r ${project.gradient}`}></div>
          
          <div className="p-4 sm:p-6 md:p-8 overflow-y-auto">
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <div className="flex items-start">
                <motion.div 
                  className={`p-3 sm:p-4 rounded-full ${project.bgLight} dark:${project.bgDark} text-${project.color}-600 dark:text-${project.color}-400 mr-3 sm:mr-4 flex items-center justify-center relative`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {project.icon}
                  {project.showPartnerTag && (
                    <div className="absolute -bottom-1 -right-1 bg-teal-500 dark:bg-teal-600 rounded-full w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center border-2 border-white dark:border-gray-800">
                      <FaHandshake className="text-[0.5rem] sm:text-xs text-white" />
                    </div>
                  )}
                </motion.div>
                <div>
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex flex-wrap items-center gap-2">
                    {project.name}
                    {project.showPartnerTag && (
                      <div className="flex items-center text-xs sm:text-sm text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 sm:px-2 sm:py-1 rounded-full">
                        <span>WerSam</span>
                      </div>
                    )}
                  </h2>
                  <div className="mt-1 sm:mt-2 flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    <FaBuilding className="mr-1" />
                    <span>{t.projects?.commercial || 'Projeto Comercial'}</span>
                    {project.partnerIcon && !project.showPartnerTag && (
                      <div className="flex items-center ml-2 text-xs sm:text-sm text-teal-600 dark:text-teal-400">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 mr-1">
                          {project.partnerIcon}
                        </div>
                        <span className="font-medium">WerSam Project</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <motion.button 
                onClick={closeProjectModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
                aria-label="Fechar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            <div className="mb-6 sm:mb-8 flex flex-col items-center">
              <motion.div 
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 mb-4 sm:mb-6 relative p-1.5 sm:p-2 rounded-lg bg-white shadow-md"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-contain"
                />
              </motion.div>
              
              <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800 dark:text-white">{t.projects?.description || 'Descrição'}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 text-center max-w-2xl">
                {project.fullDescription || project.description}
              </p>
              
              {project.partnership && (
                <div className="mt-3 sm:mt-4 bg-teal-50 dark:bg-teal-900/20 p-2 sm:p-3 rounded-lg w-full flex items-center">
                  {project.partnerIcon && !project.showPartnerTag && (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex-shrink-0">
                      {project.partnerIcon}
                    </div>
                  )}
                  <p className="text-teal-800 dark:text-teal-300 text-xs sm:text-sm">
                    <span className="font-medium">{t.projects?.partnership || (locale === 'en' ? 'Partnership' : locale === 'es' ? 'Asociación' : 'Parceria')}:</span> {project.partnership}
                  </p>
                </div>
              )}
            </div>
              
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800 dark:text-white">{t.projects?.technologies || 'Tecnologias'}</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                {project.technologies.map((tech: string) => {
                  const techColor = getTechColor(tech);
                  return (
                    <motion.span 
                      key={`modal-${project.id}-${tech}`}
                      className={`px-2 py-0.5 sm:px-3 sm:py-1.5 ${techColor.bg} dark:${techColor.bgDark} ${techColor.text} dark:${techColor.textDark} rounded-full text-xs sm:text-sm font-medium`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </div>
            
          <div className="p-3 sm:p-4 md:p-6 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 sm:gap-3 justify-end">
            <motion.button
              onClick={closeProjectModal}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors text-xs sm:text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {locale === 'en' ? 'Close' : locale === 'es' ? 'Cerrar' : 'Fechar'}
            </motion.button>
            
            {project.url && project.url !== '#' && (
              <motion.a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`px-3 py-1.5 sm:px-4 sm:py-2 bg-${project.color}-600 hover:bg-${project.color}-700 text-white rounded-lg flex items-center gap-1 sm:gap-2 transition-colors text-xs sm:text-sm`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGlobe className="text-xs sm:text-sm" /> 
                <span>{locale === 'en' ? 'Visit Site' : locale === 'es' ? 'Visitar Sitio' : 'Visitar Site'}</span>
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-600 via-blue-700 to-purple-800 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      <Navigation locale={locale as string} />
      
      <div className="container mx-auto px-3 sm:px-4 pt-16 sm:pt-20 pb-12 sm:pb-16">
        {/* Layout mais compacto e horizontal */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12 sm:mb-16">
          {/* Logo em tamanho reduzido */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center lg:justify-start lg:w-1/3"
          >
            <motion.div 
              className="w-40 h-40 sm:w-48 sm:h-48 lg:w-72 lg:h-72 flex items-center justify-center bg-gradient-to-br from-indigo-400 via-blue-500 to-purple-600 dark:from-indigo-900 dark:via-blue-800 dark:to-purple-900 rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] dark:shadow-[0_20px_50px_rgba(79,_70,_229,_0.4)]"
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              whileHover={{ scale: 1.05, boxShadow: "0 25px 60px rgba(8, 112, 184, 0.9)", transition: { duration: 0.3 } }}
            >
              <img 
                src="/images/saa-logo.png" 
                alt="SAA Logo" 
                className="w-full h-full object-contain dark:brightness-100 dark:contrast-125 filter drop-shadow-lg"
              />
            </motion.div>
          </motion.div>

          {/* Informações sobre SAA e cards de tecnologia */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-2/3"
          >
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-lg border border-white/20 dark:border-gray-700/30">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white dark:text-white">
                {locale === 'en' ? 'SAA Company' : locale === 'es' ? 'SAA Company' : 'SAA Company'}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-100 dark:text-gray-300 mb-4 sm:mb-6">
                {locale === 'en'
                  ? 'SAA Company was created to deliver modern solutions for business challenges. The company specializes in AI, data engineering, web application development, and game development, focusing on innovative technological approaches for each project.'
                  : locale === 'es'
                  ? 'SAA Company fue creada para ofrecer soluciones modernas a desafíos empresariales. La empresa se especializa en IA, ingeniería de datos, desarrollo de aplicaciones web y desarrollo de juegos, con un enfoque en enfoques tecnológicos innovadores para cada proyecto.'
                  : 'A SAA Company foi criada para entregar soluções modernas para desafios empresariais. A empresa se especializa em IA, engenharia de dados, desenvolvimento de aplicações web e desenvolvimento de jogos, com foco em abordagens tecnológicas inovadoras para cada projeto.'}
              </p>
              
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-start">
                <motion.span 
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500/20 dark:bg-purple-900/30 text-purple-100 dark:text-purple-300 rounded-lg text-xs sm:text-sm font-medium backdrop-blur-sm border border-purple-400/30 dark:border-purple-700/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="flex items-center gap-1 sm:gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                    </svg>
                    AI
                  </span>
                </motion.span>
                <motion.span 
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/20 dark:bg-blue-900/30 text-blue-100 dark:text-blue-300 rounded-lg text-xs sm:text-sm font-medium backdrop-blur-sm border border-blue-400/30 dark:border-blue-700/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="flex items-center gap-1 sm:gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                    </svg>
                    Data
                  </span>
                </motion.span>
                <motion.span 
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-500/20 dark:bg-indigo-900/30 text-indigo-100 dark:text-indigo-300 rounded-lg text-xs sm:text-sm font-medium backdrop-blur-sm border border-indigo-400/30 dark:border-indigo-700/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="flex items-center gap-1 sm:gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    Web
                  </span>
                </motion.span>
                <motion.span 
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-500/20 dark:bg-green-900/30 text-green-100 dark:text-green-300 rounded-lg text-xs sm:text-sm font-medium backdrop-blur-sm border border-green-400/30 dark:border-green-700/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="flex items-center gap-1 sm:gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                    </svg>
                    Game
                  </span>
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Seções reorganizadas: Projetos primeiro, depois Parceria */}
        {/* Seção de Projetos */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mb-6 sm:mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
              {locale === 'en' ? 'Projects' : locale === 'es' ? 'Proyectos' : 'Projetos'}
            </h2>
            <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto">
              {locale === 'en'
                ? 'Explore our commercial projects and solutions.' 
                : locale === 'es'
                ? 'Explore nuestros proyectos y soluciones comerciales.'
                : 'Explore nossos projetos e soluções comerciais.'}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {saaProjects.map((project, index) => (
              <SAAProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.section>
        
        {/* Seção de Parceria WerSam */}
        <motion.section 
          className="mb-12 sm:mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-6 sm:mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-green-300 dark:from-teal-400 dark:to-green-400 mb-2 sm:mb-4">
              {locale === 'en' ? 'Partnership' : locale === 'es' ? 'Asociación' : 'Parceria'}
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8">
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-teal-50 dark:bg-teal-900/20 p-3 sm:p-4 flex items-center justify-center shrink-0">
                <img 
                  src="/images/wersam-logo.png" 
                  alt="WerSam" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 mb-3 sm:mb-4 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">WerSam</h3>
                  <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1">
                    <FaHandshake className="text-xs" />
                    {locale === 'en' ? 'Partnership' : locale === 'es' ? 'Asociación' : 'Parceria'}
                  </span>
                </div>
                
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 text-center sm:text-left">
                  {locale === 'en'
                    ? 'WerSam is a collaborative partnership between Samuel and Weverton Miranda, focused on AI and pipeline solutions. Together, we combine our expertise to deliver cutting-edge technology solutions.'
                    : locale === 'es'
                    ? 'WerSam es una asociación colaborativa entre Samuel y Weverton Miranda, enfocada en soluciones de IA y pipelines. Juntos, combinamos nuestra experiencia para ofrecer soluciones tecnológicas de vanguardia.'
                    : 'WerSam é uma parceria colaborativa entre Samuel e Weverton Miranda, focada em soluções de IA e pipelines. Juntos, combinamos nossa expertise para entregar soluções tecnológicas de ponta.'}
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="px-2 py-1 sm:px-3 sm:py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">AI</span>
                  <span className="px-2 py-1 sm:px-3 sm:py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full text-xs font-medium">Data Pipeline</span>
                  <span className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">Collaboration</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
      
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectModal project={selectedProject} />
        )}
      </AnimatePresence>
    </main>
  );
} 