import { z } from "zod"

export const formSchema = z.object({
  name: z.string().nonempty(),
  age: z.number().int().positive(),
  hasDAONFT: z.boolean(),
})
