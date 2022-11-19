import { useRouter, useState } from "#app";
import { ISession } from "~~/types/ISession";
import { IUser } from "~/types/IUser";

export const useAuthCookie = () => useCookie('auth_token')

export async function useUser(): Promise<IUser | null> {
  const authCookie = useAuthCookie().value
  const user = useState<IUser | null>('user')

  if (authCookie && !user.value) {

    const cookieHeaders = useRequestHeaders(['cookie'])

    const { data } = await useFetch<IUser>(`/api/auth/getByAuthToken`, {
      headers: cookieHeaders as HeadersInit,
    })

    user.value = data.value
  }

  return user.value
}

export async function useLoggedIn() {
  const user = await useUser()

  if (!user) {
    return false
  }

  if (user?.id == null) {
    return false
  }

  return true
}

export async function userLogout() {
  await useFetch('/api/auth/logout')
  useState('user').value = null
  await useRouter().push('/')
}

export async function registerWithEmail(
  username: string,
  name: string,
  email: string,
  password: string
): Promise<FormValidation> {

  try {
    const data = await $fetch<ISession>('/api/auth/register', {
      method: 'POST',
      body:  { username, name, email, password }
    })

    if (data) {
      useState('user').value = data
      await useRouter().push('/topics')
    }

    return { hasErrors: false, loggedIn: true }
  } catch (error: any) {
    const parsedErrors = JSON.parse(error.data.data)
    const errorMap = new Map<string, { message: InputValidation; }>(Object.entries(parsedErrors))
    return { hasErrors: true, errors: errorMap }
  }
}

export async function loginWithEmail(usernameOrEmail: string, password: string): Promise<FormValidation> {
  try {
    const result = await $fetch('/api/auth/login', { method: 'POST', body: { usernameOrEmail: usernameOrEmail, password: password } })

    if (!result?.id) {
      debugger
      throw Error('something went wrong')
    }
    useState('user').value = result
    await useRouter().push('/topics')

    return { hasErrors: false, loggedIn: true }
  } catch (error: any) {
    const parsedErrors = JSON.parse(error.data.data)
    const errorMap = new Map<string, { message: InputValidation; }>(Object.entries(parsedErrors))
    return { hasErrors: true, errors: errorMap }
  }
}