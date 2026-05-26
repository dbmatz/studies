import { IUserRepository } from "../../../application/repositories/IUserRepository";
import { IHashService } from "../../../application/services/IHashService";
import {
  GetUserByIDUseCase,
  IGetUserByIDUseCase,
} from "../../../application/use-cases/GetUserByIDUseCase";
import { User } from "../../../domain/entities/User";
import { InMemoryUserRepository } from "../../../infra/repositories/InMemoryUserRepository";
import { BcryptHashService } from "../../../infra/services/BcryptHashService";

describe("GetUserByIDUseCase", () => {
  let userRepository: IUserRepository;
  let hashService: IHashService;
  let getUserByIDUseCase: IGetUserByIDUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    hashService = new BcryptHashService();
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
    const user = new User({
      name: "Fulano Silva",
      email: "fulano@email.com",
      password: "hashed",
    });
    await userRepository.save(user);
    id = user.id;

    const userFound = await getUserByIDUseCase.execute({
      id,
    });
    expect(userFound).toBeDefined();
    expect(userFound.id).toBe(id);
    expect(userFound.name).toBe("Fulano Silva");
    expect(userFound.email).toBe("fulano@email.com");
  });
});
