import { H3Event } from "h3"
import { authCheck } from "~/server/app/services/userService"

export default eventHandler(async (event) => {

 const isAllowed = await protectAuthRoute(event)

 if (!isAllowed) {
  return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
 }
})

async function protectAuthRoute(event: H3Event): Promise<boolean> {

 const protectedRoutes = [
  '/api/ask-jack/ask',
  '/api/ask-jack/edit-question/',
  'api/ask-jack/delete-question'
 ]

 if (!event?.path || !protectedRoutes.includes(event.path)) {
  return true
 }

 return await authCheck(event)
}