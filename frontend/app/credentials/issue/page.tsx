import Link from "next/link"

import IssueCredentialForm from "./form"

export default function IssuePage() {
  return (
    <div className="flex max-w-[980px] flex-col items-start gap-2">
      <h1 className="text-xl font-bold leading-tight tracking-tighter md:text-2xl">
        Issue a credential <br className="hidden sm:inline" />
      </h1>
      <IssueCredentialForm />
    </div>
  )
}
