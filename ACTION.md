# Plano de Ação para o Ecossistema Sensen Games

## 1. Resumo do Produto (Ecossistema)

O Ecossistema Sensen Games visa criar uma plataforma completa para o estúdio "Sensen Games", composta por três aplicações interligadas:

*   **`sensen-admin` (Painel Administrativo)**: Uma interface web para administradores gerenciarem o conteúdo do site, como jogos, configurações do estúdio e usuários.
*   **`sensen-backend` (API e Servidor)**: O coração da aplicação, fornecendo uma API RESTful para o frontend público e o painel administrativo. Responsável pela lógica de negócios, autenticação, armazenamento de dados (jogos, configurações) e upload de arquivos.
*   **`sensen-games` (Frontend Público)**: O site principal para jogadores, imprensa e criadores de conteúdo, funcionando como um portfólio de jogos, ponto de contato e central de informações.

**Objetivos Principais:**
*   **`sensen-admin`**: Facilitar o gerenciamento eficiente e dinâmico de todos os aspectos do site, sem a necessidade de intervenção manual no código.
*   **`sensen-backend`**: Oferecer uma API segura, escalável e de alto desempenho para servir dados e processar requisições de ambas as interfaces frontend.
*   **`sensen-games`**: Apresentar os jogos do estúdio de forma atraente e funcional, proporcionando uma experiência de usuário intuitiva para visitantes.

**Personas Atendidas:**
*   **Administradores do Estúdio**: Gerenciam o conteúdo através do `sensen-admin`.
*   **Jogadores**: Exploram o catálogo de jogos, notícias e informações através do `sensen-games`.
*   **Imprensa e Streamers**: Acessam press kits e informações relevantes do estúdio via `sensen-games`.

**Funcionalidades Atuais Chave:**
*   **Gerenciamento de Jogos**: CRUD completo (Criar, Ler, Atualizar, Deletar) de jogos via `sensen-admin`.
*   **Upload de Mídias**: Gerenciamento de imagens de capa e vídeos de preview para jogos.
*   **Configurações do Site**: Personalização de cores, textos, links sociais e imagens em várias seções do site.
*   **Catálogo de Jogos**: Exibição dinâmica de todos os jogos no `sensen-games`.
*   **Detalhes do Jogo**: Páginas dedicadas com informações e mídias para cada jogo.
*   **Página Inicial Dinâmica**: Seções de destaque, "Sobre Nós" e "Lista de E-mails" configuráveis pelo admin.
*   **Formulários de Contato e Mailing List**: Canais de comunicação para os visitantes.
*   **Autenticação Administrativa**: Acesso seguro ao `sensen-admin`.

## 2. Stack de Tecnologia Atual

### `sensen-games` (Frontend Público)
*   **Framework**: React.js (Vite.js)
*   **Estilização**: Tailwind CSS
*   **Roteamento**: React Router DOM
*   **Requisições HTTP**: Axios
*   **Estado Global**: React Context API
*   **Ícones**: React Icons

### `sensen-admin` (Painel Administrativo)
*   **Framework**: React.js (Vite.js)
*   **Estilização**: Material-UI (MUI)
*   **Requisições HTTP**: Axios
*   **Roteamento**: React Router DOM
*   **Estado Global**: React Context API
*   **Upload de Arquivos**: Multer (integração via backend)

### `sensen-backend` (API e Servidor)
*   **Runtime**: Node.js (Express.js)
*   **Banco de Dados**: MongoDB (Mongoose ORM)
*   **Autenticação**: JSON Web Tokens (JWT)
*   **Hash de Senhas**: Bcrypt
*   **Variáveis de Ambiente**: Dotenv
*   **CORS**: Middleware CORS
*   **Upload de Arquivos**: Multer

## 3. Estrutura de Pastas e Arquivos (Visão Geral)

O ecossistema é composto por três projetos principais, cada um em seu próprio diretório, mantendo uma clara separação de responsabilidades:

*   **`sensen-admin/`**: Contém todo o código-fonte e recursos do painel administrativo.
*   **`sensen-backend/`**: Contém o código-fonte da API RESTful, modelos de banco de dados, controladores e rotas.
*   **`sensen-games/`**: Contém todo o código-fonte e recursos do frontend público do site.

