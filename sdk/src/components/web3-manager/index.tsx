import { FC } from "react";

import AllObjectsManager from "./all-objects-manager";
import CoinsManager from "./coins-manager";
import { Web3ManagerProps } from "./web3-manager.types";

const Web3Manager: FC<Web3ManagerProps> = ({ features = ["coins"] }) => (
  <>
    {features.includes("coins") && <CoinsManager />}
    <AllObjectsManager />
  </>
);

export default Web3Manager;
