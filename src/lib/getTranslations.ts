import ptMessages from '../messages/pt.json';
import enMessages from '../messages/en.json';
import esMessages from '../messages/es.json';

// Tipo para definir as mensagens
type Messages = Record<string, any>;

// Objeto com todas as mensagens por locale
const messages: Record<string, Messages> = {
  pt: ptMessages,
  en: enMessages,
  es: esMessages,
};

// Função para obter as traduções - versão com namespace explícito
export function getTranslationsWithNamespace(locale: string, namespace: string) {
  // Verifica se o locale existe, caso contrário usa o padrão (pt)
  const localeMessages = messages[locale] || messages.pt;
  
  // Obtém as mensagens do namespace especificado
  const namespaceMessages = localeMessages[namespace] || {};
  
  // Retorna uma função que busca as mensagens pelo caminho
  return function t(key: string): string {
    // Divide o caminho por pontos (ex: 'form.submit')
    const keys = key.split('.');
    
    // Inicia com as mensagens do namespace
    let value: any = namespaceMessages;
    
    // Percorre o caminho para encontrar a mensagem
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation missing: ${namespace}.${key}`);
        return key;
      }
    }
    
    return value;
  };
}

// Nova versão da função que retorna o objeto inteiro de traduções
export function getTranslations(locale: string) {
  // Verifica se o locale existe, caso contrário usa o padrão (pt)
  return messages[locale] || messages.pt;
} 