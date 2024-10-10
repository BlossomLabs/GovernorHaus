import { createSiweMessage } from "viem/siwe";
import { useAccount, useSignMessage } from "wagmi";

const TALLY_API_KEY = import.meta.env.VITE_TALLY_API_KEY;
if (!TALLY_API_KEY) {
  console.warn("You need to provide a VITE_TALLY_API_KEY env variable");
}

async function fetchTallyNonce(address: `0x${string}`, chainId: number) {
  if (!TALLY_API_KEY) {
    throw new Error("API key is not defined");
  }
  try {
    const response = await fetch("https://api.tally.xyz/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": TALLY_API_KEY,
      },
      body: JSON.stringify({
        query:
          "\n    query Nonce {\n  nonce {\n    expirationTime\n    issuedAt\n    nonce\n    nonceToken\n  }\n}\n    ",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    const { nonce, issuedAt, expirationTime, nonceToken } = data.nonce;
    let siweMessage = createSiweMessage({
      domain: window.location.hostname,
      address,
      statement:
        "Sign in with Ethereum to Tally and agree to the Terms of Service at terms.tally.xyz",
      uri: "https://www.tally.xyz/",
      version: "1",
      chainId,
      nonce,
    });
    // remove last line (bad Issued At)
    siweMessage = siweMessage.split("\n").slice(0, -1).join("\n");
    siweMessage += `\nIssued At: ${issuedAt}\nExpiration Time: ${expirationTime}`;
    return [siweMessage, nonceToken];
  } catch (error) {
    console.error("Error posting to external API:", error);
    throw error;
  }
}

async function tallyLogin(
  siweMessage: string,
  signature: string,
  nonceToken: string,
) {
  if (!TALLY_API_KEY) {
    throw new Error("API key is not defined");
  }
  try {
    const response = await fetch("https://api.tally.xyz/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": TALLY_API_KEY,
        nonce: nonceToken,
      },
      body: JSON.stringify({
        query:
          "\n    mutation Login($message: String!, $signature: String!) {\n  login(message: $message, signature: $signature)\n}\n    ",
        variables: {
          message: siweMessage,
          signature: signature,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    return data.login;
  } catch (error) {
    console.error("Error posting to external API:", error);
    throw error;
  }
}

export function useSignInWithTally() {
  const { address, chainId } = useAccount();
  const { signMessage } = useSignMessage();
  async function sign(message: string) {
    return new Promise<string>((resolve, reject) => {
      signMessage(
        { message },
        {
          onSuccess: (signature) => {
            resolve(signature);
          },
          onError: (error) => {
            reject(error);
          },
        },
      );
    });
  }
  async function signIn() {
    if (!address || !chainId) {
      throw new Error("Address or chainId is not defined");
    }
    const [siweMessage, nonceToken] = await fetchTallyNonce(address, chainId);
    const signature = await sign(siweMessage);
    return tallyLogin(siweMessage, signature, nonceToken);
  }
  return { signIn };
}

export async function createTallyDao(
  daoName: string,
  tokenAddress: `0x${string}`,
  governorAddress: `0x${string}`,
  chainId: number,
  txBlock: number,
  login: string,
) {
  if (!TALLY_API_KEY) {
    throw new Error("API key is not defined");
  }
  try {
    const response = await fetch("https://api.tally.xyz/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": TALLY_API_KEY,
        Authorization: `Bearer ${login}`,
      },
      body: JSON.stringify({
        query:
          "\n    mutation CreateDAO($input: CreateDAOInput!) {\n  createDAO(input: $input) {\n    id\n    slug\n  }\n}\n    ",
        variables: {
          input: {
            governors: [
              {
                id: `eip155:${chainId}:${governorAddress}`,
                type: "openzeppelingovernor",
                startBlock: txBlock,
                token: {
                  id: `eip155:${chainId}/erc20:${tokenAddress}`,
                  startBlock: txBlock,
                },
              },
            ],
            name: daoName,
            description: "",
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const res = await response.json();
    if (res.error) {
      throw new Error(res.error);
    }
    return `https://www.tally.xyz/gov/${res.data.createDAO.slug}`;
  } catch (error) {
    console.error("Error posting to external API:", error);
    throw error;
  }
}
