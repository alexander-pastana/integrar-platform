import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQ {
  q: string;
  a: string;
}

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-accent"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg md:text-xl">{it.q}</span>
              <span className="shrink-0 rounded-full border border-border p-1.5 text-muted-foreground">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <div
              className="grid overflow-hidden transition-all duration-500 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0">
                <p className="pb-6 pr-12 text-muted-foreground leading-relaxed">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
