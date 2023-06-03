"use client"

import * as React from "react"
import {
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit"
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets"
import { configureChains, createConfig, WagmiConfig, type Chain } from "wagmi"
import { goerli, localhost, sepolia } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

// support for shibuyatestnet
const shibuya = {
  id: 81,
  name: "Shibuya Network",
  network: "shibuya-network",
  nativeCurrency: {
    decimals: 18,
    name: "shibuya",
    symbol: "SBY",
  },
  rpcUrls: {
    default: { http: ["https://evm.shibuya.astar.network"] },
    public: { http: ["https://evm.shibuya.astar.network"] },
  },
  blockExplorers: {
    default: {
      name: "Shibuya Explorer",
      url: "https://shibuya.subscan.io",
    },
  },
  testnet: true,
} as const satisfies Chain

// support for astarlocal
const astarlocal = {
  id: 4369,
  name: "Localhost 9933",
  network: "localhost",
  nativeCurrency: {
    decimals: 18,
    name: "astar-network",
    symbol: "ASTL",
  },
  rpcUrls: {
    default: { http: ["http://localhost:9933"] },
    public: { http: ["http://localhost:9933"] },
  },
  testnet: true,
} as const satisfies Chain

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli, sepolia, localhost, shibuya, astarlocal],
  [publicProvider()]
)

const projectId = "bw23-cred-proof"

const { wallets } = getDefaultWallets({
  appName: "Builder's Weekend DAO",
  projectId,
  chains,
})

const demoAppInfo = {
  appName: "Builder's Weekend DAO",
}

const connectors = connectorsForWallets([
  // ...wallets,
  {
    groupName: "MetaMask",
    wallets: [metaMaskWallet({ projectId, chains })],
  },
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={demoAppInfo}
        theme={{
          lightMode: lightTheme(),
          darkMode: darkTheme(),
        }}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
