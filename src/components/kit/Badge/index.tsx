import { ReactNode } from "react";

import { cn } from "@lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

const Badge = ({ children, className }: Props) => {
  return (
    <span
      className={cn(
        "inline-flex select-none items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium tracking-wide text-accent",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
