'use client'
import { useWriteContract, useAccount, usePublicClient } from "wagmi"
import { parseAbi, parseAbiItem, parseEventLogs, parseUnits } from "viem"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import ClaimNameCard from "../../components/form/ClaimNameCard"
import { useCreateDaoForm } from "../../utils/form"
import TokenParametersCard from "@/components/form/TokenParametersCard"
import VotingParametersCard from "@/components/form/VotingParametersCard"
import { optimism, celo } from "viem/chains"
import { useToast } from "@/components/ui/use-toast"
import { ONE_DAY } from "@/utils/constants"
import type { FormValues } from "@/utils/form"

function LaunchPage() {
    const { writeContract } = useWriteContract()
    const form = useCreateDaoForm()
    const { address, chain } = useAccount()
    const { toast } = useToast()
    const publicClient = usePublicClient()

    async function processTx(hash: `0x${string}`) {
        if (!publicClient) return

        const receipt = await publicClient.waitForTransactionReceipt({
            hash
        })

        const logs = parseEventLogs({
            abi: [parseAbiItem("event ContractDeployed(string contractType, address contractAddress)")],
            logs: receipt.logs,
        })

        // Type guard to check if log.args has the expected shape
        function isContractDeployedArgs(args: any): args is { contractType: string; contractAddress: `0x${string}` } {
            return args && typeof args.contractType === 'string' && typeof args.contractAddress === 'string';
        }

        const {Token, Governor} = logs
            .filter(log => log.eventName === 'ContractDeployed')
            .map(log => log.args)
            .filter(isContractDeployedArgs)
            .reduce((acc: { [key: string]: `0x${string}` }, log) => {
                acc[log.contractType] = log.contractAddress
                return acc
            }, {})

        return [Token, Governor]
    }

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

        const contractAddress = chain?.id === celo.id ? `0x40Efd1E776C0D55c251b4B3dE9c5942A4255Bec5` :
            chain?.id === optimism.id ? `0x3d8ec641793c3f5bde837bda7772ec6a77d1da32` : undefined

        if (!contractAddress) {
            toast({
                title: "Please connect to the correct network",
                description: "You need to connect to the correct network to create a DAO",
                variant: "destructive"
            });
            return;
        }
        writeContract({
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
                    proposalThreshold: parseUnits(String(values.governor.proposalThreshold), 18),
                    quorumNumerator: BigInt(values.governor.quorumNumerator),
                    voteExtension: values.governor.voteExtension * Number(ONE_DAY),
                    firstMintTo: values.token.tokenholders.map((holder: any) => holder.address),
                    firstMintAmount: values.token.tokenholders.map((holder: any) => parseUnits(String(holder.amount), 18)),
                }
            ],
        }, {
            onSuccess: (res) => {
                processTx(res).then((result) => {
                    if (!result) {
                        toast({
                            title: "Error",
                            description: "Failed to process transaction logs",
                            variant: "destructive"
                        });
                        return;
                    }
                    const [Token, Governor] = result;
                    toast({
                        title: "DAO created",
                        description: <ul>
                            <li>Your Token has been created at <a className="underline font-bold" target="_blank" href={`${chain?.blockExplorers?.default.url}/token/${Token}`}>{Token}</a></li>
                            <li>Your DAO has been created at <a className="underline font-bold" target="_blank" href={`${chain?.blockExplorers?.default.url}/address/${Governor}`}>{Governor}</a></li>
                        </ul>,
                        variant: "default"

                    });
                    console.log(res);
                })
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
                    <h2 className="font-header text-3xl font-bold mb-2">Create your organization</h2>
                    <p className="text-gray-700 mb-6">
                        Name and define your DAO parameters so grantees know they are joining the right organization.
                    </p>
                    <ClaimNameCard form={form} />
                    <TokenParametersCard form={form} />
                    <VotingParametersCard form={form} />
                    <Button type="submit" className="py-3 px-6 rounded-md">
                        Create DAO
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default LaunchPage