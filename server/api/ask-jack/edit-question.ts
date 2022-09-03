
import { defineEventHandler, useCookie } from "h3";
import { findQuestion } from "~/server/database/repositories/askJackRespository";
import { getUserBySessionToken } from '~/server/services/sessionService'
import { editQuestion } from "~/server/database/repositories/askJackRespository";

export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const data: IQuestionPost = body.data
    const questionId = data.id

    const question =  await findQuestion(questionId)

    question.description = data.description
    question.title = data.title

    const authToken = useCookie(event, 'auth_token')  
    const user  = await getUserBySessionToken(authToken)
    
    return await editQuestion(question)
})