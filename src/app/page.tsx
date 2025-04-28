import { redirect } from 'next/navigation';

// Redireciona para a versão em português por padrão
export default function Home() {
  redirect('/pt');
} 