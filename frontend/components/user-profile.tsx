"use client"

import { useEffect } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useMedia } from "react-use"

export function UserProfile() {
  // trigger when the screen size is more than xs
  const isLargerThanXS = useMedia("(min-width: 480px)", true)

  // debug
  useEffect(() => {
    console.log("isLargerThanXS", isLargerThanXS)
  }, [isLargerThanXS])
  return (
    <ConnectButton
      accountStatus={isLargerThanXS ? "full" : "avatar"}
      chainStatus={isLargerThanXS ? "icon" : "none"}
    />
  )
}
