import { sanitizeUserForFrontend } from '~/server/services/userService';
import bcrypt from 'bcrypt'
import { getUserByEmail } from '~/server/database/repositories/userRespository';
import { sendError, H3Event } from "h3"
import { makeSession } from '~/server/services/sessionService';
import { ZodError } from "zod"
import { getMappedError } from '~/server/helpers/errorMapper';
import loginRequest from '~/server/App/formRequests/LoginRequest';
import sendZodErrorResponse from '~/server/App/responses/ZodErrorsResponse';
import sendDefaultErrorResponse from '~/server/App/responses/DefaultErrorsResponse';

const standardAuthError = getMappedError('Authentication', 'Invalid Credentials')

export default eventHandler(async (event: H3Event) => {

  try {
    const data = await loginRequest(event)
    const user = await getUserByEmail(data.usernameOrEmail)

    if (user === null) {
      return sendError(event, createError({ statusCode: 401, data: standardAuthError }))
    }

    if (user.password == undefined) {
      return sendError(event, createError({ statusCode: 401, data: standardAuthError }))
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.password)

    if (!isPasswordCorrect) {
      sendError(event, createError({ statusCode: 401, data: standardAuthError }))
    }

    await makeSession(user, event)
    return sanitizeUserForFrontend(user)
  } catch (error: any) {

    if (error.data instanceof ZodError) {
      return await sendZodErrorResponse(event, error.data)
    }

    return await sendDefaultErrorResponse(event, 'Unauthenticated', error)
  }
})
