import { sanitizeUserForFrontend } from '~~/server/services/userService';
import { H3Event } from "h3"
import { createSession, getSessionByAuthToken } from "~~/server/database/repositories/sessionRepository"
import { IUser } from "~~/types/IUser"
import { v4 as uuidv4 } from 'uuid'
import { User } from '@prisma/client';


export async function makeSession(user: IUser, event: H3Event): Promise<User|undefined> {
    const authToken = uuidv4().replaceAll('-', '')
    const session = await createSession({ authToken, userId: user.id })
    const userId = session.userId

    if (userId) {
        setCookie(event, 'auth_token', authToken, { path: '/', httpOnly: true })
        return getUserBySessionToken(authToken)
    }

    throw Error('Error Creating Session')
}

export async function getUserBySessionToken(authToken: string): Promise<User|undefined> {
    const session = await getSessionByAuthToken(authToken)

    return sanitizeUserForFrontend(session.user)
}
