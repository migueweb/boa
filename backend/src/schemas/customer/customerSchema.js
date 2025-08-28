import z from "zod"

const createCustomer = z.object({
    company_id: z.int(),
    name: z.string().max(200),
    phone: z.number(),
    email: z.email(),
    document: z.string().min(6).max(10)
})

export default createCustomer