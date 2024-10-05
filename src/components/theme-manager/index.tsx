import "react-loading-skeleton/dist/skeleton.css";

import {
  lightTheme,
  ThemeProvider as InterestThemeProvider,
} from "@interest-protocol/ui-kit";
import { FC, PropsWithChildren } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

const ThemeManager: FC<PropsWithChildren> = ({ children }) => (
  <InterestThemeProvider theme={lightTheme}>
    <SkeletonTheme baseColor="#99BBFF28" highlightColor="#99BBFF14">
      {children}
    </SkeletonTheme>
  </InterestThemeProvider>
);

export default ThemeManager;
