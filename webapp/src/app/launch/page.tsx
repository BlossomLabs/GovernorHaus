'use client'
import { useWriteContract, useAccount } from "wagmi"
import { parseAbi, parseUnits } from "viem"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import ClaimNameCard from "../../components/form/ClaimNameCard"
import { useCreateDaoForm } from "../../utils/form"
import TokenParametersCard from "@/components/form/TokenParametersCard"
import VotingParametersCard from "@/components/form/VotingParametersCard"
import { baseSepolia } from "viem/chains"
import { useToast } from "@/components/ui/use-toast"
import { ONE_DAY } from "@/utils/constants"
import type { FormValues } from "@/utils/form"

function LaunchPage() {
    const { writeContract } = useWriteContract()
    const form = useCreateDaoForm()
    const { address, chain } = useAccount()
    const { toast } = useToast()

    function onSubmit(values: FormValues) {
        console.log(values);
        if (!address) {
            toast({
                title: "Please connect your wallet",
                description: "You need to connect your wallet to create a DAO",
                variant: "destructive"
            });
            return;
        }
        if (chain?.id !== baseSepolia.id) {
            toast({
                title: "Please connect to Base Sepolia",
                description: "You need to connect to Base Sepolia to create a DAO",
                variant: "destructive"
            });
            return;
        }
        writeContract({
            address: "0x1a184eB4a8299d6CDDc95C34b8aB0916E74c25E3",
            abi: parseAbi([
                "struct DeploymentConfig { string tokenName; string tokenSymbol; uint256 minDelay; string governorName; uint48 votingDelay; uint32 votingPeriod; uint256 proposalThreshold; uint256 quorumNumerator; uint48 voteExtension; address[] firstMintTo; uint256[] firstMintAmount; }",
                "function createDao(DeploymentConfig memory config)"
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
                    proposalThreshold: parseUnits(String(values.governor.proposalThreshold), 18),
                    quorumNumerator: BigInt(values.governor.quorumNumerator),
                    voteExtension: values.governor.voteExtension * Number(ONE_DAY),
                    firstMintTo: values.token.tokenholders.map((holder: any) => holder.address),
                    firstMintAmount: values.token.tokenholders.map((holder: any) => parseUnits(String(holder.amount), 18)),
                }
            ],
        }, {
            onSuccess: (res) => {
                toast({
                    title: "DAO created",
                    description: "Your DAO has been created",
                    variant: "default"
                });
                console.log(res);
            },
            onError: (err) => {
                toast({
                    title: "Error",
                    description: "There was an error creating your DAO",
                    variant: "destructive"
                });
                console.error(err);
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="hidden">{JSON.stringify(form.formState.errors)}</div> {/* FIXME: If this is removed, the form will not re-render the errors */}
                <div className="p-10 rounded-md">
                    <h2 className="text-3xl font-bold mb-2">Create your organization</h2>
                    <p className="text-gray-700 mb-6">
                        Name and define your DAO parameters so grantees know they are joining the right organization.
                    </p>
                    <ClaimNameCard form={form} />
                    <TokenParametersCard form={form} />
                    <VotingParametersCard form={form} />
                    <Button type="submit" className="bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600">
                        Create DAO
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default LaunchPage