import { UserData } from '@/entities'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repository'

describe('In memory User repository', () => {
  it('should return null if user is not found', async () => {
    const users: UserData[] = []
    const sut = new InMemoryUserRepository(users)
    const user = await sut.findUserByEmail('any@mail.com')
    expect(user).toBeNull()
  })

  it('should return user if it is found in repository', async () => {
    const users: UserData[] = []
    const name = 'any_name'
    const email = 'any@mail.com'
    const sut = new InMemoryUserRepository(users)
    await sut.add({ name, email })
    const user = await sut.findUserByEmail(email)
    expect(user.name).toBe(name)
  })

  it('should return all users in repository', async () => {
    const users: UserData[] = [
      { name: 'any_name', email: 'any@email.com' },
      { name: 'second_name', email: 'second@email.com' }
    ]

    const sut = new InMemoryUserRepository(users)
    const returnedUsers = await sut.findAllUser()
    expect(returnedUsers.length).toBe(2)
  })
})
