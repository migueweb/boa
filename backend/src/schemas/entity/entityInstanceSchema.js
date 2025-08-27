import z from "zod"

const createInstance = z.object({
    entity_id: z.int(),
    name: z.string().max(100),
    description: z.string().max(1000),
})

export default createInstance