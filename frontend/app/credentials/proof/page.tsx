import ProofForm from "./form"

export default function ProofPage() {
  return (
    <div className="flex max-w-[980px] flex-col items-start gap-2">
      <h1 className="text-xl font-bold leading-tight tracking-tighter md:text-2xl">
        Generate a proof request <br className="hidden sm:inline" />
      </h1>
      <p className="max-w-[540px] text-muted-foreground">
        User can generate a proof request here.
      </p>
      <p className="max-w-[540px] text-muted-foreground">
        Since we didn't implement dynamic credential format, you can only
        generate a proof request for only DAO Member Credential.
      </p>
      <p className="max-w-[540px] text-muted-foreground">
        You can confirm your result in the JSON format below.
      </p>
      <ProofForm />
    </div>
  )
}
