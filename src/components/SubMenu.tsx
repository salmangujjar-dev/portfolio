import React, {
  PropsWithChildren,
  useState,
  useEffect,
  useRef,
  ReactElement,
} from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";

import { clsxm } from "@utils/clsxm";
import { NAVBAR_OPTIONS } from "@utils/constants";
import { EScreenType, useMediaQuery } from "../hooks/useMediaQuery";

type TSubMenu = PropsWithChildren<{
  className: string;
}>;

const SubMenu = ({ children, className }: TSubMenu) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isMd = useMediaQuery(EScreenType.md);

  const pathname = usePathname();

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMd) {
      setIsOpen(false);
    }
  }, [isMd]);

  return (
    <div className="relative" ref={ref}>
      {React.cloneElement(children as ReactElement, {
        onClick: toggleSubMenu,
        className: clsxm(className, { "-scale-x-100": isOpen }),
      })}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={clsxm(
              "absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md flex flex-col divide-y-2 text-center text-black z-10"
            )}
          >
            {NAVBAR_OPTIONS.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="relative px-4 py-2 hover:bg-gray-200 cursor-pointer group"
              >
                {item.label}
                <span
                  className={clsxm(
                    "absolute -bottom-1 left-0 w-0 transition-all h-1 bg-indigo-400 group-hover:w-full",
                    { ["w-full"]: pathname === item.href }
                  )}
                />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubMenu;