Cada projeto segue convenções de estrutura de diretórios comuns para suas respectivas tecnologias (ex: `src/components`, `src/pages` para React; `src/controllers`, `src/models`, `src/routes` para Express).

## 4. Próximas Fases de Desenvolvimento (Baseado nas Sugestões de Melhoria)

As fases a seguir representam um roadmap para agregar mais valor ao produto, conforme as sugestões identificadas.

### Fase 1: Melhorias na Experiência do Usuário (UX) e Frontend (`sensen-games` & `sensen-admin`)

*   **1.1. Busca e Filtragem Avançadas**:
    *   **Descrição**: Implementar um sistema de busca robusto (por título, plataforma, gênero) e opções de filtragem avançadas (por data de lançamento, preço, avaliação) no catálogo de jogos do `sensen-games`.
    *   **Ações**:
        *   Definir os critérios de busca e filtragem.
        *   Implementar campos de entrada e controles de filtro no `sensen-games`.
        *   Atualizar a API do `sensen-backend` para suportar queries de busca e filtragem.
*   **1.2. Paginação/Scroll Infinito**:
    *   **Descrição**: Implementar paginação ou scroll infinito na listagem de jogos para melhorar o desempenho e a experiência em catálogos grandes.
    *   **Ações**:
        *   Escolher a abordagem (paginação ou scroll infinito).
        *   Atualizar a API do `sensen-backend` para retornar dados paginados.
        *   Implementar a lógica no `sensen-games`.
*   **1.3. Avaliações e Classificações de Usuários**:
    *   **Descrição**: Permitir que os usuários avaliem e classifiquem os jogos, adicionando valor à comunidade.
    *   **Ações**:
        *   Definir modelo de dados para avaliações no `sensen-backend`.
        *   Criar endpoints de API para avaliações.
        *   Desenvolver componentes de UI para submissão e exibição de avaliações no `sensen-games`.
*   **1.4. Lista de Desejos/Favoritos**:
    *   **Descrição**: Permitir que os usuários marquem jogos de interesse.
    *   **Ações**:
        *   Definir modelo de dados para listas de desejos no `sensen-backend`.
        *   Criar endpoints de API.
        *   Desenvolver funcionalidades de UI no `sensen-games`.
*   **1.5. Melhorias na Responsividade e Acessibilidade**:
    *   **Descrição**: Auditoria completa e otimização do design responsivo e garantia de conformidade com padrões de acessibilidade (WCAG).
    *   **Ações**:
        *   Realizar testes em diversos dispositivos e tamanhos de tela.
        *   Implementar ajustes de CSS e componentes para melhor adaptabilidade.
        *   Revisar o código para conformidade com diretrizes de acessibilidade (ARIA, foco, contraste).
*   **1.6. Skeletons de Carregamento e UI Otimista**:
    *   **Descrição**: Utilizar esqueletos de carregamento e atualizações de UI otimistas para melhorar a percepção de velocidade e a fluidez da interface.
    *   **Ações**:
        *   Identificar pontos de carregamento lento.
        *   Implementar componentes de "skeleton loading".
        *   Aplicar padrões de UI otimista onde apropriado.
*   **1.7. Imagens e Vídeos Dinâmicos/Otimizados**:
    *   **Descrição**: Permitir que o admin carregue múltiplos fundos para seções heroicas, e implementar otimização automática de mídias no upload.
    *   **Ações**:
        *   Atualizar o `sensen-admin` e `sensen-backend` para gerenciar múltiplas mídias de fundo.
        *   Implementar lógica de otimização de imagens (conversão para WebP, redimensionamento) no `sensen-backend` após o upload.
        *   Adicionar carrosséis/lógica de exibição rotativa no `sensen-games`.
*   **1.8. Notificações**:
    *   **Descrição**: Implementar notificações push ou no aplicativo para lançamentos, promoções ou atualizações.
    *   **Ações**:
        *   Pesquisar e integrar uma solução de notificação (e.g., Web Push API, serviço de terceiros).
        *   Criar lógica de backend para disparar notificações.
        *   Desenvolver componentes de UI para exibir notificações no `sensen-games`.

### Fase 2: Aprimoramentos no Backend (`sensen-backend`)

