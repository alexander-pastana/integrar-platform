import { useEffect, useState, type FormEvent } from "react";
import { X, Check } from "lucide-react";
import { CTAButton } from "./CTAButton";

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  whatsapp: string;
  age: string;
  message: string;
  consent: boolean;
}

const initial: FormData = {
  name: "",
  whatsapp: "",
  age: "",
  message: "",
  consent: false,
};

/**
 * Envia a inscrição de interesse.
 *
 * TODO: Integrar com a API em Go.
 * Endpoint sugerido: POST /api/v1/leads
 * Payload: { name, whatsapp, age, message, consent, source: "landing" }
 */
async function submitInterest(data: FormData): Promise<void> {
  // Placeholder. Substituir pela chamada real ao backend Golang.
  await new Promise((r) => setTimeout(r, 800));
  // eslint-disable-next-line no-console
  console.info("[Integrar] lead submission ready for API:", data);
}

export function SignupModal({ open, onClose }: SignupModalProps) {
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      // reset shortly after close
      const t = setTimeout(() => {
        setData(initial);
        setErrors({});
        setStatus("idle");
      }, 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  function validate(d: FormData) {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!d.name.trim() || d.name.trim().length < 2) e.name = "Informe seu nome completo.";
    if (!/^[\d\s()+-]{8,20}$/.test(d.whatsapp.trim())) e.whatsapp = "WhatsApp inválido.";
    const ageNum = Number(d.age);
    if (!d.age || Number.isNaN(ageNum) || ageNum < 14 || ageNum > 99)
      e.age = "Idade inválida.";
    if (d.message.length > 500) e.message = "Mensagem muito longa.";
    if (!d.consent) e.consent = "É necessário aceitar para continuar.";
    return e;
  }

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const v = validate(data);
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    try {
      setStatus("loading");
      await submitInterest(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function update<K extends keyof FormData>(k: K, val: FormData[K]) {
    setData((d) => ({ ...d, [k]: val }));
  }

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 transition-opacity duration-500 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
    >
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex min-h-full items-center justify-center p-4 md:p-8">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Inscrição no Integrar"
          className={`relative w-full max-w-lg rounded-2xl bg-card shadow-2xl transition-all duration-500 ${open ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
            }`}
        >
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          {status === "success" ? (
            <div className="px-8 py-12 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-sage/20 text-foreground">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-2xl">Obrigado.</h3>
              <p className="mt-3 text-muted-foreground">
                Recebemos seu interesse. Em breve entraremos em contato com você.
              </p>
              <div className="mt-7">
                <CTAButton variant="outline" onClick={onClose}>
                  Fechar
                </CTAButton>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-7 py-9 md:px-10 md:py-10">
              <span className="eyebrow">Inscrição</span>
              <h3 className="mt-3 text-2xl md:text-3xl">Quero participar do Integrar</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Preencha seus dados e nossa equipe entrará em contato.
              </p>

              <div className="mt-6 space-y-4">
                <Field label="Nome completo" error={errors.name}>
                  <input
                    value={data.name}
                    onChange={(e) => update("name", e.target.value)}
                    maxLength={120}
                    className="form-input"
                    autoComplete="name"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="WhatsApp" error={errors.whatsapp}>
                    <input
                      value={data.whatsapp}
                      onChange={(e) => update("whatsapp", e.target.value)}
                      placeholder="(00) 00000-0000"
                      maxLength={20}
                      className="form-input"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </Field>
                  <Field label="Idade" error={errors.age}>
                    <input
                      value={data.age}
                      onChange={(e) => update("age", e.target.value.replace(/\D/g, "").slice(0, 2))}
                      className="form-input"
                      inputMode="numeric"
                    />
                  </Field>
                </div>
                <Field label="Mensagem (opcional)" error={errors.message}>
                  <textarea
                    value={data.message}
                    onChange={(e) => update("message", e.target.value)}
                    maxLength={500}
                    rows={3}
                    className="form-input resize-none"
                  />
                </Field>

                <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={data.consent}
                    onChange={(e) => update("consent", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border accent-[var(--color-primary)]"
                  />
                  <span>
                    Concordo com o tratamento dos meus dados para contato e informações relacionadas ao grupo Integrar.
                  </span>
                </label>
                {errors.consent && (
                  <p className="-mt-2 text-xs text-destructive">{errors.consent}</p>
                )}

                {status === "error" && (
                  <p className="text-sm text-destructive">
                    Não foi possível enviar agora. Tente novamente em instantes.
                  </p>
                )}

                <CTAButton type="submit" className="w-full" disabled={status === "loading"}>
                  {status === "loading" ? "Enviando..." : "Enviar inscrição"}
                </CTAButton>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          background: color-mix(in oklab, var(--color-background) 60%, white);
          border: 1px solid var(--color-border);
          border-radius: 0.75rem;
          padding: 0.7rem 0.9rem;
          font-size: 0.95rem;
          color: var(--color-foreground);
          transition: border-color 200ms ease, box-shadow 200ms ease;
          outline: none;
        }
        .form-input:focus {
          border-color: color-mix(in oklab, var(--color-foreground) 35%, var(--color-border));
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-foreground) 10%, transparent);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium tracking-wide text-foreground/80">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
