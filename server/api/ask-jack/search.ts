
import { searchQuestions } from "~/server/database/repositories/askJackRespository";
import { getUserById } from "~/server/database/repositories/userRespository";

export default eventHandler(async (event) => {
    const queries = getQuery(event)

    const questions =  await searchQuestions(queries.search as string)

  const questionsWithAuth = await Promise.all( questions.map(async (question: IQuestion) => {
        const user = await getUserById(question.authorId)
         question.authName = '@' + user.username
         return {...question, authName: '@' + user.username};
    }))

    return questionsWithAuth
})