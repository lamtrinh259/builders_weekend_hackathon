"use server"

import * as z from "zod"

export const formSchema = z.object({
  name: z.string().nonempty(),
  age: z.number().int().positive(),
  hasDAONFT: z.boolean(),
})

export async function submitAction(values: z.infer<typeof formSchema>) {
  console.log(values)
  return true
}
