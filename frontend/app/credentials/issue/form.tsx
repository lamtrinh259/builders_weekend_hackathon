"use client"

import { useState } from "react"
import { contractAddresses } from "@/contractAddresses"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAccount, useContractRead, useContractWrite } from "wagmi"
import { z } from "zod"

import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const issueCredSchema = z.object({
  walletAddress: z.string().startsWith("0x"),
  name: z.string().nonempty(),
  age: z.number().int().positive(),
  hasDAONFT: z.boolean(),
})

export default function IssueCredentialForm() {
  const [useMyAddress, setUseMyAddress] = useState(true)

  const { isConnected, address } = useAccount()
  const [cred, setCred] = useState<z.infer<typeof issueCredSchema> | null>(null)

  const { writeAsync: createCredential, isLoading: isWriting } =
    useContractWrite({
      address: contractAddresses.issueCredentials,
      abi: [
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "_age",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "_hasNFT",
              type: "bool",
            },
            {
              internalType: "address",
              name: "_wallet",
              type: "address",
            },
          ],
          name: "createCredentialFormat",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
      ],
      functionName: "createCredential",
    })

  const form = useForm<z.infer<typeof issueCredSchema>>({
    resolver: zodResolver(issueCredSchema),
  })

  async function onSubmit(values: z.infer<typeof issueCredSchema>) {
    if (!isConnected) {
      alert("Please connect your wallet")
      return
    }
    // convert number to bigint
    const ageConverted = BigInt(values.age)
    const addressPayload = useMyAddress
      ? address
      : (values.walletAddress as `0x${string}` | undefined)

    if (!addressPayload) {
      return
    }

    const { hash } = await createCredential({
      args: [values.name, ageConverted, values.hasDAONFT, addressPayload],
    })

    if (hash) {
      alert(hash)
    }

    setCred(values)
  }

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => onSubmit(data))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="walletAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet Address</FormLabel>
                <FormControl>
                  <Input placeholder="0x..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="18"
                    {...form.register("age", { valueAsNumber: true })}
                  />
                </FormControl>
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
                <FormLabel>Does this user have a DAO NFT?</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isWriting}>
            Submit
          </Button>
        </form>
      </Form>

      <div className="flex flex-col gap-2 font-mono-border-rounded-md">
        <h2 className="text-lg font-bold">Credentials</h2>
        <pre className="p-2 bg-gray-900 text-white">
          {JSON.stringify(cred, null, 2)}
        </pre>
        <Button className="shrink-0" onClick={() => {}}>
          Refresh
        </Button>
      </div>
    </div>
  )
}
