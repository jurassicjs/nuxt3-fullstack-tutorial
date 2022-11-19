import { H3Event, sendError } from 'h3'
import bcrypt from 'bcrypt'
import { IUser } from '~/types/IUser';
import { createUser } from '~/server/database/repositories/userRespository'
import { makeSession } from '~/server/services/sessionService';
import { ZodError } from "zod"
import { validateUser } from '~/server/services/userService';
import sendZodErrorResponse from '~/server/App/responses/ZodErrorsResponse';
import sendDefaultErrorResponse from '~/server/App/responses/DefaultErrorsResponse';
import registerRequest from '~/server/App/formRequests/RegisterRequest';

export default eventHandler(async (event: H3Event) => {
  try {
    const data = await registerRequest(event)
    const validation = await validateUser(data)

    if (validation.hasErrors === true && validation.errors) {
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
  } catch (error: any) {

    if (error.data instanceof ZodError) {
      return await sendZodErrorResponse(event, error.data)
    }

    return await sendDefaultErrorResponse(event, 'oops', error)
  }
})