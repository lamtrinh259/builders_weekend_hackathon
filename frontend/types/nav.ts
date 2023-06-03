import { LucideIcon } from "lucide-react"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export interface SideItem {
  label: string
  href: string
  icon: LucideIcon
}
