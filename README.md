# Integrar Platform

Plataforma web desenvolvida para o projeto **Integrar**, um grupo terapêutico voltado ao desenvolvimento emocional de jovens adultos.

O objetivo da plataforma é apresentar a proposta do grupo, sua metodologia, seus facilitadores e permitir que interessados realizem sua inscrição de forma simples, acolhedora e segura.

---

## Sobre o Projeto

O Integrar nasceu da proposta de oferecer um espaço seguro para jovens adultos desenvolverem maior consciência emocional, fortalecerem habilidades interpessoais e construírem uma relação mais saudável consigo mesmos.

A plataforma foi criada para:

* Apresentar o grupo terapêutico;
* Explicar sua metodologia;
* Demonstrar sua proposta de valor;
* Apresentar os facilitadores;
* Responder dúvidas frequentes;
* Captar interessados para futuras turmas.

---

## Status do Projeto

🚧 Em desenvolvimento

### Concluído

#### Frontend

* Landing Page institucional
* Design responsivo
* Navegação entre seções
* FAQ
* Modal/Formulário de interesse
* Apresentação dos facilitadores
* Seção explicativa sobre DBT
* Otimizações de UX e responsividade

#### Backend

* Estrutura inicial da API em Go
* Configuração do Fiber
* Integração com PostgreSQL (Neon)
* Configuração do GORM
* Endpoint de Health Check (`/health`)
* AutoMigrate inicial da entidade Lead
* Gerenciamento de configuração via `.env`

#### Infraestrutura

* Banco de dados PostgreSQL gerenciado (Neon)
* Estrutura preparada para deploy em nuvem
* Organização do projeto em monorepo
* Configuração centralizada de variáveis de ambiente

### Em desenvolvimento

* Endpoint de cadastro de interessados
* Validação de dados
* Persistência de leads
* Integração com Google Sheets
* Notificações por e-mail
* Deploy em produção

---

## Tecnologias Utilizadas

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* TanStack Router
* Framer Motion

### Backend

* Golang
* Fiber
* GORM
* PostgreSQL

### Infraestrutura

* Neon (PostgreSQL Gerenciado)
* Cloudflare Pages
* Render (Planejado)
* HTTPS
* Variáveis de Ambiente (.env)

---

## Estrutura do Projeto

```text
integrar/
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
│   │   └── leads/
│   ├── go.mod
│   └── go.sum
├── web/
└── docs/
```

### api/

Responsável pela API REST desenvolvida em Go.

Atualmente contém:

* Inicialização da aplicação
* Configuração de ambiente
* Conexão com banco PostgreSQL
* Configuração do Fiber
* Estrutura inicial do domínio de Leads

### web/

Aplicação frontend responsável pela experiência do usuário e apresentação institucional do projeto.

### docs/

Documentação utilizada durante a fase de descoberta, planejamento, arquitetura da solução e definição da identidade visual.

---

## Arquitetura Atual

### Frontend

* React + TypeScript
* Cloudflare Pages (Planejado)

### Backend

* API REST em Go
* Framework Fiber
* GORM para acesso ao banco

### Banco de Dados

* PostgreSQL gerenciado via Neon

### Fluxo Atual

```text
Visitante
    │
    ▼
Landing Page (React)
    │
    ▼
API Go (Fiber)
    │
    ▼
PostgreSQL (Neon)
```

---

## Modelo Inicial de Dados

A primeira entidade do sistema é o Lead (Interessado):

* ID
* Nome
* WhatsApp
* Idade
* Mensagem
* Consentimento de Privacidade
* Data de Criação

---

## Segurança e Privacidade

O projeto adota as seguintes práticas:

* HTTPS obrigatório
* Credenciais protegidas por variáveis de ambiente
* Banco de dados não exposto diretamente ao frontend
* Preparado para CORS restrito
* Preparado para Rate Limiting
* Consentimento explícito para tratamento de dados
* Terminologia adequada à LGPD e ao contexto terapêutico

---

## Executando o Frontend

```bash
cd web

npm install
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:8080
```

---

## Executando a API

```bash
cd api

go run ./cmd/api
```

A API ficará disponível em:

```text
http://localhost:8080
```

### Endpoint de Verificação

```http
GET /health
```

Resposta esperada:

```json
{
  "status": "ok"
}
```

---

## Roadmap

### Fase 1 — Frontend

* [x] Estrutura inicial
* [x] Landing Page
* [x] Responsividade
* [x] Componentização
* [x] Refinamentos visuais

### Fase 2 — Backend

* [x] Estrutura da API
* [x] Configuração do Fiber
* [x] Integração com PostgreSQL
* [x] Configuração do GORM
* [x] Endpoint de Health Check
* [ ] Endpoint de inscrição
* [ ] Validação dos dados
* [ ] Persistência de Leads

### Fase 3 — Integrações

* [ ] Google Sheets
* [ ] Notificações por e-mail
* [ ] Integração com Resend
* [ ] Exportação de dados

### Fase 4 — Infraestrutura

* [ ] Deploy Frontend (Cloudflare Pages)
* [ ] Deploy Backend (Render)
* [ ] Configuração de variáveis de ambiente em produção
* [ ] HTTPS completo
* [ ] Monitoramento

---

## Objetivos Técnicos

Este projeto está sendo utilizado para consolidar conhecimentos em:

* Desenvolvimento Backend com Go
* APIs REST
* PostgreSQL
* GORM
* Arquitetura de Software
* Integrações com APIs externas
* Computação em Nuvem
* Segurança de Aplicações Web
* Boas práticas de desenvolvimento

---

## Autor

**Alexander Leal Pastana**

Estudante de Análise e Desenvolvimento de Sistemas.

Projeto desenvolvido como aplicação prática de desenvolvimento web, arquitetura de software, APIs em Golang, bancos de dados relacionais e computação em nuvem.

---

## Licença

Este projeto está sendo desenvolvido para fins educacionais, estudo de arquitetura de software e implementação de uma solução real para o projeto Integrar.
