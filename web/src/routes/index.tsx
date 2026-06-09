import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Heart, Leaf, Quote, Sparkles } from "lucide-react";

import heroImg from "@/assets/hero-interior.jpg";
import roseImg from "@/assets/rose.jpg";
import windowImg from "@/assets/window-light.jpg";

import { CTAButton } from "@/components/integrar/CTAButton";
import { SoftCard } from "@/components/integrar/SoftCard";
import { SectionHeader } from "@/components/integrar/SectionHeader";
import { FAQAccordion } from "@/components/integrar/FAQAccordion";
import { SignupModal } from "@/components/integrar/SignupModal";
import { useReveal } from "@/hooks/useReveal";
import {
  benefits,
  challenges,
  differentials,
  dimensions,
  facilitators,
  faqs,
  forWhom,
  howItWorks,
  notFor,
} from "@/data/integrar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Integrar · Grupo Terapêutico de Desenvolvimento Emocional" },
      {
        name: "description",
        content:
          "Integrar é um grupo terapêutico de desenvolvimento emocional para jovens adultos. Pensar, sentir e agir em equilíbrio, com base na abordagem DBT.",
      },
      { property: "og:title", content: "Integrar · Grupo Terapêutico" },
      {
        property: "og:description",
        content:
          "Um espaço seguro para jovens adultos desenvolverem habilidades emocionais com base na Terapia Cognitiva Dialética.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: IntegrarLanding,
});

