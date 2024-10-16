import { FC, useId } from "react";

import { SVGProps } from "./svg.types";

const FTMChain: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => {
  const id = useId();

  return (
    <svg
      style={{ maxWidth, maxHeight }}
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <g clipPath={`url(#clip0_${id})`}>
        <path
          d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
          fill="#13B5EC"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.2 12.9L20.8 10.8V15L17.2 12.9ZM20.8 21.9L16 24.7L11.2 21.9V17L16 19.8L20.8 17V21.9ZM11.2 10.8L14.8 12.9L11.2 15V10.8ZM16.6 13.9L20.2 16L16.6 18.1V13.9ZM15.4 18.1L11.8 16L15.4 13.9V18.1ZM20.2 9.8L16 12.2L11.8 9.8L16 7.3L20.2 9.8ZM10 9.4V22.5L16 25.9L22 22.5V9.4L16 6L10 9.4Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id={`clip0_${id}`}>
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FTMChain;
