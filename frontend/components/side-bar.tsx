import { SideNav } from "./side-nav"
import { siteConfig } from "@/config/site"

export function SideBar() {
  return (
    <>
      <div className="">
        <SideNav items={siteConfig.sideNav}/>
      </div>
    </>
  )
}
