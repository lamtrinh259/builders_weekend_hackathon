"use server"

import { z } from "zod"

import { issueCredSchema } from "@/types/formSchema"

export async function submitAction(values: z.infer<typeof issueCredSchema>) {
  console.log(values)
  return true
}
