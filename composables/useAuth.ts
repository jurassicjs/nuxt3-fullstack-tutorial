import { useRouter, useState } from "#app";
import { ISession } from "~~/types/ISession";
import { IUser } from "~/types/IUser";

export const useAuthCookie = () => useCookie('auth_token')

export async function useUser(): Promise<IUser> {
  const authCookie = useAuthCookie().value
  const user = useState<IUser>('user')

  if (authCookie && !user.value) {

    const { data } = await useFetch(`/api/auth/getByAuthToken`, {
      headers: useRequestHeaders(['cookie']),
    })

    user.value = data.value
  }

  return user.value
}

export async function useLoggedIn() {
  const user = await useUser()
  if(user?.id !== null && user !== undefined) {
   return true
  }

  return false
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
    const { data, error } = await useFetch<ISession>('/api/auth/register', {
      method: 'POST',
      body: { data: { username, name, email, password } },
      server:false,
      key:  username + name + email + password
    })

    if (error.value) {
      type ErrorData = {
        data: ErrorData
      }

      const errorData = error.value as unknown as ErrorData
      const errors = errorData.data.data as unknown as string
      const res = JSON.parse(errors)
      const errorMap = new Map<string, { check: InputValidation; }>(Object.entries(res));

      return {hasErrors: true, errors: errorMap}
    }

    if (data) {
      useState('user').value = data
      await useRouter().push('/dashboard')
    }
  } catch (e) {
    console.log('error: ' + e.toString())
  }
}

export async function loginWithEmail(email: string, password: string) {
  const user = await $fetch<IUser>('/api/auth/login', { method: 'POST', body: { email: email, password: password } })
  useState('user').value = user
  await useRouter().push('/dashboard')
}