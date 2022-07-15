import { sanitizeUserForFrontend } from '~~/server/services/userService';
import { CompatibilityEvent } from "h3"
import { createSession, getSessionByAuthToken } from "~~/server/database/repositories/sessionRepository"
import { IUser } from "~~/types/IUser"
import { v4 as uuidv4 } from 'uuid'


export async function makeSession(user: IUser, event: CompatibilityEvent): Promise<IUser> {
    const authToken = uuidv4().replaceAll('-', '')
    const session = await createSession({ authToken, userId: user.id })
    const userId = session.userId

    if (userId) {
        setCookie(event, 'auth_token', authToken, { path: '/', httpOnly: true })
        return getUserBySessionToken(authToken)
    }

    throw Error('Error Creating Session')
}

export async function getUserBySessionToken(authToken: string): Promise<IUser> {
    const session = await getSessionByAuthToken(authToken)

    return sanitizeUserForFrontend(session.user)
}
