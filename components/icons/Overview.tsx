import * as React from "react";

const Overview = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M3 11H11V3H3V11ZM5 5H9V9H5V5ZM13 3V11H21V3H13ZM19 9H15V5H19V9ZM3 21H11V13H3V21ZM5 15H9V19H5V15ZM18 13H16V16H13V18H16V21H18V18H21V16H18V13Z" fill="currentColor" />
  </svg>
);

export default Overview;
