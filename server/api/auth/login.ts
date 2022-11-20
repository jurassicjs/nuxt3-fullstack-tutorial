import bcrypt from 'bcrypt'
import { getUserByEmail } from '~/server/database/repositories/userRespository';
import { sendError, H3Event } from "h3"
import { ZodError } from "zod"
import loginRequest from '~~/server/app/formRequests/LoginRequest';
import sendDefaultErrorResponse from '~~/server/app/errors/responses/DefaultErrorsResponse';
import { getMappedError } from '~~/server/app/errors/errorMapper';
import { makeSession } from '~~/server/app/services/sessionService';
import { sanitizeUserForFrontend } from '~~/server/app/services/userService';
import sendZodErrorResponse from '~~/server/app/errors/responses/ZodErrorsResponse';

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

    return await sendDefaultErrorResponse(event, 'Unauthenticated', 401, error)
  }
})
