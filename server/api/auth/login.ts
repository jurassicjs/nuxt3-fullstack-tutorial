import { sanitizeUserForFrontend } from '~~/server/services/userService';
import bcrypt from 'bcrypt'
import { getUserByEmail } from '~/server/database/repositories/userRespository';
import { CompatibilityEvent, sendError } from "h3"
import { makeSession } from '~~/server/services/sessionService';

export default async (event: CompatibilityEvent) => {
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
}
