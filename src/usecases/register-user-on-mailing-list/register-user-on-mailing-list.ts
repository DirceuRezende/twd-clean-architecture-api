import { UserData, User } from '@/entities'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { Either, left, right } from '@/shared'
import { InvalidNameError, InvalidEmailError } from '@/entities/errors'
import { UseCase } from '@/usecases/ports'

export class RegisterUserOnMailingList implements UseCase {
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
