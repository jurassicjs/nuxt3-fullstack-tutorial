import { getCookie, readBody } from "h3";
import { createQuestion } from "~/server/database/repositories/askJackRespository";
import { getUserBySessionToken } from '~/server/app/services/sessionService'
import sendDefaultErrorResponse from "~~/server/app/errors/responses/DefaultErrorsResponse";

export default eventHandler(async (event) => {
    //todo: add validation
    const body = await readBody(event)
    const authToken = getCookie(event, 'auth_token')

    if (!authToken) {
        return await sendDefaultErrorResponse(event, 'Unauthorized', 403, 'You must be logged in to ask a question')
    }

    const user = await getUserBySessionToken(authToken)

    if (!user) {
        return await sendDefaultErrorResponse(event, 'Unauthorized', 403, 'You must be logged in to ask a question')
    }

    const data: IQuestionPost = body.data

    return await createQuestion(data, user.id)
})