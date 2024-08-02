'use client'


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { State, WagmiProvider } from 'wagmi'
import { WALLETCONNECT_CONFIG } from '@/utils/web3'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

interface Props extends PropsWithChildren {
  initialState?: State
}

const queryClient = new QueryClient()

export function Web3Provider(props: Props) {
  return (
    <>
      <WagmiProvider config={WALLETCONNECT_CONFIG} initialState={props.initialState}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>{props.children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}