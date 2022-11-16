import { sanitizeUserForFrontend } from '~~/server/services/userService';
import bcrypt from 'bcrypt'
import { getUserByEmail } from '~/server/database/repositories/userRespository';
import { sendError, H3Event } from "h3"
import { makeSession } from '~~/server/services/sessionService';
import { validateLogin } from '~/server/services/userService'

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  const usernameOrEmail: string = body.usernameOrEmail
  const password: string = body.password

  const data = body

  const validation = await validateLogin(data)

  if (validation.hasErrors === true) {
    const errors = JSON.stringify(Object.fromEntries(validation.errors))
    return sendError(event, createError({ statusCode: 422, data: errors }))
  }

  const user = await getUserByEmail(usernameOrEmail)

  if (user === null) {
    sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthenticated' }))
  }

  if(user.password == undefined) {
    sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthenticated' }))
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if (!isPasswordCorrect) {

    const check: InputValidation = {
      value: '',
      isBlank: false,
      lenghtMin8: true,
      key: 'Authentication',
      hasError: false
  }

    const errors = new Map<string, { check: InputValidation }>()
    errors.set('Authentication', { 'check': check })


    const errorsRes = JSON.stringify(Object.fromEntries(new Map()))
    sendError(event, createError({ statusCode: 401, data: 'Unauthenticated' }))
  }


  await makeSession(user, event)

  return sanitizeUserForFrontend(user)
})
