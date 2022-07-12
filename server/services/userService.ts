import { IUser } from '~~/types/IUser';
import { RegistationRequest } from '~~/types/IRegistration';
import { validate } from '~~/server/services/validator';
import { H3Event } from 'h3';
import { getUserBySessionToken } from './sessionService';
import { isString } from '@vueuse/core';

export async function validateUser(data: RegistationRequest): Promise<FormValidation> {

    const errors = await validate(data)

    if (errors.size > 0) {

        return { hasErrors: true, errors }
    }

    return { hasErrors: false }
}

export function sanitizeUserForFrontend(user: IUser | undefined): IUser {

    if (!user) {
        return user
    }

    delete user.password;
    delete user.loginType;
    delete user.stripeCustomerId;

    return user
}

export async function authCheck(event: H3Event): Promise<boolean> {

    const authToken = getCookie(event, 'auth_token') 
    
    const hasAuthToken = isString(authToken)

    if(!hasAuthToken) {
        return false
    }

    const user  = await getUserBySessionToken(authToken)

    if(user.id) {
        return true
    }

    return false


}

