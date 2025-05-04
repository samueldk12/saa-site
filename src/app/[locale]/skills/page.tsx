'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { useParams, useRouter } from 'next/navigation';
import { getTranslations } from '@/lib/getTranslations';
import Link from 'next/link';
import {
  FaCode,
  FaDatabase,
  FaServer,
  FaShieldAlt,
  FaCubes,
  FaLaptopCode,
  FaPython,
  FaPhp,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaGithub,
  FaChartLine,
  FaSyncAlt,
  FaLock,
  FaArrowUp,
  FaNetworkWired,
  FaBrain,
  FaTimes
} from 'react-icons/fa';
import {
  SiApachespark,
  SiApacheairflow,
  SiElasticsearch,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiTypescript,
  SiFastapi,
  SiGo,
  SiKubernetes,
  SiGraphql,
  SiJenkins,
  SiPrometheus,
  SiGrafana,
  SiDocker
} from 'react-icons/si';
import { useState } from 'react';
import SkillBadge from '@/components/SkillBadge';
import { getLocalizedSkillData, allSkills, workExperienceFromAbout, getExperiencesForSkill, getProjectsForSkill } from '@/lib/skillsData';
import { translateSkill } from '@/lib/translateSkill';

const getSkillCategories = (locale: string) => ([
  {
    id: 'languages',
    nameKey: 'languages',
    icon: <FaCode className="text-4xl text-blue-600" />,
    descriptionKey: 'languages_description',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    skills: [
      { name: "PYTHON", icon: <FaPython /> },
      { name: "PHP", icon: <FaPhp /> },
      { name: "NODE.JS", icon: <FaNodeJs /> },
      { name: "TYPESCRIPT", icon: <SiTypescript /> },
      { name: "GO", icon: <SiGo /> }
    ]
  },
  {
    id: 'data',
    nameKey: 'dataEngineering',
    icon: <FaDatabase className="text-4xl text-purple-600" />,
    descriptionKey: 'dataEngineering_description',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600',
    skills: [
      { name: "ETL", icon: <FaDatabase /> },
      { name: "APACHE SPARK", icon: <SiApachespark /> },
      { name: "APACHE AIRFLOW", icon: <SiApacheairflow /> },
      { name: "APACHE HADOOP", icon: <FaDatabase /> },
      { name: "APACHE NIFI", icon: <FaDatabase /> },
      { name: "APACHE HIVE", icon: <FaDatabase /> },
      { name: "DATA LAKES", icon: <FaDatabase /> },
      { name: "WEB SCRAPING", icon: <FaCode /> },
      { name: "DATA ENGINEERING", icon: <FaDatabase /> }
    ]
  },
  {
    id: 'ai',
    nameKey: 'artificialIntelligence',
    icon: <FaBrain className="text-4xl text-emerald-600" />,
    descriptionKey: 'artificialIntelligence_description',
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-600',
    skills: [
      { name: "MACHINE LEARNING", icon: <FaBrain /> },
      { name: "DEEP LEARNING", icon: <FaBrain /> },
      { name: "GAN", icon: <FaBrain /> },
      { name: "COMPUTER VISION", icon: <FaBrain /> },
      { name: "NLP", icon: <FaBrain /> }
    ]
  },
  {
    id: 'databases',
    nameKey: 'databases',
    icon: <FaDatabase className="text-4xl text-red-600" />,
    descriptionKey: 'databases_description',
    color: 'red',
    gradient: 'from-red-500 to-pink-600',
    skills: [
      { name: "POSTGRESQL", icon: <SiPostgresql /> },
      { name: "MYSQL", icon: <SiMysql /> },
      { name: "MONGODB", icon: <SiMongodb /> },
      { name: "REDIS", icon: <SiRedis /> }
    ]
  },
  {
    id: 'web',
    nameKey: 'webDev',
    icon: <FaServer className="text-4xl text-amber-600" />,
    descriptionKey: 'webDev_description',
    color: 'amber',
    gradient: 'from-amber-500 to-yellow-600',
    skills: [
      { name: "FASTAPI", icon: <SiFastapi /> },
      { name: "REST APIS", icon: <FaServer /> },
      { name: "GRAPHQL", icon: <SiGraphql /> },
      { name: "MICROSERVICES", icon: <FaServer /> }
    ]
  },
  {
    id: 'devops',
    nameKey: 'devops',
    icon: <FaLaptopCode className="text-4xl text-indigo-600" />,
    descriptionKey: 'devops_description',
    color: 'indigo',
    gradient: 'from-indigo-500 to-blue-600',
    skills: [
      { name: "DOCKER", icon: <SiDocker /> },
      { name: "KUBERNETES", icon: <SiKubernetes /> },
      { name: "AWS", icon: <FaAws /> },
      { name: "CI/CD", icon: <FaLaptopCode /> },
      { name: "JENKINS", icon: <SiJenkins /> },
      { name: "PROMETHEUS", icon: <SiPrometheus /> },
      { name: "GRAFANA", icon: <SiGrafana /> }
    ]
  },
  {
    id: 'architecture',
    nameKey: 'architecture',
    icon: <FaCubes className="text-4xl text-pink-600" />,
    descriptionKey: 'architecture_description',
    color: 'pink',
    gradient: 'from-pink-500 to-rose-600',
    skills: [
      { name: "CLEAN ARCHITECTURE", icon: <FaCubes /> },
      { name: "PERFORMANCE", icon: <FaChartLine /> },
      { name: "AGILE", icon: <FaSyncAlt /> },
      { name: "TDD", icon: <FaCode /> }
    ]
  },
  {
    id: 'security',
    nameKey: 'security',
    icon: <FaShieldAlt className="text-4xl text-gray-600" />,
    descriptionKey: 'security_description',
    color: 'gray',
    gradient: 'from-gray-500 to-gray-700',
    skills: [
      { name: "WEB SECURITY", icon: <FaLock /> },
      { name: "PENETRATION TESTING", icon: <FaShieldAlt /> },
      { name: "LINUX", icon: <FaCode /> },
      { name: "SSRF", icon: <FaCode /> }
    ]
  }
]);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Skills() {
  const params = useParams();
  const locale = params.locale as string;
  const t = getTranslations(locale);
  const [activeCategory, setActiveCategory] = useState('languages');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const skillCategories = getSkillCategories(locale);
  const activeSkillCategory = skillCategories.find(cat => cat.id === activeCategory);

  // Obter experiências e projetos relacionados à skill selecionada
  const experiencesForSkill = selectedSkill ? getExperiencesForSkill(selectedSkill) : [];
  const projectsForSkill = selectedSkill ? getProjectsForSkill(selectedSkill) : [];

  // Função para obter os dados de todas as skills de uma categoria
  const getSkillsForCategory = (category: string) => {
    return allSkills
      .filter(skill => getSkillCategory(skill) === category)
      .map(skill => {
        const skillData = getLocalizedSkillData(skill, locale);
        return {
          ...skillData,
          normalizedSkill: skill
        };
      });
  };

  // Selecionar as skills mais relevantes para destaque
  const featuredSkills = [
    getLocalizedSkillData('PYTHON', locale),
    getLocalizedSkillData('DATA ENGINEERING', locale),
    getLocalizedSkillData('APACHE SPARK', locale),
    getLocalizedSkillData('FASTAPI', locale),
    getLocalizedSkillData('DOCKER', locale),
    getLocalizedSkillData('WEB SECURITY', locale)
  ].filter(Boolean);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <Navigation locale={locale} />
      
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              {t.skills?.title || "Minhas Habilidades"}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              {t.skills?.subtitle || "Tecnologias e ferramentas que utilizo para criar soluções eficientes"}
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  activeCategory === category.id
                    ? `bg-${category.color}-100 dark:bg-${category.color}-900/30 text-${category.color}-600 dark:text-${category.color}-400`
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className={`p-1 rounded-lg ${
                  activeCategory === category.id
                    ? `bg-${category.color}-50 dark:bg-${category.color}-900/20`
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  {category.icon}
                </div>
                <span className="font-medium">
                  {t.skills?.[category.nameKey] || category.nameKey}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-full bg-${activeSkillCategory?.color}-100 dark:bg-${activeSkillCategory?.color}-900/30`}>
                  {activeSkillCategory?.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t.skills?.[activeSkillCategory?.nameKey || ''] || activeSkillCategory?.nameKey}
                </h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t.skills?.[activeSkillCategory?.descriptionKey || ''] || activeSkillCategory?.descriptionKey}
              </p>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  {t.skills?.proficiencyLevels || "Níveis de Proficiência"}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-500 mr-2"></div>
                    <span className="text-sm">{t.skills?.expert || "Especialista"}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-600 dark:bg-green-500 mr-2"></div>
                    <span className="text-sm">{t.skills?.advanced || "Avançado"}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-600 dark:bg-yellow-500 mr-2"></div>
                    <span className="text-sm">{t.skills?.intermediate || "Intermediário"}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-600 dark:bg-gray-500 mr-2"></div>
                    <span className="text-sm">{t.skills?.beginner || "Iniciante"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              {activeSkillCategory?.skills.map((skill, index) => {
                const skillData = getLocalizedSkillData(skill.name, locale);
                return (
                  <motion.div 
                    key={`${activeSkillCategory.id}-${index}`}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedSkill(skill.name)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className={`bg-${activeSkillCategory.color}-100 dark:bg-${activeSkillCategory.color}-900/30 p-2 rounded-lg mr-3`}>
                          {skill.icon}
                        </span>
                        <SkillBadge 
                          skill={skillData.normalizedSkill} 
                          category={activeSkillCategory.id}
                          level={skillData.level}
                          className="text-base font-semibold p-2"
                        >
                          {skillData.skill}
                        </SkillBadge>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full bg-${getLevelColor(skillData.level)}-600 dark:bg-${getLevelColor(skillData.level)}-500 mr-2`}></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {skillData.score}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-200 dark:bg-gray-700 w-full h-2 rounded-full overflow-hidden mb-2">
                      <div 
                        className={`bg-${getLevelColor(skillData.level)}-600 dark:bg-${getLevelColor(skillData.level)}-500 h-full rounded-full`}
                        style={{ width: `${skillData.score}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">{skillData.stats.yearsOfExperience}</span> {t.skills?.yearsExperience || "anos de experiência"}
                        </span>
                        
                        <span className="text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">{skillData.stats.projectCount}</span> {skillData.stats.projectCount === 1 ? "projeto" : "projetos"}
                        </span>
                        
                        <span className="text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">{skillData.stats.certificationCount}</span> {skillData.stats.certificationCount === 1 ? "certificação" : "certificações"}
                        </span>
                      </div>
                      
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {t.skills?.[skillData.level] || skillData.level}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {selectedSkill && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg relative"
                >
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{selectedSkill}</h3>
                  <div className="flex items-center gap-4 mb-6">
                    <SkillBadge
                      skill={selectedSkill}
                      category={getSkillCategory(selectedSkill)}
                      level={getLocalizedSkillData(selectedSkill, locale).level}
                      size="lg"
                    >
                      {getLocalizedSkillData(selectedSkill, locale).skill}
                    </SkillBadge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                        {t.skills?.experience || "Experiência"}
                      </h4>
                      {experiencesForSkill.map((exp, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                          <div className="font-medium text-gray-900 dark:text-white">{exp.company}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{exp.position}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-500">{exp.period}</div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                        {t.skills?.projects || "Projetos"}
                      </h4>
                      {projectsForSkill.map((project, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                          <div className="font-medium text-gray-900 dark:text-white">{project.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{project.description}</div>
                          <a 
                            href={project.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block"
                          >
                            {t.skills?.viewProject || "Ver Projeto"}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Função auxiliar para obter a cor com base no nível
function getLevelColor(level: string) {
  switch (level) {
    case 'expert': return 'blue';
    case 'advanced': return 'green';
    case 'intermediate': return 'yellow';
    case 'beginner': 
    default: return 'gray';
  }
}

// Função auxiliar para obter a explicação do nível
function getLevelExplanation(level: string) {
  switch (level) {
    case 'expert':
      return 'Uso avançado em projetos complexos';
    case 'advanced':
      return 'Experiência sólida em projetos reais';
    case 'intermediate':
      return 'Conhecimento prático aplicado';
    case 'beginner':
    default:
      return 'Conhecimento básico';
  }
}

// Adicionar função auxiliar para categorização
function getSkillCategory(skill: string): string {
  const skillCategoryMap: Record<string, string> = {
    // Linguagens
    'PYTHON': 'languages',
    'PHP': 'languages',
    'NODE.JS': 'web',
    'TYPESCRIPT': 'languages',
    'GO': 'languages',
    'JAVASCRIPT': 'languages',
    
    // Engenharia de Dados
    'ETL': 'data',
    'APACHE SPARK': 'data',
    'APACHE AIRFLOW': 'data',
    'APACHE HADOOP': 'data',
    'APACHE NIFI': 'data',
    'APACHE HIVE': 'data',
    'DATA LAKES': 'data',
    'WEB SCRAPING': 'data',
    'DATA ENGINEERING': 'data',
    
    // Inteligência Artificial
    'MACHINE LEARNING': 'ai',
    'DEEP LEARNING': 'ai',
    'GAN': 'ai',
    'COMPUTER VISION': 'ai',
    'NLP': 'ai',
    
    // Bancos de Dados
    'POSTGRESQL': 'databases',
    'MYSQL': 'databases',
    'MONGODB': 'databases',
    'REDIS': 'databases',
    'ELASTICSEARCH': 'databases',
    
    // Web & APIs
    'FASTAPI': 'web',
    'REST APIS': 'web',
    'GRAPHQL': 'web',
    'MICROSERVICES': 'web',
    
    // DevOps & Cloud
    'DOCKER': 'devops',
    'KUBERNETES': 'devops',
    'AWS': 'devops',
    'CI/CD': 'devops',
    'JENKINS': 'devops',
    'PROMETHEUS': 'devops',
    'GRAFANA': 'devops',
    
    // Arquitetura & Metodologias
    'CLEAN ARCHITECTURE': 'architecture',
    'PERFORMANCE': 'architecture',
    'AGILE': 'architecture',
    'TDD': 'architecture',
    
    // Segurança
    'WEB SECURITY': 'security',
    'CRYPTOGRAPHY': 'security',
    'PENETRATION TESTING': 'security',
    'API SECURITY': 'security',
    'LINUX': 'security',
    'SSRF': 'security',
    'CYBERSECURITY': 'security'
  };
  
  return skillCategoryMap[skill] || 'languages';
}