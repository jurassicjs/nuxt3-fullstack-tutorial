import { describe, expect, test, vi } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils-edge'
import { v4 as uuidv4 } from 'uuid'

// testing this way is neither fast or intuitive. Revisit when . . . 
// useFetch and other composeables are availble within this context

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
                    data: {
                        username: 'testUsername',
                        name: 'test_name',
                        email: givenEmail,
                        password: '12345678'
                    }
                },
            }).catch(error => {
                console.log('EEEEEEE 1 >>>', error)
                expect(error.message).toContain(`422 Unprocessable Entity`)
            })
    })

    test('already used email returns error', async () => {
        const givenEmail = uuidv4().replaceAll('-', '') + '@fullstackjack.dev'
        const givenUsername2 = uuidv4().replaceAll('-', '')
        const givenUsername = uuidv4().replaceAll('-', '')
        const givenName = uuidv4().replaceAll('-', '')
        const givenName2 = uuidv4().replaceAll('-', '')

        await $fetch('/api/auth/register',
            {
                method: 'POST',
                responseType: 'json',
                body: {
                    data: {
                        username: givenUsername,
                        name: givenName,
                        email: 'testDublicate@fullstackjack.dev',
                        password: '12345678'
                    }
                },
            }).catch(error => {
                console.log('EEEEEEE 2a >>>', error)
            })

        await $fetch('/api/auth/register',
            {
                method: 'POST',
                responseType: 'json',
                body: {
                    data: {
                        username: givenUsername2,
                        name: givenName2,
                        email: 'testDublicate@fullstackjack.dev',
                        password: '12345678'
                    }
                },
            }).catch(error => {
                console.log('EEEEEEE 2b >>>', error)
                expect(error.message).toContain(`422 Unprocessable Entity`)
            })
    })

    test('already used name returns error', async () => {
        const givenEmail = uuidv4().replaceAll('-', '') + '@fullstackjack.dev'
        const givenUsername = uuidv4().replaceAll('-', '')
        const givenName = uuidv4().replaceAll('-', '')

        await $fetch('/api/auth/register',
            {
                method: 'POST',
                responseType: 'json',
                body: {
                    data: {
                        username: givenUsername,
                        name: givenName,
                        email: givenEmail,
                        password: '12345678'
                    }
                },
            }).then(res => {
                console.log('****** 3 >>>>> ', res)
                expect(res.email).toBe(givenEmail)
            })
    })
})



