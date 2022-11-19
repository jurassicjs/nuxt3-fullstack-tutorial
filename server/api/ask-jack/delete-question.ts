
import { defineEventHandler, getCookie, sendError } from "h3";
import { findQuestion } from "~/server/database/repositories/askJackRespository";
import { getUserBySessionToken } from '~/server/app/services/sessionService'
import { deleteQuestion } from "~/server/database/repositories/askJackRespository";
import sendDefaultErrorResponse from "~~/server/app/errors/responses/DefaultErrorsResponse";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const question = await findQuestion(parseInt(body.questionId))
    const authToken = getCookie(event, 'auth_token')

    //todo: replace everywere with middleware
    if (authToken == null) {
        return await sendDefaultErrorResponse(event, 'Unauthorized', 403, 'You must be logged in to answer a question')
    }
    const user = await getUserBySessionToken(authToken)

    if (!user) {
        return await sendDefaultErrorResponse(event, 'Unauthorized', 403, 'You must be logged in to answer a question')
    }

    const isMine = user.id == question.authorId


    if (!isMine) {
        sendError(event, createError({ statusCode: 403, statusMessage: 'Unauthorized' }))
    }

    return await deleteQuestion(question.id)
})