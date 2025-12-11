# Documentação Completa do Ecossistema Sensen Games

## 1. Visão Geral do Produto

O Ecossistema Sensen Games é uma plataforma integrada desenvolvida para o estúdio de jogos "Sensen Games". Seu objetivo é gerenciar e apresentar o catálogo de jogos do estúdio, fornecer um painel administrativo robusto para gerenciamento de conteúdo e servir como um hub de informações para a comunidade, imprensa e criadores de conteúdo.

O produto é composto por três aplicações distintas, mas interligadas:

* **`sensen-admin`**: O Painel Administrativo, uma interface web para que administradores possam gerenciar dinamicamente o conteúdo do site, as configurações gerais e os dados dos jogos.
* **`sensen-backend`**: A API RESTful e o servidor da aplicação. Atua como o cérebro do ecossistema, manipulando a lógica de negócios, autenticação, armazenamento de dados (jogos, configurações do site, usuários) e processamento de uploads de arquivos.
* **`sensen-games`**: O Frontend Público, o site principal voltado para os usuários finais. Ele exibe o catálogo de jogos, informações sobre o estúdio, formulários de contato e de inscrição em lista de e-mails, além de servir como portfólio.

## Atualizações importantes (11/12/2025)

- Corrigido: exibição de imagens do `sensen-games` quando o backend retorna caminhos relativos (`/uploads/...`). O componente `src/components/figma/ImageWithFallback.tsx` agora prefixa automaticamente `http://localhost:3001` para imagens iniciadas por `/`.
- Corrigido: inconsistências de tipo entre `src/data/games` e `src/types`. O tipo `Game` unificado foi atualizado em `src/types/index.ts` para incluir `_id`, `slug`, `video`, `genre`, `price`, `rating`, `platforms` e `storeLinks`.
- Corrigido: hook `useStore` movido para `src/contexts/useStore.ts` para evitar erro de Fast Refresh; o `StoreContext` permanece em `src/contexts/StoreContext.tsx`.
- Corrigido: problemas de ESLint/TypeScript em componentes (`GameCard`, `GameDetailModal`, `CartPage`, `WishlistPage`).
- Observação: `sensen-admin` continua enviando arquivos para `/api/upload/*` e o backend responde com paths relativos em `/uploads/<file>`; o frontend agora lida com ambos formatos (relativo e absoluto).

### Testes e passos recomendados após pull/merge:

1. No terminal, execute:

```bash
cd sensen-games
npm install
npm run lint
npx tsc -b
npx vite build
```

2. No `sensen-admin`, faça um upload de imagem para um jogo e confirme que o campo `image` no backend contém um path como `/uploads/<file>`; abra a página de detalhes no `sensen-games` e verifique se a imagem aparece.

3. Revise o PR e rode testes manuais nas páginas: `Ver Detalhes`, `Carrinho` e `Lista de Desejos`.

Se desejar, posso criar o commit e abrir o PR com essas mudanças automaticamente.
**Objetivo Geral:**
Criar uma plataforma robusta, escalável e de fácil gerenciamento para o estúdio Sensen Games, permitindo que eles apresentem seus jogos de forma profissional e interajam com sua audiência.

## 2. História do Produto

O projeto Sensen Games começou como uma solução de **frontend estático**, simples e direta, focada unicamente em apresentar um portfólio de jogos. Inicialmente, todos os dados dos jogos (títulos, descrições, imagens, vídeos) eram codificados diretamente nos arquivos JavaScript (`.js`) do frontend. Essa abordagem, embora rápida para um MVP (Produto Mínimo Viável), apresentava limitações significativas para a manutenção e a capacidade de atualização do conteúdo.

Com o tempo, percebeu-se a necessidade de tornar o conteúdo dinâmico e gerenciável. Assim, o projeto evoluiu para incluir um **backend** dedicado (`sensen-backend`), que assumiu a responsabilidade de armazenar os dados dos jogos em um banco de dados (MongoDB) e expô-los através de uma API RESTful. O frontend (`sensen-games`) foi então adaptado para consumir esses dados dinamicamente, permitindo atualizações de conteúdo sem a necessidade de reimplantar o frontend.

O passo seguinte foi a criação de um **painel administrativo** (`sensen-admin`). Este painel oferece uma interface amigável para que os administradores do estúdio possam criar, ler, atualizar e excluir jogos, gerenciar as configurações gerais do site (como cores, textos e links sociais) e lidar com uploads de imagens e vídeos, tudo isso através de comunicação com o `sensen-backend`.

Essa evolução transformou o Sensen Games de um simples site estático em um **ecossistema completo e dinâmico**, pronto para crescer e se adaptar às futuras necessidades do estúdio.

## 3. Tecnologias Utilizadas

### Frontend Público (`sensen-games`)

