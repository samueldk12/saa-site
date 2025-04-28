'use client';

// import { useTranslations } from 'next-intl';
import { getTranslations } from '@/lib/getTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { FaGithub, FaExternalLinkAlt, FaServer, FaCode, FaDatabase, FaRobot, FaTerminal, FaBook, FaBrain, FaCalendarAlt, FaCodeBranch, FaStar, FaInfoCircle } from 'react-icons/fa';
import { SiTypescript, SiPython, SiGo, SiFastapi, SiPostgresql, SiMongodb, SiRedis, SiDocker, SiJavascript, SiNodedotjs } from 'react-icons/si';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from "next/link";

// Função para determinar ícone e cor com base no nome ou descrição do projeto
const getProjectTheme = (name: string, description: string = '') => {
  const lowerName = (name || '').toLowerCase();
  const lowerDesc = (description || '').toLowerCase();
  
  // Padrões para reconhecimento
  const patterns = [
    {
      keywords: ['api', 'backend', 'rest', 'fastapi', 'express', 'server'],
      icon: <FaServer className="text-3xl" />,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700',
      bgLight: 'bg-blue-50',
      bgDark: 'bg-blue-950/30'
    },
    {
      keywords: ['data', 'etl', 'pipeline', 'sql', 'postgres', 'database', 'db'],
      icon: <FaDatabase className="text-3xl" />,
      color: 'green',
      gradient: 'from-green-500 to-emerald-700',
      bgLight: 'bg-green-50',
      bgDark: 'bg-green-950/30'
    },
    {
      keywords: ['algoritmo', 'algorithm', 'estrutura', 'structure', 'data structure'],
      icon: <FaCode className="text-3xl" />,
      color: 'indigo',
      gradient: 'from-indigo-500 to-indigo-700',
      bgLight: 'bg-indigo-50',
      bgDark: 'bg-indigo-950/30'
    },
    {
      keywords: ['ai', 'ia', 'machine learning', 'ml', 'intelligence', 'inteligência', 'neural'],
      icon: <FaBrain className="text-3xl" />,
      color: 'purple',
      gradient: 'from-purple-500 to-violet-700',
      bgLight: 'bg-purple-50',
      bgDark: 'bg-purple-950/30'
    },
    {
      keywords: ['cli', 'terminal', 'command', 'linha de comando', 'console'],
      icon: <FaTerminal className="text-3xl" />,
      color: 'gray',
      gradient: 'from-gray-600 to-gray-800',
      bgLight: 'bg-gray-50',
      bgDark: 'bg-gray-800/30'
    },
    {
      keywords: ['go', 'golang'],
      icon: <SiGo className="text-3xl" />,
      color: 'cyan',
      gradient: 'from-cyan-500 to-teal-700',
      bgLight: 'bg-cyan-50',
      bgDark: 'bg-cyan-950/30'
    },
    {
      keywords: ['python'],
      icon: <SiPython className="text-3xl" />,
      color: 'yellow',
      gradient: 'from-yellow-500 to-amber-700',
      bgLight: 'bg-yellow-50',
      bgDark: 'bg-yellow-950/30'
    },
    {
      keywords: ['typescript', 'node'],
      icon: <SiTypescript className="text-3xl" />,
      color: 'blue',
      gradient: 'from-blue-400 to-indigo-600',
      bgLight: 'bg-blue-50',
      bgDark: 'bg-blue-950/30'
    },
    {
      keywords: ['docker', 'container'],
      icon: <SiDocker className="text-3xl" />,
      color: 'blue',
      gradient: 'from-blue-400 to-cyan-600',
      bgLight: 'bg-blue-50',
      bgDark: 'bg-blue-950/30'
    },
    {
      keywords: ['unity', 'game', 'jogo'],
      icon: <FaBook className="text-3xl" />,
      color: 'red',
      gradient: 'from-red-500 to-rose-700',
      bgLight: 'bg-red-50',
      bgDark: 'bg-red-950/30'
    }
  ];
  
  // Verificar se algum padrão corresponde
  for (const pattern of patterns) {
    if (pattern.keywords.some(keyword => lowerName.includes(keyword) || lowerDesc.includes(keyword))) {
      return pattern;
    }
  }
  
  // Padrão default
  return {
    icon: <FaBook className="text-3xl" />,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-700',
    bgLight: 'bg-amber-50',
    bgDark: 'bg-amber-950/30'
  };
};

