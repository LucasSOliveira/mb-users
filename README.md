# MB Users - Cadastro de Usuários

**MB Users** é uma aplicação web para cadastro de usuários;

---

## 🚀 Tecnologias Utilizadas

- **Frontend**:
  - Vue.js 3 (Composition API)
  - Vite, utilizado como ferramenta de build e middleware no backend
  - SCSS com metodologia BEM
- **Backend**:
  - Node.js
  - Express.js
  - Persistência de dados em arquivos JSON

---

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm (gerenciador de pacotes)

### Passos

Siga as etapas abaixo para configurar e executar o projeto:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/LucasSOliveira/mb-users
   ```

2. **Acesse o diretório do projeto**:
   ```bash
   cd mb-users
   ```

3. **Instale as dependências**:
   ```bash
   npm install
   ```

4. **Execute o servidor em modo de desenvolvimento**:
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação no navegador (modo de desenvolvimento)**:
   ```
   http://localhost:3000/registration
   ```

6. **Gere a build de produção**:
   ```bash
   npm run build
   ```

7. **Defina a variável de ambiente para produção**:
   ```bash
   NODE_ENV=production
   ```

8. **Execute o servidor em modo de produção**:
   ```bash
   npm start
   ```

9. **Acesse a aplicação no navegador (modo de produção)**:
   ```
   http://localhost:3000/registration
   ```

---

## 📄 Funcionalidades

### Frontend

- Formulário dividido em 4 etapas:
  1. **Passo 1**: E-mail e tipo de cadastro (PF ou PJ).
  2. **Passo 2**: Dados pessoais (PF) ou empresariais (PJ).
  3. **Passo 3**: Criação de senha.
  4. **Passo 4**: Revisão e envio dos dados.

### Backend

- **GET /registration**: Renderiza a página HTML com o formulário.
- **POST /api/registration**: Recebe os dados do formulário, valida e simula o cadastro.

---

## 📦 Scripts Disponíveis

- `npm run dev`: Executa o servidor em modo de desenvolvimento.
- `npm run build`: Gera os arquivos para produção.
- `npm start`: Executa o servidor em modo de produção.

---
