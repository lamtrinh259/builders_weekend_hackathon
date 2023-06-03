import Link from "next/link"

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
        "text-muted-foreground text-sm flex flex-row p-2 gap-2 items-center",
        "hover:bg-muted-foreground hover:text-muted rounded-full sm:rounded-md",
      ])}
    >
      <item.icon className="w-4 h-4" />
      <span className="hidden sm:block">{item.label}</span>
    </Link>
  ))

  return <div className="p-1 flex flex-col gap-1">{sections}</div>
}
