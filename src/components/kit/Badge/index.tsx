import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Badge = ({ children }: Props) => {
  return (
    <div className="rounded-full bg-indigo-400 py-0.5 px-1.5 max-w-fit text-xs">
      {children}
    </div>
  );
};

export default Badge;
