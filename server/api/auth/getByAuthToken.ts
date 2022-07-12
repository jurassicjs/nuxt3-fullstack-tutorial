import { IUser } from '~/types/IUser';
import { getCookie } from 'h3'
import { getUserBySessionToken } from '~~/server/services/sessionService'

export default defineEventHandler<IUser>(async (event) => {
  const authToken = getCookie(event.req, 'auth_token')  
  const user  = await getUserBySessionToken(authToken)

  return user
})