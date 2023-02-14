import { UserData } from '@/entities'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { badRequest, created, serverError } from '@/web-controllers/utils'
import { MissingParamError } from '@/web-controllers/errors'
import { UseCase } from '@/usecases/ports'

export class RegisterUserController {
  constructor (private readonly registerUserOnMailingList: UseCase) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!(request.body?.name) || !(request.body?.email)) {
        let missingParam = !(request.body?.name) ? 'name ' : ''
        missingParam += !(request.body?.email) ? 'email' : ''
        return badRequest(new MissingParamError(missingParam.trim()))
      }

      const userData: UserData = request.body
      const response = await this.registerUserOnMailingList.execute(userData)

      if (response.isLeft()) {
        return badRequest(response.value)
      }

      if (response.isRight()) {
        return created(response.value)
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
