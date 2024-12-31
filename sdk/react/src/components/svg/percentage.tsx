import { FC } from "react";

import { SVGProps } from "./svg.types";

const Percentage: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      d="M17.5 3.51847L3.51847 17.5L2.5 16.4815L16.4815 2.5L17.5 3.51847Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.7983 6.03907C2.7983 4.24924 4.24924 2.7983 6.03907 2.7983C7.82889 2.7983 9.27983 4.24924 9.27983 6.03907C9.27983 7.82889 7.82889 9.27983 6.03907 9.27983C4.24924 9.27983 2.7983 7.82889 2.7983 6.03907ZM6.03907 4.23864C5.04472 4.23864 4.23864 5.04472 4.23864 6.03907C4.23864 7.03341 5.04472 7.83949 6.03907 7.83949C7.03341 7.83949 7.83949 7.03341 7.83949 6.03907C7.83949 5.04472 7.03341 4.23864 6.03907 4.23864Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.7202 13.9609C10.7202 12.1711 12.1711 10.7202 13.9609 10.7202C15.7508 10.7202 17.2017 12.1711 17.2017 13.9609C17.2017 15.7508 15.7508 17.2017 13.9609 17.2017C12.1711 17.2017 10.7202 15.7508 10.7202 13.9609ZM13.9609 12.1605C12.9666 12.1605 12.1605 12.9666 12.1605 13.9609C12.1605 14.9553 12.9666 15.7614 13.9609 15.7614C14.9553 15.7614 15.7614 14.9553 15.7614 13.9609C15.7614 12.9666 14.9553 12.1605 13.9609 12.1605Z"
      fill="currentColor"
    />
  </svg>
);

export default Percentage;