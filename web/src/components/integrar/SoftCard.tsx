import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SoftCardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function SoftCard({ className, interactive = true, ...rest }: SoftCardProps) {
  return (
    <div
      {...rest}
      className={cn(
        "soft-card p-7 md:p-8",
        interactive && "soft-card-hover",
        className,
      )}
    />
  );
}
