import { IUser } from '~/types/IUser';
import { useCookie } from 'h3'
import { getUserBySessionToken } from '~~/server/services/sessionService'

export default defineEventHandler<IUser>(async (event) => {
  const authToken = useCookie(event.req, 'auth_token')  
  const user  = await getUserBySessionToken(authToken)

  return user
})