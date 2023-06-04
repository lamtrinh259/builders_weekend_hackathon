"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { contractAddresses } from "@/contractAddresses"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAccount, useContractRead, useContractWrite } from "wagmi"
import { number, z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface dropDownProps {
  cred: string
  setCred: Dispatch<SetStateAction<string>>
  credChoise?: string[]
}

const proofReqSchema = z.object({
  name: z.string().nonempty(),
  over18: z.boolean(),
  hasDAONFT: z.boolean(),
})

export default function ProofRequestForm() {
  const { isConnected, address } = useAccount()
  const [cred, setCred] = useState("")
  const credController: dropDownProps = { cred, setCred }

  const form = useForm<z.infer<typeof proofReqSchema>>({
    resolver: zodResolver(proofReqSchema),
  })

  async function onSubmit(values: z.infer<typeof proofReqSchema>) {
    if (!isConnected) {
      alert("Please connect your wallet")
      return
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <div>Select a credential format</div>
        <Select
          defaultValue="dao_member"
          value={cred}
          onValueChange={(value) => {
            setCred(value)
          }}
        >
          <SelectTrigger>
            <SelectValue
              defaultChecked={true}
              placeholder="Select a credential format"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dao_member">DAO Member Credential</SelectItem>
          </SelectContent>
        </Select>
        {cred.length > 0 && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => onSubmit(data))}
              className="space-y-4"
            >
              <div className="space-y-2"></div>
              <FormField
                control={form.control}
                name="name"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="over18"
                defaultValue={false}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        name={field.name}
                        ref={field.ref}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Should age be over 18?</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasDAONFT"
                defaultValue={false}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        name={field.name}
                        ref={field.ref}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Should DAO NFT be required</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <Button type="submit">Generate proof request</Button> */}
            </form>
          </Form>
        )}

        <div className="flex flex-col gap-2 font-mono-border-rounded-md">
          <h2 className="text-lg font-bold">Proof request</h2>
          <pre className="p-2 bg-gray-900 text-white">
            {JSON.stringify(cred.length > 0 ? form.watch() : {}, null, 2)}
          </pre>
          {/* for copying */}
          {cred && (
            <div className="flex flex-row justify-end">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify(cred.length > 0 ? form.watch() : {}, null, 2)
                  )
                }}
              >
                Copy
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// async function getCredOptions() {
//   let credOptions: string[] = [];
//   const [
//     data: credentials,
//     isLoading: isReading,
//     refetch,
//   ] = useContractRead({
//     address: contractAddresses.getCredentials,
//     abi: [],
//   })

//   return (credOptions);
// }

// async function onSubmit(values: z.infer<typeof issueCredSchema>) {
//   if (!isConnected) {
//     alert("Please connect your wallet")
//     return
//   }
//   // convert number to bigint
//   const ageConverted = BigInt(values.age)
//   const { hash } = await writeAsync({
//     args: [values.name, ageConverted, values.hasDAONFT],
//   })

//   if (hash) {
//     alert(hash)
//   }

//   await refetch()
// }
