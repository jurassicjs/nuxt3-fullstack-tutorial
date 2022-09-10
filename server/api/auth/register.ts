import { CompatibilityEvent, sendError } from 'h3'
import bcrypt from 'bcrypt'
import { IUser } from '~/types/IUser';
import { validateUser } from '~/server/services/userService'
import { createUser } from '~/server/database/repositories/userRespository'
import { makeSession } from '~~/server/services/sessionService';
import { RegistationRequest } from '~~/types/IRegistration'

export default async (event: CompatibilityEvent) => {
  const body = await readBody(event)
  const data = body.data as RegistationRequest

  const validation = await validateUser(data)

  if (validation.hasErrors === true) {
    const errors = JSON.stringify(Object.fromEntries(validation.errors))
    return sendError(event, createError({ statusCode: 422, data: errors }))
  }

  const encryptedPassword: string = await bcrypt.hash(data.password, 10)

  const userData: IUser = {
    username: data.username,
    name: data.name,
    email: data.email,
    loginType: 'email',
    password: encryptedPassword
  }

  const user = await createUser(userData)

  return await makeSession(user, event)
}