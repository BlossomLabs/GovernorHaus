import deployedOp from "../../../../contracts/governorhaus/ignition/deployments/chain-10/deployed_addresses.json";
import deployedGnosis from "../../../../contracts/governorhaus/ignition/deployments/chain-100/deployed_addresses.json";
import deployedPolygon from "../../../../contracts/governorhaus/ignition/deployments/chain-137/deployed_addresses.json";
import deployedBase from "../../../../contracts/governorhaus/ignition/deployments/chain-8453/deployed_addresses.json";
import deployedArbitrum from "../../../../contracts/governorhaus/ignition/deployments/chain-42161/deployed_addresses.json";
import deployedCelo from "../../../../contracts/governorhaus/ignition/deployments/chain-42220/deployed_addresses.json";

export const deployedAddresses = {
  10: deployedOp,
  42220: deployedCelo,
  42161: deployedArbitrum,
  100: deployedGnosis,
  137: deployedPolygon,
  8453: deployedBase,
};
