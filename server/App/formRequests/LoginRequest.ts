import { z, parseBodyAs, } from "@sidebase/nuxt-parse"
import { H3Event } from "h3"

const bodySchema = z.object({
  usernameOrEmail: z.string({
    required_error: 'username or email required',
  })
    .min(1, { message: 'username or email required' }),
  password: z.string({
    required_error: 'password required',
  })
    .min(8, { message: 'password must be at least 8 characters' })
})

export default async function loginRequest(event: H3Event) {
  return await parseBodyAs(event, bodySchema)
}