"use server"

import { z } from "zod"

import { formSchema } from "@/types/formSchema"

export async function submitAction(values: z.infer<typeof formSchema>) {
  console.log(values)
  return true
}
