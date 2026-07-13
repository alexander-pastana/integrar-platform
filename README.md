# Integrar Platform

Plataforma web desenvolvida para o projeto **Integrar**, um grupo terapêutico voltado ao desenvolvimento emocional de jovens adultos.

O objetivo da plataforma é apresentar a proposta do grupo, sua metodologia e seus facilitadores, além de permitir que pessoas interessadas realizem sua inscrição de forma simples, acolhedora e segura.

Atualmente, o formulário de inscrição está totalmente integrado ao backend em Go, permitindo o armazenamento das inscrições em um banco PostgreSQL gerenciado pelo Neon.

---

## Sobre o Projeto

O Integrar nasceu da proposta de oferecer um espaço seguro para jovens adultos desenvolverem maior consciência emocional, fortalecerem habilidades interpessoais e construírem uma relação mais saudável consigo mesmos.

A plataforma foi criada para:

* apresentar o grupo terapêutico;
* explicar sua metodologia;
* apresentar os facilitadores;
* responder dúvidas frequentes;
* captar interessados para futuras turmas;
* organizar as inscrições recebidas.

---

## Status do Projeto

🚧 Em desenvolvimento

### Concluído

#### Frontend

* Landing Page institucional
* Design responsivo
* Navegação entre seções
* FAQ
* Modal e formulário de interesse
* Apresentação dos facilitadores
* Seção explicativa sobre DBT
* Animações e microinterações
* Refinamentos de UX e responsividade

#### Backend

* Estrutura da API em Go
* Configuração do Fiber
* Integração com PostgreSQL
* Configuração do GORM
* Endpoint de Health Check
* Endpoint para cadastro de interessados
* Validação estrutural das requisições
* Regra de consentimento de privacidade
* Persistência de leads
* Tratamento de erros HTTP
* Configuração por variáveis de ambiente

#### Testes

* Testes unitários do Service
* Testes unitários do Handler
* Testes do pacote de validação
* Teste de integração do Repository com PostgreSQL
* Banco PostgreSQL isolado para testes com Docker Compose
* Separação dos testes de integração por build tag

#### Infraestrutura

* PostgreSQL gerenciado pelo Neon
* Organização do projeto em monorepo
* Dockerfile da API
* Docker Compose para ambiente local
* Docker Compose exclusivo para testes de integração
* Padronização de finais de linha com `.gitattributes`
* Proteção de arquivos sensíveis com `.gitignore` e `.dockerignore`

### Em desenvolvimento

* Integração com Google Sheets
* Notificações por e-mail
* Integração com serviço de envio de e-mails
* Rate Limiting
* Logs estruturados e níveis de log
* Deploy em produção
* Monitoramento

---

## Tecnologias Utilizadas

### Tecnologias do Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* TanStack Router
* Framer Motion

### Tecnologias do Backend

* Go
* Fiber
* GORM
* PostgreSQL
* go-playground/validator
* CORS Middleware (Fiber)

### Testes e Infraestrutura

* Testes nativos do Go
* Docker
* Docker Compose
* PostgreSQL 16 Alpine
* Neon
* Cloudflare Pages
* Render, planejado para a API

---

## Estrutura do Projeto

```text
integrar/
├── .gitattributes
├── .gitignore
├── README.md
├── api/
│   ├── cmd/
│   │   └── api/
│   │       └── main.go
│   ├── internal/
│   │   ├── app/
│   │   ├── config/
│   │   ├── database/
│   │   ├── leads/
│   │   └── validation/
│   ├── tests/
│   │   └── integration/
│   ├── .dockerignore
│   ├── .env.example
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── docker-compose.test.yml
│   ├── go.mod
│   └── go.sum
├── web/
└── docs/
```

### `api/`

API REST responsável por:

* receber inscrições;
* validar os dados enviados;
* aplicar regras de negócio;
* persistir leads no PostgreSQL;
* futuramente enviar notificações e integrar os dados ao Google Sheets.

### `web/`

Aplicação frontend responsável pela apresentação institucional do projeto e pela experiência do usuário.

### `docs/`

Materiais de descoberta, planejamento, arquitetura, identidade visual e documentação funcional do projeto.

---

## Arquitetura Atual

O backend segue uma separação em camadas:

```text
Requisição HTTP
      │
      ▼
Handler
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
PostgreSQL
```

### Responsabilidades

* **Handler:** recebe e responde requisições HTTP.
* **Service:** executa regras de negócio.
* **Repository:** realiza operações no banco de dados.
* **Validation:** valida a estrutura dos dados recebidos.
* **Config:** carrega configurações e variáveis de ambiente.

### Fluxo da aplicação

```text
Visitante
    │
    ▼
Landing Page (React)
    │
    ▼
Formulário de Interesse
    │
    ▼
API REST (Go + Fiber)
    │
    ▼
Service
    │
    ▼
Repository
    │
    ▼
PostgreSQL (Neon)
```

As integrações com Google Sheets e envio de e-mails serão adicionadas ao fluxo nas próximas etapas.

---

## Modelo de Dados

A entidade inicial do sistema é o `Lead`, que representa uma pessoa interessada no grupo.

Campos atuais:

