import { CompatibilityEvent, sendError } from 'h3'
import bcrypt from 'bcrypt'
import { IUser } from '~/types/IUser';
import { doesUserExist } from '~/server/services/userService'
import { createUser } from '~/server/database/repositories/userRespository'
import { makeSession } from '~~/server/services/sessionService';

export default async (event: CompatibilityEvent) => {
  const body = await useBody(event)
  const name = body.name
  const username = body.username
  const email: string = body.email
  const password: string = body.password

  const userExists = await doesUserExist(email, username)

  if (userExists.value === true) {
    return sendError(event, createError({ statusCode: 422, statusMessage: userExists.message }))
  }

  const encryptedPassword: string = await bcrypt.hash(password, 10)

  const userData: IUser = {
    username,
    name,
    email,
    loginType: 'email',
    password: encryptedPassword
  }

  const user = await createUser(userData)

  return await makeSession(user, event)
}