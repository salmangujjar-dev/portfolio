import * as React from "react";
import type { SVGProps } from "react";
const SvgHeadlessUi = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="headless-ui_svg__h-11"
    viewBox="0 0 42 42"
    {...props}
  >
    <path
      fill="url(#headless-ui_svg__a)"
      d="m9 26 25-8a80 80 0 0 0-2-10 5 5 0 0 0-2-1h-2a101 101 0 0 0-20 3 5 5 0 0 0-1 2v3l1 8z"
    />
    <path
      fill="url(#headless-ui_svg__b)"
      fillRule="evenodd"
      d="M1 24V9a12 12 0 0 1 3-4c3-2 6-3 14-4s12-2 15 0a12 12 0 0 1 4 3c2 2 3 6 4 14s2 11 1 15a12 12 0 0 1-3 4c-3 2-7 3-15 4-7 1-11 2-14 0a12 12 0 0 1-4-3c-3-2-3-6-5-14m14 14a102 102 0 0 0 21-4 8 8 0 0 0 2-3v-4a100 100 0 0 0-4-20 8 8 0 0 0-3-2l-3-1A102 102 0 0 0 7 8a8 8 0 0 0-2 3l-1 4a100 100 0 0 0 5 20 8 8 0 0 0 2 2z"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient
        id="headless-ui_svg__a"
        x1={16.8}
        x2={23.4}
        y1={0}
        y2={41.7}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#66E3FF" />
        <stop offset={1} stopColor="#7064F9" />
      </linearGradient>
      <linearGradient
        id="headless-ui_svg__b"
        x1={16.8}
        x2={23.4}
        y1={0}
        y2={41.7}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#66E3FF" />
        <stop offset={1} stopColor="#7064F9" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgHeadlessUi;
