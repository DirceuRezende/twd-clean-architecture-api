import { UserData } from "../../entities/user-data";
import { UserRepository } from "./ports/user-repository";
import { RegisterUserOnMailingList } from "./register-user-on-mailing-list";
import { InMemoryUserRepository } from "./repository/in-memory-user-repository";

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
});
