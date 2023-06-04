"use client"

import {
  Form,
  FormControl,
  FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import DropBox from "./drop-down"
import {
  useAccount,
  useContractRead,
  useContractWrite,
} from "wagmi"
import { number, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { contractAddresses } from "@/contractAddresses"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export interface dropDownProps {
  cred: string,
  setCred: Dispatch<SetStateAction<string>>
  credChoise?: string[]
}

const proofReqSchema = z.object({
  name: z.string().nonempty(),
  over18: z.boolean(),
  hasDAONFT: z.boolean(),
})

export default function ProofRequestForm() {
  const { isConnected, address } = useAccount();
  const [cred, setCred] = useState("");
  const credController: dropDownProps = {cred, setCred};

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
    <div className="flex flex-col ">
      <div className="pb-20 justify-left">
        <DropBox {...credController}/>
        <div className="flex flex-row text-xl">
          <a>Chosen type of Credential :</a>
          <a>{cred}</a>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => onSubmit(data))}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
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
                <FormLabel>Do you have a DAO NFT?</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            Submit
          </Button>
        </form>
      </Form>
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
