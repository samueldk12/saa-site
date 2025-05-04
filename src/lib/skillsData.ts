import {
  calculateProficiency, 
  getProficiencyLevel,
  findSkillsInText,
  type Project,
  type Experience,
  type Certification
} from './calculateProficiency';
import { translateSkill, getEnglishSkillName } from './translateSkill';

// Interfaces
export interface Project {
  name: string;
  description: string;
  url: string;
  skills: string[];
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credential?: string;
  certificate_url?: string;
}

// Dados dos projetos
export const projectsData: Project[] = [
  {
    name: "FastAPI Proxy System",
    description: "Sistema de proxy em FastAPI para web scraping com gerenciamento de sessões e rotação de IPs",
    url: "https://github.com/samueldk12/proxy-system",
    skills: ["Python", "FastAPI", "Redis", "Web Scraping"]
  },
  {
    name: "Lunar Land AI",
    description: "Projeto de inteligência artificial que utiliza aprendizado por reforço para pousar uma nave lunar",
    url: "https://github.com/samueldk12/lunar-landing",
    skills: ["Python", "PyTorch", "Machine Learning", "Deep Learning"]
  },
  {
    name: "Data Pipeline Tool",
    description: "Ferramenta para construção e orquestração de pipelines de dados",
    url: "https://github.com/samueldk12/data-pipeline",
    skills: ["Python", "Apache Airflow", "Apache Spark", "ETL", "Data Engineering"]
  },
  {
    name: "API Arquitetura Hexagonal",
    description: "API REST com arquitetura hexagonal em TypeScript, demonstrando princípios de design limpo e testabilidade",
    url: "https://github.com/samueldk12/hex-arch-api",
    skills: ["TypeScript", "NodeJS", "MongoDB", "Clean Architecture", "REST APIs"]
  },
  {
    name: "Go Microservice",
    description: "Microserviço construído em Go para alta performance e escalabilidade",
    url: "https://github.com/samueldk12/go-microservice",
    skills: ["Go", "Docker", "REST APIs", "Microservices"]
  }
];

// Dados das experiências para sincronizar com a página About
export const workExperienceFromAbout = [
  {
    company: "Kriptos",
    position: "Consultor BI Senior (Engenheiro de Dados)",
    period: "abril de 2025 - Presente",
    description: "Atuando principalmente como Engenheiro de Dados, responsável pelo desenvolvimento e implementação de pipelines de dados, processos de ETL e construção de arquiteturas de dados escaláveis. Desenvolvimento de soluções de automação, projetos de integração de dados e APIs performáticas com foco em boas práticas e código limpo. Trabalho com grandes volumes de dados, incluindo iniciativas junto ao Ministério Público de Minas Gerais (MPMG).",
    technologies: ["Python", "SQL", "Apache Airflow", "Apache Spark", "AWS", "FastAPI", "Docker", "Apache Hadoop", "Apache Druid", "Apache NiFi", "Web Scraping", "PostgreSQL", "Data Engineering", "Apache Hive", "Data Lakes", "Elasticsearch", "Microservices", "CI/CD", "Jenkins", "Clean Architecture", "TDD", "Linux", "Web Security"]
  },
  {
    company: "TO Brasil",
    position: "Analista de Sistema Pleno",
    period: "janeiro de 2021 - março de 2025",
    description: "Responsável por projetar e implementar pipelines de dados, sistemas ETL e integração de diversas fontes de dados para análise e visualização. Desenvolvimento de projetos de automação, soluções de integração de dados e APIs performáticas com foco em otimização e código limpo.",
    technologies: ["Python", "SQL", "Apache Airflow", "Apache Spark", "FastAPI", "Docker", "Apache Hadoop", "Apache Druid", "Apache NiFi", "Web Scraping", "PostgreSQL", "Data Engineering", "Apache Hive", "Data Lakes", "Elasticsearch", "Microservices", "CI/CD", "Jenkins", "Clean Architecture", "TDD", "Linux", "Web Security"]
  },
  {
    company: "4mti",
    position: "Desenvolvedor de software",
    period: "fevereiro de 2023 - outubro de 2023",
    description: "Desenvolvimento de aplicações web e APIs utilizando tecnologias modernas de backend e frontend. Implementação de modelos de machine learning para análise de dados e previsões.",
    technologies: ["Node.js", "React", "MongoDB", "PostgreSQL", "Docker", "PHP", "Python", "Apache Hadoop", "Apache Spark", "ETL", "Web Scraping", "Machine Learning", "Deep Learning", "Computer Vision", "NLP"]
  },
  {
    company: "4mti",
    position: "Cientista de dados",
    period: "outubro de 2020 - janeiro de 2021",
    description: "Análise de dados, desenvolvimento de modelos de machine learning e implementação de pipelines de ETL. Criação de soluções de visão computacional e processamento de linguagem natural.",
    technologies: ["Python", "Apache Hadoop", "Apache Spark", "PostgreSQL", "ETL", "Web Scraping", "PHP", "Node.js", "React", "MongoDB", "Docker", "Machine Learning", "Deep Learning", "Computer Vision", "NLP"]
  },
  {
    company: "4mti",
    position: "Desenvolvedor",
    period: "julho de 2020 - outubro de 2020",
    description: "Desenvolvimento de aplicações web e sistemas de crawling para coleta de dados. Implementação de algoritmos de machine learning para classificação e análise de dados coletados.",
    technologies: ["React.js", "Node.js", "ETL", "Apache Spark", "Web Scraping", "PHP", "Python", "Apache Hadoop", "MongoDB", "PostgreSQL", "Docker", "Machine Learning", "Deep Learning"]
  },
  {
    company: "RemOpt",
    position: "Estagiário em desenvolvimento",
    period: "dezembro de 2019 - junho de 2020",
    description: "Desenvolvimento de aplicações web, manutenção de intranet, testes de segurança e desenvolvimento back-end.",
    technologies: ["PHP", "jQuery", "MySQL", "HTML", "CSS", "Bootstrap"]
  }
];

