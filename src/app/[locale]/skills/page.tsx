'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { useParams } from 'next/navigation';
import { getTranslations } from '@/lib/getTranslations';
import {
  FaCode,
  FaDatabase,
  FaServer,
  FaShieldAlt,
  FaCubes,
  FaLaptopCode,
  FaBrain,
  FaTimes,
  FaBolt
} from 'react-icons/fa';
import { useState } from 'react';
import { getLocalizedSkillData, allSkills, getExperiencesForSkill, getProjectsForSkill } from '@/lib/skillsData';

const getSkillCategories = (locale: string) => ([
  { id: 'languages', nameKey: 'languages', icon: <FaCode />, descriptionKey: 'languages_description' },
  { id: 'data', nameKey: 'dataEngineering', icon: <FaDatabase />, descriptionKey: 'dataEngineering_description' },
  { id: 'ai', nameKey: 'artificialIntelligence', icon: <FaBrain />, descriptionKey: 'artificialIntelligence_description' },
  { id: 'databases', nameKey: 'databases', icon: <FaDatabase />, descriptionKey: 'databases_description' },
  { id: 'web', nameKey: 'webDev', icon: <FaServer />, descriptionKey: 'webDev_description' },
  { id: 'devops', nameKey: 'devops', icon: <FaLaptopCode />, descriptionKey: 'devops_description' },
  { id: 'architecture', nameKey: 'architecture', icon: <FaCubes />, descriptionKey: 'architecture_description' },
  { id: 'security', nameKey: 'security', icon: <FaShieldAlt />, descriptionKey: 'security_description' },
]);

// Ordem de exibição das skills dentro de cada categoria
const CATEGORY_SKILL_NAMES: Record<string, string[]> = {
  languages: ['PYTHON', 'PHP', 'TYPESCRIPT', 'GO', 'JAVASCRIPT'],
  data: ['DATA ENGINEERING', 'ETL', 'APACHE SPARK', 'APACHE AIRFLOW', 'APACHE HADOOP', 'APACHE NIFI', 'APACHE HIVE', 'DATA LAKES', 'WEB SCRAPING'],
  ai: ['MACHINE LEARNING', 'DEEP LEARNING', 'GAN', 'COMPUTER VISION', 'NLP'],
  databases: ['POSTGRESQL', 'MYSQL', 'MONGODB', 'REDIS', 'ELASTICSEARCH'],
  web: ['FASTAPI', 'REST APIS', 'GRAPHQL', 'MICROSERVICES', 'NODE.JS'],
  devops: ['DOCKER', 'KUBERNETES', 'AWS', 'CI/CD', 'JENKINS', 'PROMETHEUS', 'GRAFANA'],
  architecture: ['CLEAN ARCHITECTURE', 'PERFORMANCE', 'AGILE', 'TDD'],
  security: ['WEB SECURITY', 'PENETRATION TESTING', 'LINUX', 'SSRF', 'CRYPTOGRAPHY', 'API SECURITY', 'CYBERSECURITY'],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};