* ID
* Nome
* WhatsApp
* Idade
* Mensagem
* Consentimento de privacidade
* Data de criação

---

## Segurança e Privacidade

Práticas atualmente adotadas:

* credenciais armazenadas em variáveis de ambiente;
* arquivos `.env` ignorados pelo Git e pelo Docker;
* banco de dados acessado somente pelo backend;
* consentimento explícito para tratamento dos dados;
* validação das requisições;
* CORS configurado para o frontend durante o desenvolvimento;
* respostas internas sem exposição direta de erros do banco;
* execução do contêiner da API com usuário não root.

Itens planejados para produção:

* HTTPS;
* CORS configurável por ambiente;
* Rate Limiting;
* logs estruturados;
* monitoramento;
* políticas adicionais de proteção e retenção dos dados.

---

## Executando o Frontend

```bash
cd web
npm install
npm run dev
```

O endereço local será informado pelo Vite no terminal.

---

## Executando a API

### 1. Configuração

Entre na pasta da API:

```bash
cd api
```

Crie um arquivo `.env` com base no exemplo:

```bash
cp .env.example .env
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Preencha a variável `DATABASE_URL` com a conexão do PostgreSQL.

### 2. Execução

```bash
go run ./cmd/api
```

Por padrão, a API ficará disponível em:

```text
http://localhost:8080
```

---

## Endpoints

### Health Check

```http
GET /health
```

Resposta esperada:

```json
{
  "status": "ok"
}
```

### Cadastro de interessado

```http
POST /api/v1/leads
Content-Type: application/json
```

Exemplo de requisição:

```json
{
  "name": "Nome da pessoa",
  "whatsapp": "11999999999",
  "age": 25,
  "message": "Tenho interesse em participar",
  "privacyConsent": true
}
```

Resposta de sucesso:

```http
201 Created
```

```json
{
  "message": "lead created successfully"
}
```

Os campos `name`, `whatsapp` e `privacyConsent` são obrigatórios.

O campo `privacyConsent` precisa ser enviado como `true` para que a inscrição seja aceita.

---

## Executando os Testes

### Testes unitários

Os testes unitários não dependem do Docker:

```bash
cd api
go test ./...
```

### Análise estática

```bash
go vet ./...
```

### Verificação dos módulos

```bash
go mod verify
```

### Teste de integração

O teste de integração utiliza um PostgreSQL isolado no Docker.

Inicie o banco de testes:

```bash
docker compose -f docker-compose.test.yml up -d
```

Execute o teste:

```bash
go test -count=1 -tags=integration -v ./tests/integration
```

Finalize o ambiente:

```bash
docker compose -f docker-compose.test.yml down
```

O banco de testes utiliza a variável opcional:

```env
TEST_DATABASE_URL=postgres://integrar_test:integrar_test@localhost:5433/integrar_test?sslmode=disable
```

---

## Executando com Docker

Na pasta `api`:

```bash
docker compose up --build
```

Esse ambiente inicia:

* a API na porta `8080`;
* um PostgreSQL local na porta `5432`;
* um volume persistente para os dados.

Para encerrar:

```bash
docker compose down
```

Para também remover o volume local:

```bash
docker compose down -v
```

---

## Roadmap

### Fase 1 - Frontend

* [x] Estrutura inicial
* [x] Landing Page
* [x] Responsividade
* [x] Componentização
* [x] Refinamentos visuais

### Fase 2 - Backend

* [x] Estrutura da API
* [x] Configuração do Fiber
* [x] Integração com PostgreSQL
* [x] Configuração do GORM
* [x] Endpoint de Health Check
* [x] Endpoint de inscrição
* [x] Validação dos dados
* [x] Persistência de leads
* [x] Testes unitários
* [x] Teste de integração

### Fase 3 - Integrações

* [ ] Google Sheets
* [ ] Notificações por e-mail
* [ ] Integração com serviço de envio de e-mails
* [ ] Exportação de dados

### Fase 4 - Segurança e Observabilidade

* [x] Configuração de CORS
* [ ] Rate Limiting
* [ ] Logs estruturados
* [ ] Níveis de log
* [ ] Monitoramento

### Fase 5 - Deploy

* [ ] Deploy do frontend
* [ ] Deploy da API
* [ ] Variáveis de ambiente em produção
* [ ] HTTPS
* [ ] Testes no ambiente publicado

---

## Objetivos Técnicos

Este projeto está sendo utilizado para consolidar conhecimentos em:

* desenvolvimento backend com Go;
* APIs REST;
* PostgreSQL;
* GORM;
* validação de dados;
* testes unitários e de integração;
* arquitetura de software;
* integração com serviços externos;
* Docker e Docker Compose;
* computação em nuvem;
* segurança de aplicações web;
* boas práticas de desenvolvimento.
* integração entre frontend React e backend Go;

---

## Autor

### Alexander Leal Pastana

Estudante de Análise e Desenvolvimento de Sistemas.

Projeto desenvolvido como aplicação prática de desenvolvimento web, arquitetura de software, APIs em Go, bancos de dados relacionais, testes e computação em nuvem.

---

## Licença

Este projeto está sendo desenvolvido para fins educacionais, estudo de arquitetura de software e implementação de uma solução real para o projeto Integrar.
