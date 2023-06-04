import Link from "next/link"
import { Lock } from "lucide-react"

import { SideItem } from "@/types/nav"
import { cn } from "@/lib/utils"

interface SideItems {
  items: SideItem[]
}

export function SideNav({ items }: SideItems) {
  const sections = items.map((item) => (
    <Link
      key={item.label}
      href={item.href}
      className={cn([
        "text-sm flex flex-row p-2 gap-2 items-center rounded-full sm:rounded-md transition-colors",
        item.adminOnly
          ? "text-destructive-foreground bg-destructive hover:bg-accent hover:text-accent-foreground"
          : "text-muted-foreground hover:bg-muted-foreground hover:text-muted",
      ])}
    >
      <item.icon className="w-4 h-4" />
      <span className="hidden sm:block">{item.label}</span>

      <Lock
        className={cn([
          "w-4 h-4 ml-auto",
          item.adminOnly
            ? "text-destructive-foreground hidden sm:block"
            : "hidden",
        ])}
      />
    </Link>
  ))

  return <div className="p-1 flex flex-col gap-1">{sections}</div>
}