* **Framework**: [React.js](https://react.dev/) (com [Vite.js](https://vitejs.dev/) para desenvolvimento rápido e builds otimizados).
* **Estilização**: [Tailwind CSS](https://tailwindcss.com/) (para utilitários CSS e design responsivo) e CSS puro.
* **Roteamento**: [React Router DOM](https://reactrouter.com/en/main) (para navegação entre páginas).
* **Requisições HTTP**: [Axios](https://axios-http.com/) (para comunicação com o `sensen-backend`).
* **Gerenciamento de Estado Global**: [React Context API](https://react.dev/learn/passing-props-with-context) (utilizado para gerenciar configurações globais do site).
* **Ícones**: [React Icons](https://react-icons.github.io/react-icons/) (para fácil inclusão de ícones populares).

### Painel Administrativo (`sensen-admin`)

* **Framework**: [React.js](https://react.dev/) (com [Vite.js](https://vitejs.dev/)).
* **Estilização**: [Material-UI (MUI)](https://mui.com/) (biblioteca de componentes React que implementa o Material Design).
* **Requisições HTTP**: [Axios](https://axios-http.com/) (para comunicação com o `sensen-backend`).
* **Roteamento**: [React Router DOM](https://reactrouter.com/en/main).
* **Gerenciamento de Estado Global**: [React Context API](https://react.dev/learn/passing-props-with-context) (utilizado para autenticação e estado do usuário admin).
* **Validação de Formulários**: [React Hook Form](https://react-hook-form.com/) (para formulários eficientes e com validação).

### Backend (`sensen-backend`)

* **Runtime**: [Node.js](https://nodejs.org/) (com [Express.js](https://expressjs.com/) como framework web).
* **Banco de Dados**: [MongoDB](https://www.mongodb.com/) (banco de dados NoSQL).
* **ORM**: [Mongoose](https://mongoosejs.com/) (para modelagem de objetos MongoDB).
* **Autenticação**: [JSON Web Tokens (JWT)](https://jwt.io/) (para autenticação de usuários e administradores).
* **Hash de Senhas**: [Bcrypt.js](https://www.npmjs.com/package/bcrypt) (para armazenamento seguro de senhas).
* **Variáveis de Ambiente**: [Dotenv](https://www.npmjs.com/package/dotenv) (para carregar variáveis de ambiente de um arquivo `.env`).
* **CORS**: [Middleware CORS](https://www.npmjs.com/package/cors) (para habilitar requisições de diferentes origens).
* **Upload de Arquivos**: [Multer](https://www.npmjs.com/package/multer) (middleware para tratamento de `multipart/form-data`, usado principalmente para uploads de arquivos).

## 4. Estrutura da Aplicação (Visão Geral)

O ecossistema é modular, com cada parte funcionando como um serviço independente, mas se comunicando entre si:

* **`sensen-backend`**: É o ponto central. Ele expõe a API para ambos os frontends. Gerencia a autenticação, a persistência de dados no MongoDB e o armazenamento físico dos arquivos de mídia enviados.
* **`sensen-admin`**: Autentica-se com o `sensen-backend` e faz requisições à API para gerenciar jogos, configurações e outras entidades.
* **`sensen-games`**: Consome dados públicos da API do `sensen-backend` para exibir o catálogo de jogos e informações do estúdio.

A comunicação entre os frontends e o backend é realizada via requisições HTTP (RESTful).

## 5. Como Rodar o Produto Completo

Para iniciar e testar o ecossistema Sensen Games em seu ambiente local, siga os passos abaixo:

### Pré-requisitos

* **Node.js**: Versão 18 ou superior.
* **npm**: Gerenciador de pacotes do Node.js.
* **MongoDB**: Uma instância do MongoDB em execução (localmente ou em um serviço de nuvem como MongoDB Atlas).

### Passos para Inicialização

#### a. Configuração e Inicialização do Backend (`sensen-backend`)

1. **Navegue até o diretório do backend**:

```bash
cd sensen-backend
```

2. **Instale as dependências**:

```bash
npm install
```

3. **Crie um arquivo de variáveis de ambiente (`.env`)** na raiz do diretório `sensen-backend` com o seguinte conteúdo. Substitua os valores entre `<>` pelos seus próprios:

```sh
PORT=3001
MONGODB_URI=<SUA_STRING_DE_CONEXAO_MONGODB>
JWT_SECRET=<UMA_CHAVE_SECRETA_FORTE_PARA_JWT>
ADMIN_EMAIL=<SEU_EMAIL_ADMIN>
ADMIN_PASSWORD=<SUA_SENHA_ADMIN_FORTE>
```

* `MONGODB_URI`: String de conexão para o seu banco de dados MongoDB (ex: `mongodb://localhost:27017/sensen`).
* `JWT_SECRET`: Uma string aleatória complexa usada para assinar e verificar tokens JWT.
* `ADMIN_EMAIL` e `ADMIN_PASSWORD`: Credenciais para o usuário administrador padrão que será criado.

4. **Inicie o servidor backend**:

```bash
npm run dev
```

O servidor será iniciado e você deverá ver uma mensagem no console indicando que está rodando, geralmente em `http://localhost:3001`.

#### b. Configuração e Inicialização do Painel Administrativo (`sensen-admin`)

1. **Navegue até o diretório do painel administrativo**:

```bash
cd sensen-admin
```

2. **Instale as dependências**:

```bash
npm install
```

3. **Inicie o painel administrativo**:

```bash
npm run dev
```

O painel será iniciado e estará acessível, por padrão, em `http://localhost:5173`. Você pode fazer login com as credenciais `ADMIN_EMAIL` e `ADMIN_PASSWORD` configuradas no `.env` do backend.

#### c. Configuração e Inicialização do Frontend Público (`sensen-games`)

1. **Navegue até o diretório do frontend público**:

```bash
cd sensen-games
```

2. **Instale as dependências**:

```bash
npm install
```

3. **Inicie o frontend público**:

```bash
npm run dev
```

O site público será iniciado e estará acessível, por padrão, em `http://localhost:5174`.

## 6. Objetivos e Funcionalidades Atuais

### Frontend Público (`sensen-games`)

* **Catálogo de Jogos**: Exibição dinâmica de todos os jogos disponíveis no catálogo, com cards interativos.
* **Páginas de Detalhes do Jogo**: Cada jogo possui uma página dedicada com informações detalhadas, imagem de capa e vídeo de preview.
* **Página Inicial (Home)**: Seção hero com jogos em destaque, seções "Sobre o Estúdio" e "Lista de E-mails" configuráveis via admin.
* **Formulário de Contato**: Permite aos visitantes enviar mensagens ao estúdio.
* **Mailing List**: Formulário para inscrição na lista de e-mails do estúdio.
* **Exibição de Mídias**: Imagens e vídeos de jogos são carregados do backend e exibidos corretamente.

### Painel Administrativo (`sensen-admin`)

* **Autenticação**: Login seguro para administradores.
* **Gerenciamento de Jogos (CRUD)**: Funções completas para criar, visualizar, editar e excluir informações de jogos, incluindo título, slug, descrição, plataformas e links de lojas.
* **Upload de Mídias**: Funcionalidade para upload de imagens de capa e vídeos de preview para os jogos.
* **Gerenciamento de Configurações do Site**: Permite personalizar aspectos visuais e de conteúdo do `sensen-games`, como cores de fundo, textos de seções, URLs de redes sociais, URLs de imagens (logo, ícone, "sobre nós", mailing list).

### Backend (`sensen-backend`)

* **API RESTful**: Fornece endpoints para `games`, `auth`, `settings` e `upload`.
* **Autenticação JWT**: Proteção de rotas da API, especialmente para o `sensen-admin`.
* **Armazenamento de Dados**: Utiliza MongoDB para persistir informações de jogos, usuários e configurações do site.
* **Upload de Arquivos**: Recebe e armazena arquivos de imagem e vídeo no sistema de arquivos do servidor.
* **Serviço de Arquivos Estáticos**: Serve os arquivos de mídia carregados para o frontend.
* **Tratamento de Erros Multer**: Captura e retorna mensagens de erro amigáveis para problemas de upload de arquivos (tamanho excessivo, campo inesperado).

## 7. Sugestões de Melhoria Futuras (Baseado no `ACTION.md`)

Para um roadmap detalhado das próximas fases de desenvolvimento e melhorias, consulte o arquivo `ACTION.md`. As sugestões de melhoria abrangem as seguintes áreas:

### Fase 1: Melhorias na Experiência do Usuário (UX) e Frontend

* Busca e Filtragem Avançadas
* Paginação/Scroll Infinito
* Avaliações e Classificações de Usuários
* Lista de Desejos/Favoritos
* Melhorias na Responsividade e Acessibilidade
* Skeletons de Carregamento e UI Otimista
* Imagens e Vídeos Dinâmicos/Otimizados
* Notificações

### Fase 2: Aprimoramentos no Backend

* Funções de Usuário e Permissões
* Autenticação OAuth/Social
* Reset de Senha
* API GraphQL
* Limitação de Taxa (Rate Limiting)
* Caching de Dados
* Webhooks
* Categorização por Gêneros/Tags
* Datas de Lançamento e Status
* Jobs em Segundo Plano/Filas de Tarefas
* Escalabilidade de Banco de Dados

### Fase 3: Evolução do Painel Administrativo

* Dashboard de Atividades
* Gerenciamento de Usuários Abrangente
* Moderação de Conteúdo
* Ações em Massa
* Logs de Auditoria
* Customização Avançada de Tema/Layout
* Configurações de SEO
* Integração com APIs Externas (Ex: IGDB, RAWG)

### Fase 4: Otimização de DevOps e Infraestrutura

* Pipeline CI/CD
* Monitoramento e Logging Centralizados
* Balanceamento de Carga e Escalabilidade
* CDN para Ativos (Assets)
