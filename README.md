# Site Pessoal - Samuel Apolinário Arão

Este é o site pessoal de Samuel Apolinário Arão, desenvolvido com Next.js, TypeScript e Tailwind CSS. O site apresenta informações sobre projetos, habilidades e experiência profissional, com suporte a múltiplos idiomas (Português, Inglês e Espanhol).

## Características

- Design moderno e responsivo
- Suporte a múltiplos idiomas (PT, EN, ES)
- Animações suaves com Framer Motion
- Interface interativa e dinâmica
- Seções para projetos, habilidades e contato
- Download de currículo
- Links para redes sociais e contatos

## Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- next-intl (internacionalização)
- React Icons

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/samueldk12/saa-site.git
cd saa-site
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse o site em:
```
http://localhost:3000
```

## Estrutura do Projeto

```
src/
├── app/
│   └── [locale]/
│       ├── about/
│       ├── contact/
│       ├── projects/
│       ├── skills/
│       └── layout.tsx
├── components/
│   └── Navigation.tsx
├── messages/
│   ├── pt.json
│   ├── en.json
│   └── es.json
└── i18n.ts
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. 