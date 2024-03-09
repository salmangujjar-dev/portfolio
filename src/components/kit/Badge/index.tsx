import { ReactNode } from "react";

import { clsxm } from "@utils/clsxm";

type Props = {
  children: ReactNode;
  className?: string;
};

const Badge = ({ children, className }: Props) => {
  return (
    <div
      className={clsxm(
        className,
        "rounded-full bg-indigo-400 py-0.5 px-1.5 max-w-fit text-xs"
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
