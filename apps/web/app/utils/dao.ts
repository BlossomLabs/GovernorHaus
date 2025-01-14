import { ONE_DAY } from "@/utils/constants";
import type { FormValues } from "@/utils/form";
import { publicClient } from "@/utils/web3";
import {
  type Chain,
  type PublicClient,
  getAddress,
  isAddress,
  parseAbi,
  parseAbiItem,
  parseEventLogs,
  parseUnits,
} from "viem";
import { deployedAddresses } from "./deployed";

export async function processTx(
  hash: `0x${string}`,
  publicClient: PublicClient,
) {
  if (!publicClient) return;

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  const logs = parseEventLogs({
    abi: [
      parseAbiItem(
        "event ContractDeployed(string contractType, address contractAddress)",
      ),
    ],
    logs: receipt.logs,
  });

  function isContractDeployedArgs(
    args: any,
  ): args is { contractType: string; contractAddress: `0x${string}` } {
    return (
      args &&
      typeof args.contractType === "string" &&
      typeof args.contractAddress === "string"
    );
  }

  const { Token, Governor } = logs
    .filter((log) => log.eventName === "ContractDeployed")
    .map((log) => log.args)
    .filter(isContractDeployedArgs)
    .reduce((acc: { [key: string]: `0x${string}` }, log) => {
      acc[log.contractType] = log.contractAddress;
      return acc;
    }, {});

  return {
    tokenAddress: Token,
    governorAddress: Governor,
    blockNumber: Number(receipt.blockNumber),
  };
}

export function getContractAddress(chain: Chain): `0x${string}` | undefined {
  const address =
    deployedAddresses[chain.id as keyof typeof deployedAddresses]?.[
      "GovernorHaus#GovernorHaus"
    ];
  if (!address) return;
  return getAddress(address);
}

export async function _login(signIn: any) {
  try {
    return signIn();
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function sendCreateDaoTx(
  writeContract: any,
  contractAddress: `0x${string}`,
  values: FormValues,
) {
  async function getTokenHolderAddresses(
    tokenholders: { address: string }[],
  ): Promise<`0x${string}`[]> {
    return Promise.all(
      tokenholders.map((holder: any) =>
        isAddress(holder.address)
          ? holder.address
          : publicClient.getEnsAddress({ name: holder.address }),
      ),
    );
  }
  return new Promise<`0x${string}`>((resolve, reject) => {
    (async () => {
      writeContract(
        {
          address: contractAddress,
          abi: parseAbi([
            "struct DeploymentConfig { string tokenName; string tokenSymbol; uint256 minDelay; string governorName; uint48 votingDelay; uint32 votingPeriod; uint256 proposalThreshold; uint256 quorumNumerator; uint48 voteExtension; address[] firstMintTo; uint256[] firstMintAmount; }",
            "function createDao(DeploymentConfig memory config)",
          ]),
          functionName: "createDao",
          args: [
            {
              tokenName: values.token.name,
              tokenSymbol: values.token.symbol,
              minDelay: BigInt(values.timelock.minDelay) * ONE_DAY,
              governorName: values.governor.name,
              votingDelay: values.governor.votingDelay * Number(ONE_DAY),
              votingPeriod: values.governor.votingPeriod * Number(ONE_DAY),
              proposalThreshold: parseUnits(
                String(values.governor.proposalThreshold),
                18,
              ),
              quorumNumerator: BigInt(values.governor.quorumNumerator),
              voteExtension: values.governor.voteExtension * Number(ONE_DAY),
              firstMintTo: await getTokenHolderAddresses(
                values.token.tokenholders,
              ),
              firstMintAmount: values.token.tokenholders.map((holder: any) =>
                parseUnits(String(holder.amount), 18),
              ),
            },
          ],
        },
        {
          onSuccess: (res: `0x${string}`) => {
            resolve(res);
          },
          onError: (err: any) => {
            reject(err);
          },
        },
      );
    })();
  });
}