// Função para detectar tecnologias com base no nome e descrição
const detectTechnologies = (name: string = '', description: string = '', language: string = '') => {
  const text = ((name || '') + ' ' + (description || '') + ' ' + (language || '')).toLowerCase();
  
  const techStack: Record<string, boolean> = {
    'python': text.includes('python') || text.includes('py') || language === 'Python',
    'fastapi': text.includes('fastapi') || text.includes('fast api'),
    'typescript': text.includes('typescript') || text.includes('ts') || language === 'TypeScript',
    'javascript': text.includes('javascript') || text.includes('js') || language === 'JavaScript',
    'nodejs': text.includes('node') || text.includes('express'),
    'go': text.includes('go') || text.includes('golang') || language === 'Go',
    'mongodb': text.includes('mongo') || text.includes('mongodb'),
    'postgresql': text.includes('postgres') || text.includes('postgresql') || text.includes('sql'),
    'docker': text.includes('docker') || text.includes('container'),
    'api': text.includes('api') || text.includes('rest'),
    'ml': text.includes('ml') || text.includes('machine learning') || text.includes('ai') || text.includes('ia'),
    'algorithm': text.includes('algorithm') || text.includes('algoritmo') || text.includes('estrutura') || text.includes('structure'),
    'cli': text.includes('cli') || text.includes('terminal') || text.includes('command'),
    'game': text.includes('game') || text.includes('jogo')
  };
  
  // Extrair tecnologias presentes
  const technologies: string[] = [];
  for (const [tech, present] of Object.entries(techStack)) {
    if (present) {
      // Formatar nomes para exibição
      const techNames: Record<string, string> = {
        'python': 'Python',
        'fastapi': 'FastAPI',
        'typescript': 'TypeScript',
        'javascript': 'JavaScript',
        'nodejs': 'Node.js',
        'go': 'Golang',
        'mongodb': 'MongoDB',
        'postgresql': 'PostgreSQL',
        'docker': 'Docker',
        'api': 'RESTful API',
        'ml': 'Machine Learning',
        'algorithm': 'Algorithms',
        'cli': 'CLI',
        'game': 'Game Dev'
      };
      
      technologies.push(techNames[tech]);
    }
  }
  
  // Se não houver tecnologias detectadas
  if (technologies.length === 0) {
    if (language) {
      technologies.push(language);
    } else if (text.includes('learn') || text.includes('study') || text.includes('aprendendo') || text.includes('estudo')) {
      technologies.push('Learning Project');
    } else {
      technologies.push('Project');
    }
  }
  
  return technologies;
};

const formatProjectName = (name: string) => {
  if (!name) return '';
  
  // Substitui hífens e underscores por espaços
  let formattedName = name.replace(/[-_]/g, ' ');
  
  // Separa palavras em camelCase
  formattedName = formattedName.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  // Capitaliza a primeira letra de cada palavra
  formattedName = formattedName.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  return formattedName;
};

