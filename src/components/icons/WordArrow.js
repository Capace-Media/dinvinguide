import * as React from "react";
const SvgWordArrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={10}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M1 5h23.286m0 0-3.048 4m3.048-4-3.048-4"
    />
  </svg>
);
export default SvgWordArrow;