*   **2.1. Funções de Usuário e Permissões**:
    *   **Descrição**: Implementar diferentes papéis de usuário (ex: usuário comum, moderador) com permissões variadas.
    *   **Ações**:
        *   Atualizar o modelo de `User` com um campo `role`.
        *   Implementar verificação de `role` nos middlewares de autenticação.
        *   Ajustar rotas e controladores para respeitar as permissões.
*   **2.2. Autenticação OAuth/Social**:
    *   **Descrição**: Permitir login via Google, Facebook, etc.
    *   **Ações**:
        *   Pesquisar e integrar bibliotecas/estratégias OAuth.
        *   Configurar provedores OAuth.
        *   Criar rotas e lógica de callback.
*   **2.3. Reset de Senha**:
    *   **Descrição**: Adicionar funcionalidade de "Esqueceu a senha?" com envio de e-mail.
    *   **Ações**:
        *   Criar endpoints para solicitação e redefinição de senha.
        *   Integrar serviço de envio de e-mails.
        *   Desenvolver tokens de reset seguros.
*   **2.4. API GraphQL**:
    *   **Descrição**: Considerar a migração para uma API GraphQL para maior flexibilidade no frontend.
    *   **Ações**:
        *   Avaliar a viabilidade e os benefícios do GraphQL para o projeto.
        *   Projetar o schema GraphQL.
        *   Implementar o servidor GraphQL.
*   **2.5. Limitação de Taxa (Rate Limiting)**:
    *   **Descrição**: Proteger a API contra abusos e ataques de força bruta.
    *   **Ações**:
        *   Integrar middleware de rate limiting (e.g., `express-rate-limit`).
        *   Configurar limites para endpoints críticos.
*   **2.6. Caching de Dados**:
    *   **Descrição**: Implementar mecanismos de cache (e.g., Redis) para dados frequentemente acessados.
    *   **Ações**:
        *   Configurar e integrar um servidor de cache.
        *   Modificar controladores para usar o cache para leituras de dados comuns.
*   **2.7. Webhooks**:
    *   **Descrição**: Permitir que serviços externos se inscrevam em eventos da aplicação.
    *   **Ações**:
        *   Definir eventos acionáveis.
        *   Criar um sistema de gerenciamento de webhooks.
        *   Implementar disparadores de webhooks nos controladores relevantes.
*   **2.8. Categorização por Gêneros/Tags**:
    *   **Descrição**: Adicionar um sistema robusto para categorizar jogos por gêneros e tags.
    *   **Ações**:
        *   Atualizar o modelo de `Game` no `sensen-backend`.
        *   Criar endpoints para gerenciar gêneros/tags (CRUD).
        *   Integrar no `sensen-admin` e `sensen-games`.
*   **2.9. Datas de Lançamento e Status**:
    *   **Descrição**: Rastrear datas de lançamento, pré-vendas e status de jogos (ex: "Em Breve", "Lançado").
    *   **Ações**:
        *   Atualizar o modelo de `Game` com campos de data de lançamento e status.
        *   Integrar no `sensen-admin` para gerenciamento.
        *   Implementar lógica de exibição condicional no `sensen-games`.
*   **2.10. Jobs em Segundo Plano/Filas de Tarefas**:
    *   **Descrição**: Implementar um sistema para tarefas demoradas (ex: vídeo encoding, envio de e-mails em massa).
    *   **Ações**:
        *   Pesquisar e integrar uma solução de fila de tarefas (e.g., BullMQ).
        *   Mover tarefas síncronas para a fila.
*   **2.11. Escalabilidade de Banco de Dados**:
    *   **Descrição**: Avaliar e planejar estratégias de escalabilidade para o MongoDB para catálogos muito grandes.
    *   **Ações**:
        *   Realizar análise de carga e desempenho.
        *   Explorar sharding, replicação e outras otimizações.

### Fase 3: Evolução do Painel Administrativo (`sensen-admin`)

*   **3.1. Dashboard de Atividades**:
    *   **Descrição**: Criar um painel que forneça uma visão geral das atividades do site (número de jogos, usuários, uploads recentes, etc.).
    *   **Ações**:
        *   Definir métricas chave.
        *   Criar endpoints de API no `sensen-backend` para essas métricas.
        *   Desenvolver componentes de visualização no `sensen-admin`.
