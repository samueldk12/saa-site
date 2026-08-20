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

// Mapa estático de cor -> classes Tailwind literais. Evita o bug de
// classes dinâmicas (bg-${cor}-500) que o compilador nunca gera.
const COMPETENCY_COLOR: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-500', text: 'text-blue-500' },
  purple: { bg: 'bg-purple-500', text: 'text-purple-500' },
  red: { bg: 'bg-red-500', text: 'text-red-500' },
  green: { bg: 'bg-green-500', text: 'text-green-500' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-500' },
  yellow: { bg: 'bg-yellow-500', text: 'text-yellow-500' },
};

// Painel de "ficha de RPG" — moldura com cantos em L e brilho neon,
// reaproveitado em todos os blocos da pagina (atributos, missoes, etc).
const RpgPanel = ({
  children,
  className = '',
  glow = 'cyan',
}: {
  children: React.ReactNode;
  className?: string;
  glow?: 'cyan' | 'purple' | 'amber';
}) => {
  const ring = glow === 'purple' ? 'border-purple-400/70' : glow === 'amber' ? 'border-amber-400/70' : 'border-cyan-400/70';
  const shadow =
    glow === 'purple'
      ? 'shadow-[0_0_30px_-8px_rgba(168,85,247,0.35)]'
      : glow === 'amber'
      ? 'shadow-[0_0_30px_-8px_rgba(245,158,11,0.35)]'
      : 'shadow-[0_0_30px_-8px_rgba(34,211,238,0.35)]';
  const border = glow === 'purple' ? 'border-purple-500/25' : glow === 'amber' ? 'border-amber-500/25' : 'border-cyan-500/25';
  return (
    <div className={`relative rounded-sm border ${border} bg-[#0D0D14]/90 backdrop-blur-sm ${shadow} ${className}`}>
      <span className={`absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 ${ring}`} />
      <span className={`absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 ${ring}`} />
      <span className={`absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 ${ring}`} />
      <span className={`absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 ${ring}`} />
      {children}
    </div>
  );
};

