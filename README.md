# Usuários

Aplicação em **React + Vite + TypeScript** que consome a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) e exibe uma lista de usuários com busca, ordenação, detalhes e tema claro/escuro.

## Como rodar

Pré-requisito: Node.js 18 ou superior.

```bash
npm install
npm run dev
```

Depois abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

| Comando           | O que faz                                    |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento         |
| `npm test`        | Executa os testes (Jest + Testing Library)   |
| `npm run build`   | Verifica os tipos e gera o build de produção |
| `npm run preview` | Serve localmente o build de produção         |

## Funcionalidades

- **Listagem** de usuários com nome e email, vinda de `https://jsonplaceholder.typicode.com/users`.
- **Busca por nome**, sem diferenciar maiúsculas de minúsculas nem acentos.
- **Ordenação A–Z** por botão (desligado, mantém a ordem original da API).
- **Detalhes** ao clicar em um usuário, em um modal com nome completo, email, telefone, empresa e cidade.
- **Copiar informações** do usuário com um clique, direto no modal.
- **Visualização em grade ou lista**, alternável por um botão de ícone.
- **Tema claro/escuro**: na primeira visita segue a preferência do sistema e depois lembra a escolha.
- **Estados de carregando** (esqueletos dos cards) e **de erro** (com botão "Tentar novamente").

## Tecnologias

React 18 · Vite 6 · TypeScript · CSS Modules · Jest 30 · React Testing Library

## Estrutura do projeto

```
├── public/
│   └── favicon.svg
├── src/
│   ├── components/      # Componentes de interface (um .tsx + um .module.css cada)
│   ├── hooks/           # useUsers, useTheme, useCopyToClipboard
│   ├── services/        # userService.ts (chamada à API)
│   ├── styles/          # global.css (tokens de cor e estilos base)
│   ├── types/           # Tipos TypeScript (User, ViewMode, Theme)
│   ├── utils/           # getInitials, sortUsersByName
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── main.tsx
│   └── setupTests.ts
├── jest.config.cjs
├── vite.config.ts
└── tsconfig.json
```
