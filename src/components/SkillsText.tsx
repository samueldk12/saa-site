import React, { ReactNode } from 'react';
import SkillBadge from './SkillBadge';
import { allSkills } from '@/lib/skillsData';
import { getLocalizedSkillData } from '@/lib/skillsData';
import { translateSkill } from '@/lib/translateSkill';

type SkillsTextProps = {
  text: string;
  locale?: string;
  className?: string;
}

// Mapeamento para agrupar habilidades relacionadas
const skillGroupings: Record<string, string> = {
  "etl": "ETL/ELT",
  "elt": "ETL/ELT"
};

// Função para formatar o nome da habilidade (primeira letra maiúscula)
const formatSkillName = (skill: string): string => {
  // Se for ETL ou ELT, retornar o valor agrupado
  const lowerSkill = skill.toLowerCase();
  if (skillGroupings[lowerSkill]) {
    return skillGroupings[lowerSkill];
  }
  
  // Caso contrário, garantir que a primeira letra seja maiúscula
  return skill.charAt(0).toUpperCase() + skill.slice(1);
};

export default function SkillsText({ text, locale = 'pt', className = '' }: SkillsTextProps) {
  // Lista de habilidades organizadas por tamanho (da maior para a menor)
  // Isso ajuda a garantir que "Apache Spark" seja detectado antes de "Spark"
  const sortedSkills = [...allSkills].sort((a, b) => b.length - a.length);
  
  // Traduzir todas as habilidades para o idioma atual
  const localizedSkills = sortedSkills.map(skill => translateSkill(skill, locale));
  
  // Função para verificar se um fragmento de texto contém uma habilidade
  const containsSkill = (fragment: string): { skill: string, index: number, length: number } | null => {
    // Normalizar o texto para comparação (remover acentos, colocar em lowercase)
    const normalizedFragment = fragment.toLowerCase();
    
    for (let i = 0; i < localizedSkills.length; i++) {
      const skill = localizedSkills[i];
      const normalizedSkill = skill.toLowerCase();
      
      // Verificar se o fragmento contém a habilidade como uma palavra completa
      // Usando expressão regular para garantir que é uma palavra completa
      const regex = new RegExp(`\\b${normalizedSkill}\\b`, 'i');
      const match = normalizedFragment.match(regex);
      
      if (match && match.index !== undefined) {
        return {
          skill,
          index: match.index,
          length: skill.length
        };
      }
    }
    
    return null;
  };
  
  // Função recursiva para processar o texto e substituir habilidades por links
  const processText = (text: string): ReactNode[] => {
    if (!text) return [];
    
    const result: ReactNode[] = [];
    let remainingText = text;
    let currentIndex = 0;
    
    while (remainingText.length > 0) {
      const skillInfo = containsSkill(remainingText);
      
      if (skillInfo) {
        // Adicionar texto antes da habilidade encontrada
        if (skillInfo.index > 0) {
          result.push(remainingText.substring(0, skillInfo.index));
        }
        
        // Obter a habilidade real do texto (mantendo a capitalização original)
        const originalSkill = remainingText.substring(skillInfo.index, skillInfo.index + skillInfo.length);
        
        // Formatar o nome da habilidade (primeira letra maiúscula)
        const formattedSkill = formatSkillName(originalSkill);
        
        // Obter dados de proficiência
        const { level } = getLocalizedSkillData(skillInfo.skill, locale);
        
        // Adicionar o link da habilidade
        result.push(
          <SkillBadge 
            key={`skill-${currentIndex}`}
            skill={skillInfo.skill}
            level={level}
            className="mx-0.5"
          >
            {formattedSkill}
          </SkillBadge>
        );
        
        // Atualizar o texto restante
        remainingText = remainingText.substring(skillInfo.index + skillInfo.length);
        currentIndex++;
      } else {
        // Se não encontrar mais habilidades, adicionar o restante do texto
        result.push(remainingText);
        break;
      }
    }
    
    return result;
  };
  
  return (
    <span className={className}>
      {processText(text)}
    </span>
  );
} 