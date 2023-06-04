import Link from "next/link"

import IssueCredentialForm from "./form"

export default function IssuePage() {
  return (
    <div className="flex max-w-[980px] flex-col items-start gap-2">
      <h1 className="text-xl font-bold leading-tight tracking-tighter md:text-2xl">
        Issue a credential <br className="hidden sm:inline" />
      </h1>
      <p className="max-w-[540px] text-muted-foreground">
        Let's assume you already have a credential format. You can issue a
        credential here.
      </p>
      <p className="max-w-[540px] text-muted-foreground">
        Since we didn't implement dynamic credential format, you can only issue
        a credential for DAO Member Credential.
      </p>
      <p className="max-w-[540px] text-muted-foreground">
        You can confirm your result in the JSON format below.
      </p>
      <IssueCredentialForm />
    </div>
  )
}
