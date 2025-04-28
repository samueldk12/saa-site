'use client';

import { motion } from 'framer-motion';
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
  FaNetworkWired
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
  SiGrafana
} from 'react-icons/si';
import { useState } from 'react';

const skillCategories = [
  {
    id: 'languages',
    name: 'Linguagens de Programação',
    icon: <FaCode className="text-4xl text-blue-600" />,
    description: 'Desenvolvimento de soluções em múltiplas linguagens de programação para sistemas diversos',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    skills: [
      { name: "Python", icon: <FaPython />, level: 95, description: "APIs de alto desempenho, automação, processamento de dados e machine learning" },
      { name: "PHP", icon: <FaPhp />, level: 90, description: "Sistemas web robustos, APIs RESTful e integração com bancos de dados" },
      { name: "Node.js", icon: <FaNodeJs />, level: 80, description: "Aplicações escaláveis, APIs e serviços em tempo real" },
      { name: "TypeScript", icon: <SiTypescript />, level: 75, description: "Desenvolvimento frontend e backend com tipagem estática para maior segurança" },
      { name: "Go", icon: <SiGo />, level: 60, description: "Microsserviços eficientes, ferramentas de CLI e aplicações concorrentes" }
    ]
  },
  {
    id: 'data',
    name: 'Engenharia de Dados',
    icon: <FaDatabase className="text-4xl text-purple-600" />,
    description: 'Construção de pipelines e soluções para processamento de grandes volumes de dados',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600',
    skills: [
      { name: "ETL/ELT", icon: <FaSyncAlt />, level: 95, description: "Desenho e implementação de pipelines para extração, transformação e carregamento de dados" },
      { name: "Apache Spark", icon: <SiApachespark />, level: 90, description: "Processamento distribuído de big data para análises em larga escala" },
      { name: "Apache Airflow", icon: <SiApacheairflow />, level: 85, description: "Orquestração e agendamento de workflows complexos de dados" },
      { name: "Data Lakes", icon: <FaDatabase />, level: 75, description: "Arquitetura e implementação de repositórios centralizados para dados estruturados e não-estruturados" },
      { name: "Elasticsearch", icon: <SiElasticsearch />, level: 80, description: "Indexação, busca e análise de dados em tempo real" }
    ]
  },
  {
    id: 'databases',
    name: 'Bancos de Dados',
    icon: <FaDatabase className="text-4xl text-green-600" />,
    description: 'Expertise em sistemas de gerenciamento de dados relacionais e não-relacionais',
    color: 'green',
    gradient: 'from-green-500 to-teal-600',
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql />, level: 95, description: "Modelagem, otimização de queries e administração avançada" },
      { name: "MySQL", icon: <SiMysql />, level: 90, description: "Configuração, replicação e performance tuning" },
      { name: "MongoDB", icon: <SiMongodb />, level: 85, description: "Modelagem de documentos, indexação e agregações" },
      { name: "Redis", icon: <SiRedis />, level: 80, description: "Implementação de cache, filas e estruturas de dados em memória" }
    ]
  },
  {
    id: 'web',
    name: 'Desenvolvimento Web & APIs',
    icon: <FaServer className="text-4xl text-red-600" />,
    description: 'Criação de interfaces de programação e serviços web modernos e eficientes',
    color: 'red',
    gradient: 'from-red-500 to-red-600',
    skills: [
      { name: "FastAPI", icon: <SiFastapi />, level: 95, description: "Desenvolvimento rápido de APIs com validação automática e documentação integrada" },
      { name: "REST APIs", icon: <FaServer />, level: 95, description: "Arquitetura, segurança e otimização de interfaces RESTful" },
      { name: "GraphQL", icon: <SiGraphql />, level: 80, description: "Implementação de APIs flexíveis com consultas sob demanda" },
      { name: "Microservices", icon: <FaCubes />, level: 90, description: "Design e implementação de arquiteturas baseadas em microsserviços" }
    ]
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    icon: <FaServer className="text-4xl text-orange-600" />,
    description: 'Automação de infraestrutura e operações em ambientes de nuvem',
    color: 'orange',
    gradient: 'from-orange-500 to-orange-600',
    skills: [
      { name: "Docker", icon: <FaDocker />, level: 90, description: "Containerização de aplicações para ambientes isolados e reprodutíveis" },
      { name: "Kubernetes", icon: <SiKubernetes />, level: 75, description: "Orquestração, escalabilidade e gestão de containers" },
      { name: "AWS", icon: <FaAws />, level: 85, description: "Implementação e gerenciamento de serviços em cloud" },
      { name: "CI/CD", icon: <SiJenkins />, level: 80, description: "Pipelines automatizados para integração e entrega contínuas" },
      { name: "Monitoramento", icon: <SiGrafana />, level: 85, description: "Implementação de observabilidade com Prometheus e Grafana" }
    ]
  },
  {
    id: 'architecture',
    name: 'Arquitetura & Metodologias',
    icon: <FaCubes className="text-4xl text-cyan-600" />,
    description: 'Conhecimentos avançados em design e padrões de sistemas de software',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    skills: [
      { name: "Clean Architecture", icon: <FaCubes />, level: 90, description: "Aplicação de princípios SOLID e padrões de design limpo" },
      { name: "Microservices", icon: <FaNetworkWired />, level: 85, description: "Projeto de sistemas distribuídos com baixo acoplamento" },
      { name: "Performance", icon: <FaArrowUp />, level: 85, description: "Otimização de sistemas para alta performance e escalabilidade" },
      { name: "Agile", icon: <FaSyncAlt />, level: 90, description: "Implementação de Scrum, Kanban e práticas de XP" },
      { name: "TDD", icon: <FaChartLine />, level: 80, description: "Desenvolvimento guiado por testes para maior qualidade de código" }
    ]
  },
  {
    id: 'security',
    name: 'Segurança & Performance',
    icon: <FaShieldAlt className="text-4xl text-amber-600" />,
    description: 'Proteção de sistemas contra vulnerabilidades e otimização de performance',
    color: 'amber',
    gradient: 'from-amber-500 to-yellow-600',
    skills: [
      { name: "Web Security", icon: <FaLock />, level: 90, description: "Mitigação de riscos do OWASP Top 10 e proteção contra ataques comuns" },
      { name: "Criptografia", icon: <FaShieldAlt />, level: 85, description: "Implementação de soluções para proteção de dados sensíveis" },
      { name: "Penetration Testing", icon: <FaShieldAlt />, level: 75, description: "Identificação e correção de vulnerabilidades de segurança" },
      { name: "API Security", icon: <FaLock />, level: 90, description: "Autenticação, autorização e proteção de endpoints" }
    ]
  }
];

