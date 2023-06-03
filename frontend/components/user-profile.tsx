"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

export function UserProfile() {
  return <ConnectButton accountStatus="full" chainStatus="icon" />
}
