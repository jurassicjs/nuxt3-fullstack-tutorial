import { sanitizeUserForFrontend } from '~~/server/services/userService';
import bcrypt from 'bcrypt'
import { getUserByEmail } from '~/server/database/repositories/userRespository';
import { sendError, H3Event } from "h3"
import { makeSession } from '~~/server/services/sessionService';
import { z, parseBodyAs, } from "@sidebase/nuxt-parse"
import { ZodError } from "zod"
import { getMappedError, getMappedZodErrors } from '~~/server/helpers/errorMapper';

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

type RequestBody = z.infer<typeof bodySchema>

const standardAuthError = getMappedError('Authentication', 'Invalid Credentials')

export default eventHandler(async (event: H3Event) => {

  let body: RequestBody;
  try {
    body = await parseBodyAs(event, bodySchema)

    const user = await getUserByEmail(body.usernameOrEmail)

    if (user === null) {
      return sendError(event, createError({ statusCode: 401, data: standardAuthError }))
    }

    if (user.password == undefined) {
      return sendError(event, createError({ statusCode: 401, data: standardAuthError }))
    }

    const isPasswordCorrect = await bcrypt.compare(body.password, user.password)

    if (!isPasswordCorrect) {
      sendError(event, createError({ statusCode: 401, data: standardAuthError }))
    }

    await makeSession(user, event)
    return sanitizeUserForFrontend(user)
  } catch (error: any) {

    if (error.data instanceof ZodError) {
      const parsedErrors = getMappedZodErrors(error.data)
      return sendError(event, createError({ statusCode: 422, statusMessage: 'Unauthenticated', data: parsedErrors }))
    }

    return sendError(event, createError({ statusCode: 500, statusMessage: 'Unauthenticated', data: standardAuthError }))
  }
})