*   **3.2. Gerenciamento de Usuários Abrangente**:
    *   **Descrição**: Funcionalidade completa para visualizar, editar e excluir usuários, e gerenciar seus papéis e permissões.
    *   **Ações**:
        *   Criar interfaces de CRUD para usuários no `sensen-admin`.
        *   Garantir a segurança e validação de dados.
*   **3.3. Moderação de Conteúdo**:
    *   **Descrição**: Ferramentas para moderar conteúdo gerado por usuários (avaliações, comentários, etc.).
    *   **Ações**:
        *   Desenvolver interfaces de moderação com opções de aprovar/rejeitar/excluir.
*   **3.4. Ações em Massa**:
    *   **Descrição**: Permitir realizar ações em múltiplos itens (jogos, usuários) simultaneamente.
    *   **Ações**:
        *   Implementar seleção múltipla e botões de ação em massa.
*   **3.5. Logs de Auditoria**:
    *   **Descrição**: Registrar todas as ações administrativas para rastreabilidade.
    *   **Ações**:
        *   Implementar um sistema de log no `sensen-backend`.
        *   Criar uma interface de visualização de logs no `sensen-admin`.
*   **3.6. Customização Avançada de Tema/Layout**:
    *   **Descrição**: Controles mais extensivos para personalizar a aparência do `sensen-games`.
    *   **Ações**:
        *   Expor mais variáveis de estilo no `sensen-admin`.
        *   Implementar pré-visualização de alterações.
*   **3.7. Configurações de SEO**:
    *   **Descrição**: Gerenciar meta tags, descrições e palavras-chave para otimização de busca.
    *   **Ações**:
        *   Adicionar campos de SEO aos modelos de dados (e.g., `Game`, `Settings`).
        *   Criar interfaces no `sensen-admin` para editar esses campos.
*   **3.8. Integração com APIs Externas (Ex: IGDB, RAWG)**:
    *   **Descrição**: Buscar dados de jogos de APIs externas para preencher automaticamente detalhes ao adicionar novos jogos.
    *   **Ações**:
        *   Pesquisar APIs de jogos externas.
        *   Desenvolver um serviço de integração no `sensen-backend`.
        *   Implementar funcionalidade de busca e importação no `sensen-admin`.

### Fase 4: Otimização de DevOps e Infraestrutura

*   **4.1. Pipeline CI/CD**:
    *   **Descrição**: Automatizar testes, construção e deploy para todos os projetos.
    *   **Ações**:
        *   Escolher uma ferramenta CI/CD (e.g., GitHub Actions, Jenkins).
        *   Configurar pipelines para cada projeto.
        *   Implementar testes automatizados.
*   **4.2. Monitoramento e Logging Centralizados**:
    *   **Descrição**: Implementar monitoramento robusto e um sistema de log centralizado.
    *   **Ações**:
        *   Integrar ferramentas de monitoramento (e.g., Prometheus/Grafana).
        *   Configurar agregação de logs (e.g., ELK stack, Datadog).
*   **4.3. Balanceamento de Carga e Escalabilidade**:
    *   **Descrição**: Garantir que a aplicação possa lidar com aumento de tráfego.
    *   **Ações**:
        *   Configurar balanceadores de carga.
        *   Explorar conteinerização (Docker) e orquestração (Kubernetes).
*   **4.4. CDN para Ativos (Assets)**:
    *   **Descrição**: Utilizar uma CDN para servir imagens e vídeos.
    *   **Ações**:
        *   Configurar um serviço de CDN (e.g., Cloudflare, AWS CloudFront).
        *   Atualizar URLs de ativos no frontend e backend para usar a CDN.

## 5. Próximos Passos Imediatos

1.  **Revisar e Priorizar as Fases**: A equipe de desenvolvimento deve revisar estas fases, discutir a prioridade de cada item com o proprietário do produto.
2.  **Planejamento Detalhado da Fase 1**: Iniciar o planejamento detalhado da "Fase 1: Melhorias na Experiência do Usuário (UX) e Frontend".
3.  **Refatoração de Código**: Avaliar a necessidade de refatorações menores para suportar futuras implementações.
4.  **Documentação**: Manter a documentação técnica atualizada conforme as implementações avançam.