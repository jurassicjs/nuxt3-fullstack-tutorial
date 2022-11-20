import { readBody, getCookie } from "h3";
import { createAnswer } from "~/server/database/repositories/askJackRespository";
import { getUserBySessionToken } from '~/server/app/services/sessionService'
import sendDefaultErrorResponse from "~/server/app/errors/responses/DefaultErrorsResponse";

export default eventHandler(async (event) => {
    const body = await readBody(event)
    const data: IAnswerPost = body.data
    const authToken = getCookie(event, 'auth_token')  ?? null
    
    if(authToken == null) {
        return await sendDefaultErrorResponse(event, 'Unauthorized', 403, 'You must be logged in to answer a question')
    }

    const user = await getUserBySessionToken(authToken)

    if (!user) {
        return await sendDefaultErrorResponse(event, 'Unauthorized', 403, 'You must be logged in to answer a question')
    }

    return await createAnswer(data, user.id)
})