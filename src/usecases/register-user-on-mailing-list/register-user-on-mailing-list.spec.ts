import { InvalidEmailError } from "@/entities/errors/invalid-email-error";
import { UserData } from "../../entities/user-data";
import { UserRepository } from "./ports/user-repository";
import { RegisterUserOnMailingList } from "./register-user-on-mailing-list";
import { InMemoryUserRepository } from "./repository/in-memory-user-repository";
import { left } from "@/shared";
import { InvalidNameError } from "@/entities/errors/invalid-name-error";

describe("Register user on mailing list use case", () => {
  it("should add user with complete data to mailing list", async () => {
    const users: UserData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    );
    const name = "any_name";
    const email = "any@email.com";
    const response = await usecase.execute({ name, email });
    const user = await repo.findUserByEmail(email);
    expect(user.name).toBe(name);
    expect(response.value.name).toBe(name);
  });

  it("should not add user with invalid email to mailing list", async () => {
    const users: UserData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    );
    const name = "any_name";
    const invalidEmail = "any.@email.com";
    const response = await usecase.execute({ name, email: invalidEmail });
    const user = await repo.findUserByEmail(invalidEmail);
    expect(user).toBeNull();
    expect(response).toEqual(left(new InvalidEmailError()));
  });

  it("should not add user with invalid name to mailing list", async () => {
    const users: UserData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    );
    const invalidName = "";
    const email = "any@email.com";
    const response = await usecase.execute({ name: invalidName, email });
    const user = await repo.findUserByEmail(email);
    expect(user).toBeNull();
    expect(response).toEqual(left(new InvalidNameError()));
  });
});
