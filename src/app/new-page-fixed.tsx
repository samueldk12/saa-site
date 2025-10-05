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
  FaWhatsapp
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-white">
      <Navigation locale={locale} />
      
      <section className="container mx-auto px-4 pt-16 pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            className="lg:w-1/2 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.home?.title || "Samuel Apolinário Arão"}
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6">
              {t.home?.subtitle || "Assessor MPMG | Engenheiro de Dados Senior  | Desenvolvedor Back-end"}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl">
              {t.home?.description || "Profissional especializado em Engenharia de Dados e Backend Development, com experiência em Business Intelligence, ETL e soluções de Big Data. Apaixonado por resolver problemas complexos com tecnologia."}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href={locale === "en" ? "/files/curriculo_en.pdf" : "/files/curriculo_pt.pdf"} 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center gap-2 transition-colors"
              >
                <FaDownload /> {t.home?.downloadCV || "Baixar CV"}
              </a>
              
              <Link
                href={`/${locale}/projects`}
                className="px-6 py-3 bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-full flex items-center gap-2 transition-colors"
              >
                <FaArrowRight /> {t.home?.viewProjects || "Ver Projetos"}
              </Link>
            </div>
            
            <div className="flex mt-8 gap-4">
              <a 
                href="https://github.com/samueldk12" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a 
                href="https://www.linkedin.com/in/samuel-arao/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              <a 
                href="mailto:samuel.arao@gmail.com" 
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl"
              >
                samuel.arao@gmail.com
              </a>
              <a 
                href="https://wa.me/5531991442176" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FaWhatsapp className="text-2xl" />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
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
      </section>
      
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">{t.home?.expertiseAreas || "Áreas de Especialização"}</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-3 rounded-full inline-block mb-4">
                <FaDatabase className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.home?.dataCategory || "Engenharia de Dados"}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.home?.dataDescription || "Construção de pipelines de dados, ETL, Data Lakes e implementação de soluções com Big Data e processamento em larga escala."}
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-full inline-block mb-4">
                <FaServer className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.home?.devCategory || "Desenvolvimento Backend"}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.home?.devDescription || "Criação de APIs eficientes, aplicações web e ferramentas de automação com foco em performance e boas práticas."}
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-3 rounded-full inline-block mb-4">
                <FaRobot className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.home?.gameCategory || "Inteligência Artificial"}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.home?.gameDescription || "Implementação de modelos de machine learning, processamento de linguagem natural e redes neurais."}
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-full inline-block mb-4">
                <FaShieldAlt className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.home?.securityCategory || "Cybersegurança"}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.home?.securityDescription || "Implementação de práticas de segurança, análise de vulnerabilidades e proteção de dados e sistemas."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-4 rounded-full">
              <FaBriefcase className="text-4xl" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-2">{t.home?.latestExperience || "Experiência Atual"}</h2>
              <h3 className="text-xl text-gray-700 dark:text-gray-300 font-medium mb-3">Kriptos</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t.home?.currentJobDescription || "Responsável pelo desenvolvimento e implementação de soluções de Business Intelligence, otimização de processos de ETL e análise de dados para suporte à tomada de decisões na Kriptos."}
              </p>
              <Link 
                href={`/${locale}/about`}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
              >
                {t.home?.viewFullHistory || "Ver histórico completo"} <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
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
            <h2 className="text-3xl font-bold mb-4">{t.projects?.title || "Meus Projetos"}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.projects?.subtitle || "Uma seleção dos meus trabalhos em desenvolvimento de software e engenharia de dados"}
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
                <h3 className="text-xl font-bold mb-2">{t.projects?.proxy?.title || "FastAPI Proxy System"}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t.projects?.proxy?.description || "Sistema de proxy em FastAPI para web scraping com gerenciamento de sessões e rotação de IPs"}
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
                <h3 className="text-xl font-bold mb-2">{t.projects?.api_arquitetura_hexagonal?.title || "API Arquitetura Hexagonal"}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t.projects?.api_arquitetura_hexagonal?.description || "API REST com arquitetura hexagonal em TypeScript, demonstrando princípios de design limpo e testabilidade"}
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
                <h3 className="text-xl font-bold mb-2">{t.projects?.lunar?.title || "Lunar Land AI"}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t.projects?.lunar?.description || "Projeto de inteligência artificial que utiliza aprendizado por reforço para pousar uma nave lunar"}
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
              {t.home?.viewProjects || "Ver Projetos"} <FaArrowRight />
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
              <FaWhatsapp className="text-xl" /> Fale comigo
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
