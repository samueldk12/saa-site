"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getTranslations } from "@/lib/getTranslations";
import Navigation from "@/components/Navigation";
import { 
  FaCode, 
  FaDatabase as FaDatabaseIcon, 
  FaShieldAlt, 
  FaGithub, 
  FaLinkedin, 
  FaServer, 
  FaPython, 
  FaDocker, 
  FaLaptopCode,
  FaDownload,
  FaEnvelope,
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
  FaRocket,
  FaCertificate,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaPhone,
  FaPlus,
  FaMinus
} from "react-icons/fa";
import { SiApachespark, SiApacheairflow, SiPostgresql, SiElasticsearch, SiGo, SiPython, SiTypescript } from 'react-icons/si';
import Link from 'next/link';
import SkillsText from '@/components/SkillsText';
import { useState, useRef, useEffect } from 'react';

// Interfaces para tipagem
interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  focus: string;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
  credential?: string;
  certificate_url?: string;
}

interface TranslationType {
  about?: {
    title?: string;
    description?: string;
    view_certificate?: string;
    // ... outros campos de tradução
  };
  skills?: Record<string, string>;
}

interface ExperienceCardProps {
  experience: Experience;
  t: TranslationType;
  locale: string;
}

interface EducationCardProps {
  education: Education;
  t: TranslationType;
}

interface CertificationCardProps {
  certification: Certification;
  t: TranslationType;
}

