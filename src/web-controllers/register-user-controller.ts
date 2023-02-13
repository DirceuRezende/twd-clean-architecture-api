import { UserData } from '@/entities'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { created } from '@/web-controllers/utils'

export class RegisterUserController {
  constructor (private readonly registerUserOnMailingList: RegisterUserOnMailingList) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = request.body
    const response = await this.registerUserOnMailingList.execute(userData)

    if (response.isRight()) {
      return created(response.value)
    }
    return {
      statusCode: 201,
      body: response.value
    }
  }
}
