import * as React from "react";
const SvgArrowRight = (props) => (
  <svg
    width={12}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 5h10.286m0 0L8.238 9m3.048-4L8.238 1"
      stroke="#000"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgArrowRight;
