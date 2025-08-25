import z from "zod"

const createUser = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(8).max(22),
    company_id: z.number()
})

export default createUser