function IntegrarLanding() {
  const [modalOpen, setModalOpen] = useState(false);
  useReveal();

  const open = () => setModalOpen(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav onOpen={open} />
      <Hero onOpen={open} />
      <Challenges />
      <WhatIs />
      <ThinkFeelAct />
      <Differentials />
      <Benefits />
      <HowItWorks />
      <Approach />
      <Facilitators />
      <ForWhom />
      <NotFor />
      <FAQ />
      <FinalCTA onOpen={open} />
      <Footer />
      <SignupModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav({ onOpen }: { onOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-xl tracking-tight">
          Integrar<span className="text-accent">.</span>
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#sobre" className="hover:text-foreground transition-colors">Sobre</a>
          <a href="#abordagem" className="hover:text-foreground transition-colors">Abordagem</a>
          <a href="#facilitadores" className="hover:text-foreground transition-colors">Facilitadores</a>
          <a href="#faq" className="hover:text-foreground transition-colors">Perguntas</a>
        </nav>
        <CTAButton onClick={onOpen} className="px-5 py-2.5 text-xs">
          Quero participar
        </CTAButton>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ onOpen }: { onOpen: () => void }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-12 md:pt-28 md:pb-16"
    >
      <div className="container-page grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <span className="eyebrow reveal">Grupo Terapêutico · DBT</span>
          <h1 className="reveal mt-4 text-[2.25rem] leading-[1.05] sm:text-5xl md:text-6xl">
            Pensar, sentir e agir
            <br />
            <em className="not-italic text-accent font-light">nem sempre caminham juntos.</em>
          </h1>
          <p className="reveal mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            O Integrar é um grupo terapêutico de desenvolvimento emocional para jovens adultos
            que desejam compreender melhor suas emoções, ampliar habilidades e construir uma
            relação mais consciente consigo mesmos.
          </p>
          <div className="reveal mt-7 flex flex-wrap items-center gap-4">
            <CTAButton onClick={onOpen}>
              Quero participar do Integrar <ArrowRight className="h-4 w-4" />
            </CTAButton>
            <a
              href="#sobre"
              className="text-sm text-foreground/80 underline-offset-4 hover:underline"
            >
              Saber mais sobre o grupo
            </a>
          </div>
        </div>

        <div className="reveal lg:col-span-5">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-[0_30px_80px_-40px_rgba(60,40,20,0.4)]">
              <img
                src={heroImg}
                alt="Ambiente acolhedor com poltrona e planta"
                width={1600}
                height={1200}
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>
            <div className="absolute -left-5 -bottom-5 hidden rounded-2xl bg-card p-4 shadow-xl ring-1 ring-border md:block max-w-[14rem]">
              <Quote className="h-5 w-5 text-accent" />
              <p className="mt-2 font-display text-sm leading-snug">
                "Aprender a existir com as emoções de um jeito mais seguro."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CHALLENGES ---------------- */
function Challenges() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Você se identifica?"
            title="Algumas emoções pedem mais espaço para serem compreendidas."
            description="Carregamos experiências e histórias que vão se acumulando ao longo do tempo. Com o passar dos anos, isso pode gerar:"
          />
        </div>
        <ul className="reveal lg:col-span-7 grid gap-4 sm:grid-cols-2">
          {challenges.map((c, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card/60 px-5 py-4 transition-colors hover:bg-card"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-[15px] leading-relaxed">{c}</span>
            </li>
          ))}
          <li className="sm:col-span-2 mt-2 font-display text-xl text-foreground/80">
            Você não precisa fazer esse caminho sozinho.
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ---------------- WHAT IS ---------------- */
function WhatIs() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-secondary/40 py-16 md:py-32"
    >
      {/* Editorial image: bleeds to the right, soft fade to the left */}
      <div className="reveal pointer-events-none absolute inset-0 block lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[50%]">
        <img
          src={windowImg}
          alt="Parede em tom rosado com luminária"
          loading="lazy"
          className="h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-secondary/70 to-secondary/40 lg:bg-gradient-to-r lg:from-secondary lg:from-0% lg:via-secondary/90 lg:via-35% lg:to-transparent lg:to-75%" />
      </div>

      <div className="container-page relative">
        <div className="max-w-xl lg:max-w-[50%]">
          <SectionHeader
            eyebrow="O que é o Integrar"
            title="Um grupo terapêutico voltado ao desenvolvimento emocional de jovens adultos."
          />

          <div className="reveal mt-6 space-y-4 text-[17px] leading-relaxed text-muted-foreground">
            <p>
              Nossa proposta é criar um espaço seguro, acolhedor e estruturado para que cada
              participante possa desenvolver maior consciência emocional, ampliar seu repertório
              de habilidades e construir formas mais saudáveis de lidar com os desafios da vida.
            </p>
            <p>
              Aqui, acreditamos que crescimento emocional não significa eliminar emoções
              difíceis. Significa aprender a se relacionar com elas de maneira mais consciente,
              flexível e gentil.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- THINK FEEL ACT ---------------- */
function ThinkFeelAct() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          align="center"
          eyebrow="Pensar · Sentir · Agir"
          title="Construir pontes entre as três dimensões da experiência humana."
          description="Grande parte do sofrimento humano surge quando existe um distanciamento entre aquilo que pensamos, sentimos e fazemos."
        />
        <div className="reveal mt-16 grid gap-6 md:grid-cols-3">
          {dimensions.map((d, i) => (
            <SoftCard key={i} className="text-center">
              <span className="font-display text-5xl text-accent">0{i + 1}</span>
              <h3 className="mt-4 text-2xl">{d.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{d.text}</p>
            </SoftCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- DIFFERENTIALS ---------------- */
function Differentials() {
  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          eyebrow="O que torna o Integrar diferente"
          title="Não é uma palestra. Não é uma terapia individual. É um caminho compartilhado."
        />
        <div className="reveal mt-14 grid gap-6 md:grid-cols-2">
          {differentials.map((d, i) => (
            <SoftCard key={i}>
              <Sparkles className="h-5 w-5 text-accent" />
              <h3 className="mt-4 text-xl">{d.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{d.text}</p>
            </SoftCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- BENEFITS ---------------- */
function Benefits() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Benefícios"
            title="O que você pode desenvolver ao longo do processo."
          />
        </div>
        <ul className="reveal lg:col-span-7 grid gap-3 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-3 border-b border-border py-4 text-[15px]"
            >
              <Heart className="mt-1 h-4 w-4 shrink-0 text-accent" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          eyebrow="Como funciona"
          title="Encontros estruturados, conduzidos com cuidado."
          description="Trabalhamos temas relacionados ao desenvolvimento emocional, autoconhecimento e construção de habilidades para lidar com situações desafiadoras do cotidiano."
        />
        <div className="reveal mt-14 grid gap-6 md:grid-cols-3">
          {howItWorks.map((s) => (
            <SoftCard key={s.step}>
              <span className="eyebrow">{s.step}</span>
              <h3 className="mt-3 text-xl">{s.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{s.text}</p>
            </SoftCard>
          ))}
        </div>

        <div className="reveal mt-12 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Leaf className="h-4 w-4 text-sage" />
          <span>Reflexões guiadas</span>
          <Dot />
          <span>Exercícios práticos</span>
          <Dot />
          <span>Trocas em grupo</span>
          <Dot />
          <span>Ambiente seguro</span>
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return <span className="h-1 w-1 rounded-full bg-border" />;
}

/* ---------------- APPROACH ---------------- */
function Approach() {
  return (
    <section id="abordagem" className="relative overflow-hidden py-20 md:py-32">
      {/* Editorial image: bleeds to the left, soft fade to the right */}
      <div className="reveal pointer-events-none absolute inset-0 block lg:inset-y-0 lg:left-0 lg:right-auto lg:w-[50%]">
        <img
          src={roseImg}
          alt="Flores delicadas em vaso de vidro sobre fundo cinza"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/70 lg:bg-gradient-to-l lg:from-background lg:via-background/60 lg:to-transparent" />
      </div>

      <div className="container-page relative">
        <div className="ml-auto max-w-xl lg:max-w-[50%]">
          <SectionHeader
            eyebrow="Nossa abordagem"
            title="A delicadeza da Terapia Cognitiva Dialética."
            description="Se você tenta só mudar, pode acabar se cobrando demais. Se tenta só aceitar, pode se conformar com o desconforto. A DBT entra justamente aí: ela ensina a se relacionar, de forma saudável, com os dois ao mesmo tempo."
          />
          <div className="reveal mt-8 grid gap-4 sm:grid-cols-2">
            <ApproachPill title="Aceitação" text="Reconhecer o que se sente e validar a própria história." />
            <ApproachPill title="Mudança" text="Desenvolver habilidades para responder de forma mais saudável." />
          </div>
          <p className="reveal mt-8 font-display text-xl leading-relaxed text-foreground/80">
            Como um equilibrista que ajusta o corpo o tempo todo pra não cair, você aprende a
            sentir sem se perder, reagir sem se destruir e, principalmente, se validar sem
            deixar de crescer.
          </p>
        </div>
      </div>
    </section>
  );
}

function ApproachPill({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm">
      <span className="eyebrow">{title}</span>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

/* ---------------- FACILITATORS ---------------- */
function Facilitators() {
  return (
    <section id="facilitadores" className="bg-secondary/40 py-20 md:py-24">
      <div className="container-page">
        <SectionHeader
          eyebrow="Quem facilita o Integrar"
          title="Conduzido por profissionais especializados em desenvolvimento emocional."
        />
        <div className="reveal mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {facilitators.map((f) => (
            <article
              key={f.name}
              className="group flex overflow-hidden rounded-[1.5rem] border border-border bg-card transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(60,40,20,0.35)]"
            >
              <div className="w-2/5 shrink-0 overflow-hidden bg-secondary/60">
                <img
                  src={f.image}
                  alt={f.name}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover object-top transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center p-5 md:p-6">
                <span className="eyebrow text-[0.65rem]">{f.role} · {f.crp}</span>
                <h3 className="mt-2 text-lg md:text-xl">{f.name}</h3>
                <p className="mt-2 text-[13.5px] md:text-sm text-muted-foreground leading-relaxed line-clamp-6">{f.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOR WHOM ---------------- */
function ForWhom() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          align="center"
          eyebrow="Para quem é o Integrar"
          title="Um espaço pensado para jovens adultos."
        />
        <div className="reveal mx-auto mt-12 grid max-w-3xl gap-3">
          {forWhom.map((f, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-2xl bg-card/60 px-6 py-4 border border-border"
            >
              <span className="font-display text-xl text-accent">0{i + 1}</span>
              <p className="leading-relaxed">{f}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- NOT FOR ---------------- */
function NotFor() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-page">
        <SoftCard interactive={false} className="reveal mx-auto max-w-4xl bg-secondary/40">
          <span className="eyebrow">Para quem o Integrar não é indicado</span>
          <h3 className="mt-3 text-2xl md:text-3xl">
            Algumas situações pedem outro tipo de cuidado, e tudo bem.
          </h3>
          <ul className="mt-6 space-y-3">
            {notFor.map((n, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                <span className="mt-2 h-1 w-4 shrink-0 bg-accent" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Em qualquer caso, fique à vontade para entrar em contato. Podemos conversar e
            orientar sobre o caminho mais adequado para você.
          </p>
        </SoftCard>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  return (
    <section id="faq" className="bg-secondary/40 py-24 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Perguntas frequentes"
            title="Esclareça as dúvidas mais comuns sobre o grupo."
          />
        </div>
        <div className="reveal lg:col-span-7">
          <FAQAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="container-page reveal text-center">
        <span className="eyebrow">Vagas limitadas</span>
        <h2 className="mx-auto mt-5 max-w-3xl text-4xl md:text-6xl leading-[1.05]">
          Você não precisa ter todas as respostas agora.
          <br />
          <em className="not-italic text-accent font-light">Mas pode dar o primeiro passo.</em>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-muted-foreground leading-relaxed">
          O Integrar é um convite para desenvolver uma relação mais consciente, flexível e
          acolhedora consigo mesmo. Esperamos você.
        </p>
        <div className="mt-10">
          <CTAButton onClick={onOpen}>
            Quero participar do Integrar <ArrowRight className="h-4 w-4" />
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container-page flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
        <div>
          <div className="font-display text-xl">
            Integrar<span className="text-accent">.</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            Grupo terapêutico de desenvolvimento emocional para jovens adultos.
          </p>
        </div>
        <div className="text-sm text-muted-foreground space-y-1 md:text-right">
          <p>Carlos Vinícius Pereira · CRP 10/09640</p>
          <p>Ana Paula Leite · CRP 10/09355</p>
          <p className="pt-2 text-xs">
            © {new Date().getFullYear()} Integrar. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
