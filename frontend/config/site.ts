import {Pencil, FilePlus, Forward, BadgeCheck} from "lucide-react"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "BW23",
  description: "A website for the Builder's Weekend June 2023",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  sideNav: [
    {
      label: "create credential format",
      href: "/create",
      icon: FilePlus,
    },
    {
      label: "issue credential",
      href: "/issue",
      icon: Pencil,
    },
    {
      label: "proof request",
      href: "/proof",
      icon: Forward,
    },
    {
      label: "verify credential",
      href: "/verify",
      icon: BadgeCheck,
    },
  ]
}
