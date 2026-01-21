# Be.Compliance - Sistema de pedidos

Aplicação web para gestão de pedidos de entrega, desenvolvida como teste técnico para a vaga de Front-end Developer. O sistema abrange todo o ciclo de vida do pedido, desde a criação e visualização até o controle de status (workflow) e cancelamento.

## 🚀 Funcionalidades

- **Autenticação Segura:** Login simulado com proteção de rotas via *Navigation Guards*.

- **Dashboard Interativo:** Listagem de pedidos com indicadores visuais de status e formatação monetária automática.

- **Responsividade:** Layout fluido que adapta tabelas complexas em *Cards* verticais em dispositivos móveis.

- **Gestão de Pedidos:**
  - Criação de novos pedidos com formulário dinâmico (adicionar/remover itens).
  - Cálculo automático de totais em tempo real.
  - Validação de campos obrigatórios.

- **Workflow de Status (Máquina de Estados):**
  - Fluxo lógico: `PENDENTE` → `PROCESSADO` → `ENTREGUE`.
  - Permite `CANCELAR` pedidos ativos com confirmação de segurança.

- **Tratamento de Erros:**
  - Blindagem contra IDs inválidos na URL.
  - Feedback visual para falhas de conexão ou pedidos inexistentes.
  - *Fallbacks* para dados incompletos vindos da API.

## 🛠️ Tecnologias Utilizadas

- **Vue 3** (Composition API + Script Setup)
- **TypeScript** (Tipagem estática rigorosa, Interfaces e Classes DTO)
- **Vite** (Build tool)
- **Pinia** (Gerenciamento de estado global e Autenticação)
- **Vue Router** (Roteamento dinâmico e proteção de acesso)
- **Axios** (Camada de integração HTTP)
- **JSON Server** (Backend Mock REST API)
- **CSS3 Puro** (Variáveis CSS, Scoped Styles e Media Queries - Sem frameworks de UI externos)

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
- **Node.js** (v16 ou superior)
- **npm** ou **yarn**

## 📦 Instalação e Execução

Para o sistema funcionar corretamente, é necessário rodar o **Frontend** e o **Backend (Mock)** simultaneamente em terminais separados.

### 1. Clone o repositório

git clone https://github.com/allan-sanches/frontend-test.git

### 2. Instale as dependências
npm install

### 3. Inicie o Servidor Mock (Backend)
Abra um terminal na raiz do projeto e execute: npx json-server db.json --port 3000
ou npm run api

Importante: Mantenha este terminal aberto. Ele simula a API REST na porta 3000.

### 4. Inicie a Aplicação (Frontend)
Abra um segundo terminal e execute: npm run dev

### 5. Acesse no navegadorAbra http://localhost:5173 (ou a porta indicada no seu terminal).

🔑 Credenciais de AcessoO sistema possui autenticação simulada.
 Utilize os usuários abaixo para testar:
 Email: dev@teste.com senha: 123
 Email: gerente@becompliance.com senha: 123

### 6. Testes Automatizados (Vitest)

Para garantir a confiabilidade das regras de negócio e a integridade dos componentes, o projeto utiliza **Vitest**.

### Rodando os Testes
Para executar a suíte de testes unitários:

npm run test

O que está sendo testado?
DTOs: Validação de formatação de moeda, datas e lógica de cores de status.

Services: Mocking de chamadas API para garantir isolamento.

Componentes: Renderização correta e interação básica.

## Decisões de Arquitetura

### 1. Camada de Serviço e DTOs (Data Transfer Objects)
Para desacoplar a visualização da API, adotei o padrão de Camada de Serviço.

**OrderService:** Centraliza as regras de negócio (como a geração sequencial de IDs para evitar hashs aleatórios do json-server) e chamadas HTTP.

**OrderDTO:** Uma Classe que intercepta os dados da API e realiza a "higiene" e formatação (datas em pt-BR, moeda em BRL, cores de status) antes que os dados cheguem aos componentes Vue.

### 2. Responsividade e estilização
Optei por não utilizar frameworks de UI (como Bootstrap, Tailwind ou Vuetify) por ser um projeto simples.

Criei um sistema baseado em variáveis CSS (--primary-color, --accent-color).

Utilizei Media Queries para refatorar a tabela de pedidos: no Desktop ela é uma tabela tradicional; no Mobile, transforma-se em uma lista de cartões com labels explicativos, resolvendo o problema de visualização de dados tabulares em telas pequenas.

### 3. Segurança e Robustez
**Validação de Rotas:** O componente de detalhes valida se o ID da URL é numérico. Isso previne erros de JavaScript caso o usuário tente acessar /orders/texto-invalido.

**Programação Defensiva:** Tratamento de objetos nulos no DTO (ex: produtos sem nome recebem um valor padrão) para evitar quebras na interface.

**Correção de Race Conditions:** Implementação de estratégias para garantir que a leitura da lista só ocorra após a escrita completa do novo pedido no json-server.

### 4. Gestão de Estado
O Pinia foi escolhido pela sua simplicidade e integração nativa com Vue 3 para persistir a sessão do usuário e compartilhar dados de autenticação (como o nome do usuário) entre o Login e o Header.