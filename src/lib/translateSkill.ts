// Mapeamento de tradução de habilidades (inglês para português)
const skillTranslations: Record<string, Record<string, string>> = {
  "en": {
    // Linguagens
    "PYTHON": "PYTHON",
    "PHP": "PHP",
    "NODE.JS": "NODE.JS",
    "TYPESCRIPT": "TYPESCRIPT",
    "GO": "GO",
    "JAVASCRIPT": "JAVASCRIPT",
    
    // Engenharia de Dados
    "DATA ENGINEERING": "DATA ENGINEERING",
    "ETL": "ETL",
    "APACHE SPARK": "APACHE SPARK",
    "APACHE AIRFLOW": "APACHE AIRFLOW",
    "HADOOP": "HADOOP",
    "APACHE NIFI": "APACHE NIFI",
    "APACHE HIVE": "APACHE HIVE",
    "DATA LAKES": "DATA LAKES",
    "WEB SCRAPING": "WEB SCRAPING",
    "ELASTICSEARCH": "ELASTICSEARCH",
    "MICROSERVICES": "MICROSERVICES",
    "CI/CD": "CI/CD",
    "JENKINS": "JENKINS",
    "CLEAN ARCHITECTURE": "CLEAN ARCHITECTURE",
    "TDD": "TDD",
    "LINUX": "LINUX",
    "WEB SECURITY": "WEB SECURITY",
    
    // Bancos de Dados
    "POSTGRESQL": "POSTGRESQL",
    "MYSQL": "MYSQL",
    "MONGODB": "MONGODB",
    "REDIS": "REDIS",
    
    // Web & APIs
    "FASTAPI": "FASTAPI",
    "REST APIS": "REST APIS",
    "GRAPHQL": "GRAPHQL",
    
    // DevOps & Cloud
    "DOCKER": "DOCKER",
    "KUBERNETES": "KUBERNETES",
    "AWS": "AWS",
    "PROMETHEUS": "PROMETHEUS",
    "GRAFANA": "GRAFANA",
    
    // Arquitetura & Metodologias
    "PERFORMANCE": "PERFORMANCE",
    "AGILE": "AGILE",
    
    // Segurança
    "CRYPTOGRAPHY": "CRYPTOGRAPHY",
    "PENETRATION TESTING": "PENETRATION TESTING",
    "API SECURITY": "API SECURITY",
    "SSRF": "SSRF",
    "CYBERSECURITY": "CYBERSECURITY",
    
    // IA
    "MACHINE LEARNING": "MACHINE LEARNING",
    "DEEP LEARNING": "DEEP LEARNING",
    "GAN": "GAN",
    "COMPUTER VISION": "COMPUTER VISION",
    "NLP": "NATURAL LANGUAGE PROCESSING",
    
    // Certifications
    "Formação Python e Orientação a Objetos": "Python and Object-Oriented Programming",
    "Formação Certificação Docker DCA": "Docker DCA Certification Course",
    "Engenharia de Dados: Conhecendo Apache Airflow": "Data Engineering: Introduction to Apache Airflow",
    "Git e GitHub: Controle e Compartilhe seu Código": "Git and GitHub: Control and Share Your Code",
    "Linux I: Conhecendo e Utilizando o Terminal": "Linux I: Knowing and Using the Terminal",
    "Linux II: Programas, Processos e Pacotes": "Linux II: Programs, Processes and Packages",
    "GoStack 14": "GoStack 14",
    "Fundamentos do React": "React Fundamentals",
    "Do Bug ao Bounty": "From Bug to Bounty"
  },
  "pt": {
    // Linguagens (português para inglês)
    "PYTHON": "PYTHON",
    "PHP": "PHP",
    "NODE.JS": "NODE.JS",
    "TYPESCRIPT": "TYPESCRIPT",
    "GO": "GO",
    "JAVASCRIPT": "JAVASCRIPT",
    
    // Engenharia de Dados
    "ENGENHARIA DE DADOS": "DATA ENGINEERING",
    "ETL": "ETL",
    "APACHE SPARK": "APACHE SPARK",
    "APACHE AIRFLOW": "APACHE AIRFLOW",
    "HADOOP": "HADOOP",
    "APACHE NIFI": "APACHE NIFI",
    "APACHE HIVE": "APACHE HIVE",
    "DATA LAKES": "DATA LAKES",
    "WEB SCRAPING": "WEB SCRAPING",
    "ELASTICSEARCH": "ELASTICSEARCH",
    "MICROSSERVIÇOS": "MICROSERVICES",
    "CI/CD": "CI/CD",
    "JENKINS": "JENKINS",
    "ARQUITETURA LIMPA": "CLEAN ARCHITECTURE",
    "TDD": "TDD",
    "LINUX": "LINUX",
    "SEGURANÇA WEB": "WEB SECURITY",
    
    // Bancos de Dados
    "POSTGRESQL": "POSTGRESQL",
    "MYSQL": "MYSQL",
    "MONGODB": "MONGODB",
    "REDIS": "REDIS",
    
    // Web & APIs
    "FASTAPI": "FASTAPI",
    "APIS REST": "REST APIS",
    "GRAPHQL": "GRAPHQL",
    
    // DevOps & Cloud
    "DOCKER": "DOCKER",
    "KUBERNETES": "KUBERNETES",
    "AWS": "AWS",
    "PROMETHEUS": "PROMETHEUS",
    "GRAFANA": "GRAFANA",
    
    // Arquitetura & Metodologias
    "PERFORMANCE": "PERFORMANCE",
    "ÁGIL": "AGILE",
    
    // Segurança
    "CRIPTOGRAFIA": "CRYPTOGRAPHY",
    "TESTE DE PENETRAÇÃO": "PENETRATION TESTING",
    "SEGURANÇA DE API": "API SECURITY",
    "SSRF": "SSRF",
    "CIBERSEGURANÇA": "CYBERSECURITY",
    
    // IA
    "APRENDIZADO DE MÁQUINA": "MACHINE LEARNING",
    "APRENDIZADO PROFUNDO": "DEEP LEARNING",
    "GAN": "GAN",
    "VISÃO COMPUTACIONAL": "COMPUTER VISION",
    "PROCESSAMENTO DE LINGUAGEM NATURAL": "NLP",
    
    // Certifications
    "Formação Python e Orientação a Objetos": "Python and Object-Oriented Programming",
    "Formação Certificação Docker DCA": "Docker DCA Certification Course",
    "Engenharia de Dados: Conhecendo Apache Airflow": "Data Engineering: Introduction to Apache Airflow",
    "Git e GitHub: Controle e Compartilhe seu Código": "Git and GitHub: Control and Share Your Code",
    "Linux I: Conhecendo e Utilizando o Terminal": "Linux I: Knowing and Using the Terminal",
    "Linux II: Programas, Processos e Pacotes": "Linux II: Programs, Processes and Packages",
    "GoStack 14": "GoStack 14",
    "Fundamentos do React": "React Fundamentals",
    "Do Bug ao Bounty": "From Bug to Bounty"
  },
  "es": {
    // Linguagens
    "PYTHON": "PYTHON",
    "PHP": "PHP",
    "NODE.JS": "NODE.JS",
    "TYPESCRIPT": "TYPESCRIPT",
    "GO": "GO",
    "JAVASCRIPT": "JAVASCRIPT",
    
    // Engenharia de Dados
    "DATA ENGINEERING": "INGENIERÍA DE DATOS",
    "ETL": "ETL",
    "APACHE SPARK": "APACHE SPARK",
    "APACHE AIRFLOW": "APACHE AIRFLOW",
    "HADOOP": "HADOOP",
    "APACHE NIFI": "APACHE NIFI",
    "APACHE HIVE": "APACHE HIVE",
    "DATA LAKES": "LAGOS DE DATOS",
    "WEB SCRAPING": "WEB SCRAPING",
    "ELASTICSEARCH": "ELASTICSEARCH",
    "MICROSERVICES": "MICROSERVICIOS",
    "CI/CD": "CI/CD",
    "JENKINS": "JENKINS",
    "CLEAN ARCHITECTURE": "ARQUITECTURA LIMPIA",
    "TDD": "TDD",
    "LINUX": "LINUX",
    "WEB SECURITY": "SEGURIDAD WEB",
    
    // Bancos de Dados
    "POSTGRESQL": "POSTGRESQL",
    "MYSQL": "MYSQL",
    "MONGODB": "MONGODB",
    "REDIS": "REDIS",
    
    // Web & APIs
    "FASTAPI": "FASTAPI",
    "REST APIS": "APIS REST",
    "GRAPHQL": "GRAPHQL",
    
    // DevOps & Cloud
    "DOCKER": "DOCKER",
    "KUBERNETES": "KUBERNETES",
    "AWS": "AWS",
    "PROMETHEUS": "PROMETHEUS",
    "GRAFANA": "GRAFANA",
    
    // Arquitetura & Metodologias
    "PERFORMANCE": "RENDIMIENTO",
    "AGILE": "ÁGIL",
    
    // Segurança
    "CRIPTOGRAFÍA": "CRIPTOGRAFÍA",
    "PRUEBAS DE PENETRACIÓN": "PRUEBAS DE PENETRACIÓN",
    "SEGURIDAD DE API": "SEGURIDAD DE API",
    "SSRF": "SSRF",
    "CIBERSEGURIDAD": "CIBERSEGURIDAD",
    
    // IA
    "APRENDIZAJE AUTOMÁTICO": "APRENDIZAJE AUTOMÁTICO",
    "APRENDIZAJE PROFUNDO": "APRENDIZAJE PROFUNDO",
    "GAN": "GAN",
    "VISIÓN POR COMPUTADORA": "VISIÓN POR COMPUTADORA",
    "PROCESAMIENTO DE LENGUAJE NATURAL": "PROCESAMIENTO DE LENGUAJE NATURAL",
    
    // Certifications
    "Python y Programación Orientada a Objetos": "Python y Programación Orientada a Objetos",
    "Curso de Certificación Docker DCA": "Curso de Certificación Docker DCA",
    "Ingeniería de Datos: Introducción a Apache Airflow": "Ingeniería de Datos: Introducción a Apache Airflow",
    "Git y GitHub: Control y Comparte tu Código": "Git y GitHub: Control y Comparte tu Código",
    "Linux I: Conociendo y Usando el Terminal": "Linux I: Conociendo y Usando el Terminal",
    "Linux II: Programas, Procesos y Paquetes": "Linux II: Programas, Procesos y Paquetes",
    "GoStack 14": "GoStack 14",
    "Fundamentos de React": "Fundamentos de React",
    "Del Bug al Bounty": "Del Bug al Bounty"
  }
};

