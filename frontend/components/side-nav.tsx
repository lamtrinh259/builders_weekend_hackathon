import { SideItem } from "@/types/nav"
import Link from "next/link"

interface SideItems {
  items: SideItem[]
}

export function SideNav({items}: SideItems) {
  const sections = items.map((item) => (
    <>
    <div className="flex flex-row p-5 border-t-2 border-b-2 align-center">
      <div className="text-[#00CCC0]">
        <item.icon className="mr-3 h-full"/>
      </div>
      <p className="font-bold font-serif">
        <Link href={item.href}>{item.label}</Link>
      </p>
    </div>
    </>
  ))

  return (
    <>
      <div className="">
        {sections}
      </div>
    </>
  )
}
