'use client';

import { getTranslations } from '@/lib/getTranslations';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaCode, 
  FaDatabase, 
  FaShieldAlt, 
  FaGithub, 
  FaLinkedin, 
  FaServer, 
  FaReact, 
  FaPython, 
  FaDocker, 
  FaLaptopCode,
  FaRobot,
  FaDownload,
  FaEnvelope,
  FaQuoteLeft,
  FaQuoteRight,
  FaThumbsUp,
  FaBriefcase,
  FaArrowRight,
  FaWhatsapp,
  FaChevronDown,
  FaMapMarkerAlt as FaLocation,
  FaGraduationCap as FaGrad,
  FaBrain,
  FaBolt,
  FaLightbulb,
  FaBuilding,
  FaRocket
} from 'react-icons/fa';
import { SiApachespark, SiApacheairflow, SiPostgresql, SiElasticsearch, SiGo, SiPython, SiTypescript } from 'react-icons/si';
import { useState, useEffect } from 'react';
import { Testimonial } from '@/models/Testimonial';
import SkillsText from '@/components/SkillsText';
import SkillBadge from '@/components/SkillBadge';
import { getLocalizedSkillData } from '@/lib/skillsData';

export default function Home() {
  const params = useParams();
  const locale = params.locale as string;
  const t = getTranslations(locale);
  const [topTestimonials, setTopTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    async function fetchTopTestimonials() {
      try {
        const response = await fetch('/api/testimonials');
        if (!response.ok) throw new Error('Falha ao buscar depoimentos');
        const data = await response.json();
        const sortedTestimonials = [...data].sort((a, b) => b.votes - a.votes).slice(0, 2);
        setTopTestimonials(sortedTestimonials);
      } catch (error) {
        console.error('Erro ao buscar depoimentos:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTopTestimonials();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToExpertise = () => {
    const expertiseSection = document.getElementById("expertise");
    if (expertiseSection) {
      expertiseSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSocialClick = (platform: string) => {
    const socialLinks = {
      github: 'https://github.com/samueldk12',
      linkedin: 'https://www.linkedin.com/in/samuel-arao/',
      email: 'mailto:samuel.arao@gmail.com'
    };

    const url = socialLinks[platform as keyof typeof socialLinks];
    if (url) {
      window.open(url, '_blank');
    }
  };

  // Novos dados para o radar chart das competências
  const competencyAreas = [
    { 
      name: locale === 'en' ? "Data Engineering" : "Engenharia de Dados", 
      value: 90, 
      icon: <FaDatabase className="text-2xl" />,
      color: "blue",
      skill: "DATA ENGINEERING"
    },
    { 
      name: locale === 'en' ? "Backend Development" : "Desenvolvimento Backend", 
      value: 85, 
      icon: <FaServer className="text-2xl" />,
      color: "purple",
      skill: "REST APIS"
    },
    { 
      name: locale === 'en' ? "Cybersecurity" : "Cibersegurança", 
      value: 75, 
      icon: <FaShieldAlt className="text-2xl" />,
      color: "red",
      skill: "CYBERSECURITY"
    },
    { 
      name: locale === 'en' ? "Problem Solving" : "Resolução de Problemas", 
      value: 95, 
      icon: <FaBrain className="text-2xl" />,
      color: "green",
      skill: "PERFORMANCE"
    },
    { 
      name: locale === 'en' ? "System Architecture" : "Arquitetura de Sistemas", 
      value: 80, 
      icon: <FaCode className="text-2xl" />,
      color: "amber",
      skill: "CLEAN ARCHITECTURE"
    },
    { 
      name: locale === 'en' ? "Innovation" : "Inovação", 
      value: 85, 
      icon: <FaLightbulb className="text-2xl" />,
      color: "yellow",
      skill: "AGILE"
    }
  ];

  // Principais conquistas/marcos da carreira
  const careerMilestones = [
    {
      year: "2025",
      achievement: locale === 'en' ? "Led a major data migration project involving 50TB+ of data" : "Liderou um grande projeto de migração de dados envolvendo mais de 50TB de dados",
      icon: <FaRocket className="text-blue-500" />
    },
    {
      year: "2024",
      achievement: locale === 'en' ? "Designed a scalable data pipeline used by major government agencies" : "Projetou um pipeline de dados escalável utilizado por grandes agências governamentais",
      icon: <FaDatabase className="text-purple-500" />
    },
    {
      year: "2023",
      achievement: locale === 'en' ? "Optimized ETL processes resulting in 70% performance improvement" : "Otimizou processos de ETL resultando em 70% de melhoria de desempenho",
      icon: <FaBolt className="text-amber-500" />
    },
    {
      year: "2022",
      achievement: locale === 'en' ? "Implemented an automated intrusion detection system" : "Implementou um sistema automatizado de detecção de intrusões",
      icon: <FaShieldAlt className="text-red-500" />
    },
    {
      year: "2021",
      achievement: locale === 'en' ? "Created a custom ML solution for financial data analysis" : "Criou uma solução personalizada de ML para análise de dados financeiros",
      icon: <FaBrain className="text-green-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0C0E] text-gray-800 dark:text-white">
      <Navigation locale={locale} />

      {/* Hero Section — sóbrio, tipografia como protagonista */}
      <section className="relative min-h-screen flex items-center overflow-hidden border-b border-gray-200 dark:border-gray-700/70">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="container mx-auto px-4 py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="lg:w-3/5 z-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4 pb-2 border-b border-gray-300 dark:border-gray-700">
              {t.home?.subtitle || "Data Engineering | Engenheiro de Dados"}
            </span>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 dark:text-white mb-6 leading-[1.05] tracking-tight">
              {t.home?.title || "Samuel Apolinário Arão"}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-xl leading-relaxed">
              {t.home?.description || "Profissional especializado em Engenharia de Dados e Backend Development, com experiência em Business Intelligence, ETL e soluções de Big Data. Graduado em Jogos Digitais pela PUC Minas e Licenciatura em Pedagogia pela UFMG, com pós-graduação em IA e MBA em Big Data."}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href={locale === "en" ? "/files/curriculo_en.pdf" : "/files/curriculo_pt.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 rounded-sm flex items-center gap-2 transition-colors text-sm font-medium tracking-wide"
              >
                <FaDownload /> {t.home?.downloadCV || "Baixar CV"}
              </a>

              <Link
                href={`/${locale}/projects`}
                className="px-6 py-3 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-800 dark:text-white border border-gray-400 dark:border-gray-600 rounded-sm flex items-center gap-2 transition-colors text-sm font-medium tracking-wide"
              >
                {t.home?.viewProjects || "Ver Projetos"} <FaArrowRight className="text-xs" />
              </Link>
            </div>

            <div className="flex gap-5 items-center">
              <button
                onClick={() => handleSocialClick('github')}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-900 hover:text-gray-900 dark:hover:border-white dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub />
              </button>
              <button
                onClick={() => handleSocialClick('linkedin')}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-900 hover:text-gray-900 dark:hover:border-white dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </button>
              <button
                onClick={() => handleSocialClick('email')}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-900 hover:text-gray-900 dark:hover:border-white dark:hover:text-white transition-colors"
                aria-label="Email"
              >
                <FaEnvelope />
              </button>
              <a
                href="https://wa.me/5531991442176"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-900 hover:text-gray-900 dark:hover:border-white dark:hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative lg:w-2/5 flex justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="hidden dark:block absolute inset-0 m-auto w-64 h-64 md:w-80 md:h-80 rounded-full bg-blue-500/10 blur-3xl -z-10" />
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 grayscale hover:grayscale-0 transition-all duration-700 ease-out">
              <Image
                src="/images/profile.jpg"
                alt={t.home?.profileAlt || "Foto de perfil de Samuel Apolinário Arão"}
                fill
                sizes="(max-width: 768px) 16rem, 20rem"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          onClick={scrollToExpertise}
          whileHover={{ y: 5 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">{t.home?.scrollDown || "Role para baixo"}</span>
            <FaChevronDown className="text-gray-400 dark:text-gray-600 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Expertise Section — grade sóbria, um único acento */}
      {/* Current Experience Section */}
      <section className="py-24 bg-[#FAF9F6] dark:bg-[#0B0C0E] relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="border border-gray-200 dark:border-gray-700/70 rounded-sm overflow-hidden bg-white dark:bg-[#14161A]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-[#171B24] dark:bg-gradient-to-br dark:from-[#16213A] dark:to-[#0B1220] p-8 md:p-12 text-white">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400">01</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold mt-2 mb-6">{t.home?.latestExperience || "Experiência Atual"}</h2>
                <div className="flex items-center mb-6">
                  <div className="border border-white/20 p-3 rounded-sm mr-4">
                    <FaBriefcase className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">MPMG</h3>
                    <p className="text-gray-400 text-sm">{locale === 'en' ? 'Senior Data Engineering' : 'Engenheiro de dados'}</p>
                  </div>
                </div>
                <div className="mb-6 text-sm text-gray-400 space-y-1.5">
                  <div>Minas Gerais, Brasil</div>
                  <div className="font-mono">{locale === 'en' ? 'September 2025 - Present' : 'Setembro de 2025 - Presente'}</div>
                </div>
                <Link
                  href={`/${locale}/about`}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-white border-b border-white/30 hover:border-white pb-0.5 transition-colors"
                >
                  <span>{t.home?.viewFullHistory || "Ver histórico completo"}</span>
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>

              <div className="md:w-2/3 p-8 md:p-12">
                <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
                  {locale === 'en' ? 'data engineering' : 'Engenheiro de dados'}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  <SkillsText
                    text={t.home?.currentExperienceDescription || "Atuando principalmente como Engenheiro de Dados, responsável pelo desenvolvimento e implementação de pipelines de dados, processos de ETL e construção de arquiteturas de dados escaláveis. Desenvolvimento de soluções de automação, projetos de integração de dados e APIs performáticas com foco em boas práticas e código limpo. Trabalho com grandes volumes de dados, incluindo iniciativas junto ao Ministério Público de Minas Gerais (MPMG)."}
                    locale={locale}
                  />
                </p>

                <h4 className="text-xs font-mono uppercase tracking-widest mb-4 text-gray-500 dark:text-gray-400">{t.home?.tools || "Ferramentas"}</h4>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge skill="PYTHON" category="languages" level="advanced" noLink={true}>Python</SkillBadge>
                  <SkillBadge skill="SQL" category="languages" level="intermediate" noLink={true}>SQL</SkillBadge>
                  <SkillBadge skill="APACHE AIRFLOW" category="data" level="intermediate" noLink={true}>Airflow</SkillBadge>
                  <SkillBadge skill="APACHE SPARK" category="data" level="advanced" noLink={true}>Spark</SkillBadge>
                  <SkillBadge skill="AWS" category="devops" level="beginner" noLink={true}>AWS</SkillBadge>
                  <SkillBadge skill="FASTAPI" category="web" level="intermediate" noLink={true}>FastAPI</SkillBadge>
                  <SkillBadge skill="DOCKER" category="devops" level="advanced" noLink={true}>Docker</SkillBadge>
                  <SkillBadge skill="APACHE HADOOP" category="data" level="advanced" noLink={true}>Hadoop</SkillBadge>
                  <SkillBadge skill="APACHE DRUID" category="data" level="intermediate" noLink={true}>Druid</SkillBadge>
                  <SkillBadge skill="APACHE NIFI" category="data" level="intermediate" noLink={true}>NiFi</SkillBadge>
                  <SkillBadge skill="WEB SCRAPING" category="data" level="advanced" noLink={true}>Web Scraping</SkillBadge>
                  <SkillBadge skill="POSTGRESQL" category="databases" level="advanced" noLink={true}>PostgreSQL</SkillBadge>
                  <SkillBadge skill="DATA ENGINEERING" category="data" level="intermediate" noLink={true}>Data Engineering</SkillBadge>
                  <SkillBadge skill="APACHE HIVE" category="data" level="intermediate" noLink={true}>Hive</SkillBadge>
                  <SkillBadge skill="DATA LAKES" category="data" level="intermediate" noLink={true}>Data Lakes</SkillBadge>
                  <SkillBadge skill="ELASTICSEARCH" category="databases" level="intermediate" noLink={true}>Elasticsearch</SkillBadge>
                  <SkillBadge skill="MICROSERVICES" category="architecture" level="intermediate" noLink={true}>Microservices</SkillBadge>
                  <SkillBadge skill="CI/CD" category="devops" level="intermediate" noLink={true}>CI/CD</SkillBadge>
                  <SkillBadge skill="JENKINS" category="devops" level="intermediate" noLink={true}>Jenkins</SkillBadge>
                  <SkillBadge skill="CLEAN ARCHITECTURE" category="architecture" level="intermediate" noLink={true}>Clean Architecture</SkillBadge>
                  <SkillBadge skill="TDD" category="architecture" level="intermediate" noLink={true}>TDD</SkillBadge>
                  <SkillBadge skill="LINUX" category="security" level="intermediate" noLink={true}>Linux</SkillBadge>
                  <SkillBadge skill="WEB SECURITY" category="security" level="intermediate" noLink={true}>Web Security</SkillBadge>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 bg-white dark:bg-[#101114] relative border-b border-gray-200 dark:border-gray-700/70">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-16 max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400">02</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mt-2">
              {t.home?.expertiseAreas || "Áreas de Especialização"}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-200 dark:border-gray-700/70">
            {[
              {
                icon: <SiApachespark />,
                title: t.home?.dataCategory || "Engenharia de Dados",
                description: t.home?.dataDescription || "Construção de pipelines de dados, ETL, Data Lakes e implementação de soluções com Big Data e processamento em larga escala.",
                badges: [
                  { href: `/${locale}/skills/data/apache-spark`, skill: "APACHE SPARK", category: "data", label: "Apache Spark" },
                  { href: `/${locale}/skills/data/etl`, skill: "ETL", category: "data", label: "ETL" },
                  { href: `/${locale}/skills/data/data-lakes`, skill: "DATA LAKES", category: "data", label: "Data Lakes" },
                ],
              },
              {
                icon: <SiPython />,
                title: t.home?.devCategory || "Desenvolvimento Backend",
                description: t.home?.devDescription || "Criação de APIs eficientes, aplicações web e ferramentas de automação com foco em performance e boas práticas.",
                badges: [
                  { href: `/${locale}/skills/languages/python`, skill: "PYTHON", category: "languages", label: "Python" },
                  { href: `/${locale}/skills/web/fastapi`, skill: "FASTAPI", category: "web", label: "FastAPI" },
                  { href: `/${locale}/skills/languages/go`, skill: "GO", category: "languages", label: "Go" },
                ],
              },
              {
                icon: <FaBrain />,
                title: t.home?.aiCategory || "Inteligência Artificial",
                description: t.home?.aiDescription || "Implementação de modelos de machine learning, processamento de linguagem natural e redes neurais.",
                badges: [
                  { href: `/${locale}/skills/ai/machine-learning`, skill: "MACHINE LEARNING", category: "ai", label: "Machine Learning" },
                  { href: `/${locale}/skills/ai/deep-learning`, skill: "DEEP LEARNING", category: "ai", label: "Deep Learning" },
                ],
              },
              {
                icon: <FaShieldAlt />,
                title: t.home?.securityCategory || "Cybersegurança",
                description: t.home?.securityDescription || "Implementação de práticas de segurança, análise de vulnerabilidades e proteção de dados e sistemas.",
                badges: [
                  { href: `/${locale}/skills/security/web-security`, skill: "WEB SECURITY", category: "security", label: "Web Security" },
                  { href: `/${locale}/skills/security/linux`, skill: "LINUX", category: "security", label: "Linux" },
                ],
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className="p-8 border-r border-b border-gray-200 dark:border-gray-700/70 group hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 flex items-center justify-center text-lg mb-6 group-hover:border-gray-900 dark:group-hover:border-white transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold mb-3 text-gray-900 dark:text-white">{card.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  <SkillsText text={card.description} locale={locale} />
                </p>
                <div className="flex flex-wrap gap-2">
                  {card.badges.map((b) => (
                    <Link key={b.skill} href={b.href}>
                      <SkillBadge skill={b.skill} category={b.category} level={getLocalizedSkillData(b.skill, locale).level as "advanced" | "beginner" | "intermediate" | "expert"} noLink={true}>{b.label}</SkillBadge>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-gray-200 dark:border-gray-700/70">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400">03</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mt-2 mb-4">
              {t.home?.ctaTitle || "Vamos trabalhar juntos?"}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8">
              {t.home?.ctaDescription || "Estou sempre aberto a novas oportunidades e desafios. Se você está procurando um profissional para ajudar em seu próximo projeto, entre em contato!"}
            </p>
            <a
              href="https://wa.me/5531991442176"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 rounded-sm font-medium text-sm tracking-wide transition-colors"
            >
              <FaWhatsapp /> {t.home?.contactMe || "Fale comigo"}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