export default function About() {
  const params = useParams();
  const locale = params.locale as string;
  const t = getTranslations(locale);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(null);
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<{ type: string; data: any } | null>(null);
  const [timelineZoom, setTimelineZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleTimelineItemClick = (index: number) => {
    setActiveTimelineItem(activeTimelineItem === index ? null : index);
  };

  const workExperience = [
    {
      company: "MPMG",
      position: locale === 'en' ? "Data Engineering" : "Engenheiro de dados",
      period: locale === 'en' ? "September 2025 - Present" : "Setembro de 2025 - Presente",
      description: locale === 'en' 
        ? "Working primarily as a Data Engineer, responsible for developing and implementing data pipelines, ETL processes, and building scalable data architecture. Creating automation solutions, data integration projects and high-performance APIs with focus on best practices and clean code. Working with large data volumes, including initiatives with the Public Ministry of Minas Gerais (MPMG)."
        : "Atuando principalmente como Engenheiro de Dados, responsável pelo desenvolvimento e implementação de pipelines de dados, processos de ETL e construção de arquiteturas de dados escaláveis. Desenvolvimento de soluções de automação, projetos de integração de dados e APIs performáticas com foco em boas práticas e código limpo. Trabalho com grandes volumes de dados, incluindo iniciativas junto ao Ministério Público de Minas Gerais (MPMG).",
      technologies: ["Python", "SQL", "Apache Airflow", "Apache Spark", "AWS", "FastAPI", "Docker", "Apache Hadoop", "Apache Druid", "Apache NiFi", "Web Scraping", "PostgreSQL", "Data Engineering", "Apache Hive", "Data Lakes", "Elasticsearch", "Microservices", "CI/CD", "Jenkins", "Clean Architecture", "TDD", "Linux", "Web Security"]
    },
    {
      company: "Kriptos",
      position: locale === 'en' ? "Senior BI Consultant" : "Consultor BI Senior",
      period: locale === 'en' ? "April 2025 - September 2025" : "abril de 2025 - setembro 2025",
      description: locale === 'en' 
        ? "Working primarily as a Data Engineer, responsible for developing and implementing data pipelines, ETL processes, and building scalable data architecture. Creating automation solutions, data integration projects and high-performance APIs with focus on best practices and clean code. Working with large data volumes, including initiatives with the Public Ministry of Minas Gerais (MPMG)."
        : "Atuando principalmente como Engenheiro de Dados, responsável pelo desenvolvimento e implementação de pipelines de dados, processos de ETL e construção de arquiteturas de dados escaláveis. Desenvolvimento de soluções de automação, projetos de integração de dados e APIs performáticas com foco em boas práticas e código limpo. Trabalho com grandes volumes de dados, incluindo iniciativas junto ao Ministério Público de Minas Gerais (MPMG).",
      technologies: ["Python", "SQL", "Apache Airflow", "Apache Spark", "AWS", "FastAPI", "Docker", "Apache Hadoop", "Apache Druid", "Apache NiFi", "Web Scraping", "PostgreSQL", "Data Engineering", "Apache Hive", "Data Lakes", "Elasticsearch", "Microservices", "CI/CD", "Jenkins", "Clean Architecture", "TDD", "Linux", "Web Security"]
    },
    {
      company: "TO Brasil",
      position: locale === 'en' ? "System Analyst" : "Analista de sistema Pleno",
      period: locale === 'en' ? "January 2021 - March 2025" : "janeiro de 2021 - março de 2025",
      description: locale === 'en'
        ? "Responsible for designing and implementing data pipelines, ETL systems, and integration of various data sources for analysis and visualization. Development of automation projects, data integration solutions and high-performance APIs with focus on optimization and clean code."
        : "Responsável por projetar e implementar pipelines de dados, sistemas ETL e integração de diversas fontes de dados para análise e visualização. Desenvolvimento de projetos de automação, soluções de integração de dados e APIs performáticas com foco em otimização e código limpo.",
      technologies: ["Python", "SQL", "Apache Airflow", "Apache Spark", "FastAPI", "Docker", "Apache Hadoop", "Apache Druid", "Apache NiFi", "Web Scraping", "PostgreSQL", "Data Engineering", "Apache Hive", "Data Lakes", "Elasticsearch", "Microservices", "CI/CD", "Jenkins", "Clean Architecture", "TDD", "Linux", "Web Security"]
    },
    {
      company: "4mti",
      position: locale === 'en' ? "Software Developer" : "Desenvolvedor de software",
      period: locale === 'en' ? "February 2023 - October 2023" : "fevereiro de 2023 - outubro de 2023",
      description: locale === 'en'
        ? "Development of web applications and APIs using modern backend and frontend technologies. Implementation of machine learning models for data analysis and predictions."
        : "Desenvolvimento de aplicações web e APIs utilizando tecnologias modernas de backend e frontend. Implementação de modelos de machine learning para análise de dados e previsões.",
      technologies: ["Node.js", "React", "MongoDB", "PostgreSQL", "Docker", "PHP", "Python", "Apache Hadoop", "Apache Spark", "ETL", "Web Scraping", "Machine Learning", "Deep Learning", "Computer Vision", "NLP"]
    },
    {
      company: "4mti",
      position: locale === 'en' ? "Data Scientist" : "Cientista de dados",
      period: locale === 'en' ? "October 2020 - January 2021" : "outubro de 2020 - janeiro de 2021",
      description: locale === 'en'
        ? "Data analysis, development of machine learning models, and implementation of ETL pipelines. Creation of computer vision and natural language processing solutions."
        : "Análise de dados, desenvolvimento de modelos de machine learning e implementação de pipelines de ETL. Criação de soluções de visão computacional e processamento de linguagem natural.",
      technologies: ["Python", "Apache Hadoop", "Apache Spark", "PostgreSQL", "ETL", "Web Scraping", "PHP", "Node.js", "React", "MongoDB", "Docker", "Machine Learning", "Deep Learning", "Computer Vision", "NLP"]
    },
    {
      company: "4mti",
      position: locale === 'en' ? "Developer" : "Desenvolvedor",
      period: locale === 'en' ? "July 2020 - October 2020" : "julho de 2020 - outubro de 2020",
      description: locale === 'en'
        ? "Development of web applications and crawling systems for data collection. Implementation of machine learning algorithms for classification and analysis of collected data."
        : "Desenvolvimento de aplicações web e sistemas de crawling para coleta de dados. Implementação de algoritmos de machine learning para classificação e análise de dados coletados.",
      technologies: ["React.js", "Node.js", "ETL", "Apache Spark", "Web Scraping", "PHP", "Python", "Apache Hadoop", "MongoDB", "PostgreSQL", "Docker", "Machine Learning", "Deep Learning"]
    },
    {
      company: "RemOpt",
      position: locale === 'en' ? "Development Intern" : "Estagiário em desenvolvimento",
      period: locale === 'en' ? "December 2019 - June 2020" : "dezembro de 2019 - junho de 2020",
      description: locale === 'en'
        ? "Development of web applications, intranet maintenance, security testing, and backend development."
        : "Desenvolvimento de aplicações web, manutenção de intranet, testes de segurança e desenvolvimento back-end.",
      technologies: ["PHP", "jQuery", "MySQL", "HTML", "CSS", "Bootstrap"]
    }
  ];

  const certifications = [
    {
      name: locale === 'en' ? "React Fundamentals" : "Fundamentos do React",
      issuer: "Rocketseat",
      year: "2025",
      credential: "6d3d7c18-cff8-4473-acd4-8231e577a4a4",
      certificate_url: "https://app.rocketseat.com.br/certificates/6d3d7c18-cff8-4473-acd4-8231e577a4a4"
    },
    {
      name: locale === 'en' ? "Express SOLID Course" : "Curso de SOLID Express",
      issuer: "Full Cycle",
      year: "2024",
      credential: "d8567dcf-c7bd-484e-9678-fb4ea3aec43f",
      certificate_url: "https://fullcycle.com.br/certificado/d8567dcf-c7bd-484e-9678-fb4ea3aec43f"
    },
    {
      name: locale === 'en' ? "Python and Object-Oriented Programming" : "Formação Python e Orientação a Objetos",
      issuer: "Alura",
      year: "2022",
      credential: "3a85f507-74dd-4275-8d9e-0fc8f6356542",
      certificate_url: "https://cursos.alura.com.br/degree/certificate/3a85f507-74dd-4275-8d9e-0fc8f6356542"
    },
    {
      name: locale === 'en' ? "Git and GitHub: Control and Share Your Code" : "Git e GitHub: Controle e Compartilhe seu Código",
      issuer: "Alura",
      year: "2022",
      credential: "9d5dab14-d2cf-4942-a4a6-6018eac7c127",
      certificate_url: "https://cursos.alura.com.br/certificate/9d5dab14-d2cf-4942-a4a6-6018eac7c127"
    },
    {
      name: locale === 'en' ? "Linux I: Knowing and Using the Terminal" : "Linux I: Conhecendo e Utilizando o Terminal",
      issuer: "Alura",
      year: "2021",
      credential: "7dbaff44-7c90-42c7-a6a0-5ffd876f04c3",
      certificate_url: "https://cursos.alura.com.br/certificate/7dbaff44-7c90-42c7-a6a0-5ffd876f04c3"
    },
    {
      name: locale === 'en' ? "Linux II: Programs, Processes and Packages" : "Linux II: Programas, Processos e Pacotes",
      issuer: "Alura",
      year: "2021",
      credential: "8bcc484e-a2e7-46d6-a79a-56a3ed4c3834",
      certificate_url: "https://cursos.alura.com.br/certificate/8bcc484e-a2e7-46d6-a79a-56a3ed4c3834"
    },
    {
      name: locale === 'en' ? "Data Engineering: Introduction to Apache Airflow" : "Engenharia de Dados: Conhecendo Apache Airflow",
      issuer: "Alura",
      year: "2022",
      credential: "d4c49d0f-8d45-4828-9f71-acb83ba6bb4e",
      certificate_url: "https://cursos.alura.com.br/certificate/d4c49d0f-8d45-4828-9f71-acb83ba6bb4e"
    },
    {
      name: locale === 'en' ? "Docker DCA Certification Course" : "Formação Certificação Docker DCA",
      issuer: "Alura",
      year: "2022",
      credential: "2b917d53-690c-4046-a539-e3f732c1344b",
      certificate_url: "https://cursos.alura.com.br/degree/certificate/2b917d53-690c-4046-a539-e3f732c1344b"
    },
    {
      name: "GoStack 14",
      issuer: "Rocketseat",
      year: "2021",
      credential: "ed3d059f-1efa-4eb4-9684-050116ef38b8",
      expiry: "2022",
      certificate_url: "https://app.rocketseat.com.br/api/certificates/pdf/ed3d059f-1efa-4eb4-9684-050116ef38b8"
    },
    {
      name: locale === 'en' ? "From Bug to Bounty" : "Do Bug ao Bounty",
      issuer: locale === 'en' ? "Certificate in Security" : "Certificado em Segurança",
      year: "2022",
      certificate_url: "#"
    }
  ];

  const education = [
    {
      degree: locale === 'en' ? "MBA in Big Data and Competitive Intelligence" : "MBA em Big Data e Inteligência Competitiva",
      institution: "Descomplica",
      period: "2023 - 2024",
      focus: locale === 'en' ? "Big Data, Business Intelligence, Data Analytics" : "Big Data, Business Intelligence, Data Analytics"
    },
    {
      degree: locale === 'en' ? "Postgraduate in Artificial Intelligence" : "Pós-Graduação em Inteligência Artificial",
      institution: "PUC Minas",
      period: "2021 - 2022",
      focus: locale === 'en' ? "Artificial Intelligence, Machine Learning, Neural Networks" : "Inteligência Artificial, Machine Learning, Redes Neurais"
    },
    {
      degree: locale === 'en' ? "Bachelor's in Pedagogy" : "Licenciatura em Pedagogia",
      institution: locale === 'en' ? "Federal University of Minas Gerais" : "Universidade Federal de Minas Gerais",
      period: "2017 - 2021",
      focus: locale === 'en' ? "Pedagogy - Specific Areas" : "Pedagogia - Áreas Específicas"
    },
    {
      degree: locale === 'en' ? "Bachelor's in Digital Games" : "Graduação em Jogos Digitais",
      institution: "PUC Minas",
      period: "2017 - 2020",
      focus: locale === 'en' ? "Game Development, Game Design, Programming" : "Desenvolvimento de Jogos, Game Design, Programação"
    },
    {
      degree: locale === 'en' ? "High School" : "Ensino Médio",
      institution: "Rodrigues Campos",
      period: "2014 - 2016",
      focus: locale === 'en' ? "General Education" : "Formação Geral"
    }
  ];

  // Novos dados para o radar chart das competências
  const competencyAreas = [
    { 
      name: locale === 'en' ? "Data Engineering" : "Engenharia de Dados", 
      value: 90, 
      icon: <FaDatabaseIcon className="text-2xl" />,
      color: "blue",
      skill: "DATA ENGINEERING"
    },
    { 
      name: locale === 'en' ? "Backend Development" : "Desenvolvimento Backend", 
      value: 85, 
      icon: <FaServer />,
      color: "purple",
      skill: "REST APIS"
    },
    { 
      name: locale === 'en' ? "Cybersecurity" : "Cibersegurança", 
      value: 75, 
      icon: <FaShieldAlt />,
      color: "red",
      skill: "CYBERSECURITY"
    },
    { 
      name: locale === 'en' ? "Problem Solving" : "Resolução de Problemas", 
      value: 95, 
      icon: <FaBrain />,
      color: "green",
      skill: "PERFORMANCE"
    },
    { 
      name: locale === 'en' ? "System Architecture" : "Arquitetura de Sistemas", 
      value: 80, 
      icon: <FaCode />,
      color: "amber",
      skill: "CLEAN ARCHITECTURE"
    },
    { 
      name: locale === 'en' ? "Innovation" : "Inovação", 
      value: 85, 
      icon: <FaLightbulb />,
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
      icon: <FaDatabaseIcon className="text-purple-500" />
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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (timelineRef.current) {
      setStartX(e.pageX - timelineRef.current.offsetLeft);
      setScrollLeft(timelineRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    // Função para rolagem suave
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    // Adicionar event listeners para links de navegação
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll as any);
    });

    // Cleanup
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll as any);
      });
    };
  }, []);

  // Atualizando as informações de contato
  const contactInfo = {
    email: "samuel.arao@gmail.com",
    phone: "+55 31 99144-2175",
    linkedin: "@samuel-arao",
    github: "@samueldk12"
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-white">
      <Navigation locale={locale} />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-900/50 dark:to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#2a2a3c_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
        </div>
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[600px] opacity-20">
          <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 dark:from-blue-500/10 dark:to-purple-500/10 blur-3xl rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header Content */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                  {t.about?.title || "Sobre Mim"}
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-wrap justify-center gap-4 mb-8"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300">
                  <FaBriefcase className="text-lg" />
                  <span>Data Engineering @ MPMG</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-700 dark:text-purple-300">
                  <FaLocation className="text-lg" />
                  <span>{t.home?.location || "Localização"}: Minas Gerais, Brasil</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-700 dark:text-indigo-300">
                  <FaGrad className="text-lg" />
                  <span>{t.home?.postgrad || "Pós graduado em IA"}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center gap-6 mb-12"
              >
                <a 
                  href="https://github.com/samueldk12" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-110"
                >
                  <FaGithub className="text-2xl" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/samuel-arao/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-110"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
                <a 
                  href="mailto:samuel.arao@gmail.com"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-110"
                >
                  <FaEnvelope className="text-2xl" />
                </a>
              </motion.div>
            </div>

            {/* About Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12 border border-gray-100 dark:border-gray-700"
            >
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <SkillsText
                  text={t.about?.description || ""}
                  locale={locale}
                />
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-5 gap-4"
            >
              <a
                href="#timeline"
                className="col-span-2 md:col-span-1 group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-1 hover:scale-105 transition-transform"
              >
                <div className="relative flex h-full items-center gap-4 rounded-lg bg-gray-950/50 backdrop-blur-xl p-4">
                  <FaGrad className="text-2xl text-blue-300" />
                  <span className="font-medium text-white">{locale === 'en' ? "Timeline" : "Linha do Tempo"}</span>
                </div>
              </a>
              <a
                href="#experience"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-1 hover:scale-105 transition-transform"
              >
                <div className="relative flex h-full items-center gap-4 rounded-lg bg-gray-950/50 backdrop-blur-xl p-4">
                  <FaBriefcase className="text-2xl text-purple-300" />
                  <span className="font-medium text-white">{locale === 'en' ? "Experience" : "Experiência"}</span>
                </div>
              </a>
              <a
                href="#education"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-1 hover:scale-105 transition-transform"
              >
                <div className="relative flex h-full items-center gap-4 rounded-lg bg-gray-950/50 backdrop-blur-xl p-4">
                  <FaGrad className="text-2xl text-green-300" />
                  <span className="font-medium text-white">{locale === 'en' ? "Education" : "Formação"}</span>
                </div>
              </a>
              <a
                href="#certifications"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-1 hover:scale-105 transition-transform"
              >
                <div className="relative flex h-full items-center gap-4 rounded-lg bg-gray-950/50 backdrop-blur-xl p-4">
                  <FaCertificate className="text-2xl text-amber-300" />
                  <span className="font-medium text-white">{locale === 'en' ? "Certifications" : "Certificações"}</span>
                </div>
              </a>
              <a
                href="#contact"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500 to-red-600 p-1 hover:scale-105 transition-transform"
              >
                <div className="relative flex h-full items-center gap-4 rounded-lg bg-gray-950/50 backdrop-blur-xl p-4">
                  <FaEnvelope className="text-2xl text-red-300" />
                  <span className="font-medium text-white">{locale === 'en' ? "Contact" : "Contato"}</span>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 bg-white dark:bg-gray-800/50 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              {t.about?.timeline || "Linha do Tempo"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {locale === 'en' 
                ? "My professional journey and key milestones"
                : "Minha jornada profissional e marcos importantes"}
            </p>
          </motion.div>

          <div className="relative">
            {/* Controles de zoom */}
            <div className="absolute right-4 -top-12 flex gap-2">
              <button 
                onClick={() => setTimelineZoom(prev => Math.min(prev + 0.2, 2))}
                className="p-2 bg-gray-700 rounded-full hover:bg-blue-500/20 transition-all"
              >
                <FaPlus />
              </button>
              <button 
                onClick={() => setTimelineZoom(prev => Math.max(prev - 0.2, 0.5))}
                className="p-2 bg-gray-700 rounded-full hover:bg-blue-500/20 transition-all"
              >
                <FaMinus />
              </button>
            </div>

            {/* Container da linha do tempo com scroll via drag */}
            <div 
              ref={timelineRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing scrollbar-hide"
              style={{ 
                height: '600px',
                paddingTop: '200px',
                paddingBottom: '50px',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <div 
                className="relative"
                style={{ 
                  transform: `scale(${timelineZoom})`,
                  transformOrigin: 'center center',
                  width: 'max-content',
                  minWidth: '100%',
                  paddingLeft: '50%',
                  paddingRight: '50%'
                }}
              >
                {/* Linha central */}
                <div className="absolute left-0 right-0 h-1 bg-gray-700 top-1/2 -translate-y-1/2"></div>
                
                {/* Eventos da linha do tempo */}
                <div className="flex items-center gap-16">
                  {[...workExperience, ...education, ...certifications]
                    .sort((a, b) => {
                      const yearA = parseInt(('period' in a ? a.period : a.year).toString().split('-')[0]);
                      const yearB = parseInt(('period' in b ? b.period : b.year).toString().split('-')[0]);
                      return yearB - yearA;
                    })
                    .map((item, index) => {
                      const type = 'company' in item ? 'experience' : 
                                'degree' in item ? 'education' : 'certification';
                      
                      const getIconColor = (type: string) => {
                        switch(type) {
                          case 'experience': return 'text-blue-400';
                          case 'education': return 'text-green-400';
                          case 'certification': return 'text-yellow-400';
                          default: return 'text-gray-400';
                        }
                      };

                      const getBgColor = (type: string) => {
                        switch(type) {
                          case 'experience': return 'hover:bg-blue-500/20 border-blue-400/50';
                          case 'education': return 'hover:bg-green-500/20 border-green-400/50';
                          case 'certification': return 'hover:bg-yellow-500/20 border-yellow-400/50';
                          default: return 'hover:bg-gray-500/20 border-gray-400/50';
                        }
                      };

                      const getIcon = (type: string) => {
                        switch(type) {
                          case 'experience': return <FaBriefcase className={`text-2xl ${getIconColor(type)}`} />;
                          case 'education': return <FaGrad className={`text-2xl ${getIconColor(type)}`} />;
                          case 'certification': return <FaCertificate className={`text-2xl ${getIconColor(type)}`} />;
                          default: return null;
                        }
                      };

                      return (
                        <div 
                          key={index}
                          className={`relative ${index % 2 === 0 ? '-top-32' : 'top-32'}`}
                        >
                          {/* Linha vertical conectora */}
                          <div className={`absolute left-1/2 w-px h-24 ${index % 2 === 0 ? 'top-full' : 'bottom-full'} bg-gray-600`}></div>
                          
                          {/* Botão do evento */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTimelineItem({ type, data: item })}
                            className={`relative group w-32 p-4 rounded-lg border ${getBgColor(type)} bg-gray-800/80 backdrop-blur-sm transition-all`}
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center">
                                {getIcon(type)}
                              </div>
                              <span className="text-sm font-medium text-center whitespace-nowrap overflow-hidden text-ellipsis w-full">
                                {'company' in item ? item.company :
                                 'degree' in item ? item.degree :
                                 item.name}
                              </span>
                              <span className="text-xs text-gray-400">
                                {'period' in item ? item.period.split('-')[0] : item.year}
                              </span>
                            </div>

                            {/* Tooltip */}
                            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded p-2 w-48 z-10 left-1/2 -translate-x-1/2 pointer-events-none">
                              {'company' in item ? `${item.position} at ${item.company}` :
                               'degree' in item ? `${item.degree} at ${item.institution}` :
                               `${item.name} - ${item.issuer}`}
                            </div>
                          </motion.button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Detalhes do item selecionado */}
            <AnimatePresence>
              {selectedTimelineItem && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="-mt-12 bg-gray-800/50 rounded-lg p-6 border border-gray-700"
                >
                  {selectedTimelineItem.type === 'experience' && (
                    <ExperienceCard 
                      experience={selectedTimelineItem.data} 
                      t={t} 
                      locale={locale}
                    />
                  )}
                  {selectedTimelineItem.type === 'education' && (
                    <EducationCard education={selectedTimelineItem.data} t={t} />
                  )}
                  {selectedTimelineItem.type === 'certification' && (
                    <CertificationCard certification={selectedTimelineItem.data} t={t} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      
      {/* Professional Experience Section */}
      <section id="experience" className="py-20 bg-white dark:bg-gray-800/80 relative scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t.about?.experience || ""}
          </h2>
          <div className="space-y-8">
            {workExperience.map((exp, index) => (
              <ExperienceCard 
                key={index} 
                experience={exp} 
                t={t} 
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900/80 relative scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
              <FaGrad className="inline-block mr-3 text-3xl" />
              {t.about?.educationSection || t.about?.education}
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {education.map((edu, index) => (
              <EducationCard key={index} education={edu} t={t} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-white dark:bg-gray-800/50 relative scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400">
              <FaCertificate className="inline-block mr-3 text-3xl" />
              {t.about?.certifications || ""}
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <CertificationCard key={index} certification={cert} t={t} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900/80 relative scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-400 dark:to-pink-400">
              <FaEnvelope className="inline-block mr-3 text-3xl" />
              {t.about?.contactInfo || "Contato"}
            </h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-2xl text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h3>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <FaPhone className="text-2xl text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.home?.phone || "Telefone"}</h3>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="text-green-600 dark:text-green-400 hover:underline"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <FaLocation className="text-2xl text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.home?.location || "Localização"}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Minas Gerais, Brasil
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                    <FaLinkedin className="text-2xl text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">LinkedIn</h3>
                    <a 
                      href={`https://www.linkedin.com/in/${contactInfo.linkedin.replace('@', '')}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {contactInfo.linkedin}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900/30 rounded-lg flex items-center justify-center">
                    <FaGithub className="text-2xl text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">GitHub</h3>
                    <a 
                      href={`https://github.com/${contactInfo.github.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:underline"
                    >
                      {contactInfo.github}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                    <FaDownload className="text-2xl text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.about?.curriculum || t.home?.curriculum || "Currículo"}</h3>
                    <a 
                      href={`/files/curriculo_${locale === 'pt' ? 'pt' : 'en'}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      {t.about?.downloadCV || t.home?.downloadCV}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Componentes auxiliares
interface ExperienceCardProps {
  experience: Experience;
  t: TranslationType;
  locale: string;
}

const ExperienceCard = ({ experience, t, locale }: ExperienceCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
          <span className="text-xl font-bold">{experience.company[0]}</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{experience.position}</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300">{experience.company}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            {experience.period}
          </p>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        <SkillsText text={experience.description} locale={locale} />
      </p>
      
      <div className="flex flex-wrap gap-2">
        {Array.from(new Set(experience.technologies)).map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const EducationCard = ({ education, t }: EducationCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
  >
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white">
        <FaGrad className="text-2xl" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{education.degree}</h3>
        <p className="text-gray-700 dark:text-gray-300">{education.institution}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
          <FaCalendarAlt className="text-green-500" />
          {education.period}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{education.focus}</p>
      </div>
    </div>
  </motion.div>
);

const CertificationCard = ({ certification, t }: CertificationCardProps) => {
  // Função para determinar o ícone baseado no emissor
  const getIssuerIcon = (issuer: string) => {
    const iconClass = "w-6 h-6"; // Tamanho fixo para todos os ícones
    switch (issuer.toLowerCase()) {
      case 'rocketseat':
        return <FaRocket className={iconClass} />;
      case 'alura':
        return <FaGrad className={iconClass} />;
      case 'full cycle':
        return <FaCode className={iconClass} />;
      default:
        return <FaCertificate className={iconClass} />;
    }
  };

  // Função para determinar a cor do gradiente baseado no emissor
  const getGradientColor = (issuer: string) => {
    switch (issuer.toLowerCase()) {
      case 'rocketseat':
        return 'from-purple-500 to-indigo-600';
      case 'alura':
        return 'from-blue-500 to-cyan-600';
      case 'full cycle':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-amber-500 to-orange-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getGradientColor(certification.issuer)} flex items-center justify-center text-white shrink-0`}>
          {getIssuerIcon(certification.issuer)}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{certification.name}</h3>
          <p className="text-gray-700 dark:text-gray-300">{certification.issuer}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
            <FaCalendarAlt className="w-4 h-4 text-amber-500" />
            {certification.year}
          </p>
          {certification.certificate_url && (
            <a
              href={certification.certificate_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 mt-2 text-sm"
            >
              <FaExternalLinkAlt className="w-3 h-3" />
              {t.about?.view_certificate || "Ver Certificado"}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Função auxiliar para mapear habilidades para categorias
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
    'HADOOP': 'data',
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