import { CreateUserUseCase } from "../../../application/use-cases/CreateUserUseCase";
import { GetUserByIDUseCase } from "../../../application/use-cases/GetUserByIDUseCase";
import { InMemoryUserRepository } from "../../repositories/InMemoryUserRepository";
import { BcryptHashService } from "../../services/BcryptHashService";
import { UserController } from "../controllers/UserController";

export const inMemoryUserRepository = new InMemoryUserRepository();
const bcryptHashService = new BcryptHashService();
const createUserUseCase = new CreateUserUseCase(
  inMemoryUserRepository,
  bcryptHashService,
);

const getUserByIDUseCase = new GetUserByIDUseCase(inMemoryUserRepository);

export const userController = new UserController(
  createUserUseCase,
  getUserByIDUseCase,
);
