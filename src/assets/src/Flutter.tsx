import * as React from "react";
import type { SVGProps } from "react";
const SvgFlutter = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <path
      d="m15.383 18.316 3.361-3.274h8.349l-7.396 7.396z"
      style={{
        fill: "#40d0fd",
      }}
    />
    <path
      d="m4.907 16.125 4.199 4.299L27.093 2.287h-8.349z"
      style={{
        fill: "#41d0fd",
        isolation: "isolate",
      }}
    />
    <path
      d="m11.176 22.479 4.259 4.196 4.262-4.237-4.314-4.122z"
      style={{
        fill: "#1fbcfd",
      }}
    />
    <path
      d="m15.435 26.675 4.262-4.237 7.292 7.375h-8.396z"
      style={{
        fill: "#095a9d",
      }}
    />
    <path
      d="m15.435 26.675 3.971-1.321-1.338-1.297z"
      style={{
        fill: "#0e5199",
      }}
    />
  </svg>
);
export default SvgFlutter;