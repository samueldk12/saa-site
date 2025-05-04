import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

type SkillLinkProps = {
  skill: string;
  category?: string;
  children: ReactNode;
  className?: string;
};

// Mapeamento de habilidades para categorias
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

export default function SkillLink({ skill, category, children, className = '' }: SkillLinkProps) {
  const params = useParams();
  const [currentLocale, setCurrentLocale] = useState<string>('pt');
  
  // Usar useEffect para garantir que estamos no lado do cliente ao acessar localStorage
  useEffect(() => {
    // Pegar o locale dos parâmetros de rota
    const routeLocale = params?.locale as string;
    // Pegar o locale do localStorage como fallback
    const storedLocale = typeof window !== 'undefined' ? localStorage.getItem('preferredLocale') : null;
    
    // Usar o locale da rota, ou o armazenado, ou o padrão 'pt'
    const localeToUse = routeLocale || storedLocale || 'pt';
    setCurrentLocale(localeToUse);
    
    // Se o locale foi determinado e não está no localStorage, salvá-lo
    if (localeToUse && typeof window !== 'undefined') {
      localStorage.setItem('preferredLocale', localeToUse);
    }
  }, [params]);
  
  // Determinar a categoria da habilidade
  const skillCategory = category || skillCategoryMap[skill] || 'languages';
  
  // Criar slug da habilidade (para URL)
  const skillSlug = skill.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Construir a URL usando o locale atual
  const href = `/${currentLocale}/skills/${skillCategory}/${skillSlug}`;
  
  return (
    <Link 
      href={href}
      className={`text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
} 