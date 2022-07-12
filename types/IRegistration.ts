export type IRegistrationErrors = {
 hasErrors?: string
}

export type RegistationResponse = {
 hasErrors: boolean,
 errors?: IRegistrationErrors
}

export type RegistationRequest = {
 name: string,
 username?: string
 email?: string
 password?: string
}