// Legendas e marcacoes de tempo da narracao da timeline (About), extraidas
// dos arquivos de legenda (.srt) gerados junto com o audio via edge-tts.
// `company` identifica a frase que fala de uma experiencia especifica,
// usado pra sincronizar o destaque da timeline com o que esta sendo dito.
export type NarrationCue = {
  start: number;
  end: number;
  text: string;
  company?: string;
};

export const TIMELINE_NARRATION: Record<'pt' | 'en' | 'es', NarrationCue[]> = {
  pt: [
    { start: 0.10, end: 3.53, text: 'Toda jornada começa com um primeiro passo.' },
    { start: 3.48, end: 16.94, text: 'A de Samuel Apolinário Arão começou na RemOpt, no fim de 2019, como estagiário de desenvolvimento: os primeiros testes de segurança, as primeiras linhas de código que importavam de verdade.', company: 'RemOpt' },
    { start: 16.94, end: 34.25, text: 'Dali em diante, a 4mti se tornou uma escola por si só: primeiro como desenvolvedor de aplicações web e sistemas de coleta de dados, depois como cientista de dados, mergulhando em machine learning, visão computacional e processamento de linguagem natural.', company: '4mti' },
    { start: 34.25, end: 37.51, text: 'Cada projeto era uma nova fronteira.' },
    { start: 37.51, end: 50.82, text: 'Em 2021, a TO Brasil trouxe o desafio da escala: pipelines de dados robustos, sistemas de ETL, integrações complexas, sustentadas por quatro anos de trabalho contínuo.', company: 'TO Brasil' },
    { start: 50.82, end: 56.56, text: 'Em 2025, a Kriptos abriu as portas da consultoria de BI sênior.', company: 'Kriptos' },
    { start: 56.56, end: 70.83, text: 'E, poucos meses depois, veio o capítulo atual: engenheiro de dados na MPMG, construindo arquiteturas escaláveis e sustentando iniciativas de grande volume junto ao Ministério Público de Minas Gerais.', company: 'MPMG' },
    { start: 70.83, end: 74.06, text: 'De estagiário a engenheiro de dados.' },
    { start: 74.06, end: 79.42, text: 'De pequenos scripts a arquiteturas que sustentam instituições inteiras.' },
    { start: 79.42, end: 82.27, text: 'Essa é a trajetória de Samuel.' },
    { start: 82.27, end: 85.01, text: 'E ela continua sendo escrita.' },
  ],
  en: [
    { start: 0.10, end: 3.32, text: 'Every journey begins with a first step.' },
    { start: 3.27, end: 14.20, text: "Samuel Apolinário Arão's began at RemOpt, in late 2019, as a development intern: the first security tests, the first lines of code that truly mattered.", company: 'RemOpt' },
    { start: 14.20, end: 27.28, text: 'From there, 4mti became a school of its own: first as a web developer building data-collection systems, then as a data scientist, diving into machine learning, computer vision, and natural language processing.', company: '4mti' },
    { start: 27.28, end: 30.42, text: 'Every project was a new frontier.' },
    { start: 30.42, end: 41.51, text: 'In 2021, TO Brasil brought the challenge of scale: robust data pipelines, ETL systems, complex integrations, sustained across four years of continuous work.', company: 'TO Brasil' },
    { start: 41.51, end: 47.04, text: 'In 2025, Kriptos opened the doors to senior BI consulting.', company: 'Kriptos' },
    { start: 47.04, end: 58.34, text: 'And, months later, came the current chapter: data engineer at MPMG, building scalable architectures and powering large-scale initiatives for the Public Ministry of Minas Gerais.', company: 'MPMG' },
    { start: 58.34, end: 61.40, text: 'From intern to data engineer.' },
    { start: 61.40, end: 66.41, text: 'From small scripts to architectures that sustain entire institutions.' },
    { start: 66.41, end: 68.95, text: "This is Samuel's journey." },
    { start: 68.95, end: 71.55, text: 'And it is still being written.' },
  ],
  es: [
    { start: 0.10, end: 3.48, text: 'Todo viaje comienza con un primer paso.' },
    { start: 3.43, end: 15.89, text: 'El de Samuel Apolinário Arão empezó en RemOpt, a fines de 2019, como pasante de desarrollo: las primeras pruebas de seguridad, las primeras líneas de código que realmente importaban.', company: 'RemOpt' },
    { start: 15.89, end: 32.55, text: 'A partir de ahí, 4mti se convirtió en una escuela propia: primero como desarrollador web construyendo sistemas de recolección de datos, después como científico de datos, sumergido en machine learning, visión por computadora y procesamiento de lenguaje natural.', company: '4mti' },
    { start: 32.55, end: 35.77, text: 'Cada proyecto era una nueva frontera.' },
    { start: 35.77, end: 48.84, text: 'En 2021, TO Brasil trajo el desafío de la escala: pipelines de datos robustos, sistemas de ETL, integraciones complejas, sostenidas durante cuatro años de trabajo continuo.', company: 'TO Brasil' },
    { start: 48.84, end: 54.37, text: 'En 2025, Kriptos abrió las puertas de la consultoría senior de BI.', company: 'Kriptos' },
    { start: 54.37, end: 68.50, text: 'Y, meses después, llegó el capítulo actual: ingeniero de datos en MPMG, construyendo arquitecturas escalables y sosteniendo iniciativas de gran volumen junto al Ministerio Público de Minas Gerais.', company: 'MPMG' },
    { start: 68.50, end: 71.41, text: 'De pasante a ingeniero de datos.' },
    { start: 71.41, end: 76.44, text: 'De pequeños scripts a arquitecturas que sostienen instituciones enteras.' },
    { start: 76.44, end: 79.18, text: 'Este es el camino de Samuel.' },
    { start: 79.18, end: 82.12, text: 'Y todavía se sigue escribiendo.' },
  ],
};

export function getNarrationLocale(locale: string): 'pt' | 'en' | 'es' {
  return locale === 'en' || locale === 'es' ? locale : 'pt';
}

export function findCueIndex(cues: NarrationCue[], time: number): number {
  for (let i = 0; i < cues.length; i++) {
    if (time >= cues[i].start && time < cues[i].end) return i;
  }
  return -1;
}
