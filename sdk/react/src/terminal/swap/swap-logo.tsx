import { Box, Typography } from "@interest-protocol/ui-kit";
import { FC } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { LogoSVG } from "../../components/svg";
import { SwapForm } from "./swap.types";

const SwapLogo: FC = () => {
  const { control } = useFormContext<SwapForm>();

  const to = useWatch({ control, name: "to.type" });
  const from = useWatch({ control, name: "from.type" });

  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://www.suicoins.com?from=${from}&to=${to}`}
    >
      <Box display="flex" alignItems="center" gap="xs">
        <LogoSVG maxWidth="1.6rem" maxHeight="1.6rem" width="100%" />
        <Typography
          size="small"
          variant="title"
          fontWeight="700"
          color="onSurface"
          width="max-content"
        >
          SUI COINS
        </Typography>
      </Box>
    </a>
  );
};

export default SwapLogo;
