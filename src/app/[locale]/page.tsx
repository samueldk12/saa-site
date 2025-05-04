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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-white">
      <Navigation locale={locale} />
      
      {/* Hero Section - Full Height */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-950 -z-10"></div>
        
        {/* Abstract shapes */}
        <div className="absolute -z-5 top-1/4 left-10 w-72 h-72 bg-gradient-to-r from-blue-300/20 to-purple-300/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -z-5 bottom-1/4 right-10 w-80 h-80 bg-gradient-to-r from-indigo-300/20 to-pink-300/20 dark:from-indigo-500/10 dark:to-pink-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="lg:w-1/2 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              {t.home?.title || "Samuel Apolinário Arão"}
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-6 font-light">
              {t.home?.subtitle || "Consultor BI Senior | Engenheiro de Dados"}
            </h2>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl leading-relaxed">
              {t.home?.description || "Profissional especializado em Engenharia de Dados e Backend Development, com experiência em Business Intelligence, ETL e soluções de Big Data. Graduado em Jogos Digitais pela PUC Minas e Licenciatura em Pedagogia pela UFMG, com pós-graduação em IA e MBA em Big Data."}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <a 
                href={locale === "en" ? "/files/curriculo_en.pdf" : "/files/curriculo_pt.pdf"} 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full flex items-center gap-2 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <FaDownload /> {t.home?.downloadCV || "Baixar CV"}
              </a>
              
              <Link
                href={`/${locale}/projects`}
                className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-full flex items-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
              >
                <FaArrowRight /> {t.home?.viewProjects || "Ver Projetos"}
              </Link>
            </div>
            
            <div className="flex gap-6 items-center">
              <button 
                onClick={() => handleSocialClick('github')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110 duration-200"
                aria-label="GitHub"
              >
                <FaGithub className="text-3xl" />
              </button>
              <button 
                onClick={() => handleSocialClick('linkedin')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110 duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-3xl" />
              </button>
              <button 
                onClick={() => handleSocialClick('email')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110 duration-200"
                aria-label="Email"
              >
                <FaEnvelope className="text-3xl" />
              </button>
              <a 
                href="https://wa.me/5531991442176" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110 duration-200"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-3xl" />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 flex justify-center z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
              <Image 
                src="/images/profile.jpg" 
                alt={t.home?.profileAlt || "Foto de perfil de Samuel Apolinário Arão"}
                fill
                sizes="(max-width: 768px) 18rem, 24rem"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20"></div>
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
            <span className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.home?.scrollDown || "Role para baixo"}</span>
            <FaChevronDown className="text-blue-500 dark:text-blue-400 animate-bounce text-2xl" />
          </div>
        </motion.div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-20 bg-white dark:bg-gray-800/80 relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#2a2a3c_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 inline-block">
              {t.home?.expertiseAreas || "Áreas de Especialização"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Data Engineering Card */}
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="p-8">
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <SiApachespark className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t.home?.dataCategory || "Engenharia de Dados"}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <SkillsText 
                    text={t.home?.dataDescription || "Construção de pipelines de dados, ETL, Data Lakes e implementação de soluções com Big Data e processamento em larga escala."} 
                    locale={locale}
                  />
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link href={`/${locale}/skills/data/apache-spark`}>
                    <SkillBadge skill="APACHE SPARK" category="data" level={getLocalizedSkillData("APACHE SPARK", locale).level as "advanced" | "beginner" | "intermediate" | "expert"} noLink={true}>Apache Spark</SkillBadge>
                  </Link>
                  <Link href={`/${locale}/skills/data/etl`}>
                    <SkillBadge skill="ETL" category="data" level={getLocalizedSkillData("ETL", locale).level as "advanced" | "beginner" | "intermediate" | "expert"} noLink={true}>ETL</SkillBadge>
                  </Link>
                  <Link href={`/${locale}/skills/data/data-lakes`}>
                    <SkillBadge skill="DATA LAKES" category="data" level={getLocalizedSkillData("DATA LAKES", locale).level as "advanced" | "beginner" | "intermediate" | "expert"} noLink={true}>Data Lakes</SkillBadge>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Backend Development Card */}
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="h-2 bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
              <div className="p-8">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <SiPython className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t.home?.devCategory || "Desenvolvimento Backend"}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <SkillsText 
                    text={t.home?.devDescription || "Criação de APIs eficientes, aplicações web e ferramentas de automação com foco em performance e boas práticas."}
                    locale={locale}
                  />
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link href={`/${locale}/skills/languages/python`}>
                    <SkillBadge skill="PYTHON" category="languages" level={getLocalizedSkillData("PYTHON", locale).level as "advanced" | "beginner" | "intermediate" | "expert"} noLink={true}>Python</SkillBadge>
                  </Link>
                  <Link href={`/${locale}/skills/web/fastapi`}>
                    <SkillBadge skill="FASTAPI" category="web" level={getLocalizedSkillData("FASTAPI", locale).level as "advanced" | "beginner" | "intermediate" | "expert"} noLink={true}>FastAPI</SkillBadge>
                  </Link>
                  <Link href={`/${locale}/skills/languages/go`}>
                    <SkillBadge skill="GO" category="languages" level={getLocalizedSkillData("GO", locale).level as "advanced" | "beginner" | "intermediate" | "expert"} noLink={true}>Go</SkillBadge>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* AI Card */}
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="h-2 bg-gradient-to-r from-purple-400 to-purple-600"></div>
              <div className="p-8">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaBrain className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t.home?.aiCategory || "Inteligência Artificial"}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <SkillsText 
                    text={t.home?.aiDescription || "Implementação de modelos de machine learning, processamento de linguagem natural e redes neurais."}
                    locale={locale}
                  />
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link href={`/${locale}/skills/ai/machine-learning`}>
                    <SkillBadge skill="MACHINE LEARNING" category="ai" level={getLocalizedSkillData("MACHINE LEARNING", locale).level as "advanced" | "beginner" | "intermediate" | "expert"} noLink={true}>Machine Learning</SkillBadge>
                  </Link>
                  <Link href={`/${locale}/skills/ai/deep-learning`}>
                    <SkillBadge skill="DEEP LEARNING" category="ai" level={getLocalizedSkillData("DEEP LEARNING", locale).level as "advanced" | "beginner" | "intermediate" | "expert"} noLink={true}>Deep Learning</SkillBadge>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Security Card */}
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="h-2 bg-gradient-to-r from-gray-400 to-gray-600"></div>
              <div className="p-8">
                <div className="bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaShieldAlt className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t.home?.securityCategory || "Cybersegurança"}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <SkillsText 
                    text={t.home?.securityDescription || "Implementação de práticas de segurança, análise de vulnerabilidades e proteção de dados e sistemas."}
                    locale={locale}
                  />
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link href={`/${locale}/skills/security/web-security`}>
                    <SkillBadge skill="WEB SECURITY" category="security" level={getLocalizedSkillData("WEB SECURITY", locale).level as "advanced" | "beginner" | "intermediate" | "expert"} noLink={true}>Web Security</SkillBadge>
                  </Link>
                  <Link href={`/${locale}/skills/security/linux`}>
                    <SkillBadge skill="LINUX" category="security" level={getLocalizedSkillData("LINUX", locale).level as "advanced" | "beginner" | "intermediate" | "expert"} noLink={true}>Linux</SkillBadge>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Current Experience Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-white dark:bg-gray-800/80 -mt-12 rounded-b-[50%] z-10"></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 p-8 md:p-12 text-white">
                <h2 className="text-3xl font-bold mb-6">{t.home?.latestExperience || "Experiência Atual"}</h2>
                <div className="flex items-center mb-6">
                  <div className="bg-white/20 p-4 rounded-xl mr-4">
                    <FaBriefcase className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Kriptos</h3>
                    <p className="text-blue-100">{locale === 'en' ? 'Senior BI Consultant' : 'Consultor BI Senior'}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 rounded-full bg-white mr-2"></div>
                    <span>Minas Gerais, Brasil</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-white mr-2"></div>
                    <span>{locale === 'en' ? 'April 2025 - Present' : 'abril de 2025 - Presente'}</span>
                  </div>
                </div>
                <Link
                  href={`/${locale}/about`}
                  className="mt-6 inline-flex items-center gap-2 text-white hover:text-blue-100 transition-colors"
                >
                  <span>{t.home?.viewFullHistory || "Ver histórico completo"}</span>
                  <FaArrowRight className="text-sm" />
                </Link>
              </div>
              
              <div className="md:w-2/3 p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  {locale === 'en' ? 'Senior BI Consultant' : 'Consultor BI Senior'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  <SkillsText 
                    text={t.home?.currentExperienceDescription || "Atuando principalmente como Engenheiro de Dados, responsável pelo desenvolvimento e implementação de pipelines de dados, processos de ETL e construção de arquiteturas de dados escaláveis. Desenvolvimento de soluções de automação, projetos de integração de dados e APIs performáticas com foco em boas práticas e código limpo. Trabalho com grandes volumes de dados, incluindo iniciativas junto ao Ministério Público de Minas Gerais (MPMG)."}
                    locale={locale}
                  />
                </p>
                
                <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">{t.home?.tools || "Ferramentas"}</h4>
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

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">{t.home?.ctaTitle || "Vamos trabalhar juntos?"}</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              {t.home?.ctaDescription || "Estou sempre aberto a novas oportunidades e desafios. Se você está procurando um profissional para ajudar em seu próximo projeto, entre em contato!"}
            </p>
            <a 
              href="https://wa.me/5531991442176"
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              <FaWhatsapp className="text-xl" /> {locale === 'en' ? 'Contact Me' : 'Fale comigo'}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
