import * as React from "react";
const SvgArrowLeft = (props) => (
  <svg
    width={12}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.286 5H1m0 0 3.047 4M1 5l3.047-4"
      stroke="#000"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgArrowLeft;
