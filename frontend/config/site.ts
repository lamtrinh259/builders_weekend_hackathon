import { BadgeCheck, FilePlus, Forward, Pencil } from "lucide-react"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "DCHero DAO Tool",
  description: "A website for the Builder's Weekend June 2023",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  sideNav: [
    {
      label: "Create a credential format",
      href: "/credentials/create",
      icon: FilePlus,
      adminOnly: true,
    },
    {
      label: "Issue a credential",
      href: "/credentials/issue",
      icon: Pencil,
      adminOnly: true,
    },
    {
      label: "Proof request",
      href: "/credentials/proof",
      icon: Forward,
      adminOnly: false,
    },
    {
      label: "Verify credential",
      href: "/credentials/verify",
      icon: BadgeCheck,
      adminOnly: false,
    },
  ],
}
