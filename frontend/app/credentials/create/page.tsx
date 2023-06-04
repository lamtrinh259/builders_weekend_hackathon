import Link from "next/link"

import CreateCredentialFormatForm from "./form"

export default function IssuePage() {
  return (
    <div className="flex flex-col max-w-[980px] gap-2">
      <h1 className="text-xl font-bold leading-tight tracking-tighter md:text-2xl">
        Create a credential format <br className="hidden sm:inline" />
      </h1>
      <p className="max-w-[540px] text-muted-foreground">
        Admin of the DAO can create a credential format here. Input the name of
        the field and the type of the field.
      </p>
      <p className="max-w-[540px] text-muted-foreground">
        At this moment, we do not yet support dynamic format for credentials.
        The following format is for{" "}
        <strong className="text-foreground">DAO Member Credentials</strong>
      </p>
      <p className="max-w-[540px] text-muted-foreground">
        You can confirm your result in the JSON format below. The field names
        will be automatically converted to snake_case.
      </p>
      <h1 className="underline underline-offset-2 text-xl font-bold leading-tight tracking-tighter md:text-2xl">
        DAO Member Credentials
      </h1>
      <CreateCredentialFormatForm />
    </div>
  )
}
