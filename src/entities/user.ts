import { Either, left, right } from "@/shared";
import { UserData } from "./user-data";
import { InvalidEmailError } from "./errors/invalid-email-error";
import { Email } from "./email";
import { InvalidNameError } from "./errors/invalid-name-error";
import { Name } from "./name";

export class User {
  public readonly email: Email;
  public readonly name: Name;

  private constructor(name: Name, email: Email) {
    this.email = email;
    this.name = name;
  }

  static create(
    userData: UserData
  ): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name);
    if (nameOrError.isLeft()) {
      return left(new InvalidNameError());
    }

    const emailOrError = Email.create(userData.email);
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError());
    }

    const name: Name = nameOrError.value;
    const email: Email = emailOrError.value;

    return right(new User(name, email));
  }
}
