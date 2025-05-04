import React, { ReactNode } from 'react';
import SkillLink from './SkillLink';
import { getProficiencyColor } from '@/lib/calculateProficiency';

export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface SkillBadgeProps {
  skill: string;
  category?: string;
  level?: ProficiencyLevel;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
  noLink?: boolean;
  children?: React.ReactNode;
}

// Função auxiliar para obter as classes do badge
const getBadgeClasses = (level: string) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors';
  const colorClasses = {
    expert: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    advanced: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    beginner: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
  };
  
  return `${baseClasses} ${colorClasses[level as keyof typeof colorClasses] || colorClasses.beginner}`;
};

export default function SkillBadge({ 
  skill, 
  category, 
  level = 'intermediate',
  size = 'md',
  className = '', 
  icon,
  children,
  noLink = false
}: SkillBadgeProps) {
  // Validação para garantir que skill não seja undefined
  if (!skill) {
    console.warn('SkillBadge: prop "skill" é obrigatória');
    return null;
  }

  const badgeClasses = getBadgeClasses(level);
  const badgeContent = (
    <span className={`${badgeClasses} ${className}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {children || skill}
    </span>
  );
  
  if (noLink) {
    return badgeContent;
  }
  
  return (
    <SkillLink skill={skill} category={category}>
      {badgeContent}
    </SkillLink>
  );
} 