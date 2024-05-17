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
        "select-none rounded-full bg-indigo-600 font-semibold shadow-lg py-1.5 px-3 max-w-fit text-sm"
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
