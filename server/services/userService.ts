type ExistsCheck = {
 value: boolean
 message?: string
};

type RegistrationErrors = {
 emailError?: string
 usernameError?: string
}

export async function doesUserExist(email: string, username: string): Promise<ExistsCheck> {
 // const emailExists = getUserByEmail(email)
 // const userNameExists = getUserByUserName(email)
 const emailExists = true
 const userNameExists = true
 
 const errors: RegistrationErrors = {}

 if (emailExists) {
  errors.emailError = `This email, ${email}, is already registered!`
 }

 if (userNameExists) {
  errors.usernameError = `The username, ${username}, is already registered!`
 }

 if (emailExists || userNameExists) {
  const message = JSON.stringify(errors)
  return { value: true, message }
 }

 return { value: false }
}