'use client'
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { optimism, celo, mainnet } from 'wagmi/chains'
import { SITE_NAME } from './site'
import { createConfig, http } from 'wagmi';
import { createPublicClient } from 'viem';


export const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''
if (!WALLETCONNECT_PROJECT_ID) {
  console.warn('You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable')
}

export const WALLETCONNECT_CONFIG = getDefaultConfig({
  appName: SITE_NAME,
  projectId: WALLETCONNECT_PROJECT_ID || 'dummy',
  chains: [optimism, celo],
  ssr: true,
})

export const mainnetConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})

export const publicClient = createPublicClient({chain: mainnet, transport: http()}) // Use this to get ENS addresses