export default function About() {
  const params = useParams();
  const locale = params.locale as string;
  const t = getTranslations(locale);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(null);
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<{ type: string; data: any } | null>(null);
  const [marqueePaused, setMarqueePaused] = useState(false);
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
        name: locale === 'en' ? "Fundamentals in Go" : "Fundamentos em Go",
        issuer: "Full Cycle",
        year: "2025",
        credential: "244022a8-f5b8-4994-93fb-2992ec916bbd",
        certificate_url: "https://fullcycle.com.br/certificado/244022a8-f5b8-4994-93fb-2992ec916bbd"
      },
     {
      name: locale === 'en' ? "Elastic and Elastic Stack: The complete course" : "Elastic e Elastic Stack: O curso completo",
      issuer: "Udemy",
      year: "2025",
      credential: "UC-a28b3431-ac43-4de4-88ed-29aa1f3e5bb1",
      certificate_url: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-a28b3431-ac43-4de4-88ed-29aa1f3e5bb1.pdf"
    },
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

  const characterLevel = workExperience.length;

  return (
    <main className="min-h-screen rpg-bg text-gray-200 overflow-x-hidden">
      <Navigation locale={locale} />

      {/* Hero — cabeçalho da ficha de personagem */}
      <section className="relative py-24 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 -z-10 w-[800px] h-[600px] opacity-30"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-br from-purple-600/30 to-fuchsia-600/20 blur-3xl rounded-full"></div>
        </motion.div>
        <motion.div
          className="absolute -bottom-20 left-0 -z-10 w-[500px] h-[500px] opacity-25"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute w-full h-full bg-gradient-to-tr from-cyan-500/30 to-blue-600/20 blur-3xl rounded-full"></div>
        </motion.div>

        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12">
              {/* Retrato em moldura hex/circular com anel girando */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
                className="relative shrink-0 w-40 h-40 sm:w-48 sm:h-48"
              >
                <svg className="absolute inset-0 w-full h-full rpg-ring" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="47" stroke="url(#rpgRingGradient)" strokeWidth="1.5" strokeDasharray="6 4" />
                  <defs>
                    <linearGradient id="rpgRingGradient" x1="0" y1="0" x2="100" y2="100">
                      <stop offset="0%" stopColor="#22D3EE" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-3 rounded-full overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_35px_-5px_rgba(34,211,238,0.5)]">
                  <Image
                    src="/images/profile.jpg"
                    alt={t.home?.profileAlt || "Foto de perfil de Samuel Apolinário Arão"}
                    fill
                    sizes="12rem"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black border border-purple-400/60 text-[0.65rem] font-mono text-purple-300 whitespace-nowrap">
                  {locale === 'en' ? `LVL ${characterLevel}` : `NÍVEL ${characterLevel}`}
                </div>
              </motion.div>

              <div className="text-center md:text-left flex-1">
                <span className="inline-block text-[0.65rem] font-mono uppercase tracking-[0.25em] text-cyan-400 mb-2">
                  {locale === 'en' ? '[ Character Sheet ]' : '[ Ficha de Personagem ]'}
                </span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="font-serif text-4xl md:text-6xl font-bold mb-3 text-white rpg-glow-text"
                >
                  Samuel Apolinário Arão
                </motion.h1>
                <p className="text-sm sm:text-base text-purple-300 font-mono mb-5">
                  {locale === 'en' ? 'Data Engineer · Backend Class' : 'Engenheiro de Dados · Classe Backend'}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 text-xs font-mono">
                    <FaBriefcase className="text-[0.7rem]" /> MPMG
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-purple-500/30 bg-purple-500/5 text-purple-300 text-xs font-mono">
                    <FaLocation className="text-[0.7rem]" /> Minas Gerais, BR
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-amber-500/30 bg-amber-500/5 text-amber-300 text-xs font-mono">
                    <FaGrad className="text-[0.7rem]" /> {t.home?.postgrad || "Pós graduado em IA"}
                  </span>
                </div>

                <div className="flex justify-center md:justify-start gap-3">
                  <a
                    href="https://github.com/samueldk12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-sm border border-cyan-500/30 bg-black/40 text-cyan-300 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_-2px_rgba(34,211,238,0.6)] transition-all"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/samuel-arao/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-sm border border-cyan-500/30 bg-black/40 text-cyan-300 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_-2px_rgba(34,211,238,0.6)] transition-all"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="mailto:samuel.arao@gmail.com"
                    className="w-10 h-10 flex items-center justify-center rounded-sm border border-cyan-500/30 bg-black/40 text-cyan-300 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_-2px_rgba(34,211,238,0.6)] transition-all"
                  >
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            </div>

            {/* Lore / biografia */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-10"
            >
              <RpgPanel glow="purple" className="p-6 sm:p-8">
                <span className="text-[0.65rem] font-mono uppercase tracking-widest text-purple-400 mb-3 block">
                  {locale === 'en' ? '// Lore' : '// Lore'}
                </span>
                <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300">
                  <SkillsText
                    text={t.about?.description || ""}
                    locale={locale}
                  />
                </div>
              </RpgPanel>
            </motion.div>

            {/* Ações rápidas da ficha */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-5 gap-3"
            >
              {[
                { href: '#timeline', icon: <FaGrad />, label: locale === 'en' ? 'Timeline' : 'Linha do Tempo', glow: 'cyan' as const },
                { href: '#experience', icon: <FaBriefcase />, label: t.about?.experience || (locale === 'en' ? 'Experience' : 'Experiência'), glow: 'purple' as const },
                { href: '#education', icon: <FaGrad />, label: t.about?.educationSection || t.about?.education || (locale === 'en' ? 'Education' : 'Formação'), glow: 'cyan' as const },
                { href: '#certifications', icon: <FaCertificate />, label: t.about?.certifications || (locale === 'en' ? 'Certifications' : 'Certificações'), glow: 'amber' as const },
                { href: '#contact', icon: <FaEnvelope />, label: t.about?.contactInfo || (locale === 'en' ? 'Contact' : 'Contato'), glow: 'purple' as const },
              ].map((item) => (
                <a key={item.href} href={item.href} className="col-span-1">
                  <RpgPanel glow={item.glow} className="h-full px-3 py-3 flex items-center gap-2.5 hover:bg-white/5 transition-colors">
                    <span className={item.glow === 'purple' ? 'text-purple-400' : item.glow === 'amber' ? 'text-amber-400' : 'text-cyan-400'}>{item.icon}</span>
                    <span className="text-xs sm:text-sm font-medium text-gray-200 truncate">{item.label}</span>
                  </RpgPanel>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee de feitos lendários — pausa ao passar o mouse */}
      <section
        className="relative py-4 bg-black border-y border-purple-500/20 overflow-hidden -skew-y-1 my-4"
        onMouseEnter={() => setMarqueePaused(true)}
        onMouseLeave={() => setMarqueePaused(false)}
      >
        <div className="skew-y-1">
          <div
            className={`flex gap-10 whitespace-nowrap animate-marquee ${marqueePaused ? '[animation-play-state:paused]' : ''}`}
          >
            {[...careerMilestones, ...careerMilestones].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-3 text-sm sm:text-base text-gray-300 hover:text-white transition-colors cursor-default">
                <span className="text-lg">{m.icon}</span>
                <span className="font-mono text-cyan-400 font-bold">{m.year}</span>
                <span>{m.achievement}</span>
                <span className="text-purple-500/60 ml-6">❖</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Atributos — barras cinéticas que preenchem ao entrar em cena */}
      <section className="py-16 relative scroll-mt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="text-[0.65rem] font-mono uppercase tracking-widest text-cyan-400">
              {locale === 'en' ? '// Attributes' : '// Atributos'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              {locale === 'en' ? 'Where I bring the most energy' : 'Onde eu entrego mais energia'}
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
            {competencyAreas.map((area, index) => {
              const style = COMPETENCY_COLOR[area.color] || COMPETENCY_COLOR.blue;
              const category = getSkillCategory(area.skill);
              const slug = area.skill.toLowerCase().replace(/\s+/g, '-');
              return (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link href={`/${locale}/skills/${category}/${slug}`} className="group block">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-2 font-medium text-gray-200 group-hover:text-white transition-colors">
                        <span className={style.text}>{area.icon}</span>
                        {area.name}
                        <FaExternalLinkAlt className="text-[0.6rem] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                      <span className="font-mono text-sm text-gray-400">{area.value}%</span>
                    </div>
                    <div className="h-2.5 rounded-sm bg-white/5 border border-white/10 overflow-hidden group-hover:border-cyan-400/40 transition-colors">
                      <motion.div
                        className={`h-full rounded-sm ${style.bg}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${area.value}%` }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.9, delay: index * 0.05, ease: 'easeOut' }}
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-[0.65rem] font-mono uppercase tracking-widest text-cyan-400">
              {locale === 'en' ? '// Quest Log' : '// Registro de Missões'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1 mb-3">
              {t.about?.timeline || "Linha do Tempo"}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
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
                className="p-2 rounded-sm border border-cyan-500/30 bg-black/40 text-cyan-300 hover:bg-cyan-500/10 transition-all"
              >
                <FaPlus />
              </button>
              <button
                onClick={() => setTimelineZoom(prev => Math.max(prev - 0.2, 0.5))}
                className="p-2 rounded-sm border border-cyan-500/30 bg-black/40 text-cyan-300 hover:bg-cyan-500/10 transition-all"
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
                <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-cyan-500/60 via-purple-500/60 to-amber-500/60 top-1/2 -translate-y-1/2"></div>

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
                          case 'experience': return 'text-cyan-400';
                          case 'education': return 'text-purple-400';
                          case 'certification': return 'text-amber-400';
                          default: return 'text-gray-400';
                        }
                      };

                      const getBgColor = (type: string) => {
                        switch(type) {
                          case 'experience': return 'hover:bg-cyan-500/10 border-cyan-400/40';
                          case 'education': return 'hover:bg-purple-500/10 border-purple-400/40';
                          case 'certification': return 'hover:bg-amber-500/10 border-amber-400/40';
                          default: return 'hover:bg-gray-500/10 border-gray-400/40';
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
                          <div className={`absolute left-1/2 w-px h-24 ${index % 2 === 0 ? 'top-full' : 'bottom-full'} bg-white/10`}></div>

                          {/* Botão do evento */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTimelineItem({ type, data: item })}
                            className={`relative group w-32 p-4 rounded-sm border ${getBgColor(type)} bg-black/50 backdrop-blur-sm transition-all`}
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                {getIcon(type)}
                              </div>
                              <span className="text-sm font-medium text-center whitespace-nowrap overflow-hidden text-ellipsis w-full text-gray-200">
                                {'company' in item ? item.company :
                                 'degree' in item ? item.degree :
                                 item.name}
                              </span>
                              <span className="text-xs text-gray-500 font-mono">
                                {'period' in item ? item.period.split('-')[0] : item.year}
                              </span>
                            </div>

                            {/* Tooltip */}
                            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/10 text-white text-xs rounded-sm p-2 w-48 z-10 left-1/2 -translate-x-1/2 pointer-events-none">
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
                  className="-mt-12"
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
      <section id="experience" className="py-20 relative scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-[0.65rem] font-mono uppercase tracking-widest text-cyan-400">
              {locale === 'en' ? '// Guild History' : '// Histórico de Guildas'}
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">
              {t.about?.experience || ""}
            </h2>
          </div>
          <div className="space-y-6">
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
      <section id="education" className="py-20 relative scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-[0.65rem] font-mono uppercase tracking-widest text-purple-400">
              {locale === 'en' ? '// Training Grounds' : '// Escolas de Treinamento'}
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">
              <FaGrad className="inline-block mr-3 text-2xl text-purple-400" />
              {t.about?.educationSection || t.about?.education}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {education.map((edu, index) => (
              <EducationCard key={index} education={edu} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 relative scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-[0.65rem] font-mono uppercase tracking-widest text-amber-400">
              {locale === 'en' ? '// Achievements' : '// Conquistas'}
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">
              <FaCertificate className="inline-block mr-3 text-2xl text-amber-400" />
              {t.about?.certifications || ""}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <CertificationCard key={index} certification={cert} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-[0.65rem] font-mono uppercase tracking-widest text-purple-400">
              {locale === 'en' ? '// Send a Raven' : '// Envie um Corvo'}
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">
              <FaEnvelope className="inline-block mr-3 text-2xl text-purple-400" />
              {t.about?.contactInfo || "Contato"}
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <RpgPanel glow="cyan" className="p-6 sm:p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm border border-cyan-500/30 bg-cyan-500/5 flex items-center justify-center">
                    <FaEnvelope className="text-xl text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">Email</h3>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-cyan-300 hover:text-cyan-200 hover:underline text-sm"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm border border-cyan-500/30 bg-cyan-500/5 flex items-center justify-center">
                    <FaPhone className="text-xl text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{t.home?.phone || "Telefone"}</h3>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-cyan-300 hover:text-cyan-200 hover:underline text-sm"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm border border-cyan-500/30 bg-cyan-500/5 flex items-center justify-center">
                    <FaLocation className="text-xl text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{t.home?.location || "Localização"}</h3>
                    <p className="text-gray-400 text-sm">
                      Minas Gerais, Brasil
                    </p>
                  </div>
                </div>
              </div>
            </RpgPanel>

            <RpgPanel glow="purple" className="p-6 sm:p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm border border-purple-500/30 bg-purple-500/5 flex items-center justify-center">
                    <FaLinkedin className="text-xl text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">LinkedIn</h3>
                    <a
                      href={`https://www.linkedin.com/in/${contactInfo.linkedin.replace('@', '')}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-300 hover:text-purple-200 hover:underline text-sm"
                    >
                      {contactInfo.linkedin}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm border border-purple-500/30 bg-purple-500/5 flex items-center justify-center">
                    <FaGithub className="text-xl text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">GitHub</h3>
                    <a
                      href={`https://github.com/${contactInfo.github.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-300 hover:text-purple-200 hover:underline text-sm"
                    >
                      {contactInfo.github}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm border border-amber-500/30 bg-amber-500/5 flex items-center justify-center">
                    <FaDownload className="text-xl text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{t.about?.curriculum || t.home?.curriculum || "Currículo"}</h3>
                    <a
                      href={`/files/curriculo_${locale === 'pt' ? 'pt' : 'en'}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300 hover:text-amber-200 hover:underline text-sm"
                    >
                      {t.about?.downloadCV || t.home?.downloadCV}
                    </a>
                  </div>
                </div>
              </div>
            </RpgPanel>
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
      whileHover={{ y: -3 }}
    >
      <RpgPanel glow="cyan" className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-400/60 bg-black/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_-3px_rgba(34,211,238,0.5)]">
            <span className="text-lg font-bold font-mono">{experience.company[0]}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{experience.position}</h3>
            <p className="text-base text-cyan-300">{experience.company}</p>
            <p className="text-xs text-gray-500 font-mono flex items-center gap-2">
              <FaCalendarAlt className="text-cyan-500" />
              {experience.period}
            </p>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4">
          <SkillsText text={experience.description} locale={locale} />
        </p>

        <div className="flex flex-wrap gap-1.5">
          {Array.from(new Set(experience.technologies)).map((tech, index) => (
            <span
              key={index}
              className="px-2.5 py-1 border border-cyan-500/25 bg-cyan-500/5 text-cyan-300 rounded-sm text-xs font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </RpgPanel>
    </motion.div>
  );
};

const EducationCard = ({ education, t }: EducationCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -3 }}
  >
    <RpgPanel glow="purple" className="p-6 h-full">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-purple-400/60 bg-black/40 flex items-center justify-center text-purple-300 shrink-0 shadow-[0_0_15px_-3px_rgba(168,85,247,0.5)]">
          <FaGrad className="text-xl" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{education.degree}</h3>
          <p className="text-purple-300 text-sm">{education.institution}</p>
          <p className="text-xs text-gray-500 font-mono flex items-center gap-2 mt-1">
            <FaCalendarAlt className="text-purple-500" />
            {education.period}
          </p>
          <p className="text-sm text-gray-400 mt-2">{education.focus}</p>
        </div>
      </div>
    </RpgPanel>
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -3, scale: 1.015 }}
    >
      <RpgPanel glow="amber" className="p-6 h-full">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-amber-400/60 bg-black/40 flex items-center justify-center text-amber-300 shrink-0 shadow-[0_0_15px_-3px_rgba(245,158,11,0.5)]">
            {getIssuerIcon(certification.issuer)}
          </div>
          <div>
            <h3 className="text-base font-semibold text-white mb-1">{certification.name}</h3>
            <p className="text-amber-300 text-sm">{certification.issuer}</p>
            <p className="text-xs text-gray-500 font-mono flex items-center gap-2 mt-1">
              <FaCalendarAlt className="w-3 h-3 text-amber-500" />
              {certification.year}
            </p>
            {certification.certificate_url && (
              <a
                href={certification.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mt-2 text-sm"
              >
                <FaExternalLinkAlt className="w-3 h-3" />
                {t.about?.view_certificate || "Ver Certificado"}
              </a>
            )}
          </div>
        </div>
      </RpgPanel>
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