// Dados das experiências para cálculo de proficiência
export const experiencesData: Experience[] = workExperienceFromAbout.map(exp => ({
  company: exp.company,
  position: exp.position,
  period: exp.period,
  description: exp.description,
  technologies: exp.technologies
}));

// Dados das certificações
export const certificationsData: Certification[] = [
  {
    name: "Formação Python e Orientação a Objetos",
    issuer: "Alura",
    year: "2022",
    credential: "3a85f507-74dd-4275-8d9e-0fc8f6356542",
    certificate_url: "https://cursos.alura.com.br/degree/certificate/3a85f507-74dd-4275-8d9e-0fc8f6356542"
  },
  {
    name: "Formação Certificação Docker DCA",
    issuer: "Alura",
    year: "2022",
    credential: "2b917d53-690c-4046-a539-e3f732c1344b",
    certificate_url: "https://cursos.alura.com.br/degree/certificate/2b917d53-690c-4046-a539-e3f732c1344b"
  },
  {
    name: "Engenharia de Dados: Conhecendo Apache Airflow",
    issuer: "Alura",
    year: "2022",
    credential: "d4c49d0f-8d45-4828-9f71-acb83ba6bb4e",
    certificate_url: "https://cursos.alura.com.br/certificate/d4c49d0f-8d45-4828-9f71-acb83ba6bb4e"
  },
  {
    name: "Git e GitHub: Controle e Compartilhe seu Código",
    issuer: "Alura",
    year: "2022",
    credential: "9d5dab14-d2cf-4942-a4a6-6018eac7c127",
    certificate_url: "https://cursos.alura.com.br/certificate/9d5dab14-d2cf-4942-a4a6-6018eac7c127"
  },
  {
    name: "Linux I: Conhecendo e Utilizando o Terminal",
    issuer: "Alura",
    year: "2021",
    credential: "7dbaff44-7c90-42c7-a6a0-5ffd876f04c3",
    certificate_url: "https://cursos.alura.com.br/certificate/7dbaff44-7c90-42c7-a6a0-5ffd876f04c3"
  },
  {
    name: "Linux II: Programas, Processos e Pacotes",
    issuer: "Alura",
    year: "2021",
    credential: "8bcc484e-a2e7-46d6-a79a-56a3ed4c3834",
    certificate_url: "https://cursos.alura.com.br/certificate/8bcc484e-a2e7-46d6-a79a-56a3ed4c3834"
  },
  {
    name: "GoStack 14",
    issuer: "Rocketseat",
    year: "2021",
    credential: "ed3d059f-1efa-4eb4-9684-050116ef38b8",
    certificate_url: "https://app.rocketseat.com.br/api/certificates/pdf/ed3d059f-1efa-4eb4-9684-050116ef38b8"
  },
  {
    name: "Fundamentos do React",
    issuer: "Rocketseat",
    year: "2025",
    credential: "6d3d7c18-cff8-4473-acd4-8231e577a4a4",
    certificate_url: "https://app.rocketseat.com.br/certificates/6d3d7c18-cff8-4473-acd4-8231e577a4a4"
  },
  {
    name: "Do Bug ao Bounty",
    issuer: "Certificado em Segurança",
    year: "2022",
    certificate_url: "#"
  }
];

