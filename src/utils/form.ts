import { z } from "zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export type Form = UseFormReturn<z.infer<typeof formSchema>>

export const formSchema = z.object({
  daoname: z.string().min(3).max(20),
//   tokenname: z.string().min(3).max(20),
//   tokensymbol: z.string().min(2).max(5),
//   tokenholders: z.array(z.string()).min(1),
//   tokenholdersamount: z.array(z.number()).min(1),
//   minquorum: z.number().min(0).max(100),
//   votingdelay: z.number().min(0).max(100),
//   votingperiod: z.number().min(0).max(100),
//   timelockdelay: z.number().min(0).max(100),
})

export function useCreateDaoForm() {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      daoname: "",
    //   tokenname: "",
    //   tokensymbol: "",
    //   tokenholders: [],
    //   tokenholdersamount: [],
    //   minquorum: 4,
    //   votingdelay: 1,
    //   votingperiod: 5,
    //   timelockdelay: 1
    },
  })
}