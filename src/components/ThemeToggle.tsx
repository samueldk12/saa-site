'use client';

import { useTheme } from '@/app/providers';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors duration-200"
      aria-label={isDark ? "Alternar para tema claro" : "Alternar para tema escuro"}
      title={isDark ? "Alternar para tema claro" : "Alternar para tema escuro"}
    >
      {isDark ? (
        <FaSun className="text-yellow-500 w-5 h-5" />
      ) : (
        <FaMoon className="text-blue-600 w-5 h-5" />
      )}
    </button>
  );
} 