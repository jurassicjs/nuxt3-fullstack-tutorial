
import { defineEventHandler, getCookie, sendError } from "h3";
import { findQuestion } from "~/server/database/repositories/askJackRespository";
import { getUserBySessionToken } from '~/server/services/sessionService'
import { deleteQuestion } from "~/server/database/repositories/askJackRespository";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const question =  await findQuestion(parseInt(body.questionId))
    const authToken = getCookie(event, 'auth_token')  
    const user  = await getUserBySessionToken(authToken)

    const isMine = user.id == question.authorId


    if(!isMine) {
        sendError(event, createError({ statusCode: 403, statusMessage: 'Unauthorized' }))
    }
    
    return await deleteQuestion(question.id)
})