export type ILoginErrors = {
 hasErrors?: string
}

export type LoginResponse = {
 hasErrors: boolean,
 errors?: ILoginErrors
}

export type LoginRequest = {
 usernameOrEmail: string,
 password: string
}