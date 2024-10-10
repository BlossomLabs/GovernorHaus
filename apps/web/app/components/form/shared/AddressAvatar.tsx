import { mainnetConfig } from "@/utils/web3";
import { cn } from "@repo/ui/lib/utils";
import makeBlockie from "ethereum-blockies-base64";
import { useMemo } from "react";
import { isAddress } from "viem";
import { normalize } from "viem/ens";
import { useEnsAddress, useEnsAvatar } from "wagmi";

const transparentPixel =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function AddressAvatar({ addressOrEns }: { addressOrEns: string }) {
  const isEnsName = addressOrEns.endsWith(".eth");
  let normalizedName: string;
  try {
    normalizedName = isEnsName ? normalize(addressOrEns) : addressOrEns;
  } catch (error) {
    normalizedName = addressOrEns;
  }
  const { data: ensAddress } = useEnsAddress({
    name: normalizedName,
    chainId: 1,
    query: { enabled: isEnsName },
    config: mainnetConfig,
  });
  const { data: ensAvatar, isLoading } = useEnsAvatar({
    name: normalizedName,
    chainId: 1,
    query: { enabled: isEnsName },
    config: mainnetConfig,
  });
  const address = ensAddress ?? addressOrEns;
  const src = useMemo(() => {
    if (isLoading) return transparentPixel;
    if (ensAvatar) return ensAvatar;
    if (!isLoading && isAddress(address)) return makeBlockie(address);
    return transparentPixel;
  }, [ensAvatar, address, isLoading]);

  return (
    <img
      src={src}
      alt=""
      width={20}
      height={20}
      className={cn(
        "rounded bg-gray-300",
        isLoading ? "animate-pulse duration-200" : "",
      )}
    />
  );
}

export default AddressAvatar;
