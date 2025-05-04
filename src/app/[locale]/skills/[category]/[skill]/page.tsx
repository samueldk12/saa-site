'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getTranslations } from '@/lib/getTranslations';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  FaBriefcase, 
  FaCode, 
  FaCertificate, 
  FaArrowLeft, 
  FaGithub, 
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaServer,
  FaDatabase,
  FaTerminal,
  FaNodeJs,
  FaAws,
  FaNetworkWired,
  FaChartLine
} from 'react-icons/fa';
import { SiPython, SiTypescript, SiGo, SiFastapi, SiApachespark, SiApacheairflow, SiDocker, SiGraphql, SiKubernetes, SiPrometheus, SiGrafana } from 'react-icons/si';
import { getLocalizedSkillData } from '@/lib/skillsData';
import SkillBadge from '@/components/SkillBadge';
import { Project } from '@/lib/calculateProficiency';

// Mapear habilidades para ícones
const skillIcons: Record<string, JSX.Element> = {
  'PYTHON': <SiPython className="text-2xl" />,
  'TYPESCRIPT': <SiTypescript className="text-2xl" />,
  'GO': <SiGo className="text-2xl" />,
  'NODE.JS': <FaNodeJs className="text-2xl" />,
  'FASTAPI': <SiFastapi className="text-2xl" />,
  'APACHE SPARK': <SiApachespark className="text-2xl" />,
  'APACHE AIRFLOW': <SiApacheairflow className="text-2xl" />,
  'DOCKER': <SiDocker className="text-2xl" />,
  'REST APIS': <FaServer className="text-2xl" />,
  'GRAPHQL': <SiGraphql className="text-2xl" />,
  'AWS': <FaAws className="text-2xl" />,
  'KUBERNETES': <SiKubernetes className="text-2xl" />,
  'PROMETHEUS': <SiPrometheus className="text-2xl" />,
  'GRAFANA': <SiGrafana className="text-2xl" />,
  'DATA ENGINEERING': <FaDatabase className="text-2xl" />,
  'ETL': <FaDatabase className="text-2xl" />,
  'MICROSERVICES': <FaNetworkWired className="text-2xl" />,
  'WEB SCRAPING': <FaCode className="text-2xl" />,
  'MACHINE LEARNING': <FaChartLine className="text-2xl" />,
  'default': <FaCode className="text-2xl" />
};

