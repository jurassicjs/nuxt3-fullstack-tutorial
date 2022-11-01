import { sanitizeUserForFrontend } from '~~/server/services/userService';
import bcrypt from 'bcrypt'
import { getUserByEmail } from '~/server/database/repositories/userRespository';
import { sendError, H3Event } from "h3"
import { makeSession } from '~~/server/services/sessionService';

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  const usernameOrEmail: string = body.usernameOrEmail
  const password: string = body.password

  const user = await getUserByEmail(usernameOrEmail)

  if (user === null) {
    sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthenticated' }))
  }

  const isPasswordCorrect = bcrypt.compare(password, user.password)

  if (!isPasswordCorrect) {
    sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthenticated' }))
  }


  await makeSession(user, event)

  return sanitizeUserForFrontend(user)
})