// Lista de todas as habilidades no sistema (em inglês)
export const allSkills = [
  // Linguagens
  "PYTHON", "PHP", "NODE.JS", "TYPESCRIPT", "GO", "JAVASCRIPT",
  
  // Engenharia de Dados
  "ETL", "APACHE SPARK", "APACHE AIRFLOW", "APACHE HADOOP", 
  "APACHE NIFI", "APACHE HIVE", "DATA LAKES", "WEB SCRAPING", 
  "ELASTICSEARCH", "DATA ENGINEERING",
  
  // Inteligência Artificial
  "MACHINE LEARNING", "DEEP LEARNING", "GAN", "COMPUTER VISION", "NLP",
  
  // Bancos de Dados
  "POSTGRESQL", "MYSQL", "MONGODB", "REDIS",
  
  // Web & APIs
  "FASTAPI", "REST APIS", "GRAPHQL", "MICROSERVICES",
  
  // DevOps & Cloud
  "DOCKER", "KUBERNETES", "AWS", "CI/CD", "JENKINS", 
  "PROMETHEUS", "GRAFANA",
  
  // Arquitetura & Metodologias
  "CLEAN ARCHITECTURE", "PERFORMANCE", "AGILE", "TDD",
  
  // Segurança
  "WEB SECURITY", "CRYPTOGRAPHY", "PENETRATION TESTING", "API SECURITY",
  "LINUX", "SSRF", "CYBERSECURITY"
];

