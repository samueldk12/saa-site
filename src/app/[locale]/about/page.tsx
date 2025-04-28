"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getTranslations } from "@/lib/getTranslations";
import Navigation from "@/components/Navigation";
import { 
  FaCode, 
  FaDatabase, 
  FaServer, 
  FaLaptopCode, 
  FaShieldAlt, 
  FaGraduationCap, 
  FaBriefcase,
  FaCertificate,
  FaBuilding,
  FaCalendarAlt,
  FaExternalLinkAlt
} from "react-icons/fa";
import { SiPython, SiPhp, SiNodedotjs, SiFastapi, SiGo, SiPostgresql, SiMongodb, SiApachekafka, SiApachespark, SiAmazon, SiDocker, SiKubernetes, SiTerraform } from "react-icons/si";

export default function About() {
  const { locale } = useParams();
  const t = getTranslations(locale as string);

  const workExperience = [
    {
      company: "Kriptos",
      position: locale === 'en' ? "Senior BI Consultant" : "Consultor BI Senior",
      period: locale === 'en' ? "April 2025 - Present" : "abril de 2025 - Presente",
      description: locale === 'en' 
        ? "Development and implementation of Business Intelligence solutions, optimization of ETL processes, and data analysis to support decision-making."
        : "Desenvolvimento e implementação de soluções de Business Intelligence, otimização de processos de ETL e análise de dados para suporte à tomada de decisões.",
      skills: ["Python", "SQL", "Airflow", "Spark", "AWS"]
    },
    {
      company: "TO Brasil",
      position: locale === 'en' ? "System Analyst" : "Analista de sistema Pleno",
      period: locale === 'en' ? "January 2021 - March 2025" : "janeiro de 2021 - março de 2025",
      description: locale === 'en'
        ? "Responsible for designing and implementing data pipelines, ETL systems, and integration of various data sources for analysis and visualization."
        : "Responsável por projetar e implementar pipelines de dados, sistemas ETL e integração de diversas fontes de dados para análise e visualização.",
      skills: ["Python", "Spark", "Airflow", "PostgreSQL", "FastAPI", "Druid"]
    },
    {
      company: "4mti",
      position: locale === 'en' ? "Software Developer" : "Desenvolvedor de software",
      period: locale === 'en' ? "February 2023 - October 2023" : "fevereiro de 2023 - outubro de 2023",
      description: locale === 'en'
        ? "Development of web applications and APIs using modern backend and frontend technologies."
        : "Desenvolvimento de aplicações web e APIs utilizando tecnologias modernas de backend e frontend.",
      skills: ["Node.js", "React", "MongoDB", "PostgreSQL", "Docker"]
    },
    {
      company: "4mti",
      position: locale === 'en' ? "Data Scientist" : "Cientista de dados",
      period: locale === 'en' ? "October 2020 - January 2021" : "outubro de 2020 - janeiro de 2021",
      description: locale === 'en'
        ? "Data analysis, development of machine learning models, and implementation of ETL pipelines."
        : "Análise de dados, desenvolvimento de modelos de machine learning e implementação de pipelines de ETL.",
      skills: ["Python", "Hadoop", "Spark", "PostgreSQL", "ETL", "Web Crawler"]
    },
    {
      company: "4mti",
      position: locale === 'en' ? "Developer" : "Desenvolvedor",
      period: locale === 'en' ? "July 2020 - October 2020" : "julho de 2020 - outubro de 2020",
      description: locale === 'en'
        ? "Development of web applications and crawling systems for data collection."
        : "Desenvolvimento de aplicações web e sistemas de crawling para coleta de dados.",
      skills: ["ReactJS", "Node.js", "ETL", "Spark", "Web Crawler"]
    },
    {
      company: "RemOpt",
      position: locale === 'en' ? "Development Intern" : "Estagiário em desenvolvimento",
      period: locale === 'en' ? "December 2019 - June 2020" : "dezembro de 2019 - junho de 2020",
      description: locale === 'en'
        ? "Development of web applications, intranet maintenance, security testing, and backend development."
        : "Desenvolvimento de aplicações web, manutenção de intranet, testes de segurança e desenvolvimento back-end.",
      skills: ["PHP", "jQuery", "MySQL", "HTML", "CSS", "Bootstrap"]
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

  const skillCategories = [
    {
      name: t.about?.backendDev || "Desenvolvimento Backend",
      icon: <FaServer className="text-blue-500 text-2xl" />,
      skills: [
        { name: "Python", level: 95 },
        { name: "Node.js", level: 85 },
        { name: "Go", level: 70 },
        { name: "PHP", level: 80 },
        { name: "FastAPI", level: 90 },
        { name: "Express", level: 85 },
      ]
    },
    {
      name: t.about?.dataEngineering || "Engenharia de Dados",
      icon: <FaDatabase className="text-green-500 text-2xl" />,
      skills: [
        { name: "SQL", level: 95 },
        { name: "ETL", level: 90 },
        { name: "Apache Spark", level: 85 },
        { name: "Apache Airflow", level: 80 },
        { name: "Apache Kafka", level: 75 },
        { name: "Databricks", level: 70 },
      ]
    },
    {
      name: t.about?.cybersecurity || "Cybersegurança",
      icon: <FaShieldAlt className="text-red-500 text-2xl" />,
      skills: [
        { name: "Security Auditing", level: 80 },
        { name: "Vulnerability Analysis", level: 85 },
        { name: "Penetration Testing", level: 75 },
        { name: "Secure Coding", level: 90 },
        { name: "Authentication & Authorization", level: 85 },
        { name: "OWASP Top 10", level: 90 },
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-white">
      <Navigation locale={locale as string} />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#2a2a3c_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute -z-5 top-1/4 right-0 w-72 h-72 bg-gradient-to-r from-blue-300/20 to-purple-300/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              {t.about?.title || "Sobre Mim"}
            </h1>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-lg mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                {t.about?.description || (locale === 'en' 
                  ? "I have a deep interest in subjects that directly or indirectly affect my life, such as politics and economics. Currently, I am focusing my efforts on programming, with an emphasis on back-end and big data."
                  : "Tenho um interesse profundo em assuntos que afetam minha vida direta ou indiretamente, como política e economia. No momento concentro meus esforços em programação, com foco em back-end e big data.")}
              </p>
              
              <p className="text-lg mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                {t.about?.philosophy || (locale === 'en'
                  ? "I believe that a good person is in the world to help solve problems. This philosophy led me to programming. I seek solutions on multiple fronts, valuing the ability to be useful in different areas."
                  : "Acredito que uma boa pessoa está no mundo para ajudar a resolver problemas. Essa filosofia me levou à programação. Busco soluções em várias frentes, valorizando a capacidade de ser útil em diferentes áreas.")}
              </p>
              
              <p className="text-lg mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                {t.about?.career || (locale === 'en'
                  ? "I started my career as an intern in web development, but soon moved to the data area, where I remain today."
                  : "Iniciei minha carreira como estagiário em desenvolvimento web, mas logo mudei para a área de dados, onde permaneço até hoje.")}
              </p>
              
              <p className="text-lg mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                {t.about?.current || (locale === 'en'
                  ? "Currently, I work as a Senior BI Consultant at Kriptos, where I am responsible for developing and implementing Business Intelligence solutions, optimizing ETL processes, and data analysis to support decision-making."
                  : "Atualmente trabalho como Consultor BI Senior na Kriptos, onde sou responsável pelo desenvolvimento e implementação de soluções de Business Intelligence, otimização de processos de ETL e análise de dados para suporte à tomada de decisões.")}
              </p>
              
              <p className="text-lg mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                {t.about?.education || (locale === 'en'
                  ? "I hold a bachelor's degree in Digital Games and a teaching degree in Pedagogy, as well as a postgraduate degree in Artificial Intelligence from PUC Minas and an MBA in Big Data and Competitive Intelligence from Descomplica."
                  : "Sou graduado em Jogos Digitais e Licenciatura em Pedagogia, além de pós-graduado em Inteligência Artificial pela PUC Minas e MBA em Big Data e Inteligência Competitiva pelo Descomplica.")}
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {t.about?.hobby || (locale === 'en'
                  ? "In my free time, I enjoy researching vulnerabilities on websites and writing reports about them, such as my latest XSS finding on the Contagem city hall website. This practice helps me improve my programming and cybersecurity skills."
                  : "No meu tempo livre, gosto de pesquisar falhas em sites na internet e fazer relatórios sobre elas, como meu último achado de XSS no site da prefeitura de Contagem. Essa prática me ajuda a aprimorar minhas habilidades de programação e segurança cibernética.")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
        
      {/* Work Experience */}
      <section className="py-20 bg-white dark:bg-gray-800/80 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 inline-block">
              <FaBriefcase className="inline-block mr-3 text-3xl" />
              {t.about?.experience || "Experiência Profissional"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            {workExperience.map((job, index) => (
              <motion.div
                key={`${job.company}-${job.position}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-blue-600 dark:border-blue-500 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="mb-4 md:mb-0 md:mr-6">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <FaBuilding className="text-blue-600 dark:text-blue-400 text-2xl" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.position}</h3>
                        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{job.company}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center text-gray-600 dark:text-gray-400">
                        <FaCalendarAlt className="mr-2" />
                        <span>{job.period}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map(skill => (
                        <span 
                          key={`${job.company}-${job.position}-${skill}`} 
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Education Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/80 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 inline-block">
              <FaGraduationCap className="inline-block mr-3 text-3xl" />
              {t.about?.educationSection || "Formação Acadêmica"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={`${edu.degree}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border-t-4 border-purple-600 dark:border-purple-500 hover:shadow-xl transition-shadow h-full"
              >
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <FaGraduationCap className="text-purple-600 dark:text-purple-400 text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">{edu.institution}</p>
                  </div>
                </div>
                <div className="ml-16">
                  <p className="text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                    <FaCalendarAlt className="mr-2 text-xs" />
                    {edu.period}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{edu.focus}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Certifications Section */}
      <section className="py-20 bg-white dark:bg-gray-800/50 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 inline-block">
              <FaCertificate className="inline-block mr-3 text-3xl" />
              {t.about?.certifications || "Certificações"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={`${cert.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white dark:bg-gray-700 rounded-xl shadow p-5 border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                      <FaCertificate className="text-amber-600 dark:text-amber-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base">{cert.name}</h3>
                    <p className="text-amber-600 dark:text-amber-400 text-sm">{cert.issuer}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{cert.year}</p>
                    
                    {cert.credential && (
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                        {locale === 'en' ? 'Credential: ' : 'Credencial: '}{cert.credential}
                      </p>
                    )}
                    
                    {cert.expiry && (
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                        {locale === 'en' ? 'Expiry: ' : 'Expiração: '}{cert.expiry}
                      </p>
                    )}
                    
                    {cert.certificate_url && (
                      <a 
                        href={cert.certificate_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-3 inline-flex items-center text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                      >
                        <span className="mr-1">{t.about?.viewCertificate || 'Ver Certificado'}</span>
                        <FaExternalLinkAlt className="text-xs" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400 inline-block">
              <FaLaptopCode className="inline-block mr-3 text-3xl" />
              {t.about?.skills || "Habilidades Técnicas"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="space-y-16 max-w-4xl mx-auto">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  {category.icon}
                  <h3 className="text-2xl font-bold ml-3 text-gray-800 dark:text-white">{category.name}</h3>
                </div>
                
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={`${category.name}-${skill.name}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.3, delay: skillIndex * 0.05 + categoryIndex * 0.1 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-800 dark:text-white">{skill.name}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {skill.level >= 90 ? `${t.skills?.expert || "Especialista"}` : 
                           skill.level >= 80 ? `${t.skills?.advanced || "Avançado"}` : 
                           skill.level >= 65 ? `${t.skills?.intermediate || "Intermediário"}` : 
                           `${t.skills?.beginner || "Iniciante"}`}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <motion.div 
                          className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-teal-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.5, delay: skillIndex * 0.05 + categoryIndex * 0.1 }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 