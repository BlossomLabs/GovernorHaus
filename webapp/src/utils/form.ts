import { z } from "zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export type Form = UseFormReturn<z.infer<typeof formSchema>>
export type FormValues = z.infer<typeof formSchema>
export type FieldName = 
  | "token.symbol"
  | "token.name"
  | `token.tokenholders.${number}.amount`
  | `token.tokenholders.${number}.address`
  | "timelock.minDelay"
  | "governor.name"
  | "governor.votingDelay"
  | "governor.votingPeriod"
  | "governor.quorumNumerator"
  | "governor.proposalThreshold"
  | "governor.voteExtension"

export const formSchema = z.object({
  token: z.object({
    name: z.string().min(3).max(20), // Token name
    symbol: z.string().min(2).max(5), // Token symbol
    tokenholders: z.array(z.object({ address: z.string().length(42), amount: z.number().min(1) })).min(1), // Tokenholders
  }),
  timelock: z.object({
    minDelay: z.number().min(0), // Timelock minimum delay
  }),
  governor: z.object({
    name: z.string().min(3).max(20), // DAO name
    votingDelay: z.number().min(0).max(100), // Voting delay
    votingPeriod: z.number().min(0).max(100), // Voting period
    quorumNumerator: z.number().min(0).max(100), // Quorum numerator
    proposalThreshold: z.number().min(0).max(100), // Proposal threshold
    voteExtension: z.number().min(0).max(100), // Vote extension
  }),
})

export function useCreateDaoForm() {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: {
        name: "",
        symbol: "",
        tokenholders: [{ address: "", amount: 1 }],
      },
      timelock: {
        minDelay: 1, // 1 day
      },
      governor: {
        name: "",
        votingDelay: 1, // 1 day
        votingPeriod: 5, // 5 days
        quorumNumerator: 4, // 4%
        proposalThreshold: 1, // # of tokens
        voteExtension: 1, // 1 day
      },
    },
  })
}