// Mapeamento de tecnologias para padronização
const technologyMapping: Record<string, string> = {
  // Linguagens de programação
  'golang': 'Go',
  'go lang': 'Go',
  'golang lang': 'Go',
  'python': 'Python',
  'py': 'Python',
  'javascript': 'JavaScript',
  'js': 'JavaScript',
  'typescript': 'TypeScript',
  'ts': 'TypeScript',
  'java': 'Java',
  'kotlin': 'Kotlin',
  'kt': 'Kotlin',
  'scala': 'Scala',
  'ruby': 'Ruby',
  'rb': 'Ruby',
  'php': 'PHP',
  'csharp': 'C#',
  'c#': 'C#',
  'c++': 'C++',
  'cpp': 'C++',
  'rust': 'Rust',
  'rs': 'Rust',
  'swift': 'Swift',
  'dart': 'Dart',
  'r': 'R',
  'rlang': 'R',

  // Frameworks e bibliotecas
  'react': 'React',
  'reactjs': 'React',
  'react.js': 'React',
  'angular': 'Angular',
  'angularjs': 'Angular',
  'vue': 'Vue.js',
  'vuejs': 'Vue.js',
  'vue.js': 'Vue.js',
  'next': 'Next.js',
  'nextjs': 'Next.js',
  'next.js': 'Next.js',
  'nuxt': 'Nuxt.js',
  'nuxtjs': 'Nuxt.js',
  'nuxt.js': 'Nuxt.js',
  'express': 'Express.js',
  'expressjs': 'Express.js',
  'express.js': 'Express.js',
  'nestjs': 'NestJS',
  'nest': 'NestJS',
  'django': 'Django',
  'flask': 'Flask',
  'fastapi': 'FastAPI',
  'fast api': 'FastAPI',
  'spring': 'Spring',
  'springboot': 'Spring Boot',
  'spring boot': 'Spring Boot',
  'laravel': 'Laravel',
  'symfony': 'Symfony',
  'rails': 'Ruby on Rails',
  'ruby on rails': 'Ruby on Rails',
  'ror': 'Ruby on Rails',

  // Bancos de dados
  'postgres': 'PostgreSQL',
  'postgresql': 'PostgreSQL',
  'mysql': 'MySQL',
  'mariadb': 'MariaDB',
  'mongodb': 'MongoDB',
  'mongo': 'MongoDB',
  'redis': 'Redis',
  'sqlite': 'SQLite',
  'sql server': 'SQL Server',
  'mssql': 'SQL Server',
  'oracle': 'Oracle',
  'cassandra': 'Cassandra',
  'neo4j': 'Neo4j',
  'dynamodb': 'DynamoDB',
  'dynamo': 'DynamoDB',

  // Cloud e DevOps
  'aws': 'AWS',
  'amazon web services': 'AWS',
  'azure': 'Azure',
  'microsoft azure': 'Azure',
  'gcp': 'Google Cloud',
  'google cloud': 'Google Cloud',
  'google cloud platform': 'Google Cloud',
  'docker': 'Docker',
  'kubernetes': 'Kubernetes',
  'k8s': 'Kubernetes',
  'terraform': 'Terraform',
  'ansible': 'Ansible',
  'jenkins': 'Jenkins',
  'gitlab': 'GitLab',
  'github': 'GitHub',
  'git': 'Git',
  'ci/cd': 'CI/CD',
  'cicd': 'CI/CD',
  'continuous integration': 'CI/CD',
  'continuous deployment': 'CI/CD',

  // Data Science e Machine Learning
  'ml': 'Machine Learning',
  'machine learning': 'Machine Learning',
  'aprendizado de máquina': 'Machine Learning',
  'ia': 'Artificial Intelligence',
  'ai': 'Artificial Intelligence',
  'inteligência artificial': 'Artificial Intelligence',
  'deep learning': 'Deep Learning',
  'aprendizado profundo': 'Deep Learning',
  'computer vision': 'Computer Vision',
  'visão computacional': 'Computer Vision',
  'cv': 'Computer Vision',
  'nlp': 'Natural Language Processing',
  'natural language processing': 'Natural Language Processing',
  'processamento de linguagem natural': 'Natural Language Processing',
  'pln': 'Natural Language Processing',
  'tensorflow': 'TensorFlow',
  'tf': 'TensorFlow',
  'pytorch': 'PyTorch',
  'scikit': 'Scikit-learn',
  'scikit-learn': 'Scikit-learn',
  'sklearn': 'Scikit-learn',
  'pandas': 'Pandas',
  'numpy': 'NumPy',
  'matplotlib': 'Matplotlib',
  'seaborn': 'Seaborn',
  'opencv': 'OpenCV',
  'spark': 'Apache Spark',
  'apache spark': 'Apache Spark',
  'hadoop': 'Apache Hadoop',
  'apache hadoop': 'Apache Hadoop',
  'airflow': 'Apache Airflow',
  'apache airflow': 'Apache Airflow',
  'kafka': 'Apache Kafka',
  'apache kafka': 'Apache Kafka',

  // Web e Frontend
  'html': 'HTML',
  'html5': 'HTML5',
  'css': 'CSS',
  'css3': 'CSS3',
  'sass': 'SASS',
  'scss': 'SASS',
  'less': 'LESS',
  'bootstrap': 'Bootstrap',
  'tailwind': 'Tailwind CSS',
  'tailwindcss': 'Tailwind CSS',
  'material ui': 'Material UI',
  'mui': 'Material UI',
  'material-ui': 'Material UI',
  'chakra': 'Chakra UI',
  'chakraui': 'Chakra UI',
  'chakra-ui': 'Chakra UI',
  'jquery': 'jQuery',
  'redux': 'Redux',
  'mobx': 'MobX',
  'graphql': 'GraphQL',
  'rest': 'REST',
  'restful': 'REST',
  'rest api': 'REST',
  'soap': 'SOAP',
  'grpc': 'gRPC',
  'websocket': 'WebSocket',
  'socket.io': 'Socket.io',
  'socketio': 'Socket.io',

  // Mobile
  'react native': 'React Native',
  'react-native': 'React Native',
  'rn': 'React Native',
  'flutter': 'Flutter',
  'android': 'Android',
  'ios': 'iOS',
  'swiftui': 'SwiftUI',
  'swift ui': 'SwiftUI',
  'jetpack compose': 'Jetpack Compose',
  'jetpackcompose': 'Jetpack Compose',

  // Testes
  'jest': 'Jest',
  'mocha': 'Mocha',
  'chai': 'Chai',
  'cypress': 'Cypress',
  'selenium': 'Selenium',
  'pytest': 'Pytest',
  'unittest': 'UnitTest',
  'junit': 'JUnit',
  'testng': 'TestNG',
  'rspec': 'RSpec',
  'phpunit': 'PHPUnit'
};

