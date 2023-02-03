import { Either, left, right } from "@/shared";
import { InvalidEmailError } from "./errors/invalid-email-error";

export class Name {
  public readonly value: string;

  private constructor(name: string) {
    this.value = name;
  }

  static create(name: string): Either<InvalidEmailError, Name> {
    if (Name.validate(name)) {
      return right(new Name(name));
    }
    return left(new InvalidEmailError());
  }

  static validate(name: string): boolean {
    if (!name) {
      return false;
    }

    if (name.trim().length < 2 || name.trim().length > 256) {
      return false;
    }

    return true;
  }
}
