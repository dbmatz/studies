import { CreateUserUseCase } from "../../../application/use-cases/CreateUserUseCase";
import { InMemoryUserRepository } from "../../repositories/InMemoryUserRepository";
import { UserController } from "../controllers/UserController";

const inMemoryUserRepository = new InMemoryUserRepository();
const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);

export const userController = new UserController(createUserUseCase);
