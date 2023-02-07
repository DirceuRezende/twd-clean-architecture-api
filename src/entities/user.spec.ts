import { User } from './user'

describe('User domain entity', () => {
  it('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email'

    const error = User.create({ name: 'any_name', email: invalidEmail })
      .value as Error
    expect(error.name).toEqual('InvalidEmailError')
    expect(error.message).toEqual('Invalid email: ' + invalidEmail + '.')
  })

  it('should not create user with invalid name (too few characters)', () => {
    const invalidName = 'O    '
    const error = User.create({ name: invalidName, email: 'any@mail.com' })
      .value as Error

    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual('Invalid name: ' + invalidName + '.')
  })

  it('should not create user with invalid name (too many characters)', () => {
    const invalidName = 'O'.repeat(257)
    const error = User.create({ name: invalidName, email: 'any@mail.com' })
      .value as Error

    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual('Invalid name: ' + invalidName + '.')
  })

  it('should create user with valid data', () => {
    const validName = 'any@mail.com'
    const validEmail = 'any@mail.com'
    const user = User.create({ name: validName, email: validEmail })
      .value as User

    expect(user.name.value).toBe(validName)
    expect(user.email.value).toBe(validEmail)
  })
})
