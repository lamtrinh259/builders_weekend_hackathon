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
  const { isConnected, address } = useAccount()
  const {
    data: credentials,
    isLoading: isReading,
    refetch,
  } = useContractRead({
    account: address,
    enabled: isConnected,
    address: contractAddresses.issueCredentials,
    abi: [
      {
        inputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "int256",
            name: "age",
            type: "int256",
          },
          {
            internalType: "bool",
            name: "hasDAONFT",
            type: "bool",
          },
        ],
        name: "setCredentials",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getCredentials",
        outputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "int256",
            name: "age",
            type: "int256",
          },
          {
            internalType: "bool",
            name: "hasDAONFT",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "getCredentials",
  })

  const { writeAsync, isLoading: isWriting } = useContractWrite({
    address: contractAddresses.issueCredentials,
    abi: [
      {
        inputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "int256",
            name: "age",
            type: "int256",
          },
          {
            internalType: "bool",
            name: "hasDAONFT",
            type: "bool",
          },
        ],
        name: "setCredentials",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getCredentials",
        outputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "int256",
            name: "age",
            type: "int256",
          },
          {
            internalType: "bool",
            name: "hasDAONFT",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "setCredentials",
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
    const { hash } = await writeAsync({
      args: [values.name, ageConverted, values.hasDAONFT],
    })

    if (hash) {
      alert(hash)
    }

    await refetch()
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

      <div className="border w-72 rounded bg-grey-100 p-4">
        <h1 className="text-2xl font-bold">Credentials</h1>
        <div className="flex flex-col gap-2">
          {isReading ? (
            <p>Loading...</p>
          ) : credentials ? (
            <>
              <p>Name: {credentials[0]}</p>
              <p>Age: {credentials[1].toString()}</p>
              <p>Has DAO NFT: {credentials[2] ? "Yes" : "No"}</p>
            </>
          ) : (
            <p>No credentials found</p>
          )}
        </div>
        <Button onClick={() => refetch()}>Refresh</Button>
      </div>
    </div>
  )
}
