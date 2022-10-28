import { describe, expect, it, vi } from 'vitest'
import { validate } from '../../server/services/validator'


describe('test email validation', async () => {
  it('should return error if email missing', async () => {
    const res = await validate({
      username: '',
      name: '',
      email: null,
      password: '1234567'
    })

    const emailVal = res.get('email')

    emailVal.check.errorMessage

    expect(res.has('email')).toBe(true)
    expect(emailVal.check.hasError).toBe(true)
    expect(emailVal.check.errorMessage).toContain('email is required')
  })


  it('should return error for improperly formatted email', async () => {
    const res = await validate({
      username: '',
      name: '',
      email: 'test',
      password: '1234567'
    })

    const emailVal = res.get('email')

    emailVal.check.errorMessage

    expect(res.has('email')).toBe(true)
    expect(emailVal.check.hasError).toBe(true)
    expect(emailVal.check.errorMessage).toContain('test, is not a valid email!')
  })

  it('should return error if email taken', async () => {

    vi.mock('~/server/database/repositories/userRespository', () => {
      return {
        getUserByEmail: vi.fn(() => ({ email: 'test@fullstackjack.com' }))
      }
    })

    const email = 'test@fullstackjack.com'

    const res = await validate({
      username: '',
      name: '',
      email: email,
      password: '1234567'
    })

    const emailVal = res.get('email')

    emailVal.check.errorMessage

    expect(res.has('email')).toBe(true)
    expect(emailVal.check.hasError).toBe(true)
    expect(emailVal.check.emailTaken).toBe(true)
    expect(emailVal.check.errorMessage).toContain(`This email, test@fullstackjack.com, is already registered!`)
  })
})