// Função para normalizar o nome da tecnologia
export const normalizeTechnology = (tech: string): string => {
  if (!tech) return '';
  
  // Converter para minúsculas e remover espaços extras
  const normalized = tech.toLowerCase().trim();
  
  // Verificar se existe um mapeamento direto
  if (technologyMapping[normalized]) {
    return technologyMapping[normalized];
  }
  
  // Verificar variações com espaços e caracteres especiais
  const variations = Object.keys(technologyMapping).filter(key => {
    const keyNormalized = key.toLowerCase().replace(/[^a-z0-9]/g, '');
    const techNormalized = normalized.replace(/[^a-z0-9]/g, '');
    return keyNormalized === techNormalized;
  });
  
  if (variations.length > 0) {
    return technologyMapping[variations[0]];
  }
  
  // Se não encontrar correspondência, retorna o nome original capitalizado
  return tech.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Encontrar projetos relacionados a uma habilidade
export function getProjectsForSkill(skill: string): Project[] {
  const normalizedSkill = normalizeTechnology(skill);
  
  return projectsData.filter(project => {
    // Verifica se a habilidade está listada explicitamente
    if (project.skills.some(s => normalizeTechnology(s) === normalizedSkill)) {
      return true;
    }
    
    // Verifica se a habilidade é mencionada na descrição
    if (findSkillsInText(project.description, [normalizedSkill]).length > 0) {
      return true;
    }
    
    // Verifica variações comuns da habilidade
    const skillVariations: Record<string, string[]> = {
      "python": ["python", "pytorch", "pandas", "numpy", "scikit-learn"],
      "node.js": ["node", "nodejs", "express", "nestjs"],
      "typescript": ["typescript", "ts"],
      "go": ["go", "golang"],
      "javascript": ["javascript", "js", "react", "vue", "angular"],
      "apache spark": ["spark", "pyspark"],
      "apache airflow": ["airflow"],
      "fastapi": ["fastapi", "fast api"],
      "docker": ["docker", "container"],
      "kubernetes": ["kubernetes", "k8s"],
      "aws": ["aws", "amazon web services", "s3", "ec2", "lambda"],
      "postgresql": ["postgres", "postgresql", "postgre"],
      "mongodb": ["mongodb", "mongo"],
      "redis": ["redis"],
      "etl": ["etl", "extract transform load"],
      "data engineering": ["data engineering", "data engineer"],
      "machine learning": ["machine learning", "ml", "ai", "artificial intelligence"],
      "deep learning": ["deep learning", "dl", "neural networks"],
      "web scraping": ["web scraping", "scraping", "crawler", "crawling"],
      "rest apis": ["rest", "api", "apis", "restful"],
      "graphql": ["graphql", "gql"],
      "microservices": ["microservices", "microservice"],
      "clean architecture": ["clean architecture", "clean code"],
      "tdd": ["tdd", "test driven development"],
      "agile": ["agile", "scrum", "kanban"],
      "web security": ["security", "web security", "cybersecurity"],
      "linux": ["linux", "ubuntu", "debian", "centos"],
      "ci/cd": ["ci/cd", "continuous integration", "continuous deployment"]
    };
    
    // Verifica variações da habilidade
    const variations = skillVariations[normalizedSkill];
    if (variations) {
      return variations.some(variation => {
        // Verifica na descrição
        if (project.description.toLowerCase().includes(variation)) {
          return true;
        }
        // Verifica nas habilidades
        return project.skills.some(s => normalizeTechnology(s).toLowerCase().includes(variation));
      });
    }
    
    return false;
  });
}

// Encontrar experiências relacionadas a uma habilidade
export function getExperiencesForSkill(skill: string): Experience[] {
  const normalizedSkill = normalizeTechnology(skill);
  
  return experiencesData.filter(experience => {
    // Verifica se a habilidade está listada nas tecnologias
    if (experience.technologies.some(tech => normalizeTechnology(tech) === normalizedSkill)) {
      return true;
    }
    
    // Verifica se a habilidade é mencionada na descrição
    return findSkillsInText(experience.description, [normalizedSkill]).length > 0;
  });
}

// Função para calcular o tempo total de experiência com uma tecnologia
function calculateTotalExperienceYears(experiences: Experience[], skill: string): number {
  let totalMonths = 0;
  
  experiences.forEach(exp => {
    if (exp.technologies.some((tech: string) => normalizeTechnology(tech) === skill)) {
      const [startStr, endStr] = exp.period.split('-').map(p => p.trim());
      
      // Converter datas para objetos Date
      const getDate = (dateStr: string): Date => {
        const months = {
          'janeiro': 0, 'fevereiro': 1, 'março': 2, 'abril': 3, 'maio': 4, 'junho': 5,
          'julho': 6, 'agosto': 7, 'setembro': 8, 'outubro': 9, 'novembro': 10, 'dezembro': 11
        };
        
        const parts = dateStr.toLowerCase().split(' de ');
        const month = months[parts[0] as keyof typeof months];
        const year = parseInt(parts[1]);
        
        return new Date(year, month);
      };
      
      const startDate = getDate(startStr);
      const endDate = endStr.toLowerCase().includes('presente') 
        ? new Date() 
        : getDate(endStr);
      
      const monthDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                       (endDate.getMonth() - startDate.getMonth());
      
      totalMonths += monthDiff;
    }
  });
  
  return totalMonths / 12; // Converter meses para anos
}

// Função melhorada para encontrar certificações relacionadas a uma habilidade
function getCertificationsForSkill(skill: string): Certification[] {
  const normalizedSkill = normalizeTechnology(skill);
  
  // Regex patterns para cada habilidade
  const skillPatterns: Record<string, RegExp[]> = {
    "python": [
      /python/i,
      /orientação\s+a\s+objetos/i,
      /data\s+science/i,
      /machine\s+learning/i,
      /scikit[\s-]learn/i,
      /pandas/i,
      /numpy/i
    ],
    "docker": [
      /docker/i,
      /container/i,
      /dca/i,
      /containerização/i
    ],
    "apache airflow": [
      /airflow/i,
      /apache\s+airflow/i,
      /orquestração\s+de\s+dados/i,
      /pipeline/i
    ],
    "apache spark": [
      /spark/i,
      /apache\s+spark/i,
      /big\s+data/i,
      /processamento\s+distribuído/i
    ],
    "git": [
      /git/i,
      /github/i,
      /controle\s+de\s+versão/i,
      /versionamento/i
    ],
    "linux": [
      /linux/i,
      /terminal/i,
      /shell/i,
      /unix/i,
      /sistema\s+operacional/i
    ],
    "node.js": [
      /node\.?js/i,
      /javascript/i,
      /typescript/i,
      /backend/i,
      /express/i,
      /npm/i
    ],
    "react": [
      /react/i,
      /frontend/i,
      /web/i,
      /javascript/i,
      /componentes/i
    ],
    "web security": [
      /security/i,
      /segurança/i,
      /penetration\s+testing/i,
      /pentest/i,
      /bug\s+bounty/i,
      /vulnerabilidade/i,
      /hacking/i
    ],
    "data engineering": [
      /engenharia\s+de\s+dados/i,
      /data\s+engineering/i,
      /etl/i,
      /pipeline/i,
      /big\s+data/i
    ],
    "machine learning": [
      /machine\s+learning/i,
      /ml/i,
      /ia/i,
      /inteligência\s+artificial/i,
      /deep\s+learning/i,
      /ai/i
    ],
    "postgresql": [
      /postgres/i,
      /postgresql/i,
      /sql/i,
      /banco\s+de\s+dados/i,
      /database/i
    ],
    "mongodb": [
      /mongo/i,
      /mongodb/i,
      /nosql/i,
      /banco\s+de\s+dados/i,
      /database/i
    ],
    "fastapi": [
      /fastapi/i,
      /api/i,
      /python/i,
      /web/i,
      /rest/i
    ],
    "aws": [
      /aws/i,
      /amazon/i,
      /cloud/i,
      /nuvem/i,
      /s3/i,
      /ec2/i
    ],
    "kubernetes": [
      /kubernetes/i,
      /k8s/i,
      /container/i,
      /orquestração/i,
      /docker/i
    ],
    "typescript": [
      /typescript/i,
      /ts/i,
      /javascript/i,
      /programação/i,
      /web/i
    ],
    "go": [
      /\bgo\b/i,
      /golang/i,
      /programação/i,
      /backend/i
    ]
  };

  return certificationsData.filter(cert => {
    // Nome da certificação em minúsculo para comparação
    const certName = cert.name.toLowerCase();
    const certIssuer = cert.issuer.toLowerCase();
    const textToSearch = `${certName} ${certIssuer}`;
    
    // Verifica diretamente pelo nome da habilidade
    if (textToSearch.includes(normalizedSkill.toLowerCase())) {
      return true;
    }
    
    // Verifica usando os padrões regex
    const patterns = skillPatterns[normalizedSkill.toLowerCase()];
    if (patterns) {
      return patterns.some(pattern => pattern.test(textToSearch));
    }
    
    return false;
  });
}

// Função para calcular proficiência em uma habilidade
export function getSkillProficiency(skill: string) {
  const normalizedSkill = normalizeTechnology(skill);
  
  // Definir valores fixos para habilidades de IA
  const aiSkillsData: Record<string, { score: number, level: string, yearsOfExperience: number, projectCount: number, certCount: number }> = {
    'MACHINE LEARNING': { score: 23, level: 'beginner', yearsOfExperience: 1, projectCount: 1, certCount: 1 },
    'DEEP LEARNING': { score: 17, level: 'beginner', yearsOfExperience: 1, projectCount: 1, certCount: 0 },
    'GAN': { score: 0, level: 'beginner', yearsOfExperience: 0, projectCount: 0, certCount: 0 },
    'COMPUTER VISION': { score: 9, level: 'beginner', yearsOfExperience: 1, projectCount: 0, certCount: 0 },
    'NLP': { score: 9, level: 'beginner', yearsOfExperience: 1, projectCount: 0, certCount: 0 }
  };

  // Se for uma habilidade de IA, usar os valores fixos
  if (aiSkillsData[normalizedSkill]) {
    const data = aiSkillsData[normalizedSkill];
    const projects = getProjectsForSkill(normalizedSkill);
    const experiences = getExperiencesForSkill(normalizedSkill);
    const certifications = getCertificationsForSkill(normalizedSkill);

    return {
      skill: normalizedSkill,
      score: data.score,
      level: data.level,
      projects,
      experiences,
      certifications,
      stats: {
        yearsOfExperience: data.yearsOfExperience,
        projectCount: data.projectCount,
        certificationCount: data.certCount
      },
      contributions: {
        experience: 60,
        projects: 20,
        certifications: 20
      }
    };
  }

  // Para outras habilidades, usar o cálculo normal
  const projects = getProjectsForSkill(normalizedSkill);
  const experiences = getExperiencesForSkill(normalizedSkill);
  const certifications = getCertificationsForSkill(normalizedSkill);
  
  // Calcular anos de experiência
  const rawYearsOfExperience = calculateTotalExperienceYears(experiences, normalizedSkill);
  const yearsOfExperience = Math.round(rawYearsOfExperience);
  
  // Se tem 5 anos ou mais de experiência, considerar como avançado automaticamente
  if (yearsOfExperience >= 5) {
    return {
      skill: normalizedSkill,
      score: 90,
      level: 'advanced',
      projects,
      experiences,
      certifications,
      stats: {
        yearsOfExperience,
        projectCount: projects.length,
        certificationCount: certifications.length
      },
      contributions: {
        experience: 60,
        projects: 20,
        certifications: 20
      }
    };
  }
  
  // Caso contrário, calcular pontuação normalmente
  const result = calculateProficiency(
    normalizedSkill,
    projects,
    experiences,
    certifications
  );
  
  // Separar os resultados
  const { score, level, stats, contributions } = result;
  
  return {
    skill: normalizedSkill,
    score,
    level,
    projects,
    experiences,
    certifications,
    stats: {
      ...stats,
      yearsOfExperience
    },
    contributions
  };
}

// Traduzir dados de habilidade para o idioma selecionado
export function getLocalizedSkillData(skill: string, locale: string = 'pt') {
  const normalizedSkill = normalizeTechnology(skill);
  const { score, level, projects, experiences, certifications, stats, contributions } = getSkillProficiency(normalizedSkill);
  
  // Traduzir o nome da habilidade
  const localizedSkill = translateSkill(normalizedSkill, locale);
  
  return {
    skill: localizedSkill,
    normalizedSkill,
    score,
    level,
    projects,
    experiences,
    certifications,
    stats,
    contributions
  };
}

// Adicionar função auxiliar para categorização
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
    'APACHE HADOOP': 'data',
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
    'ELASTICSEARCH': 'databases',
    
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