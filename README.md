# Integrar Platform

Plataforma web desenvolvida para o projeto **Integrar**, um grupo terapêutico voltado ao desenvolvimento emocional de jovens adultos.

O objetivo da plataforma é apresentar a proposta do grupo, sua metodologia, seus facilitadores e permitir que interessados realizem sua inscrição de forma simples, acolhedora e segura.

---

## Sobre o Projeto

O Integrar nasceu da proposta de oferecer um espaço seguro para jovens adultos desenvolverem maior consciência emocional, fortalecerem habilidades interpessoais e construírem uma relação mais saudável consigo mesmos.

A plataforma foi criada para:

- Apresentar o grupo terapêutico;
- Explicar sua metodologia;
- Demonstrar sua proposta de valor;
- Apresentar os facilitadores;
- Responder dúvidas frequentes;
- Captar interessados para futuras turmas.

---

## Status do Projeto

🚧 Em desenvolvimento

### Concluído

- Landing Page institucional
- Design responsivo
- Navegação entre seções
- FAQ
- Modal/Formulário de interesse
- Apresentação dos facilitadores
- Seção explicativa sobre DBT
- Otimizações de UX e responsividade
- Estrutura inicial para evolução do backend

### Em desenvolvimento

- API em Golang
- Persistência em banco de dados PostgreSQL
- Integração com Google Sheets
- Notificações por e-mail
- Deploy em nuvem

---

## Tecnologias Utilizadas

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Router
- Framer Motion

### Backend (Planejado)

- Golang
- Fiber
- Gorm
- PostgreSQL

### Infraestrutura (Planejada)

- Cloud Pública
- HTTPS
- Deploy Automatizado
- Banco de Dados Gerenciado

---

## Estrutura Atual

```text
integrar/
├── web/
├── docs/
│   ├── briefing/
│   ├── identidade-visual/
│   └── README.md
└── README.md
```

### web/

Aplicação frontend responsável pela experiência do usuário e apresentação institucional do projeto.

### docs/

Documentação utilizada durante a fase de descoberta, planejamento, arquitetura da solução e definição da identidade visual.

---

## Documentação

A pasta `docs` contém materiais produzidos durante a fase de concepção do projeto.

### Briefing

Documentos relacionados ao planejamento do produto:

- Visão do Projeto
- Arquitetura da Home Page
- Estrutura de Conteúdo
- Definição de Objetivos
- Público-Alvo
- Jornada do Usuário

### Identidade Visual

Materiais utilizados para orientar:

- Direção de arte
- Tom de comunicação
- Linguagem visual
- Referências estéticas
- Posicionamento da marca

---

## Processo de Desenvolvimento

O desenvolvimento do projeto teve início a partir do levantamento de requisitos, análise dos materiais fornecidos pelos facilitadores, estudo da proposta terapêutica do grupo e definição da identidade visual da marca Integrar.

Antes da implementação, foram produzidos documentos de planejamento, arquitetura de conteúdo, posicionamento, público-alvo e experiência do usuário.

Ferramentas de IA generativa foram utilizadas como apoio durante a fase de prototipação e exploração de layouts, acelerando a criação inicial de componentes e propostas visuais.

Entretanto, a definição da estrutura do produto, arquitetura da solução, refinamentos de interface, ajustes de responsividade, organização do código, experiência do usuário e evolução técnica do projeto foram conduzidos manualmente ao longo do desenvolvimento.

Este repositório representa a implementação prática dessas definições e continua evoluindo para incluir backend, banco de dados, integrações e infraestrutura em nuvem.

---

## Executando o Projeto

### Instalação

```bash
cd web

npm install
```

### Ambiente de Desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:8080
```

---

## Objetivos Técnicos

- Aplicar boas práticas de desenvolvimento frontend
- Desenvolver uma API REST em Golang
- Utilizar banco de dados PostgreSQL
- Integrar serviços externos
- Implementar deploy em nuvem
- Consolidar conhecimentos em arquitetura de software
- Evoluir o projeto para um ambiente de produção

---

## Roadmap

### Fase 1 — Frontend

- [x] Estrutura inicial
- [x] Landing Page
- [x] Responsividade
- [x] Componentização
- [x] Refinamentos visuais

### Fase 2 — Backend

- [ ] Estrutura da API
- [ ] Endpoint de inscrição
- [ ] Validação dos dados
- [ ] Persistência em banco

### Fase 3 — Integrações

- [ ] Google Sheets
- [ ] Notificações por e-mail
- [ ] Exportação de dados

### Fase 4 — Infraestrutura

- [ ] Deploy Frontend
- [ ] Deploy Backend
- [ ] Banco em nuvem
- [ ] HTTPS
- [ ] Monitoramento

---

## Autor

Alexander Leal Pastana

Estudante de Análise e Desenvolvimento de Sistemas.

Projeto desenvolvido como aplicação prática de desenvolvimento web, arquitetura de software, APIs em Golang, bancos de dados relacionais e computação em nuvem.

---

## Licença

Este projeto está sendo desenvolvido para fins educacionais, estudo de arquitetura de software e implementação de uma solução real para o projeto Integrar.
