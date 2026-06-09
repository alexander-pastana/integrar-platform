import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-foreground hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.4)]",
  ghost:
    "bg-transparent text-foreground hover:bg-secondary",
  outline:
    "border border-foreground/30 text-foreground hover:bg-foreground hover:text-primary-foreground",
};

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant = "primary", children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed",
          variantStyles[variant],
          className,
        )}
      >
        {children}
      </button>
    );
  },
);
CTAButton.displayName = "CTAButton";
