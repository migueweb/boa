import z from "zod"

const createCompany= z.object({
    nit: z.string().min(9).max(99),
    name: z.string().max(199),
})

export default createCompany