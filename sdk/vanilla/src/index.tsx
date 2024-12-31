import {
  SwapInterfaceProps,
  SwapTerminal,
} from "@interest-protocol/sui-coins-terminal";
import ReactDOM from "react-dom/client";

const initializer = (props: SwapInterfaceProps) =>
  ReactDOM.createRoot(
    document.getElementById("suicoins-terminal") as Element,
  ).render(<SwapTerminal {...props} />);

export default initializer;
