import { describe, expect, test, vi } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils-edge'
import { v4 as uuidv4 } from 'uuid'
import useErrorMapper from '../../composables/useErrorMapper'

describe('Test Registration', async () => {

    await setup({
        // test context options
    })
    test('incorrectly formatted email returns error', async () => {
        const givenEmail = 'test@fullstackjack'

        await $fetch('/api/auth/register',
            {
                method: 'POST',
                responseType: 'json',
                body: {
                    username: 'testUsername',
                    name: 'test_name',
                    email: givenEmail,
                    password: '12345678'
                },
            }).catch(error => {
                const errorMap = useErrorMapper(error.data.data)
                expect(errorMap.hasErrors).toBe(true)
                expect(errorMap.errors.has('email')).toBe(true)
                expect(errorMap.errors.get('email')?.message).toBe('valid email required')
                expect(error.message).toContain(`422 Invalid Data Provided`)

            })
    })

    test('already used email returns error', async () => {
        const givenUsername2 = uuidv4().replaceAll('-', '')
        const givenUsername = uuidv4().replaceAll('-', '')
        const givenName = uuidv4().replaceAll('-', '')
        const givenName2 = uuidv4().replaceAll('-', '')

        await $fetch('/api/auth/register',
            {
                method: 'POST',
                responseType: 'json',
                body: {
                    username: givenUsername,
                    name: givenName,
                    email: 'testDublicate@fullstackjack.dev',
                    password: '12345678'
                },
            }).catch(error => {})

        await $fetch('/api/auth/register',
            {
                method: 'POST',
                responseType: 'json',
                body: {
                    username: givenUsername2,
                    name: givenName2,
                    email: 'testDublicate@fullstackjack.dev',
                    password: '12345678'
                },
            }).catch(error => {
                const errorMap = useErrorMapper(error.data.data)
                expect(errorMap.hasErrors).toBe(true)
                expect(errorMap.errors.has('email')).toBe(true)
                expect(errorMap.errors.get('email')?.message).toBe('Email is invalid or already taken')
                expect(error.message).toContain(`422 Unprocessable Entity`)
            })
    })

    test('already used name returns error', async () => {
        const givenEmail = uuidv4().replaceAll('-', '') + '@fullstackjack.dev'
        const givenEmail2 = uuidv4().replaceAll('-', '') + '@fullstackjack.dev'
        const givenName = uuidv4().replaceAll('-', '')
        const givenName2 = uuidv4().replaceAll('-', '')

        await $fetch('/api/auth/register',
            {
                method: 'POST',
                responseType: 'json',
                body: {
                    username: 'duplicateUsername',
                    name: givenName,
                    email: givenEmail,
                    password: '12345678'
                },
            }).catch(error => {
            })

        await $fetch('/api/auth/register',
            {
                method: 'POST',
                responseType: 'json',
                body: {
                    username: 'duplicateUsername',
                    name: givenName2,
                    email: givenEmail2,
                    password: '12345678'
                },
            }).catch(error => {
                const errorMap = useErrorMapper(error.data.data)
                expect(errorMap.hasErrors).toBe(true)
                expect(errorMap.errors.has('username')).toBe(true)
                expect(errorMap.errors.get('username')?.message).toBe('Username is invalid or already taken')
                expect(error.message).toContain(`422 Unprocessable Entity`)
            })
    })

    test('vaild data registers new user', async () => {
        const givenEmail = uuidv4().replaceAll('-', '') + '@fullstackjack.dev'
        const givenUsername = uuidv4().replaceAll('-', '')
        const givenName = uuidv4().replaceAll('-', '')

        await $fetch('/api/auth/register',
            {
                method: 'POST',
                responseType: 'json',
                body: {
                    username: givenUsername,
                    name: givenName,
                    email: givenEmail,
                    password: '12345678'
                },
            }).then(res => {
                console.log('****** 3 >>>>> ', res)
                expect(res.email).toBe(givenEmail)
            })
    })
})



