import { UserData } from "../user-data";
import { InMemoryUserRepository } from "./in-memory-user-repository";

describe("In memory User repository", () => {
  it("should return null if user is not found", async () => {
    const users: UserData[] = [];
    const userRepo = new InMemoryUserRepository(users);
    const user = await userRepo.findUserByEmail("any@mail.com");
    expect(user).toBeNull();
  });

  it("should return user if it is found in repository", async () => {
    const users: UserData[] = [];
    const name = "any_name";
    const email = "any@mail.com";
    const userRepo = new InMemoryUserRepository(users);
    await userRepo.add({ name, email });
    const user = await userRepo.findUserByEmail(email);
    expect(user.name).toBe(name);
  });

  it("should return all users in repository", async () => {
    const users: UserData[] = [
      { name: "any_name", email: "any@email.com" },
      { name: "second_name", email: "second@email.com" },
    ];

    const userRepo = new InMemoryUserRepository(users);
    const returnedUsers = await userRepo.findAllUser();
    expect(returnedUsers.length).toBe(2);
  });
});
