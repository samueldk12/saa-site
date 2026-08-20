'use client';

import { getTranslations } from '@/lib/getTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { FaGithub, FaExternalLinkAlt, FaCodeBranch, FaStar, FaTimes, FaSearch, FaCircle } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { getExperiencesForSkill } from '@/lib/skillsData';

// Cores de linguagem no padrão usado pelo próprio GitHub — aplicadas via
// style inline (não classes dinâmicas do Tailwind, que nunca são geradas
// pelo compilador e deixam o elemento sem cor nenhuma).
const LANGUAGE_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  Go: '#00ADD8',
  PHP: '#4F5D95',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Shell: '#89E051',
  Java: '#B07219',
  'C#': '#178600',
  Rust: '#DEA584',
  Dockerfile: '#384D54',
};

const languageColor = (lang: string | null) => LANGUAGE_COLORS[lang || ''] || '#8B8B8B';

const detectTechnologies = (name: string = '', description: string = '', language: string = '') => {
  const text = ((name || '') + ' ' + (description || '') + ' ' + (language || '')).toLowerCase();
  const techStack: Record<string, boolean> = {
    python: text.includes('python') || language === 'Python',
    fastapi: text.includes('fastapi') || text.includes('fast api'),
    typescript: text.includes('typescript') || language === 'TypeScript',
    javascript: text.includes('javascript') || language === 'JavaScript',
    nodejs: text.includes('node') || text.includes('express'),
    go: text.includes('golang') || language === 'Go',
    mongodb: text.includes('mongo'),
    postgresql: text.includes('postgres') || text.includes('sql'),
    docker: text.includes('docker') || text.includes('container'),
    api: text.includes('api') || text.includes('rest'),
    ml: text.includes('machine learning') || text.includes(' ai ') || text.includes('inteligência'),
    algorithm: text.includes('algorithm') || text.includes('algoritmo') || text.includes('structure'),
    cli: text.includes('cli') || text.includes('terminal') || text.includes('command'),
    game: text.includes('game') || text.includes('jogo'),
    pipeline: text.includes('pipeline') || text.includes('etl'),
  };
  const techNames: Record<string, string> = {
    python: 'Python', fastapi: 'FastAPI', typescript: 'TypeScript', javascript: 'JavaScript',
    nodejs: 'Node.js', go: 'Golang', mongodb: 'MongoDB', postgresql: 'PostgreSQL', docker: 'Docker',
    api: 'REST API', ml: 'Machine Learning', algorithm: 'Algorithms', cli: 'CLI', game: 'Game Dev', pipeline: 'Data Pipeline'
  };
  const technologies = Object.entries(techStack).filter(([, v]) => v).map(([k]) => techNames[k]);
  if (technologies.length === 0) technologies.push(language || 'Project');
  return technologies;
};

