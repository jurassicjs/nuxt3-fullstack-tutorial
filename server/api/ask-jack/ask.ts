import { CompatibilityEvent, defineEventHandler, getCookie, readBody } from "h3";
import { createQuestion } from "~/server/database/repositories/askJackRespository";
import { getUserBySessionToken } from '~/server/services/sessionService'

export default defineEventHandler(async (event: CompatibilityEvent) => {
    const body = await readBody(event)

    const authToken = getCookie(event, 'auth_token')  

    const user  = await getUserBySessionToken(authToken)

    const data: IQuestionPost = body.data

    return await createQuestion(data, user.id)
})