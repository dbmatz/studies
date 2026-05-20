import { CreateUserUseCase } from "../../../application/use-cases/CreateUserUseCase";
import { InMemoryUserRepository } from "../../repositories/InMemoryUserRepository";
import { BcryptHashService } from "../../services/BcryptHashService";
import { UserController } from "../controllers/UserController";

export const inMemoryUserRepository = new InMemoryUserRepository();
const bcryptHashService = new BcryptHashService();
const createUserUseCase = new CreateUserUseCase(
  inMemoryUserRepository,
  bcryptHashService,
);

export const userController = new UserController(createUserUseCase);
