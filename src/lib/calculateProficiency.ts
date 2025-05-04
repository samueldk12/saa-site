// Tipo para dados de projetos
export interface Project {
  name: string;
  description: string;
  url: string;
  skills: string[];
}

// Tipo para dados de experiências
export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
}

// Tipo para dados de certificações
export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credential?: string;
  certificate_url: string;
}

// Função auxiliar para calcular a duração de uma experiência em meses
function calculateExperienceDuration(period: string): number {
  try {
    // Extrai as datas do formato "mês de ano - mês de ano" ou "mês de ano - Presente"
    const dates = period.split('-').map(d => d.trim());
    const startDate = parsePortugueseDate(dates[0]);
    
    // Se o fim é "Presente", usa a data atual
    const endDate = dates[1].toLowerCase().includes('presente') 
      ? new Date() 
      : parsePortugueseDate(dates[1]);
    
    // Calcula a diferença em meses
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                   (endDate.getMonth() - startDate.getMonth());
    
    return Math.max(1, months); // No mínimo 1 mês
  } catch (error) {
    // Em caso de erro no parsing da data, retorna um valor padrão de 6 meses
    return 6;
  }
}

// Função auxiliar para converter datas em português para objetos Date
function parsePortugueseDate(dateStr: string): Date {
  // Mapear meses em português para números
  const monthMap: Record<string, number> = {
    'janeiro': 0, 'fevereiro': 1, 'março': 2, 'abril': 3,
    'maio': 4, 'junho': 5, 'julho': 6, 'agosto': 7,
    'setembro': 8, 'outubro': 9, 'novembro': 10, 'dezembro': 11
  };
  
  // Extrair mês e ano do formato "mês de ano"
  const parts = dateStr.split(' de ');
  const month = monthMap[parts[0].toLowerCase()];
  const year = parseInt(parts[1]);
  
  return new Date(year, month);
}

// Função para encontrar habilidades mencionadas em texto
export function findSkillsInText(text: string, skillNames: string[]): string[] {
  if (!text) return [];
  
  const normalizedText = text.toLowerCase();
  
  return skillNames.filter(skill => {
    const normalizedSkill = skill.toLowerCase();
    return normalizedText.includes(normalizedSkill);
  });
}

// Função principal para calcular a proficiência
export function calculateProficiency(
  skill: string,
  projects: Project[] = [],
  experiences: Experience[] = [],
  certifications: Certification[] = []
): { 
  score: number; 
  level: string;
  stats: {
    yearsOfExperience: number;
    projectCount: number;
    certificationCount: number;
  };
  contributions: { 
    projects: number; 
    experience: number; 
    certifications: number 
  } 
} {
  // Pesos para cada componente
  const weights = {
    projects: 0.25,     // 25% do peso
    experience: 0.5,    // 50% do peso
    certifications: 0.25 // 25% do peso
  };
  
  // Calcular pontuação de projetos (cada projeto vale 20 pontos)
  const projectScore = Math.min(100, projects.length * 20);
  
  // Calcular pontuação de experiência
  // - Soma os meses de experiência (cada 6 meses = 10 pontos, max 100)
  const totalMonths = experiences.reduce((sum, exp) => {
    return sum + calculateExperienceDuration(exp.period);
  }, 0);
  const experienceScore = Math.min(100, (totalMonths / 6) * 10);
  
  // Calcular pontuação de certificações (cada certificação vale 25 pontos)
  const certificationScore = Math.min(100, certifications.length * 25);
  
  // Calcular as contribuições individuais para a pontuação final
  const projectContribution = projectScore * weights.projects;
  const experienceContribution = experienceScore * weights.experience;
  const certificationContribution = certificationScore * weights.certifications;
  
  // Calcular a pontuação ponderada final (0-100)
  const finalScore = 
    projectContribution +
    experienceContribution +
    certificationContribution;
  
  // Calcular as porcentagens de contribuição para o total
  const totalContributed = projectContribution + experienceContribution + certificationContribution;
  
  // Calcular estatísticas para exibição
  const yearsOfExperience = Math.ceil(totalMonths / 12); // Arredonda para cima para garantir pelo menos 1 ano
  
  // Determinar o nível baseado na pontuação
  const level = getProficiencyLevel(Math.round(finalScore));
  
  return {
    score: Math.round(finalScore),
    level,
    stats: {
      yearsOfExperience,
      projectCount: projects.length,
      certificationCount: certifications.length
    },
    contributions: {
      projects: totalContributed > 0 ? Math.round((projectContribution / totalContributed) * 100) : 0,
      experience: totalContributed > 0 ? Math.round((experienceContribution / totalContributed) * 100) : 0,
      certifications: totalContributed > 0 ? Math.round((certificationContribution / totalContributed) * 100) : 0
    }
  };
}

// Função para determinar o nível de proficiência baseado na pontuação
export function getProficiencyLevel(score: number): 'beginner' | 'intermediate' | 'advanced' | 'expert' {
  if (score >= 90) return 'expert';
  if (score >= 70) return 'advanced';
  if (score >= 40) return 'intermediate';
  return 'beginner';
}

// Função para obter a cor associada ao nível de proficiência
export function getProficiencyColor(level: string): string {
  switch (level) {
    case 'expert': return 'blue';
    case 'advanced': return 'green';
    case 'intermediate': return 'yellow';
    case 'beginner': 
    default: return 'gray';
  }
} 