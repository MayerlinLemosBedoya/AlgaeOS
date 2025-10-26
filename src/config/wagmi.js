import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { baseSepolia } from 'wagmi/chains'

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || ''

export const config = getDefaultConfig({
  appName: 'AlgaeOS',
  projectId,
  chains: [baseSepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
})
