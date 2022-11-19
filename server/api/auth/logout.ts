import { deleteCookie } from "h3";

export default eventHandler((event) => {
  deleteCookie(event, 'auth_token')
  return 'successfully logged out'
})
