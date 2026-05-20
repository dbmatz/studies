import { IUserRepository } from "../../../application/repositories/IUserRepository";
import { IHashService } from "../../../application/services/IHashService";
import { CreateUserUseCase } from "../../../application/use-cases/CreateUserUseCase";
import { InMemoryUserRepository } from "../../../infra/repositories/InMemoryUserRepository";
import { BcryptHashService } from "../../../infra/services/BcryptHashService";

describe("CreateUserUseCase", () => {
  let userRepository: IUserRepository;
  let hashService: IHashService;
  let createUser: CreateUserUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    hashService = new BcryptHashService();
    createUser = new CreateUserUseCase(userRepository, hashService);
  });

  it("Must create a new user", async () => {
    const output = await createUser.execute({
      email: "example@email.com",
      name: "Fulano Silva",
      password: "Senh@123",
    });

    expect(output).toBeDefined();
    expect(output.id).toBeDefined();
    expect(output.name).toBe("Fulano Silva");
    expect(output.email).toBe("example@email.com");
  });

  it("Must not return the password", async () => {
    const output = await createUser.execute({
      email: "example@email.com",
      name: "Fulano Silva",
      password: "Senh@123",
    });

    expect(output).not.toHaveProperty("password");
  });

  it("must throw if email is already in use", async () => {
    await createUser.execute({
      name: "Fulano Silva",
      email: "fulano@email.com",
      password: "senha@123",
    });

    await expect(
      createUser.execute({
        name: "Outro",
        email: "fulano@email.com",
        password: "outrasenha",
      }),
    ).rejects.toThrow("Email is already in use");
  });

  it("must hash the password to save it", async () => {
    await createUser.execute({
      name: "Fulano Silva",
      email: "fulano@email.com",
      password: "senha@123",
    });

    const user = await userRepository.findByEmail("fulano@email.com");
    const isValid = await hashService.compare(
      "senha@123",
      user!.getHashedPassword(),
    );
    expect(isValid).toBe(true);
  });
});
