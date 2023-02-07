import { UserData, User } from '@/entities'
import { UserRepository } from './ports'
import { Either, left, right } from '@/shared'
import { InvalidNameError, InvalidEmailError } from '@/entities/errors'

export class RegisterUserOnMailingList {
  constructor (private readonly userRepo: UserRepository) {}

  async execute (
    request: UserData
  ): Promise<Either<InvalidNameError | InvalidEmailError, UserData>> {
    const userOrError = User.create(request)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    if (!(await this.userRepo.exists(request))) {
      await this.userRepo.add(request)
    }

    return right(request)
  }
}
