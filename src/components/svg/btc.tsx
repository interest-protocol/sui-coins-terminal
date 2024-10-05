import { FC } from "react";

import { SVGProps } from "./svg.types";

const USDT: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxHeight, maxWidth }}
    viewBox="0 0 20 27"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.4683 7.97842C17.1491 5.15773 14.6945 4.25106 11.6107 4.03242L11.5456 0.113371L9.15946 0.1534L9.22296 3.96915C8.59649 3.97948 7.95566 4.00251 7.319 4.02579L7.25558 0.184768L4.87137 0.224287L4.93554 4.14223C4.41925 4.16135 3.91221 4.17936 3.41766 4.1879L3.41715 4.17576L0.126951 4.22927L0.169882 6.77704C0.169882 6.77704 1.93092 6.7142 1.90217 6.74713C2.86843 6.73138 3.19286 7.28694 3.29174 7.76965L3.36608 12.2343C3.43276 12.2335 3.51979 12.2348 3.6185 12.2467L3.36715 12.251L3.46977 18.5057C3.43241 18.8105 3.26171 19.2983 2.58665 19.3107C2.61762 19.3372 0.852571 19.339 0.852571 19.339L0.426071 22.1964L3.53108 22.1446C3.88155 22.1392 4.22866 22.1372 4.57196 22.1352L4.57238 22.1352C4.79484 22.1339 5.0157 22.1327 5.23484 22.1305L5.30183 26.0948L7.68477 26.0556L7.62021 22.1337C8.27408 22.1365 8.90735 22.1312 9.5255 22.1203L9.58929 26.0241L11.9748 25.9842L11.9098 22.0276C15.9165 21.7309 18.7073 20.6737 18.9922 16.9028C19.2233 13.8655 17.7749 12.5359 15.4891 12.0264C16.8601 11.2979 17.7042 10.0427 17.4677 7.97859L17.4683 7.97842ZM14.2712 16.5093C14.3169 19.2281 10.0443 19.2391 8.09107 19.2441C7.91617 19.2445 7.75986 19.245 7.62692 19.2472L7.54032 13.9956C7.70284 13.993 7.90013 13.985 8.12362 13.976L8.12369 13.976C10.1243 13.8955 14.2241 13.7306 14.2718 16.5092L14.2712 16.5093ZM7.8924 11.59C9.52317 11.5896 13.0778 11.5887 13.0375 9.11864C12.9958 6.59174 9.57849 6.73933 7.90951 6.81141C7.72188 6.81952 7.55635 6.82666 7.4202 6.82895L7.49915 11.5919C7.61153 11.59 7.744 11.59 7.8924 11.59Z"
      fill="currentColor"
    />
  </svg>
);

export default USDT;
