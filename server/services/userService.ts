import { IUser } from '~~/types/IUser';
import { RegistationRequest } from '~~/types/IRegistration';
import { validate } from '~~/server/services/validator';

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

