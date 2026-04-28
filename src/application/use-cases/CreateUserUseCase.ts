import { Request } from "express";
import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../../domain/entities/User";

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(req: Request): Promise<User> {
    const { email, name, password } = req.body;
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
