import { RegistationRequest } from '~~/types/IRegistration';
import { getUserByEmail, getUserByUserName } from '~/server/database/repositories/userRespository';


export async function validate(data: RegistationRequest) {

 const errors = new Map<string, { check: InputValidation }>()

 for (const [key, value] of Object.entries(data)) {
  let val = await runChecks(key, value)

  if (val.hasError) {
   errors.set(key, { 'check': val })
  }
 }

 return errors
}

async function runChecks(key: string, value: string): Promise<InputValidation> {
 const check: InputValidation = {
  value,
  isBlank: false,
  lenghtMin8: true,
  key,
  hasError: false
 }

 if (value == '' || value == null) {
  check.isBlank = true
  check.hasError = true
  check.errorMessage = `${key} is required`
  return check
 }

 if (key == 'password') {
  if (value.length < 8) {
   check.hasError = true
   check.errorMessage = `password must be at least 8 characters`
  }
  check.lenghtMin8 = false
 }

 if (key == 'email') {

  const isValidEmail = validateEmail(value)

  if (!isValidEmail) {
   check.emailTaken = true
   check.hasError = true
   check.errorMessage = `${value}, is not a valid email!`
   return check
  }

  const email = await getUserByEmail(value)
  if (email) {
   check.emailTaken = true
   check.hasError = true
   check.errorMessage = `This email, ${value}, is already registered!`
  }
 }

 if (key == 'username') {
  const username = await getUserByUserName(value)
  if (username) {
   check.usernameTaken = true
   check.hasError = true
   check.errorMessage = `The username, ${value}, is already registered!`
  }
 }

 return check
}

function validateEmail(input: string): boolean {
 const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

 if (!input.match(validRegex)) {
  return false;
 }

 return true
}