export default function Skills() {
  const params = useParams();
  const locale = params.locale as string;
  const t = getTranslations(locale);
  const [activeCategory, setActiveCategory] = useState('languages');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skillCategories = getSkillCategories(locale);
  const activeSkillCategory = skillCategories.find(cat => cat.id === activeCategory)!;

  const experiencesForSkill = selectedSkill ? getExperiencesForSkill(selectedSkill) : [];
  const projectsForSkill = selectedSkill ? getProjectsForSkill(selectedSkill) : [];

  const skillsInCategory = (CATEGORY_SKILL_NAMES[activeCategory] || [])
    .map(name => allSkills.includes(name) ? getLocalizedSkillData(name, locale) : null)
    .filter(Boolean) as ReturnType<typeof getLocalizedSkillData>[];

  const selectedSkillData = selectedSkill ? getLocalizedSkillData(selectedSkill, locale) : null;

  return (
    <div className="min-h-screen bg-[#F4EFE4] dark:bg-[#171316] halftone-dots">
      <Navigation locale={locale} />

      <section className="pt-24 pb-20 sm:pt-28">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Cabeçalho estilo capa de HQ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 sm:mb-14"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 -rotate-2 bg-[#E33D3D] text-white text-xs sm:text-sm font-black uppercase tracking-widest px-3 py-1.5 border-2 border-[#171316] dark:border-[#F5F1E8] comic-panel-sm">
                <FaBolt className="text-yellow-300" />
                {locale === 'en' ? 'Skill Dossier — Issue No. 01' : locale === 'es' ? 'Dossier de Habilidades — Número 01' : 'Dossiê de Habilidades — Nº 01'}
              </span>
            </div>
            <h1 className="font-black uppercase text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight text-[#171316] dark:text-[#F5F1E8]">
              {t.skills?.title || 'Minhas Habilidades'}
            </h1>
            <p className="mt-4 max-w-2xl border-2 border-[#171316] dark:border-[#F5F1E8] bg-white dark:bg-[#211c22] px-4 py-3 text-sm sm:text-base text-[#171316] dark:text-[#F5F1E8] comic-panel-sm">
              {t.skills?.subtitle || 'Tecnologias e ferramentas que utilizo para criar soluções eficientes'}
            </p>
          </motion.div>

          {/* Seletor de categorias — abas de gibi */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
            {skillCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 border-2 text-xs sm:text-sm font-bold uppercase tracking-wide transition-transform duration-150 ${
                    isActive
                      ? 'bg-[#171316] text-[#F5F1E8] border-[#171316] dark:bg-[#F5F1E8] dark:text-[#171316] dark:border-[#F5F1E8] -rotate-1 comic-panel-active'
                      : 'bg-white dark:bg-[#211c22] text-[#171316] dark:text-[#F5F1E8] border-[#171316]/70 dark:border-[#F5F1E8]/60 hover:-translate-y-0.5'
                  }`}
                >
                  <span className="text-base sm:text-lg">{category.icon}</span>
                  {t.skills?.[category.nameKey] || category.nameKey}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Painel "dossiê" da categoria */}
            <div className="md:col-span-1 bg-white dark:bg-[#211c22] border-2 border-[#171316] dark:border-[#F5F1E8] comic-panel p-5 sm:p-6 h-fit">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#171316] dark:border-[#F5F1E8] bg-[#F4EFE4] dark:bg-[#171316] flex items-center justify-center text-xl text-[#171316] dark:text-[#F5F1E8]">
                  {activeSkillCategory.icon}
                </div>
                <h2 className="text-lg sm:text-xl font-black uppercase text-[#171316] dark:text-[#F5F1E8]">
                  {t.skills?.[activeSkillCategory.nameKey] || activeSkillCategory.nameKey}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#171316]/80 dark:text-[#F5F1E8]/80 mb-6">
                {t.skills?.[activeSkillCategory.descriptionKey] || activeSkillCategory.descriptionKey}
              </p>

              <div className="border-t-2 border-dashed border-[#171316]/30 dark:border-[#F5F1E8]/30 pt-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-[#E33D3D]">{skillsInCategory.length}</span>
                  <span className="text-sm text-[#171316]/80 dark:text-[#F5F1E8]/80">
                    {locale === 'en'
                      ? 'technologies in this category'
                      : locale === 'es'
                      ? 'tecnologías en esta categoría'
                      : 'tecnologias nessa categoria'}
                  </span>
                </div>
              </div>
            </div>

            {/* Grade de skills — cartas colecionáveis */}
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 content-start"
            >
              {skillsInCategory.map((skillData) => (
                <motion.button
                  key={skillData.normalizedSkill}
                  variants={itemVariants}
                  aria-label={skillData.skill}
                  onClick={() => setSelectedSkill(skillData.normalizedSkill)}
                  className="text-left bg-white dark:bg-[#211c22] border-2 border-[#171316] dark:border-[#F5F1E8] comic-panel-sm p-4 hover:-translate-y-1 hover:translate-x-0.5 transition-transform duration-150"
                >
                  <span className="font-black uppercase text-sm sm:text-base text-[#171316] dark:text-[#F5F1E8] leading-tight block mb-3">
                    {skillData.skill}
                  </span>

                  <div className="flex items-center gap-3 font-mono text-[0.65rem] sm:text-xs text-[#171316]/70 dark:text-[#F5F1E8]/70 border-t-2 border-dashed border-[#171316]/20 dark:border-[#F5F1E8]/20 pt-2.5">
                    <span>{skillData.stats.yearsOfExperience}{locale === 'en' ? 'y' : 'a'}</span>
                    <span>·</span>
                    <span>{skillData.stats.projectCount} {locale === 'en' ? (skillData.stats.projectCount === 1 ? 'project' : 'projects') : (skillData.stats.projectCount === 1 ? 'projeto' : 'projetos')}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dossiê da skill selecionada */}
      <AnimatePresence>
        {selectedSkill && selectedSkillData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#171316]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#F4EFE4] dark:bg-[#211c22] border-2 border-[#171316] dark:border-[#F5F1E8] comic-panel max-w-2xl w-full max-h-[85vh] overflow-y-auto p-5 sm:p-8"
            >
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border-2 border-[#171316] dark:border-[#F5F1E8] text-[#171316] dark:text-[#F5F1E8] hover:bg-[#171316] hover:text-white dark:hover:bg-[#F5F1E8] dark:hover:text-[#171316] transition-colors"
                aria-label="Fechar"
              >
                <FaTimes />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#171316] dark:text-[#F5F1E8]">
                  {selectedSkillData.skill}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest mb-3 text-[#171316] dark:text-[#F5F1E8] border-b-2 border-[#171316] dark:border-[#F5F1E8] pb-1">
                    {t.skills?.experience || 'Experiência'}
                  </h4>
                  {experiencesForSkill.length > 0 ? experiencesForSkill.map((exp, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="font-bold text-[#171316] dark:text-[#F5F1E8]">{exp.company}</div>
                      <div className="text-sm text-[#171316]/70 dark:text-[#F5F1E8]/70">{exp.position}</div>
                      <div className="text-xs font-mono text-[#171316]/50 dark:text-[#F5F1E8]/50">{exp.period}</div>
                    </div>
                  )) : (
                    <p className="text-sm text-[#171316]/60 dark:text-[#F5F1E8]/60">—</p>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest mb-3 text-[#171316] dark:text-[#F5F1E8] border-b-2 border-[#171316] dark:border-[#F5F1E8] pb-1">
                    {t.skills?.projects || 'Projetos'}
                  </h4>
                  {projectsForSkill.length > 0 ? projectsForSkill.map((project, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="font-bold text-[#171316] dark:text-[#F5F1E8]">{project.name}</div>
                      <div className="text-sm text-[#171316]/70 dark:text-[#F5F1E8]/70">{project.description}</div>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-[#E33D3D] hover:underline mt-1 inline-block"
                      >
                        {t.skills?.viewProject || 'Ver Projeto'} →
                      </a>
                    </div>
                  )) : (
                    <p className="text-sm text-[#171316]/60 dark:text-[#F5F1E8]/60">—</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
