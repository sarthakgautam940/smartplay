import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em]",
  {
    variants: {
      variant: {
        default:
          "border-[var(--lime)]/28 bg-[var(--lime)]/10 text-[var(--lime)]",
        secondary: "border-white/10 bg-white/[0.04] text-white/62",
        danger:
          "border-[var(--rose)]/28 bg-[var(--rose)]/10 text-[var(--rose)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
