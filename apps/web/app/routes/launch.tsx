import { Autoform, type FormParams } from "@/components/form/Autoform";
import {
  _login,
  getContractAddress,
  processTx,
  sendCreateDaoTx,
} from "@/utils/dao";
import type { FormValues } from "@/utils/form";
import { createTallyDao, useSignInWithTally } from "@/utils/tally-api";
import { Button } from "@repo/ui/components/ui/button";
import { useToast } from "@repo/ui/hooks/use-toast";
import { useEffect, useState } from "react";
import type { PublicClient } from "viem";
import { optimism } from "viem/chains";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";

import {
  loginErrorToast,
  processTxErrorToast,
  sendCreateDaoTxErrorToast,
  walletNotConnectedToast,
  wrongNetworkToast,
} from "../utils/toasts";

function LaunchPage() {
  const { writeContract } = useWriteContract();
  const { signIn } = useSignInWithTally();
  const { address, chain } = useAccount();
  const { toast } = useToast();
  const publicClient = usePublicClient() as PublicClient;
  const explorerUrl =
    chain?.id === optimism.id
      ? "https://optimism.blockscout.com"
      : "https://explorer.celo.org";
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  async function onSubmit(values: FormValues) {
    console.log(values);
    if (!address || !chain) {
      walletNotConnectedToast(toast);
      return;
    }
    const contractAddress = getContractAddress(chain);
    if (!contractAddress) {
      wrongNetworkToast(toast);
      return;
    }
    const login = await _login(signIn);
    if (!login) {
      loginErrorToast(toast);
      return;
    }
    let res: `0x${string}` | undefined;
    try {
      res = await sendCreateDaoTx(writeContract, contractAddress, values);
    } catch (error) {
      console.error(error);
      sendCreateDaoTxErrorToast(toast);
      return;
    }

    const result = await processTx(res, publicClient);
    if (!result || !result.tokenAddress || !result.governorAddress) {
      processTxErrorToast(toast);
      return;
    }
    const { tokenAddress, governorAddress, blockNumber } = result;
    toast({
      title: "DAO created",
      description: (
        <ul>
          <li>
            Your Token has been created at{" "}
            <a
              className="underline font-bold"
              target="_blank"
              href={`${explorerUrl}/token/${tokenAddress}`}
              rel="noreferrer"
            >
              {tokenAddress}
            </a>
          </li>
          <li>
            Your DAO has been created at{" "}
            <a
              className="underline font-bold"
              target="_blank"
              href={`${explorerUrl}/address/${governorAddress}`}
              rel="noreferrer"
            >
              {governorAddress}
            </a>
          </li>
        </ul>
      ),
      variant: "default",
    });
    const url = await createTallyDao(
      values.governor.name,
      tokenAddress,
      governorAddress,
      chain.id,
      blockNumber,
      login,
    );
    setRedirectUrl(url);
  }

  useEffect(() => {
    if (redirectUrl) {
      window.open(redirectUrl, "_blank");
    }
  }, [redirectUrl]);

  const formParams: FormParams = [
    {
      title: "Profile Info",
      description:
        "This is the info that will be displayed on the DAO's profile.",
      fields: [
        {
          name: "governor.name",
          label: "DAO Name",
          description:
            "This is your public name visible to others.This is your public name visible to others.",
          type: "text",
          placeholder: "e.g. One Piece",
        },
      ],
    },
    {
      title: "Token parameters",
      description:
        "These settings will determine the name and symbol of the token that will be created for your organization. Add members to define the initial distribution of this token.",
      fields: [
        {
          name: "token.name",
          label: "Token Name",
          description: "The name of the token.",
          type: "text",
          placeholder: "e.g. OnePiece",
        },
        {
          name: "token.symbol",
          label: "Token Symbol",
          description: "The symbol of the token.",
          type: "text",
          placeholder: "e.g. ONE",
        },
        {
          name: "token.tokenholders",
          label: "Token Holders",
          description:
            "Add members to define the initial distribution of this token.",
          type: "multifield",
          fields: [
            {
              name: "address",
              type: "address",
              label: "Address",
              description: "The address of the tokenholder.",
              placeholder: "0x1234567890abcdef1234567890abcdef12345678",
            },
            {
              name: "amount",
              type: "number",
              label: "Amount",
              description:
                "The amount of tokens to be distributed to the address.",
              placeholder: "1000",
              className: "w-1/4",
            },
          ],
          footer: [
            "Total",
            (formValues: any) =>
              formValues.reduce(
                (acc: number, current: any) =>
                  acc + Number(current.amount || 0),
                0,
              ),
          ],
        },
      ],
    },
    {
      title: "Voting parameters",
      description:
        "These settings will determine the voting parameters for your organization.",
      fields: [
        {
          name: "governor.quorumNumerator",
          label: "Minimum quorum",
          description:
            "The minimum percentage of votes required to pass a proposal.",
          type: "number",
          placeholder: "e.g. 4",
        },
        {
          name: "governor.votingDelay",
          label: "Voting Delay",
          description: "The delay before voting starts.",
          type: "number",
          placeholder: "e.g. 1",
        },
        {
          name: "governor.votingPeriod",
          label: "Voting Period",
          description: "The duration of the voting period.",
          type: "number",
          placeholder: "e.g. 5",
        },
        {
          name: "timelock.minDelay",
          label: "Timelock delay",
          description:
            "The delay before the proposal can be executed.The delay before the proposal can be executed.",
          type: "number",
          placeholder: "e.g. 1",
        },
      ],
    },
  ];

  return (
    <Autoform
      formParams={formParams}
      onSubmit={onSubmit}
      FormLayout={FormLayout}
    />
  );
}

function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-xl mx-auto px-3 py-10">
      <div className="mb-6">
        <h2 className="font-header text-3xl font-bold mb-2">
          Create your organization
        </h2>
        <p className="text-gray-700 mb-6">
          This form creates an OpenZeppelin Token and Governor, and registers
          the DAO on Tally for easy management.
        </p>
      </div>
      {children}
      <div className="flex justify-center">
        <Button
          type="submit"
          className="py-3 px-6 rounded-md w-full md:w-auto"
          size="xl"
        >
          Create DAO
        </Button>
      </div>
    </div>
  );
}

export default LaunchPage;