export default function Projects() {
  const { locale } = useParams();
  const t = getTranslations(locale as string);
  
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Função para buscar repositórios do GitHub
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Buscar dados do GitHub
        const username = 'samueldk12';
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        
        if (!response.ok) {
          throw new Error(`Falha ao buscar repositórios: ${response.status}`);
        }
        
        const repos = await response.json();
        
        // Processar os repositórios para adicionar tema, ícone e tecnologias
        const processedRepos = repos.filter((repo: any) => repo !== null).map((repo: any) => {
          const theme = getProjectTheme(repo.name, repo.description);
          const topics = repo.topics || [];
          const technologies = topics.length > 0 
            ? topics.map((t: string) => t.replace(/-/g, ' ')).map((t: string) => t.charAt(0).toUpperCase() + t.slice(1))
            : detectTechnologies(repo.name, repo.description, repo.language);
            
          // Formatar data de atualização
          const updatedDate = new Date(repo.updated_at);
          const formattedDate = updatedDate.toLocaleDateString(locale === 'en' ? 'en-US' : 'pt-BR', {
            year: 'numeric', 
            month: 'short', 
            day: 'numeric'
          });
          
          return {
            id: repo.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            name: repo.name,
            html_url: repo.html_url,
            description: repo.description || (locale === 'en' ? 'No description provided' : 'Sem descrição fornecida'),
            language: repo.language,
            topics: topics,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            updated_at: repo.updated_at,
            icon: theme.icon,
            color: theme.color,
            gradient: theme.gradient,
            bgLight: theme.bgLight,
            bgDark: theme.bgDark,
            technologies: technologies.slice(0, 4), // Limitar a 4 tecnologias
            formattedDate
          };
        });
        
        setGithubRepos(processedRepos);
        setIsLoading(false);
      } catch (err) {
        console.error('Erro ao buscar repositórios:', err);
        const error = err as Error;
        setError(error.message);
        setIsLoading(false);
      }
    };
    
    fetchRepos();
  }, [locale]);

  const openProjectModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const ProjectCard = ({ project, index }: { project: any; index: number }) => (
    <motion.div 
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
      
      <div className="p-6 flex-1 relative z-10">
        <div 
          className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0 ${project.bgLight} dark:${project.bgDark}`}
          style={{ 
            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
          }}
        />
        
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-full ${project.bgLight} dark:${project.bgDark} text-${project.color}-600 dark:text-${project.color}-400 transition-transform duration-300 group-hover:scale-110`}>
            {project.icon}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => openProjectModal(project)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
              aria-label="Ver detalhes"
            >
              <FaInfoCircle className="text-xl" />
            </button>
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
          {t.projects?.[project.id]?.title || formatProjectName(project.name)}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm line-clamp-3">
          {t.projects?.[project.id]?.description || project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string) => (
            <span 
              key={`${project.id}-${tech}`}
              className={`px-3 py-1 bg-${project.color}-100 dark:bg-${project.color}-800/30 text-${project.color}-800 dark:text-${project.color}-300 rounded-full text-xs font-medium`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
          <FaCalendarAlt className="mr-1 text-xs" />
          {project.formattedDate}
        </div>
        
        <div className="flex space-x-2">
          {project.html_url && (
            <a 
              href={project.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-3 py-1 bg-${project.color}-600 hover:bg-${project.color}-700 text-white rounded flex items-center gap-1 text-sm transition-colors`}
              aria-label="Ver no GitHub"
            >
              <FaGithub className="text-sm" />
              <span>{t.projects?.openGithub || 'Abrir GitHub'}</span>
            </a>
          )}
          
          <button
            onClick={() => openProjectModal(project)}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded flex items-center gap-1 text-sm transition-colors"
          >
            <FaInfoCircle className="text-sm" />
            <span>{t.projects?.details || 'Detalhes'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );

  const ProjectModal = ({ project }: { project: any }) => {
    return (
      <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
          
          <div className="p-6 sm:p-8 overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-start">
                <div className={`p-4 rounded-full ${project.bgLight} dark:${project.bgDark} text-${project.color}-600 dark:text-${project.color}-400 mr-4`}>
                  {project.icon}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    {t.projects?.[project.id]?.title || formatProjectName(project.name)}
                  </h2>
                  <div className="mt-2 flex items-center text-gray-600 dark:text-gray-400 text-sm">
                    <FaCalendarAlt className="mr-1" />
                    <span>{t.projects?.updatedOn || 'Atualizado em'} {project.formattedDate}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={closeProjectModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white p-1"
                aria-label="Fechar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{t.projects?.description || 'Descrição'}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.projects?.[project.id]?.description || project.description}
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{t.projects?.technologies || 'Tecnologias'}</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <span 
                    key={`modal-${project.id}-${tech}`}
                    className={`px-3 py-1 bg-${project.color}-100 dark:bg-${project.color}-800/30 text-${project.color}-800 dark:text-${project.color}-300 rounded-full text-sm font-medium`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{t.projects?.statistics || 'Estatísticas'}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <FaCodeBranch className="text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-gray-800 dark:text-white font-semibold">{project.forks_count}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{t.projects?.forks || 'Forks'}</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500 mr-2" />
                    <span className="text-gray-800 dark:text-white font-semibold">{project.stargazers_count}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{t.projects?.stars || 'Estrelas'}</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                    <span className="text-gray-800 dark:text-white font-semibold">{project.language || '-'}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{t.projects?.mainLanguage || 'Linguagem principal'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-3 justify-end">
            <button
              onClick={closeProjectModal}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors"
            >
              {t.projects?.close || 'Fechar'}
            </button>
            
            {project.html_url && (
              <a 
                href={project.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`px-4 py-2 bg-${project.color}-600 hover:bg-${project.color}-700 text-white rounded-lg flex items-center gap-2 transition-colors`}
              >
                <FaGithub />
                <span>{t.projects?.viewOnGithub || 'Ver no GitHub'}</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      <Navigation locale={locale as string} />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
            {t.projects?.title || (
              locale === 'en' ? 'My Projects' : 
              locale === 'es' ? 'Mis Proyectos' : 
              'Meus Projetos'
            )}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {t.projects?.subtitle || (
              locale === 'en' ? 'A collection of my recent work in development and data engineering.' : 
              locale === 'es' ? 'Una colección de mis trabajos recientes en desarrollo e ingeniería de datos.' : 
              'Uma coleção dos meus trabalhos recentes em desenvolvimento e engenharia de dados.'
            )}
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative w-20 h-20">
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-blue-500 border-r-blue-300 border-b-purple-500 border-l-purple-300 animate-spin"></div>
              <div className="absolute top-2 left-2 w-16 h-16 rounded-full border-4 border-t-transparent border-r-blue-400 border-b-transparent border-l-purple-400 animate-spin animation-delay-200"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 dark:text-red-400">{error}</p>
            <p className="mt-4">{t.projects?.errorMessage || (
              locale === 'en' ? 'Unable to load projects. Please try again later.' : 
              locale === 'es' ? 'No se pudieron cargar los proyectos. Por favor, inténtelo de nuevo más tarde.' : 
              'Não foi possível carregar os projetos. Tente novamente mais tarde.'
            )}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {githubRepos.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-6">
            {t.projects?.moreProjects || (
              locale === 'en' ? 'More projects' : 
              locale === 'es' ? 'Más proyectos' : 
              'Mais projetos'
            )}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {t.projects?.githubInvite || (
              locale === 'en' ? 'Check out my GitHub for more projects and open source contributions.' : 
              locale === 'es' ? 'Visite mi GitHub para ver más proyectos y contribuciones de código abierto.' : 
              'Confira meu GitHub para mais projetos e contribuições de código aberto.'
            )}
          </p>
          <a 
            href="https://github.com/samueldk12" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
          >
            <FaGithub className="text-xl" />
            {t.projects?.visitGithub || (
              locale === 'en' ? 'Visit GitHub' : 
              locale === 'es' ? 'Visitar GitHub' : 
              'Visitar GitHub'
            )}
          </a>
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectModal project={selectedProject} />
        )}
      </AnimatePresence>
    </main>
  );
} 