export default function Skills() {
  const params = useParams();
  const locale = params.locale as string;
  const t = getTranslations(locale);

  const [activeCategory, setActiveCategory] = useState('languages');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getSkillLevel = (level: number) => {
    if (level >= 90) return locale === 'en' ? 'Expert' : 'Especialista';
    if (level >= 80) return locale === 'en' ? 'Advanced' : 'Avançado';
    if (level >= 60) return locale === 'en' ? 'Intermediate' : 'Intermediário';
    return locale === 'en' ? 'Beginner' : 'Iniciante';
  };

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'bg-blue-600 dark:bg-blue-500';
    if (level >= 80) return 'bg-green-600 dark:bg-green-500';
    if (level >= 60) return 'bg-yellow-600 dark:bg-yellow-500';
    return 'bg-gray-600 dark:bg-gray-500';
  };

  const activeSkillCategory = skillCategories.find(cat => cat.id === activeCategory) || skillCategories[0];
  
  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  };
  
  const skillItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    }),
    hover: { 
      scale: 1.02,
      transition: { 
        duration: 0.2
      }
    }
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-white">
      <Navigation locale={locale} />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#2a2a3c_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute -z-5 top-1/3 left-0 w-72 h-72 bg-gradient-to-r from-blue-300/20 to-purple-300/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -z-5 bottom-1/3 right-0 w-80 h-80 bg-gradient-to-r from-indigo-300/20 to-pink-300/20 dark:from-indigo-500/10 dark:to-pink-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              {t.skills?.title || "Minhas Habilidades"}
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              {t.skills?.subtitle || "Tecnologias e ferramentas que utilizo para criar soluções eficientes"}
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center mb-12 gap-3">
            {skillCategories.map((category, index) => (
              <motion.button
                key={category.id}
                className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
                onClick={() => setActiveCategory(category.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <span className="flex items-center gap-2">
                  <span className={activeCategory === category.id ? "text-white" : `text-${category.color}-600 dark:text-${category.color}-400`}>
                    {category.icon}
                  </span>
                  <span>{t.skills?.[category.id] || category.name}</span>
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Skills Display Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={categoryVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 max-w-6xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              {/* Category Info */}
              <div className="md:w-1/3">
                <div className={`p-4 rounded-xl bg-${activeSkillCategory.color}-100 dark:bg-${activeSkillCategory.color}-900/30 inline-block mb-4`}>
                  {activeSkillCategory.icon}
                </div>
                <h2 className={`text-2xl md:text-3xl font-bold mb-4 text-${activeSkillCategory.color}-600 dark:text-${activeSkillCategory.color}-400`}>
                  {t.skills?.[activeSkillCategory.id] || activeSkillCategory.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                  {t.skills?.[`${activeSkillCategory.id}_description`] || activeSkillCategory.description}
                </p>
                
                <div className="hidden md:block mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Níveis de Proficiência</h3>
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
              
              {/* Skills List */}
              <div className="md:w-2/3">
                <div className="space-y-6">
                  {activeSkillCategory.skills.map((skill, index) => (
                    <motion.div 
                      key={skill.name}
                      variants={skillItemVariants}
                      custom={index}
                      className={`bg-${activeSkillCategory.color}-50 dark:bg-${activeSkillCategory.color}-900/20 rounded-xl p-5 transition-all duration-300 ${
                        hoveredSkill === skill.name ? 'shadow-lg scale-[1.02]' : 'shadow'
                      }`}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`text-xl text-${activeSkillCategory.color}-600 dark:text-${activeSkillCategory.color}-400`}>
                            {skill.icon}
                          </div>
                          <h3 className="text-lg font-semibold">{skill.name}</h3>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          skill.level >= 90 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                          skill.level >= 80 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                          skill.level >= 60 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                          'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
                        }`}>
                          {getSkillLevel(skill.level)}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                        {skill.description}
                      </p>
                      
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <motion.div 
                          className={`h-2.5 rounded-full ${getSkillColor(skill.level)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}