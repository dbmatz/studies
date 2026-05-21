import { IUserRepository } from "../../../application/repositories/IUserRepository";
import { IHashService } from "../../../application/services/IHashService";
import {
  CreateUserUseCase,
  ICreateUserUseCase,
} from "../../../application/use-cases/CreateUserUseCase";
import {
  GetUserByIDUseCase,
  IGetUserByIDUseCase,
} from "../../../application/use-cases/GetUserByIDUseCase";
import { InMemoryUserRepository } from "../../../infra/repositories/InMemoryUserRepository";
import { BcryptHashService } from "../../../infra/services/BcryptHashService";

describe("GetUserByIDUseCase", () => {
  let userRepository: IUserRepository;
  let hashService: IHashService;
  let createUserUseCase: ICreateUserUseCase;
  let getUserByIDUseCase: IGetUserByIDUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    hashService = new BcryptHashService();
    createUserUseCase = new CreateUserUseCase(userRepository, hashService);
    getUserByIDUseCase = new GetUserByIDUseCase(userRepository);
  });

  it("Must not find the user", async () => {
    await expect(
      getUserByIDUseCase.execute({
        id: "666",
      }),
    ).rejects.toThrow("User not found");
  });

  it("Must find the user", async () => {
    let id;
    const createdUser = await createUserUseCase.execute({
      name: "Fulano Silva",
      email: "fulano@email.com",
      password: "senha@123",
    });
    id = createdUser.id;

    const userFound = await getUserByIDUseCase.execute({
      id,
    });
    expect(userFound).toBeDefined();
    expect(userFound.id).toBe(id);
    expect(userFound.name).toBe("Fulano Silva");
    expect(userFound.email).toBe("fulano@email.com");
  });

  it("Must not return the password", async () => {
    let id;
    const createdUser = await createUserUseCase.execute({
      name: "Ciclano Silva",
      email: "Ciclano@email.com",
      password: "senha@123",
    });
    id = createdUser.id;

    const userFound = await getUserByIDUseCase.execute({
      id,
    });
    expect(userFound).not.toHaveProperty("password");
  });
});
