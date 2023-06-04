import Link from "next/link"

import CreateCredentialFormatForm from "./form"

export default function IssuePage() {
  return (
    <div className="flex flex-col max-w-[980px] gap-2">
      <h1 className="text-xl font-bold leading-tight tracking-tighter md:text-2xl">
        Create a credential format <br className="hidden sm:inline" />
      </h1>
      <p className="max-w-[700px] text-muted-foreground">
        Admin of the DAO can create a credential format here. Input the name of
        the field and the type of the field.
      </p>
      <CreateCredentialFormatForm />
    </div>
  )
}
