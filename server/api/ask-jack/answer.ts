import { readBody, getCookie } from "h3";
import { createAnswer } from "~/server/database/repositories/askJackRespository";
import { getUserBySessionToken } from '~/server/services/sessionService'

export default eventHandler(async (event) => {
    const body = await readBody(event)
    const data: IAnswerPost = body.data

    const authToken = getCookie(event, 'auth_token')  ?? null
    
    if(authToken == null) {
        throw Error('unauthorized')
    }

    const user = await getUserBySessionToken(authToken)

    if(!user) {
        throw Error('unauthorized')
    }

    console.log('************ create answer *******************')

    return await createAnswer(data, user.id)
})