import * as React from "react";
import type { SVGProps } from "react";
const SvgMaterialUi = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    preserveAspectRatio="xMidYMid"
    viewBox="0 -26 256 256"
    {...props}
  >
    <path fill="#00B0FF" d="M0 110.848V0l96 55.424v36.95l-64-36.95v73.899z" />
    <path
      fill="#0081CB"
      d="M96 55.424 192 0v110.848l-64 36.95-32-18.475 64-36.95V55.424l-64 36.95z"
    />
    <path fill="#00B0FF" d="M96 129.323v36.949l64 36.95v-36.95z" />
    <path
      fill="#0081CB"
      d="m160 203.221 96-55.424V73.9l-32 18.474v36.95l-64 36.949zm64-147.797v-36.95L256 0v36.95z"
    />
  </svg>
);
export default SvgMaterialUi;
