import { CompatibilityEvent, defineEventHandler } from "h3";
import { searchQuestions } from "~/server/database/repositories/askJackRespository";
import { getUserById } from "~/server/database/repositories/userRespository";

export default defineEventHandler(async (event: CompatibilityEvent) => {
    const queries = getQuery(event)

    const questions =  await searchQuestions(queries.search as string)

  const questionsWithAuth = await Promise.all( questions.map(async (question: IQuestion) => {
        const user = await getUserById(question.authorId)
         question.authName = '@' + user.username
         return {...question, authName: '@' + user.username};
    }))

    return await questionsWithAuth
})