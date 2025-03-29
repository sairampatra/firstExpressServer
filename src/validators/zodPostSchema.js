import {z} from 'zod'
export const zordPostSchema = z.object({
    caption: z.string({message:'this thein caption'}).min(1,),
})