const formatProjectName = (name: string) => {
  if (!name) return '';
  let formatted = name.replace(/[-_]/g, ' ');
  formatted = formatted.replace(/([a-z])([A-Z])/g, '$1 $2');
  return formatted.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

const relativeTime = (dateStr: string, locale: string) => {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return locale === 'en' ? 'today' : 'hoje';
  if (days < 30) return locale === 'en' ? `${days}d ago` : `há ${days}d`;
  const months = Math.floor(days / 30);
  if (months < 12) return locale === 'en' ? `${months}mo ago` : `há ${months}m`;
  const years = Math.floor(months / 12);
  return locale === 'en' ? `${years}y ago` : `há ${years}a`;
};

export default function Projects() {
  const { locale } = useParams();
  const loc = locale as string;
  const t = getTranslations(loc);

  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const experiencesForSkill = selectedSkill ? getExperiencesForSkill(selectedSkill) : [];

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/samueldk12/repos?sort=updated&per_page=12');
        if (!response.ok) throw new Error(`${response.status}`);
        const repos = await response.json();
        const processed = (repos || []).filter((r: any) => r).map((repo: any) => ({
          id: repo.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name: repo.name,
          html_url: repo.html_url,
          homepage: repo.homepage,
          description: repo.description || (loc === 'en' ? 'No description provided' : 'Sem descrição fornecida'),
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          updated_at: repo.updated_at,
          technologies: detectTechnologies(repo.name, repo.description, repo.language).slice(0, 5),
        }));
        setGithubRepos(processed);
        setIsLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setIsLoading(false);
      }
    };
    fetchRepos();
  }, [loc]);

  const filteredRepos = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return githubRepos;
    return githubRepos.filter(r =>
      r.name.toLowerCase().includes(q) ||
      (r.description || '').toLowerCase().includes(q) ||
      (r.language || '').toLowerCase().includes(q) ||
      r.technologies.some((tech: string) => tech.toLowerCase().includes(q))
    );
  }, [githubRepos, query]);

  const openProjectModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeProjectModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <main className="min-h-screen bg-[#0B0E14] text-[#D7DBE0] font-mono">
      <Navigation locale={loc} />

      <div className="container mx-auto px-4 pt-24 pb-20 max-w-5xl">
        {/* Janela de terminal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-lg border border-white/10 bg-[#11151C] shadow-2xl overflow-hidden mb-10"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#151A22]">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="ml-3 text-xs text-[#8A94A6]">samuel@saa-company:~/projects</span>
          </div>
          <div className="p-5 sm:p-8">
            <p className="text-[#5CE1A8] text-sm mb-2">
              $ gh repo list samueldk12 --sort updated
            </p>
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
              {t.projects?.title || (loc === 'en' ? 'My Projects' : loc === 'es' ? 'Mis Proyectos' : 'Meus Projetos')}
            </h1>
            <p className="text-sm sm:text-base text-[#8A94A6] max-w-2xl">
              {t.projects?.subtitle || (loc === 'en'
                ? 'A live pull from GitHub — recent work in development and data engineering.'
                : loc === 'es'
                ? 'Un pull en vivo desde GitHub — trabajos recientes en desarrollo e ingeniería de datos.'
                : 'Um pull ao vivo do GitHub — trabalhos recentes em desenvolvimento e engenharia de dados.')}
            </p>

            {/* Busca funcional estilo linha de comando */}
            <div className="mt-6 flex items-center gap-2 rounded-md border border-white/10 bg-[#0B0E14] px-3 py-2.5 focus-within:border-[#5CE1A8]/60 transition-colors">
              <span className="text-[#5CE1A8]">$</span>
              <FaSearch className="text-[#8A94A6] text-xs" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={loc === 'en' ? 'grep --name --lang --tech ...' : 'grep --nome --lang --tech ...'}
                className="flex-1 bg-transparent outline-none text-sm text-[#D7DBE0] placeholder:text-[#4B5361]"
              />
              <span className="text-xs text-[#4B5361]">{filteredRepos.length}/{githubRepos.length}</span>
            </div>
          </div>
        </motion.div>

        {/* Listagem de repositórios */}
        {isLoading ? (
          <div className="text-[#5CE1A8] text-sm flex items-center gap-2 px-2">
            <span>{loc === 'en' ? 'Fetching repositories' : 'Buscando repositórios'}</span>
            <span className="cursor-blink" />
          </div>
        ) : error ? (
          <div className="text-sm text-[#FF5F56] px-2">
            bash: gh: {loc === 'en' ? 'failed to fetch repositories' : 'falha ao buscar repositórios'} ({error})
          </div>
        ) : (
          <motion.div initial="hidden" animate="visible" className="divide-y divide-white/5 border border-white/10 rounded-lg overflow-hidden bg-[#11151C]">
            {filteredRepos.map((project, index) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.4) }}
                aria-label={formatProjectName(project.name)}
                onClick={() => openProjectModal(project)}
                className="w-full text-left px-4 sm:px-5 py-4 hover:bg-white/[0.04] transition-colors group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <FaCircle style={{ color: languageColor(project.language) }} className="text-[8px] shrink-0" />
                    <span className="text-[#D7DBE0] font-semibold group-hover:text-white truncate">
                      {formatProjectName(project.name)}
                    </span>
                    <span className="text-xs text-[#4B5361] hidden sm:inline">{project.language || '—'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#8A94A6] shrink-0">
                    <span className="flex items-center gap-1"><FaStar className="text-[10px]" />{project.stargazers_count}</span>
                    <span className="flex items-center gap-1"><FaCodeBranch className="text-[10px]" />{project.forks_count}</span>
                    <span>{relativeTime(project.updated_at, loc)}</span>
                  </div>
                </div>
                <p className="text-sm text-[#8A94A6] pl-4">
                  <span className="text-[#4B5361]">// </span>{project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2 pl-4">
                  {project.technologies.map((tech: string) => (
                    <span key={tech} className="text-[0.7rem] text-[#5CE1A8]/90 bg-[#5CE1A8]/10 border border-[#5CE1A8]/20 rounded px-1.5 py-0.5">
                      #{tech.toLowerCase().replace(/\s+/g, '-')}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
            {filteredRepos.length === 0 && (
              <p className="px-5 py-8 text-sm text-[#4B5361]">
                {loc === 'en' ? 'No matches for your query.' : 'Nenhum resultado para essa busca.'}
              </p>
            )}
          </motion.div>
        )}

        {/* CTA GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-10 rounded-lg border border-white/10 bg-[#11151C] p-6 sm:p-8 text-center"
        >
          <p className="text-[#5CE1A8] text-sm mb-2">$ open github.com/samueldk12</p>
          <p className="text-sm text-[#8A94A6] mb-5 max-w-xl mx-auto">
            {t.projects?.githubInvite || (loc === 'en'
              ? 'Check out my GitHub for more projects and open source contributions.'
              : loc === 'es'
              ? 'Visite mi GitHub para ver más proyectos y contribuciones de código abierto.'
              : 'Confira meu GitHub para mais projetos e contribuições de código aberto.')}
          </p>
          <a
            href="https://github.com/samueldk12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#5CE1A8] text-[#0B0E14] font-semibold text-sm hover:bg-[#7CEBBB] transition-colors"
          >
            <FaGithub />
            {t.projects?.visitGithub || 'Visitar GitHub'}
          </a>
        </motion.div>
      </div>

      {/* Modal de detalhe — visualizador de arquivo */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-lg border border-white/10 bg-[#11151C] shadow-2xl flex flex-col"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#151A22]">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                <span className="ml-3 text-xs text-[#8A94A6] truncate">{formatProjectName(selectedProject.name)}/README.md</span>
                <button onClick={closeProjectModal} className="ml-auto text-[#8A94A6] hover:text-white" aria-label="Fechar">
                  <FaTimes />
                </button>
              </div>

              <div className="p-5 sm:p-7 overflow-y-auto">
                <div className="flex items-center gap-2 mb-4">
                  <FaCircle style={{ color: languageColor(selectedProject.language) }} className="text-[10px]" />
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {formatProjectName(selectedProject.name)}
                  </h2>
                </div>

                <p className="text-sm text-[#D7DBE0]/90 mb-6">
                  <span className="text-[#5CE1A8]">// </span>{selectedProject.description}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="rounded-md border border-white/10 p-3 text-center">
                    <div className="text-white font-bold">{selectedProject.stargazers_count}</div>
                    <div className="text-[0.65rem] text-[#8A94A6] uppercase tracking-wide">{t.projects?.stars || 'Stars'}</div>
                  </div>
                  <div className="rounded-md border border-white/10 p-3 text-center">
                    <div className="text-white font-bold">{selectedProject.forks_count}</div>
                    <div className="text-[0.65rem] text-[#8A94A6] uppercase tracking-wide">{t.projects?.forks || 'Forks'}</div>
                  </div>
                  <div className="rounded-md border border-white/10 p-3 text-center">
                    <div className="text-white font-bold truncate">{selectedProject.language || '—'}</div>
                    <div className="text-[0.65rem] text-[#8A94A6] uppercase tracking-wide">{loc === 'en' ? 'Language' : 'Linguagem'}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {selectedProject.technologies.map((tech: string) => (
                    <button
                      key={tech}
                      onClick={() => setSelectedSkill(tech)}
                      className="text-xs text-[#5CE1A8] bg-[#5CE1A8]/10 border border-[#5CE1A8]/20 rounded px-2 py-1 hover:bg-[#5CE1A8]/20 transition-colors"
                    >
                      #{tech.toLowerCase().replace(/\s+/g, '-')}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={selectedProject.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#5CE1A8] text-[#0B0E14] font-semibold text-sm hover:bg-[#7CEBBB] transition-colors"
                  >
                    <FaGithub /> {t.projects?.viewOnGithub || 'Ver no GitHub'}
                  </a>
                  {selectedProject.homepage && (
                    <a
                      href={selectedProject.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/15 text-[#D7DBE0] font-semibold text-sm hover:border-white/30 transition-colors"
                    >
                      <FaExternalLinkAlt className="text-xs" /> {loc === 'en' ? 'Live site' : 'Site'}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de skill (experiência relacionada) */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-lg border border-white/10 bg-[#11151C] p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">#{selectedSkill.toLowerCase().replace(/\s+/g, '-')}</h3>
                <button onClick={() => setSelectedSkill(null)} className="text-[#8A94A6] hover:text-white">
                  <FaTimes />
                </button>
              </div>
              <p className="text-xs uppercase tracking-wide text-[#8A94A6] mb-3">
                {loc === 'en' ? 'Experience with this skill' : 'Experiência com esta habilidade'}
              </p>
              <div className="space-y-3">
                {experiencesForSkill.length > 0 ? experiencesForSkill.map((exp, idx) => (
                  <div key={idx} className="border border-white/10 rounded-md p-3">
                    <div className="font-semibold text-white text-sm">{exp.company}</div>
                    <div className="text-xs text-[#8A94A6]">{exp.position}</div>
                    <div className="text-[0.7rem] text-[#4B5361]">{exp.period}</div>
                  </div>
                )) : (
                  <p className="text-sm text-[#4B5361]">—</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