/**
 * Traduz o nome de uma habilidade
 * @param skill Nome da habilidade a ser traduzida
 * @param locale Código de idioma (pt, en ou es)
 * @returns Nome da habilidade traduzida
 */
export function translateSkill(skill: string, locale: string = 'pt'): string {
  // Verifica se temos o idioma no mapeamento
  if (!skillTranslations[locale]) {
    return skill; // Retorna a habilidade original se não temos tradução
  }
  
  // Retorna a tradução ou a habilidade original se não existir tradução
  return skillTranslations[locale][skill] || skill;
}

/**
 * Obtém a versão em inglês de uma habilidade (para busca/normalização)
 * @param skill Nome da habilidade em qualquer idioma
 * @returns Nome da habilidade em inglês
 */
export function getEnglishSkillName(skill: string): string {
  // Se a habilidade já está em inglês, retorna ela mesma
  if (skillTranslations['en'][skill]) {
    return skill;
  }
  
  // Se a habilidade está em português, busca a correspondente em inglês
  if (skillTranslations['pt'][skill]) {
    return skillTranslations['pt'][skill];
  }
  
  // Se a habilidade está em espanhol, busca a correspondente em inglês
  if (skillTranslations['es'][skill]) {
    return skillTranslations['es'][skill];
  }
  
  // Se não encontrou tradução, retorna a original
  return skill;
} 