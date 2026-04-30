import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../../domain/entities/User";
export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface ICreateUserUseCase {
  execute(dto: CreateUserInput): Promise<User>;
}

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: CreateUserInput): Promise<User> {
    const { email, name, password } = dto;
    if (!email || !name || !password) {
      throw new Error("Please provide the required information.");
    }
    const uniqueEmail = await this.userRepository.findByEmail(email);
    if (uniqueEmail) {
      throw new Error("Email is already in use.");
    }

    const user = new User({ email, name, password });
    await this.userRepository.save(user);
    return user;
  }
}
