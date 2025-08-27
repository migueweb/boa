import z from "zod"

const createEntity = z.object({
    company_id: z.int(),
    plural_name: z.string().max(100),
    single_name: z.string().max(100),
})

export default createEntity