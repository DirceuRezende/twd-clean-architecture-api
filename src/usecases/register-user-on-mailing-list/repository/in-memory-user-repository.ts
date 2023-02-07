import { UserRepository } from '../ports'
import { UserData } from '@/entities'

export class InMemoryUserRepository implements UserRepository {
  constructor (public repository: UserData[]) {}

  async add (user: UserData): Promise<void> {
    const exists = await this.exists(user)
    if (!exists) {
      this.repository.push(user)
    }
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const found = this.repository.find((user) => user.email === email)
    return found || null
  }

  async findAllUser (): Promise<UserData[]> {
    return this.repository
  }

  async exists (user: UserData): Promise<boolean> {
    if ((await this.findUserByEmail(user.email)) === null) {
      return false
    }
    return true
  }
}
