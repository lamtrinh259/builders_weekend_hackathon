"use client"

import { useState } from "react"
import { contractAddresses } from "@/contractAddresses"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAccount, useContractRead, useContractWrite, useQuery } from "wagmi"
import { TypeOf, z } from "zod"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const fieldTypes = ["string", "number", "boolean", "address"] as const
const createCredFormSchema = z.array(
  z.object({
    fieldKey: z.string().nonempty(),
    fieldName: z.string().nonempty(),
    fieldType: z.enum(fieldTypes),
  })
)

export default function CreateCredentialFormatForm() {
  const { isConnected, address } = useAccount()

  const [formValues, setFormValues] = useState<
    z.infer<typeof createCredFormSchema>
  >([
    {
      fieldKey: "wallet_address",
      fieldName: "Wallet Address",
      fieldType: "address",
    },
    {
      fieldKey: "name",
      fieldName: "Name",
      fieldType: "string",
    },
    {
      fieldKey: "age",
      fieldName: "Age",
      fieldType: "number",
    },
    {
      fieldKey: "has_dao_nft",
      fieldName: "Has DAO NFT",
      fieldType: "boolean",
    },
  ])

  async function onSubmit() {
    if (!isConnected) {
      alert("This will generate a credential format on the chain!")
      return
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <form
        className="space-y-2"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        {formValues.map((field, key) => (
          <div className="flex gap-1" key={key}>
            <Input
              value={field.fieldName}
              onChange={(e) => {
                const snake_case_value = e.target.value
                  .replace(/\s+/g, "_")
                  .toLowerCase()
                formValues[key].fieldKey = snake_case_value
                formValues[key].fieldName = e.target.value
              }}
              placeholder="Field Name"
              required
            />
            <Select
              value={field.fieldType}
              onValueChange={(value) => {
                formValues[key].fieldType = value as TypeOf<
                  typeof createCredFormSchema
                >[number]["fieldType"]
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {fieldTypes.map((type, key) => (
                  <SelectItem key={key} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
        <Button type="submit" onClick={onSubmit}>
          Publish Credential Format
        </Button>
      </form>
      <div className="font-mono-border-rounded-md">
        <pre className="p-2 bg-gray-900 text-white">
          {JSON.stringify(formValues, null, 2)}
        </pre>
      </div>
    </div>
  )
}
