import { getCookie } from 'h3'
import { getUserBySessionToken } from '~~/server/app/services/sessionService'

export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, 'auth_token')  

  if(!authToken) {
    return null
  }

  const user  = await getUserBySessionToken(authToken)

  return user
})