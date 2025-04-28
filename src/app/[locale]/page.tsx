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
  FaChevronDown
} from 'react-icons/fa';
import { SiApachespark, SiApacheairflow, SiPostgresql, SiElasticsearch, SiGo, SiPython, SiTypescript } from 'react-icons/si';
import { useState, useEffect } from 'react';
import { Testimonial } from '@/models/Testimonial';

export default function Home() {
  const params = useParams();
  const locale = params.locale as string;
  const t = getTranslations(locale);
  const [topTestimonials, setTopTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Buscar os depoimentos mais votados
  useEffect(() => {
    async function fetchTopTestimonials() {
      try {
        const response = await fetch('/api/testimonials');
        if (!response.ok) throw new Error('Falha ao buscar depoimentos');
        const data = await response.json();
        
        // Ordenar por votos e pegar os 2 mais votados
        const sortedTestimonials = [...data].sort((a, b) => b.votes - a.votes).slice(0, 2);
        setTopTestimonials(sortedTestimonials);
      } catch (error) {
        console.error('Erro ao buscar depoimentos:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTopTestimonials();

    // Adicionar efeito de scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const scrollToExpertise = () => {
    const expertiseSection = document.getElementById("expertise");
    if (expertiseSection) {
      expertiseSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-white">
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
              <a 
                href="https://github.com/samueldk12" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110 duration-200"
                aria-label="GitHub"
              >
                <FaGithub className="text-3xl" />
              </a>
              <a 
                href="https://www.linkedin.com/in/samuel-arao/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110 duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-3xl" />
              </a>
              <a 
                href="mailto:samuel.arao@gmail.com" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110 duration-200"
                aria-label="Email"
              >
                <FaEnvelope className="text-3xl" />
              </a>
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
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Data Engineering Card */}
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="p-8">
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaDatabase className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t.home?.dataCategory || "Engenharia de Dados"}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.home?.dataDescription || "Construção de pipelines de dados, ETL, Data Lakes e implementação de soluções com Big Data e processamento em larga escala."}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">Apache Spark</span>
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">ETL</span>
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">Data Lakes</span>
                </div>
              </div>
            </motion.div>
            
            {/* Backend Development Card */}
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="h-2 bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
              <div className="p-8">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaServer className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t.home?.devCategory || "Desenvolvimento Backend"}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.home?.devDescription || "Criação de APIs eficientes, aplicações web e ferramentas de automação com foco em performance e boas práticas."}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">Node.js</span>
                  <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">FastAPI</span>
                  <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">REST APIs</span>
                </div>
              </div>
            </motion.div>
            
            {/* AI Card */}
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="h-2 bg-gradient-to-r from-purple-400 to-purple-600"></div>
              <div className="p-8">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaRobot className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t.home?.gameCategory || "Inteligência Artificial"}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.home?.gameDescription || "Implementação de modelos de machine learning, processamento de linguagem natural e redes neurais."}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">Machine Learning</span>
                  <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">NLP</span>
                  <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">Python</span>
                </div>
              </div>
            </motion.div>
            
            {/* Cybersecurity Card */}
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="h-2 bg-gradient-to-r from-gray-400 to-gray-600"></div>
              <div className="p-8">
                <div className="bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaShieldAlt className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t.home?.securityCategory || "Cybersegurança"}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.home?.securityDescription || "Implementação de práticas de segurança, análise de vulnerabilidades e proteção de dados e sistemas."}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">Penetration Testing</span>
                  <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">XSS</span>
                  <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">OWASP</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
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
                    <p className="text-blue-100">Senior BI Consultant</p>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 rounded-full bg-white mr-2"></div>
                    <span>Minas Gerais, Brasil</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-white mr-2"></div>
                    <span>{locale === 'en' ? 'April 2025 - Present' : 
                           locale === 'es' ? 'Abril 2025 - Presente' : 
                           'abril de 2025 - Presente'}</span>
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
                  {locale === 'en' ? 'Senior BI Consultant' : 
                   locale === 'es' ? 'Consultor BI Senior' : 
                   'Consultor BI Senior'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {t.home?.currentJobDescription || (
                    locale === 'en' 
                      ? "Responsible for developing and implementing Business Intelligence solutions, optimizing ETL processes, and data analysis to support decision-making at Kriptos."
                      : locale === 'es'
                        ? "Responsable del desarrollo e implementación de soluciones de Business Intelligence, optimización de procesos ETL y análisis de datos para apoyar la toma de decisiones en Kriptos."
                        : "Responsável pelo desenvolvimento e implementação de soluções de Business Intelligence, otimização de processos de ETL e análise de dados para suporte à tomada de decisões na Kriptos."
                  )}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-xl">
                    <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">
                      {locale === 'en' ? 'Tools' : 
                       locale === 'es' ? 'Herramientas' : 
                       'Ferramentas'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg text-xs font-medium">Apache Spark</span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg text-xs font-medium">Power BI</span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg text-xs font-medium">Python</span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg text-xs font-medium">SQL</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-xl">
                    <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">
                      {locale === 'en' ? 'Responsibilities' : 
                       locale === 'es' ? 'Responsabilidades' : 
                       'Responsabilidades'}
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm">
                      <li>{locale === 'en' ? 'Dashboard development' : 
                          locale === 'es' ? 'Desarrollo de dashboards' : 
                          'Desenvolvimento de dashboards'}</li>
                      <li>{locale === 'en' ? 'Data modeling' : 
                          locale === 'es' ? 'Modelado de datos' : 
                          'Modelagem de dados'}</li>
                      <li>{locale === 'en' ? 'Process automation' : 
                          locale === 'es' ? 'Automatización de procesos' : 
                          'Automação de processos'}</li>
                      <li>{locale === 'en' ? 'Data analysis' : 
                          locale === 'es' ? 'Análisis de datos' : 
                          'Análise de dados'}</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border-l-4 border-indigo-500 dark:border-indigo-400">
                  <p className="text-indigo-700 dark:text-indigo-300 italic">
                    {locale === 'en' 
                      ? "I analyze, process, and transform large volumes of data into actionable insights that help the company make data-driven strategic decisions."
                      : locale === 'es'
                        ? "Analizo, proceso y transformo grandes volúmenes de datos en conocimientos accionables que ayudan a la empresa a tomar decisiones estratégicas basadas en datos."
                        : "Analiso, processo e transformo grandes volumes de dados em insights acionáveis que auxiliam a empresa a tomar decisões estratégicas baseadas em dados."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          {!isLoading && topTestimonials.length > 0 && (
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">
                {locale === 'en' ? 'What People Say' : locale === 'es' ? 'Lo Que Dicen de Mí' : 'O Que Dizem Sobre Mim'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {topTestimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 relative overflow-hidden"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <FaQuoteLeft className="text-blue-300 dark:text-blue-500 opacity-20 text-4xl absolute top-6 left-6" />
                    
                    <div className="mt-6 mb-8 relative z-10">
                      <p className="text-gray-700 dark:text-gray-300 italic">
                        "{testimonial.testimonial}"
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.position}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 flex items-center">
                      <span className="flex items-center gap-1 text-gray-400">
                        <FaThumbsUp />
                        <span className="text-sm font-medium">{testimonial.votes}</span>
                      </span>
                    </div>
                    
                    <FaQuoteRight className="text-blue-300 dark:text-blue-500 opacity-20 text-4xl absolute bottom-6 right-6" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">{t.projects?.title || (locale === 'en' ? "My Projects" : locale === 'es' ? "Mis Proyectos" : "Meus Projetos")}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.projects?.subtitle || (locale === 'en' ? "A selection of my work in software development and data engineering" : locale === 'es' ? "Una selección de mi trabajo en desarrollo de software e ingeniería de datos" : "Uma seleção dos meus trabalhos em desenvolvimento de software e engenharia de dados")}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <FaDatabase className="text-2xl text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{t.projects?.proxy?.title || (locale === 'en' ? "FastAPI Proxy System" : locale === 'es' ? "Sistema Proxy FastAPI" : "Sistema Proxy FastAPI")}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t.projects?.proxy?.description || (locale === 'en' ? "FastAPI proxy system for web scraping with session management and IP rotation" : locale === 'es' ? "Sistema proxy FastAPI para web scraping con gestión de sesiones y rotación de IP" : "Sistema de proxy em FastAPI para web scraping com gerenciamento de sessões e rotação de IPs")}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">Python</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">FastAPI</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">Redis</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-2 bg-gradient-to-r from-green-500 to-green-700"></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <SiTypescript className="text-2xl text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{t.projects?.api_arquitetura_hexagonal?.title || (locale === 'en' ? "Hexagonal Architecture API" : locale === 'es' ? "API con Arquitectura Hexagonal" : "API Arquitetura Hexagonal")}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t.projects?.api_arquitetura_hexagonal?.description || (locale === 'en' ? "REST API with hexagonal architecture in TypeScript, demonstrating clean design principles and testability" : locale === 'es' ? "API REST con arquitectura hexagonal en TypeScript, demostrando principios de diseño limpio y testabilidad" : "API REST com arquitetura hexagonal em TypeScript, demonstrando princípios de design limpo e testabilidade")}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">TypeScript</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">Node.js</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">MongoDB</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-700"></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <SiPython className="text-2xl text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{t.projects?.lunar?.title || (locale === 'en' ? "Lunar Land AI" : locale === 'es' ? "IA de Aterrizaje Lunar" : "Lunar Land AI")}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t.projects?.lunar?.description || (locale === 'en' ? "Artificial intelligence project that uses reinforcement learning to land a lunar module" : locale === 'es' ? "Proyecto de inteligencia artificial que utiliza aprendizaje por refuerzo para aterrizar un módulo lunar" : "Projeto de inteligência artificial que utiliza aprendizado por reforço para pousar uma nave lunar")}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">Python</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">PyTorch</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">RL</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link 
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
            >
              {t.home?.viewProjects || (locale === 'en' ? "View Projects" : locale === 'es' ? "Ver Proyectos" : "Ver Projetos")} <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
              <FaWhatsapp className="text-xl" /> {locale === 'en' ? 'Contact Me' : 
                                                  locale === 'es' ? 'Contáctame' : 
                                                  'Fale comigo'}
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