export default function SkillDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const category = params.category as string;
  const skillSlug = params.skill as string;
  const t = getTranslations(locale);
  
  // Decodificar o slug da habilidade
  const decodedSkill = decodeURIComponent(skillSlug).replace(/-/g, ' ');
  
  // Buscar dados relacionados à habilidade usando o novo sistema
  const [skillData, setSkillData] = useState<any>(null);
  
  useEffect(() => {
    const skillInfo = getLocalizedSkillData(decodedSkill, locale);
    setSkillData(skillInfo);
  }, [decodedSkill, locale]);
  
  // Se ainda não temos os dados, mostra um indicador de carregamento
  if (!skillData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Extrai os dados
  const { skill, score, level, projects, experiences, certifications } = skillData;
  
  // Verificar se temos dados para mostrar
  const hasData = projects.length > 0 || experiences.length > 0 || certifications.length > 0;
  
  // Escolher ícone apropriado para a habilidade
  const skillIcon = skillIcons[skill] || skillIcons.default;
  
  // Mapear categoria para cor
  const categoryColorMap: Record<string, string> = {
    'languages': 'blue',
    'data': 'purple',
    'databases': 'green',
    'web': 'indigo',
    'devops': 'red',
    'architecture': 'orange',
    'security': 'gray'
  };
  
  const categoryColor = categoryColorMap[category] || 'blue';
  
  // Definir as cores com base no nível de proficiência
  const levelColorMap: Record<string, string> = {
    'expert': 'blue',
    'advanced': 'green',
    'intermediate': 'yellow',
    'beginner': 'gray'
  };
  
  const proficiencyColor = levelColorMap[level] || 'gray';
  
  // Tradução do nível de proficiência
  const levelTranslationKey = level as keyof typeof t.skills;
  const levelTranslation = t.skills?.[levelTranslationKey] || level;
  
  // Função auxiliar para obter a explicação do nível
  function getLevelExplanation(level: string) {
    switch (level) {
      case 'expert':
        return 'Este é um nível de conhecimento avançado, aplicado em projetos complexos. Inclui um profundo entendimento dos fundamentos e capacidade de implementar soluções sofisticadas. O uso desta tecnologia é frequente e contínuo em projetos profissionais.';
      case 'advanced':
        return 'Representa uma experiência sólida adquirida através de vários projetos reais. Inclui conhecimento de funcionalidades avançadas e boas práticas de implementação. Aplicação da tecnologia em situações diversas, resolvendo problemas complexos com eficiência.';
      case 'intermediate':
        return 'Reflete um conhecimento prático aplicado em projetos. Inclui familiaridade com recursos intermediários e capacidade de desenvolver soluções funcionais. Experiência com casos de uso comuns e resolução de problemas típicos.';
      case 'beginner':
      default:
        return 'Indica um conhecimento básico dos conceitos e aplicações fundamentais. Inclui compreensão dos princípios básicos e capacidade de usar a tecnologia em casos simples. Familiar com a tecnologia mas com experiência prática limitada.';
    }
  }
  
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navigation locale={locale} />
      
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Navegação de retorno */}
          <div className="mb-8">
            <Link 
              href={`/${locale}/skills`}
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              <span>{t.skills?.title || "Minhas Habilidades"}</span>
            </Link>
          </div>
          
          {/* Cabeçalho da habilidade */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center">
                <div className={`p-4 rounded-full bg-${categoryColor}-100 dark:bg-${categoryColor}-900/30 mr-6`}>
                  {skillIcon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{skill}</h1>
                  <p className="text-gray-500 dark:text-gray-400">{t.skills?.detailSubtitle || "Projetos, experiências e certificações relacionados"}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="flex items-center mb-2">
                  <div className={`w-4 h-4 rounded-full bg-${proficiencyColor}-500 mr-2`}></div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{levelTranslation}</span>
                </div>
                
                <div className="bg-gray-200 dark:bg-gray-700 w-48 h-3 rounded-full overflow-hidden">
                  <div 
                    className={`bg-${proficiencyColor}-500 h-full rounded-full`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
                
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{score}/100</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                {t.skills?.[level] || levelTranslation}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {getLevelExplanation(level)}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{t.skills?.experience || "Experiência"}</h4>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{skillData.stats.yearsOfExperience} {t.skills?.yearsExperience || "anos"}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{experiences.length} {experiences.length === 1 ? "empresa" : "empresas"}</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{t.skills?.projects || "Projetos"}</h4>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{skillData.stats.projectCount}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t.skills?.relatedProjects || "Projetos relacionados"}</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{t.skills?.certifications || "Certificações"}</h4>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{skillData.stats.certificationCount}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t.skills?.relatedCertifications || "Certificações relacionadas"}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {hasData ? (
            <>
              {/* Projetos Relacionados */}
              {projects.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <FaCode className={`mr-3 text-${categoryColor}-600 dark:text-${categoryColor}-400`} />
                    <span className="text-gray-900 dark:text-white">{t.skills?.relatedProjects || "Projetos Relacionados"}</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project: Project, index) => (
                      <motion.div 
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                        
                        {/* Habilidades do projeto */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.skills.map((projectSkill, i) => (
                            <SkillBadge 
                              key={i} 
                              skill={projectSkill.toUpperCase()}
                              level={projectSkill.toLowerCase() === skill.toLowerCase() ? level : undefined}
                            >
                              {projectSkill}
                            </SkillBadge>
                          ))}
                        </div>
                        
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`inline-flex items-center text-${categoryColor}-600 dark:text-${categoryColor}-400 hover:text-${categoryColor}-700 dark:hover:text-${categoryColor}-300 transition-colors`}
                        >
                          <FaGithub className="mr-2" />
                          <span>{t.skills?.viewProject || "Ver Projeto"}</span>
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Experiências Relacionadas */}
              {experiences.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <FaBriefcase className={`mr-3 text-${categoryColor}-600 dark:text-${categoryColor}-400`} />
                    <span className="text-gray-900 dark:text-white">{t.skills?.relatedExperiences || "Experiências Relacionadas"}</span>
                  </h2>
                  
                  <div className="space-y-6">
                    {experiences.map((experience, index) => (
                      <motion.div 
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{experience.position} - {experience.company}</h3>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <FaCalendarAlt className="mr-2" />
                            <span>{experience.period}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{experience.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Certificações Relacionadas */}
              {certifications.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <FaCertificate className={`mr-3 text-${categoryColor}-600 dark:text-${categoryColor}-400`} />
                    <span className="text-gray-900 dark:text-white">{t.skills?.relatedCertifications || "Certificações Relacionadas"}</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certifications.map((certification, index) => (
                      <motion.div 
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{certification.name}</h3>
                          <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-gray-600 dark:text-gray-300 text-sm">
                            {certification.year}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{certification.issuer}</p>
                        
                        {certification.certificate_url && certification.certificate_url !== "#" && (
                          <a 
                            href={certification.certificate_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`inline-flex items-center text-${categoryColor}-600 dark:text-${categoryColor}-400 hover:text-${categoryColor}-700 dark:hover:text-${categoryColor}-300 transition-colors`}
                          >
                            <FaExternalLinkAlt className="mr-2" />
                            <span>{t.skills?.viewCertificate || "Ver Certificado"}</span>
                          </a>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-gray-500 dark:text-gray-400 mb-2">
                {t.skills?.noRelatedContent || "Não há informações específicas disponíveis para esta habilidade."}
              </div>
              <div className="text-gray-400 dark:text-gray-500 text-sm">
                {t.skills?.checkBackLater || "Confira mais tarde para atualizações."}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
} 